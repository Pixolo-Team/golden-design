var how_it_works = [
  {
    title: "Consult with us",
    description:
      "This is the first step to our relationship with you. We meet the Customer and discuss your ideas to understand the plan and the scope of work. During this meeting, we also understand the taste and the personality of the Customer.",
    progress: 10,
  },
  {
    title: "Appoint us",
    description:
      "After we finish our discussions, both the customer and we get an idea if we are compatible with each other. At this stage, you appoint us, Golden Design Interiors as your Designers. Only after we are appointed by you, we can start creating stuff.",
    progress: 20,
  },
  {
    title: "Measurement and Floor Plan",
    description:
      "Now that we are your designers, we come over and measure the canvas that needs to be worked on. We create the Floor Plan for your space, in this plan we include the positions, sizes of the furniture, etc. These can be 2D and 3D design plans.",
    progress: 40,
  },
  {
    title: "Design Development",
    description:
      "After the floor plan, we move on to the main step, the part where we do the best. We design your space from top to bottom, left to right, we make sure every single inch is properly planned and looks beautiful.",
    progress: 70,
  },
  {
    title: "Execution and Handover",
    description:
      "Once the designs are ready, we start handpicking the materials required for the work. Once the materials are ready, our contractors, plumbers, and carpenters get to the job. We then finally hand over the space to you to start your dream journey.",
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
    $(this).find(".icon").toggleClass("open");
  });

  $('.section-6-scroll').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
  });
  $('.section-6-scroll-2').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
  });
  $(".project-image-section").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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

$("#goTop").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 2000);
  return false;
});

//scroll-bar
$(document).ready(function () {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $('#goTop').addClass('slide-up');
    }
    else {
      $('#goTop').removeClass('slide-up');
    }
  });

  $("#goTop").click(function () {
    $('html,body').animate({ scrollTop: 0 }, 800);
  });
});

//image-gallery
$(".lb-target").click(function () {
  $("#light-box-modal").addClass("visible");
  if ($(this).attr("data-mediaType") == "youtube") {
    let url = $(this).attr("data-url");
    const iframe = `<iframe width=100% height=100% src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    $('.modal-content').html(iframe);
  }
  else {
    var imgSrc = $(this).attr("src");
    $('.modal-content').html('<img class="light-box-image" src="' + imgSrc + '">');
  }
});



$(".faq-quaries").on("click", function () {
  
});