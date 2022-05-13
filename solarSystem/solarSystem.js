
"use strict"; 

import * as THREE from '../libs/three.js/three.module.js';
//import * as THREE from 'three';
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null;
let celestObj = [],moons=[], mercuryOrb=[];


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
    mercuryOrb.push(mercuryObj);

   
    
   

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

    const earthObj = new THREE.Object3D();
    earthObj.add(eartM);

    scene.add(earthObj);
    objectList.push(earthObj);


    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    moonMesh.position.x = -20;


    const moonObj = new THREE.Object3D();
    moonObj.add(moonMesh);
    eartM.add(moonObj);

    //scene.add(moonObj);
    mercuryOrb.push(moonObj);

    


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

    const marsObj = new THREE.Object3D();

    marsObj.add(marsM);
    scene.add(marsObj);

    objectList.push(marsObj);
    //Moons
    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    moonMesh.position.x = 0;
    moonMesh.position.z = -20;
    moonMesh2.position.x = 0;
    moonMesh2.position.z = 20;


    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();

    moonObj.add(moonMesh);
    marsM.add(moonObj);

    moonObj2.add(moonMesh2);
    marsM.add(moonObj2);

    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    mercuryOrb.push(moonObj2);

}

function planet5(){
    //Jupiter
    var geometry7 = new THREE.SphereGeometry(25, 64, 40);//25
    geometry7.scale(1,1,1);
    var material7 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_jupiter.jpg')
    });
    var jupiterM = new THREE.Mesh(geometry7, material7);
    jupiterM.position.x = -150; //-100
    jupiterM.position.z = 350; //300
    objectList.push(jupiterM);


    const jupiterObj = new THREE.Object3D();
    jupiterObj.add(jupiterM);
    scene.add(jupiterObj);
    celestObj.push(jupiterObj);
    //Moons

    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh3 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh4 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh5 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh6 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh7 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh8 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh9 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh10 = new THREE.Mesh(geoMoon, moonMat);


    moonMesh.position.x = 0;
    moonMesh.position.z = -60;
    moonMesh.position.y = 25;

    moonMesh2.position.x = -30;
    moonMesh2.position.z = 20;
    moonMesh2.position.y = 45;

    moonMesh3.position.x = -40;
    moonMesh3.position.z = 64;
    moonMesh3.position.y = -40;

    moonMesh4.position.x = 10;
    moonMesh4.position.z = -38;

    moonMesh5.position.x = 26;
    moonMesh5.position.z = 68;
    moonMesh5.position.y = 10;


    moonMesh6.position.x = -28;
    moonMesh6.position.z = -68;
    moonMesh6.position.y = -20;

    moonMesh7.position.x = -26;
    moonMesh7.position.z = 70;
    moonMesh7.position.y = -12;


    moonMesh8.position.x = 24;
    moonMesh8.position.z = -32;

    moonMesh9.position.x = -41;
    moonMesh9.position.z = 72;
    moonMesh9.position.y = 23;


    moonMesh10.position.x = -40;
    moonMesh10.position.z = -42;

    



    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();
    const moonObj3 = new THREE.Object3D();
    const moonObj4 = new THREE.Object3D();
    const moonObj5 = new THREE.Object3D();
    const moonObj6 = new THREE.Object3D();
    const moonObj7 = new THREE.Object3D();
    const moonObj8 = new THREE.Object3D();
    const moonObj9 = new THREE.Object3D();
    const moonObj10 = new THREE.Object3D();


    moonObj.add(moonMesh);
    jupiterM.add(moonObj);

    moonObj2.add(moonMesh2);
    jupiterM.add(moonObj2);

    moonObj3.add(moonMesh3);
    jupiterM.add(moonObj3);

    moonObj4.add(moonMesh4);
    jupiterM.add(moonObj4);

    moonObj5.add(moonMesh5);
    jupiterM.add(moonObj5);

    moonObj6.add(moonMesh6);
    jupiterM.add(moonObj6);

    moonObj7.add(moonMesh7);
    jupiterM.add(moonObj7);

    moonObj8.add(moonMesh8);
    jupiterM.add(moonObj8);

    moonObj9.add(moonMesh9);
    jupiterM.add(moonObj9);

    moonObj10.add(moonMesh10);
    jupiterM.add(moonObj10);

    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    celestObj.push(moonObj2);
    mercuryOrb.push(moonObj3);
    celestObj.push(moonObj4);
    mercuryOrb.push(moonObj5);
    celestObj.push(moonObj6);
    mercuryOrb.push(moonObj7);
    celestObj.push(moonObj8);
    mercuryOrb.push(moonObj9);
    celestObj.push(moonObj10);

    
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

    celestObj.push(saturnObj);
    celestObj.push(ringObj);

    //Moons
    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh3 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh4 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh5 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh6 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh7 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh8 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh9 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh10 = new THREE.Mesh(geoMoon, moonMat);


    moonMesh.position.x = 0;
    moonMesh.position.z = -60;
    moonMesh.position.y = 25;

    moonMesh2.position.x = -30;
    moonMesh2.position.z = 20;
    moonMesh2.position.y = 45;

    moonMesh3.position.x = -40;
    moonMesh3.position.z = 64;
    moonMesh3.position.y = -40;

    moonMesh4.position.x = 10;
    moonMesh4.position.z = -38;

    moonMesh5.position.x = 26;
    moonMesh5.position.z = 68;
    moonMesh5.position.y = 10;


    moonMesh6.position.x = -28;
    moonMesh6.position.z = -68;
    moonMesh6.position.y = -20;

    moonMesh7.position.x = -26;
    moonMesh7.position.z = 70;
    moonMesh7.position.y = -12;


    moonMesh8.position.x = 24;
    moonMesh8.position.z = -32;

    moonMesh9.position.x = -41;
    moonMesh9.position.z = 72;
    moonMesh9.position.y = 23;


    moonMesh10.position.x = -40;
    moonMesh10.position.z = -42;

    



    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();
    const moonObj3 = new THREE.Object3D();
    const moonObj4 = new THREE.Object3D();
    const moonObj5 = new THREE.Object3D();
    const moonObj6 = new THREE.Object3D();
    const moonObj7 = new THREE.Object3D();
    const moonObj8 = new THREE.Object3D();
    const moonObj9 = new THREE.Object3D();
    const moonObj10 = new THREE.Object3D();


    moonObj.add(moonMesh);
    saturnM.add(moonObj);

    moonObj2.add(moonMesh2);
    saturnM.add(moonObj2);

    moonObj3.add(moonMesh3);
    saturnM.add(moonObj3);

    moonObj4.add(moonMesh4);
    saturnM.add(moonObj4);

    moonObj5.add(moonMesh5);
    saturnM.add(moonObj5);

    moonObj6.add(moonMesh6);
    saturnM.add(moonObj6);

    moonObj7.add(moonMesh7);
    saturnM.add(moonObj7);

    moonObj8.add(moonMesh8);
    saturnM.add(moonObj8);

    moonObj9.add(moonMesh9);
    saturnM.add(moonObj9);

    moonObj10.add(moonMesh10);
    saturnM.add(moonObj10);

    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    celestObj.push(moonObj2);
    mercuryOrb.push(moonObj3);
    celestObj.push(moonObj4);
    mercuryOrb.push(moonObj5);
    celestObj.push(moonObj6);
    mercuryOrb.push(moonObj7);
    celestObj.push(moonObj8);
    mercuryOrb.push(moonObj9);
    celestObj.push(moonObj10);

}
function planet7(){
    //Uranus
    var geometry9 = new THREE.SphereGeometry(12, 64,40);
    geometry9.scale(1,1,1);
    var material9 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_uranus.jpg')
    });
    var uranusM = new THREE.Mesh(geometry9, material9);
    uranusM.position.x = -450;
    uranusM.position.z = 600;

    objectList.push(uranusM);

    //scene.add(uranusM);

    const uranusObj = new THREE.Object3D();
    uranusObj.add(uranusM);
    scene.add(uranusObj);
    celestObj.push(uranusObj);
    //Moons
    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh3 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh4 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh5 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh6 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh7 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh8 = new THREE.Mesh(geoMoon, moonMat);
   


    moonMesh.position.x = 0;
    moonMesh.position.z = -60;
    moonMesh.position.y = 25;

    moonMesh2.position.x = -30;
    moonMesh2.position.z = 20;
    moonMesh2.position.y = 45;

    moonMesh3.position.x = -40;
    moonMesh3.position.z = 64;
    moonMesh3.position.y = -40;

    moonMesh4.position.x = 10;
    moonMesh4.position.z = -38;

    moonMesh5.position.x = 26;
    moonMesh5.position.z = 68;
    moonMesh5.position.y = 10;


    moonMesh6.position.x = -28;
    moonMesh6.position.z = -68;
    moonMesh6.position.y = -20;

    moonMesh7.position.x = -26;
    moonMesh7.position.z = 70;
    moonMesh7.position.y = -12;


    moonMesh8.position.x = 24;
    moonMesh8.position.z = -32;

    



    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();
    const moonObj3 = new THREE.Object3D();
    const moonObj4 = new THREE.Object3D();
    const moonObj5 = new THREE.Object3D();
    const moonObj6 = new THREE.Object3D();
    const moonObj7 = new THREE.Object3D();
    const moonObj8 = new THREE.Object3D();



    moonObj.add(moonMesh);
    uranusM.add(moonObj);

    moonObj2.add(moonMesh2);
    uranusM.add(moonObj2);

    moonObj3.add(moonMesh3);
    uranusM.add(moonObj3);

    moonObj4.add(moonMesh4);
    uranusM.add(moonObj4);

    moonObj5.add(moonMesh5);
    uranusM.add(moonObj5);

    moonObj6.add(moonMesh6);
    uranusM.add(moonObj6);

    moonObj7.add(moonMesh7);
    uranusM.add(moonObj7);

    moonObj8.add(moonMesh8);
    uranusM.add(moonObj8);



    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    celestObj.push(moonObj2);
    mercuryOrb.push(moonObj3);
    celestObj.push(moonObj4);
    mercuryOrb.push(moonObj5);
    celestObj.push(moonObj6);
    mercuryOrb.push(moonObj7);
    celestObj.push(moonObj8);


    

}
function planet8(){
        //Neptuno
    var geometry10 = new THREE.SphereGeometry(11, 64,40);
    geometry10.scale(1,1,1);
    var material10 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_neptune.jpg')
    });
    var neptuneM = new THREE.Mesh(geometry10, material10);
    neptuneM.position.x = 650;    
    neptuneM.position.z = -250;


    objectList.push(neptuneM);

    //scene.add(mesh10);

    const neptuneObj = new THREE.Object3D();
    neptuneObj.add(neptuneM);
    scene.add(neptuneObj);
    celestObj.push(neptuneObj);

    //Moons
    var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh3 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh4 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh5 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh6 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh7 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh8 = new THREE.Mesh(geoMoon, moonMat);
   


    moonMesh.position.x = 0;
    moonMesh.position.z = -60;
    moonMesh.position.y = 25;

    moonMesh2.position.x = -30;
    moonMesh2.position.z = 20;
    moonMesh2.position.y = 45;

    moonMesh3.position.x = -40;
    moonMesh3.position.z = 64;
    moonMesh3.position.y = -40;

    moonMesh4.position.x = 10;
    moonMesh4.position.z = -38;

    moonMesh5.position.x = 26;
    moonMesh5.position.z = 68;
    moonMesh5.position.y = 10;


    moonMesh6.position.x = -28;
    moonMesh6.position.z = -68;
    moonMesh6.position.y = -20;

    moonMesh7.position.x = -26;
    moonMesh7.position.z = 70;
    moonMesh7.position.y = -12;
    



    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();
    const moonObj3 = new THREE.Object3D();
    const moonObj4 = new THREE.Object3D();
    const moonObj5 = new THREE.Object3D();
    const moonObj6 = new THREE.Object3D();
    const moonObj7 = new THREE.Object3D();
