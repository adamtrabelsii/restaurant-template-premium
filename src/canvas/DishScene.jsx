import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

function ProceduralDish({ scrollProgress, reducedMotion }) {
  const groupRef = useRef()
  const foodRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollProgress.current
    groupRef.current.rotation.y = scroll * Math.PI * 2 + state.clock.elapsedTime * 0.04
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.25 + scroll * 0.35,
      0.08
    )
    if (!reducedMotion) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    }
    if (foodRef.current && !reducedMotion) {
      foodRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Plate - quiet ceramic glaze */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.55, 0.08, 64]} />
        <meshPhysicalMaterial
          color="#f5f1ea"
          roughness={0.35}
          metalness={0.04}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </mesh>
      {/* Plate rim */}
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[1.55, 0.04, 16, 64]} />
        <meshPhysicalMaterial color="#ebe5d8" roughness={0.5} />
      </mesh>
      {/* Saffron rice mound — flatter so it doesn't read as a planet */}
      <mesh ref={foodRef} position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[1.25, 48, 24, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#c89c3e" roughness={0.95} flatShading />
      </mesh>
      {/* Red pepper strips */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.7, 0.22, Math.sin(angle) * 0.7]}
            rotation={[0, angle, 0.1]}
            castShadow
          >
            <boxGeometry args={[0.45, 0.04, 0.12]} />
            <meshStandardMaterial color="#A8323F" roughness={0.6} />
          </mesh>
        )
      })}
      {/* Prawns */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2 + 0.5
        return (
          <mesh
            key={`prawn-${i}`}
            position={[Math.cos(angle) * 0.95, 0.24, Math.sin(angle) * 0.95]}
            rotation={[0, angle + Math.PI / 2, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.1, 0.35, 8, 16]} />
            <meshStandardMaterial color="#d77f4e" roughness={0.5} />
          </mesh>
        )
      })}
      {/* Black olives */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2 + 0.8
        return (
          <mesh
            key={`olive-${i}`}
            position={[Math.cos(angle) * 0.5, 0.2, Math.sin(angle) * 0.5]}
            castShadow
          >
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#1a1208" roughness={0.4} metalness={0.15} />
          </mesh>
        )
      })}
      {/* Lemon wedge */}
      <mesh position={[0.9, 0.26, -0.3]} rotation={[0, 0.3, 0.2]} castShadow>
        <sphereGeometry args={[0.18, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#e5c64a" roughness={0.55} />
      </mesh>
    </group>
  )
}

export default function DishScene({ scrollProgress, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.25}
        color="#FFF1DD"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#A8323F" />
      <directionalLight position={[2, -2, 4]} intensity={0.3} color="#FFF1DD" />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#C9A961" />

      <Float
        speed={reducedMotion ? 0 : 1.0}
        rotationIntensity={0}
        floatIntensity={reducedMotion ? 0 : 0.3}
      >
        <Suspense fallback={null}>
          <ProceduralDish scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        </Suspense>
      </Float>

      {!reducedMotion && (
        <Sparkles count={25} scale={5} size={1.5} speed={0.2} color="#C9A961" opacity={0.35} />
      )}

      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.55}
        scale={6}
        blur={2.5}
        far={2}
      />

      <Environment preset="studio" />

      {!reducedMotion && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom intensity={0.25} luminanceThreshold={0.95} luminanceSmoothing={0.4} mipmapBlur />
          <Vignette eskil={false} offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
    </>
  )
}
