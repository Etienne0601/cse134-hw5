const alertBtn = document.getElementById("alert");
const confirmBtn = document.getElementById("confirm");
const promptBtn = document.getElementById("prompt");
const saferPromptBtn = document.getElementById("safer-prompt");
const outputBox = document.getElementById("output");

alertBtn.addEventListener("click", () => {
    outputBox.style.display = "none";
    requestAnimationFrame(() => {
        setTimeout(() => {
            alert("Alert pressed!");
        });
    });
});

confirmBtn.addEventListener("click", function() {
    outputBox.style.display = "none";
    requestAnimationFrame(() => {
        setTimeout(() => {
            let res = confirm("Do you confirm this?");
            outputBox.innerHTML = `The value returned by the confirm method is : ${res}`;
            outputBox.style.display = "inline-block";
        });
    });
});

promptBtn.addEventListener("click", function() {
    outputBox.style.display = "none";
    setTimeout(function() {
        let res = prompt("What is your name?");
        outputBox.innerHTML = res ? `Prompt result : ${res}` : "Prompt result : User didn't enter anything";
        outputBox.style.display = "inline-block";
    }, 10);
});

saferPromptBtn.addEventListener("click", function() {
    outputBox.style.display = "none";
    setTimeout(function() {
        let res = prompt("What is your name?");
        let clean = DOMPurify.sanitize(res);
        outputBox.innerHTML = clean ? `Prompt result : ${clean}` : "Prompt result : User didn't enter anything";
        outputBox.style.display = "inline-block";
    }, 10);
});