;



    moonObj.add(moonMesh);
    neptuneM.add(moonObj);

    moonObj2.add(moonMesh2);
    neptuneM.add(moonObj2);

    moonObj3.add(moonMesh3);
    neptuneM.add(moonObj3);

    moonObj4.add(moonMesh4);
    neptuneM.add(moonObj4);

    moonObj5.add(moonMesh5);
    neptuneM.add(moonObj5);

    moonObj6.add(moonMesh6);
    neptuneM.add(moonObj6);

    moonObj7.add(moonMesh7);
    neptuneM.add(moonObj7);





    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    celestObj.push(moonObj2);
    mercuryOrb.push(moonObj3);
    celestObj.push(moonObj4);
    mercuryOrb.push(moonObj5);
    celestObj.push(moonObj6);
    mercuryOrb.push(moonObj7);


}

function notAplanet(){
    //Pluto
var geometry10 = new THREE.SphereGeometry(4, 64,40);
geometry10.scale(1,1,1);
var material10 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('../images/solarSystem/pluto.jpg')
});
var plutoM = new THREE.Mesh(geometry10, material10);
plutoM.position.x = -750;
plutoM.position.z = -680;
objectList.push(plutoM);

//scene.add(mesh10);

const plutoObj = new THREE.Object3D();
plutoObj.add(plutoM);
scene.add(plutoObj);
celestObj.push(plutoObj);

