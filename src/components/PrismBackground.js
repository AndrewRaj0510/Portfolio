'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Prism Background (ported from reactbits Prism / OGL → THREE.js) ──
   3D rotating prism with colorful ray-marched visuals.
   Params from user: animationType=3drotate, scale=2.6, glow=0.6,
   colorFrequency=2.1, noise=0.1, timeScale=0.1 */

const vertexShader = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform vec2  iResolution;
uniform float iTime;

uniform float uHeight;
uniform float uBaseHalf;
uniform mat3  uRot;
uniform int   uUseBaseWobble;
uniform float uGlow;
uniform vec2  uOffsetPx;
uniform float uNoise;
uniform float uSaturation;
uniform float uScale;
uniform float uHueShift;
uniform float uColorFreq;
uniform float uBloom;
uniform float uCenterShift;
uniform float uInvBaseHalf;
uniform float uInvHeight;
uniform float uMinAxis;
uniform float uPxScale;
uniform float uTimeScale;

vec4 tanh4(vec4 x){
  vec4 e2x = exp(2.0*x);
  return (e2x - 1.0) / (e2x + 1.0);
}

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
}

float sdOctaAnisoInv(vec3 p){
  vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
  float m = q.x + q.y + q.z - 1.0;
  return m * uMinAxis * 0.5773502691896258;
}

float sdPyramidUpInv(vec3 p){
  float oct = sdOctaAnisoInv(p);
  float halfSpace = -p.y;
  return max(oct, halfSpace);
}

mat3 hueRotation(float a){
  float c = cos(a), s = sin(a);
  mat3 W = mat3(
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114,
    0.299, 0.587, 0.114
  );
  mat3 U = mat3(
     0.701, -0.587, -0.114,
    -0.299,  0.413, -0.114,
    -0.300, -0.588,  0.886
  );
  mat3 V = mat3(
     0.168, -0.331,  0.500,
     0.328,  0.035, -0.500,
    -0.497,  0.296,  0.201
  );
  return W + U * c + V * s;
}

void main(){
  vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

  float z = 5.0;
  float d = 0.0;

  vec3 p;
  vec4 o = vec4(0.0);

  float centerShift = uCenterShift;
  float cf = uColorFreq;

  mat2 wob = mat2(1.0);
  if (uUseBaseWobble == 1) {
    float t = iTime * uTimeScale;
    float c0 = cos(t + 0.0);
    float c1 = cos(t + 33.0);
    float c2 = cos(t + 11.0);
    wob = mat2(c0, c1, c2, c0);
  }

  const int STEPS = 100;
  for (int i = 0; i < STEPS; i++) {
    p = vec3(f, z);
    p.xz = p.xz * wob;
    p = uRot * p;
    vec3 q = p;
    q.y += centerShift;
    d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
    z -= d;
    o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
  }

  o = tanh4(o * o * (uGlow * uBloom) / 1e5);

  vec3 col = o.rgb;
  float n = rand(gl_FragCoord.xy + vec2(iTime));
  col += (n - 0.5) * uNoise;
  col = clamp(col, 0.0, 1.0);

  float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

  if(abs(uHueShift) > 0.0001){
    col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
  }

  gl_FragColor = vec4(col, o.a);
}
`

export default function PrismBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const H = 3.5
    const BW = 5.5
    const BASE_HALF = BW * 0.5
    const GLOW = 0.6
    const NOISE = 0.1
    const SCALE = 2.6
    const CFREQ = 2.1
    const BLOOM = 1
    const TS = 0.1

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)

    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
    })
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: { value: new THREE.Vector2(container.clientWidth * dpr, container.clientHeight * dpr) },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: 0 }, // 3drotate mode
        uRot: { value: new THREE.Matrix3() },
        uGlow: { value: GLOW },
        uOffsetPx: { value: new THREE.Vector2(0, 0) },
        uNoise: { value: NOISE },
        uSaturation: { value: 1.5 },
        uScale: { value: SCALE },
        uHueShift: { value: 0 },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 / ((container.clientHeight * dpr || 1) * 0.1 * SCALE) },
        uTimeScale: { value: TS },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    // Resize handling
    const handleResize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      const dbW = renderer.domElement.width
      const dbH = renderer.domElement.height
      material.uniforms.iResolution.value.set(dbW, dbH)
      material.uniforms.uPxScale.value = 1 / ((dbH || 1) * 0.1 * SCALE)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // 3D rotation params (randomized for uniqueness)
    const rnd = () => Math.random()
    const wX = (0.3 + rnd() * 0.6)
    const wY = (0.2 + rnd() * 0.7)
    const wZ = (0.1 + rnd() * 0.5)
    const phX = rnd() * Math.PI * 2
    const phZ = rnd() * Math.PI * 2

    const setMat3FromEuler = (yawY, pitchX, rollZ, m) => {
      const cy = Math.cos(yawY), sy = Math.sin(yawY)
      const cx = Math.cos(pitchX), sx = Math.sin(pitchX)
      const cz = Math.cos(rollZ), sz = Math.sin(rollZ)
      const el = m.elements
      el[0] = cy * cz + sy * sx * sz
      el[1] = cx * sz
      el[2] = -sy * cz + cy * sx * sz
      el[3] = -cy * sz + sy * sx * cz
      el[4] = cx * cz
      el[5] = sy * sz + cy * sx * cz
      el[6] = sy * cx
      el[7] = -sx
      el[8] = cy * cx
    }

    const t0 = performance.now()
    let raf

    const render = (now) => {
      const time = (now - t0) * 0.001
      material.uniforms.iTime.value = time

      const tScaled = time * TS
      const yaw = tScaled * wY
      const pitch = Math.sin(tScaled * wX + phX) * 0.6
      const roll = Math.sin(tScaled * wZ + phZ) * 0.5
      setMat3FromEuler(yaw, pitch, roll, material.uniforms.uRot.value)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      material.dispose()
      mesh.geometry.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="prism-bg-container" />
}
