var how_it_works = [
  {
    title: "Consultation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    progress: 10,
  },
  {
    title: "The Floor Plans",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    progress: 20,
  },
  {
    title: "The Wall Plans",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    progress: 40,
  },
  {
    title: "Best materials",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    progress: 70,
  },
  {
    title: "Build a home",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    progress: 100,
  },
];

var currentStatusStepCount = 1;
let interval;

$(".works-slider").slick({
  slidesToShow: 1,
  arrows: false,
  fade: true,
});

var initiateSteps = function () {
  moveToNextStep();
  currentStatusStepCount++;
  interval = setInterval(() => {
    startStepsInterval();
  }, 4000);
};

var startStepsInterval = function () {
  if (currentStatusStepCount > how_it_works.length) {
    resetSteps();
    initiateSteps();
  } else {
    moveToNextStep();
    currentStatusStepCount++;
  }
};

// startStepsInterval();

var moveToNextStep = function () {
  console.log(currentStatusStepCount);
  let index = currentStatusStepCount - 1;
  //   Give active class to current step
  let stepCircleElement = $(".work-number-wrapper").find(
    `[data-steps='${currentStatusStepCount}']`
  );
  //   Make numbers active
  stepCircleElement.addClass("active");
  //   Set slick slider image active
  $(".works-slider").slick("slickGoTo", index);
  //   Show Text of current steps
  showStepText(index);
  //   Change the fill and value
  changeProgress(index);
};

var showStepText = function (index) {
  $(".work-content").fadeOut(500, () => {
    $(".work-title").text(how_it_works[index].title).fadeIn();
    $(".work-desc").text(how_it_works[index].description).fadeIn();
  });
};

var changeProgress = function (index) {
  let widthValue = how_it_works[index].progress + "%";
  $(".loader-fill").width(widthValue);
  $(".loader-value").html(widthValue);
};

var resetSteps = function () {
  // Remove Class ACtive
  clearInterval(interval);
  $(".work-number-link").removeClass("active");
  currentStatusStepCount = 1;
};

$(document).ready(function () {
  $(".closing-button").click(function (event) {
    $(".covid-popup").slideUp();
  });

  $(".hero-section").slick();

  $(".work-number-link").click(function () {
    resetSteps();
    currentStatusStepCount = $(this).data("steps");
    let linkElements = $(".work-number-link");
    for (let i = 0; i < currentStatusStepCount; i++) {
      $(linkElements[i]).addClass("active");
    }
    initiateSteps();
  });

  initiateSteps();

  // FAQ Open - Close
  $(".faq-quaries").on("click", function () {
    $(this).children(".quaries-answers").slideToggle(300);

    // Show Plus or Minus

    // Wait for 400 ms
    setTimeout(() => {
      console.log($(this).find(".quaries-answers").children("#plus-icon"));
      // 1 : Check if quris-answers is block or none
      if ( $(this).find(".quaries-answers").is(":visible")) {
        // If it is block then show minus and hide plus
        $(this).find("#plus-icon").fadeOut("fast",()=>{
          console.log("Hi");
          $(this).find("#minus-icon").fadeIn("fast");
        });
        // $(this).find("#minus-icon").delay(100).fadeIn();
      }
      else{
        $(this).find("#minus-icon").fadeOut("fast",()=>{
          console.log("Hi");
          $(this).find("#plus-icon").fadeIn("fast");
        });
      }
    }, 400);
  });
});

// Client Video - Light Box
function closeModal() {
  $("#light-box-modal").removeClass("visible");
}
// $(".image-gradient").on("click", function () {
//   let url = $(this).attr("data-url");

//   const iframe = `<iframe width=100% height=100% src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//   $(".modal-content").html(iframe);
//   $("#light-box-modal").addClass("visible");
// });

$("#goTop").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 2000);
  return false;
});

//scroll-bar
$(document).ready(function(){

$(window).scroll(function(){
if($(this).scrollTop() > 40){
  $('#goTop').addClass('slide-up');
}
else{
  $('#goTop').removeClass('slide-up');
}
});

$("#goTop").click(function(){
$('html,body').animate({scrollTop:0},800);
});
});

//image-gallery
$(".lb-target").click(function(){
  $("#light-box-modal").addClass("visible");
  if($(this).attr("data-mediaType") == "youtube"){
    let url = $(this).attr("data-url");
    const iframe = `<iframe width=100% height=100% src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    $('.modal-content').html(iframe);
  }
  else{
  var imgSrc=$(this).attr("src");
  $('.modal-content').html('<img class="light-box-image" src="' +imgSrc+  '">');
  }
});