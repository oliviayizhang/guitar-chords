$(document).ready(function() {
  $(".option").draggable({
    helper: "clone",
    opacity: 0.5,
    grid: [50, 20]
  })

  $("#demo").droppable({
    accept: ".option",
    drop: function(event, ui) {
      if (document.getElementsByTagName("img").length <= 6) {
        ui.draggable.clone().appendTo($(this))
      }
    }
  })

  $("#demo").sortable()
})
