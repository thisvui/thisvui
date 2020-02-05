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
  notNull: obj => {
    const isArray = Array.isArray(obj);
    if (!isArray && (obj === undefined || obj === null)) {
      return false;
    }
    if (isArray) {
      for (let key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
          return false;
        }
      }
    }
    return true;
  },
  /**
   * Checks if object is not null nor empty
   * @returns { A Boolean value }
   */
  notEmpty: stringObjt => {
    const isArray = Array.isArray(stringObjt);
    if (!check.notNull(stringObjt)) {
      return false;
    }
    if (typeof stringObjt === "string" && stringObjt.trim() === "") {
      return false;
    }
    if (isArray) {
      for (let key in stringObjt) {
        if (
          typeof stringObjt[key] === "string" &&
          stringObjt[key].trim() === ""
        ) {
          return false;
        }
      }
    }
    return true;
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
   * Checks if value is numeric
   * @returns { A Boolean value }
   */
  isNumeric: value => {
    if (isNaN(value)) {
      return false;
    }
    return true;
  },
  /**
   * Checks if a number is less than a given number
   * @returns { A Boolean value }
   */
  isLessThan: (value, minValue) => {
    if (!value) {
      return false;
    }
    if (!check.isNumeric(value)) {
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
    if (!check.isNumeric(value)) {
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
  }
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
  format(num, { thousandsSeparator = ".", decimalSeparator = "," }) {
    return num
      .toFixed(0)
      .replace(".", decimalSeparator)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandsSeparator}`);
  },
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
