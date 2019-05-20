<template>
  <t-flex
    :class="getContainerClasses"
    :is-fullwidth="isFullWidth"
    justify-content="center"
  >
    <div :class="getHelperClasses" ref="colorHelper"></div>
    <canvas
      :id="id"
      width="70"
      height="70"
      v-if="circular && !indeterminate"
      ref="circular"
      :class="getClasses"
    ></canvas>
    <div
      ref="circular"
      :class="getClasses"
      v-if="circular && indeterminate"
    ></div>
    <div
      :class="getClasses"
      v-if="circular && indeterminate && spinnerType === 'double'"
    ></div>
    <progress :id="id" :class="getClasses" ref="linear" v-if="!circular">
      <slot></slot>
    </progress>
  </t-flex>
</template>

<script>
import TFlex from "../TFlex";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

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
    isFullWidth: {
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
    }
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
</script>
