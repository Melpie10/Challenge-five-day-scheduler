// 1. the current day is displayed at the top of the calendar
var Today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(Today);



// 2.each timeblock is color coded to indicate whether it is in the past, present, or future 
// timeblocks-activities go here

Tareas = [];


var loadTareas = function(){
    tareas = JSON.parse(localStorage.getItem("tareas"))
    if(!tareas) {
        tareas={};
    };
    printTareas(tareas)
}

var printTareas = function(){
    $.each(tareas, function(list, arr){

        var tareaP = $("<p>").addClass("description tarea-cosa" + list).text(arr)
        $("#tarea-cosa" + list).replaceWith(tareaP)
    })
}


var hourAudit = function(){
    var currentHour = moment().hour

    for(var i=8; i<18; i++){
        var tareaArea = $("#tarea-"+i)
        if(currentHour>i){
            $(tareaArea).addClass("past");
        } else if (currentHour === i){
            $(tareaArea).addClass("present");
        } else {
            $(tareaArea).addClass("future")
        }
    }
}

$(".tareaBox").on("click", "p", function(){
    console.log("<p> was clicked");

    var text =$(this)
      .text()
      .trim();
    var textInput =$("<textarea>")
      .addClass("form-control")
      .val(text);

    $(this).replaceWith(textInput);
     textInput.trigger("focus");
  });

    //Task needs to be updated
$(".tareaBox").on("blur", "textarea", function() {
    //get the textareas; current value/text
      var text = $(this)
        .val()
        .trim();
      // console.log(text)

      //recreate p element
      var tareaP = $("<p>")
        .addClass("tarea")
        .text(text);

      // replace textarea with p element
      $(this).replaceWith(tareaP);
    });    

    //Save tasks
    $(".saveBtn").on("click", function(){
      //   console.log("<save button> was clicked");
        var index = $(".saveBtn").index(this);
      //   console.log(index)
        tarea[index] = $(this).parent().find(".tareaBox").text();
        localStorage.setItem("tareas", JSON.stringify(tareas));
    });
  
    setInterval(function(){
        hourAudit();},1000*60*60);
  
    loadTareas();
    hourAudit();