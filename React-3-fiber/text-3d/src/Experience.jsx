import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { jsx } from 'react/jsx-runtime'
import * as THREE from 'three'

// const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
// const material = new THREE.MeshMatcapMaterial()

export default function Experience() {

    const [matcapTexture] = useMatcapTexture('8A6565_2E214D_D48A5F_ADA59C', 256)
    const [torusGeometry, setTorusGeometry] = useState()
    const [material, setMaterial] = useState()

    const donutsGroupRef = useRef()
    const donuts = useRef([])

    // useEffect(() => {
    //     material.matcap = matcapTexture
    //     material.needsUpdate = true
    // }, [])

    useFrame((state, delta) => {
        for(const donut of donutsGroupRef.current.children) {
            donut.rotation.y += delta * 0.2
        }
        
        // for(const donut of donuts.current) {
        //     donut.rotation.y += delta * 0.2
        // }
    })
     
    return (
        <>
            <Perf position='top-left' />
 
            <OrbitControls />
            <color args={['black']} attach={'background'} />

            <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
            <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

            <Center>
                <Text3D 
                    font={'./fonts/helvetiker_regular.typeface.json'}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelSize={0.02}
                    bevelThickness={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    material={material}
                >
                    Hello R3F
                </Text3D>
            </Center> 

            <group ref={donutsGroupRef}>
                { [...Array(100)].map((val, idx) =>
                    <mesh
                        // ref={(element) => donuts.current[idx] = element}
                        key={idx}
                        position={[
                            (Math.random() - 0.5) * 20,
                            (Math.random() - 0.5) * 20,
                            (Math.random() - 0.5) * 20
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0
                        ]}
                        geometry={torusGeometry}
                        material={material}
                    />
                ) }
            </group>

        </>
    )
}