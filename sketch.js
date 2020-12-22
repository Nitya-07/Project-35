//Create variables here
var dog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage("dog", dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happyDog", happyDogImg);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("yellow");
  stroke("black");
  text("Note: Press the up arror key to feed the dog milk",15, 15)
  text("Food Remaining : "+ foodS,170,200)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}