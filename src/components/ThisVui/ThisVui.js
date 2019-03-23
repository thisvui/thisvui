import * as components from "..";
import { ThisValidate } from "../ThisValidation/validation-bus";
import { ThisIconLib } from "../ThisIcon/icon-lib";
import ClickOutside from "../../directives/click-outside";
import ThisvuiConfig from "./config";

const ThisVui = {
  install(Vue, options = {}) {
    let config = new ThisvuiConfig(options);
    const optionsConfig = config.getOptions();
    Vue.prototype.$thisvui = new Vue({
      data: {
        iconLib: optionsConfig.iconLib,
        icons: optionsConfig.icons
      }
    });

    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });
    Vue.use(ThisValidate);
    Vue.use(ThisIconLib);
    Vue.directive("this-click-outside", ClickOutside);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ThisVui);
}

export default ThisVui;
