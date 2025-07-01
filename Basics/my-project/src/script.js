import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const group = new THREE.Group()
scene.add(group)

const body = new THREE.Group()
group.add(body)

const boxMaterial = new THREE.MeshBasicMaterial({color: 0x0aa5ff, wireframe: true})

const box = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1, 5.5, 4, 2, 8),
    boxMaterial
)
box.position.set(0, 0.5, 0)
body.add(box)

const geo = new THREE.BoxGeometry(2.5, 1, 3, 4, 1, 4)
const pos = geo.attributes.position

for(let i = 0; i < pos.count; i++) {
    const y = pos.getY(i)
    if(y < 0) {
        const z = pos.getZ(i)
        if(pos.getZ(i) > 0 )
            pos.setZ(i, z + 0.5)
        else pos.setZ(i, z - 0.3)
    }
}
pos.needsUpdate = true

const box2 = new THREE.Mesh(
    geo,
    boxMaterial
)
box2.position.set(0, 1.5, 0)

body.add(box2)

const wheels = new THREE.Group()
group.add(wheels)
const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.25, 8, 1, false, Math.PI, Math.PI)
const wheelMaterial = new THREE.MeshBasicMaterial({color: 0xaa55ff, wireframe: false})

const circle1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
circle1.position.set(1, 0, -1.5)
circle1.rotateZ(Math.PI * 0.5)
wheels.add(circle1)

const circle2 = new THREE.Mesh(wheelGeometry,wheelMaterial)
circle2.position.set(1, 0, 1.5)
circle2.rotateZ(Math.PI * 0.5)
wheels.add(circle2)

const circle3 = new THREE.Mesh(wheelGeometry, wheelMaterial)
circle3.position.set(-1, 0, -1.5)
circle3.rotateZ(Math.PI * 0.5)
wheels.add(circle3)

const circle4 = new THREE.Mesh(wheelGeometry, wheelMaterial)
circle4.position.set(-1, 0, 1.5)
circle4.rotateZ(Math.PI * 0.5)
wheels.add(circle4)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 5, 10)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)

const animate = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()