<template>
  <div
    v-if="formReadOnly || property.readOnly || property.enum.length < 2"
    class="ar-rodiv"
  >
    {{value}}
  </div>

  <el-radio-group
    v-else-if="property.enum.length < 5"
    @:input="$emit('input', $event)"
    :value="value"
  >
    <el-radio
      v-for="item in property.enum"
      :key="item"
      :label="item"
      :value="item"
    ></el-radio>
  </el-radio-group>
  <el-select v-else @:input="$emit('input', $event)" :value="value">
    <el-option
      v-for="item in property.enum"
      :key="item"
      :label="item"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "ar-enum",
  props: {
    value: {
      type: String,
      default: '',
    },
    property: {
      type: Object,
      default: () => {},
    },
    required: {
      type: Array,
      default: () => [],
    },
    formReadOnly: Boolean,
    omitEmptyFields: Boolean,
    hashLevel: Number,
  },
};
</script>

<style scoped>
</style>
