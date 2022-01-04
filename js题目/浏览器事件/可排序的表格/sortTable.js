"use strict"

grid.addEventListener('click', function (event) {
    function getArrayTr() {
        let tbody = document.getElementsByTagName('tbody');
        let tr = tbody[0].getElementsByTagName('tr');
        tr = Array.from(tr);
        return tr;
    }

    let type = event.target.dataset.type;
    let tbody = document.getElementsByTagName('tbody');
    let trArray = getArrayTr();
    if (type === "number") {
        trArray.sort(function (a, b) {
            let tdA = a.getElementsByTagName('td');
            let tdB = b.getElementsByTagName('td');
            return +tdA[0].firstChild.textContent - +tdB[0].firstChild.textContent
        });

        //tbody[0].append(...trArray);
        for (let i = 0; i < trArray.length; i++) {
            tbody[0].append(trArray[i]);
        }
    }

    if (type === "string") {
        trArray.sort(function (a, b) {
            let tdA = a.getElementsByTagName('td');
            let tdB = b.getElementsByTagName('td');
            return tdA[1].firstChild.textContent.localeCompare(tdB[1].firstChild.textContent);
        });

        //tbody[0].append(...trArray);
        for (let i = 0; i < trArray.length; i++) {
            tbody[0].append(trArray[i]);
        }
    }
})