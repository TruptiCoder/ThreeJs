import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import GUI from 'lil-gui'
import gsap from "gsap"

const gui = new GUI({
    width: 300,
    title: "Nice debug UI",
    closeFolders: false,
})
// gui.close()

window.addEventListener("keydown", (event) => {
    if(event.key == 'h')
        gui.show(gui._hidden)
})

const debugObj = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObj.color = '#962eff'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ 
    color: debugObj.color,
    // wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Adding a folder to gui
const cubeTweaks = gui.addFolder("Awesome cube")
// cubeTweaks.close()

// Range
cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name("Elevation")

// CheckBox
cubeTweaks
    .add(mesh, 'visible')

cubeTweaks
    .add(material, 'wireframe')

// Color
cubeTweaks
    .addColor(debugObj, 'color')
    .onChange((value) => {
        material.color.set(debugObj.color)
    })

// Button / function
debugObj.spin = () => {
    gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI * 2
    })
}

cubeTweaks
    .add(debugObj, 'spin')

// Subdivision for geometry
debugObj.subdivision = 2

cubeTweaks
    .add(debugObj, 'subdivision')
    .min(1)
    .max(10)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObj.subdivision, debugObj.subdivision, debugObj.subdivision,
        )
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

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()