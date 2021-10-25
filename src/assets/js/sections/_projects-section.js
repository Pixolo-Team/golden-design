// Import data from global js
import { work_tour } from "../global";

for (let work of work_tour) {
    $('.project-image-section').append(`
            <div class="project-bg-image" style="background-image:url(${IMG_PATH_PROJECT}${work.image})">
                <div class="project-image-lines">
                    <p class="image-line-1">${work.title}</p>
                    <p class="image-line-2">${work.location}</p>
                </div>
            </div>
        `);
}

$(".project-image-section").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
});
