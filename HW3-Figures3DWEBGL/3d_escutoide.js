//
"use strict";

import * as shaderUtils from '../common/shaderUtils.js'
const mat4 = glMatrix.mat4;

let projectionMatrix;

let shaderVertexPositionAttribute, shaderVertexColorAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;

const duration = 10000; // ms

// in: Input variables used in the vertex shader. Since the vertex shader is called on each vertex, these will be different every time the vertex shader is invoked.
// Uniforms: Input variables for both the vertex and fragment shaders. These do not change values from vertex to vertex.

const vertexShaderSource = `#version 300 es

        in vec3 vertexPos; // Vertex from the buffer
        in vec4 vertexColor;

        out vec4 color;

        uniform mat4 modelViewMatrix; // Object's position
        uniform mat4 projectionMatrix; // Camera's position

        void main(void) {
    		// Return the transformed and projected vertex value
            gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
            color = vertexColor * 0.8;
        }`;

const fragmentShaderSource = `#version 300 es

        precision mediump float;
        in vec4 color;
        out vec4 fragColor;

        void main(void) {
        fragColor = color;
    }`;

function main() 
{
    const canvas = document.getElementById("webglcanvas");
    const gl = initWebGL(canvas);
    initViewport(gl, canvas);
    initGL(canvas);
    
    let escutoide = createEscutoide(gl, [0, 0, -1], [1, 1, 0.2]);
    
    const shaderProgram = shaderUtils.initShader(gl, vertexShaderSource, fragmentShaderSource);
    bindShaderAttributes(gl, shaderProgram);

    update(gl, shaderProgram, [escutoide]);
}

function initWebGL(canvas)
{
    let gl = null;
    let msg = "Your browser does not support WebGL, or it is not enabled by default.";
    try {
        gl = canvas.getContext("webgl2");
    } 
    catch (e) {
        msg = "Error creating WebGL Context!: " + e.toString();
    }

    if (!gl) {
        throw new Error(msg);
    }

    return gl;        
 }

function initViewport(gl, canvas)
{
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initGL(canvas)
{
    // Create a project matrix with 45 degree field of view
    projectionMatrix = mat4.create();
    
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 100);
    // mat4.orthoNO(projectionMatrix, -4, 4, -3.5, 3.5, 1, 100)
    mat4.translate(projectionMatrix, projectionMatrix, [0, 0, -5]);
}

