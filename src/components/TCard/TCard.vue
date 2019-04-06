<template>
  <div :id="id" :class="getClasses">
    <div class="card-content">
      <div v-if="renderMedia" class="media">
        <div v-if="figure" class="media-left">
          <t-image v-if="figureSrc" :src="figureSrc" :size="figureSize">
          </t-image>
          <t-icon v-if="figureIcon" :icon="figureIcon" :class="figureSize">
          </t-icon>
        </div>
        <div class="media-content">
          <t-level>
            <template slot="level-left">
              <p v-if="title" :class="getTitleClasses" v-text="title" />
              <p
                v-if="subtitle"
                :class="getSubtitleClasses"
                v-text="subtitle"
              />
            </template>
            <template slot="level-right">
              <slot name="title" />
            </template>
          </t-level>
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import TImage from "../TImage/TImage";
import TIcon from "../TIcon/TIcon";
import CssArchitect from "../../utils/css-architect";
import TLevel from "../TLevel/TLevel";

import colors from "../../mixins/colors";
import common from "../../mixins/common";

export default {
  name: "t-card",
  components: { TLevel, TIcon, TImage },
  mixins: [common, colors],
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    titleClass: {
      type: String
    },
    subtitleClass: {
      type: String
    },
    figure: {
      type: [String, Boolean]
    },
    figureSrc: {
      type: String
    },
    figureIcon: {
      type: String
    },
    figureSize: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("card");
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the title element
     * @returns { A String with the chained css classes }
     */
    getTitleClasses: function() {
      const cssArchitect = new CssArchitect("card-title");
      cssArchitect.addClass(this.titleClass, this.titleClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the subtitle element
     * @returns { A String with the chained css classes }
     */
    getSubtitleClasses: function() {
      const cssArchitect = new CssArchitect("card-subtitle");
      cssArchitect.addClass(
        this.subtitleClass,
        this.subtitleClass !== undefined
      );
      return cssArchitect.getClasses();
    },
    renderMedia: function() {
      return this.figure || this.title;
    }
  }
};
</script>