//Moons
var geoMoon = new THREE.SphereGeometry(2, 64,40);//9
    geoMoon.scale(1,1,1);
    var moonMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/solarSystem/2k_moon.jpg')
    });
    var moonMesh = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh2 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh3 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh4 = new THREE.Mesh(geoMoon, moonMat);
    var moonMesh5 = new THREE.Mesh(geoMoon, moonMat);

   


    moonMesh.position.x = 0;
    moonMesh.position.z = -60;
    moonMesh.position.y = 25;

    moonMesh2.position.x = -30;
    moonMesh2.position.z = 20;
    moonMesh2.position.y = 45;

    moonMesh3.position.x = -40;
    moonMesh3.position.z = 64;
    moonMesh3.position.y = -40;

    moonMesh4.position.x = 10;
    moonMesh4.position.z = -38;

    moonMesh5.position.x = 26;
    moonMesh5.position.z = 68;
    moonMesh5.position.y = 10;




    



    const moonObj = new THREE.Object3D();
    const moonObj2 = new THREE.Object3D();
    const moonObj3 = new THREE.Object3D();
    const moonObj4 = new THREE.Object3D();
    const moonObj5 = new THREE.Object3D();

;



    moonObj.add(moonMesh);
    plutoM.add(moonObj);

    moonObj2.add(moonMesh2);
    plutoM.add(moonObj2);

    moonObj3.add(moonMesh3);
    plutoM.add(moonObj3);

    moonObj4.add(moonMesh4);
    plutoM.add(moonObj4);

    moonObj5.add(moonMesh5);
    plutoM.add(moonObj5);






    //scene.add(moonObj);
    mercuryOrb.push(moonObj);
    celestObj.push(moonObj2);
    mercuryOrb.push(moonObj3);
    celestObj.push(moonObj4);
    mercuryOrb.push(moonObj5);


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
camera.position.y = 100.5;


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
    for(const mesh of celestObj)
        if(mesh)
            mesh.rotation.y += angle / 20;

    for(const mesh of objectList)
            if(mesh)
                mesh.rotation.y += angle / 2;

     for(const mesh of mercuryOrb)
            if(mesh)
                mesh.rotation.y += angle / 1;
}
/*
function translate(){
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    for(const mesh of celestObj)
        if(mesh)
            mesh.rotation.y += angle / 5;

    
    
}*/

//renderer.setAnimationLoop(animate);

function update() 
{
    requestAnimationFrame(function() { update(); });
    
    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    celestRotation();
    //translate();

    // Update the camera controller
    orbitControls.update();
}

main();