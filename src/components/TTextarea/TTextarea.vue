<template>
  <div :class="getContainerClass">
    <span
      v-if="labelIcon !== undefined && !getBoolean(labelIconRight)"
      :class="getLabelIconClass"
    >
      <t-icon :icon="labelIcon"></t-icon>
    </span>
    <label :for="id" v-if="!getRemoveLabel" :class="getLabelClass">{{
      label
    }}</label>
    <span
      v-if="labelIcon !== undefined && getBoolean(labelIconRight)"
      :class="getLabelIconClass"
    >
      <t-icon :icon="labelIcon"></t-icon>
    </span>
    <div :class="getControlClass">
      <textarea
        :class="getTextareaClass"
        ref="inputField"
        :id="id"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :validation-scope="validationScope"
        :rows="rows"
        :cols="cols"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
      >
      </textarea>
      <span v-if="icon" :class="getIconClass">
        <t-icon :preserve-defaults="!overrideDefaults" :icon="icon"></t-icon>
      </span>
      <span v-if="valid" class="icon is-right has-text-success">
        <t-icon
          :preserve-defaults="!overrideDefaults"
          :icon="$thisvui.icons.check"
        />
      </span>
      <template v-for="error in errors">
        <p
          :key="error"
          class="help is-danger"
          :msg="error"
          :msg-position="msgPosition"
        ></p>
      </template>
    </div>
  </div>
</template>

<script>
import input from "../../mixins/input";
import utils from "../../utils/utils";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-textarea",
  components: { TIcon },
  mixins: [input],
  props: {
    rows: {
      type: Number
    },
    cols: {
      type: Number
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      this.validateOnEvent("input");
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.$emit("input", value);
    }
  }
};
</script>
