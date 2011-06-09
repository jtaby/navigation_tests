//.....................................................................
// Constants

var node_num = 0;
var container_list = [];

var goBack = function(){
  var container = container_list.pop()
}
  
//.....................................................................
// HTML Generators

var generateList = function(num, container) {
  if (container === undefined) {
    var container = $(document.createElement('div'))
    container.addClass("container") 
  }
  
  var html = ""
  for (var i = 0, len = num; i < len; i++) {
    html += '<div class="item">node' + node_num + '-item' + i + '</div>';
  }
  
  container.html(html)
  
  node_num++
  
  $('.wrapper .content').append(container)
}

var pushNewList = function() {
  
  var scrollTop = document.body.scrollTop;
  
  var container = $(document.createElement('div'))
  container.addClass("container on-right")
  generateList(100, container)
  container.css('top',scrollTop);
  
  container.bind('webkitTransitionEnd',function(evt){
    container.css('top',0);
    document.body.scrollTop = 0;
  })
  
  setTimeout(function(){
    var shown = $('.shown')
    container_list.push(shown)
    shown.addClass('on-left').removeClass('shown')
    container.addClass('shown')
    shown.removeClass('shown')
  },0)
}
  
//.....................................................................
// Event Handling

$('.item').live('touchstart', function(evt) {
  $(this).addClass('selected')
})

$('.item').live('touchmove', function(evt) {
  $(this).removeClass('selected')
})

$('.item').live('touchcancel', function(evt) {
  $(this).removeClass('selected')
})

$('.item').live('touchend', function(evt) {
  if ($(evt.target).hasClass('selected')) {
    evt.preventDefault()
    $(this).removeClass('selected')
    pushNewList()
  }
})

$('.item').live('mousedown', function(evt) {
  evt.preventDefault()
  $(this).addClass('selected')
})

$('.item').live('mouseup', function(evt) {
  if ($(evt.target).hasClass('selected')) {
    evt.preventDefault()
    $(this).removeClass('selected')
    pushNewList()
  }
})
  
//.....................................................................
// Bootstrap

$(document).ready(function() {
  var formfactor = null;

  if (navigator.userAgent.indexOf("iPhone;") >= 0) {
    formfactor = "iphone";
  }
  else {
    formfactor = "ipad";
  }

  $('#'+formfactor).css('display','block').addClass('wrapper');

  return generateList(100)
})
