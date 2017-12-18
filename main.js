$(document).ready(function() {
  $(".option").draggable({
    helper: "clone",
    opacity: 0.5,
    connectToSortable: "#demo",
    start: function(event, ui) {
      if ($("#demo .option").length >= 3) {
        event.preventDefault()
      }
      console.log(ui.helper);
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
    $("#demo textarea").remove()
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

  //tooltip
  // $(".plus-icon").tooltip({
  //   tooltipClass: 'tooltip',
  //   disabled: true,
  //   position: {my: 'center top', at: 'center top', of: "$(.plus-icon)" },
  //   close: function( event, ui ) { $(this).tooltip('disable')}
  // })

  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 700,
    height: 500,
    closeText: 'x',
    show: { effect: "fade", duration: 300}
  })

  $("#add-text-button").click(function() {
    $("#dialog").dialog("open")
  })

  //1/3 or 2/3 textarea
  let isOneThirds = true
  let isTwoThirds = false
  $("#long-text").click(function(e) {
    event.preventDefault()
    $(this).hasClass("text-division-clicked") ? $(this).removeClass("text-division-clicked") : $(this).addClass("text-division-clicked")
    isTwoThirds = true
    isOneThirds = false
    console.log("Your chose longer text");
  })

  $("#short-text").click(function(e) {
    event.preventDefault()
    isOneThirds = true
    isTwoThirds = false
    $(this).hasClass("text-division-clicked") ? $(this).removeClass("text-division-clicked") : $(this).addClass("text-division-clicked")
    console.log("Your chose shorter text");
  })

  $("#text-submit-button").click(function(e) {
    event.preventDefault()
    $("#dialog").dialog("close")
    $("#textarea").appendTo($("#demo"))
    if (isTwoThirds) {
      $("#textarea").addClass("long-text")
    }
  })
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

// let hideTooltip = () => {
//   setTimeout(function() {
//     $(".plus-icon").tooltip('close')
//   }, 4000)
// }

let plusOne = (id) => {
  // $(".plus-icon").tooltip({
  //   content:function() {
  //     if ($("#demo").children('img').length == 3) {
  //       return "Remove one first before adding more"
  //     }
  //     return ""
  //   }
  // }).tooltip('open').tooltip('enable')
  // hideTooltip()

  if ($("#demo").children('img').length == 3) {
    let display = $(".alert-message").css("display")
    if (display == "none") {
      $(".alert-message").fadeIn().delay(3000).fadeOut()
    }
  }

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
