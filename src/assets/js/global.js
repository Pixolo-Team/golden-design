var numbers = [];
var testimonials = [];
var work_tour = [];

var IMG_PATH = "assets/images/";
var IMG_PATH_PROJECTS = "assets/images/projects/";
var IMG_PATH_BRAND = "assets/images/brand/";
var IMG_PATH_CLIENTS = "assets/images/clients/";
var IMG_PATH_HOME = "assets/images/home/";
var IMG_PATH_WORKS = "assets/images/works/";
var IMG_PATH_ABOUTUS = "assets/images/about-us/";
var IMG_PATH_FOOTER = "assets/images/footer/";

function getWebsiteData(url) {
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          console.log("Request failed.", response.status);
          return;
        }
        response.json().then(function (responseData) {
          numbers = responseData.counts;
          testimonials = responseData.testimonials;
          work_tour = responseData.work_tour;
        });
      })
      .catch(function (err) {
        console.log(err);
      });
}

getWebsiteData("https://goldendesigninteriors.com/data/website-data.json");

//   $("html").click(function () {
//     $(".mobile-menu-item").slideUp();
//   });

//   $("#menu-btn").click(function (event) {
//     event.stopImmediatePropagation();
//     $(".mobile-menu-item").slideToggle();
//   });
