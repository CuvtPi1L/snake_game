let cvs = document.createElement('canvas')
cvs.classList.add('canvas')
const body = document.querySelector('body')
body.appendChild(cvs)
let ctx = cvs.getContext('2d')
//init cvs & ctx
console.log(ctx)

cvs.width = window.innerWidth
cvs.height = window.innerHeight

const particlesArray = [];
let hue = 0;


window.addEventListener('resize', function(){
        cvs.width = window.innerWidth
        cvs.height = window.innerHeight
})
//resize problem:
//reset cvs border everysingle time

const mouse ={
        x: undefined,
        y: undefined,
}

cvs.addEventListener('click',(event) => {
        mouse.x = event.x;
        mouse.y = event.y;
        for(let i =0; i<10; i++){
                particlesArray.push(new Particle())
        }
})
//callback funtion from eventlistener 

cvs.addEventListener('mousemove',(event)=>{
        // ctx.clearRect(0,0,cvs.width,cvs.height)
        mouse.x = event.x;
        mouse.y = event.y;
        for(let i =0; i<3; i++){
                particlesArray.push(new Particle())
        }
})
//mouse move detaction

console.log(particlesArray)
class Particle {
        constructor(){
                this.x = mouse.x
                this.y = mouse.y
                // this.x = Math.random() * cvs.width;
                // this.y = Math.random() * cvs.height;
                this.size = Math.random() * 16 + 1;
                this.dx = Math.random() * 3 -1.5;
                this.dy = Math.random() * 3 -1.5;
                this.color = 'hsl('+ hue + ', 100%, 50%)'
        }

        update(){
                this.x += this.dx;
                this.y += this.dy;
                if (this.size > 0.2) this.size -= 0.01;
        }

        draw(){
                ctx.strokeStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x,this.y,this.size,0, Math.PI * 2)
                ctx.stroke()  
        }
}




function handleParticles(){
        for(let i = 0; i < particlesArray.length; i ++){
               particlesArray[i].update();
               particlesArray[i].draw();
               
        //        for(let j = i; j < particlesArray.length; i++){
                       
        //                 const disX = particlesArray[i].x - particlesArray[j].x;
        //                 const disY = particlesArray[i].y - particlesArray[j].y;
        //                 const dis = Math.sqrt( disX * disX + disY * disY)
        //                 if(dis < 100){
        //                         ctx.beginPath()
        //                         ctx.strokeStyle = particlesArray[i].color
        //                         ctx.lineWidth = particlesArray[i].size
        //                         ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
        //                         ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
        //                         ctx.stroke();

        //                 }
        //        }
               if(particlesArray[i].size <= 0.3){
                        particlesArray.splice(i,1);
                        i --;
               }
        }
}

function animate(){
        // ctx.clearRect(0,0,cvs.width,cvs.height)
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0,0,cvs.width,cvs.height)
        handleParticles()
        hue += 1
        requestAnimationFrame(animate)

        //loop requestAnimationFrame, it update animation onscreen with the call back function
}
animate()