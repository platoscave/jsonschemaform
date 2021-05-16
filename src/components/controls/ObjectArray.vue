<template>
  <div>
    <div v-for="(item, idx) in value" :key="idx">
      <ar-sub-form
        :schema="property"
        :value="item"
        :readonly="readonly"
        :required="required"
      ></ar-sub-form>
    </div>
  </div>
</template>

<script>
import Form from "./SubForm";

export default {
  name: "ar-object-array",
  components: {
    "ar-sub-form": Form,
  },
  props: {
    property: Object,
    value: Array,
    readonly: Boolean,
    required: Array,
  },
};
</script>

<style scoped>
</style>
