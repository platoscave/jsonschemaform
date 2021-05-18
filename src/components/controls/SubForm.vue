<template>
  <el-form
    class="json-schema-form"
    :model="this.value"
    labelWidth="150px"
    labelPosition="left"
    size="small"
  >
    <!-- :prop is needed for validation rules -->
    <el-form-item
      v-for="(property, propertyName) in properties"
      :key="propertyName"
      :label="property.title"
      :prop="propertyName"
    >
      <!-- Label with tooltip -->
      <div v-if="property.description" slot="label">
        <span>{{ property.title + " " }}</span>
        <el-tooltip :content="property.description">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <!-- The control -->
      <template slot-scope="scope">
        <!-- 
            readonly is used by standard input elements and in css to remove blue border
            form-read-only and omit-empty-fields are passed in case we're creating a subForm
            hash-level is only used if we have a mongoQuery (to get selectedObjectId from hash)
           -->
        <ar-control-selector
          class="ar-control"
          :property="property"
          :value="value ? value[propertyName] : null"
          v-on:input="(newValue) => $set(value, propertyName, newValue)"
          :propertyName="propertyName"
          :required="required"
          :readonly="formReadOnly || property.readOnly"
          :form-read-only="formReadOnly"
          :omit-empty-fields="omitEmptyFields"
          :hash-level="hashLevel"
          type="textarea"
          autosize
        ></ar-control-selector>
        <!-- 
            :value="value ? value[propertyName] : null"
            v-on:input="newValue => $set(value, propertyName, newValue)"
            
            v-model="value[propertyName]"
            
            :value="value[propertyName] ? value[propertyName] : ''"
           -->
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
/* eslint-disable vue/no-unused-components */
//import WidgetMixin from "../../lib/widgetMixin";
import ControlSelector from "./ControlSelector";
import Enum from "./Enum";
import Form from "./SubForm";
import Image from "./Image";
import Json from "./Json";
import NestedObject from "./NestedObject";
import ObjectArray from "./ObjectArray";
//import Select from './Select';
import StringArray from "./StringArray";
import Tiptap from "./TiptapEditor";

export default {
  name: "ar-sub-form",
  //mixins: [WidgetMixin],
  components: {
    "ar-control-selector": ControlSelector,
    "ar-enum": Enum,
    "ar-sub-form": Form,
    "ar-image": Image,
    "ar-json": Json,
    "ar-nested-object": NestedObject,
    "ar-object-array": ObjectArray,
    //'ar-select': Select,
    "ar-string-array": StringArray,
    "ar-tiptap": Tiptap,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    properties: {
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
  watch: {
    value: {
      handler: function (val, oldVal) {
        console.log(val);
      },
      deep: true,
    },
  },
};
</script>

<style >
.json-schema-form {
  max-width: 750px;
}
/* Controls */
.ar-control > input {
  background-color: #ffffff08;
  border-color: #00adff42;
  font-size: 16px;
  height: 30px;
}
.ar-control > input[readonly] {
  border-style: none;
}
.Xar-control > .el-input__inner:hover {
  border-color: #00adff42;
}

/* Checkbox Boolean*/
label.el-checkbox.ar-control {
  background-color: #ffffff08;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  border-color: #00adff66;
  border-style: solid;
  border-width: 1px;
  font-size: 16px;
  line-height: 30px;
}



/* Readonly div */
.ar-readonly-div.ar-control {
  background-color: #ffffff08;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  border-style: none;
  font-size: 16px;
  line-height: 30px;
}

/* Textarea */
.el-textarea__inner {
  background-color: #ffffff08;
  border-color: #00adff66;
}

/* info icon */
.el-icon-info {
  color: #00adffb3;
}
</style>