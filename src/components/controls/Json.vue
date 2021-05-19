<template>

  <highlight-code
    v-if="readonly"
    class="highlight-code ar-readonly-div"
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
    value: {
      type: String,
      default: '',
    },
    property: {
      type: Object,
      default: () => {},
    },
    readonly: Boolean,
  },
};
</script>

<style scoped>

/* Readonly div */
.ar-readonly-div {
  background-color: #ffffff08;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  border-style: none;
  font-size: 16px;
  line-height: 30px;
  min-height: 30px;
}
</style>
