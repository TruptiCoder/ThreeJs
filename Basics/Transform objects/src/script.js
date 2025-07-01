import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// Position (vector)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)

// Scale (vector)
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(1, 0.5, 0.5)

// Rotation (Eular)
mesh.rotation.reorder("YZX")
mesh.rotation.y = Math.PI * 0.75
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.z = Math.PI * 0.85

// scene.add(mesh)

// Normalizes position to length to be 1 from center
// mesh.position.normalize()

// console.log(mesh.position.length())

// Creating a Group
const group = new THREE.Group()

group.position.y = -0.5
group.rotation.z = Math.PI * 0.25

scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x00fff0})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xdd00df})
)

cube1.position.x = 1
cube2.position.x = -1
cube3.position.y = 1.2
group.add(cube1)
group.add(cube2)
group.add(cube3)

// Axes helper
const axesHelper  = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Distance from camera to mesh
// console.log(mesh.position.distanceTo(camera.position))

// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)