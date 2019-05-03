<template>
  <transition :name="transitionClassName">
    <div :id="id" v-show="isActive" class="tab-pane">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import common from "../../mixins/common";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-tab",
  components: { TIcon },
  mixins: [common],
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
      this.isActive = activate;
    }
  }
};
</script>
