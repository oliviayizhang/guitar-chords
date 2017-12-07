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
       $(".delete-button").removeClass("delete-button-hover")
     }
   }
  })

  $("#print").click(function() {
    window.print();
  })

  $("#clear").click(function() {
    $("#demo .option").remove()
    $(".delete-button").removeClass("delete-button-hover")
  })

  //mouseover show/hide delete button
  //wrap this in a loop to greatly simplify it. or loop over an array
  //where 4 => #top-delete, 5 => mid-delete, etc
  $(document).on({
    mouseenter: function() {
      console.log(!$("#demo .ui-draggable-dragging").length > 0);
      if (!$("#demo .ui-draggable-dragging").length > 0) {
        $("#top-delete").addClass("delete-button-hover")
      }
    },
    mouseleave: function() {
      $("#top-delete").removeClass("delete-button-hover")
    }
  }, "#demo img:nth-child(4)")

  $(document).on({
    mouseenter: function() {
      if (!$("#demo .ui-draggable-dragging").length > 0) {
        $("#middle-delete").addClass("delete-button-hover")
      }
    },
    mouseleave: function() {
      $("#middle-delete").removeClass("delete-button-hover")
    }
  }, "#demo img:nth-child(5)")

  $(document).on({
    mouseenter: function() {
      if (!$("#demo .ui-draggable-dragging").length > 0) {
        $("#bottom-delete").addClass("delete-button-hover")
      }
    },
    mouseleave: function() {
      $("#bottom-delete").removeClass("delete-button-hover")
    }
  }, "#demo img:nth-child(6)")

})

// make a function to fill demo with selected music

let fillPage = (id) => {
  $("#demo .option").remove()
  if($("#demo").children('img').length == 0) {
    let times = 3
    for(let i = 0; i < times; i++) {
      $("#demo").append($(id).clone())
    }
  }
}

let plusOne = (id) => {
  if ($("#demo").children('img').length < 3) {
    $("#demo").append($(id).clone())
  }
}

let removeOne = (num) => {
	var count = parseFloat(8)+parseFloat(num);
	if  (document.getElementsByClassName("ui-draggable").length >= count) {
  	let element = document.getElementsByClassName("ui-draggable")[num]
  	element.remove()
	}
}
