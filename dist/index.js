(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Draganddrop = factory());
}(this, (function () { 'use strict';

  function create(element, options) {
    if (!element) {
      throw new Error("Element should not be null or undefined");
    }
    if (!options) {
      options = {};
    }
    for (const child of element.children) {
      child.setAttribute("draggable", "true");

      if (options.onDragStart && isFunction(options.onDragStart)) {
        child.addEventListener("dragstart", event => {
          const dragStartEvent = new DragStartEvent(event);
          options.onDragStart(dragStartEvent);
          if (dragStartEvent.data) {
            this.data = dragStartEvent.data;
          }
          if (dragStartEvent.dragLayout) {
            dragStartEvent.dragLayout.style.top = "-1000px";
            dragStartEvent.dragLayout.style.left = "-1000px";
            dragStartEvent.dragLayout.style.position = "absolute";
            document.body.append(dragStartEvent.dragLayout);
            this.dragLayout = dragStartEvent.dragLayout;

            let offsetX = 0;
            let offsetY = 0;

            switch (dragStartEvent.dragPosition) {
              case "middle":
                offsetX = dragStartEvent.dragLayout.offsetWidth / 2;
                offsetY = dragStartEvent.dragLayout.offsetHeight / 2;
                break;
              case "topmiddle":
                offsetX = dragStartEvent.dragLayout.offsetWidth / 2;
                break;
              case "topright":
                offsetX = dragStartEvent.dragLayout.offsetWidth;
                break;
              case "middleleft":
                offsetY = dragStartEvent.dragLayout.offsetHeight / 2;
                break;
              case "middleright":
                offsetY = dragStartEvent.dragLayout.offsetHeight / 2;
                offsetX = dragStartEvent.dragLayout.offsetWidth;
                break;
              case "bottomleft":
                offsetY = dragStartEvent.dragLayout.offsetHeight;
                break;
              case "bottommiddle":
                offsetY = dragStartEvent.dragLayout.offsetHeight;
                offsetX = dragStartEvent.dragLayout.offsetWidth / 2;
                break;
              case "bottomright":
                offsetY = dragStartEvent.dragLayout.offsetHeight;
                offsetX = dragStartEvent.dragLayout.offsetWidth;
                break;
            }

            event.dataTransfer.setDragImage(
              dragStartEvent.dragLayout,
              offsetX,
              offsetY
            );
          }
        });
      }

      child.addEventListener("dragend", event => {
        if (options.onDragEnd && isFunction(options.onDragEnd)) {
          const dragEndEvent = new DragEndEvent(event);
          if (this.data) {
            dragEndEvent.data = this.data;
          }
          options.onDragEnd(dragEndEvent);
        }
        if (this.dragLayout) {
          this.dragLayout.remove();
        }
      });

      child.addEventListener("dragover", event => {
        event.preventDefault();
        event.stopPropagation();
      });

      child.addEventListener("drop", event => {
        if (options.onDrop && isFunction(options.onDrop)) {
          options.onDrop(event);
        }
      });
    }
  }

  class DragStartEvent {
    constructor(event) {
      this.nativeEvent = event;
      this.dragLayout = null;
      this.data = null;
    }
  }

  class DragEndEvent {
    constructor(event) {
      this.nativeEvent = event;
      this.data = null;
    }
  }

  function isFunction(functionToCheck) {
    return (
      functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  var index = {
    create
  };

  return index;

})));
//# sourceMappingURL=index.js.map
