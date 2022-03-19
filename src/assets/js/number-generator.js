function isScrolledIntoView(elem) {
    //TODO: Check why this is not working on mobile
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

//NUMBER COUNTER
var isCountLoaded = false;



var animateCountDown = function () {
    const counters = document.querySelectorAll('.value');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('akhi');
            const data = +counter.innerText;

            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }

        }

        animate();
        isCountLoaded = true;
    });
}


window.onscroll = function () {
    if (!isCountLoaded) {
        if (isScrolledIntoView($('.number-section'))) {
            animateCountDown();
        }
    }

}