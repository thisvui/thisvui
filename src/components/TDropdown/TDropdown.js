import alignment from "../../mixins/alignment";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TIcon from "../TIcon/TIcon";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-dropdown",
  components: { TIcon },
  mixins: [common, alignment, icons],
  props: {
    text: {
      type: String
    },
    icon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowDown;
      }
    },
    isUp: {
      type: Boolean,
      default: false
    },
    isHoverable: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDropdownActive: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("dropdown");
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass("is-up", this.isUp);
      cssArchitect.addClass("is-hoverable", this.isHoverable);
      cssArchitect.addClass(
        "is-active",
        this.isActive || this.isDropdownActive
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    toggleActive() {
      if (!this.isHoverable && !this.isActive) {
        this.isDropdownActive = !this.isDropdownActive;
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "span", this.getClasses);
    root.setId(this.id);
    root.setRef("dropdown");

    let trigger = root.createDiv("dropdown-trigger");
    let btn = root.createDiv("button");
    btn.addAttr("aria-haspopup", true);
    btn.addAttr("aria-controls", "dropdown-menu");
    btn.addClick(this.toggleActive);

    let text = root.createSpan().innerHTML(this.text);
    let icon = root
      .createIcon()
      .setProps({ icon: this.icon, preserveDefaults: !this.overrideDefaults });
    btn.addChild(text).addChild(icon);
    trigger.addChild(btn);

    let menu = root.createDiv("dropdown-menu");
    menu.addAttr("role", "menu");
    let content = root.createDiv("dropdown-content");
    content.setChildren(this.$slots.default);
    menu.addChild(content);

    root.addChild(trigger);
    root.addChild(menu);

    return root.create();
  }
};
