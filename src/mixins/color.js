import CssArchitect from "../utils/css-architect";

export default {
  props: {
    colorPrimary: {
      type: Boolean
    },
    colorSecondary: {
      type: Boolean
    },
    colorLink: {
      type: Boolean
    },
    colorInfo: {
      type: Boolean
    },
    colorSuccess: {
      type: Boolean
    },
    colorWarning: {
      type: Boolean
    },
    colorModerate: {
      type: Boolean
    },
    colorDanger: {
      type: Boolean
    },
    colorDark: {
      type: Boolean
    },
    colorLight: {
      type: Boolean
    },
    colorOpaque: {
      type: Boolean
    },
    colorBlack: {
      type: Boolean
    },
    colorWhite: {
      type: Boolean
    },
    colorHappy: {
      type: Boolean
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      colorModifiers: [
        "color-primary",
        "color-secondary",
        "color-link",
        "color-info",
        "color-warning",
        "color-moderate",
        "color-danger",
        "color-success",
        "color-happy",
        "color-dark",
        "color-light",
        "color-opaque",
        "color-black",
        "color-white"
      ],
      hasColorModifier: false,
      colorModifier: null
    };
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getColorModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("color-primary", this.colorPrimary);
      cssArchitect.addClass("color-secondary", this.colorSecondary);
      cssArchitect.addClass("color-link", this.colorLink);
      cssArchitect.addClass("color-info", this.colorInfo);
      cssArchitect.addClass("color-success", this.colorSuccess);
      cssArchitect.addClass("color-warning", this.colorWarning);
      cssArchitect.addClass("color-moderate", this.colorModerate);
      cssArchitect.addClass("color-danger", this.colorDanger);
      cssArchitect.addClass("color-dark", this.colorDark);
      cssArchitect.addClass("color-light", this.colorLight);
      cssArchitect.addClass("color-opaque", this.colorOpaque);
      cssArchitect.addClass("color-black", this.colorBlack);
      cssArchitect.addClass("color-white", this.colorWhite);
      cssArchitect.addClass("color-happy", this.colorHappy);
      cssArchitect.addClass(
        `color-${this.color}`,
        this.color !== undefined
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    checkColorModifier(classes) {
      return this.colorModifiers.some(modifier => classes.includes(modifier));
    },
    setupColorModifier(cssArchitect) {
      this.hasColorModifier = this.checkThemeModifier(cssArchitect.getClasses());
      this.colorModifier = cssArchitect
        .getClassesArray()
        .filter(this.checkColorModifier);
    }
  }
};
