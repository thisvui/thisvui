import icons from "./icons";

export default {
  mixins: [icons],
  props: {
    tagClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    linkClass: {
      type: String
    },
    controlIconClass: {
      type: String
    },
    linkOpenedClass: {
      type: String
    },
    openedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowUp;
      }
    },
    closedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowDown;
      }
    },
    removeListStyle: {
      type: Boolean,
      default: true
    },
    exclusive: {
      type: Boolean
    }
  }
};
