var data;
var IMG_PATH_PROJECT = "assets/images/home/_projects-section/";

$(document).ready(function () {
  $(".section-6-scroll").slick();
  $(".section-6-scroll-2").slick();
  $(".project-image-section").slick({
    slidesToShow: 3,
    slidesToScroll: 3
  });

  $("html").click(function () {
    $(".mobile-menu-item").slideUp();
  });

  $("#menu-btn").click(function (event) {
    event.stopImmediatePropagation();
    $(".mobile-menu-item").slideToggle();
  });
});

var hideFormMessage = function () {
  setTimeout(() => {
    $('.form-msg').slideUp();
    $('.form-msg').text("");
    $('#submit').removeAttr('disabled');
  }, 3000)
}

var animateErrorMsg = function (shouldShow = 1) {
  if (shouldShow) { // Then show error message
    $('.form-msg').slideDown();
  } else {
    $('.form-msg').slideUp();
  }
}

var initContactForm = function () {
  $('#submit').click(() => {
    $('#form-error').text("");
    let nameValue = $('#name').val();
    let emailValue = $('#email').val();
    let phoneValue = $('#phone').val();
    let propertyArea = $('#propertyArea').val();
    let propertyType = $('#propertyType').val();
    let propertyCategory = $('#propertyCategory:checked').val();
    let messageValue = $('#message').val();
    if (!nameValue.trim()) {
      $('#form-error').text("Name field cannot be left empty");
      animateErrorMsg();
      return;
    }
    if (!emailValue.trim()) {
      $('#form-error').text("Email field cannot be left empty");
      animateErrorMsg();
      return;
    }
    if (!messageValue.trim()) {
      $('#form-error').text("Message field cannot be left empty");
      animateErrorMsg();
      return;
    }
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    if (!regex.test(emailValue)) {
      $('#form-error').text("Please enter a valid email Id");
      animateErrorMsg();
      return;
    }
    $('#submit').attr('disabled', 'disabled');
    $.post("https://goldendesigninteriors.com/mail.php", {
      "message": messageValue, "name": nameValue, "email": emailValue, "phone": phoneValue, propertyArea,
      propertyType,
      propertyCategory
    })
      .done((response) => {
        console.log(response);
        if (response) {
          $('#form-success').text("We will get in touch with you soon.");
        } else {
          $('#form-error').text("There was a problem. Please try again.");
        }
        hideFormMessage();
      })
  })
}


//page loader
$(window).ready(function () {
  setTimeout(function () {
    $("body").css("overflow-y", "scroll");
    $(".loader-container").fadeOut("fade");
  }, 1000);

  progressively.init();
  initContactForm();
});