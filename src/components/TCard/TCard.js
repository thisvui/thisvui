import TImage from "../TImage/TImage";
import TIcon from "../TIcon/TIcon";
import TLevel from "../TLevel/TLevel";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import TFlex from "../TFlex/TFlex";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

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
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    let content = root.createDiv(this.getContentClasses);
    let contentBody = root.createDiv("content");
    contentBody.setChildren(this.$slots.default);

    // Creating the media element
    if (this.renderMedia) {
      let media = root.createDiv("media");
      let figure = root.createDiv("media-left");

      if (this.figureSrc) {
        let img = root.createElement(TImage);
        img.setProps({ src: this.figureSrc, size: this.figureSize });
        figure.addChild(img);
      }

      if (this.figureIcon) {
        let icon = root.createIcon(this.figureSize);
        icon.setProps({ icon: this.figureIcon });
        figure.addChild(icon);
      }

      let mediaContent = root.createDiv("media-content");
      let flex = root
        .createElement(TFlex)
        .setProps({ isFullwidth: true, alignSelf: "baseline" });
      let start = root.createElement(TFlex).setProps({
        isColumn: true,
        alignSelf: "start",
        justifyContent: "start"
      });

      if (this.title) {
        let title = root.createP(this.getTitleClasses);
        title.innerHtml(this.title);
        start.addChild(title);
      }

      if (this.subtitle) {
        let subtitle = root.createP(this.getSubtitleClasses);
        subtitle.innerHtml(this.subtitle);
        start.addChild(subtitle);
      }
      let end = root.createElement(TFlex).setProps({
        alignSelf: "baseline",
        justifyContent: "end",
        flexGrow: 1
      });
      end.setChildren(this.$slots["title"]);

      flex.addChild(start);
      flex.addChild(end);
      mediaContent.addChild(flex);
      media.addChild(figure, this.figure);
      media.addChild(mediaContent);
      content.addChild(media);
    }

    content.addChild(contentBody);
    root.addChild(content);
    return root.create();
  }
};
