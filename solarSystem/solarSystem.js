
"use strict"; 

import * as THREE from '../libs/three.js/three.module.js';
//import * as THREE from 'three';
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null, celestObj = [],moons=[];


let duration = 10000; // ms
let currentTime = Date.now();


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
    //earthMoon();
    //Mars
    planet4();
    //moonsMars
    //marsMoons();
    //Jupiter
    planet5();
    //Saturn
    planet6();
    //Uranus
    planet7();
    //Neptune
    planet8();
    //Pluto
    notAplanet();

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
    const sunMesh = new THREE.Mesh(geometry2, material2);
    objectList.push(sunMesh);
    scene.add(sunMesh);

    //Light
    var lightCenter = new THREE.PointLight(0xFFFFFF,2,300);
    //lightCenter.position.set(0,0,0);
    sunMesh.add(lightCenter);
    //sunMesh.add(lightCenter);
    
    
    
}   



function planet1(){
//mercury
    var geometry = new THREE.SphereGeometry(3, 64,40);//3
    geometry.scale(1,1,1);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_mercury.jpg')
    });
    const mercuryM = new THREE.Mesh(geometry, material);
    mercuryM.position.x = -55;
    objectList.push(mercuryM);
    const mercuryObj = new THREE.Object3D();
    mercuryObj.add(mercuryM);

    scene.add(mercuryObj);
    objectList.push(mercuryObj);

   
    
   

}
function planet2(){
    //Venus
    var geometry4 = new THREE.SphereGeometry(9, 64,40);//9
    geometry4.scale(1,1,1);
    var material4 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_venus_surface.jpg')
    });
    var venusM = new THREE.Mesh(geometry4, material4);
    venusM.position.x = 70;
    objectList.push(venusM);

    const venusObj = new THREE.Object3D();
    venusObj.add(venusM);

    scene.add(venusObj);
    objectList.push(venusObj);

}
function planet3(){
    //earth
    var geometry5 = new THREE.SphereGeometry(9, 64,40);//9
    geometry5.scale(1,1,1);
    var material5 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_earth_daymap.jpg')
    });
    var eartM = new THREE.Mesh(geometry5, material5);
    eartM.position.x = -80;
    eartM.position.z = -100;
    objectList.push(eartM);


    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    moonMesh.position.x = -20;

    eartM.add(moonMesh);

    const earthObj = new THREE.Object3D();
    earthObj.add(eartM);

    scene.add(earthObj);
    objectList.push(earthObj);


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
    var marsM = new THREE.Mesh(geometry6, material6);
    marsM.position.x = -80;
    marsM.position.z = -200;
    objectList.push(marsM);

    var moon1 = moons[0];
    var moon2 = moons[1];
    marsM.add(moon1);
    marsM.add(moon2);

    const marsObj = new THREE.Object3D();

    marsObj.add(marsM);
    scene.add(marsObj);

    objectList.push(marsObj);

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

    moons.push(moonMesh1);
    moons.push(moonMesh2);
}
function planet5(){
    //Jupiter
    var geometry7 = new THREE.SphereGeometry(25, 64, 40);//25
    geometry7.scale(1,1,1);
    var material7 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_jupiter.jpg')
    });
    var jupiterM = new THREE.Mesh(geometry7, material7);
    jupiterM.position.x = -100; //-100
    jupiterM.position.z = 300; //300
    objectList.push(jupiterM);


    const jupiterObj = new THREE.Object3D();
    jupiterObj.add(jupiterM);
    scene.add(jupiterObj);
    objectList.push(jupiterObj);

    

    //planetList.push(mesh7);
}
function planet6(){
    //Saturn
    var geometry8 = new THREE.SphereGeometry(22, 64,40);//22
    geometry8.scale(1,1,1);
    var material8 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_saturn.jpg')
    });
    var saturnM = new THREE.Mesh(geometry8, material8);
    saturnM.position.x = 250;
    saturnM.position.z = -600;

    var ringGeo = new THREE.RingGeometry(12, 54,40);//22
    ringGeo.scale(1,1,1);
    var material8 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/ring4.jpg')
    });
    var ringM = new THREE.Mesh(ringGeo, material8);
    ringM.position.x = 250;
    ringM.position.z = -600;

    ringM.rotateZ(Math.PI/4);
    ringM.rotateX(Math.PI/5);

    objectList.push(saturnM);
    objectList.push(ringM);

    const saturnObj = new THREE.Object3D();

    saturnObj.add(saturnM);
    scene.add(saturnObj);


    const ringObj = new THREE.Object3D();
    ringObj.add(ringM);
    scene.add(ringObj);

    objectList.push(saturnObj);
    objectList.push(ringObj);

}
function planet7(){
    //Uranus
    var geometry9 = new THREE.SphereGeometry(12, 64,40);
    geometry9.scale(1,1,1);
    var material9 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_uranus.jpg')
    });
    var uranusM = new THREE.Mesh(geometry9, material9);
    uranusM.position.x = -550;
    objectList.push(uranusM);

    //scene.add(uranusM);

    const uranusObj = new THREE.Object3D();
    uranusObj.add(uranusM);
    scene.add(uranusObj);
    objectList.push(uranusObj);

}
function planet8(){
        //Neptuno
    var geometry10 = new THREE.SphereGeometry(11, 64,40);
    geometry10.scale(1,1,1);
    var material10 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_neptune.jpg')
    });
    var neptuneM = new THREE.Mesh(geometry10, material10);
    neptuneM.position.x = 550;
    objectList.push(neptuneM);

    //scene.add(mesh10);

    const neptuneObj = new THREE.Object3D();
    neptuneObj.add(neptuneM);
    scene.add(neptuneObj);
    objectList.push(neptuneObj);

}

function notAplanet(){
    //Pluto
var geometry10 = new THREE.SphereGeometry(2, 64,40);
geometry10.scale(1,1,1);
var material10 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/pluto.jpg')
});
var plutoM = new THREE.Mesh(geometry10, material10);
plutoM.position.x = -750;
plutoM.position.z = -650;
objectList.push(plutoM);

//scene.add(mesh10);

const plutoObj = new THREE.Object3D();
plutoObj.add(plutoM);
scene.add(plutoObj);
objectList.push(plutoObj);

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







}

function celestRotation(){
    
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    for(const mesh of objectList)
        if(mesh)
            mesh.rotation.y += angle / 3;
     
}
function translate(){
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    for(const mesh of celestObj)
        if(mesh)
            mesh.rotation.y += angle / 5;
}

//renderer.setAnimationLoop(animate);

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    celestRotation();
    translate();

    // Update the camera controller
    orbitControls.update();
}

main();