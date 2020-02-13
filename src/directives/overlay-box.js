function calculatePos($box, $containerDimension, scrollTop, binding) {
  let { width } = getAttributes($box);
  let startPos = $containerDimension.left + "px";

  let topPos =
    scrollTop + $containerDimension.top + $containerDimension.height + "px";

  if (width) {
    let leftOffset = 0;
    if ($containerDimension.width > width) {
      leftOffset = ($containerDimension.width - width) / 2;
      startPos = $containerDimension.left + leftOffset  + "px";
    }
    if (width > $containerDimension.width) {
      leftOffset = (width - $containerDimension.width) / 2;
      startPos = $containerDimension.left - leftOffset  + "px";
    }
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
  let scrollTop = window.pageYOffset || el.scrollTop || document.body.scrollTop;

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
  return { showOn, target, width };
}

function setAttributes(el, args) {
  let { showOn, target, width } = args;
  el.setAttribute("show-box", showOn);
  el.setAttribute("box-target", target);
  el.setAttribute("box-width", width);
}

function compareBinding(binding) {
  return binding.value.showOn == binding.oldValue.showOn;
}

export default {
  name: "overlay-box",
  bind: function(el, binding) {
    let { target, showOn = true, width } = binding.value;
    setAttributes(el, { showOn, target, width });

    let $box = el;
    toggleDisplay($box, "none");
    addCallbacks(el, binding);
  },
  componentUpdated: function(el, binding) {
    let { showOn = true, target, width } = binding.value;
    let skip = compareBinding(binding);
    if (!skip) {
      setAttributes(el, { showOn, target, width });
      if (showOn) {
        if (el.parentNode && "BODY" != el.parentNode.tagName) {
          el.parentNode.removeChild(el);
          document.body.appendChild(el);
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
