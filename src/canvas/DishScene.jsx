import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Vector2 } from 'three'

// Y level of the plate's inner well surface (food sits here)
const WELL_Y = 0.055

function Plate() {
  // 2D profile [radius, height] rotated around Y → realistic dinner plate
  const points = useMemo(() => [
    new Vector2(0.001, WELL_Y + 0.012), // center lip (tiny offset avoids degenerate pole)
    new Vector2(0.28,  WELL_Y + 0.008),
    new Vector2(0.58,  WELL_Y + 0.000),
    new Vector2(0.74,  WELL_Y - 0.012), // well floor (slightly concave)
    new Vector2(0.84,  WELL_Y - 0.008),
    new Vector2(0.91,  WELL_Y + 0.004), // shoulder
    new Vector2(0.97,  WELL_Y + 0.022), // rim inner face
    new Vector2(1.04,  WELL_Y + 0.044), // rim top inner
    new Vector2(1.13,  WELL_Y + 0.046), // rim top flat
    new Vector2(1.21,  WELL_Y + 0.032), // rim outer top
    new Vector2(1.27,  WELL_Y + 0.004), // outer edge
    new Vector2(1.27,  -0.010),         // outer edge base
    new Vector2(1.21,  -0.018),         // underside outer
    new Vector2(0.92,  -0.022),         // underside
    new Vector2(0.88,  -0.028),         // foot ring outer
    new Vector2(0.82,  -0.022),         // foot ring inner
    new Vector2(0.76,  -0.028),         // underside inner
    new Vector2(0.001, -0.028),         // center bottom
  ], [])

  return (
    <group>
      {/* Main plate body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 120]} />
        <meshStandardMaterial color="#F4F1ED" metalness={0.03} roughness={0.22} />
      </mesh>
      {/* Subtle porcelain rim highlight */}
      <mesh position={[0, WELL_Y + 0.047, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.04, 1.22, 120]} />
        <meshStandardMaterial color="#FEFCFA" metalness={0.05} roughness={0.10} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

// Paella Valenciana — saffron rice, mussels, red peppers
function PaellaFood() {
  const grains = useMemo(() => {
    const items = []
    const rings = [
      { r: 0.1, count: 6 },
      { r: 0.28, count: 12 },
      { r: 0.46, count: 18 },
      { r: 0.63, count: 22 },
      { r: 0.79, count: 26 },
    ]
    rings.forEach(({ r, count }, ring) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + ring * 0.45
        items.push({
          x: Math.cos(angle) * r,
          z: Math.sin(angle) * r,
          ry: angle + Math.PI / 2,
          colorIdx: (ring + i) % 4,
        })
      }
    })
    return items
  }, [])

  const grainColors = ['#E0A020', '#B07808', '#D4940C', '#C88A10']
  const mussels = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ angle: (i / 6) * Math.PI * 2 })), [])
  const peppers = useMemo(() => Array.from({ length: 3 }, (_, i) => ({ angle: (i / 3) * Math.PI * 2 + 1.0 })), [])

  return (
    <group position={[0, WELL_Y - 0.012, 0]}>
      {/* Saffron rice base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 48]} />
        <meshStandardMaterial color="#C8920A" roughness={0.95} />
      </mesh>
      {/* Rice grains */}
      {grains.map((g, i) => (
        <mesh key={i} position={[g.x, 0.013, g.z]} rotation={[Math.PI / 2, 0, g.ry]}>
          <capsuleGeometry args={[0.016, 0.055, 2, 5]} />
          <meshStandardMaterial color={grainColors[g.colorIdx]} roughness={0.92} />
        </mesh>
      ))}
      {/* Mussels */}
      {mussels.map(({ angle }, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.64, 0.04, Math.sin(angle) * 0.64]} rotation={[0.3, angle, 0]}>
          <sphereGeometry args={[0.1, 8, 5, 0, Math.PI]} />
          <meshStandardMaterial color="#1A1A16" roughness={0.25} metalness={0.55} />
        </mesh>
      ))}
      {/* Red pepper strips */}
      {peppers.map(({ angle }, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.42, 0.04, Math.sin(angle) * 0.42]} rotation={[Math.PI / 2, 0, angle]}>
          <capsuleGeometry args={[0.022, 0.2, 2, 6]} />
          <meshStandardMaterial color="#D42200" roughness={0.82} />
        </mesh>
      ))}
      {/* Parsley sprig */}
      <mesh position={[0.08, 0.06, -0.16]}>
        <sphereGeometry args={[0.055, 5, 5]} />
        <meshStandardMaterial color="#1E5C10" roughness={0.95} />
      </mesh>
    </group>
  )
}

