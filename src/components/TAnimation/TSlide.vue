<template>
  <div
    ref="slideContainer"
    :class="getClasses"
    :style="getStyle()"
    v-t-click-outside="handleOutsideClick"
  >
    <slot />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-slide",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    },
    unity: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: Number
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    animationFill: {
      type: String,
      default: "forwards"
    },
    isAbsolute: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-animation-container slide");
      cssArchitect.addClass("is-absolute", this.isAbsolute);
      cssArchitect.addClass("has-shadow-1");
      return cssArchitect.getClasses();
    },
    getWidth: function() {
      let width = `${this.width}${this.unity}`;
      return this.isOpen ? width : this.initialWidth;
    }
  },
  data() {
    return {
      initialWidth: 0
    };
  },
  watch: {
    isOpen: function(newVal, oldVal) {
      this.toggleSlide();
    }
  },
  methods: {
    getStyle(){
      let styleObject = {
        width: `${this.initialWidth}px`,
      }
      if(this.zIndex){
        styleObject.zIndex = this.zIndex
      }
      return styleObject;
    },
    getTarget() {
      let element = this.$refs.slideContainer;
      if (!element) {
        throw new DOMException("Cannot animate undefined element");
      }
      return element;
    },
    toggleSlide() {
      this.changeWidth(this.getWidth);
    },
    handleOutsideClick(e) {
      this.$emit("clickedOutside", e);
    },
    changeWidth(width) {
      this.getTarget().style.width = width;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSlide();
    });
  }
};
</script>
