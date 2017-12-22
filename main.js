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
    $("#demo .all-options").remove()
    // $("#demo textarea").remove()
    $(".delete-button").removeClass("delete-button-hover")
  })

  //mouseover show/hide delete button
  //wrap this in a loop to greatly simplify it. or loop over an array
  //where 4 => #top-delete, 5 => mid-delete, etc
  $(document).on({
    mouseenter: function() {
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

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 700,
    height: 500,
    closeText: 'x',
    show: { effect: "fade", duration: 300}
  })

  $("#add-text-button").click(function() {
    if ($("#demo .all-options").length <= 2) {
      $("#dialog").dialog("open")
    } else {
      alert("Full!!!")
    }
  })

  //1/3 or 2/3 textarea
  let isOneThirds = true
  let isTwoThirds = false
  $("#long-text").click(function(e) {
    event.preventDefault()
    if ($("#demo .all-options").length <= 1) {
      isTwoThirds = true
      isOneThirds = false
      console.log("Your chose longer text")
    }
  })

  $("#short-text").click(function(e) {
    event.preventDefault()
    isOneThirds = true
    isTwoThirds = false
    console.log("Your chose shorter text");
  })

  $("#text-submit-button").click(function(e) {
    event.preventDefault()
    $("#dialog").dialog("close")
    $("#textarea").clone().appendTo($("#demo"))
    $("#dialog textarea").val("")
    if (isTwoThirds) {
      $("#textarea").addClass("long-text")
    }
  })
})

// make a function to fill demo with selected music
let fillPage = (id) => {
  $("#demo .option").remove()
  if($("#demo .all-options").length == 0) {
    let times = 3
    for(let i = 0; i < times; i++) {
      $("#demo").append($(id).clone())
    }
  }
}

let plusOne = (id) => {
  if ($("#demo .all-options").length == 3) {
    let display = $(".alert-message").css("display")
    if (display == "none") {
      $(".alert-message").fadeIn().delay(3000).fadeOut()
    }
  }

  if ($("#demo .all-options").length < 3) {
    $("#demo").append($(id).clone())
  }
}

let removeOne = (num) => {
	let count = parseFloat(8)+parseFloat(num);
	if  (document.getElementsByClassName("all-options").length >= count) {
  	let element = document.getElementsByClassName("all-options")[num]
  	element.remove()
	}


}
