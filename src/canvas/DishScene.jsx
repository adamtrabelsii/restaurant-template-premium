import { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { TextureLoader } from 'three'

export default function DishScene({ hovered = false, textureUrl }) {
  const groupRef = useRef()
  const texture = useLoader(TextureLoader, textureUrl)

  useFrame(() => {
    if (!groupRef.current) return
    const speed = hovered ? 0.02 : 0.004
    groupRef.current.rotation.y += speed
  })

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <pointLight color="#E63946" intensity={3} position={[0, -2, 1]} />
      <pointLight color="#D4AF37" intensity={1} position={[3, 3, 3]} />

      <group ref={groupRef} rotation={[-0.3, 0, 0]}>
        {/* Plate rim */}
        <mesh>
          <torusGeometry args={[1.2, 0.10, 32, 128]} />
          <meshStandardMaterial color="#F0EDE8" metalness={0.2} roughness={0.15} />
        </mesh>

        {/* Plate body */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.08, 64]} />
          <meshStandardMaterial color="#F5F2EE" metalness={0.1} roughness={0.2} />
        </mesh>

        {/* Food surface (textured disc) */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 64]} />
          <meshStandardMaterial map={texture} roughness={0.8} />
        </mesh>
      </group>
    </>
  )
}
