// Import data from global js
import { numbers } from "../global";

for (let count of numbers) {
    $('.number-box').append(`
        <div class="left-line-box">
            <div class="numbers">${count.value}</div>
            <div class="numbers-discription">${count.title}</div>
        </div>
    `);
}
