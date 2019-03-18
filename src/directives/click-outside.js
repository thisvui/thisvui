export default {
  bind: function(el, binding, vNode) {
    if (typeof binding.value !== "function") {
      const componentName = vNode.context.name;
      let warn = `Provided argument '${
        binding.expression
      }' is not a function, but has to be`;
      if (componentName) {
        warn += `Found in component '${componentName}'`;
      }
      console.warn(warn);
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__thisClickOutside__ = handler;

    // add Event Listeners
    document.addEventListener("click", handler);
  },

  unbind: function(el, binding) {
    // Remove Event Listeners
    document.removeEventListener("click", el.__thisClickOutside__);
    el.__thisClickOutside__ = null;
  }
};
