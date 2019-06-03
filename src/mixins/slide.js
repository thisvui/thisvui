export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    isAbsolute: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 300
    },
    unity: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [Number, String]
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    animationFill: {
      type: String,
      default: "forwards"
    }
  },
  data() {
    return {
      calculatedWidth: parseInt(this.width)
    };
  },
  methods: {
    handleOutsideClick(e) {
      this.$emit(this.$thisvui.events.slide.clickedOutside, e);
    },
    updateCalculatedWith(width) {
      this.calculatedWidth = width;
      this.$emit(this.$thisvui.events.slide.changeWidth, this.calculatedWidth);
    }
  }
};
