<template>
  <div v-if="formReadOnly || property.readOnly" class="ar-rodiv">
    {{ value.join(", ") }}
  </div>

  <el-radio-group
    v-else-if="property.items.enum.length < 5"
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
      v-for="item in property.items.enum"
      :key="item"
      :label="item"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "ar-string-array",
  props: {
    value: {
      type: Array,
      default: () => [],
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
