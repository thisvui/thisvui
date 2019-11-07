import utils from "../utils/utils";
import {
  Result,
  Rule,
  ValidationBus
} from "../components/TValidation/validation-bus.js";

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
      default: "Min value allowed is "
    },
    max: {
      type: Number
    },
    maxMessage: {
      type: String,
      default: "Max Value allowed is "
    },
    minLength: {
      type: Number
    },
    minLengthMessage: {
      type: String,
      default: "Min length allowed is "
    },
    maxLength: {
      type: Number
    },
    maxLengthMessage: {
      type: String,
      default: "Max length allowed is "
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
    }
  },
  data() {
    return {
      validationPassed: false,
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
    hasRules: function() {
      return this.rules.length > 0;
    },
    getValidationPassed: function() {
      return this.validationPassed;
    }
  },
  methods: {
    /**
     * Executes the validations for current element
     */
    validate(event) {
      const validator = ValidationBus.getValidator(
        this.id,
        this.validationScope
      );
      const element = validator.element;
      this.errors = [];
      if (this.getRequired && !utils.check.notEmpty(element.value)) {
        return this.getValidationResult(RULES.REQUIRED, event);
      }
      if (this.getNumeric && !utils.check.isNumeric(element.value)) {
        return this.getValidationResult(RULES.NUMERIC, event);
      }
      if (this.getEmail && !utils.check.validEmail(element.value)) {
        return this.getValidationResult(RULES.EMAIL, event);
      }
      if (this.min && utils.check.isLessThan(this.min)) {
        return this.getValidationResult(RULES.MIN, event);
      }
      if (this.max && utils.check.isGreaterThan(this.max)) {
        return this.getValidationResult(RULES.MAX, event);
      }
      if (this.minLength && !utils.check.minLength(this.minLength)) {
        return this.getValidationResult(RULES.MINLENGTH, event);
      }
      if (this.maxLength && !utils.check.maxLength(this.maxLength)) {
        return this.getValidationResult(RULES.MAXLENGTH, event);
      }
      this.stateClass = ""; // Changes the element css class to success when all validations passed
      this.validationPassed = true;
      return new Result(true, "success");
    },
    /**
     * Executes the validations for specific event
     */
    validateOnEvent(event) {
      let events = this.validateOn.split(",").map(item => item.trim());
      let validate = events.indexOf(event) > -1;
      if (this.hasRules && validate) {
        return this.validate(event);
      }
      return new Result(true, "success");
    },
    /**
     * Retrieves the validation result
     * return { A @link Result class object }
     */
    getValidationResult(rule, event) {
      const errorMessage = this.getErrorMessage(rule);
      this.errors.push(errorMessage);
      console.error(
        `Errors: ${this.errors.length} - Error Message: ${errorMessage}`
      );
      this.stateClass = this.errorClass; // Changes the element css class to error when validation failed
      this.validationPassed = false;
      return new Result(false, errorMessage);
    },
    /**
     * Builds the rules list based on props
     */
    generateRules() {
      this.rules = [];
      if (this.getRequired) {
        const rule = new Rule(RULES.REQUIRED);
        this.rules.push(rule);
      }
      if (this.getNumeric) {
        const rule = new Rule(RULES.NUMERIC);
        this.rules.push(rule);
      }
      if (this.getEmail) {
        const rule = new Rule(RULES.EMAIL);
        this.rules.push(rule);
      }
      if (this.min) {
        const rule = new Rule(RULES.MIN);
        this.rules.push(rule);
      }
      if (this.max) {
        const rule = new Rule(RULES.MAX);
        this.rules.push(rule);
      }
      if (this.minLength) {
        const rule = new Rule(RULES.MINLENGTH);
        this.rules.push(rule);
      }
      if (this.maxLength) {
        const rule = new Rule(RULES.MAXLENGTH);
        this.rules.push(rule);
      }
    },
    /**
     * Register a validator in the validation bus
     */
    addValidator() {
      this.generateRules();
      if (this.hasRules) {
        ValidationBus.registerValidator(
          this.id,
          this,
          this.rules,
          this.validationScope
        );
      }
    },
    /**
     * Removes a validator from the validation bus
     */
    removeValidator(formId) {
      ValidationBus.unregisterValidator(this.id, formId, this.validationScope);
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
          return this.minMessage + this.min;
        case RULES.MAX:
          return this.maxMessage + this.max;
        case RULES.MINLENGTH:
          return this.minLengthMessage + this.minLength;
        case RULES.MAXLENGTH:
          return this.maxLengthMessage + this.maxLength;
        default:
          return this.defaultErrorMessage;
      }
    }
  }
};
