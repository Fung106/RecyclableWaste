'use strict';

// Here's a brief sketch of the class
// with things that you'll need anyway
/* 编写一个函数，该函数仅在访问者将鼠标 移至 元素而不是 移过 元素的情况下，在该元素上显示工具提示。

换句话说，如果访问者将鼠标移至元素上，并停下来 —— 显示工具提示。如果他们只是将鼠标移过元素，那就没必要显示，谁想要多余的闪烁呢？

从技术上说，我们可以测量元素上的鼠标移动速度，如果速度很慢，那么我们就假定它 在元素上，并显示工具提示，如果速度很快 —— 那么我们就忽略它。

如果你将鼠标快速地从“时钟”上移动过去，那么什么都不会发生，如果你使用鼠标在“时钟”上慢慢移动，或者停在“时钟”上，则会出现一个工具提示。

请注意：当鼠标指针在“时钟”的元素之间移动时，工具提示不会“闪烁” */

let currentElem = null;
let timer = null;
let startX = null;
let startY = null;
let endX = null;
let endY = null;
let startClock = null;

class HoverIntent {

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);
    elem.addEventListener("mousemove", this.onMouseMove);

    // continue from this point

  }

  onMouseOver(event) {
    /* ... */
    let obj = this;
    currentElem = event.target.closest('.clock');
    let relatedTarget = event.relatedTarget;

    if (relatedTarget) {
      if (relatedTarget.closest('.clock') === currentElem) {
        return;
      }
    }

    startX = event.clientX;
    startY = event.clientY;

    timer = setTimeout(function tick() {
      let Y = endY - startY;
      let X = endX - startX;
      let _distance = Math.sqrt(Y * Y + X * X);

      //重置起点
      startX = endX;
      startY = endY;

      if (_distance < obj.interval * obj.sensitivity) {//速度对比
        obj.over();
      } else {
        clearTimeout(timer);
        timer = setTimeout(tick, obj.interval);//每100ms比较一次
      }

    }, obj.interval);

  }

  onMouseOut(event) {
    /* ... */
    let relatedTarget = event.relatedTarget;

    if (relatedTarget) {
      if (relatedTarget.closest('.clock') === currentElem) {
        return;
      }
    }


    this.out();
    clearTimeout(timer);
  }

  onMouseMove(event) {
    /* ... */
    //获取终点
    endX = event.clientX;
    endY = event.clientY;
  }


  destroy() {
    /* your code to "disable" the functionality, remove all handlers */
    /* it's needed for the tests to work */
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
    elem.removeEventListener("mousemove", this.onMouseMove);
  }

}