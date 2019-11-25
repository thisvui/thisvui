import CssArchitect from "../utils/css-architect";

export default {
  props: {
    bgPrimary: {
      type: Boolean
    },
    bgSecondary: {
      type: Boolean
    },
    bgLink: {
      type: Boolean
    },
    bgInfo: {
      type: Boolean
    },
    bgSuccess: {
      type: Boolean
    },
    bgWarning: {
      type: Boolean
    },
    bgModerate: {
      type: Boolean
    },
    bgDanger: {
      type: Boolean
    },
    bgDark: {
      type: Boolean
    },
    bgLight: {
      type: Boolean
    },
    bgOpaque: {
      type: Boolean
    },
    bgBlack: {
      type: Boolean
    },
    bgWhite: {
      type: Boolean
    },
    bgHappy: {
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
      cssArchitect.addClass("bg-primary", this.bgPrimary);
      cssArchitect.addClass("bg-secondary", this.bgSecondary);
      cssArchitect.addClass("bg-link", this.bgLink);
      cssArchitect.addClass("bg-info", this.bgInfo);
      cssArchitect.addClass("bg-success", this.bgSuccess);
      cssArchitect.addClass("bg-warning", this.bgWarning);
      cssArchitect.addClass("bg-moderate", this.bgModerate);
      cssArchitect.addClass("bg-danger", this.bgDanger);
      cssArchitect.addClass("bg-dark", this.bgDark);
      cssArchitect.addClass("bg-light", this.bgLight);
      cssArchitect.addClass("bg-opaque", this.bgOpaque);
      cssArchitect.addClass("bg-black", this.bgBlack);
      cssArchitect.addClass("bg-white", this.bgWhite);
      cssArchitect.addClass("bg-happy", this.bgHappy);
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
      this.hasBgModifier = this.checkThemeModifier(cssArchitect.getClasses());
      this.bgModifier = cssArchitect
        .getClassesArray()
        .filter(this.checkBgModifier);
    }
  }
};
