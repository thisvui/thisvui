<template>
  <nav :id="id" :class="getClasses" aria-label="breadcrumbs">
    <ul v-if="!hasCustomContent">
      <li
        v-for="(item, index) in items"
        :class="{ 'is-active': item.isActive }"
        :key="`bcrumb${index}`"
      >
        <a v-if="!item.url && !item.view" @click="onClick(item.name, $event)">
          <t-icon v-if="item.icon" :icon="item.icon"></t-icon>
          <span>{{ item.name }}</span>
        </a>
        <a :href="item.url" v-if="item.url" @click="onClick(item.name, $event)">
          <t-icon v-if="item.icon" :icon="item.icon"></t-icon>
          <span>{{ item.name }}</span>
        </a>
        <router-link
          v-if="item.view"
          :to="{ name: item.view }"
          class="link"
          @click="onClick(item.name, $event)"
        >
          <t-icon v-if="item.icon" :icon="item.icon"></t-icon>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <slot v-if="hasCustomContent"></slot>
  </nav>
</template>

<script>
import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import TImage from "../TImage/TImage";
import CssArchitect from "../../utils/css-architect";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-breadcrumb",
  mixins: [common, alignment, sizes],
  components: { TIcon, TImage },
  props: {
    model: {
      type: Array
    },
    hasCustomContent: {
      type: Boolean,
      default: false
    },
    hasArrowSeparator: {
      type: Boolean,
      default: false
    },
    hasBulletSeparator: {
      type: Boolean,
      default: false
    },
    hasDotSeparator: {
      type: Boolean,
      default: false
    },
    hasSucceedsSeparator: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    /**
     * Build and returns the breadcrumb items
     */
    getItems() {
      let items = [];
      this.model.forEach(item => {
        item.isActive = false;
        items.push(item);
      });
      return items;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("breadcrumb");
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass("has-arrow-separator", this.hasArrowSeparator);
      cssArchitect.addClass("has-bullet-separator", this.hasBulletSeparator);
      cssArchitect.addClass("has-dot-separator", this.hasDotSeparator);
      cssArchitect.addClass(
        "has-succeeds-separator",
        this.hasSucceedsSeparator
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    /**
     * Determines which item is active
     */
    toggleActive(name) {
      let items = [];
      this.items.forEach(item => {
        item.isActive = item.name === name;
        items.push(item);
      });
      this.items = items;
    },
    /**
     * Executed when a breadcrumb item is clicked
     */
    onClick(name, event) {
      if (event) event.preventDefault();
      if (!this.hasCustomContent) {
        this.toggleActive(name);
        this.$emit("click", name);
      }
    }
  },
  created() {
    if (!this.hasCustomContent) {
      this.model.forEach(item => {
        item.isActive = false;
        this.items.push(item);
      });
    }
  }
};
</script>
