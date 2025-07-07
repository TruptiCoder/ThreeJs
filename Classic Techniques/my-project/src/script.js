import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'

const canvas = document.querySelector('canvas.webgl')
const gui = new GUI()
const scene = new THREE.Scene()

const params = {}
params.cubex = 1
params.duration = 1


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('matcaps/8.png')
matcap.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshMatcapMaterial({
        matcap: matcap
    })
)
cube.position.x = params.cubex
scene.add(cube)

// Particles
const count = 1000
const particleGeometry = new THREE.BufferGeometry()
const pos = new Float32Array(count * 3)

for(let i = 0; i < count; i++) {
    const i3 = i * 3
    pos[i3] = (Math.random() - 0.5) * 6
    pos[i3 + 1] = (Math.random() - 0.5) * 6
    pos[i3 + 2] = (Math.random() - 0.5) * 6
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))

const particleMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: true
})

const particles = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particles)


/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = (sizes.width / sizes.height)
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.z = 5
cameraGroup.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Scroll
 */
let scrollY = window.scrollY
let section = 0

window.addEventListener('scroll', (event) => {
    scrollY = window.scrollY
    section = Math.round(scrollY / sizes.height)

    if(section % 2 == 0) {
        gsap.to(cube.position,
            {
                duration: params.duration,
                x: params.cubex
            }
        )
    }
    else {
        gsap.to(cube.position,
            {
                duration: params.duration,
                x: - params.cubex
            }
        )
    }
})

const cursor = {x: 0, y: 0}
window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width) - 0.5
    cursor.y = (event.clientY / sizes.height) - 0.5
})



const clock = new THREE.Clock()
let prevTime = 0
function animate() {

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - prevTime
    prevTime = elapsedTime

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime

    cube.rotation.y += deltaTime * 0.1
    cube.rotation.x += deltaTime * 0.12

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()