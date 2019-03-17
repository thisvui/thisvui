<template>
  <div ref="slideContainer" :class="getClasses" :style="`width:${width}px`">
    <slot />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisSlide",
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
      const cssArchitect = new CssArchitect("this-animation-container slide");
      cssArchitect.addClass("is-absolute", this.isAbsolute);
      return cssArchitect.getClasses();
    }
  },
  watch: {
    isOpen: function(newVal, oldVal) {
      this.toggleSlide();
    }
  },
  data() {
    return {
      wApiSupported: false
    };
  },
  methods: {
    toggleSlide() {
      let element = this.$refs.slideContainer;
      if (!element) {
        throw new DOMException("Cannot animate undefined element");
      }
      let width = `${this.width}${this.unity}`;
      element.style.width = this.isOpen ? width : "0";
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSlide();
    });
  }
};
</script>
