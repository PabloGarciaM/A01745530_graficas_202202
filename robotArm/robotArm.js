
"use strict"; 

import * as THREE from '../libs/three.js/three.module.js';
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';
import { OBJLoader } from '../libs/three.js/loaders/OBJLoader.js';
import { MTLLoader } from '../libs/three.js/loaders/MTLLoader.js';
//import { GLTGLoader } from '../libs/three.js/loaders/MTLLoader.js';

import {} from '../libs/three.js/loaders/MTLLoader.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null;


let duration = 10000; // ms
let currentTime = Date.now();

let objModelUrl = {obj:'../models/obj/kirby/Kirbysentado.obj', map:'../models/obj/cerberus/Cerberus_A.jpg', normalMap:'../models/obj/cerberus/Cerberus_N.jpg', specularMap: '../models/obj/cerberus/Cerberus_M.jpg'};
//let objMtlModelUrl = {obj:'../models/obj/kirby/Kirbysentado.obj', mtl:'../models/obj/kirby/Kirbysentado.mtl'};


function main(){
    var canvas = document.getElementById('webglcanvas');

    createScene(canvas);
    update();
    shoulderCreation();
    armCreation();
    elbowCreation();
    foreArmCreation();
    wristCreation();
    handCreation();


}

function shoulderCreation(){
    var robotGeo = new THREE.BoxGeometry(10, 15,10, 15);
    robotGeo.scale(0.5,0.5,0.5);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/cristal.jpg')
    });
    var robotMesh = new THREE.Mesh(robotGeo, material2);
    
    robotMesh.rotation.z = Math.PI / 2;
    robotMesh.position.x = 22;

    objectList.push(robotMesh);
    scene.add(robotMesh);
}
function elbowCreation(){
    var robotGeo = new THREE.BoxGeometry(10, 15,10, 15);
    robotGeo.scale(0.5,0.5,0.5);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/cristal.jpg')
    });
    var robotMesh = new THREE.Mesh(robotGeo, material2);
    
    robotMesh.rotation.z = Math.PI / 2;
    robotMesh.position.x = -2;

    objectList.push(robotMesh);
    scene.add(robotMesh);
}
function wristCreation(){
    var robotGeo = new THREE.BoxGeometry(15, 10,10, 15);
    robotGeo.scale(0.5,0.5,0.5);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/cristal.jpg')
    });
    var robotMesh = new THREE.Mesh(robotGeo, material2);
    
    robotMesh.rotation.z = Math.PI / 2;
    robotMesh.position.x = -2;
    robotMesh.position.y = 24;

    objectList.push(robotMesh);
    scene.add(robotMesh);
}
function armCreation()
{
    var geometry2 = new THREE.BoxGeometry(10, 20,10, 15);
    geometry2.scale(1,1,1);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/tech2.jpg')
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    
    mesh2.rotation.z = Math.PI / 2;
    mesh2.position.x = 10;

    objectList.push(mesh2);
    scene.add(mesh2);

    //Light
    var lightCenter = new THREE.PointLight(0xff0000,5,10);
    lightCenter.position.set(0,0,0);
    mesh2.add(lightCenter);
}   
function foreArmCreation()
{
    var geometry2 = new THREE.BoxGeometry(10, 20,10, 15);
    geometry2.scale(1,1,1);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/tech2.jpg')
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    
    mesh2.rotation.z = Math.PI / 180;
    mesh2.position.x = -2;
    mesh2.position.y = 12;

    objectList.push(mesh2);
    scene.add(mesh2);

    //Light
    var lightCenter = new THREE.PointLight(0xff0000,5,10);
    lightCenter.position.set(0,0,0);
    mesh2.add(lightCenter);
}  
function handCreation()
{
    var geometry2 = new THREE.BoxGeometry(10, 12,10, 15);
    geometry2.scale(1,1,1);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/robotArm/tech2.jpg')
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    
    mesh2.rotation.z = Math.PI / 2;
    mesh2.position.x = 6;
    mesh2.position.y = 25;

    objectList.push(mesh2);
    scene.add(mesh2);

    //Light
    var lightCenter = new THREE.PointLight(0xff0000,5,10);
    lightCenter.position.set(0,0,0);
    mesh2.add(lightCenter);
}  


function createScene(canvas){



    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    
    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    document.body.appendChild(renderer.domElement);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();
    
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 65, canvas.width / canvas.height, 1, 4000);
    
    orbitControls  = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 500;
    camera.position.y = 150;
    camera.position.x =-100;
    
    
    orbitControls.maxDistance = 60;
    
    //
    
    
    //orbitControls.update();
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);
    
    
    //Create stars background
    
    var geometry = new THREE.SphereGeometry(1000, 600,400);
    geometry.scale(-2,2,2);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_stars_milky_way.jpg')
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    //objMTL
    //loadObjMtl(objMtlModelUrl, objectList);
    /*
    let loader = new THREE.GLTGLoader();
    loader.load('scene.gltf',function(gltf){
        kirby = gltf.scene.children[0];
        kirby.scale.set(0.5,0.5,0.5);
        scene.add(gltf.scene);
    });
    */
    }
function animate(){
    
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    for(const mesh of objectList)
        if(mesh)
            mesh.rotation.z += 0.001;

        
        
}

//renderer.setAnimationLoop(animate);

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    //animate();

    // Update the camera controller
    orbitControls.update();
}

main();