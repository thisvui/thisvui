import icons from "./icons";

export default {
  mixins: [icons],
  props: {
    size: {
      type: Number,
      default: 10
    },
    sizeOptions: {
      type: Array,
      default: function() {
        return [5, 10, 15, 20, 25, 50, 75, 100];
      }
    },
    sizeLabel: {
      type: String,
      default: "Rows per page:"
    },
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
  },
  methods: {
    getPaginationProps(args = {}) {
      let {
        size = this.size,
        sizeOptions = this.sizeOptions,
        sizeLabel = this.sizeLabel,
        serverSide = this.serverSide,
        totalItems = this.totalItems,
        showNumbers = this.showNumbers,
        showText = this.showText,
        autoNavigate = this.autoNavigate,
        previousClass = this.previousClass,
        nextClass = this.nextClass,
        listClass = this.listClass,
        linkClass = this.linkClass,
        currentLinkClass = this.currentLinkClass,
        previousBtnClass = this.previousBtnClass,
        nextBtnClass = this.nextBtnClass,
        previousText = this.previousText,
        nextText = this.nextText,
        previousIcon = this.previousIcon,
        nextIcon = this.nextIcon,
        previousIconClass = this.previousIconClass,
        nextIconClass = this.nextIconClass,
        previousIconTooltip = this.previousIconTooltip,
        nextIconTooltip = this.nextIconTooltip,
        previousIconTooltipClass = this.previousIconTooltipClass,
        nextIconTooltipClass = this.nextIconTooltipClass
      } = args;
      return {
        size: size,
        sizeOptions: sizeOptions,
        sizeLabel: sizeLabel,
        serverSide: serverSide,
        totalItems: totalItems,
        showNumbers: showNumbers,
        showText: showText,
        autoNavigate: autoNavigate,
        previousClass: previousClass,
        nextClass: nextClass,
        listClass: listClass,
        linkClass: linkClass,
        currentLinkClass: currentLinkClass,
        previousBtnClass: previousBtnClass,
        nextBtnClass: nextBtnClass,
        previousText: previousText,
        nextText: nextText,
        previousIcon: previousIcon,
        nextIcon: nextIcon,
        previousIconClass: previousIconClass,
        nextIconClass: nextIconClass,
        previousIconTooltip: previousIconTooltip,
        nextIconTooltip: nextIconTooltip,
        previousIconTooltipClass: previousIconTooltipClass,
        nextIconTooltipClass: nextIconTooltipClass
      };
    }
  }
};
