import utils from "../../src/utils/utils";

function getContainer() {
  return document.body;
}

function getDocHeight() {
  let body = document.body,
    html = document.documentElement;

  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return height;
}

function calculatePos($box, scrollTop, binding) {
  let { width } = getAttributes($box);
  let $containerDimension = getContainerDimension($box);
  let startPos = $containerDimension.left + "px";

  let topElPos =
    scrollTop + $containerDimension.top + $containerDimension.height;
  let topPos = topElPos + "px";

  if (width) {
    let leftOffset = 0;
    if ($containerDimension.width > width) {
      leftOffset = ($containerDimension.width - width) / 2;
      startPos = $containerDimension.left + leftOffset + "px";
    }
    if (width > $containerDimension.width) {
      leftOffset = (width - $containerDimension.width) / 2;
      startPos = $containerDimension.left - leftOffset + "px";
    }
  } else {
    $box.style.width = $containerDimension.width + "px";
  }

  let yPos = topPos;
  let xPos = startPos;
  return { yPos, xPos };
}

function fixPos(el, scrollTop, docHeight) {
  toggleDisplay(el, "block");
  let { fixTranslate } = getAttributes(el);
  let elHeight = el.offsetHeight || el.scrollHeight || 0;
  let $containerDimension = getContainerDimension(el);
  let topElPos =
    scrollTop + $containerDimension.top + $containerDimension.height;
  let totalHeight = parseFloat(topElPos) + elHeight;

  if (totalHeight > docHeight) {
    let topPos = topElPos - (elHeight + $containerDimension.height + 5) + "px";
    el.style.top = topPos;
    if (fixTranslate) {
      el.classList.add("fix-translate");
    }
  } else {
    if (fixTranslate) {
      el.classList.remove("fix-translate");
    }
  }
}

function getContainerDimension(el) {
  let { target } = getAttributes(el);
  let $container = document.getElementById(target);
  let $containerDimension = $container.getBoundingClientRect();
  return $containerDimension;
}

function getScrollTop(el) {
  if (utils.check.existWindow()) {
    let scrollTop =
      window.pageYOffset || el.scrollTop || getContainer().scrollTop;
    return scrollTop;
  }
  return 0;
}

function enterListener(el, binding) {
  let { showOn } = getAttributes(el);
  let $box = el;

  let { yPos, xPos, inverted } = calculatePos(
    $box,
    getScrollTop(el),
    binding
  );
  $box.style.top = yPos;
  $box.style.left = inverted ? "unset" : xPos;
  $box.style.right = inverted ? xPos : "unset";

  let docHeight = getDocHeight();
  fixPos(el, getScrollTop(el), docHeight);

  if (showOn) {
    setTimeout(function() {
      $box.style.opacity = "1";
    }, 300);
  }
}

function leaveListener(el) {
  let $box = el;
  if ($box) {
    $box.style.opacity = "0";
    setTimeout(function() {
      toggleDisplay($box, "none");
    }, 300);
  }
}

function toggleDisplay(el, display) {
  el.style.display = display;
}

function addCallbacks(el, binding) {
  el.enterCallback = () => {
    enterListener(el, binding);
  };
  el.leaveCallback = () => {
    leaveListener(el);
  };
}

function getAttributes(el) {
  let showOn = el.getAttribute("show-box") == "true";
  let fixTranslate = el.getAttribute("fix-translate") == "true";
  let target = el.getAttribute("box-target");
  let width = el.getAttribute("box-width");
  let height = el.getAttribute("box-height");
  return { showOn, target, width, height, fixTranslate };
}

function setAttributes(el, args) {
  let { showOn, target, width, height, fixTranslate } = args;
  el.setAttribute("show-box", showOn);
  if (!el.id) {
    el.setAttribute("id", utils.gen.id());
  }
  if (fixTranslate) {
    el.setAttribute("fix-translate", fixTranslate);
  }
  if (target) {
    el.setAttribute("box-target", target);
  }
  if (width) {
    el.setAttribute("box-width", width);
  }
  if (height) {
    el.setAttribute("box-height", height);
  }
}

function compareBinding(binding) {
  return binding.value.showOn == binding.oldValue.showOn;
}

export default {
  name: "overlay-box",
  bind: function(el, binding) {
    let { target, showOn = true, width, height, fixTranslate } = binding.value;
    setAttributes(el, { showOn, target, width, height, fixTranslate });

    let $box = el;
    $box.style.opacity = 0;
    toggleDisplay($box, "none");
    addCallbacks(el, binding);
  },
  componentUpdated: function(el, binding) {
    let { showOn = true, target, width, height, fixTranslate } = binding.value;
    let skip = compareBinding(binding);
    if (!skip) {
      setAttributes(el, { showOn, target, width, height, fixTranslate });
      if (showOn) {
        if (el.parentNode && "BODY" != el.parentNode.tagName) {
          el.parentNode.removeChild(el);
          getContainer().appendChild(el);
        }
        enterListener(el, binding);
      } else {
        leaveListener(el);
      }
    }
  },
  unbind: function(el, binding) {
    leaveListener(el);
  }
};
