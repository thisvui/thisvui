import utils from "../utils/utils";

let fixPx = 30;

function calculatePos($tooltip, $tooltipDimension, scrollTop, binding) {
  let {
    top = false,
    right = false,
    bottom = false,
    left = false,
    center = false,
    offsetX = 0
  } = binding.value;

  let startPos = $tooltipDimension.left + offsetX + "px";
  let endPos = window.innerWidth - $tooltipDimension.right - offsetX + "px";
  let topPos = scrollTop + $tooltipDimension.top - fixPx + "px";
  let bottomPos =
    scrollTop + $tooltipDimension.top + $tooltipDimension.height + "px";
  let middlePos =
    scrollTop + $tooltipDimension.top + $tooltipDimension.height / 4 + "px";
  let leftPos = endPos + $tooltipDimension.width - offsetX + "px";
  let rightPos =
    $tooltipDimension.left + $tooltipDimension.width + offsetX + "px";
  let centerPos = $tooltipDimension.left + $tooltipDimension.width / 2 + "px";

  let yPos = topPos;
  let xPos = centerPos;
  let inverted = false;
  let translate = false;

  if (top && left) {
    yPos = topPos;
    xPos = startPos;
    return { yPos, xPos };
  }

  if (bottom && left) {
    yPos = bottomPos;
    xPos = startPos;
    return { yPos, xPos };
  }

  if (!top && !bottom & left) {
    yPos = middlePos;
    xPos = leftPos;
    inverted = true;
    return { yPos, xPos, inverted };
  }

  if (top && right) {
    yPos = topPos;
    xPos = endPos;
    inverted = true;
    return { yPos, xPos, inverted };
  }

  if (bottom && right) {
    yPos = bottomPos;
    xPos = endPos;
    inverted = true;
    return { yPos, xPos, inverted };
  }

  if (!top && !bottom & right) {
    yPos = middlePos;
    xPos = rightPos;
    return { yPos, xPos };
  }

  if (top && center) {
    yPos = topPos;
    xPos = centerPos;
    translate = true;
    return { yPos, xPos, translate };
  }

  if (bottom && center) {
    yPos = bottomPos;
    xPos = centerPos;
    translate = true;
    return { yPos, xPos, translate };
  }

  if (top) {
    translate = true;
    return { yPos, xPos, translate };
  }

  if (bottom) {
    yPos = bottomPos;
    translate = true;
    return { yPos, xPos, translate };
  }
  translate = true;
  return { yPos, xPos, translate };
}

function enterListener(arg1) {
  let { el, $tooltip, binding } = arg1;
  let { text, cssClass, showOn } = getAttributes(el);

  let $tooltipDimension = el.getBoundingClientRect();
  let scrollTop = window.pageYOffset || el.scrollTop || document.body.scrollTop;

  let { yPos, xPos, inverted, translate } = calculatePos(
    $tooltip,
    $tooltipDimension,
    scrollTop,
    binding
  );
  $tooltip.style.top = yPos;
  $tooltip.style.left = inverted ? "unset" : xPos;
  $tooltip.style.right = inverted ? xPos : "unset";

  if (translate) {
    $tooltip.style.transform = "translateX(-50%)";
  }

  $tooltip.setAttribute("class", `tooltip filled ${cssClass}`);
  $tooltip.innerHTML = text;
  if (showOn) {
    document.body.appendChild($tooltip);
    setTimeout(function() {
      $tooltip.style.opacity = "1";
    }, 200);
  }
}

function leaveListener(arg1) {
  let id = arg1;
  let $tooltip = document.getElementById(id);
  if ($tooltip) {
    $tooltip.style.opacity = "0";
    setTimeout(function() {
      $tooltip.parentNode.removeChild($tooltip);
    }, 200);
  }
}

function addCallbacks(el, event, params) {
  let id = el.getAttribute("tooltip");
  el.enterCallback = () => {
    enterListener(params);
  };
  el.leaveCallback = () => {
    leaveListener(id);
  };
  el.addEventListener(event, el.enterCallback);
  el.addEventListener("mouseleave", el.leaveCallback);
}

function getAttributes(el) {
  let id = el.getAttribute("tooltip");
  let text = el.getAttribute("tooltip-text");
  let cssClass = el.getAttribute("tooltip-class");
  let showOn = el.getAttribute("show-tooltip") == "true";
  return { id, text, cssClass, showOn };
}

function setAttributes(el, args) {
  let { text, cssClass, showOn } = args;
  el.setAttribute("tooltip-text", text);
  el.setAttribute("tooltip-class", cssClass);
  el.setAttribute("show-tooltip", showOn);
}

export default {
  name: "tooltip",
  bind: function(el, binding) {
    let {
      text,
      event = "mouseenter",
      cssClass = "is-dark",
      showOn = true
    } = binding.value;
    let id = `${utils.gen.id()}-Tooltip`;
    el.setAttribute("tooltip", id);
    setAttributes(el, { text, cssClass, showOn });

    let $tooltip = document.createElement("div");
    $tooltip.setAttribute("class", `tooltip filled ${cssClass}`);
    $tooltip.setAttribute("id", id);
    $tooltip.innerHTML = text;

    let params = { el, $tooltip, showOn, binding };
    addCallbacks(el, event, params);
  },
  componentUpdated: function(el, binding) {
    let id = el.getAttribute("tooltip");
    let { text, cssClass = "is-dark", showOn = true } = binding.value;
    setAttributes(el, { text, cssClass, showOn });
    if (!showOn) {
      leaveListener(id);
    }
  },
  unbind: function(el, binding) {
    let { event = "mouseenter" } = binding.value;
    el.removeEventListener(event, el.enterCallback);
    el.removeEventListener("mouseleave", el.leaveCallback);
  }
};
