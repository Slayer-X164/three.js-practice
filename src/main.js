import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()
const gui = new dat.GUI()
const textureLoader = new THREE.TextureLoader()
const testTexture = textureLoader.load('/space-cruiser-panels2-bl/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')

const geometry = new THREE.SphereGeometry(0.5,32,32)
const material = new THREE.MeshStandardMaterial({
    color:'grey',
    map:testTexture
})
gui.add(material,'metalness',0,1).step(0.01)
gui.add(material,'roughness',0,1).step(0.01)

const mesh = new THREE.Mesh(geometry,material)
mesh.scale.set(2,2,2)
const group = new THREE.Group()
group.add(mesh)
scene.add(group)

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth/window.innerHeight,
    0.1,
    100
)
camera.position.z = 5

const ambientLight = new THREE.AmbientLight(0xffffff,0.3)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff,30)
pointLight.position.set(0,4,4)
scene.add(pointLight)

const canvas = document.querySelector('.threejs_canvas')
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.autoRotate = false

const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

const renderLoop = ()=>{
    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(renderLoop)
}
renderLoop()