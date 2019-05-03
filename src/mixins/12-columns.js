import CssArchitect from "../utils/css-architect";

export default {
  props: {
    is0: {
      type: Boolean
    },
    is1: {
      type: Boolean
    },
    is2: {
      type: Boolean
    },
    is3: {
      type: Boolean
    },
    is4: {
      type: Boolean
    },
    is5: {
      type: Boolean
    },
    is6: {
      type: Boolean
    },
    is7: {
      type: Boolean
    },
    is8: {
      type: Boolean
    },
    is9: {
      type: Boolean
    },
    is10: {
      type: Boolean
    },
    is11: {
      type: Boolean
    },
    is12: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    get12ColumnsModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-0", this.is0);
      cssArchitect.addClass("is-1", this.is1);
      cssArchitect.addClass("is-2", this.is2);
      cssArchitect.addClass("is-3", this.is3);
      cssArchitect.addClass("is-4", this.is4);
      cssArchitect.addClass("is-5", this.is5);
      cssArchitect.addClass("is-6", this.is6);
      cssArchitect.addClass("is-7", this.is7);
      cssArchitect.addClass("is-8", this.is8);
      cssArchitect.addClass("is-9", this.is9);
      cssArchitect.addClass("is-10", this.is10);
      cssArchitect.addClass("is-11", this.is11);
      cssArchitect.addClass("is-12", this.is12);
      return cssArchitect.getClasses();
    }
  }
};
