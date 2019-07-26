import utils from "../utils/utils";

export default {
  methods: {
    getBoolean: arg => {
      return utils.convert.stringToBoolean(arg);
    },
    isNotNull: arg => {
      return utils.check.notNull(arg);
    },
    isNotEmpty: arg => {
      return utils.check.notEmpty(arg);
    }
  }
};
