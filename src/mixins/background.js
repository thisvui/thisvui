import CssArchitect from "../utils/css-architect";

export default {
  props: {
    hasBgPrimary: {
      type: Boolean
    },
    hasBgSecondary: {
      type: Boolean
    },
    hasBgLink: {
      type: Boolean
    },
    hasBgInfo: {
      type: Boolean
    },
    hasBgSuccess: {
      type: Boolean
    },
    hasBgWarning: {
      type: Boolean
    },
    hasBgModerate: {
      type: Boolean
    },
    hasBgDanger: {
      type: Boolean
    },
    hasBgDark: {
      type: Boolean
    },
    hasBgLight: {
      type: Boolean
    },
    hasBgOpaque: {
      type: Boolean
    },
    hasBgBlack: {
      type: Boolean
    },
    hasBgWhite: {
      type: Boolean
    },
    hasBgHappy: {
      type: Boolean
    },
    background: {
      type: String
    }
  },
  data() {
    return {
      bgModifiers: [
        "has-background-primary",
        "has-background-secondary",
        "has-background-link",
        "has-background-info",
        "has-background-warning",
        "has-background-moderate",
        "has-background-danger",
        "has-background-success",
        "has-background-happy",
        "has-background-dark",
        "has-background-light",
        "has-background-opaque",
        "has-background-black",
        "has-background-white"
      ],
      hasBgModifier: false,
      bgModifier: null
    };
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getBackgroundModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("has-background-primary", this.hasBgPrimary);
      cssArchitect.addClass("has-background-secondary", this.hasBgSecondary);
      cssArchitect.addClass("has-background-link", this.hasBgLink);
      cssArchitect.addClass("has-background-info", this.hasBgInfo);
      cssArchitect.addClass("has-background-success", this.hasBgSuccess);
      cssArchitect.addClass("has-background-warning", this.hasBgWarning);
      cssArchitect.addClass("has-background-moderate", this.hasBgModerate);
      cssArchitect.addClass("has-background-danger", this.hasBgDanger);
      cssArchitect.addClass("has-background-dark", this.hasBgDark);
      cssArchitect.addClass("has-background-light", this.hasBgLight);
      cssArchitect.addClass("has-background-opaque", this.hasBgOpaque);
      cssArchitect.addClass("has-background-black", this.hasBgBlack);
      cssArchitect.addClass("has-background-white", this.hasBgWhite);
      cssArchitect.addClass("has-background-happy", this.hasBgHappy);
      cssArchitect.addClass(
        `has-background-${this.background}`,
        this.background !== undefined
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    checkBgModifier(classes) {
      return this.bgModifiers.some(modifier => classes.includes(modifier));
    },
    setupBgModifier(cssArchitect) {
      this.hasBgModifier = this.checkColorModifier(cssArchitect.getClasses());
      this.bgModifier = cssArchitect
        .getClassesArray()
        .filter(this.checkBgModifier);
    }
  }
};
