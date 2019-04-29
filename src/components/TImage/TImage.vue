<template>
  <figure :id="id" :class="getFigureClass">
    <img :src="src" :alt="alt" :class="getImgClass" />
  </figure>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";

export default {
  name: "t-image",
  mixins: [common, helper],
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: String
    },
    alt: {
      type: String,
      default: "Image"
    },
    isRounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the figure element
     * @returns { A String with the chained css classes }
     */
    getFigureClass: function() {
      const cssArchitect = new CssArchitect("image");
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.size, this.size !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the img element
     * @returns { A String with the chained css classes }
     */
    getImgClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-rounded", this.isRounded);
      return cssArchitect.getClasses();
    }
  }
};
</script>
