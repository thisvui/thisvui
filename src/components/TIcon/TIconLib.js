/**
 * Adds iconLib prop to elements that support it
 * @returns { A virtual DOM node }
 */
import { ComponentNames } from "../../utils/constants";

const addIconLib = function(props, children) {
  let iconLib = props.iconLib;
  let overrideDefaults = props.overrideDefaults;
  children.map(vnode => {
    const options = vnode.componentOptions;
    let hasChildren = vnode.children;
    if (
      options && // It's a component that has options
      options.propsData // with prop data
    ) {
      hasChildren = vnode.componentOptions.children;
      if (options.propsData.iconLib === undefined) {
        vnode.componentOptions.propsData.iconLib = iconLib;
      }
      if (options.propsData.overrideDefaults === undefined) {
        vnode.componentOptions.propsData.overrideDefaults = overrideDefaults;
      }
    }
    if (hasChildren) {
      return addIconLib(props, hasChildren);
    }
    return vnode;
  });
};

export const TIconLib = {
  install(Vue, options) {
    Vue.component(ComponentNames.TIconLib, {
      functional: true,
      render: function(createElement, context) {
        addIconLib(context.props, context.children);
        // Transparently pass any attributes, event listeners, children, etc.
        return createElement("div", context.data, context.children);
      }
    });
  }
};
