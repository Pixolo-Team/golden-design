var data;
var IMG_PATH_PROJECT = "assets/images/home/_projects-section/";

$(document).ready(function () {
  function getWebsiteData(url) {
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Request failed.", response.status);
          return;
        }
        response.json().then(function (responseData) {
          data = responseData;
          updateNumbers();
          updateTestimonials();
          updateWork();
          console.log(data);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function updateTestimonials() {
    let i = 0;
    for (let testimonial of data.testimonials) {
      if (i % 2 == 0) {
        document.getElementsByClassName("section-6-scroll")[0].innerHTML += `
                    <div class="section6">
                        <div class="section6-image-part">
                            <img class="sec6-img" src="assets/images/home/home-sec6/sec6-img1.jpg" alt="Office Image"/>
                        </div>
                        <div class="section6-paragraph-part">
                            <svg class="quote-icon" width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.768 9.92225C19.7681 9.90952 19.7681 9.89678 19.7681 9.88404C19.7681 4.42524 15.3428 0 9.88404 0C4.42524 0 0 4.42524 0 9.88404C0 14.6606 3.38827 18.6459 7.89245 19.5674C7.8359 21.504 6.91088 25.1657 3.45384 27.1016L3.90553 27.5002C9.48338 26.8627 19.9522 21.3927 19.768 9.92225Z" fill="#E9635A"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M43.5805 9.92225C43.5806 9.90952 43.5806 9.89678 43.5806 9.88404C43.5806 4.42524 39.1553 0 33.6965 0C28.2377 0 23.8125 4.42524 23.8125 9.88404C23.8125 14.6606 27.2008 18.6459 31.705 19.5674C31.6484 21.504 30.7234 25.1657 27.2663 27.1016L27.718 27.5002C33.2959 26.8627 43.7647 21.3927 43.5805 9.92225Z" fill="#E9635A"/>
                                </svg>
                            <p class="section6-paragraph">${testimonial.review}</p>
                            <div class="sec6-img-lines">
                                <img class="sec6-mini-img" src="${testimonial.client_image}" alt="User Image">
                                <div class="lines">
                                <p class="line1">${testimonial.client_name}</p>
                                <p class="line2">${testimonial.client_work}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
      } else {
        document.getElementsByClassName("section-6-scroll-2")[0].innerHTML += `
                    <div class="mobile-hide section6">
                        <div class="section6-paragraph-part">
                            <svg class="quote-icon" width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.768 9.92225C19.7681 9.90952 19.7681 9.89678 19.7681 9.88404C19.7681 4.42524 15.3428 0 9.88404 0C4.42524 0 0 4.42524 0 9.88404C0 14.6606 3.38827 18.6459 7.89245 19.5674C7.8359 21.504 6.91088 25.1657 3.45384 27.1016L3.90553 27.5002C9.48338 26.8627 19.9522 21.3927 19.768 9.92225Z" fill="#E9635A"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M43.5805 9.92225C43.5806 9.90952 43.5806 9.89678 43.5806 9.88404C43.5806 4.42524 39.1553 0 33.6965 0C28.2377 0 23.8125 4.42524 23.8125 9.88404C23.8125 14.6606 27.2008 18.6459 31.705 19.5674C31.6484 21.504 30.7234 25.1657 27.2663 27.1016L27.718 27.5002C33.2959 26.8627 43.7647 21.3927 43.5805 9.92225Z" fill="#E9635A"/>
                                </svg>
                            <p class="section6-paragraph">${testimonial.review}</p>
                            <div class="sec6-img-lines">
                                <img class="sec6-mini-img" src="${testimonial.client_image} alt-"User Image">
                                <div class="lines">
                                <p class="line1">${testimonial.client_name}</p>
                                <p class="line2">${testimonial.client_work}</p>
                                </div>
                            </div>
                        </div>
                        <div class="section6-image-part">
                            <img class="sec6-img" src="assets/images/home/home-sec6/sec6-img1.jpg" alt="Office Image"/>
                            </div>
                        </div>
                    </div>
                `;
      }
      i += 1;
    }
    $(".section-6-scroll").slick();
    $(".section-6-scroll-2").slick();
  }

  function updateNumbers() {
    for (let count of data.counts) {
      document.getElementsByClassName("number-box")[0].innerHTML += `
                <div class="left-line-box">
                    <div class="numbers">${count.value}</div>
                    <div class="numbers-discription">${count.title}</div>
                </div>
            `;
    }
  }

  function updateWork() {
    for (let work of data.work_tour) {
      document.getElementsByClassName("project-image-section")[0].innerHTML += `
                <div class="project-bg-image" style="background-image:url(${IMG_PATH_PROJECT}${work.image})">
                    <div class="project-image-lines">
                        <p class="image-line-1">${work.title}</p>
                        <p class="image-line-2">${work.location}</p>
                    </div>
                </div>
            `;
    }
    $(".project-image-section").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
    });
  }

  getWebsiteData("https://goldendesigninteriors.com/data/website-data.json");

  $("html").click(function () {
    $(".mobile-menu-item").slideUp();
  });

  $("#menu-btn").click(function (event) {
    event.stopImmediatePropagation();
    $(".mobile-menu-item").slideToggle();
  });
});

//page loader
$(window).ready(function () {
  setTimeout(function(){
    $("body").css("overflow-y","scroll");
    $(".loader-container").fadeOut("fade");
  }, 1000);

  progressively.init();
});