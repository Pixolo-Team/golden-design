$(document).ready(()=>{
    $('.clients-logo-slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          
          {
            breakpoint: 697,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
        ]
      });
})
