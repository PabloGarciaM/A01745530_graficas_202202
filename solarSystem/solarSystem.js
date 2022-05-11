
"use strict"; 

import * as THREE from '../libs/three.js/three.module.js';
//import * as THREE from 'three';
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null;


let duration = 10000; // ms
let currentTime = Date.now();
let backgTexture2 = "../images/solarSystem/2k_stars_milky_way.jpg";
let sunTexture = "../images/solarSystem/2k_sun.jpg";

let backgTexture = "images/solarSystem/centaurusBG.jpg";

function main(){
    var canvas = document.getElementById('webglcanvas');

    createScene(canvas);
    update();
    //Sun
    SunCreation();
    //Mercury
    planet1();
    //Venus
    planet2();
    //Earth
    planet3();
    //moonEarth
    earthMoon();
    //Mars
    planet4();
    //moonsMars
    marsMoons();
    //Jupiter
    planet5();
    //Saturn
    planet6();
    //Uranus
    planet7();
    //Neptune
    planet8();

}

function onError ( err ){ console.error( err ); };

function onProgress( xhr ) 
{
    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( xhr.target.responseURL, Math.round( percentComplete, 2 ) + '% downloaded' );
    }
}

function SunCreation()
{
    var geometry2 = new THREE.SphereGeometry(40, 64,40);
    geometry2.scale(1,1,1);
    var material2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_sun.jpg')
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    objectList.push(mesh2);
    scene.add(mesh2);

    //Light
    var lightCenter = new THREE.PointLight(0xff0000,5,10);
    lightCenter.position.set(0,0,0);
    mesh2.add(lightCenter);
}   

function planet1(){
//mercury
    var geometry3 = new THREE.SphereGeometry(3, 64,40);//3
    geometry3.scale(1,1,1);
    var material3 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_mercury.jpg')
    });
    var mesh3 = new THREE.Mesh(geometry3, material3);
    mesh3.position.x = -55;
    objectList.push(mesh3);
    scene.add(mesh3);
    return mesh3;
}
function planet2(){
    //Venus
    var geometry4 = new THREE.SphereGeometry(9, 64,40);//9
    geometry4.scale(1,1,1);
    var material4 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_venus_surface.jpg')
    });
    var mesh4 = new THREE.Mesh(geometry4, material4);
    mesh4.position.x = 70;
    objectList.push(mesh4);

    scene.add(mesh4);
}
function planet3(){
    //earth
    var geometry5 = new THREE.SphereGeometry(9, 64,40);//9
    geometry5.scale(1,1,1);
    var material5 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_earth_daymap.jpg')
    });
    var mesh5 = new THREE.Mesh(geometry5, material5);
    mesh5.position.x = -80;
    mesh5.position.z = -100;
    objectList.push(mesh5);

    scene.add(mesh5);
}
function earthMoon(){
    //earthMoon
    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    moonMesh.position.x = -65;
    moonMesh.position.z = -100;
    objectList.push(moonMesh);
    scene.add(moonMesh);
}
function planet4(){
    //Mars
    var geometry6 = new THREE.SphereGeometry(4.5, 64,40);//4.5
    geometry6.scale(1,1,1);
    var material6 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_mars.jpg')
    });
    var mesh6 = new THREE.Mesh(geometry6, material6);
    mesh6.position.x = -80;
    mesh6.position.z = -200;
    objectList.push(mesh6);


    scene.add(mesh6);
}
function marsMoons(){
    //marsMoon1
    var geoMoon1 = new THREE.SphereGeometry(1, 64,40);//9
    geoMoon1.scale(1,1,1);
    var moonMat1 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh1 = new THREE.Mesh(geoMoon1, moonMat1);
    var moonMesh2 = new THREE.Mesh(geoMoon1, moonMat1);
    
    moonMesh1.position.x = -65;
    moonMesh1.position.z = -200;
    moonMesh2.position.x = -90;
    moonMesh2.position.z = -200;

    objectList.push(moonMesh1);
    objectList.push(moonMesh2);

    scene.add(moonMesh1);
    scene.add(moonMesh2);
}
function planet5(){
    //Jupiter
    var geometry7 = new THREE.SphereGeometry(25, 64, 40);//25
    geometry7.scale(1,1,1);
    var material7 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_jupiter.jpg')
    });
    var mesh7 = new THREE.Mesh(geometry7, material7);
    mesh7.position.x = -100;
    mesh7.position.z = 300;
    objectList.push(mesh7);

    scene.add(mesh7);
}
function planet6(){
    //Saturn
    var geometry8 = new THREE.SphereGeometry(22, 64,40);//22
    geometry8.scale(1,1,1);
    var material8 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_saturn.jpg')
    });
    var mesh8 = new THREE.Mesh(geometry8, material8);
    mesh8.position.x = 250;
    mesh8.position.z = -600;
    objectList.push(mesh8);

    scene.add(mesh8);
}
function planet7(){
    //Uranus
    var geometry9 = new THREE.SphereGeometry(12, 64,40);
    geometry9.scale(1,1,1);
    var material9 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_uranus.jpg')
    });
    var mesh9 = new THREE.Mesh(geometry9, material9);
    mesh9.position.x = -550;
    objectList.push(mesh9);

    scene.add(mesh9);
}
function planet8(){
        //Neptuno
    var geometry10 = new THREE.SphereGeometry(11, 64,40);
    geometry10.scale(1,1,1);
    var material10 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_neptune.jpg')
    });
    var mesh10 = new THREE.Mesh(geometry10, material10);
    mesh10.position.x = 550;
    objectList.push(mesh10);

    scene.add(mesh10);
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
camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );

orbitControls  = new OrbitControls(camera, renderer.domElement);
camera.position.z = 800;
camera.position.y = 1.5;


orbitControls.maxDistance = 700;

//


//orbitControls.update();
//const ambientLight = new THREE.AmbientLight(0x444444);
//scene.add(ambientLight);


//Create stars background

var geometry = new THREE.SphereGeometry(1000, 600,400);
geometry.scale(-2,2,2);
var material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_stars_milky_way.jpg')
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//Sun



//Pluto
var geometry3 = new THREE.SphereGeometry(10,64,40);
geometry3.scale(1,1,1);
var material3 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
});
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.x = -60;

//scene.add(mesh3);
const planets = [
    {
        url:'../images/solarSystem/2k_earth_daymap.jpg',
        scene: undefined,
        scale: [0.2,0.2,0.2],
        distance: 0,
        rotation:[0.2,0.2,0.2] 
    }
]

}

function animate(){
    
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    for(const mesh of objectList)
        if(mesh)
            mesh.rotation.y += angle / 3;

        
        
}

//renderer.setAnimationLoop(animate);

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    animate();

    // Update the camera controller
    orbitControls.update();
}

main();