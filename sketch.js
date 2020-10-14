
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background1,backgroundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  
  backgroundImage=loadImage("jungle.jpg");
  
  monkey_collided=loadAnimation("Monkey_10.png")
 
}



function setup() {
  // createCanvas(600, 600);
  


  
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("collided",monkey_collided);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  ground.visible=false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  background1=createSprite();
  background1.addImage(backgroundImage);
  background1.velocityX=-5;
}


function draw() {
  
  background(255);
  
  if(background1.x<0){
    background1.x=background1.width/2;
  }
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        background1.velocityX=0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey.changeAnimation("collided",monkey_collided);
        monkey.scale=0.1
        
        
        
      
    
    
    }
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+2;
    
  }
  
  switch(score){
    case 10:monkey.scale=0.12;
           break;
    case 20:monkey.scale=0.14;
           break;
    case 30:monkey.scale=0.16;
           break;
    case 40:monkey.scale=0.18;
           break;
    default: break;     
  }
    
  
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
