// I Will Use this method to get a random color/button
function random_item(items)
{
return items[Math.floor(Math.random()*items.length)];
}

// buttons to choose from
var buttons=['a' , 's' , 'k' , 'l'];

// current sequence storage
var sequenceTillNow=[];

// user input array
var sequenceEntered=[];

var levelCount=0;
var index=0;

function newLevel()
{
  levelCount++;
  sequenceEntered=[];
  index=0;
  $(".button-flashed").text("");
  $('#level-title').text("Level : "+ levelCount);
  flashRandomTheButton();
}

function checkValidity(lastItem)
{
  index = sequenceEntered.length - 1;
  if(sequenceTillNow[index]==sequenceEntered[index])
  {
    return true;
  }
  else if(sequenceTillNow[index]!=sequenceEntered[index]){
    return false;
  }
}

function flashRandomTheButton()
{
  $('#level-title').text("Level : "+ levelCount);

  var item=random_item(buttons);
  sequenceTillNow.push(item);

  setTimeout(function () {
    $("#"+item).addClass("Flash");
  }, 2000);

  setTimeout(function () {
    $("#"+item).removeClass("Flash");
    $(".button-flashed").text("Flashed :- " + item );
  }, 2100);

}
$(document).on('keydown',function(event){
  if(event.key == 'Enter')
  {
    flashRandomTheButton();
  }
  else if(event.key == 'a')
  {
    $("#a").click();
  }
  else if(event.key == 's')
  {
    $("#s").click();
  }
  else if(event.key == 'k')
  {
    $("#k").click();
  }
  else if(event.key == 'l')
  {
    $("#l").click();
  }
})

$(".butn").on("click",function(event){
  var clickedButton = event.target.innerHTML;
  $("#"+clickedButton).addClass("Flash");

  setTimeout(function () {
    $("#"+clickedButton).removeClass("Flash");
  }, 100);

  if(clickedButton=='a')
  {
    var audio = new Audio('sounds/red.mp3');
    audio.play();
  }
  else if(clickedButton=='s')
  {
    var audio = new Audio('sounds/green.mp3');
    audio.play();
  }
  else if(clickedButton=='k')
  {
    var audio = new Audio('sounds/blue.mp3');
    audio.play();
  }
  else if(clickedButton=='l')
  {
    var audio = new Audio('sounds/yellow.mp3');
    audio.play();
  }

  if(sequenceTillNow.length>0)
  {
    sequenceEntered.push(clickedButton);
    if(!checkValidity(sequenceEntered.length-1))
    {
      alert("Game Over :) \nCorrect sequence:- "+ sequenceTillNow +"\nEntered sequence:- " + sequenceEntered);
      sequenceTillNow=[];
      levelCount=0;
      sequenceEntered=[];
      $('#level-title').text("Game Over :) Refresh The Page");
      $('.body').removeClass("bg-dark");
      $('.body').addClass("game-over");
      $(".button-flashed").text("");
    }
    else if(sequenceEntered.length==sequenceTillNow.length){
      newLevel();
    }

  }


})
