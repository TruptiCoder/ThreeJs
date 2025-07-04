import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug UI
 */

const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loading Textures
 */

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
const doorAlpaTexture = textureLoader.load("./textures/door/alpha.jpg")
const ambientTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg")
const heightTexture = textureLoader.load("./textures/door/height.jpg")
const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const normalTexture = textureLoader.load("./textures/door/normal.jpg")
const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("./textures/matcaps/8.png")
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// material.side = THREE.DoubleSide
// material.map = doorColorTexture
// material.color = new THREE.Color('red')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = doorAlpaTexture

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial (uses lights)
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = ambientTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.transparent = true
// material.alphaMap = doorAlpaTexture


// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = ambientTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlpaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

// Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 1
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.001)
// gui.addColor(material, 'sheenColor')

// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 100]

// gui.add(material, 'iridescence').min(0).max(1).step(0.001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.33).step(0.001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.001)
gui.add(material, 'ior').min(1).max(10).step(0.01)
gui.add(material, 'thickness').min(1).max(10).step(0.01)

/**
 * Objects
 */

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), 
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), 
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128), 
    material
)

sphere.position.x = -1.5
torus.position.x = 1.5

scene.add(sphere, plane, torus);

/**
 * Lights
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = envMap
    scene.environment = envMap
})

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


const clock = new THREE.Clock()
const tick = () => {
    const elapsed = clock.getElapsedTime()

    sphere.rotation.x = elapsed * -0.15
    plane.rotation.x = elapsed * -0.15
    torus.rotation.x = elapsed * -0.15

    sphere.rotation.y = elapsed * 0.1
    plane.rotation.y = elapsed * 0.1
    torus.rotation.y = elapsed * 0.1

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()