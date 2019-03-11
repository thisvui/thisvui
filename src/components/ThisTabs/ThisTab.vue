<template>
  <transition :name="transitionClassName">
    <div :id="id" v-show="isActive" class="tab-pane">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import ThisIcon from "../ThisIcon/ThisIcon";

export default {
  name: "ThisTab",
  components: { ThisIcon },
  mixins: [common, sizes],
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String
    },
    selected: {
      default: false
    },
    transitionPrev: {
      type: String,
      default: "slidePrev"
    },
    transitionNext: {
      type: String,
      default: "slideNext"
    }
  },
  data() {
    return {
      isActive: this.selected,
      transitionClassName: null
    };
  },
  methods: {
    /**
     * Activate or deactivate tab pane based on the index. Also determines which transition class to use
     */
    activate(oldIndex, index, activate) {
      this.transitionClassName =
        index < oldIndex ? this.transitionNext : this.transitionPrev;
      this.isActive = this.getBoolean(activate);
    }
  }
};
</script>
