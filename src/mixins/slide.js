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
      type: Number,
      default: 300
    },
    unity: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [ Number, String ]
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
  methods: {
    handleOutsideClick(e) {
      this.$emit("clickedOutside", e);
    }
  }
};
