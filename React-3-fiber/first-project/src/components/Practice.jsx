import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

extend({ OrbitControls })

export default function Practice() {
    const { camera, gl } = useThree()
    camera.position.set(3, 12, 3)

    const mercury = useRef()
    const venus = useRef()
    const earth = useRef()
    const moon = useRef()
    const mars = useRef()
    const jupiter = useRef()
    const saturn = useRef()
    const uranus = useRef()
    const neptune = useRef()

    // Moon groups
    const marsMoons = useRef()
    const jupiterMoons = useRef()
    const saturnMoons = useRef()
    const uranusMoons = useRef()
    const neptuneMoons = useRef()

    // Function to generate random moon positions
    const generateMoons = (count, minRadius, maxRadius) => {
        const moons = []
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI // horizontal angle
            const phi = Math.random() * Math.PI // vertical angle
            const radius = THREE.MathUtils.lerp(minRadius, maxRadius, Math.random())
            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)
            moons.push({ x, y, z })
        }
        return moons
    }

    // Generate random moon data once using useMemo
    const marsMoonPositions = useMemo(() => generateMoons(2, 0.25, 0.4), [])
    const jupiterMoonPositions = useMemo(() => generateMoons(95, 0.5, 0.9), [])
    const saturnMoonPositions = useMemo(() => generateMoons(83, 0.45, 0.8), [])
    const uranusMoonPositions = useMemo(() => generateMoons(27, 0.4, 0.7), [])
    const neptuneMoonPositions = useMemo(() => generateMoons(14, 0.35, 0.6), [])

    // Rotation logic
    useFrame((_, delta) => {
        mercury.current.rotation.y += delta * 1.5
        venus.current.rotation.y += delta * 1
        earth.current.rotation.y += delta * 0.7
        moon.current.rotation.y += delta * 0.3
        mars.current.rotation.y += delta * 0.8
        jupiter.current.rotation.y += delta * 0.5
        saturn.current.rotation.y += delta * 0.4
        uranus.current.rotation.y += delta * 0.3
        neptune.current.rotation.y += delta * 0.2

        // Orbit motion for moon groups
        marsMoons.current.rotation.y += delta * 0.5
        jupiterMoons.current.rotation.y += delta * 0.5
        saturnMoons.current.rotation.y += delta * 0.5
        uranusMoons.current.rotation.y += delta * 0.5
        neptuneMoons.current.rotation.y += delta * 0.5
    })

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            {/* 🌞 Sun */}
            <mesh name="sun">
                <sphereGeometry args={[1]} />
                <meshBasicMaterial color="orange" />
            </mesh>

            {/* 🌑 Mercury (0 moons) */}
            <group ref={mercury}>
                <mesh position={[1.5, 0, 0]}>
                    <sphereGeometry args={[0.05]} />
                    <meshBasicMaterial color="#b1b1b1" />
                </mesh>
            </group>

            {/* 🌕 Venus (0 moons) */}
            <group ref={venus}>
                <mesh position={[2, 0, 0]}>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial color="#e0c16d" />
                </mesh>
            </group>

            {/* 🌍 Earth (1 moon) */}
            <group ref={earth}>
                <mesh position={[3, 0, 0]}>
                    <sphereGeometry args={[0.3]} />
                    <meshBasicMaterial color="royalblue" />
                    <group ref={moon}>
                        <mesh position={[0.5, 0, 0]}>
                            <sphereGeometry args={[0.03]} />
                            <meshBasicMaterial color="white" />
                        </mesh>
                    </group>
                </mesh>
            </group>

            {/* 🔴 Mars (2 moons) */}
            <group ref={mars}>
                <mesh position={[3.8, 0, 0]}>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial color="#c1440e" />
                    <group ref={marsMoons}>
                        {marsMoonPositions.map((pos, i) => (
                            <points key={i} position={[pos.x, 0, pos.z]}>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        array={new Float32Array([0, 0, 0])}
                                        count={1}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <pointsMaterial size={0.05} color="white" />
                            </points>
                        ))}
                    </group>
                </mesh>
            </group>

            {/* 🪐 Jupiter */}
            <group ref={jupiter}>
                <mesh position={[5.2, 0, 0]}>
                    <sphereGeometry args={[0.4]} />
                    <meshBasicMaterial color="#d2b48c" />
                    <group ref={jupiterMoons}>
                        {jupiterMoonPositions.map((pos, i) => (
                            <points key={i} position={[pos.x, 0, pos.z]}>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        array={new Float32Array([0, 0, 0])}
                                        count={1}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <pointsMaterial size={0.05} color="white" />
                            </points>
                        ))}
                    </group>
                </mesh>
            </group>

            {/* 💍 Saturn */}
            <group ref={saturn}>
                <mesh position={[6.5, 0, 0]}>
                    <sphereGeometry args={[0.35]} />
                    <meshBasicMaterial color="#deb887" />
                    <group ref={saturnMoons}>
                        {saturnMoonPositions.map((pos, i) => (
                            <points key={i} position={[pos.x, 0, pos.z]}>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        array={new Float32Array([0, 0, 0])}
                                        count={1}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <pointsMaterial size={0.05} color="white" />
                            </points>
                        ))}
                    </group>
                </mesh>
            </group>

            {/* 🌀 Uranus */}
            <group ref={uranus}>
                <mesh position={[7.8, 0, 0]}>
                    <sphereGeometry args={[0.25]} />
                    <meshBasicMaterial color="#7fffd4" />
                    <group ref={uranusMoons}>
                        {uranusMoonPositions.map((pos, i) => (
                            <points key={i} position={[pos.x, 0, pos.z]}>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        array={new Float32Array([0, 0, 0])}
                                        count={1}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <pointsMaterial size={0.05} color="white" />
                            </points>
                        ))}
                    </group>
                </mesh>
            </group>

            {/* 🌊 Neptune */}
            <group ref={neptune}>
                <mesh position={[9, 0, 0]}>
                    <sphereGeometry args={[0.23]} />
                    <meshBasicMaterial color="#4169e1" />
                    <group ref={neptuneMoons}>
                        {neptuneMoonPositions.map((pos, i) => (
                            <points key={i} position={[pos.x, 0, pos.z]}>
                                <bufferGeometry>
                                    <bufferAttribute
                                        attach="attributes-position"
                                        array={new Float32Array([0, 0, 0])}
                                        count={1}
                                        itemSize={3}
                                    />
                                </bufferGeometry>
                                <pointsMaterial size={0.05} color="white" />
                            </points>
                        ))}
                    </group>
                </mesh>
            </group>
        </>
    )
}
