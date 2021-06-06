console.log("This is my index js file");

// Initialize the news api parameters
let source = 'the-times-of-india';
let q = 'apple';
let from = '2021-06-05';
let to = '2021-06-05';
let sortBy = 'popularity';
let apiKey = 'dcfb23cac2704ea4af27c42a643bc3bc'

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
// xhr.open('GET', `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`, '*', true);
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
// https://newsapi.org/v2/top-headlines?sources=the-times-of-india&apiKey=dcfb23cac2704ea4af27c42a643bc3bc
// https://newsapi.org/v2/everything?q=apple&from=2021-06-05&to=2021-06-05&sortBy=popularity&apiKey=dcfb23cac2704ea4af27c42a643bc3bc

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index+1}:</b> ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()


