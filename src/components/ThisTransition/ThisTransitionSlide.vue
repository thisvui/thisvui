<template>
  <transition
    name="slide-in"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    v-if="!useWapi"
  >
    <div v-if="isOpen" :class="getClasses">
      <slot />
    </div>
  </transition>
  <div
    v-else="useWapi"
    ref="slider"
    :class="getClasses"
    :style="`width:${width}px`"
  >
    <slot />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisTransitionSlide",
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
      const cssArchitect = new CssArchitect("this-animation-container");
      cssArchitect.addClass("is-absolute", this.isAbsolute);
      return cssArchitect.getClasses();
    }
  },
  watch: {
    isOpen: function(newVal, oldVal) {
      // watch it
      if (this.useWapi) {
        this.animateSlide();
      }
    }
  },
  data() {
    return {
      wApiSupported: false
    };
  },
  methods: {
    /**
     * Executed on transition enter. If WAPI not present.
     */
    enter(element) {
      const height = getComputedStyle(element).height;

      element.style.width = "auto";
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = height;

      const width = getComputedStyle(element).width;

      element.style.width = "0";
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = null;

      setTimeout(() => {
        element.style.width = width;
      });
    },
    /**
     * Executed after transition enter. If WAPI not present.
     */
    afterEnter(element) {
      element.style.width = "auto";
    },
    /**
     * Executed on transition leave. If WAPI not present.
     */
    leave(element) {
      const width = getComputedStyle(element).width;

      element.style.width = width;

      getComputedStyle(element).width;

      setTimeout(() => {
        element.style.width = "0";
      });
    },
    /**
     * If Web animation Api is supported we use it to animate the container
     */
    animateSlide() {
      let element = this.$refs.slider;
      if (!element) {
        throw new DOMException("Cannot animate undefined element");
      }
      let width = `${this.width}${this.unity}`;
      const slideInAnimation = () => {
        return [
          {
            width: "0"
          },
          {
            width: width
          }
        ];
      };

      const slideOutAnimation = () => {
        return [
          {
            width: width
          },
          {
            width: "0"
          }
        ];
      };
      element.animate(this.isOpen ? slideInAnimation() : slideOutAnimation(), {
        duration: this.animationDuration,
        fill: this.animationFill
      });
    },
    /**
     * Check if the animate function is present in the Element interface
     */
    useWapi: function() {
      this.wApiSupported = this.$el.animate ? true : false;
      return this.wApiSupported && this.width;
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.useWapi()) {
        this.animateSlide();
      }
    });
  }
};
</script>

<style scoped>
.this-animation-container {
  display: flex;
}
.this-animation-container.is-absolute {
  position: absolute;
  height: 100%;
}
</style>
