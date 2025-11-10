import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { useLoader } from "@react-three/fiber"
import { Clone, useGLTF } from "@react-three/drei"

export default function Model() {

    // const model = useLoader(GLTFLoader, './hamburger-draco.glb', (loader) => {
    //     const dracoLoader = new DRACOLoader()
    //     dracoLoader.setDecoderPath('./draco/')
    //     loader.setDRACOLoader(dracoLoader)
    // })

    const model = useGLTF('./hamburger.glb')

    return (
        <>
            {/* <primitive object={model.scene} scale={.3} /> */}
            <Clone object={model.scene} scale={.1} position-x={2} />
            <Clone object={model.scene} scale={.1} position-x={0} />
            <Clone object={model.scene} scale={.1} position-x={-2} />
        </>
    )
}

useGLTF.preload('./hamburger.glb')