import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isPrimary: {
      type: Boolean
    },
    isSecondary: {
      type: Boolean
    },
    isLink: {
      type: Boolean
    },
    isInfo: {
      type: Boolean
    },
    isSuccess: {
      type: Boolean
    },
    isWarning: {
      type: Boolean
    },
    isModerate: {
      type: Boolean
    },
    isDanger: {
      type: Boolean
    },
    isDark: {
      type: Boolean
    },
    isLight: {
      type: Boolean
    },
    isOpaque: {
      type: Boolean
    },
    isBlack: {
      type: Boolean
    },
    isWhite: {
      type: Boolean
    },
    isHappy: {
      type: Boolean
    },
    color: {
      type: String
    },
    background: {
      type: String
    }
  },
  data() {
    return {
      hasColorModifier: false,
      colorModifier: null
    };
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getColorsModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-primary", this.isPrimary);
      cssArchitect.addClass("is-secondary", this.isSecondary);
      cssArchitect.addClass("is-link", this.isLink);
      cssArchitect.addClass("is-info", this.isInfo);
      cssArchitect.addClass("is-success", this.isSuccess);
      cssArchitect.addClass("is-warning", this.isWarning);
      cssArchitect.addClass("is-moderate", this.isModerate);
      cssArchitect.addClass("is-danger", this.isDanger);
      cssArchitect.addClass("is-dark", this.isDark);
      cssArchitect.addClass("is-light", this.isLight);
      cssArchitect.addClass("is-opaque", this.isOpaque);
      cssArchitect.addClass("is-black", this.isBlack);
      cssArchitect.addClass("is-white", this.isWhite);
      cssArchitect.addClass("is-happy", this.isHappy);
      cssArchitect.addClass(`has-text-${this.color}`, this.color !== undefined);
      cssArchitect.addClass(
        `has-background-${this.background}`,
        this.background !== undefined
      );
      let result = cssArchitect.getClasses();
      this.hasColorModifier = result !== "";
      this.colorModifier = result;
      return result;
    }
  }
};
