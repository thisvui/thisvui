import * as components from "..";
import * as directives from "../../directives";
import { ThisValidate, ValidationBus } from "../TValidation/validation-bus";
import { NotificationBus } from "../TNotification/notification-bus";
import { TIconLib } from "../TIcon/TIconLib";
import utils from "../../utils/utils";

import notification from "../../mixins/notification";

import ThisVuiConfig from "./config";

const ThisVui = {
  install(Vue, options = {}) {
    let config = new ThisVuiConfig(options);
    const optionsConfig = config.getOptions();
    Vue.prototype.$thisvui = new Vue({
      mixins: [notification],
      data: optionsConfig
    });

    Vue.prototype.$_utils = utils;
    Vue.prototype.$validation = ValidationBus;
    Vue.prototype.$notification = NotificationBus;

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
