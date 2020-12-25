var mario,marioimg,marioimg1
var ground,groundimg
var invisibleground
var brick,brickimage,brickgroup
var obstacle,obstaclegroup,obstacle1img,obstacle2img,obstacle3img,obstacle4img
var score=0
var PLAY=1
var END=0
var gameState=PLAY
function preload(){
  
  marioimg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
  marioimg1=loadImage("collided.png")
  
  groundimg = loadImage("bg.png")
  brickimage=loadImage("brick.png")
  
  obstacle1img=loadImage("obstacle1.png")
  obstacle2img=loadImage("obstacle2.png")
  obstacle3img=loadImage("obstacle3.png")
  obstacle4img=loadImage("obstacle4.png")
  
  gameoverimg=loadImage("gameOver.png")
}
function setup(){
  createCanvas(360,400)
  ground=createSprite(300,200)
  ground.addImage(groundimg)
  ground.scale=1.2
  ground.velocityX=-4
  
  mario = createSprite(50,350)
  mario.addAnimation("mario",marioimg)
  mario.scale=1.5
  
  brickgroup= new Group();
  obstaclegroup= new Group()
  
  invisibleground=createSprite(200,370,400,10)
  invisibleground.visible=false
}
function draw(){
  background("white")
  console.log(mario.y)
  if(ground.x<0){
    ground.x=ground.width/2

  }
 if (gameState===PLAY) {
   
  if(keyDown("space") ){
   mario.velocityY =-10 
  }
  mario.velocityY=mario.velocityY+0.5
  spawnbricks();
  spawnobstacles(); 
   
   if(mario.isTouching(brickgroup)){
    brickgroup.destroyEach()
    score=score+1
     
  
  } 
   if(mario.isTouching(obstaclegroup)){
     
     gameState=END
   }
   
 }
  else if(gameState===END){
   mario.destroy()
   mario.velocityX=0;
    brickgroup.setVelocityXEach(0)
  obstaclegroup.destroyEach()
   
    gameover=createSprite(180,200)
    gameover.addImage(gameoverimg)
    gameover.scale=0.8
  }
 
  mario.collide(invisibleground)
 
  drawSprites()
  textSize(25)
  fill("black")
  text("score: "+score,200,150)
}
function spawnbricks(){
  if(frameCount%100 ===0){
    brick=createSprite(360,250,10,10)
    brick.velocityX=-3
    brick.addImage(brickimage)
    brickgroup.add(brick)
  }

}
function spawnobstacles(){
  if(frameCount%100 ===0){
    obstacle=createSprite(360,350,10,10)
    obstacle.velocityX=-4
    obstaclegroup.add(obstacle)
    var rand= Math.round(random(1,4))
    switch(rand){
    case 1:obstacle.addImage(obstacle1img)
      break;    
        case 2:obstacle.addImage(obstacle2img)
      break;    
        case 3:obstacle.addImage(obstacle3img)
      break;    
        case 4:obstacle.addImage(obstacle4img)
      break;    
      
    }
      
  }

}