// Create the vertex, color and index data for a multi-colored cube
function createEscutoide(gl, translation, rotationAxis) {
    // Vertex Data
    let vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    let verts = [

        1.0, 1.0, 0.0,
        1.0, 0.62, 0.7,
        1.0, 0.0, 0.5,
        1.0, 0.0, -0.5,
        1.0, 0.62, -0.7,
        1.0, 0.0, 0.5,
        -1.0, 0.0, 0.5,
        1.0, 0.0, -0.5,
        -1.0, 0.0, -0.5,
        1.0, 0.62, -0.7,
        1.0, 0.0, -0.5,
        -1.0, 0.62, -0.7,
        -1.0, 0.0, -0.5,
        1.0, 0.62, 0.7,
        1.0, 0.0, 0.5,
        -1.0, 0.62, 0.7,
        -1.0, 0.0, 0.5,
        1.0, 1.0, 0.0,
        1.0, 0.62, 0.7,
        -1.0, 0.62, 0.7,
        -0.4, 1.40, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.62, -0.7,
        -1.0, 0.62, -0.7,
        -0.4, 1.40, 0.0,

        -1.0, 0.5, 0.0,
        -1.0, 1.0, 0.5,
        -1.0, 0.62, 0.7,
        -1.0, 0.0, 0.5,
        -1.0, 0.0, -0.5,
        -1.0, 0.62, -0.7,
        -1.0, 1.0, -0.5,
        -0.4, 1.40, 0.0, 
        -1.0, 1.0, 0.5,    
        -1.0, 1.0, -0.5,   
        -0.4, 1.40, 0.0,  
        -1.0, 1.0, 0.5,     
        -1.0, 0.62, 0.7,  
        -0.4, 1.40, 0.0,   
        -1.0, 1.0, -0.5,     
        -1.0, 0.62, -0.7, 
         
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    // Color data
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    let faceColors = [
        
        [0.0, 1.0, 0.5, 1.0], 
        [1.0, 0.5, 0.5, 1.0], 
        [1.0, 0.0, 1.0, 1.0], 
        [1.0, 0.5, 0.0, 1.0],              
        [0.5, 0.5, 0.5, 1.0],
        [0.4, 0.4, 1.0, 1.0], 
        [0.0, 1.0, 0.0, 1.0], 
        [0.0, 1.0, 1.0, 1.0], 
        [1.0, 0.0, 0.2, 1.0], 
        [1.0, 0.0, 1.0, 1.0],  
        [1.0, 0.5, 0.0, 1.0],   
    ];

    const faceVertex = [5, 4, 4, 4, 4, 4, 7, 3, 3, 3];
    // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
    let vertexColors = [];
    // for (const color of faceColors) 
    // {
    //     for (let j=0; j < 4; j++)
    //         vertexColors.push(...color);
    // }
    for (let i = 0; i < faceColors.length; i++) {
        const color = faceColors[i];
        for (let j = 0; j < faceVertex[i]; j++) {
            vertexColors.push(...color);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    // Index data (defines the triangles to be drawn).
    let escutoideIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, escutoideIndexBuffer);

    let indices = [

        0, 1, 2, 0, 2, 3, 0, 3, 4,  
        5, 6, 7, 6, 7, 8,           
        9, 12, 10, 11, 9, 12,       
        13, 15, 14,
         16, 15, 14,     
        17, 19, 18, 
        20, 17, 19,     
        21, 23, 22, 
        24, 21, 23,       
        26, 25, 27, 
        27, 25, 28, 
        28, 25, 29, 
        29, 25, 30, 
        30, 25, 31, 
        31, 25, 26, 
        32, 33, 34,    
        35, 36, 37,    
        38, 39, 40     
    ];

    // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
    // Uint16Array: Array of 16-bit unsigned integers.
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    let scutoid
     = {
        buffer: vertexBuffer, colorBuffer: colorBuffer, indices: escutoideIndexBuffer,
        vertSize: 3, nVerts: 24, colorSize: 4, nColors: 30, nIndices: 66,
        primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
    };

    mat4.translate(scutoid.modelViewMatrix, scutoid.modelViewMatrix, translation);

    scutoid.update = function () {
        let now = Date.now();
        let deltat = now - this.currentTime;
        this.currentTime = now;
        let fract = deltat / duration;
        let angle = Math.PI * 2 * fract;

        // Rotates a mat4 by the given angle
        // mat4 out the receiving matrix
        // mat4 a the matrix to rotate
        // Number rad the angle to rotate the matrix by
        // vec3 axis the axis to rotate around
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
    };

    return scutoid
    ;
}

function bindShaderAttributes(gl, shaderProgram)
{
    // get pointers to the shader params
    shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderVertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(shaderVertexColorAttribute);
    
    shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
}

function draw(gl, shaderProgram, objs) 
{
    // clear the background (with black)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // set the shader to use
    gl.useProgram(shaderProgram);

    for(let i = 0; i< objs.length; i++)
    {
        let obj = objs[i];
        // connect up the shader parameters: vertex position, color and projection/model matrices
        // set up the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);

        gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, obj.modelViewMatrix);

        // Draw the object's primitives using indexed buffer information.
        // void gl.drawElements(mode, count, type, offset);
        // mode: A GLenum specifying the type primitive to render.
        // count: A GLsizei specifying the number of elements to be rendered.
        // type: A GLenum specifying the type of the values in the element array buffer.
        // offset: A GLintptr specifying an offset in the element array buffer.
        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    }
}

function update(gl, shaderProgram, objs) 
{
    // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
    requestAnimationFrame(()=> update(gl, shaderProgram, objs));

    draw(gl,shaderProgram, objs);

    objs.forEach(obj =>{
        obj.update();
    })
    // for(const obj of objs)
    //     obj.update();
    // for(let i = 0; i<objs.length; i++)
    //     objs[i].update();
}

main();