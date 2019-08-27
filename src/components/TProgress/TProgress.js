import TFlex from "../TFlex";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-progress",
  mixins: [common, colors],
  components: { TFlex },
  props: {
    value: Number,
    circular: {
      type: Boolean
    },
    indeterminate: {
      type: Boolean
    },
    compact: {
      type: Boolean
    },
    spinnerType: {
      type: String,
      default: "single"
    },
    targetClass: {
      type: String
    },
    containerClass: {
      type: String
    },
    isFullwidth: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-progress");
      cssArchitect.addClass("progress", !this.circular);
      cssArchitect.addClass("circular", this.circular);
      cssArchitect.addClass("compact", this.compact);
      cssArchitect.addClass(
        this.spinnerType,
        this.spinnerType !== undefined && this.circular && this.indeterminate
      );
      cssArchitect.addClass(
        "is-link",
        !this.hasColorModifier && !this.targetClass
      );
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    getHelperClasses: function() {
      const cssArchitect = new CssArchitect(
        "button is-invisible is-paddingless is-marginless"
      );
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-link", !this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect("t-progress-container");
      cssArchitect.addClass("circular", this.circular);
      cssArchitect.addClass("compact", this.compact);
      cssArchitect.addClass(this.containerClass);
      return cssArchitect.getClasses();
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.progressValue = newVal;
      if (this.circular) {
        this.animateProgress();
      }
    }
  },
  data() {
    return {
      progress: null,
      ctx: null,
      progressValue: null,
      progressStart: 4.72,
      circleWidth: null,
      circleHeight: null,
      diff: null,
      requestAnimationFrame: null,
      interval: 0,
      angleA: 0,
      angleB: 0,
      restart: false,
      fillColor: "black"
    };
  },
  methods: {
    init() {
      this.requestAnimationFrame =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      this.progress = this.circular ? this.$refs.circular : this.$refs.linear;
      let colorHelper = this.$refs.colorHelper;
      this.fillColor = this.rgb2hex(
        window
          .getComputedStyle(colorHelper, null)
          .getPropertyValue("background-color")
      );
      if (!this.indeterminate) {
        this.progressValue = !this.circular
          ? this.value / 100 || 0
          : this.value || 0;
        this.progress.value = this.progressValue;
      }
      if (this.circular && !this.indeterminate) {
        this.ctx = this.progress.getContext("2d");
        this.progress = this.$refs.circular;
        this.progressWidth = this.ctx.canvas.width;
        this.progressHeight = this.ctx.canvas.height;
      }
    },
    animateProgress() {
      let centerX = 35;
      let centerY = 35;
      let radius = 30;
      this.diff = ((this.progressValue / 100) * Math.PI * 2 * 10).toFixed(2);
      this.ctx.clearRect(0, 0, this.progressWidth, this.progressHeight);
      this.ctx.lineWidth = 10;
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.fillColor;
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        this.progressValue + "%",
        this.progressWidth * 0.5,
        this.progressHeight * 0.5 + 2,
        this.progressWidth
      );
      this.ctx.beginPath();
      this.ctx.fillText(
        this.progressValue + "%",
        this.progressWidth * 0.5,
        this.progressHeight * 0.5 + 2,
        this.progressWidth
      );
      this.ctx.arc(
        centerX,
        centerY,
        radius,
        this.progressStart,
        this.diff / 10 + this.progressStart,
        false
      );
      this.ctx.stroke();
    },
    createLinearProgress(architect) {
      if (!this.circular) {
        let progress = architect.createElement("progress", this.getClasses);
        progress.setId(this.id);
        progress.setRef("linear");
        progress.setChildren(this.$slots.default);
        architect.addChild(progress);
      }
    },
    createCircularProgress(architect) {
      if (this.circular) {
        let elementType = this.indeterminate ? "div" : "canvas";
        let progress = architect.createElement(elementType, this.getClasses);
        progress.setRef("circular");
        progress.setId(this.id);
        progress.addAttr("width", 70, !this.indeterminate);
        progress.addAttr("height", 70, !this.indeterminate);
        architect.addChild(progress);
        if (this.spinnerType === "double") {
          let double = architect.createDiv(this.getClasses);
          architect.addChild(double);
        }
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, TFlex, this.getContainerClasses);
    root.setProps({ isFullwidth: this.isFullwidth, justifyContent: "center" });

    let color = root.createDiv(this.getHelperClasses);
    color.setRef("colorHelper");
    root.addChild(color);
    this.createLinearProgress(root);
    this.createCircularProgress(root);
    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
      if (this.circular && !this.indeterminate) {
        this.animateProgress();
      }
    });
  }
};
