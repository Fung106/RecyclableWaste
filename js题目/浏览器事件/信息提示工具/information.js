"use strict"

document.addEventListener('mouseover', function (event) {
    let btn = event.target;

    if (btn.dataset.tooltip) {
        let btnCoords = btn.getBoundingClientRect();

        let text = event.target.dataset.tooltip;
        let div = document.createElement('div');
        div.classList.add('tooltip');
        div.innerHTML = text;
        this.body.append(div);

        if (btn.clientWidth > div.clientWidth) {
            let len = (btn.clientWidth - div.clientWidth) / 2;
            div.style.left = btnCoords.left + len + 'px';
        } else {
            let len = (div.clientWidth - btn.clientWidth) / 2;
            if (btnCoords.left - len < 0) {
                div.style.left = 0 + 'px';
            } else {
                div.style.left = btnCoords.left - len + 'px';
            }
        }

        console.log("div" + div.clientWidth + " : " + "btn" + btn.clientWidth);


        if (btnCoords.top >= div.clientHeight + 5) {
            div.style.top = (btnCoords.top - div.clientHeight - 5) + 'px';
        } else {
            div.style.top = (btnCoords.bottom + 5) + 'px';
        }

    }

});

document.addEventListener('mouseout', function (event) {
    let btn = event.target;

    if (btn.dataset.tooltip) {
        let div = this.getElementsByClassName('tooltip');
        div[0].remove();
    }

});

function jump() {
    window.location.href = "https://plnkr.co/edit/KgxCsNN9LgRvyrXj?p=preview&preview";
}