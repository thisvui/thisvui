function handleOutsideClick(event, el, binding, vnode) {
  event.stopPropagation();
  const { handler, exclude } = binding.value;
  let clickedOnExcludedEl = false;
  if (exclude) {
    exclude.forEach(refName => {
      // We only run this code if there are exclude elements
      if (!clickedOnExcludedEl) {
        // Get the element using the reference name
        const excludedEl = vnode.context.$refs[refName];

        let parent = event.target.parentElement;
        let isParent = parent && excludedEl && excludedEl.$el.id === parent.id;
        let containsEl = excludedEl && excludedEl.$el.contains(event.target);
        // Check if this excluded element
        // is the same element the user just clicked on
        clickedOnExcludedEl = isParent || containsEl;
      }
    });
  }

  let targetEl = event.target;
  let targetElParent = event.target.parentElement;
  let containsElement = el.contains(targetEl);
  let containsParentId =
    targetElParent.id && el.querySelector(`#${targetElParent.id}`) != null;
  let containsParent =
    targetElParent && (el.contains(targetElParent) || containsParentId);
  let contains = containsElement || containsParent;
  if (!contains && !clickedOnExcludedEl) {
    // Calls the handler to executed when clicked outside
    vnode.context[handler](event);
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
