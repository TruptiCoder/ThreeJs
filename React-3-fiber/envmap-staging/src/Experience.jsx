import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { Sky, ContactShadows, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls, RandomizedLight, Environment, Lightformer, Stage } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience() {

    const cubeRef = useRef()
    const dirLight = useRef()

    // useHelper(dirLight, THREE.DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta * 0.2
        // const time = state.clock.elapsedTime
        // cubeRef.current.position.x = 2 + Math.sin(time)
    })

    const { color, opacity, blur} = useControls('contact Shadows', {
        color: '#111111',
        opacity: { value: .5, min: 0, max: 1, step: 0.01 },
        blur: { value: 2, min: 0, max: 10, step: 0.01 }
    })

    const { sunPosition } = useControls('Sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('Environment Map', {
        envMapIntensity: { value: 0.7, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100},
        envMapRadius: { value: 28, min: 10, max: 1000},
        envMapScale: { value: 10, min: 10, max: 1000}
    })

    const { metalness, roughness } = useControls("Mesh", {
        metalness: { value: 1.9, min: 0, max: 10 },
        roughness: { value: 0.3, min: 0, max: 10 }
    })
    
  return (
    <>
        <Environment 
            background
            // files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
            ground={ {
                'height': envMapHeight,
                'radius': envMapRadius,
                'scale': envMapScale
            } }
            preset='sunset'
            environmentIntensity={ envMapIntensity }
            resolution={ 32 }
        >
            <color args={ ['#000000'] } attach={ 'background' } />
            <mesh position-z={ -5 } scale={ 10 } >
                <planeGeometry />
                <meshBasicMaterial color={ [10, 0, 0] } />
            </mesh>
            <Lightformer 
                position-z={ -5 } 
                scale={ 10 } 
                color={ 'turquoise' }
                intensity={ 2 }
                form={ 'ring' }
            />
        </Environment>


        {/* [
            './environmentMaps/2/px.jpg',
            './environmentMaps/2/nx.jpg',
            './environmentMaps/2/py.jpg',
            './environmentMaps/2/ny.jpg',
            './environmentMaps/2/pz.jpg',
            './environmentMaps/2/nz.jpg',
        ] To use cubeTextures  */}
            

        <Perf position='top-left'/>

        <color args={ ['purple'] } attach={ 'background' } />

        {/* <SoftShadows size={25} samples={10} focus={0} /> */}
        {/* <BakeShadows /> */}
        
        <OrbitControls />

        {/* <AccumulativeShadows 
            position={ [0, -0.99, 0] }
            color='#316d39'
            opacity={ 0.8 }
            scale={ 10 }
            frames={ 100 }
            temporal
        >
            <RandomizedLight 
                amount={ 8 }
                radius={ 1 }
                ambient={ 0.5 }
                intensity={ 3 }
                bias={ 0.001 }
                position={ [1, 2, 3] }
            />
        </AccumulativeShadows> */}

        <ContactShadows
            position={ [0, -1, 0] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
        />

        {/* <ambientLight />
        <directionalLight 
            ref={dirLight}
            position={ sunPosition }
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

        <Sky 
            sunPosition={ sunPosition }
        /> */}

        {/* <Stage environment={'sunset'} preset={'portrait'} > */}
            <mesh ref={cubeRef} castShadow position={ [2, 0, 0] } >
                <boxGeometry />
                <meshStandardMaterial color={'mediumpurple'} metalness={ metalness } roughness={ roughness } />
            </mesh>

            <mesh castShadow position={ [ -2, 0, 0] } scale={0.8} >
                <sphereGeometry />
                <meshStandardMaterial color={ 'orange' } metalness={ metalness } roughness={ roughness } />
            </mesh>
            
            
        {/* </Stage> */}

    </>
  )
}