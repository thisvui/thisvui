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
  },
  prettify: arg => {
    if (typeof arg != "string") {
      arg = JSON.stringify(arg, undefined, 2);
    }
    return arg;
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
    if (check.null(arg)) {
      return false;
    }
    if (check.isString(arg) && arg.trim() === "") {
      return false;
    }
    if (check.isArray(arg)) {
      if (arg.length === 0) {
        return false;
      }
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
    return typeof window !== "undefined";
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
  format: (dateParam, formatTemplate) => {
    if (dateParam && format) {
      return format(this.value, formatTemplate);
    }
    return "";
  }
};

const overlay = {
  /**
   * Check if vertical scrollbar is present.
   * @returns { A Boolean }
   */
  // Todo - Add support for horizontal scrolling
  checkScrollBar: () => {
    let rootElem = document.documentElement || document.body;
    let overflowStyle;

    if (typeof rootElem.currentStyle !== "undefined")
      overflowStyle = rootElem.currentStyle.overflow;

    overflowStyle =
      overflowStyle || window.getComputedStyle(rootElem, "").overflow;

    let overflowYStyle;

    if (typeof rootElem.currentStyle !== "undefined")
      overflowYStyle = rootElem.currentStyle.overflowY;

    overflowYStyle =
      overflowYStyle || window.getComputedStyle(rootElem, "").overflowY;

    let contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
    let overflowShown =
      /^(visible|auto)$/.test(overflowStyle) ||
      /^(visible|auto)$/.test(overflowYStyle);
    let alwaysShowScroll =
      overflowStyle === "scroll" || overflowYStyle === "scroll";

    return (contentOverflows && overflowShown) || alwaysShowScroll;
  },
  /**
   * Calculates the coordinates to position a overlay element, useful to calculate position of tooltips or similar
   * @returns { The DOM element }
   */
  // Todo - Add support for horizontal scrolling
  calculateCoords: (
    overlayElement,
    targetElement,
    {
      top = false,
      right = false,
      bottom = false,
      left = false,
      center = false,
      offsetX = false,
      offsetY = false,
      offset = 1
    }
  ) => {
    offsetX = offsetX ? offsetX : offset;
    offsetY = offsetY ? offsetY : offset;

    if (!check.existWindow()) {
      throw Error(
        "Can't calculate coords because windows object doesn't exists"
      );
    }
    // Check if vertical scrollbar is present so we can add the scroll offset to the calculation
    let scrollBarIsPresent = overlay.checkScrollBar();
    let verticalScrollWidth = scrollBarIsPresent ? 16 : 0;
    let scrollY = scrollBarIsPresent ? window.scrollY : 0;

    let targetDimension = targetElement.getBoundingClientRect();
    let overlayDimension = overlayElement.getBoundingClientRect();

    let elementWidth = targetDimension.width;
    let elementHeight = targetDimension.height;
    let elementTop = targetDimension.top;
    let elementRight = targetDimension.right;
    let elementBottom = targetDimension.bottom;
    let elementLeft = targetDimension.left;

    let topPosition = window.innerHeight - elementTop - scrollY + offsetY;
    let bottomPosition = elementBottom + scrollY + offsetY;
    let leftPosition =
      window.innerWidth - elementLeft - verticalScrollWidth + offsetX;
    let rightPosition = elementRight + offsetX;
    let middlePosition =
      elementTop + scrollY + (elementHeight - overlayDimension.height) / 2;

    if (top) {
      overlayElement.style.bottom = `${topPosition}px`;
    }

    if (bottom) {
      overlayElement.style.top = `${bottomPosition}px`;
    }

    if (left) {
      overlayElement.style.right = `${leftPosition}px`;
    }

    if (right) {
      overlayElement.style.left = `${rightPosition}px`;
    }

    if ((!left && !right) || center) {
      leftPosition =
        elementLeft - offsetX - overlayDimension.width / 2 + elementWidth / 2;
      overlayElement.style.left = `${leftPosition}px`;
    }

    if (!top && !bottom) {
      overlayElement.style.top = `${middlePosition}px`;
    }

    overlayDimension = overlayElement.getBoundingClientRect();

    // We check for collision on window edges
    if (overlayDimension.left < 0) {
      overlayElement.style.left = `${offsetX}px`;
      overlayElement.style.right = "unset";
    }
    if (overlayDimension.right > window.innerWidth) {
      overlayElement.style.left = "unset";
      overlayElement.style.right = `${offsetX}px`;
    }
    if (overlayDimension.top < 0) {
      overlayElement.style.top = `${offsetX}px`;
      overlayElement.style.bottom = "unset";
    }
    if (overlayDimension.bottom > window.innerHeight) {
      overlayElement.style.top = "unset";
      overlayElement.style.bottom = `${offsetX}px`;
    }

    return overlayElement;
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
  date,
  overlay
};
export { gen, json, check, text, number, convert, css, date, overlay };
