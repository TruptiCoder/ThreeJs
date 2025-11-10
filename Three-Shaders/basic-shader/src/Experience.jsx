import { OrbitControls } from "@react-three/drei"
import vertexShader from './shaders/test/vertex.glsl'
import fragmentShader from './shaders/test/fragment.glsl'
import { BufferAttribute, DoubleSide } from "three"
import { useEffect, useRef } from "react"

export default function Experience() {

    const meshRef = useRef()

    useEffect(() => {
        const count = meshRef.current.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for(let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        meshRef.current.geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1))
    }, [])

  return (
    <>
        <OrbitControls />
        <color args={['#333']} attach={'background'} />

        <mesh ref={meshRef}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <rawShaderMaterial 
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={DoubleSide}
                transparent
            />
        </mesh>

    </>
  )
}
