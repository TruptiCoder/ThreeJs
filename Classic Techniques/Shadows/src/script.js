import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('textures/simpleShadow.jpg')

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
directionalLight.position.x = 2
directionalLight.position.y = 3
directionalLight.position.z = 4

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = 8
directionalLight.shadow.camera.top = 3
directionalLight.shadow.camera.bottom = -3
directionalLight.shadow.camera.right = 3
directionalLight.shadow.camera.left = -3
directionalLight.shadow.radius = 10

const dirLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
dirLightCameraHelper.visible = false
scene.add(dirLightCameraHelper)

scene.add(directionalLight)

// Spotlight
const spotLight = new THREE.SpotLight(0xffffff, 5, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.position.set(-1, 2, 2)

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 2
spotLight.shadow.camera.far = 5

scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCamHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightCamHelper.visible = false
scene.add(spotLightCamHelper)

// pointlight
const pointLight = new THREE.PointLight(0xffffff, 10)
pointLight.position.set(1, 2, -2)
pointLight.castShadow = true

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 1
pointLight.shadow.camera.far = 5

scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true

scene.add(sphere, plane)

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow)

/**
 * Debug GUI
 */

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.1)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.1)
gui.add(directionalLight.position, 'x').min(0).max(5).step(0.1)
gui.add(directionalLight.position, 'y').min(0).max(5).step(0.1)
gui.add(directionalLight.position, 'z').min(0).max(5).step(0.1)
gui.add(material, 'roughness').min(0).max(1).step(0.1)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = false
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update sphere
    sphere.position.x = Math.sin(elapsedTime)
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))
    sphere.position.z = Math.cos(elapsedTime)

    // Update shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()