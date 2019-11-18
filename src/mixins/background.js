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
        "bg-primary",
        "bg-secondary",
        "bg-link",
        "bg-info",
        "bg-warning",
        "bg-moderate",
        "bg-danger",
        "bg-success",
        "bg-happy",
        "bg-dark",
        "bg-light",
        "bg-opaque",
        "bg-black",
        "bg-white"
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
      cssArchitect.addClass("bg-primary", this.hasBgPrimary);
      cssArchitect.addClass("bg-secondary", this.hasBgSecondary);
      cssArchitect.addClass("bg-link", this.hasBgLink);
      cssArchitect.addClass("bg-info", this.hasBgInfo);
      cssArchitect.addClass("bg-success", this.hasBgSuccess);
      cssArchitect.addClass("bg-warning", this.hasBgWarning);
      cssArchitect.addClass("bg-moderate", this.hasBgModerate);
      cssArchitect.addClass("bg-danger", this.hasBgDanger);
      cssArchitect.addClass("bg-dark", this.hasBgDark);
      cssArchitect.addClass("bg-light", this.hasBgLight);
      cssArchitect.addClass("bg-opaque", this.hasBgOpaque);
      cssArchitect.addClass("bg-black", this.hasBgBlack);
      cssArchitect.addClass("bg-white", this.hasBgWhite);
      cssArchitect.addClass("bg-happy", this.hasBgHappy);
      cssArchitect.addClass(
        `bg-${this.background}`,
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
