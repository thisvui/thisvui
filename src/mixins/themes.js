import CssArchitect from "../utils/css-architect";

import background from "./background";
import color from "./color";
import alpha from "./alpha";

export default {
  mixins: [background, color, alpha],
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
    }
  },
  data() {
    return {
      modifiers: [
        "is-primary",
        "is-secondary",
        "is-link",
        "is-info",
        "is-warning",
        "is-moderate",
        "is-danger",
        "is-success",
        "is-happy",
        "is-dark",
        "is-light",
        "is-opaque",
        "is-black",
        "is-white"
      ],
      themeModifier: null,
      hasThemeModifier: false,
      includeBgModifiers: true,
      includeColorModifiers: true,
      hexDigits: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
      ]
    };
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getThemeModifiers: function() {
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
      cssArchitect.addClass(
        this.getBackgroundModifiers,
        this.includeBgModifiers
      );
      cssArchitect.addClass(this.getColorModifiers, this.includeColorModifiers);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    getThemeModifier(addDefault = false) {
      let themeModifier;
      if (addDefault) {
        themeModifier = "is-primary";
      }
      if (this.hasThemeModifier) {
        themeModifier = this.themeModifier;
      }
      return themeModifier;
    },
    checkThemeModifier(classes) {
      return this.modifiers.some(modifier => classes.includes(modifier));
    },
    configureDefault(cssArchitect, defaultTheme) {
      let defaultModifier = this.$_utils.check.isString(defaultTheme) ? defaultTheme : "is-primary";
      cssArchitect.addClass(defaultModifier, !this.hasThemeModifier);
      this.setupThemeModifier(cssArchitect);
    },
    setupThemeModifier(cssArchitect, defaultTheme = false) {
      this.hasThemeModifier = this.checkThemeModifier(
        cssArchitect.getClasses()
      );
      let filtered = cssArchitect
        .getClassesArray()
        .filter(this.checkThemeModifier);

      if (filtered && filtered !== null && filtered.length > 0) {
        this.themeModifier = filtered[0];
      }
      if (defaultTheme) {
        this.configureDefault(cssArchitect, defaultTheme);
      }
    },
    isFilled(
      cssArchitect,
      {
        removeInit = false,
        hoverable = false,
        inverted = false,
        tint = false,
        shade = false,
        active = true
      } = {}
    ) {
      if (!cssArchitect) {
        throw new Error("filled - Please provide css-architect parameter");
      }
      if(active) {
        cssArchitect.addClass(`filled`);
        cssArchitect.addClass(`remove-init`, removeInit);
        cssArchitect.addClass(`hoverable`, hoverable);
        cssArchitect.addClass(`inverted`, inverted);
        cssArchitect.addClass(`tint-${tint}`, tint);
        cssArchitect.addClass(`shade-${shade}`, shade);
      }
    },
    isColored(cssArchitect, { inverted = false, tint = false, shade = false, active = true } = {}) {
      if (!cssArchitect) {
        throw new Error("colored - Please provide css-architect parameter");
      }
      if(active) {
        cssArchitect.addClass(`colored`);
        cssArchitect.addClass(`inverted`, inverted);
        cssArchitect.addClass(`tint-${tint}`, tint);
        cssArchitect.addClass(`shade-${shade}`, shade);
      }
    },
    isBordered(cssArchitect, { tint = false, shade = false,  active = true } = {}) {
      if (!cssArchitect) {
        throw new Error("bordered - Please provide css-architect parameter");
      }
      if(active) {
        cssArchitect.addClass(`bordered`);
        cssArchitect.addClass(`tint-${tint}`, tint);
        cssArchitect.addClass(`shade-${shade}`, shade);
      }
    },
    isHovered(cssArchitect, { hasColor = false, active = true } = {}) {
      if (!cssArchitect) {
        throw new Error("hovered - Please provide css-architect parameter");
      }
      if(active){
        cssArchitect.addClass(`hovered`);
        cssArchitect.addClass(`has-color`, hasColor);
      }
    },
    rgb2hex(color) {
      let rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (rgb == null) {
        rgb = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+), \s*(\d+)\)$/);
      }
      return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    },

    hex(x) {
      return isNaN(x)
        ? "00"
        : this.hexDigits[(x - (x % 16)) / 16] + this.hexDigits[x % 16];
    }
  }
};
