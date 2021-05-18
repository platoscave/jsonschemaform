<template>

  <highlight-code
    v-if="formReadOnly || property.readOnly"
    class="highlight-code"
    readonly
    lang="json"
  > {{value}}
  </highlight-code>

  <ar-tiptap
    v-else
    v-on:input="$emit('input', $event)"
    :value="'<pre><code>' + value + '</code></pre>'"
  ></ar-tiptap>
  
</template>

<script>
import Tiptap from './TiptapEditor';

export default {
  name: "ar-json",  
  components: {
    'ar-tiptap': Tiptap,
  },  
  props: {
    value: String,
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
