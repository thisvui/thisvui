import mask from "./mask";

import utils from "../utils/utils";
import {
  Result,
  Rule,
} from "../components/TValidation/validation-bus";

export const RULES = Object.freeze({
  REQUIRED: Symbol("required"),
  NUMERIC: Symbol("numeric"),
  EMAIL: Symbol("email"),
  MIN: Symbol("min"),
  MAX: Symbol("max"),
  MINLENGTH: Symbol("minLength"),
  MAXLENGTH: Symbol("maxLength")
});

export default {
  mixins: [mask],
  props: {
    required: {
      type: Boolean,
      default: false
    },
    requiredMessage: {
      type: String,
      default: "Value is required"
    },
    numeric: {
      type: Boolean,
      default: false
    },
    numericMessage: {
      type: String,
      default: "Value must be a number"
    },
    email: {
      type: Boolean,
      default: false
    },
    emailMessage: {
      type: String,
      default: "Please enter a valid email address"
    },
    min: {
      type: Number
    },
    minMessage: {
      type: String,
      default: function() {
        return `Min value allowed is ${this.min}`;
      }
    },
    max: {
      type: Number
    },
    maxMessage: {
      type: String,
      default: function() {
        return `MinMax value allowed is ${this.max}`;
      }
    },
    minLength: {
      type: Number
    },
    minLengthMessage: {
      type: String,
      default: function() {
        return `Min length allowed is ${this.minLength}`;
      }
    },
    maxLength: {
      type: Number
    },
    maxLengthMessage: {
      type: String,
      default: function() {
        return `Max length allowed is ${this.maxLength}`;
      }
    },
    validateOn: {
      type: String,
      default: "blur"
    },
    validationScope: {
      type: String
    },
    errorClass: {
      type: String,
      default: "is-danger"
    },
    successClass: {
      type: String,
      default: "is-success"
    },
    msgPosition: {
      type: String,
      default: "right"
    },
    customValidators: Array,
    showSuccessIcon: Boolean,
    showErrorIcon: Boolean,
    popupMessage: Boolean,
    popupEvent: {
      type: String,
      default: "mouseenter"
    },
    successIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.validationSuccess;
      }
    },
    errorIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.validationError;
      }
    }
  },
  data() {
    return {
      validationPassed: false,
      validationResult: null,
      validatorLoaded: false,
      registrationFirstAttempt: false,
      stateClass: "",
      errors: [],
      rules: [],
      defaultErrorMessage: "Error in TInput"
    };
  },
  computed: {
    getRequired: function() {
      return this.required;
    },
    getNumeric: function() {
      return this.numeric;
    },
    getEmail: function() {
      return this.email;
    },
    getValidationPassed: function() {
      return this.validationPassed;
    },
    hasErrors: function() {
      return this.errors != null && this.errors.length > 0;
    }
  },
  watch: {
    required: function(newVal, oldVal) {
      if (this.getValidator()) {
        this.generateRules();
      }
    },
    customValidators: function(newVal, oldVal) {
      if (this.getValidator()) {
        this.generateRules();
      }
    }
  },
  methods: {
    hasRules() {
      return this.rules.length > 0;
    },
    /**
     * Executes the validations for current element
     */
    validate(event) {
      const validator = this.getValidator();
      const element = validator.element;
      this.errors = [];
      if (this.hasRules()) {
        for (let rule of this.rules) {
          let error = !rule.custom
            ? rule.validationFunction(element.value)
            : rule.validationFunction();
          if (error === true) {
            return this.getValidationError(rule.message, event);
          }
          if (error && error.message) {
            return this.getValidationError(error.message, event);
          }
        }
      }
      this.stateClass = ""; // Changes the element css class to success when all validations passed
      this.validationPassed = true;
      this.validationResult = new Result(true, "success");
      return this.validationResult;
    },
    /**
     * Executes the validations for specific event
     */
    validateOnEvent(event) {
      let events = this.validateOn.split(",").map(item => item.trim());
      let validate = events.indexOf(event) > -1;
      let result =
        this.hasRules() && validate
          ? this.validate(event)
          : new Result(true, "success");
      return result;
    },
    /**
     * Retrieves the validation result
     * return { A @link Result class object }
     */
    getValidationError(errorMessage, event) {
      this.errors.push(errorMessage);
      console.error(
        `Errors: ${this.errors.length} - Error Message: ${errorMessage}`
      );
      this.stateClass = this.errorClass; // Changes the element css class to error when validation failed
      this.validationPassed = false;
      let result = new Result(false, errorMessage);
      this.validationResult = result;
      return result;
    },
    /**
     * Builds the rules list based on props
     */
    generateRules() {
      this.rules = [];
      if (this.getRequired) {
        this.addRule(
          RULES.REQUIRED,
          this.getErrorMessage(RULES.REQUIRED),
          value => {
            return !utils.check.notEmpty(value);
          }
        );
      }
      if (this.getNumeric) {
        this.addRule(
          RULES.NUMERIC,
          this.getErrorMessage(RULES.NUMERIC),
          value => {
            let numericValue =
              this.mask && value
                ? parseFloat(utils.number.unFormat(value))
                : value;
            return !utils.check.isNumber(numericValue);
          }
        );
      }
      if (this.getEmail) {
        this.addRule(RULES.EMAIL, this.getErrorMessage(RULES.EMAIL), value => {
          return !utils.check.validEmail(value);
        });
      }
      if (this.min) {
        this.addRule(RULES.MIN, this.getErrorMessage(RULES.MIN), value => {
          return utils.check.isLessThan(value, this.min);
        });
      }
      if (this.max) {
        this.addRule(RULES.MAX, this.getErrorMessage(RULES.MAX), value => {
          return utils.check.isGreaterThan(value, this.max);
        });
      }
      if (this.minLength) {
        this.addRule(
          RULES.MINLENGTH,
          this.getErrorMessage(RULES.MINLENGTH),
          value => {
            return !utils.check.minLength(value, this.minLength);
          }
        );
      }
      if (this.maxLength) {
        this.addRule(
          RULES.MAXLENGTH,
          this.getErrorMessage(RULES.MAXLENGTH),
          value => {
            return !utils.check.maxLength(value, this.maxLength);
          }
        );
      }
      if (utils.check.notEmpty(this.customValidators)) {
        for (let cValidator of this.customValidators) {
          let { name, message, validationFunction } = cValidator;
          if (
            utils.check.notEmpty(name) &&
            utils.check.notEmpty(validationFunction)
          ) {
            this.addCustomRule(name, message, validationFunction);
          }
        }
      }
    },
    addRule(name, message, validationFunction, custom = false) {
      const rule = new Rule(name, message, validationFunction, custom);
      this.rules.push(rule);
      if(this.registrationFirstAttempt && !this.validatorLoaded){
        this.registerValidator();
      }
    },
    addCustomRule(name, message, validationFunction) {
      this.addRule(name, message, validationFunction, true);
    },
    registerValidator(){
      if (this.hasRules()) {
        this.$validation.registerValidator(
          this.id,
          this,
          this.rules,
          this.validationScope
        );
        this.validatorLoaded = true;
      }
      if(!this.registrationFirstAttempt){
        this.registrationFirstAttempt = true
      }
    },
    /**
     * Register a validator in the validation bus
     */
    addValidator() {
      this.generateRules();
      this.registerValidator();
    },
    /**
     * Removes a validator from the validation bus
     */
    removeValidator(formId) {
      if (this.hasRules()) {
        this.$validation.unregisterValidator(this.id, formId, this.validationScope);
      }
    },
    /**
     * Removes a validator from the validation bus
     */
    getValidator() {
      return  this.$validation.getValidator(this.id, this.validationScope);
    },
    /**
     * Returns the error message for specific rule type
     * return { A String }
     */
    getErrorMessage(type) {
      switch (type) {
        case RULES.REQUIRED:
          return this.requiredMessage;
        case RULES.NUMERIC:
          return this.numericMessage;
        case RULES.EMAIL:
          return this.emailMessage;
        case RULES.MIN:
          return this.minMessage;
        case RULES.MAX:
          return this.maxMessage;
        case RULES.MINLENGTH:
          return this.minLengthMessage;
        case RULES.MAXLENGTH:
          return this.maxLengthMessage;
        default:
          return this.defaultErrorMessage;
      }
    }
  }
};
