import TNotification from "./TNotification";
import common from "../../mixins/common";
import check from "../../mixins/check";
import colors from "../../mixins/colors";
import { NotificationBus } from "./notification-bus";

import { TFlex } from "../TFlex";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";


export default {
  name: "t-toast",
  mixins: [common, check, colors],
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
      default: 300
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
    hideIcon: Boolean,
    outlined: Boolean,
    transition: {
      type: String,
      default: "toast"
    }
  },
  data() {
    return {
      notifications: [],
      transitionType : ""
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const css = new CssArchitect("t-toast");
      css.addClass("is-fixed", this.isFixed);
      css.addClass("empty", this.isEmpty());
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the notification element
     * @returns { A String with the chained css classes }
     */
    getNotificationClasses: function() {
      const css = new CssArchitect("notification");

      if(this.outlined){
        this.borderedElement(css);
      }else{
        this.filled(css);
      }
      css.addClass(this.targetClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the close button
     * @returns { A String with the chained css classes }
     */
    getCloseButtonClasses: function() {
      const css = new CssArchitect("notification__close delete");
      css.addClass(this.closeButtonClass, this.closeButtonClass);
      return css.getClasses();
    }
  },
  methods: {
    isEmpty(){
      return !(this.isNotNull(this.notifications) && this.notifications.length > 0);
    },
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
        "min-height",
        css.addPx(this.height),
        this.isNotNull(this.height) && !this.isEmpty()
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
    createCloseButton(architect, $notification) {
      let deleteBtn = architect.createElement(
        "button",
        this.getCloseButtonClasses
      );
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
        icon.addClass(this.getType($notification.type));
        icon.addClass("inverted");
        architect.addChild(icon);
      }
    },
    createNotifications(architect) {
        let transition = architect.createTransition(this.transitionType, {group: true});
        for (let $index in this.notifications) {
          let $notification = this.notifications[$index];
          $notification.scope = $notification.scope || this.scope;
          if ($notification.transition) {
            this.transitionType = $notification.transition
          }

          let notification = architect.createDiv(this.getNotificationClasses);
          notification.setKey(`${this.id}-notification-${$index}`);
          notification.addClass(this.getType($notification.type));

          if (!this.infinite && $notification.infinite) {
            let timer = setTimeout(
              function () {
                this.$thisvui.removeNotification($notification);
                clearTimeout(timer);
              }.bind(this),
              $notification.timeout
            );
          }
          this.createCloseButton(notification, $notification);
          let messageContainer = architect.createElement(TFlex);
          this.createIcon(messageContainer, $notification);
          let message = architect.createDiv("has-text-weight-bold");
          message.innerHTML($notification.text);
          messageContainer.addChild(message);
          notification.addChild(messageContainer);
          transition.addChild(notification);
        }
        architect.addChild(transition);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClasses);
    root.setId(this.id);
    root.setKey(`${this.id}-toast`);
    root.setRef(`toast`);
    root.addAttr("scope", this.scope);
    root.setStyles(this.getStyles());
    this.createNotifications(root);
    return root.create();
  },
  mounted() {
    this.$thisvui.addScope(this.scope);
    this.transitionType = this.transition;
    NotificationBus.$on(
      this.$thisvui.events.notification.updated,
      this.updateNotifications
    );
  }
};
