<template>
  <div :class="getContainerClass">
    <div :class="getClasses">
      <label class="file-label file-label-container">
        <input
          :id="id"
          class="file-input"
          type="file"
          :disabled="isUploading"
          ref="files"
          @change="handleFilesUpload()"
          :accept="accept"
        />
        <span class="file-cta">
          <span class="file-icon">
            <t-icon
              :preserve-defaults="!overrideDefaults"
              :icon="$thisvui.icons.upload"
            ></t-icon>
          </span>
          <span class="file-label">
            <p v-if="isInitialUpload">
              {{ label }}
            </p>
            <p v-if="isUploading">Uploading {{ fileCount }} files...</p>
          </span>
        </span>
        <span class="file-name" v-if="fileHasName"> {{ fileName }}</span>
      </label>
      <t-buttons has-addons v-if="hasFiles" :class="getButtonContainerClasses">
        <span @click="reset()" v-if="!isUploading" :class="getClearClasses">
          <t-icon :icon="clearIcon"></t-icon
          ><span v-if="!hideButtonsLabels">{{ clearText }}</span>
        </span>
        <span
          @click="submitFiles()"
          v-if="showSubmitButton"
          :class="getSubmitClasses"
        >
          <t-icon :icon="submitIcon"></t-icon
          ><span v-if="!hideButtonsLabels">{{ submitText }}</span>
        </span>
      </t-buttons>
    </div>
    <div :class="getPreviewClasses" v-if="showPreview && hasPreview">
      <h2 v-if="isUploadSuccess" class="is-size-6">
        Uploaded {{ files.length }} file(s) successfully.
      </h2>
      <t-thumbnails>
        <t-thumbnail v-for="(file, key) in files" :key="key">
          <img class="image is-128x128" v-bind:ref="`image${parseInt(key)}`" />
          <h1>{{ file.name }}</h1>
        </t-thumbnail>
      </t-thumbnails>
    </div>
    <t-box v-if="isUploadFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </t-box>
  </div>
</template>

<script>
import input from "../../mixins/input";
import alignment from "../../mixins/alignment";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import TBox from "../TBox/TBox";
import TIcon from "../TIcon/TIcon";
import TThumbnails from "../TThumbnail/TThumbnails";
import TThumbnail from "../TThumbnail/TThumbnail";
import TButtons from "../TButton/TButtons";
import TButton from "../TButton/TButton";
import TTags from "../TTag/TTags";

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
      fileName: 0
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
      this.showPreview = true;
      this.getImagePreviews();
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
            function() {
              this.$refs[`image${parseInt(i)}`][0].src = reader.result;
            }.bind(this),
            false
          );

          // Read the data for the file in through the reader. When it has
          // been loaded, we listen to the event propagated and set the image
          // src to what was loaded from the reader.
          reader.readAsDataURL(this.files[i]);
        }
      }
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
