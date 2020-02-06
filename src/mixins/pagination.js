import icons from "./icons";

export default {
  mixins: [icons],
  props: {
    serverSide: {
      type: Boolean,
      default: false
    },
    totalItems: {
      type: Number
    },
    showNumbers: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: true
    },
    autoNavigate: {
      type: Boolean,
      default: false
    },
    previousClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    listClass: {
      type: String
    },
    linkClass: {
      type: String
    },
    currentLinkClass: {
      type: String
    },
    previousBtnClass: {
      type: String
    },
    nextBtnClass: {
      type: String
    },
    previousText: {
      type: String,
      default: "Previous"
    },
    nextText: {
      type: String,
      default: "Next"
    },
    previousIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowLeft;
      }
    },
    nextIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowRight;
      }
    },
    previousIconClass: {
      type: String
    },
    nextIconClass: {
      type: String
    },
    previousIconTooltip: {
      type: String
    },
    nextIconTooltip: {
      type: String
    },
    previousIconTooltipClass: {
      type: String
    },
    nextIconTooltipClass: {
      type: String
    }
  }
};
