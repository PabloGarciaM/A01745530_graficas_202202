/*A01745530, Pablo García
Examen 1
*/

let projectionMatrix = null, shaderProgram = null;

let shaderVertexPositionAttribute = null, shaderVertexColorAttribute = null, shaderProjectionMatrixUniform = null, shaderModelViewMatrixUniform = null;

let mat4 = glMatrix.mat4;

let duration = 10000;


let vertexShaderSource = `#version 300 es
in vec3 vertexPos;
in vec4 vertexColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec4 vColor;

void main(void) {
    // Return the transformed and projected vertex value
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
    // Output the vertexColor in vColor
    vColor = vertexColor;
}`;

let fragmentShaderSource = `#version 300 es
    precision lowp float;
    in vec4 vColor;
    out vec4 fragColor;

    void main(void) {
    // Return the pixel color: always output white
    fragColor = vColor;
}
`;

function createShader(glCtx, str, type)
{
    let shader = null;
    
    if (type == "fragment") 
        shader = glCtx.createShader(glCtx.FRAGMENT_SHADER);
    else if (type == "vertex")
        shader = glCtx.createShader(glCtx.VERTEX_SHADER);
    else
        return null;

    glCtx.shaderSource(shader, str);
    glCtx.compileShader(shader);

    if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        throw new Error(glCtx.getShaderInfoLog(shader));
    }

    return shader;
}

function initShader(glCtx, vertexShaderSource, fragmentShaderSource)
{
    const vertexShader = createShader(glCtx, vertexShaderSource, "vertex");
    const fragmentShader = createShader(glCtx, fragmentShaderSource, "fragment");

    let shaderProgram = glCtx.createProgram();

    glCtx.attachShader(shaderProgram, vertexShader);
    glCtx.attachShader(shaderProgram, fragmentShader);
    glCtx.linkProgram(shaderProgram);
    
    if (!glCtx.getProgramParameter(shaderProgram, glCtx.LINK_STATUS)) {
        throw new Error("Could not initialise shaders");
    }

    return shaderProgram;
}

function initWebGL(canvas) 
{
    let gl = null;
    let msg = "Your browser does not support WebGL, or it is not enabled by default.";

    try 
    {
        gl = canvas.getContext("webgl2");
    } 
    catch (e)
    {
        msg = "Error creating WebGL Context!: " + e.toString();
    }

    if (!gl)
    {
        throw new Error(msg);
    }

    return gl;        
}

function initViewport(gl, canvas)
{
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initGL(gl, canvas)
{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 100);
}

function draw(gl, objs) 
{
    // clear the background (with black)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set the shader to use
    gl.useProgram(shaderProgram);

    for(const obj of objs)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);

        gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, obj.modelViewMatrix);

        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    }
}

function drawMidTriangle(x0,y0,z0,x1,y1,z1,x2,y2,z2,depth){

    if(depth==0){

        let canvasContext = document.getElementById("pyramidCanvas");
        let glCtx = initWebGL(canvasContext);

        initViewport(glCtx, canvasContext);
        initGL(glCtx, canvasContext);

        pyramiData.push(pyramidForm(glCtx,[0,0,-4.8],[0,-2,0],[x0,y0,z0,x1,y1,z1,x2,y2,z2]))
        
    }else{
        //Usamos este metodo para encontrar el punto medio de los 3 lados de un triangulo y hacerlo de manera recursiva

        //Mid Down
        let vx0 = (x0+x1)/2, vy0 = (y0+y1)/2, vz0 = (z0+z1)/2;
        //Mid Right
        let vx1 = (x0+x2)/2, vy1 = (y0+y2)/2, vz1 = (z0+z2)/2;
        //Mid Left
        let vx2 = (x1+x2)/2, vy2= (y1+y2)/2, vz2 = (z1+z2)/2;
        //Recursión para obtener los triangulos 

        drawMidTriangle(x0,y0,z0,vx0,vy0,vz0,vx1,vy1,vz1,depth-1);
        drawMidTriangle(vx0,vy0,vz0,x1,y1,z1,vx2,vy2,vz2,depth-1);
        drawMidTriangle(vx1,vy1,vz1,vx2,vy2,vz2,x2,y2,z2,depth-1);

    }

}
//Constante para guardar la información de la piramide
const pyramiData=[];


function pyramidForm(gl, translation, rotationAxis, vertices) 
{
    
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);    

    //Array where all colors are pushed
    let rColors = [];
    //Colores aleatorios para el trinagulo
    for(var i =0; i <200; i++){
        let a = Math.random()+0.2
        let b = Math.random()+0.1
        let c = Math.random()
        let o = 1;
        let tempColors =[a,b,c,o];
        rColors.push(tempColors)
    }

    let vertexColors = [];

    //Para que cada triangulo tenga un color diferente
    rColors.forEach(color => {
        for (var i = 0; i < 3; i++) {
            vertexColors.push(...color)
        }
    })

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    

    // Index data (defines the triangles to be drawn).
    let pyramidIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexBuffer);

    let pyIndex = [0,1,2];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pyIndex), gl.STATIC_DRAW);
    
    let pyramid = {
            buffer: vertexBuffer, colorBuffer:colorBuffer, indices:pyramidIndexBuffer,
            vertSize:3, nVerts:vertices.length/3, colorSize:4, nColors: vertexColors.length / 4, nIndices: pyIndex.length,
            primtype:gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime : Date.now()
        };

    mat4.translate(pyramid.modelViewMatrix, pyramid.modelViewMatrix, translation);
    mat4.rotate(pyramid.modelViewMatrix, pyramid.modelViewMatrix, Math.PI/8, [1, 0, 0]);

    pyramid.update = function()
    {
        let now = Date.now();
        let deltat = now - this.currentTime;
        this.currentTime = now;
        let fract = deltat / duration;
        let angle = Math.PI * 2 * fract;

        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
    };
    
    return pyramid;
}

function update(glCtx, objs)
{
    requestAnimationFrame(()=>update(glCtx, objs));

    draw(glCtx, objs);
    objs.forEach(obj => obj.update())
}

function bindShaderAttributes(glCtx, shaderProgram)
{
    shaderVertexPositionAttribute = glCtx.getAttribLocation(shaderProgram, "vertexPos");
    glCtx.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderVertexColorAttribute = glCtx.getAttribLocation(shaderProgram, "vertexColor");
    glCtx.enableVertexAttribArray(shaderVertexColorAttribute);
    
    shaderProjectionMatrixUniform = glCtx.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = glCtx.getUniformLocation(shaderProgram, "modelViewMatrix");
}

function main()
{
    //Create base pyramid face  
    drawMidTriangle(-1, 0,-1.0,  -1.0,0,1,    0, 1, 0,  2)
    //Create Left Front Face
    drawMidTriangle(1, 0, 0.0,  0.0, 1, 0,   -1, 0, -1,  2)
    //Create Right Front Face
    drawMidTriangle(1,0,0,  -1,0,1,   0,1, 0,  2)

    //Create Back Face
    drawMidTriangle(1, 0, 0.0,  -1, 0, -1,   -1, 0, 1,  2)


    let canvas = document.getElementById("pyramidCanvas");
    let glCtx = initWebGL(canvas);

    initViewport(glCtx, canvas);
    initGL(glCtx, canvas);


    shaderProgram = initShader(glCtx, vertexShaderSource, fragmentShaderSource);
    bindShaderAttributes(glCtx, shaderProgram);

    update(glCtx, pyramiData);
}

main();