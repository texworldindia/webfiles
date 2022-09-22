function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
function getFormData(thisID) {
  var kio = $(thisID+' input, '+thisID+' textarea').map(function() {
    return $( this ).attr('name');
  }).filter(function(item, pos) {
    if(typeof pos != 'undefined') {
      return pos;
    } 
  });

  var data = {};
  $.each(kio, function( key, pos) {
    data[pos] = $(thisID+' [name="'+pos+'"]').val();
  });
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  var thisID = '#'+$(this).attr('id');
  $('body').css('cursor', 'wait');
event.preventDefault();           // we are submitting via xhr below
var data = getFormData(thisID);
if( !validEmail(data.email) ) {   // if email is not valid show error
  $(this).find('.email-invalid').css('display', 'block');
  return false;
} else {
  $(this).find('.email-invalid').css('display', 'none');
var url = event.target.action;  //
var xhr = new XMLHttpRequest();
xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function() {
  $(thisID).css('display', 'none');
  $(thisID).next('.thankyou_message').css('display', 'block');
  $('body').css('cursor', 'default');
  return;
};
var encoded = Object.keys(data).map(function(k) {
  return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
}).join('&')
xhr.send(encoded);
}
}
function loaded() {
  var hrefFull = window.location.href;
  $('input[name="submittedPage"]').val(hrefFull);

  if($('body').hasClass('page_ksa')) {
   $('input[name="website"]').val('KSA');
 } else if ($('body').hasClass('page_qatar')) {
  $('input[name="website"]').val('Qatar');
} else {
  $('input[name="website"]').val('India');
}
 

  $('.pure-form').on("submit", handleFormSubmit);
  return false;
};
document.addEventListener('DOMContentLoaded', loaded, false);


$('#back-btn').on('click', function() {
  $('#orderForm').show();
  $(this).parent().hide();
});