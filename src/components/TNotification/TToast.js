import TNotification from "./TNotification";
import common from "../../mixins/common";
import check from "../../mixins/check";
import { NotificationBus } from "./notification-bus";

import { TFlex } from "../TFlex";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-toast",
  mixins: [common, check],
  components: {
    TNotification
  },
  props: {
    scope: {
      type: String,
      default: "global"
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 64
    },
    isFullwidth: Boolean,
    infinite: Boolean,
    isFixed: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean,
    center: Boolean,
    middle: Boolean,
    hideIcon: Boolean
  },
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect("t-toast");
      cssArchitect.addClass("is-fixed", this.isFixed);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    getType(type) {
      return `is-${type}`;
    },
    getContainersDimension() {
      let parent = window;
      let container = null;
      let parentWidth = window.innerWidth;
      let containerWidth = this.width;
      let parentHeight = window.innerHeight;
      let containerHeight = this.height;
      if (this.$refs.toast) {
        container = this.$refs.toast;
        if (!this.isFixed) {
          parent = container.parentElement;
          parentWidth = parseInt(getComputedStyle(parent).width);
          parentHeight = parseInt(getComputedStyle(parent).height);
        }
      }
      if (this.isFullwidth) {
        containerWidth = parentWidth;
      }
      return {
        container,
        parent,
        containerWidth,
        parentWidth,
        parentHeight,
        containerHeight
      };
    },
    getCoordinates() {
      let {
        containerWidth,
        parentWidth,
        parentHeight,
        containerHeight
      } = this.getContainersDimension();
      let minMargin = 10;
      let top = minMargin;
      let right = minMargin;
      let bottom, left;
      if (this.top) {
        top = minMargin;
      }
      if (this.right) {
        right = minMargin;
      }
      if (this.bottom) {
        bottom = minMargin;
        top = null;
      }
      if (this.left) {
        left = minMargin;
        right = null;
      }
      if (this.center) {
        left = (parentWidth - containerWidth) / 2;
        right = null;
      }
      if (this.middle) {
        top = (parentHeight - containerHeight) / 2;
      }
      return { top, right, bottom, left };
    },
    getStyles() {
      let { top, right, bottom, left } = this.getCoordinates();
      const css = new CssArchitect();
      css.addStyle(
        "min-width",
        css.addPx(this.width),
        this.isNotNull(this.width)
      );
      css.addStyle(
        "min-height",
        css.addPx(this.height),
        this.isNotNull(this.height)
      );
      css.addStyle("top", css.addPx(top), this.isNotNull(top));
      css.addStyle("right", css.addPx(right), this.isNotNull(right));
      css.addStyle("bottom", css.addPx(bottom), this.isNotNull(bottom));
      css.addStyle("left", css.addPx(left), this.isNotNull(left));
      return css.getStyles();
    },
    updateNotifications() {
      this.notifications = this.$thisvui.getScope(this.scope);
    },
    createDeleteButton(architect, $notification) {
      let deleteBtn = architect.createElement("button", "delete");
      deleteBtn.addClick(() => {
        this.$thisvui.removeNotification($notification);
      });
      architect.addChild(deleteBtn);
    },
    /**
     * Creates the notification icon
     */
    createIcon(architect, $notification) {
      if (!this.hideIcon && !$notification.hideIcon) {
        let $icon = $notification.icon || this.$thisvui.icons.notification;
        let icon = architect.createIcon();
        icon.addProp("icon", $icon);
        architect.addChild(icon);
      }
    },
    createNotifications(architect) {
      for (let $index in this.notifications) {
        let $notification = this.notifications[$index];
        $notification.scope = $notification.scope || this.scope;
        let transition = architect.createTransition("fade");
        let notification = architect.createDiv("notification");
        notification.setKey(`${this.id}-notification-${$index}`);
        notification.addClass(this.getType($notification.type));
        notification.setProps({
          remove: false,
          showDeleteButton: true,
          targetClass: this.getType($notification.type),
          transition: "fade"
        });

        if (!this.infinite && $notification.infinite) {
          let timer = setTimeout(
            function() {
              this.$thisvui.removeNotification($notification);
              clearTimeout(timer);
            }.bind(this),
            $notification.timeout
          );
        }
        this.createDeleteButton(notification, $notification);
        let messageContainer = architect.createElement(TFlex);
        this.createIcon(messageContainer, $notification);
        let message = architect.createDiv("has-text-weight-bold");
        message.innerHTML($notification.text);
        messageContainer.addChild(message);
        notification.addChild(messageContainer);
        transition.addChild(notification);
        architect.addChild(transition);
      }
    }
  },
  render: function(h) {
    if (this.isNotNull(this.notifications) && this.notifications.length > 0) {
      let root = new ElementArchitect(h, "div", this.getContainerClasses);
      root.setId(this.id);
      root.setKey(`${this.id}-toast`);
      root.setRef(`toast`);
      root.addAttr("scope", this.scope);
      root.setStyles(this.getStyles());
      this.createNotifications(root);
      return root.create();
    }
  },
  mounted() {
    this.$thisvui.addScope(this.scope);
    NotificationBus.$on(
      this.$thisvui.events.notification.updated,
      this.updateNotifications
    );
  }
};
