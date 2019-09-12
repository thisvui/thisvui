import * as components from "..";
import { ThisValidate } from "../TValidation/validation-bus";
import { TIconLib } from "../TIcon/TIconLib";
import ClickOutside from "../../directives/click-outside";
import ThisvuiConfig from "./config";
import notification from "../../mixins/notification";

const ThisVui = {
  install(Vue, options = {}) {
    let config = new ThisvuiConfig(options);
    const optionsConfig = config.getOptions();
    Vue.prototype.$thisvui = new Vue({
      mixins: [notification],
      data: optionsConfig
    });

    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });
    Vue.use(ThisValidate);
    Vue.use(TIconLib);
    Vue.directive("click-outside", ClickOutside);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ThisVui);
}

export default ThisVui;