// Secreto Ibérico — chargrilled pork, PX sauce, roasted peppers
function SecretoFood() {
  const herbs = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ x: 0.36 + i * 0.028, z: -0.26 + i * 0.04 })), [])

  return (
    <group position={[0, WELL_Y - 0.008, 0]}>
      {/* Pedro Ximénez sauce smear */}
      <mesh position={[0.05, 0.001, 0.1]} scale={[1.6, 1, 0.75]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.012, 20]} />
        <meshStandardMaterial color="#5A1800" roughness={0.28} metalness={0.08} transparent opacity={0.9} />
      </mesh>
      {/* Meat slab */}
      <mesh position={[0, 0.055, 0]} rotation={[0, 0.35, 0]}>
        <capsuleGeometry args={[0.25, 0.62, 6, 12]} />
        <meshStandardMaterial color="#7A2E14" roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Char crust overlay */}
      <mesh position={[0, 0.085, 0]} scale={[0.95, 0.18, 0.95]} rotation={[0, 0.35, 0]}>
        <capsuleGeometry args={[0.25, 0.62, 4, 10]} />
        <meshStandardMaterial color="#2C0D06" roughness={0.95} transparent opacity={0.5} />
      </mesh>
      {/* Roasted red pepper */}
      <mesh position={[-0.52, 0.03, 0.1]} rotation={[Math.PI / 2, 0, 0.5]}>
        <capsuleGeometry args={[0.07, 0.28, 3, 8]} />
        <meshStandardMaterial color="#C03000" roughness={0.82} />
      </mesh>
      {/* Micro herb garnish */}
      {herbs.map((h, i) => (
        <mesh key={i} position={[h.x, 0.06, h.z]}>
          <sphereGeometry args={[0.018, 4, 4]} />
          <meshStandardMaterial color="#2A6018" roughness={0.95} />
        </mesh>
      ))}
    </group>
  )
}

// Gambas al Ajillo — prawns in garlic sherry oil, chilli
function GambasFood() {
  const prawns = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ angle: (i / 5) * Math.PI * 2 - 0.3 })), [])
  const garlic = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    angle: (i / 10) * Math.PI * 2,
    r: 0.2 + (i % 3) * 0.16,
  })), [])

  return (
    <group position={[0, WELL_Y - 0.010, 0]}>
      {/* Sherry/garlic oil pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 40]} />
        <meshStandardMaterial color="#C87A08" roughness={0.18} metalness={0.12} transparent opacity={0.75} />
      </mesh>
      {/* Prawns */}
      {prawns.map(({ angle }, i) => (
        <group key={i} position={[Math.cos(angle) * 0.38, 0, Math.sin(angle) * 0.38]}>
          <mesh position={[0, 0.05, 0]} rotation={[0.5, angle + Math.PI / 2, 0]}>
            <capsuleGeometry args={[0.055, 0.38, 4, 8]} />
            <meshStandardMaterial color="#E85A30" roughness={0.72} metalness={0.04} />
          </mesh>
          {/* Prawn head */}
          <mesh position={[Math.cos(angle) * 0.22, 0.07, Math.sin(angle) * 0.22]}>
            <sphereGeometry args={[0.065, 7, 7]} />
            <meshStandardMaterial color="#CC4020" roughness={0.68} metalness={0.06} />
          </mesh>
        </group>
      ))}
      {/* Garlic slices */}
      {garlic.map(({ angle, r }, i) => (
        <mesh key={i} position={[Math.cos(angle) * r, 0.025, Math.sin(angle) * r]}>
          <cylinderGeometry args={[0.04, 0.04, 0.018, 6]} />
          <meshStandardMaterial color="#F0D8A0" roughness={0.88} />
        </mesh>
      ))}
      {/* Guindilla chilli */}
      <mesh position={[0.3, 0.06, -0.4]} rotation={[Math.PI / 2, 0, 0.7]}>
        <capsuleGeometry args={[0.025, 0.25, 3, 6]} />
        <meshStandardMaterial color="#CC1100" roughness={0.75} />
      </mesh>
    </group>
  )
}

const FOOD_MAP = { 1: PaellaFood, 2: SecretoFood, 3: GambasFood }

export default function DishScene({ hovered = false, dishId = 1 }) {
  const groupRef = useRef()
  const floatRef = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += hovered ? 0.018 : 0.005
    // Gentle floating bob
    floatRef.current += delta * 0.6
    groupRef.current.position.y = Math.sin(floatRef.current) * 0.04
  })

  const FoodComponent = FOOD_MAP[dishId] ?? PaellaFood

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.65} />
      {/* Warm key light from upper-right */}
      <pointLight color="#FFF5E0" intensity={3.0} position={[3, 5, 3]} />
      {/* Cool fill from left */}
      <pointLight color="#C8D8FF" intensity={1.0} position={[-3, 3, 2]} />
      {/* Warm back rim light for food pop */}
      <pointLight color="#E63946" intensity={1.8} position={[0, -1.5, -2]} />
      {/* Overhead soft white */}
      <pointLight color="#FFFFFF" intensity={0.9} position={[0, 6, 1]} />

      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.45}
        scale={4}
        blur={2.2}
        far={1}
        color="#1a0a00"
      />

      <group ref={groupRef} rotation={[-0.28, 0, 0]}>
        <Plate />
        <FoodComponent />
      </group>
    </>
  )
}
