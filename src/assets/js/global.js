fetch("https://goldendesigninteriors.com/data/website-data.json")
    .then((response) => {
        if (response.status !== 200) {
            console.log("Request failed.", response.status);
            return;
        }
        response.json().then((data) => {
            for (count of data.counts) {
                console.log(document.getElementsByClassName("number-box").length);
                document.getElementsByClassName("number-box")[0].innerHTML += `
                    <div class="left-line-box">
                        <div class="numbers">${count.value}</div>
                        <div class="numbers-discription">${count.title}</div>
                    </div>
                `;
               
            }
        })
    })
    .catch((err) => {
        console.log(err);
    });
