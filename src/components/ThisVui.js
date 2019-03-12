import * as components from "../components";
import { ThisValidate } from "../components/ThisValidation/validation-bus";

const ThisVui = {
  install(Vue, options = {}) {
    // for (let [key, value] of Object.values(components)) {
    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });
    Vue.use(ThisValidate);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ThisVui);
}

export default ThisVui;
