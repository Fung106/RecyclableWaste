let table = document.getElementById('bagua-table');

/* your code */
let canEdit = true;
let oldValue = '';

table.addEventListener("click", function clickFunc(event) {

    let td = event.target.closest('td');

    if (!td) return; // (2)
    if (!table.contains(td)) return;

    if (canEdit) {
        editStart();
        canEdit = false;
    }

    edit();

    function editStart() {
        let textarea = document.createElement('textarea');
        let div = document.createElement('div');
        let sureButton = document.createElement('button');
        let cancelButton = document.createElement('button');
        oldValue = td.innerHTML;

        addClass();
        setTextarea();
        textarea.focus();
        setButton();

        function addClass() {
            td.classList.add('edit_td');
            textarea.classList.add('edit_area');
            div.classList.add('div_control');
            sureButton.classList.add('okButton');
            cancelButton.classList.add('cancelButton');
        }

        function setTextarea() {
            textarea.value = oldValue;
            td.innerHTML = '';
            textarea.style.width = td.offsetWidth + 'px';
            textarea.style.height = td.offsetHeight + 'px';
            td.append(textarea);
        }

        function setButton() {
            sureButton.innerText = 'OK';
            cancelButton.innerText = 'CANCEL';
            div.append(sureButton);
            div.append(cancelButton);
            textarea.after(div);
        }
    }

    function edit() {
        let textarea = td.firstChild;
        let div = textarea.nextSibling;

        function finishEdit(data) {
            td.innerHTML = data;
            textarea.remove();
            div.remove();
            td.classList.remove('edit_td');
            return true;
        }

        if (event.target.classList.contains('okButton')) {
            canEdit = finishEdit(textarea.value);
        }

        if (event.target.classList.contains('cancelButton')) {
            canEdit = finishEdit(oldValue);
        }
    }

});