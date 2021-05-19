<template>
  <div>
    <img class="ar-readonly-div" :src="value" />

    <div v-if="property.contentMediaType === 'image/svg+xml' && !readonly">
      <ar-tiptap
        v-on:input="$emit('input', $event)"
        :value="svgMarkup"
      ></ar-tiptap>
    </div>
  </div>
</template>

<script>
import Tiptap from "./TiptapEditor";
export default {
  name: "ar-image",
  components: {
    "ar-tiptap": Tiptap,
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
  computed: {
    svgMarkup: function () {
      const escapeHtml = (text) => {
        var map = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, function (m) {
          return map[m];
        });
      };
      if (this.property.contentEncoding === "base64") {
        return "<pre><code>" + escapeHtml(this.value) + "</code></pre>";
      }
      return "<pre><code>" + escapeHtml(this.value) + "</code></pre>";
    },
  },
};
</script>

<style scoped>
</style>
