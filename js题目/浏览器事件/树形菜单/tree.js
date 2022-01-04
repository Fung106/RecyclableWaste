"use strict"

let li = document.getElementsByTagName("li");

for (let i = 0; i < li.length; i++) {
    let span = document.createElement("span");
    span.append(li[i].firstChild.textContent.trim());
    li[i].firstChild.remove();
    li[i].prepend(span);
}

tree.addEventListener('click', function (event) {
    if (event.target.tagName === "SPAN") {
        console.log(event.target.firstChild.textContent.trim());
        if (event.target.nextElementSibling) {
            if (event.target.nextElementSibling.tagName === "UL") {
                let ul = event.target.nextElementSibling;
                console.log(ul);
                ul.hidden = !ul.hidden;
            }
        }
    }
})