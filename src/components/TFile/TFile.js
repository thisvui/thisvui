import alignment from "../../mixins/alignment";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";
import common from "../../mixins/common";
import states from "../../mixins/states";
import sizes from "../../mixins/sizes";
import display from "../../mixins/display";
import helpers from "../../mixins/helpers";
import {ComponentNames} from "../../utils/constants";

import TButtons from "../TButton/TButtons";
import TNotification from "../TNotification/TNotification";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  name: ComponentNames.TFile,
  components: {
    TButtons,
    TNotification
  },
  mixins: [common, alignment, icons, themes, states, sizes, display, helpers],
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    accept: {
      type: String,
      default: "*"
    },
    onSubmit: {
      type: Function
    },
    hasName: {
      type: Boolean
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    showSubmit: {
      type: Boolean,
      default: true
    },
    autoSubmit: {
      type: Boolean
    },
    targetClass: {
      type: String
    },
    hideButtonsLabels: {
      type: Boolean
    },
    chooseText: {
      type: String,
      default: "Choose your file(s)"
    },
    submitText: {
      type: String,
      default: "Submit"
    },
    submitIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.upload;
      }
    },
    submitClass: {
      type: String
    },
    clearText: {
      type: String,
      default: "Clear"
    },
    clearIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.remove;
      }
    },
    clearClass: {
      type: String
    },
    errorText: {
      type: String,
      default: "Upload Failed"
    }
  },
  data() {
    return {
      files: [],
      uploadError: null,
      currentStatus: null,
      showPreviewBox: false,
      fileName: null,
      fileCount: 0
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const css = new CssArchitect(ComponentNames.TFile);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__input`);
      return css.getClasses();
    },
    getLabelClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__label`);
      this.isFilled(css, { hoverable: true });
      css.addClass(this.getDisplayModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    getPreviewCss: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__preview`);
      css.flexible({ direction: "column" });
      this.isBordered(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      this.alpha(css, { border: 0.7 });
      return css;
    },
    getThumbnailsClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__preview--thumbnails`);
      return css.getClasses();
    },
    getThumbnailCss: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__preview--thumbnail`);
      this.isBordered(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      this.alpha(css, { border: 0.7 });
      return css;
    },
    getThumbnailTitleCss: function() {
      const css = new CssArchitect(`${ComponentNames.TFile}__preview--title`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      this.alpha(css, { bg: 0.9 });
      return css;
    },
    getClearClasses: function() {
      const css = new CssArchitect("is-shadowless");
      css.addClass("tint-50");
      css.addClass(this.clearClass);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    getSubmitClasses: function() {
      const css = new CssArchitect("is-shadowless");
      css.addClass("tint-50");
      css.addClass(this.submitClass);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    getButtonContainerClasses: function() {
      const css = new CssArchitect();
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted");
      return css.getClasses();
    },
    showSubmitButton() {
      return this.showSubmit && !this.autoSubmit && !this.isUploading;
    },
    hasFiles() {
      return this.files && this.files.length > 0;
    },
    isInitialUpload() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isUploading() {
      return this.currentStatus === STATUS_SAVING;
    },
    isUploadSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isUploadFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    /**
     * Resets data props that set the state
     */
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.files = [];
      this.uploadError = null;
      this.showPreviewBox = false;
      this.fileName = null;
      this.fileCount = 0;
    },
    /**
     * Builds the form data and execute the onSubmit function
     */
    async submitFiles() {
      this.currentStatus = STATUS_SAVING;
      if (this.onSubmit) {
        try {
          let formData = new FormData();

          // Iterate over any file sent over appending the files
          // to the form data.
          for (let i = 0; i < this.files.length; i++) {
            let file = this.files[i];

            formData.append("files[" + i + "]", file);
          }
          await this.onSubmit(formData, this.files);
          this.reset();
          this.$emit(this.$thisvui.events.file.uploaded);
          this.currentStatus = STATUS_SUCCESS;
        } catch (e) {
          console.error(e);
          this.$emit(this.$thisvui.events.file.failed);
          this.currentStatus = STATUS_FAILED;
        }
      } else {
        throw new Error(
          "You should provide an upload function trough the onSubmit prop"
        );
      }
    },
    /**
     * Handle the files upload process
     */
    handleFilesUpload() {
      //  Get the uploaded files from the input.
      let uploadedFiles = this.$refs.files.files;

      // Adds the uploaded file to the files array
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      this.fileName = uploadedFiles[0].name;
      this.fileCount = this.files.length;

      // Generate image previews for the uploaded files
      this.showPreviewBox = this.showPreview;
      if (this.showPreviewBox) {
        this.getImagePreviews();
      }
      // If autoSubmit is active we submit the files automatically
      if (this.autoSubmit) {
        this.submitFiles();
      }
    },

    /**
     * Gets the preview image for the file.
     */
    getImagePreviews() {
      // Iterate over all of the files and generate an image preview for each one.
      for (let i = 0; i < this.files.length; i++) {
        // Ensure the file is an image file
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          // Creates a new FileReader object
          let reader = new FileReader();

          // Add an event listener for when the file has been loaded
          // to update the src on the file preview.
          reader.addEventListener(
            "load",
            () => {
              this.$nextTick(function() {
                this.$refs[`${this.id}-image-${i}`][0].src = reader.result;
              });
            },
            false
          );

          // Read the data for the file in through the reader. When it has
          // been loaded, we listen to the event propagated and set the image
          // src to what was loaded from the reader.
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    /**
     * Creates the file input section
     */
    createInput(architect) {
      let root = architect.createDiv(`${ComponentNames.TFile}__wrapper`);

      // Creating the html input element
      let input = architect.createInput(`${ComponentNames.TFile}__input`);
      input.setId(this.id);
      input.setRef("files");
      let inputAttrs = {
        placeholder: this.placeholder,
        disabled: this.disabled || this.isUploading,
        validationScope: this.validationScope,
        type: "file",
        readonly: this.readonly,
        accept: this.accept
      };
      input.setAttrs(inputAttrs);
      input.addChange(this.handleFilesUpload);

      let fileIcon = architect.createSpan(`${ComponentNames.TFile}__icon`);
      let icon = architect.createIcon().setProps({
        icon: this.$thisvui.icons.upload,
        containerClass: this.getIconClasses,
        preserveDefaults: !this.overrideDefaults
      });
      fileIcon.addChild(icon);

      let label = architect.createLabel(this.getLabelClasses);
      label.addChild(fileIcon);
      let labelText = this.isUploading
        ? `Uploading ${this.fileCount} files...`
        : this.label;
      label.addVNode(labelText);
      label.addAttr("for", this.id);

      root.addChild(input);
      root.addChild(label);
      this.createButtons(root);
      architect.addChild(root);
    },
    /**
     * Creates the file buttons section
     */
    createButtons(architect) {
      let root = architect.createElement(
        TButtons,
        this.getButtonContainerClasses
      );
      root.setProps({ attached: true });

      // Creating the reset button
      let resetBtn = architect.createButton();
      resetBtn.setProps({
        icon: this.clearIcon,
        targetClass: this.getClearClasses,
        marginless: true
      });
      resetBtn.addChild(this.clearText, !this.hideButtonsLabels, true);
      resetBtn.addClick(this.reset);

      // Creating the submit button
      let submitBtn = architect.createButton();
      submitBtn.setProps({
        icon: this.submitIcon,
        targetClass: this.getSubmitClasses,
        marginless: true
      });
      submitBtn.addChild(this.submitText, !this.hideButtonsLabels, true);
      submitBtn.addClick(this.submitFiles);

      root.addChild(resetBtn, !this.isUploading);
      root.addChild(submitBtn, this.showSubmitButton);

      architect.addChild(root, this.hasFiles);
    },

    /**
     * Creates the file preview section
     */
    createPreview(architect) {
      if (this.showPreviewBox && this.showPreview) {
        let root = architect.createDiv(this.getPreviewCss.getClasses());
        root.setStyles(this.getPreviewCss.getStyles());
        this.createFailNotification(root);

        // Creating the thumbnails
        let thumbnails = architect.createDiv(this.getThumbnailsClasses);
        for (let index in this.files) {
          let file = this.files[index];
          let thumbnail = architect.createDiv(
            this.getThumbnailCss.getClasses()
          );
          thumbnail.setStyles(this.getThumbnailCss.getStyles());
          thumbnail.setKey(`${this.id}-thumb-${index}`);

          let img = architect.createImg("image");
          img.setKey(`${this.id}-image-${index}`);
          img.setRef(`${this.id}-image-${index}`, true);

          let name = architect.createH(
            6,
            this.getThumbnailTitleCss.getClasses()
          );
          name.setStyles(this.getThumbnailTitleCss.getStyles());
          let text =
            file.name.length > 16
              ? file.name.substring(0, 16) + "..."
              : file.name;
          name.innerHTML(text);

          thumbnail.addChild(img);
          thumbnail.addChild(name);
          thumbnails.addChild(thumbnail);
        }
        root.addChild(thumbnails);

        architect.addChild(root);
      }
    },
    /**
     * Creates the fail notification
     */
    createFailNotification(architect, condition = true) {
      if (this.isUploadFailed && condition) {
        let notification = architect.createElement(TNotification);
        notification.setProps({
          isDanger: true,
          closeButton: true,
          compact: true
        });
        notification.addVNode(this.errorText);
        architect.addChild(notification);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClasses);
    this.createInput(root);
    this.createFailNotification(root, !this.showPreview);
    this.createPreview(root);
    return root.create();
  },
  mounted() {
    this.reset();
  }
};
