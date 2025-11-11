import { OrbitControls, useTexture } from "@react-three/drei"
import vertexShader from './shaders/test/vertex.glsl'
import fragmentShader from './shaders/test/fragment.glsl'
import { BufferAttribute, DoubleSide, Vector2, Vector3 } from "three"
import { useEffect, useRef } from "react"
import { useControls } from 'leva'
import { useFrame } from "@react-three/fiber"

export default function Experience() {

    const flag = useTexture('./Flag.svg')

    const meshRef = useRef()
    const uniforms = useRef({
        uFrequency: { value: new Vector2(5, 2) },
        uTime: { value: 0 },
        uColor: { value: new Vector3(0.6, 0.2, 1.0) },
        uTexture: { value: flag }
    })

    const {wave} = useControls({
        wave: {
            value: {x: 5, y: 2},
            joystick: 'invertY'
        }
    })

    useEffect(() => {
        uniforms.current.uFrequency.value.set(wave.x, wave.y)
    }, [wave])

    useEffect(() => {
        const count = meshRef.current.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for(let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        meshRef.current.geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1))

    }, [])

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        uniforms.current.uTime.value = elapsedTime
    })

  return (
    <>
        <OrbitControls />
        <color args={['#333']} attach={'background'} />

        <mesh ref={meshRef} scale={[3, 2, 0]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial 
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={DoubleSide}
                transparent
                uniforms={uniforms.current}
            />
        </mesh>

    </>
  )
}
