
//Draw of a filled triangle by (x0,y0,x1,y1,x2,y2)
function drawTriangle(x0,y0,x1,y1,x2,y2){
    this.ctx.beginPath();
    this.ctx.moveTo(x0,y0);
    this.ctx.lineTo(x1,y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.lineTo(x0,y0);
    this.ctx.fill();
}
//Draw a red tringle  simmulating a removing
function drawMidTriangle(x0,y0, x1, y1, x2, y2, depth)
{
    if(depth > 0)
    {
        //Midpoints
        //Mid Down
        var vx0 = (x0+x1)/2, vy0 = (y0+y1)/2;
        //Mid Right
        var vx1 = (x1+x2)/2, vy1 = (y1+y2)/2;
        //Mid Left
        var vx2 = (x2+x0)/2, vy2= (y2+y0)/2;

        //Draw triangle center/remove it
        drawTriangle(vx0, vy0, vx1, vy1, vx2, vy2);
        if(depth > 1)
        {
            //Remove center triangles recursively ofr the down scaled triangles
            drawMidTriangle(x0,y0,vx0,vy0,vx2,vy2,depth-1);
            drawMidTriangle(vx0,vy0,x1,y1,vx1,vy1,depth-1);
            drawMidTriangle(vx1,vy1,x2,y2,vx2,vy2,depth-1);
        }
    }
}
//Draw a sierpinski triangle with recursion
function sierpinskiTriangle(depth)
{
    //Clear canvas
    this.ctx.clearRect(0,0,this.cHeight,this.cHeight);
    //Initialize coordinates to draw a triangle
    var x0 = 0, y0 = this.cHeight-1;
    var x1 = this.cWidth, y1 = this.cHeight - 1;
    var x2 = this.cWidth/2, y2 = 0;
    //Draw 1st triangle
    this.ctx.fillStyle = "gold";
    this.drawTriangle(x0,y0,x1,y1,x2,y2);

    //Remove middle triangle by drawing a black triangle defined by the mid points
    this.ctx.fillStyle = "black"
    if(depth > this.maxDepth)
    {
        depth = this.maxDepth;
        document.getElementById('sliderValue').value = depth;
    }
    this.drawMidTriangle(x0,y0,x1,y1,x2,y2,depth);
    
}

function sliderManager(x0,y0,x1,y1,x2,y2)
{
    document.getElementById("sliderRange").oninput = function(event){
        document.getElementById("sliderValue").innerHTML = "Subdivisiones: "+ event.target.value;
        depthValue = event.target.value
        sierpinskiTriangle(depthValue);
    }  
}

function main()
{
    //Canvas element form the html
     this.canvas = document.getElementById("SiperpinskiCanvas");
    //If canvas isn't null, retrived element succesfully
    if(!canvas)
    {
        console.log("Failed to load the canvas element.")
        return;
    }
    // Canvas 2d Context
    this.ctx = this.canvas.getContext("2d");
    //Canvas width
    this.cWidth = 600;
    this.cHeight = Math.sqrt(3)/2 * this.cWidth;
    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;
    
    this.maxDepth = 10;
    
    sliderManager();
}