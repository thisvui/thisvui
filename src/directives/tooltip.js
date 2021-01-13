import { gen, overlay } from "../utils/utils";

function enterListener(arg1) {
  let { el, $tooltip, binding } = arg1;
  let { text, cssClass, showOn } = getAttributes(el);

  $tooltip.setAttribute("class", `tooltip filled ${cssClass}`);
  $tooltip.innerHTML = text;
  document.body.appendChild($tooltip);
  $tooltip = overlay.calculateCoords($tooltip, el, binding.value);

  if (showOn) {
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
      $tooltip.style.top = "unset";
      $tooltip.style.right = "unset";
      $tooltip.style.bottom = "unset";
      $tooltip.style.left = "unset";
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
    let id = `${gen.id()}-Tooltip`;
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
    let id = el.getAttribute("tooltip");
    leaveListener(id);
  }
};
