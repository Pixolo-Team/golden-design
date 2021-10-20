var data;

function updateTestimonials() {
    let i = 0;
    for (let testimonial of data.testimonials) {
        if (i % 2 == 0) {
            $('.section-6-scroll').children('.section6-paragraph').text(testimonial.review);
            $('.section-6-scroll').children('.line1').text(testimonial.client_name);
            $('.section-6-scroll').children('.line2').text(testimonial.client_work);
        } else {
            $('.section6-scroll-2').children('.section6-paragraph').text(testimonial.review);
            $('.section6-scroll-2').children('.line1').text(testimonial.client_name);
            $('.section6-scroll-2').children('.line2').text(testimonial.client_work);
        }
        i += 1;
    }
}
function getWebsiteData(url) {
    fetch(url)
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Request failed.", response.status);
                return;
            }
            response.json().then(function(responseData) {
                data = responseData;
                for (count of data.counts) {
                    document.getElementsByClassName("number-box")[0].innerHTML += `
                        <div class="left-line-box">
                            <div class="numbers">${count.value}</div>
                            <div class="numbers-discription">${count.title}</div>
                        </div>
                    `;
                }
                updateTestimonials();
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

getWebsiteData("https://goldendesigninteriors.com/data/website-data.json");