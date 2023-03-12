class ButtonCount extends HTMLElement {
    constructor() {
        super();

        let button = document.createElement("button");
        button.innerHTML = "Times Clicked: 0";

        button.addEventListener('click', function() {
            let nextNum = Number(this.innerHTML.split(" ")[2]) + 1;
            this.innerHTML = `Times Clicked: ${nextNum}`;
        });
    
        this.attachShadow({mode: "open"});
        this.shadowRoot.append(button);
    }
}

window.customElements.define("button-count", ButtonCount);
