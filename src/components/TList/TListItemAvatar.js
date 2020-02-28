import syntax from "../../mixins/syntax";
import common from "../../mixins/common";
import icons from "../../mixins/icons";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-list-item-avatar",
  mixins: [common, icons, syntax],
  props: {
    avatar: String,
    avatarClass: String,
    icon: String,
    iconClass: String
  },
  computed: {
    css: function() {
      const css = new CssArchitect("t-list__avatar");
      return css;
    }
  },
  methods: {
    createIcon(architect) {
      if (this.icon) {
        let iconContainer = architect.createDiv();
        let icon = architect.createIcon();
        icon.addClass(this.iconClass);
        icon.setProps({
          icon: this.icon,
          large: true,
          resizeFont: true,
          iconLib: this.iconLib,
          preserveDefaults: !this.overrideDefaults
        });
        iconContainer.addChild(icon);
        architect.addChild(iconContainer);
      }
    },
    createAvatar(architect) {
      if (this.avatar) {
        let avatarContainer = architect.createDiv();
        let imgEl = architect.createImg();
        imgEl.addClass(this.avatarClass);
        imgEl.addAttr("src", this.avatar);
        avatarContainer.addChild(imgEl);
        architect.addChild(avatarContainer);
      }
    },
    createAvatarContent(architect) {
      this.createAvatar(architect);
      this.createIcon(architect);
      if (this.$slots.default) {
        let slotAvatar = architect
          .createSpan()
          .setChildren(this.$slots.default);
        architect.addChild(slotAvatar);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.css.getClasses());
    root.setId(this.id);
    this.createAvatarContent(root);
    return root.create();
  }
};
