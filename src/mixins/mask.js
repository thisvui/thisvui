import CssArchitect from "../utils/css-architect";

export default {
  props: {
    mask: {
      type: Boolean
    },
    thousandsSeparator: {
      type: String,
      default: "."
    },
    decimalSeparator: {
      type: String,
      default: ","
    }
  }
};
