/* Lightweight GPU enhancement for the hero.
   Pure WebGL2; no tracking, dependencies, or external network requests.
   Falls back to the existing CSS object when WebGL is unavailable. */
(() => {
  'use strict';
  const visual = document.getElementById('visual');
  if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 800px)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'gpu-hero';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.setAttribute('role', 'presentation');
  const gl = canvas.getContext('webgl2', {alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power'});
  if (!gl) return;
  const vertex = [
    '#version 300 es',
    'in vec2 a_position;',
    'void main(){ gl_Position = vec4(a_position,0.,1.); }'
  ].join('\n');
  const fragment = [
    '#version 300 es',
    'precision highp float;',
    'uniform vec2 u_resolution;',
    'uniform vec2 u_mouse;',
    'uniform float u_time;',
    'out vec4 out_color;',
    'mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}',
    'float octa(vec3 p,float s){return (abs(p.x)+abs(p.y)+abs(p.z)-s)*.57735026;}',
    'float sdf(vec3 p){',
    ' p.xz *= rot(u_time*.17+u_mouse.x*.5);',
    ' p.xy *= rot(.34+u_mouse.y*.34);',
    ' float d = octa(p,1.67);',
    ' float ring = length(vec2(length(p.xz)-1.34,p.y))-.024;',
    ' return min(d,ring);',
    '}',
    'vec3 normalAt(vec3 p){',
    ' vec2 e=vec2(.005,0.);',
    ' return normalize(vec3(sdf(p+e.xyy)-sdf(p-e.xyy),sdf(p+e.yxy)-sdf(p-e.yxy),sdf(p+e.yyx)-sdf(p-e.yyx)));',
    '}',
    'void main(){',
    ' vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);',
    ' vec3 ro=vec3(0.,0.,4.15);',
    ' vec3 rd=normalize(vec3(uv*1.67,-2.2));',
    ' float t=0.; bool hit=false;',
    ' for(int i=0;i<48;i++){ float d=sdf(ro+rd*t); if(d<.003){hit=true;break;} t+=max(d*.85,.005);if(t>7.5)break; }',
    ' if(hit){',
    '  vec3 p=ro+rd*t; vec3 n=normalAt(p);',
    '  vec3 light=normalize(vec3(-.4,.7,1.2));',
    '  float diff=max(dot(n,light),0.);',
    '  float rim=pow(1.-max(dot(n,-rd),0.),2.2);',
    '  float spec=pow(max(dot(reflect(-light,n),-rd),0.),25.);',
    '  vec3 base=mix(vec3(.15,.38,.13),vec3(.82,.99,.49),clamp(n.y*.5+.5,0.,1.));',
    '  vec3 color=base*(.35+.95*diff)+vec3(.9,1.,.7)*(spec*.7+rim*.27);',
    '  out_color=vec4(color,.85);',
    ' }else{',
    '  float halo=exp(-dot(uv,uv)*2.1);',
    '  float radi=length(uv);',
    '  float glow=exp(-abs(radi-1.)*13.)*.04;',
    '  out_color=vec4(vec3(.35,.6,.22)*(halo*.16+glow),clamp(halo*.13+glow,0.,.2));',
    ' }',
    '}'
  ].join('\n');
  const shader = (type, src) => {
    const s = gl.createShader(type); if (!s) return null;
    gl.shaderSource(s,src); gl.compileShader(s);
    if (!gl.getShaderParameter(s,gl.COMPILE_STATUS)) {gl.deleteShader(s); return null;}
    return s;
  };
  const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
  if (!vs || !fs) return;
  const program=gl.createProgram(); if (!program) return;
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if (!gl.getProgramParameter(program,gl.LINK_STATUS)) return;
  gl.deleteShader(vs);gl.deleteShader(fs);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const resolution=gl.getUniformLocation(program,'u_resolution');
  const mouseUniform=gl.getUniformLocation(program,'u_mouse');
  const timeUniform=gl.getUniformLocation(program,'u_time');
  visual.prepend(canvas);
  visual.classList.add('gpu-active');
  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  let raf=0, last=0, inView=true;
  const pointer={x:0,y:0};
  const resize=()=>{
    const rect=visual.getBoundingClientRect();
    const ratio=Math.min(window.devicePixelRatio||1,1.3);
    canvas.width=Math.min(1000,Math.max(1,Math.round(rect.width*ratio)));
    canvas.height=Math.min(850,Math.max(1,Math.round(rect.height*ratio)));
    gl.viewport(0,0,canvas.width,canvas.height);
  };
  resize();
  const onPointer=(event)=>{
    const r=visual.getBoundingClientRect();
    pointer.x=((event.clientX-r.left)/r.width-.5)*2;
    pointer.y=((event.clientY-r.top)/r.height-.5)*-2;
  };
  visual.addEventListener('pointermove',onPointer,{passive:true});
  const onResize=()=>resize();
  window.addEventListener('resize',onResize,{passive:true});
  const frame=(time)=>{
    raf=requestAnimationFrame(frame);
    if (!inView || document.hidden || time-last<33) return;
    last=time;
    gl.uniform2f(resolution,canvas.width,canvas.height);
    gl.uniform2f(mouseUniform,pointer.x,pointer.y);
    gl.uniform1f(timeUniform,time*.001);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
  };
  const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;},{threshold:0});
  observer.observe(visual);
  raf=requestAnimationFrame(frame);
  const stop=()=>{
    cancelAnimationFrame(raf);
    observer.disconnect();
    visual.removeEventListener('pointermove',onPointer);
    window.removeEventListener('resize',onResize);
  };
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();stop();canvas.remove();visual.classList.remove('gpu-active');},{once:true});
})();