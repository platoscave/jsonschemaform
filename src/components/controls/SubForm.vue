<template>
    <el-form
      class="json-schema-form"
      :model="this.value"
      labelWidth="150px"
      labelPosition="left"
      size="small"
      @:input="$emit('input', $event)"
    >
      <el-form-item
        v-for="(property, propertyName) in properties"
        :key="propertyName"
        :label="property.title"
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
          <ar-control-selector
            :property="property"
            :propertyName="propertyName"
            :value="value[propertyName] ? value[propertyName] : ''"
            :required="required"
            :form-read-only="formReadOnly"
            :omit-empty-fields="omitEmptyFields"
            :hash-level="hashLevel"
          ></ar-control-selector>
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
      default: () => {}
    },    
    properties: {
      type: Object,
      default: () => {}
    },
    required: {
      type: Array,
      default: () =>[]
    }, 
    formReadOnly: Boolean,
    omitEmptyFields: Boolean,
    hashLevel: Number
  },
  methods: {
    onChange(newValue) {
      debugger;
      this.$set(this.value, propertyName, newValue);
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

/* Checkbox */
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

/* Radiobuttons */
.el-radio-group.ar-control {
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

/* Select */
.ar-control > .el-input > input {
  background-color: #ffffff08;
  border-color: #00adff42;
  font-size: 16px;
  height: 30px;
}

/* Readonly div */
.ar-rodiv.ar-control {
  background-color: #ffffff08;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  border-style: none;
  font-size: 16px;
  line-height: 30px;
}

/* info icon */
.el-icon-info {
  color: #00adffb3;
}
</style>