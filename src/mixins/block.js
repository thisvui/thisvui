import { TProgress } from "../components/TProgress";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    loading: {
      type: Boolean
    },
    transition: {
      type: String,
      default: "fade"
    },
    zIndex: {
      type: [Number, String]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    loadingCss: function() {
      const css = new CssArchitect("t-slide");
      css.addStyle("zIndex", parseInt(this.zIndex), this.zIndex !== undefined);
      return css;
    }
  },
  methods: {
    createLoading(architect, classes) {
      let transition = architect.createTransition(this.transition);
      if (this.loading) {
        let loading = architect.createDiv("t-loading-block is-absolute");
        loading.setStyles(this.loadingCss.getStyles());
        let progress = architect.createElement(TProgress).setProps({
          indeterminate: true,
          compact: true,
          height: 3,
          marginless: true
        });
        progress.addProp("target-class", classes, this.isNotNull(classes));
        let block = architect.createDiv("t-loading-block-ui is-absolute");
        loading.addChild(progress);
        loading.addChild(block);
        transition.addChild(loading);
      }
      architect.addChild(transition);
    }
  }
};
