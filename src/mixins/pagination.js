export default {
  props: {
    showNumbers: {
      type: [Boolean, String],
      default: false
    },
    showText: {
      type: Boolean,
      default: true
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
      type: String
    },
    nextIcon: {
      type: String
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
