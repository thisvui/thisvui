import * as components from "..";
import * as directives from "../../directives";
import { ThisValidate } from "../TValidation/validation-bus";
import { TIconLib } from "../TIcon/TIconLib";
import utils from "../../utils/utils";

import notification from "../../mixins/notification";

import ThisvuiConfig from "./config";

const ThisVui = {
  install(Vue, options = {}) {
    let config = new ThisvuiConfig(options);
    const optionsConfig = config.getOptions();
    Vue.prototype.$thisvui = new Vue({
      mixins: [notification],
      data: optionsConfig
    });

    Vue.prototype.$_utils = utils;

    Object.values(components).forEach(component => {
      Vue.component(component.name, component);
    });

    Object.values(directives).forEach(directive => {
      Vue.directive(directive.name, directive);
    });

    Vue.use(ThisValidate);
    Vue.use(TIconLib);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(ThisVui);
}

export default ThisVui;
