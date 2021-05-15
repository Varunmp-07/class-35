//Create variables here
var dog, hungrydog, happydog;
var database;
var foodS, foodStock;

function preload(){
  hungrydog=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(800, 700);

  database=firebase.database();
  console.log("database connected")

  dog=createSprite(400,400,100,100)
  dog.addImage(hungrydog)
  dog.scale=0.5

  foodStock =database.ref("FOOD");
  foodStock.on("value",readStock);
  }



function draw() { 
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydog);
  }

  drawSprites();
  //add styles here
  strokeWeight(5)
  fill("red");
  text("FOOD REMAINING:"+foodS,150,50);
}
function readStock(data){
  foodS=data.val();
}
function writeStock (v) {
  if(v<=0){
    v=0
  }else{
    v=v-1
  }
  database.ref('/').update({
    FOOD:v
  })


}



