import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isMarginless: {
      type: Boolean
    },
    isPaddingless: {
      type: Boolean
    },
    isBold: {
      type: Boolean
    },
    isOverlay: {
      type: Boolean
    },
    isClipped: {
      type: Boolean
    },
    isRadiusless: {
      type: Boolean
    },
    isShadowless: {
      type: Boolean
    },
    isUnselectable: {
      type: Boolean
    },
    isInvisible: {
      type: Boolean
    },
    isClearfix: {
      type: Boolean
    },
    isPulledLeft: {
      type: Boolean
    },
    isPulledRight: {
      type: Boolean
    },
    isSrOnly: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getHelpersModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-marginless", this.isMarginless);
      cssArchitect.addClass("is-paddingless", this.isPaddingless);
      cssArchitect.addClass("is-bold", this.isBold);
      cssArchitect.addClass("is-overlay", this.isOverlay);
      cssArchitect.addClass("is-clipped", this.isClipped);
      cssArchitect.addClass("is-radiusless", this.isRadiusless);
      cssArchitect.addClass("is-shadowless", this.isShadowless);
      cssArchitect.addClass("is-unselectable", this.isUnselectable);
      cssArchitect.addClass("is-invisible", this.isInvisible);
      cssArchitect.addClass("is-clearfix", this.isClearfix);
      cssArchitect.addClass("is-pulled-left", this.isPulledLeft);
      cssArchitect.addClass("is-pulled-right", this.isPulledRight);
      cssArchitect.addClass("is-sr-only", this.isSrOnly);
      return cssArchitect.getClasses();
    }
  }
};
