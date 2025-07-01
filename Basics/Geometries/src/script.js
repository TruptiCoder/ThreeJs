import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 3, 4, 4, 4)

const count = 200
const posArr = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
    posArr[i] = (Math.random() - 0.5) * 4
}

const posAttributes = new THREE.BufferAttribute(posArr, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute("position", posAttributes)

const material = new THREE.MeshBasicMaterial({ 
    color: 0xaa00ff, 
    wireframe: true
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

window.addEventListener("dblclick", () => {
    if(!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
    else document.exitFullscreen()
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 0.8
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
controls.enabled = false
controls.autoRotate = true

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()