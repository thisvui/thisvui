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

function calculatePos($box, $containerDimension, scrollTop, binding) {
  let { width, height } = getAttributes($box);
  let startPos = $containerDimension.left + "px";

  let topElPos =
    scrollTop + $containerDimension.top + $containerDimension.height;
  let topPos = topElPos + "px";

  if (height) {
    let totalHeight = parseFloat(topElPos) + parseFloat(height);
    if (totalHeight > getDocHeight()) {
      let diffHeight = parseFloat(height) - 15;
      topPos = scrollTop + $containerDimension.top - diffHeight + "px";
    }
  }

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

function enterListener(el, binding) {
  let { showOn, target } = getAttributes(el);
  let $container = document.getElementById(target);
  let $box = el;
  let $containerDimension = $container.getBoundingClientRect();
  let scrollTop =
    window.pageYOffset || el.scrollTop || getContainer().scrollTop;

  let { yPos, xPos, inverted, translate } = calculatePos(
    $box,
    $containerDimension,
    scrollTop,
    binding
  );
  $box.style.top = yPos;
  $box.style.left = inverted ? "unset" : xPos;
  $box.style.right = inverted ? xPos : "unset";

  if (showOn) {
    toggleDisplay($box, "block");
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
  let target = el.getAttribute("box-target");
  let width = el.getAttribute("box-width");
  let height = el.getAttribute("box-height");
  return { showOn, target, width, height };
}

function setAttributes(el, args) {
  let { showOn, target, width, height } = args;
  el.setAttribute("show-box", showOn);
  if (showOn) {
    el.setAttribute("box-target", showOn);
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
    let { target, showOn = true, width, height } = binding.value;
    setAttributes(el, { showOn, target, width, height });

    let $box = el;
    toggleDisplay($box, "none");
    addCallbacks(el, binding);
  },
  componentUpdated: function(el, binding) {
    let { showOn = true, target, width, height } = binding.value;
    let skip = compareBinding(binding);
    // let $div = document.createElement("div");
    // $div.style.top = "0";
    // $div.style.left = "0";
    // $div.style.width = "100%";
    // $div.style.position = "absolute";
    if (!skip) {
      setAttributes(el, { showOn, target, width, height });
      if (showOn) {
        if (el.parentNode && "BODY" != el.parentNode.tagName) {
          el.parentNode.removeChild(el);
          // $div.appendChild(el);
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
