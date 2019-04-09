<template>
  <t-slide
    :is-open="isOpen"
    :width="width"
    :animation-duration="animationDuration"
    :animation-fill="animationFill"
    :is-absolute="isAbsolute"
  >
    <aside
      :id="id"
      :class="getClasses"
      ref="asidecontainer"
    >
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

export default {
  name: "t-aside",
  components: { TSlide },
  mixins: [common, colors, flex],
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    isAbsolute: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    animationFill: {
      type: String,
      default: "forwards"
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
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
