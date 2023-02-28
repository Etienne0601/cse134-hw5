const alertTemplate = document.getElementById("alert-dialog");
const confirmTemplate = document.getElementById("confirm-dialog");
const promptTemplate = document.getElementById("prompt-dialog");

const alertBtn = document.getElementById("alert-button");
const confirmBtn = document.getElementById("confirm-button");
const promptBtn = document.getElementById("prompt-button");
const outputBox = document.getElementById("output");

alertBtn.addEventListener("click", () => {
    outputBox.style.display = "none";
    document.body.style.backgroundColor = "lightgray";
    const alertNode = alertTemplate.content.cloneNode(true);
    alertNode.firstElementChild.firstElementChild.lastElementChild.firstElementChild.addEventListener("click", function() {
        document.body.style.backgroundColor = "white";
    });
    document.body.append(alertNode);
});

confirmBtn.addEventListener("click", function() {
    outputBox.style.display = "none";
    document.body.style.backgroundColor = "lightgray";

    const confirmNode = confirmTemplate.content.cloneNode(true);
    
    const cancelBtn = confirmNode.firstElementChild.firstElementChild.lastElementChild.firstElementChild;
    const okBtn = confirmNode.firstElementChild.firstElementChild.lastElementChild.lastElementChild;

    cancelBtn.addEventListener("click", function() {
        document.body.style.backgroundColor = "white";
        outputBox.innerHTML = "Confirm result : false";
        outputBox.style.display = "inline-block";
    });
    okBtn.addEventListener("click", function() {
        document.body.style.backgroundColor = "white";
        outputBox.innerHTML = "Confirm result : true";
        outputBox.style.display = "inline-block";
    });

    document.body.append(confirmNode);
});

promptBtn.addEventListener("click", function() {
    outputBox.style.display = "none";
    document.body.style.backgroundColor = "lightgray";

    const promptNode = promptTemplate.content.cloneNode(true);

    const formNode = promptNode.firstElementChild.firstElementChild.firstElementChild;
    const cancelBtn = formNode.lastElementChild.firstElementChild;
    const okBtn = formNode.lastElementChild.lastElementChild;

    cancelBtn.addEventListener("click", function() {
        this.form.submitted = false;
    });

    okBtn.addEventListener("click", function() {
        this.form.submitted = true;
    });

    formNode.addEventListener("submit", function() {
        document.body.style.backgroundColor = "white";

        let res = formNode.children[2].value;
        let clean = DOMPurify.sanitize(res);
        outputBox.innerHTML = this.submitted ? `Prompt result : ${clean}` : "Prompt result : User didn't enter anything";
        outputBox.style.display = "inline-block";
    });

    document.body.append(promptNode);
});

