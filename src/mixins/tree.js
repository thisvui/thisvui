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
      default: "fas fa-angle-up"
    },
    closedIcon: {
      type: String,
      default: "fas fa-angle-down"
    },
    removeListStyle: {
      type: [Boolean, String],
      default: true
    }
  }
};
