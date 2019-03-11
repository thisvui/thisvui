import utils from "../utils/utils";
import check from "../mixins/check";

/**
 * Common props for all components
 */
export default {
  mixins: [check],
  props: {
    id: {
      type: String,
      default: utils.gen.id // Automatically generates a unique id if not specified
    }
  }
};
