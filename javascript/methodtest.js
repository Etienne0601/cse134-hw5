// global vars here
const postBtn = document.getElementById("postBtn");
const getBtn = document.getElementById("getBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");

const myform = document.getElementById("form");
const mydate = document.getElementById("date");
const output = document.getElementById("response");
const table = document.getElementById("output-table");
const tableId = document.getElementById("table-id");
const tableArticleName = document.getElementById("table-article-name");
const tableArticleBody = document.getElementById("table-article-body");
const tableDate = document.getElementById("table-date");

function sendPost() {
    let formdata = new FormData(myform);
    formdata.set("date", new Date());

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://httpbin.org/post");

    xhr.responseType = "json";
    xhr.timeout = 4000; // 4 second timeout

    xhr.send(formdata);

    xhr.onload = function() {
        tableId.innerHTML = xhr.response.form.id;
        tableArticleName.innerHTML = xhr.response.form.article_name;
        tableArticleBody.innerHTML = xhr.response.form.article_body;
        tableDate.innerHTML = xhr.response.form.date;

        // show the table
        table.style.display = "block";
    }
    
    // clear the form
    myform.reset();
}

function sendGet() {
    let formdata = new FormData(myform);
    formdata.set("date", new Date());

    let url = "https://httpbin.org/get?"
    let searchParams = new URLSearchParams(formdata).toString();

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url + searchParams);

    xhr.responseType = "json";
    xhr.timeout = 4000; // 4 second timeout

    xhr.send();

    xhr.onload = function() {
        tableId.innerHTML = xhr.response.args.id;
        tableArticleName.innerHTML = xhr.response.args.article_name;
        tableArticleBody.innerHTML = xhr.response.args.article_body;
        tableDate.innerHTML = xhr.response.args.date;

        // show the table
        table.style.display = "block";
    }
    
    // clear the form
    myform.reset();
}

function sendPut() {
    let formdata = new FormData(myform);
    formdata.set("date", new Date());

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://httpbin.org/put");

    xhr.responseType = "json";
    xhr.timeout = 4000; // 4 second timeout

    xhr.send(formdata);

    xhr.onload = function() {
        tableId.innerHTML = xhr.response.form.id;
        tableArticleName.innerHTML = xhr.response.form.article_name;
        tableArticleBody.innerHTML = xhr.response.form.article_body;
        tableDate.innerHTML = xhr.response.form.date;

        // show the table
        table.style.display = "block";
    }
    
    // clear the form
    myform.reset();
}

function sendDelete() {
    let formdata = new FormData(myform);
    formdata.set("date", new Date());

    let url = "https://httpbin.org/delete?"
    let searchParams = new URLSearchParams(formdata).toString();

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + searchParams);

    xhr.responseType = "json";
    xhr.timeout = 4000; // 4 second timeout

    xhr.send();

    xhr.onload = function() {
        tableId.innerHTML = xhr.response.args.id;
        tableArticleName.innerHTML = xhr.response.args.article_name;
        tableArticleBody.innerHTML = xhr.response.args.article_body;
        tableDate.innerHTML = xhr.response.args.date;

        // show the table
        table.style.display = "block";
    }
    
    // clear the form
    myform.reset();
}

window.addEventListener("load", function() {
    // button event listeners
    postBtn.addEventListener("click", sendPost);
    getBtn.addEventListener("click", sendGet);
    putBtn.addEventListener("click", sendPut);
    deleteBtn.addEventListener("click", sendDelete);
});
