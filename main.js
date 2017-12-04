$(document).ready(function() {
  $(".option").draggable({
    helper: "clone",
    opacity: 0.5,
    connectToSortable: "#demo",
    start: function(event, ui) {
      if ($("#demo .option").length >= 3) {
        event.preventDefault()
      }
    }
  })

//can listen to when the event is starting and do stuff
    // $( ".option" ).on( "dragstart", function( event, ui ) {
    //   if ($("#demo .option").length >= 3) {
    //     console.log(ui.helper[0])
        // $("#demo .option:nth-child(4)").detach();
    //   }
    // })

  let removeItem = false

  $("#demo").sortable({
   items: "> .option",
   opacity: 0.5,
   over: function() {
     removeItem = false
   },
   out: function() {
     removeItem = true
   },
   beforeStop: function(event, ui) {
     if(removeItem == true) {
       ui.item.remove()
     }
   }
  })

  $("#print").click(function() {
    window.print();
  })

  $("#clear").click(function() {
    $("#demo .option").remove()
  })

})

// make a function to fill demo with selected music

let fillPage = (id) => {
  $("#demo .option").remove()
  if($("demo").children().length == 0) {
    let times = 3
    for(let i = 0; i < times; i++) {
      $("#demo").append($(id).clone())
    }
  }
}
