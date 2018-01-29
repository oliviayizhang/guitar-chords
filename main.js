$(document).ready(function() {
  $(".option").draggable({
    helper: "clone",
    opacity: 0.5,
    connectToSortable: "#demo",
    start: function(event, ui) {
      if ($("#demo textarea").hasClass("long-text") && $("#demo .all-options").length ==2) {
        event.preventDefault()
      } else if (!$("#demo textarea").hasClass("long-text") && $("#demo .all-options").length ==3) {
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
        $(".top-delete").addClass("delete-button-hover")
      }
    },
    mouseleave: function() {
      $(".top-delete").removeClass("delete-button-hover")
    }
  }, "#demo .all-options:nth-child(4)")

  $(document).on({
    mouseenter: function() {
      if (!$("#demo .ui-draggable-dragging").length > 0) {
        if ($(".long-text").is("#demo .all-options:nth-child(4)")) {
          $(".middle-delete").addClass("delete-button-hover middle-delete-to-bottom")
          console.log("Add class middle-delete-to-bottom!");
        } else {
          $(".middle-delete").removeClass("middle-delete-to-bottom")
          $(".middle-delete").addClass("delete-button-hover")
        }
      }
    },
    mouseleave: function() {
      $(".middle-delete").removeClass("delete-button-hover")
    }
  }, "#demo .all-options:nth-child(5)")

  $(document).on({
    mouseenter: function() {
      if (!$("#demo .ui-draggable-dragging").length > 0) {
        $(".bottom-delete").addClass("delete-button-hover")
      }
    },
    mouseleave: function() {
      $(".bottom-delete").removeClass("delete-button-hover")
    }
  }, "#demo .all-options:nth-child(6)")

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 700,
    height: 500,
    closeText: 'x',
    show: { effect: "fade", duration: 300}
  })

  $("#add-text-button").click(function() {
    isOneThirds = true
    isTwoThirds = false

    let display = $(".alert-message").css("display")
    if ($("#demo").has("textarea").length == 0 && $("#demo .all-options").length <= 2) {
      $("#dialog").dialog("open")
    } else {
      if (display == "none") {
        $(".alert-message").fadeIn().delay(3000).fadeOut()
      }
    }
  })

  //1/3 or 2/3 textarea
  let isOneThirds = true
  let isTwoThirds = false
  $("#long-text").click(function(e) {
    if ($("#demo .all-options").length <= 1) {
      isTwoThirds = true
      isOneThirds = false
      console.log("Your chose longer text")
    } else {
      e.preventDefault()
    }
  })

  $("#short-text").click(function(e) {
    isOneThirds = true
    isTwoThirds = false
    console.log("Your chose shorter text");
  })

  let lines;

  $("#text-submit-button").click(function(e) {
    e.preventDefault()
    $("#dialog").dialog("close")
    $("#dialog #textarea").clone().appendTo($("#demo"))
    //add css class "long-text" to change the height
    if (isTwoThirds) {
      $("#demo #textarea").addClass("long-text")
    }
    //reset the value to empty
    $("#dialog #textarea").val("")
    //reset radio button value
    isTwoThirds = false
    isOneThirds = true
  })

  //line count
  $("#dialog #textarea").on('change keyup paste click', function() {
    lines = $("#dialog #textarea").val().split(/\r\n|\r|\n/)

    if (isOneThirds) {
      $("#line-count").text(lines.length)
      $("#line-limit").text(" of 16")
    } else {
      $("#line-count").text(lines.length)
      $("#line-limit").text(" of 31")
    }

    //condition to change the numbers of lines color
    if (isOneThirds && lines.length > 16) {
      $("#line-count").css({'color': 'tomato', 'font-weight': 'bold'})
    } else if (isTwoThirds && lines.length > 31) {
      $("#line-count").css({'color': 'tomato', 'font-weight': 'bold'})
    } else {
      $("#line-count").css({'color': '#4ECC6E', 'font-weight': 'bold'})
    }
  })

})

// make a function to fill demo with selected music
let fillPage = (id) => {
  $("#demo .all-options").remove()
  if($("#demo .all-options").length == 0) {
    let times = 3
    for(let i = 0; i < times; i++) {
      $("#demo").append($(id).clone())
    }
  }
}

let plusOne = (id) => {
  let display = $(".alert-message").css("display")

  //if (textarea has "long-text" && length == 2) || (textarea has no "long-text" && length == 3) {display message}
  if ($("#demo textarea").hasClass("long-text") && $("#demo .all-options").length == 2) {
    if (display == "none") {
      $(".alert-message").fadeIn().delay(3000).fadeOut()
    }
  }

  if (!$("#demo textarea").hasClass("long-text") && $("#demo .all-options").length == 3) {
    if (display == "none") {
      $(".alert-message").fadeIn().delay(3000).fadeOut()
    }
  }

  //if (textarea has "long-text" && length < 2) || (textarea has no "long-text" && length < 3) {append}
  if ($("#demo textarea").hasClass("long-text") && $("#demo .all-options").length < 2) {
     $("#demo").append($(id).clone())
  }

  if (!$("#demo textarea").hasClass("long-text") && $("#demo .all-options").length < 3) {
    $("#demo").append($(id).clone())
  }
}

let removeOne = (num) => {
	let count = parseFloat(9)+parseFloat(num);
	if  (document.getElementsByClassName("all-options").length >= count) {
  	let element = document.getElementsByClassName("all-options")[num]
  	element.remove()
	}
}
