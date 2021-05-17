<template>
  <div v-if="formReadOnly || property.readOnly" class="ar-readonly-div">
    {{ value.join(", ") }}
  </div>

  <el-checkbox-group 
    v-else-if="property.items.enum.length < 5"
    @:input="$emit('input', $event)"
    :value="value"
  >
    <el-checkbox
      v-for="item in property.items.enum"
      :key="item"
      :label="item"
      :value="item"
    ></el-checkbox>
  </el-checkbox-group >
  <el-select v-else @:input="$emit('input', $event)" :value="value" multiple>
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
