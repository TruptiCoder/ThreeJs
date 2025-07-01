import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log("onStart")
// }

// loadingManager.onLoad = () => {
//     console.log("onLoad")
// }

// loadingManager.onProgress = () => {
//     console.log("onProgress")
// }

// loadingManager.onError = () => {
//     console.log("onError")
// }

const textureLoader = new THREE.TextureLoader(loadingManager)

// const colorTexture = textureLoader.load('./textures/door/color.jpg')
const colorTexture = textureLoader.load('./textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace

const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./textures/door/height.jpg')
const metalTexture = textureLoader.load('./textures/door/metalness.jpg')
const roughTexture = textureLoader.load('./textures/door/roughness.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
const ambientTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')

// Transforming Textures
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping // for x
// colorTexture.wrapT = THREE.RepeatWrapping // for y

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.set(0.5, 0.5)

// Filtering and Mipmapping
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter // better performance
colorTexture.magFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({
    map: colorTexture
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
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

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()