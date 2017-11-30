$(document).ready(function() {
    $(".option").draggable({
      helper: "clone",
      opacity: 0.5,
      connectToSortable: "#demo",
      start: function( event, ui ) {
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

  $("#demo").sortable({
   axis: "y",
   items: "> .option",
   containment: "parent"
  })
})
