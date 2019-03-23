/**
 * Adds iconLib prop to elements that support it
 * @returns { A virtual DOM node }
 */
const addIconLib = function(iconLib, children) {
  children.map(vnode => {
    const options = vnode.componentOptions;
    if (
      options && // It's a component that has options
      options.propsData // with prop data
    ) {
      if (options.propsData.iconLib === undefined) {
        vnode.componentOptions.propsData.iconLib = iconLib;
      }
    }
    if (vnode.children) {
      return addIconLib(iconLib, vnode.children);
    }
    return vnode;
  });
};

export const ThisIconLib = {
  install(Vue, options) {
    Vue.component("ThisIconLib", {
      functional: true,
      render: function(createElement, context) {
        addIconLib(context.props.iconLib, context.children);
        // Transparently pass any attributes, event listeners, children, etc.
        return createElement("div", context.data, context.children);
      }
    });
  }
};
