var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c =canvas.getContext('2d');

//rectangle
// c.fillRect(100,100,100,100);
// c.fillRect(200,200,100,100);
// c.fillRect(0,200,100,100);
// console.log(canvas);

//line
// c.beginPath();
// c.moveTo(100,100);
// c.lineTo(100,200);
// c.lineTo(300,200);
// c.lineTo(100,100);
// c.strokeStyle="yellow";
// c.stroke();

//circle
// c.beginPath();
// c.arc(300,120,50,0,Math.PI*2,false);
// c.strokeStyle="purple";
// c.stroke();

//multiple circle
// for(var i=0;i<100;i++){
//     var x=Math.random()*window.innerWidth;
//     var y=Math.random()*window.innerHeight;

//     c.beginPath();
//     c.arc(x,y,10,0,Math.PI*2,false);
//     c.strokeStyle="green";
//     c.stroke();
// }
var mouse ={
    x:undefined,
    y:undefined
};
var colors=[
    '#ffb345',
    '#a5d840',
    '#00e9a7',
    '#00e7ff',
    '#4dcfff'
];

window.addEventListener('mousemove',
    function(event){
    mouse.x=event.clientX;
    mouse.y=event.clientY;
})
window.addEventListener('resize',
    function(){
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        init();
})

function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function distance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}

function resolveCollision(circle,otherCircle){
    const xVelocityDiff = circle.velocity.x-otherCircle.velocity.x;
    const yVelocityDiff = circle.velocity.y-otherCircle.velocity.y;

    const xDist = otherCircle.x-circle.x;
    const yDist = otherCircle.y-circle.y;

    if(xVelocityDiff*xDist+yVelocityDiff*yDist>=0){
        const angle = -Math.atan2(otherCircle.y-circle.y,otherCircle.x-circle.x);

        const m1 = circle.mass;
        const m2 = otherCircle.mass;

        const u1 = rotate(circle.velocity,angle);
        const u2 = rotate(otherCircle.velocity,angle);

        const v1 = {x: u1.x * (m1-m2) / (m1+m2) + u2.x *2* m2 / (m1+m2),y: u1.y};
        const v2 = {x: u2.x * (m1-m2) / (m1+m2) + u1.x *2* m2 / (m1+m2),y: u2.y};

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        circle.velocity.x=vFinal1.x;
        circle.velocity.y=vFinal1.y;

        otherCircle.velocity.x=vFinal1.x;
        otherCircle.velocity.y=vFinal2.y;
    }
}
var maxRadius=40;

function Circle(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color=color;

    this.update=circle=>{
        
        if(this.x+this.radius>innerWidth||this.x-this.radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight||this.y-this.radius<0){
            this.dy=-this.dy;
        }
            this.x+=this.dx;
            this.y+=this.dy;

        if(mouse.x-this.x<50&&mouse.x-this.x>-50&&
            mouse.y-this.y<50&&mouse.y-this.y>-50){
            if(this.radius<maxRadius){
                this.radius+=1;
            }
        }
        else if(this.radius>this.minRadius){
            this.radius-=1;
        }
        this.draw();
    };

    this.draw=()=>{
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        
    };
}

var circle;

function init(){
    circle=[];
    for(let i=0;i<500;i++){
        var radius=Math.random()*10+1;
        var x=randomIntFromRange(radius,canvas.width-radius);
        var y=randomIntFromRange(radius,canvas.height-radius);
        var dx=(Math.random()-0.5);
        var dy=(Math.random()-0.5);
        var color=randomColor(colors);
        circle.push(new Circle(x,y,dx,dy,radius,color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    circle.forEach(circle=>{
        circle.update(circle);
    });
    
}
init();
animate();

 
//生成一個圓
// var x=Math.random()*innerWidth;
// var y=Math.random()*innerHeight;
// var dx=(Math.random()-0.5)*9;
// var dy=(Math.random()-0.5)*9;
// var radius=30;
// function animate(){
//     requestAnimationFrame(animate);
//     c.clearRect(0,0,innerWidth,innerHeight);
//     c.beginPath();
//     c.arc(x,y,radius,0,Math.PI*2,false);
//     c.strokeStyle="white";
//     c.lineWidth=6;
//     c.stroke();
//     if(x+radius>innerWidth||x-radius<0){
//         dx=-dx;
//     }
//     if(y+radius>innerHeight||y-radius<0){
//         dy=-dy;
//     }

//     x+=dx;
//     y+=dy;
// }
// animate();