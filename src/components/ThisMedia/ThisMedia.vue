<template>
  <div :id="id" :class="getClasses">
    <figure class="media-left">
      <p :class="getImgClasses">
        <img :src="image" />
      </p>
    </figure>
    <div class="media-content">
      <slot></slot>
    </div>
    <div class="media-right">
      <slot name="media-right"></slot>
    </div>
  </div>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisMedia",
  mixins: [common, syntax, sizes],
  props: {
    image: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      default: "is-64x64"
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("media");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);

      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the img element
     * @returns { A String with the chained css classes }
     */
    getImgClasses: function() {
      const cssArchitect = new CssArchitect("image");
      cssArchitect.addClass(this.imageClass, this.imageClass);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
