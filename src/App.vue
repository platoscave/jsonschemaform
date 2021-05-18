<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Fix message box */
.el-message__content {
  color: #eee !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
/* Fix drop down */
li.el-select-dropdown__item {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 28px;
}
.el-scrollbar {
  background: #232323;
  border-color: #524f4f;
  border-style: solid;
  border-radius: 6px;
  border-width: 1px;
}
/* Fix Tooltip */
div.el-tooltip__popper.is-dark {
  background: #232323;
  border-color: #524f4f;
  border-style: solid;
  border-radius: 6px;
  border-width: 1px;
  color: #eee !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 28px;
}
/* Fix multiselect 
.el-select .el-tag {
  background-color: #ffffff08 !important;
}
.el-select__tags-text {
  color: #00adff;
}*/
</style>
