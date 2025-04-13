import "./style.css"
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const scene = new THREE.Scene()
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:"red",wireframe:true})
const coneGeometry = new THREE.ConeGeometry( 5, 20, 32 );

const coneMesh = new THREE.Mesh(coneGeometry,material)
coneMesh.scale.set(0.1,0.1,0.1)
coneMesh.position.x = -1
const cubeMesh = new THREE.Mesh(cubeGeometry,material)
cubeMesh.position.x = 1
const group = new THREE.Group()
group.add(coneMesh)
group.add(cubeMesh)
scene.add(group)

const canvas = document.querySelector(".three_canvas")
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    100
)
camera.position.z = 5

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.autoRotate = true

const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

const clock = new THREE.Clock()
let prevTime = 0
const renderLoop = ()=>{
    let currentTime = clock.getElapsedTime()
    let delta = currentTime-prevTime
    prevTime=currentTime


    coneMesh.rotation.x += THREE.MathUtils.degToRad(1)*delta*50
    requestAnimationFrame(renderLoop)
    controls.update()
    renderer.render(scene,camera)
}
renderLoop()