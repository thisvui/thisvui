import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import display from "../../mixins/display";
import themes from "../../mixins/themes";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TNotification,
  mixins: [common, display, themes, helper],
  props: {
    targetClass: {
      type: String
    },
    closeButton: {
      type: Boolean
    },
    closeButtonClass: {
      type: String
    },
    compact: {
      type: Boolean
    },
    timeout: {
      type: Boolean
    },
    transition: {
      type: String,
      default: "fade"
    },
    delay: {
      type: Number,
      default: 5000
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.TNotification);
      this.isFilled(css);
      css.addClass("compact", this.compact);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getDisplayModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.targetClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getCloseButtonClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TNotification}__close t-delete`);
      css.addClass(this.closeButtonClass, this.closeButtonClass);
      return css.getClasses();
    }
  },
  data() {
    return {
      closed: false,
      timer: null
    };
  },
  methods: {
    /**
     * Removes the notification element from the DOM
     */
    removeElement() {
      this.closed = true;
      clearTimeout(this.timer);
      this.$emit(this.$thisvui.events.notification.close);
    },
    createCloseButton(architect) {
      if (this.closeButton) {
        let deleteBtn = architect.createA(this.getCloseButtonClasses);
        deleteBtn.addClick(this.removeElement);
        architect.addChild(deleteBtn);
      }
    },
    createBody(architect) {
      if (!this.closed) {
        let body = architect.createElement("div", this.getClasses);
        body.setId(this.id);
        body.setKey(`${this.id}-notification-body`);
        this.createCloseButton(body);
        body.addVNodeChildren(this.$slots.default);
        architect.addChild(body);
      }
    }
  },
  render: function(h) {
    if (!this.closed) {
      let root = new ElementArchitect(h, "transition", this.getClasses);
      root.setId(this.id);
      root.setProps({ name: this.transition, tag: "span", mode: "out-in" });
      root.setKey(`${this.id}-notification`);
      this.createBody(root);
      return root.create();
    }
  },
  mounted() {
    if (this.timeout) {
      this.timer = setTimeout(
        function() {
          this.removeElement();
        }.bind(this),
        this.delay
      );
    }
  }
};
