<template>
  <div>
    <div v-for="(item, idx) in value" :key="idx" class="ar-subform-background">
      <ar-sub-form
        :properties="property.items.properties"
        :value="item"
        :required="property.items.required"
        :form-read-only="formReadOnly"
        :omit-empty-fields="omitEmptyFields"
        :hash-level="hashLevel"
        v-on:input="$emit('input', $event)"
      ></ar-sub-form>
      <i class="el-icon-close" @click="value.splice(idx, 1)"></i>
    </div>
    <i class="el-icon-plus" @click="value.push({})"></i>
  </div>
</template>

<script>
//import Form from "./SubForm"; // must be declared globally

export default {
  name: "ar-object-array",
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
  mounted: function () {
    //debugger;
  },
};
</script>

<style scoped>
/* subForm background */
.ar-subform-background {
  background-color: #ffffff08;
  padding: 10px;
  border-radius: 4px;
  border-style: none;
  margin-bottom: 10px;
  position: relative;
}
/* Icons */
.el-icon-close {
  position: absolute;
  margin: 3px;
  top: 0px;
  right: 0;
  background-color: #ff4000a3;
  color: #eee;
  z-index: 20;
  border-radius: 50%;
}
.el-icon-plus {
  margin: 3px;
  background-color: green;
  color: #eee;
  z-index: 20;
  border-radius: 50%;
}
</style>
