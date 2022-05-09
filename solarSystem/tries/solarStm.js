"use strict"; 

import * as THREE from '../libs/three.js/three.module.js'
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';

import starsTexture from '../images/solarSystem/2k_stars_milky_way.jpg';
import sunTexture from '../images/solarSystem/2k_saturn_ring_alpha.jpg';
import mercuryTexture from '../images/solarSystem/2k_mercury.jpg';
import venusTexture from '../images/solarSystem/2k_venus_surface.jpg'
import earthTexture from '../images/solarSystem/2k_earth_daymap.jpg';
import marsTexture from '../images/solarSystem/2k_mars.jpg';
import jupiterTexture from '../images/solarSystem/2k_jupiter.jpg';
import saturnTexture from '../images/solarSystem/2k_saturn.jpg';
import saturnRingTexture from '../images/solarSystem/2k_saturn_ring_alpha.jpg';
import uranusTexture from '../images/solarSystem/2k_uranus.jpg';
import neptuneTexture from '../images/solarSystem/2k_neptune.jpg';
import plutoTexture from '../images/solarSystem/2k_stars_milky_way.jpg';
import moonTexture from '../images/solarSystem/2k_moon.jpg';



function main()
{
    
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

function update() 
{
    requestAnimationFrame(() => update() );    
    // Render the scene
    renderer.render( scene, camera );

    animate();


    
}

function createScene(canvas) 
{

    const canvas = document.getElementById("webglcanvas");

    var gl = canvas.getContext('webgl');
    gl.clearColor(0.75,0.85,0.8,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
   

}

function animate(){

    render.render(scene,camera);
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
}

render.setAnimationLoop(animate);



main();