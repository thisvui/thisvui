<template>
  <t-slide
    :is-open="isOpen"
    :width="width"
    :animation-duration="animationDuration"
    :animation-fill="animationFill"
    :is-absolute="isAbsolute"
    :z-index="zIndex"
    @clickedOutside="handleOutsideClick"
  >
    <aside :id="id" :class="getClasses" ref="asidecontainer">
      <slot></slot>
    </aside>
  </t-slide>
</template>

<script>
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex-direction";
import CssArchitect from "../../utils/css-architect";
import TSlide from "../TAnimation/TSlide";
import slide from "../../mixins/slide";

export default {
  name: "t-aside",
  components: { TSlide },
  mixins: [common, colors, flex, slide],
  props: {
    containerClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-aside is-flex");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
