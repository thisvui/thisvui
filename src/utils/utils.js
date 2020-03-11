import format from "date-fns/format";

const gen = {
  /**
   * Generates a unique alphanumeric id
   * @returns { A String }
   */
  id: () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 11 characters
    // after the decimal.
    return `el-${Math.random()
      .toString(36)
      .substr(2, 11)}`;
  }
};

const json = {
  /**
   * Converts json to array
   * @returns { An Array }
   */
  convertToArray: payload => {
    const result = [];
    for (let key in payload) {
      result.push(payload[key]);
    }
    return result;
  }
};

const css = {
  getClass: (prefixClass, cssClass) => {
    let resultClass = prefixClass ? prefixClass + " " : "";
    if (cssClass) {
      resultClass += cssClass;
    }
    return resultClass.trim();
  }
};

const check = {
  /**
   * Checks if object is not null
   * @returns { A Boolean value }
   */
  notNull: arg => {
    const isArray = check.isArray(arg);
    if (!isArray && (arg === undefined || arg === null)) {
      return false;
    }
    if (isArray) {
      for (let key in arg) {
        if (arg[key] === undefined || arg[key] === null) {
          return false;
        }
      }
    }
    return true;
  },
  /**
   * Checks if object is null
   * @returns { A Boolean value }
   */
  null: arg => {
    return !check.notNull(arg);
  },
  /**
   * Checks if object is not null nor empty
   * @returns { A Boolean value }
   */
  notEmpty: arg => {
    if (!check.notNull(arg)) {
      return false;
    }
    if (check.isString(arg) && arg.trim() === "") {
      return false;
    }
    if (check.isArray(arg)) {
      for (let key in arg) {
        if (
          check.null(arg) ||
          (check.isString(arg[key]) && arg[key].trim() === "")
        ) {
          return false;
        }
      }
    }
    return true;
  },
  /**
   * Checks if object is empty
   * @returns { A Boolean value }
   */
  empty: arg => {
    return !check.notEmpty(arg);
  },
  /**
   * Checks if value is a valid email address
   * @returns { A Boolean value }
   */
  validEmail: email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  },
  /**
   * Checks if value is a array
   * @returns { A Boolean value }
   */
  isArray(arg) {
    return Array.isArray(arg);
  },
  /**
   * Checks if value is a string
   * @returns { A Boolean value }
   */
  isString(obj) {
    if (obj === undefined || obj === null) {
      return false;
    }
    let toString = Object.prototype.toString;
    return toString.call(obj) == "[object String]";
  },
  /**
   * Checks if value is a number
   * @returns { A Boolean value }
   */
  isNumber(arg) {
    if (arg === undefined || arg === null) {
      return false;
    }
    return !isNaN(parseFloat(arg)) && !isNaN(arg - 0);
  },
  /**
   * Checks if a number is less than a given number
   * @returns { A Boolean value }
   */
  isLessThan: (value, minValue) => {
    if (!value) {
      return false;
    }
    if (!check.isNumber(value)) {
      console.error("Values is not numeric");
      return false;
    }
    if (value < minValue) {
      return true;
    }
    return false;
  },
  /**
   * Checks if a number is greater than a given number
   * @returns { A Boolean value }
   */
  isGreaterThan: (value, maxValue) => {
    if (!value) {
      return false;
    }
    if (!check.isNumber(value)) {
      console.error("Values is not numeric");
      return false;
    }
    if (value > maxValue) {
      return true;
    }
    return false;
  },
  /**
   * Checks if a value length is not less than a given min length
   * @returns { A Boolean value }
   */
  minLength: (value, minLength) => {
    if (!value) {
      return false;
    }
    if (value.length < minLength) {
      return false;
    }
    return true;
  },
  /**
   * Checks if a value length is not greater than a given max length
   * @returns { A Boolean value }
   */
  maxLength: (value, maxLength) => {
    if (!value) {
      return false;
    }
    if (value.length > maxLength) {
      return false;
    }
    return true;
  },
  /**
   * Checks if windows object exist. useful for SSR
   * @returns { A Boolean value }
   */
  existWindow: () => {
    return typeof window !== 'undefined';
  },
};

const text = {
  /**
   * Transforms a String depending on the specified type
   * @returns { A String value }
   */
  transform: (stringVal, type) => {
    if (check.notEmpty([stringVal, type])) {
      switch (type) {
        case "uppercase":
          return stringVal.toUpperCase();
        case "lowercase":
          return stringVal.toLowerCase();
        case "capitalize":
          return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
        default:
          return stringVal;
      }
    }
  },
  /**
   * Transforms a String to uppercase
   * @returns { A String value }
   */
  uppercase: stringVal => {
    return text.transform(stringVal, "uppercase");
  },
  /**
   * Transforms a String to lowercase
   * @returns { A String value }
   */
  lowercase: stringVal => {
    return text.transform(stringVal, "lowercase");
  },
  /**
   * Capitalize a given String
   * @returns { A String value }
   */
  capitalize: stringVal => {
    return text.transform(stringVal, "capitalize");
  }
};

const convert = {
  /**
   * Converts a string value to Boolean. If String is not valid Boolean returns false
   * @returns { A Boolean value }
   */
  stringToBoolean: value => {
    if (!check.notNull(value)) {
      return false;
    }
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      let result = value === "true";
      return result;
    }
    throw new DOMException(
      "Utils.convert.stringToBoolean : Value is no string or boolean"
    );
  }
};

const number = {
  /**
   * Extract number from string
   * @returns { A String representation of the number }
   */
  extractNumberFromString(arg) {
    if (arg === undefined || arg === null) {
      throw new DOMException(
        "Utils.check.extractNumberFromString : arg is undefined"
      );
    }
    if (check.isNumber(arg)) {
      return arg;
    }
    if (!check.isString(arg)) {
      throw new DOMException(
        "Utils.check.extractNumberFromString : arg is no a string or number"
      );
    }
    return arg.replace(/^\D+/g, "");
  },
  /**
   * Format a number
   * @returns { A String value }
   */
  format(num, { thousandsSeparator = ".", decimalSeparator = "," }) {
    return num
      .toFixed(0)
      .replace(".", decimalSeparator)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandsSeparator}`);
  },
  /**
   * reverse format
   * @returns { A String value }
   */
  unFormat(num) {
    return num.replace(/[^0-9$]/g, "");
  }
};

const date = {
  /**
   * Formats a specific date using the date-fns format module
   * @returns { A String value }
   */
  format: (date, formatTemplate) => {
    if (date && format) {
      return format(this.value, formatTemplate);
    }
    return "";
  }
};

export default {
  gen,
  json,
  check,
  text,
  number,
  convert,
  css,
  date
};
