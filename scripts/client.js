function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        value = this.responseText;
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            value = this.responseText;
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();

}

document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {

    currentElement.addEventListener("click", function (e) {
        for (let i = 0; i < this.parentNode.childNodes.length; i++) {
            if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                    this.parentNode.childNodes[i].innerHTML = "";
                    break;
                }
            }
        }
    });
});

document.querySelector("#gameTable").addEventListener("click", function (e) {
    ajaxGET("/assignment5DBTable", function (data) {
        document.getElementById("gameTable-html").innerHTML = data;
    });
});