"use strict"

container.addEventListener('click', function (event) {
    console.log(event.target);
    let btn = event.target;
    let hidden = btn.dataset.hidden;
    if (hidden !== undefined) {
        let div = btn.closest('div');
        if (div.classList.contains('pane')) {
            div.remove();
        }
    }
});