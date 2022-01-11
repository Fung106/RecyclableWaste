thumbs.addEventListener('click', function (event) {
    let href = event.target.closest('a').href;
    //title一开始漏写了
    let title = event.target.closest('a').title;
    largeImg.src = href;
    largeImg.alt = title;
    event.preventDefault();
});