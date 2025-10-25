import { useThree, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObjects from "./CustomObjects"

extend({OrbitControls})

export default function Experience() {

    const cubeRef = useRef()
    const groupRef = useRef()
    const {camera, gl} = useThree()

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;

        // Animating the Camera
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={2} color={"white"} />
            <ambientLight intensity={0.5} />

            <group ref={ groupRef } position={[0, 0, 2]}>
                <mesh ref={ cubeRef } scale={1} position={[1.5, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color={"mediumpurple"} />
                </mesh>

                <mesh position={[-1.5, 0, 0]}>
                    <sphereGeometry  args={[.8, 32, 32]} />
                    <meshStandardMaterial color={"orange"} />
                </mesh>
            </group>

            <mesh rotation-x={-Math.PI * 0.40} scale={10} position={[0, 0, -2]}>
                <planeGeometry />
                <meshStandardMaterial color="skyblue" />
            </mesh>

            <CustomObjects />
        </>
    )
}