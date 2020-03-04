/**
 * Check if this excluded element is the same or parent of the element the user just clicked on
 */
function checkIfParent(event, el) {
  let parent = event.target.parentElement;
  let exist = parent && el && el.id && parent.id;

  if (exist) {
    return el.id === parent.id;
  }
  return false;
}

/**
 * Check if target element is contained in source element
 */
function elContained(source, target) {
  if (source) {
    return source.contains(target);
  }
  return false;
}

function clickedOnExcludedEl(event, vnode, exclude) {
  let clickedOnExcludedEl = false;
  if (exclude) {
    exclude.forEach(refName => {
      // We only run this code if there are exclude elements
      if (!clickedOnExcludedEl) {
        // Get the element using the reference name
        let $excludedEl = vnode.context.$refs[refName];
        if ($excludedEl) {
          $excludedEl = $excludedEl.$el || $excludedEl;
        }

        clickedOnExcludedEl =
          checkIfParent(event, $excludedEl) ||
          elContained($excludedEl, event.target);
      }
    });
  }
  return clickedOnExcludedEl;
}

function handleOutsideClick(event, el, binding, vnode) {
  event.stopPropagation();
  const { handler, exclude } = binding.value;

  let $targetElParent = event.target.parentElement;
  let containsParentId =
    $targetElParent.id && el.querySelector(`#${$targetElParent.id}`) != null;
  let contains =
    elContained(el, event.target) ||
    elContained(el, $targetElParent) ||
    containsParentId;
  if (!contains && !clickedOnExcludedEl(event, vnode, exclude)) {
    // Calls the handler to executed when clicked outside
    if (vnode.context[handler]) {
      vnode.context[handler](event);
    } else {
      handler(event);
    }
  }
}

function addCallback(el, binding, vnode) {
  el.handleOutsideCallback = event => {
    handleOutsideClick(event, el, binding, vnode);
  };
}

export default {
  name: "click-outside",
  bind: function(el, binding, vnode) {
    addCallback(el, binding, vnode);
    // Register click/touchstart event listeners on the whole page
    document.addEventListener("click", el.handleOutsideCallback);
    document.addEventListener("touchstart", el.handleOutsideCallback);
  },
  unbind: function(el) {
    // Unbind click/touchstart listeners from the whole page
    document.removeEventListener("click", el.handleOutsideCallback);
    document.removeEventListener("touchstart", el.handleOutsideCallback);
  }
};
