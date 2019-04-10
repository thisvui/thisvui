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
import slide from "../../mixins/slide";

export default {
  name: "t-slide",
  mixins: [slide],
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
    getStyle() {
      let styleObject = {
        width: `${this.initialWidth}px`
      };
      if (this.zIndex) {
        styleObject.zIndex = parseInt(this.zIndex);
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
