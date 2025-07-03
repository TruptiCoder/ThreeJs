import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

gui.hide()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/diff.webp')
const floorArmTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/arm.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/nor.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/disp.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.repeat.set(8, 8)
floorArmTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

// walls
const wallColorTexture = textureLoader.load('./wall/rock_wall_13_1k/diff.webp')
const wallArmTexture = textureLoader.load('./wall/rock_wall_13_1k/arm.webp')
const wallNormalTexture = textureLoader.load('./wall/rock_wall_13_1k/nor.webp')
wallColorTexture.colorSpace = THREE.SRGBColorSpace

// roof
const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_02_1k/diff.webp')
const roofArmTexture = textureLoader.load('./roof/clay_roof_tiles_02_1k/arm.webp')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_02_1k/nor.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofArmTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofArmTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bushesh
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/diff.webp')
const bushArmTexture = textureLoader.load('./bush/leaves_forest_ground_1k/arm.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/nor.webp')
bushColorTexture.colorSpace = THREE.SRGBColorSpace

// Graves
const graveColorTexture = textureLoader.load('./cracked_concrete/diff.webp')
const graveArmTexture = textureLoader.load('./cracked_concrete/arm.webp')
const graveNormalTexture = textureLoader.load('./cracked_concrete/nor.webp')
graveColorTexture.colorSpace = THREE.SRGBColorSpace

// door
const doorColorTexture = textureLoader.load('./door/color.webp')
const dooralphaTexture = textureLoader.load('./door/alpha.webp')
const doorheightTexture = textureLoader.load('./door/height.webp')
const doorambientTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doornormalTexture = textureLoader.load('./door/normal.webp')
const doorroughTexture = textureLoader.load('./door/roughness.webp')
const doormetalTexture = textureLoader.load('./door/metalness.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace


/**
 * House
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorArmTexture,
        aoMap: floorArmTexture,
        metalnessMap: floorArmTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.16
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisBias')

const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallArmTexture,
        normalMap: wallNormalTexture,
        roughnessMap: wallArmTexture,
    })
)
walls.position.y = 1.25
house.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofArmTexture,
        normalMap: roofNormalTexture,
        roughnessMap: roofArmTexture
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: dooralphaTexture,
        roughnessMap: doorroughTexture,
        aoMap: doorambientTexture,
        normalMap: doornormalTexture,
        metalnessMap: doormetalTexture,
        displacementMap: doorheightTexture,
        displacementScale: 0.2,
        displacementBias: -0.04
    })
)
door.position.set(0, 1, 2 + 0.01)
house.add(door)

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: 0xccffcc,
    map: bushColorTexture,
    aoMap: bushArmTexture,
    roughnessMap: bushArmTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.rotation.x = - 0.75
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.rotation.x = - 0.75
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.rotation.x = - 0.75
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.rotation.x = - 0.75
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    map: graveColorTexture,
    aoMap: graveArmTexture,
    roughnessMap: graveArmTexture,
    normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.castShadow = true

    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// doorLight
const doorLight = new THREE.PointLight(0xff7d46, 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

// cast and recieve
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
floor.receiveShadow = true
roof.castShadow = true

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.top = 10

ghost2.shadow.mapSize.height = 256
ghost2.shadow.mapSize.width = 256
ghost2.shadow.camera.top = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.top = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.add(sky)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#ff0000', 1, 13)
scene.fog = new THREE.FogExp2('#02343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts Animation
    
    const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45)
    ghost1.position.z = Math.sin(ghostAngle) * 4
    
    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    
    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 7
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)
    ghost3.position.z = Math.sin(ghost3Angle) * 7

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()