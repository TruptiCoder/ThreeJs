import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("matcaps/8.png")
const matcapTexture2 = textureLoader.load("matcaps/7.png")
const matcapTexture3 = textureLoader.load("matcaps/4.png")
const matcapTexture4 = textureLoader.load("matcaps/3.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture2.colorSpace = THREE.SRGBColorSpace
matcapTexture3.colorSpace = THREE.SRGBColorSpace
matcapTexture4.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            `     Hello,
I am Trupti`,
            {
                font,
                size: 0.5,
                height: 0.2,
                depth: 0.1,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        // Hard way to center the text
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
        // )
        // textGeometry.computeBoundingBox()

        // easy way
        textGeometry.center()

        // const material = new THREE.MeshNormalMaterial()

        const material = new THREE.MeshMatcapMaterial()
        material.matcap = matcapTexture

        const material2 = new THREE.MeshMatcapMaterial()
        material2.matcap = matcapTexture2

        const material3 = new THREE.MeshMatcapMaterial()
        material3.matcap = matcapTexture3

        const material4 = new THREE.MeshMatcapMaterial()
        material4.matcap = matcapTexture4

        const textMaterial = new THREE.MeshNormalMaterial()

        const donutMaterials = [material, material2, material3, material4]

        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        console.time("donuts")
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 25)
        const donutGeometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const donutGeometry3 = new THREE.SphereGeometry(0.5)

        const donutGeometries = [donutGeometry, donutGeometry2, donutGeometry3]

        for(let i = 0; i < 200; i++) {
            const num = Math.floor(Math.random() * 4)
            const geo = Math.floor(Math.random() * 3)

            const donut = new THREE.Mesh(donutGeometries[geo], donutMaterials[num])

            //translation
            donut.position.x = (Math.random() - 0.5) * 15
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 15

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

        console.timeEnd("donuts")
    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 1, 1)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enableZoom = false
controls.autoRotate = true

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()