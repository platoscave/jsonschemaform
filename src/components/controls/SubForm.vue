<template>
  <!-- :rules is needed for validation rules -->
  <el-form
    class="json-schema-form"
    :model="this.value"
    :rules="validationRules"
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
      <span v-if="property.description" slot="label">
        <span>{{ property.title + " " }}</span>
        <el-tooltip :content="property.description">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </span>
      <!-- The control -->
      <template slot-scope="scope">
        <!-- 
            readonly is used by standard input elements to disable input and in css to remove blue border
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
        ></ar-control-selector>
        <!-- 
            :value="value ? value[propertyName] : null"
            v-on:input="newValue => $set(value, propertyName, newValue)"
            
            v-model="value[propertyName]"
            
            :value="value[propertyName] ? value[propertyName] : ''"
          type="textarea"
          autosize
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
  computed: {
    
    // Create the validation rules Object
    validationRules: function ()  {
      let rulesObj = {}
      for (var propertyName in this.properties) {
        const property = this.properties[propertyName]

        // no rules for readonly
        if ((this.formReadOnly || property.readonly)) return []

        let rulesArr = []
        if (this.required.includes(propertyName)) {
          rulesArr.push({ required: true, message: property.title + ' is required.' })
        }

        if (property.minLength) {
          rulesArr.push({ min: property.minLength, message: 'Please enter at least ' + property.minLength + ' characters.' })
        }

        // email
        if (property.format) {
          if (property.format === 'email') {
            rulesArr.push({ type: 'email', message: 'Please enter a valid email address. eg: name@provider.com' })
          }
          else if (property.format === 'uri') {
            rulesArr.push({ type: 'url', message: 'Please enter a valid url. eg: https://provider.com' })
          }
        }

        if (property.pattern) {
          rulesArr.push({ pattern: property.pattern, message: ' Input must comply with: ' + property.pattern })
        }

        rulesObj[propertyName] = rulesArr
      }


      return rulesObj
    }
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
/* Input Control */
.ar-control > input {
  background-color: #ffffff08;
  border-color: #00adff42;
  font-size: 16px;
  height: 30px;
}
.ar-control > input[readonly] {
  border-style: none;
}
.el-input__inner::placeholder {
  color: #666;
}
/* TODO how do we get rid of hover? */
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

/* Textarea */
.el-textarea__inner {
  background-color: #ffffff08;
  border-color: #00adff66;
  /* TODO must resize textarea
  font-size: 16px;
  line-height: 30px; */
}
.el-textarea__inner[readonly] {
  border-style: none;
}

/* info icon */
.el-icon-info {
  color: #00adffb3;
}
</style>