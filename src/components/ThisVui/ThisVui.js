import * as components from "..";
import { ThisValidate } from "../TValidation/validation-bus";
import { TIconLib } from "../TIcon/TIconLib";
import ClickOutside from "../../directives/click-outside";
import ThisvuiConfig from "./config";

const ThisVui = {
  install(Vue, options = {}) {
    let config = new ThisvuiConfig(options);
    const optionsConfig = config.getOptions();
    Vue.prototype.$thisvui = new Vue({
      data: optionsConfig
    });

    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });
    Vue.use(ThisValidate);
    Vue.use(TIconLib);
    Vue.directive("t-click-outside", ClickOutside);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ThisVui);
}

export default ThisVui;
