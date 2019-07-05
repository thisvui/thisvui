import input from "../../mixins/input";
import alignment from "../../mixins/alignment";
import icons from "../../mixins/icons";
import TBox from "../TBox/TBox";
import TIcon from "../TIcon/TIcon";
import TThumbnails from "../TThumbnail/TThumbnails";
import TThumbnail from "../TThumbnail/TThumbnail";
import TButtons from "../TButton/TButtons";
import TButton from "../TButton/TButton";
import TTags from "../TTag/TTags";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export default {
  name: "t-file",
  components: {
    TTags,
    TButton,
    TButtons,
    TThumbnail,
    TThumbnails,
    TIcon,
    TBox
  },
  mixins: [input, alignment, icons],
  props: {
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
    hasPreview: {
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
    isBoxed: {
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
      type: String,
      default: "is-light has-text-link"
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
      type: String,
      default: "is-light has-text-danger"
    }
  },
  data() {
    return {
      files: [],
      uploadError: null,
      currentStatus: null,
      showPreview: false,
      fileName: null,
      fileCount: 0
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-file file");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("has-name", this.fileHasName);
      cssArchitect.addClass("is-boxed", this.isBoxed);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    getPreviewClasses: function() {
      const cssArchitect = new CssArchitect("t-file-preview");
      cssArchitect.isFlexible("column");
      this.colorize(cssArchitect, "border", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getClearClasses: function() {
      const cssArchitect = new CssArchitect(
        "button is-shadowless is-radiusless"
      );
      cssArchitect.addClass(this.clearClass);
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    getSubmitClasses: function() {
      const cssArchitect = new CssArchitect("button is-shadowless");
      cssArchitect.addClass(this.submitClass);
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    getButtonContainerClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("t-flex align-self-end", this.isBoxed);
      return cssArchitect.getClasses();
    },
    fileHasName() {
      return this.hasName && this.fileName !== null;
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
      this.showPreview = false;
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
      this.showPreview = this.hasPreview;
      if (this.showPreview) {
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
      let root = architect.createLabel("file-label file-label-container");

      // Creating the html input element
      let input = architect.createInput("file-input");
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
      input.addEvent("change", this.handleFilesUpload);

      let fileCta = architect.createSpan("file-cta");
      let fileIcon = architect.createSpan("file-icon");
      let icon = architect.createIcon().setProps({
        icon: this.$thisvui.icons.upload,
        preserveDefaults: !this.overrideDefaults
      });
      let fileLabel = architect.createSpan("file-label");
      let label = architect.createP();
      label.innerHtml(
        this.isInitialUpload
          ? this.label
          : `Uploading ${this.fileCount} files...`
      );
      let filename = architect.createSpan("file-name");
      filename.innerHtml(this.fileName);

      fileIcon.addChild(icon);
      fileLabel.addChild(label);
      fileCta.addChild(fileIcon);
      fileCta.addChild(fileLabel);
      root.addChild(input);
      root.addChild(fileCta);
      root.addChild(filename, this.fileHasName);
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
      root.setProps({ hasAddons: true });

      // Creating the reset button
      let resetBtn = architect.createButton();
      resetBtn.setProps({
        icon: this.clearIcon,
        targetClass: this.getClearClasses
      });
      resetBtn.addChild(this.clearText, !this.hideButtonsLabels, true);
      resetBtn.addClick(this.reset);

      // Creating the submit button
      let submitBtn = architect.createButton();
      submitBtn.setProps({
        icon: this.submitIcon,
        targetClass: this.getSubmitClasses
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
      if (this.showPreview && this.hasPreview) {
        let root = architect.createDiv(this.getPreviewClasses);

        let h2 = architect.createH("is-size-6", 2);
        h2.innerHtml(`Uploaded ${this.files.length} file(s) successfully.`);

        // Creating the reset button
        let thumbnails = architect.createElement(TThumbnails);
        for (let index in this.files) {
          let file = this.files[index];
          let thumbnail = architect.createElement(TThumbnail);
          thumbnail.setKey(`${this.id}-thumb-${index}`);
          let img = architect.createImg("image is-128x128");
          img.setKey(`${this.id}-image-${index}`);
          img.setRef(`${this.id}-image-${index}`, true);

          let name = architect.createH();
          name.innerHtml(file.name);

          thumbnail.addChild(img);
          thumbnail.addChild(name);
          thumbnails.addChild(thumbnail);
        }
        root.addChild(h2, this.isUploadSuccess);
        root.addChild(thumbnails);

        architect.addChild(root);
      }
    },
    /**
     * Creates the fail box section
     */
    createFailBox(architect) {
      if (this.isUploadFailed) {
        let root = architect.createElement(TBox);

        let h2 = architect.createH("is-size-6", 2);
        h2.innerHtml(`Upload failed.`);

        // Creating the reset button
        let resetBtn = architect.createButton(this.getClearClasses);
        resetBtn.setProps({ icon: this.clearIcon });
        resetBtn.innerHtml(this.clearText, !this.hideButtonsLabels);
        resetBtn.addClick(this.reset);

        let error = architect.createElement("pre");
        error.innerHtml(this.uploadError);

        root.addChild(h2);
        root.addChild(resetBtn);
        root.addChild(error);

        architect.addChild(root);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClasses);

    let content = root.createDiv(this.getClasses);

    this.createInput(content);
    this.createButtons(content);
    root.addChild(content);

    this.createPreview(root);
    this.createFailBox(root);
    return root.create();
  },
  mounted() {
    this.reset();
  }
};
