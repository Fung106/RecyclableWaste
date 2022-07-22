// Your code
/* 
心得：
    1.事件流：mousedown → mousemove → mouseup（不要忘记取消原生 ondragstart）。
      其中要把mousemove和mouseup放在mousedown内，因为我们要实现拖拽，触发点肯定是先摁住鼠标左键，然后拖动鼠标最后松开左键。到最后要把监听mousemove和mouseup的监听器移除。

    2.此需求要在处于小窗口的时候不能进行水平滚动，经过查询文档发现scroll事件无法被阻止，我发现当摁住鼠标左键进行移动的时候，就会触发滚动事件，那么就换个思路，为什么会导致滚动，
      还不是因为鼠标移动到了窗口之外，但是还处于文档之内，浏览器默认我们需要到鼠标所处的位置，所以就会滚动，既然无法阻止滚动，那就在当我鼠标飞出窗口左右边缘外的时候，阻止鼠标移动事件，
      看似鼠标被我移动了，但是其实浏览器并不承认它移动了。因此达到了阻止滚动。

    3.给对应元素定位时，必须使用getBoundingClientRect()，不可以使用鼠标的坐标，因为鼠标的坐标数据不定，导致位置不稳定。拖拽移动时，坐标就可以使用mousemove事件的坐标，因为元素需要
      移动，getBoundingClientRect()得出的坐标是移动后的坐标（用脑子想下就懂了），移动时，使用“fixed”定位，它相对窗口，最后落实位置再使用“absolute”定位，它相对文档，因为最后元素的位置
      肯定是再文档的某个位置而不是窗口。（要拖动元素，我们可以使用 position:fixed，它使坐标更易于管理。最后，我们应该将其切换回 position:absolute，以使元素放置到文档中。证实我想的没错。）

    4.mousedown需要持续被监听，假设移除他的监听器，则无法再次启动该事件。
*/
function onMouseDown(mouseDownEvent) {
    let target = mouseDownEvent.target;

    if (!target.classList.contains('draggable')) {
        return;
    }

    let shiftX = mouseDownEvent.clientX - target.getBoundingClientRect().left;
    let shiftY = mouseDownEvent.clientY - target.getBoundingClientRect().top;

    target.style.left = target.getBoundingClientRect().left + 'px';
    target.style.top = target.getBoundingClientRect().top + 'px';
    target.style.position = 'fixed';

    function onMouseMove(mouseMoveEvent) {

        let windowClientHeight = document.documentElement.clientHeight;
        let windowClientWidth = document.documentElement.clientWidth;

        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        target.style.left = mouseMoveEvent.clientX - shiftX + 'px';
        target.style.top = mouseMoveEvent.clientY - shiftY + 'px';
        target.style.position = 'fixed';

        if (target.getBoundingClientRect().top + target.offsetHeight >= windowClientHeight) {
            target.style.left = target.getBoundingClientRect().left + 'px';
            target.style.top = windowClientHeight - target.offsetHeight + 'px';
            target.style.position = 'fixed';

            if (document.documentElement.scrollTop + windowClientHeight <= scrollHeight) {
                document.documentElement.scrollTop += 10;
            }
            mouseMoveEvent.preventDefault();
        }

        if (target.getBoundingClientRect().top <= 0) {
            target.style.left = target.getBoundingClientRect().left + 'px';
            target.style.top = 0 + 'px';
            target.style.position = 'fixed';

            if (document.documentElement.scrollTop !== 0) {
                document.documentElement.scrollTop -= 10;
            }
            mouseMoveEvent.preventDefault();
        }

        if (target.getBoundingClientRect().left + target.offsetWidth >= windowClientWidth) {
            target.style.left = windowClientWidth - target.offsetWidth + 'px';
            target.style.top = target.getBoundingClientRect().top + 'px';
            target.style.position = 'fixed';

            mouseMoveEvent.preventDefault();
        }

        if (target.getBoundingClientRect().left <= 0) {
            target.style.left = 0 + 'px';
            target.style.top = target.getBoundingClientRect().top + 'px';
            target.style.position = 'fixed';

            mouseMoveEvent.preventDefault();
        }

    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function onMouseUp(mouseUpEvent) {
        let upTarget = mouseUpEvent.target;

        if (!upTarget.classList.contains('draggable')) {
            return;
        }

        if (upTarget.style.position === 'fixed') {
            upTarget.style.left = upTarget.getBoundingClientRect().left + window.pageXOffset + 'px';
            upTarget.style.top = upTarget.getBoundingClientRect().top + window.pageYOffset + 'px';
            upTarget.style.position = 'absolute';
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    });

}

document.addEventListener('mousedown', onMouseDown);

document.ondragstart = function () {
    return false;
}