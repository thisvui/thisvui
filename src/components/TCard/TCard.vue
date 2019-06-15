<template>
  <div :id="id" :class="getClasses">
    <div :class="getContentClasses">
      <div v-if="renderMedia" class="media">
        <div v-if="figure" class="media-left">
          <t-image v-if="figureSrc" :src="figureSrc" :size="figureSize">
          </t-image>
          <t-icon v-if="figureIcon" :icon="figureIcon" :class="figureSize">
          </t-icon>
        </div>
        <div class="media-content">
          <t-flex is-fullwidth align-self="baseline">
            <t-flex
              flex-direction="column"
              align-self="start"
              justify-content="start"
            >
              <p v-if="title" :class="getTitleClasses" v-text="title" />
              <p
                v-if="subtitle"
                :class="getSubtitleClasses"
                v-text="subtitle"
              />
            </t-flex>
            <t-flex align-self="baseline" justify-content="end" :flex-grow="1">
              <slot name="title" />
            </t-flex>
          </t-flex>
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
import TFlex from "../TFlex/TFlex";

export default {
  name: "t-card",
  components: { TFlex, TLevel, TIcon, TImage },
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
      type: Boolean
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
      const cssArchitect = new CssArchitect(
        "card t-flex flex-direction-column align-items-stretch"
      );
      this.colorize(cssArchitect, "bg-color", true);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    getContentClasses: function() {
      const cssArchitect = new CssArchitect("card-content");
      cssArchitect.addClass("is-fullwidth");
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
