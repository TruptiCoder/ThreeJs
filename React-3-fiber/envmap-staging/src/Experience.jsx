import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls, RandomizedLight } from '@react-three/drei'
import * as THREE from 'three'

export default function Experience() {

    const cubeRef = useRef()
    const dirLight = useRef()

    useHelper(dirLight, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta * 0.2
    })
    
  return (
    <>
        <Perf position='top-left'/>

        <color args={ ['purple'] } attach={ 'background' } />

        {/* <SoftShadows size={25} samples={10} focus={0} /> */}
        {/* <BakeShadows /> */}
        
        <OrbitControls />

        <AccumulativeShadows 
            position={ [0, -0.99, 0] }
            scale={ 10 }
        >
            <RandomizedLight 
                position={ [1, 2, 3] }
            />
        </AccumulativeShadows>

        <ambientLight />
        <directionalLight 
            ref={dirLight}
            position={ [1, 2, 3] }
            intensity={2}
            castShadow
            shadow-mapSize={ [1024, 1024] } 
            shadow-camera-near = { 1 }
            shadow-camera-far = { 10 }
            shadow-camera-top = { 5 }
            shadow-camera-right = { 5 }
            shadow-camera-bottom = { -5 }
            shadow-camera-left = { -5 }
        />

        <group>
            <mesh ref={cubeRef} castShadow position={ [2, 0, 0] } >
                <boxGeometry />
                <meshStandardMaterial color={'mediumpurple'} />
            </mesh>

            <mesh castShadow position={ [ -2, 0, 0] } scale={0.8} >
                <sphereGeometry />
                <meshStandardMaterial color={ 'orange' } />
            </mesh>

            <mesh scale={10} position={ [0, -1, 0] } rotation-x={ -Math.PI * .5} > {/* receiveShadow needs to be added */}
                <planeGeometry />
                <meshStandardMaterial color={'yellowgreen'} />
            </mesh>
        </group>

    </>
  )
}