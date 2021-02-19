<template>
<div>
  <el-tooltip content="Bold" placement="top-start" effect="dark">
    <!-- button must have type="button" since we are in a form See https://github.com/ueberdosis/tiptap/issues/729 -->
    <button
      type="button"
      class="menubar__button"
      :class="{ 'is-active': isActive.bold() }"
    >
      <svg class="icon bold">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :xlink:href="'toolbar-symbols.svg#' + this.iconName"
        ></use>
      </svg>
    </button>
  </el-tooltip>
  </div>
</template>

<script>
import toolbarSymbols from "./toolbar-symbols.svg";

export default {
  name: "toolbar-button",
  components: {
    toolbarSymbols,
  },
  props: {
    isActive: Object,
    popupText: String,
    iconName: String,
  },
};
</script>
<style scoped>
.icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  fill: lightgray;
}
</style>