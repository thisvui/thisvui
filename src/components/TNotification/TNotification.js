import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import display from "../../mixins/display";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-notification",
  mixins: [common, display, colors, helper],
  props: {
    targetClass: {
      type: String
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    deleteClass: {
      type: String
    },
    timeout: {
      type: Boolean,
      default: false
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
      const cssArchitect = new CssArchitect("notification");
      this.colorize(cssArchitect, "bg-color", true);
      this.colorize(cssArchitect, "border-color");
      this.colorize(cssArchitect, "shadow");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getDisplayModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.targetClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getDeleteClasses: function() {
      const cssArchitect = new CssArchitect("delete");
      cssArchitect.addClass(this.deleteClass, this.deleteClass);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      removed: false,
      timer: null
    };
  },
  methods: {
    /**
     * Removes the notification element from the DOM
     */
    removeElement() {
      this.removed = true;
      clearTimeout(this.timer);
      this.$emit(this.$thisvui.events.notification.close);
    },
    createDeleteButton(architect) {
      if (this.showDeleteButton) {
        let deleteBtn = architect.createElement(
          "button",
          this.getDeleteClasses
        );
        deleteBtn.addClick(this.removeElement);
        architect.addChild(deleteBtn);
      }
    },
    createBody(architect) {
      if (!this.removed) {
        let body = architect.createElement("article", this.getClasses);
        body.setId(this.id);
        body.setKey(`${this.id}-notification-body`);
        this.createDeleteButton(body);
        body.addChildren(this.$slots.default);
        architect.addChild(body);
      }
    }
  },
  render: function(h) {
    if (!this.removed) {
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
