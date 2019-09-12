let handleOutsideClick;

export default {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;
      if (exclude) {
        exclude.forEach(refName => {
          // We only run this code if there are exclude elements
          if (!clickedOnExcludedEl) {
            // Get the element using the reference name
            const excludedEl = vnode.context.$refs[refName];

            let parent = e.target.parentElement;
            let isParent =
              parent && excludedEl && excludedEl.$el.id === parent.id;
            let containsEl = excludedEl && excludedEl.$el.contains(e.target);
            // Check if this excluded element
            // is the same element the user just clicked on
            clickedOnExcludedEl = isParent || containsEl;
          }
        });
      }

      let targetEl = e.target;
      let targetElParent = e.target.parentElement;
      let containsElement = el.contains(targetEl);
      let containsParentId =
        targetElParent.id && el.querySelector(`#${targetElParent.id}`) != null;
      let containsParent =
        targetElParent && (el.contains(targetElParent) || containsParentId);
      let contains = containsElement || containsParent;
      if (!contains && !clickedOnExcludedEl) {
        // Calls the handler to executed when clicked outside
        vnode.context[handler](e);
      }
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },
  unbind() {
    // Unbind click/touchstart listeners from the whole page
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
};
