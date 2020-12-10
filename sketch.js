//Create variables here
var dog, dogImg1,dogImg2;
var database,FoodStock, foodS;
function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png"); 
}

function setup() {
  createCanvas(500, 500);
  database= firebase.database();

  dog = createSprite(250,250,10,10)
  dog.addImage(dogImg1);
  dog.scale=0.1;

  FoodStock = database.ref('food')
  FoodStock.on("value",readStock)
  
}


function draw() {  
  background(46,139,87)

  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2)

  }
  //add styles here
  stroke("yellow")
  fill("white")
  text("Note: Press UP_ARROW to feed the dog milk",100,100)
  text("Food Remaning: "+ foodS,100,150)


}
function readStock(data){
  foodS = data.val()

}
function writeStock(x){

  if(x<=0){
    x=0;
    text("Happy Dog",100,400)
  }else{
    x=x-1;
  }
 
  database.ref('/').update({
    food:x


  })

}



