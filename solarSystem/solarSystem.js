
"use strict"; 

import * as THREE from '../libs/three.js/three.module.js'
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null;


let duration = 20000; // ms
let currentTime = Date.now();
let backgTexture2 = "../images/solarSystem/2k_stars_milky_way.jpg";
let sunTexture = "../images/solarSystem/2k_sun.jpg";

let backgTexture = "images/solarSystem/centaurusBG.jpg";

function main(){
    var canvas = document.getElementById('webglcanvas');

    createScene(canvas);
    update();
}

function onError ( err ){ console.error( err ); };

function onProgress( xhr ) 
{
    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( xhr.target.responseURL, Math.round( percentComplete, 2 ) + '% downloaded' );
    }
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

//orbitControls.update();
const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);
/*
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    sunTexture,
    sunTexture,
    sunTexture,
    sunTexture,
    sunTexture,
    sunTexture
]);

const textureLoader = new THREE.TextureLoader();
*/

//Create stars background

var geometry = new THREE.SphereGeometry(1000, 600,400);
geometry.scale(-2,2,2);
var material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_stars_milky_way.jpg')
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//Sun
var geometry2 = new THREE.SphereGeometry(40, 64,40);
geometry2.scale(1,1,1);
var material2 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_sun.jpg')
});
var mesh2 = new THREE.Mesh(geometry2, material2);

scene.add(mesh2);

//mercury
var geometry3 = new THREE.SphereGeometry(3, 64,40);
geometry3.scale(1,1,1);
var material3 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_mercury.jpg')
});
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.x = -50;

scene.add(mesh3);

//Venus
var geometry4 = new THREE.SphereGeometry(9, 64,40);
geometry4.scale(1,1,1);
var material4 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_venus_surface.jpg')
});
var mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.x = 60;

scene.add(mesh4);
//earth
var geometry5 = new THREE.SphereGeometry(9, 64,40);
geometry5.scale(1,1,1);
var material5 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_earth_daymap.jpg')
});
var mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.x = -80;
mesh5.position.z = -100;


scene.add(mesh5);
//Mars
var geometry6 = new THREE.SphereGeometry(4.5, 64,40);
geometry6.scale(1,1,1);
var material6 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_mars.jpg')
});
var mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.x = -80;
mesh6.position.z = -200;


scene.add(mesh6);
//Jupiter
var geometry7 = new THREE.SphereGeometry(25, 64, 40);
geometry7.scale(1,1,1);
var material7 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_jupiter.jpg')
});
var mesh7 = new THREE.Mesh(geometry7, material7);
mesh7.position.x = -100;
mesh7.position.z = 300;

scene.add(mesh7);
//Saturn
var geometry8 = new THREE.SphereGeometry(22, 64,40);
geometry8.scale(1,1,1);
var material8 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_saturn.jpg')
});
var mesh8 = new THREE.Mesh(geometry8, material8);
mesh8.position.x = 250;
mesh8.position.z = -600;

scene.add(mesh8);

//Uranus
var geometry9 = new THREE.SphereGeometry(12, 64,40);
geometry9.scale(1,1,1);
var material9 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_uranus.jpg')
});
var mesh9 = new THREE.Mesh(geometry9, material9);
mesh9.position.x = -550;

scene.add(mesh9);

//Neptuno
var geometry10 = new THREE.SphereGeometry(11, 64,40);
geometry10.scale(1,1,1);
var material10 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_neptune.jpg')
});
var mesh10 = new THREE.Mesh(geometry10, material10);
mesh10.position.x = 550;

scene.add(mesh10);

//Pluto
var geometry3 = new THREE.SphereGeometry(10,64,40);
geometry3.scale(1,1,1);
var material3 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
});
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.x = -60;

//scene.add(mesh3);



}

function animate(){

    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;

    for(const object of objectList)
        if(object)
            object.rotation.y += angle / 2;
        }


function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();

    // Update the camera controller
    orbitControls.update();
}

main();