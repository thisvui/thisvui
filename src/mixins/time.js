import { getDigit, activeNumbers } from "../utils/pad";

const digits = [
  { value: 1, active: true, pressed: false },
  { value: 2, active: true, pressed: false },
  { value: 3, active: true, pressed: false },
  { value: 4, active: true, pressed: false },
  { value: 5, active: true, pressed: false },
  { value: 6, active: true, pressed: false },
  { value: 7, active: true, pressed: false },
  { value: 8, active: true, pressed: false },
  { value: 9, active: true, pressed: false },
  { value: 0, active: true, pressed: false }
];

export default {
  props: {
    showSeconds: {
      type: Boolean
    }
  },
  data() {
    return {
      selectedTime: null,
      inputTime: null,
      activeIndex: 0,
      time: null,
      isOpen: false,
      digits: digits,
      arrowKeys: {
        left: {
          pressed: false
        },
        right: {
          pressed: false
        }
      }
    };
  },
  methods: {
    resetArrowsPressed() {
      this.arrowKeys.left.pressed = false;
      this.arrowKeys.right.pressed = false;
    },
    digitPressed(digit) {
      let pressedDigit = getDigit(this.digits, digit);
      pressedDigit.pressed = true;
    },
    arrowPressed(direction) {
      this.arrowKeys[direction].pressed = true;
    },
    digitSelected(digit, evt) {
      if (evt) {
        evt.preventDefault();
      }

      if (!getDigit(this.digits, digit).active) {
        getDigit(this.digits, digit).pressed = false;
        return;
      }

      getDigit(this.digits, digit).pressed = false;

      this.$set(this.time, this.activeIndex, digit);

      if (this.activeIndex === this.time.length - 1) {
        this.$emit("close");
      }

      this.goToNext();
    },
    arrowSelected(direction) {
      if (direction === "left") {
        this.goToPrevious();
      }
      if (direction === "right") {
        this.goToNext();
      }

      if (direction === "up") {
        let nextValue = parseInt(this.time[this.activeIndex]) + 1;
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.$set(this.time, this.activeIndex, nextValue);
        }
      }
      if (direction === "down") {
        let nextValue = parseInt(this.time[this.activeIndex]) - 1;
        if (activeNumbers(this.filteredDigits).indexOf(nextValue) > -1) {
          this.$set(this.time, this.activeIndex, nextValue);
        }
      }
    },
    goToNext(evt) {
      if (evt) {
        evt.preventDefault();
      }
      let threshold = this.showSeconds ? 5 : 3;
      if (this.activeIndex < threshold) {
        this.activeIndex++;
        this.arrowKeys["right"].pressed = false;
      }
    },
    goToPrevious(evt) {
      if (evt) {
        evt.preventDefault();
      }
      if (this.activeIndex > 0) {
        this.activeIndex--;
        this.arrowKeys["left"].pressed = false;
      }
    },
    blurEl(el) {
      el.blur();
    }
  }
};
