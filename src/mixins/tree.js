export default {
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
      type: [Boolean, String],
      default: true
    }
  }
};
