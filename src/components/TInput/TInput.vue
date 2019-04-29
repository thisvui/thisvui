<template>
  <div :class="getContainerClass">
    <div class="field-label is-normal" v-if="label">
      <t-icon
        v-if="labelIcon !== undefined && !labelIconRight"
        :icon="labelIcon"
        :class="getLabelIconClass"
      ></t-icon>
      <label v-if="!getRemoveLabel" :class="getLabelClass">{{ label }}</label>
      <t-icon
        v-if="labelIcon !== undefined && labelIconRight"
        :icon="labelIcon"
        :class="getLabelIconClass"
      ></t-icon>
    </div>
    <div class="field-body">
      <div class="field">
        <div :class="getControlClass">
          <input
            ref="inputField"
            :id="id"
            :class="getInputClass"
            :placeholder="placeholder"
            :value="value"
            :disabled="disabled"
            :validation-scope="validationScope"
            :type="type"
            :readonly="readonly"
            :min="min"
            :max="max"
            @input="onInput"
            @blur="onBlur"
            @change="onChange"
            @keyup.enter="onEnter"
          />
          <t-icon v-if="icon" :icon="icon" :class="getIconClass"></t-icon>
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
    </div>
  </div>
</template>

<script>
import input from "../../mixins/input";
import utils from "../../utils/utils";
import TIcon from "../TIcon/TIcon";

export default {
  name: "t-input",
  components: { TIcon },
  mixins: [input],
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      this.validateOnEvent("input");
      // Transforms the value if transform is active
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.$emit("input", value);
    }
  }
};
</script>
