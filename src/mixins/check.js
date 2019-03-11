import utils from "../utils/utils";

export default {
  methods: {
    getBoolean: arg => {
      return utils.convert.stringToBoolean(arg);
    },
    isNotNullOrUndefined: arg => {
      return utils.check.notNull(arg);
    }
  }
};
