// 1. Enable shadow mapping in the renderer. 
// 2. Enable shadows and set shadow parameters for the lights that cast shadows. 
// Both the THREE.DirectionalLight type and the THREE.SpotLight type support shadows. 
// 3. Indicate which geometry objects cast and receive shadows.

"use strict"; 

import * as THREE from '../libs/three.js/three.module.js'
import { OrbitControls } from '../libs/three.js/controls/OrbitControls.js';
import { OBJLoader } from '../libs/three.js/loaders/OBJLoader.js';
import { MTLLoader } from '../libs/three.js/loaders/MTLLoader.js';

let renderer = null, scene = null, camera = null, group = null, objectList = [], orbitControls = null;

let duration = 20000; // ms
let currentTime = Date.now();

let directionalLight = null, spotLight = null, ambientLight = null;

let mapUrl = "../images/solarSystem/2k_stars_milky_way.jpg";

let sunText = "../images/solarSystem/2k_sun.jpg";

let SHADOW_MAP_WIDTH = 1024, SHADOW_MAP_HEIGHT = 1024;

let objMtlModelUrl = {obj:'../models/sphere/sphere.obj', mtl:'../models/sphere/sphere.mtl'};

let objModelUrl = {obj:'../models/sphere/sphere.obj', map: sunText, normalMap:'../images/solarSystem/2k_sun.jpg', specularMap: '../images/solarSystem/2k_sun.jpg'};

let jsonModelUrl = { url:'../models/json/teapot-claraio.json' };

let objModelUrl2 = {obj:'../models/obj/cerberus/Cerberus.obj', map:'../models/obj/cerberus/Cerberus_A.jpg', normalMap:'../models/obj/cerberus/Cerberus_N.jpg', specularMap: '../models/obj/cerberus/Cerberus_M.jpg'};

function main()
{
    const canvas = document.getElementById("webglcanvas");

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

async function loadJson(url, objectList)
{
    try 
    {
        const object = await new THREE.ObjectLoader().loadAsync(url, onProgress, onError);

        object.castShadow = true;
        object.receiveShadow = false;

        object.position.y = -1;
        object.position.x = 1.5;

        object.name = "jsonObject";

        objectList.push(object);
        scene.add(object);
    }
    catch (err) 
    {
        return onError(err);
    }
}

async function loadObj(objModelUrl, objectList)
{
    try
    {
        const object = await new OBJLoader().loadAsync(objModelUrl.obj, onProgress, onError);

        let texture = objModelUrl.hasOwnProperty('normalMap') ? new THREE.TextureLoader().load(objModelUrl.map) : null;
        let normalMap = objModelUrl.hasOwnProperty('normalMap') ? new THREE.TextureLoader().load(objModelUrl.normalMap) : null;
        let specularMap = objModelUrl.hasOwnProperty('specularMap') ? new THREE.TextureLoader().load(objModelUrl.specularMap) : null;

        console.log(object);
        
        // object.traverse(function (child) 
        // {
            for(const child of object.children)
            {
                //     if (child.isMesh)
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = texture;
                child.material.normalMap = normalMap;
                child.material.specularMap = specularMap;
            }
        // });

        object.scale.set(1, 1, 1);
        object.position.z = -3;
        object.position.x = -1.5;
        object.rotation.y = -3;
        object.name = "objObject";
        
        objectList.push(object);
        scene.add(object);
    }
    catch (err) 
    {
        onError(err);
    }
}

async function loadObjMtl(objModelUrl, objectList)
{
    try
    {
        const mtlLoader = new MTLLoader();

        const materials = await mtlLoader.loadAsync(objModelUrl.mtl, onProgress, onError);

        materials.preload();
        
        const objLoader = new OBJLoader();

        objLoader.setMaterials(materials);

        const object = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);
    
        object.traverse(function (child) {
            if (child.isMesh)
            {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        console.log(object);

        object.position.y += 1;
        object.scale.set(0.1, 0.1, 0.1);

        objectList.push(object);
        scene.add(object);
    }
    catch (err)
    {
        onError(err);
    }
}



function animate() 
{
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

function createScene(canvas) 
{
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-2, 6, 12);

    orbitControls = new OrbitControls(camera, renderer.domElement);
        
    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1);

    // Create and add all the lights
    directionalLight.position.set(.5, 1, -3);
    directionalLight.target.position.set(0,0,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    spotLight = new THREE.SpotLight (0xaaaaaa);
    spotLight.position.set(2, 8, 15);
    spotLight.target.position.set(-2, 0, -2);
    scene.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow. camera.far = 200;
    spotLight.shadow.camera.fov = 45;
    
    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

    ambientLight = new THREE.AmbientLight ( 0x444444, 0.8);
    scene.add(ambientLight);
    
    // Create the objects
    loadObj(objModelUrl, objectList);

    loadJson(jsonModelUrl.url, objectList);

    loadObjMtl(objMtlModelUrl, objectList);

    // Create a group to hold the objects
    group = new THREE.Object3D;
    scene.add(group);

    // Create a texture map
    const map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);

    // Create a texture loader
    const TextureLoader = new THREE.TextureLoader();

    // Put in a ground plane to show off the lighting
    let geometry = new THREE.SphereGeometry(200, 200, 50, 50);
    
    let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add( mesh );
    
    // Create the cylinder 
    geometry = new THREE.SphereGeometry(5, 2, 2, 2000, 10);
    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        
    }));
    mesh.position.y = -3;
    mesh.castShadow = false;
    mesh.receiveShadow = true;    
    group.add( mesh );

    //Create a sphere

    const sungeo = new THREE.SphereGeometry(16,30,30);
    

}

main();