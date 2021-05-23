<template>
  <div>
    <el-row>
      <el-switch
        v-model="readonly"
        active-text="ReadOnly"
        inactive-text="Read/Write"
      >
      </el-switch>
    </el-row>
    <el-row>
      <el-switch
        v-model="omitEmptyFields"
        active-text="Omit Empty Fields"
        inactive-text="Include Empty Fields"
        :disabled="!this.readonly"
      >
      </el-switch>
    </el-row>
    <el-row>
      <button type="primary" plain @click="validateForm()">Validate</button>
      <button type="primary" plain @click="resetForm()">Reset</button>
    </el-row>
    <div>Valid: {{ valid }}</div>

    <hr />
    <!-- Form header with tooltip -->
    <h3 v-if="schema.title && schema.description">
      <span>{{ schema.title + " " }}</span>
      <el-tooltip :content="schema.description">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </h3>
    <h3 v-else-if="schema.title"></h3>

    <!-- The table -->
    <ar-sub-table
      ref="schemaTable"
      class="json-schema-form"
      v-model="dataObj"
      :properties="schema.properties"
      :requiredArr="schema.required"
      :form-read-only="readonly"
      :omit-empty-fields="omitEmptyFields"
      :hash-level="0"
      v-on:change="onChange"
    >
      <!-- 
      @:input="value => alert(value)"

     -->
    </ar-sub-table>
    <hr />

    <h4>dataObj</h4>
    <highlight-code lang="json" class="highlight-code">{{
      dataObj
    }}</highlight-code>

    <h4>Schema</h4>
    <highlight-code lang="json" class="highlight-code">{{
      schema
    }}</highlight-code>
  </div>
</template>

<script>
export default {
  name: "ar-json-schema-form",
  data() {
    return {
      readonly: false,
      omitEmptyFields: false,
      dataObj: [
        {
          logEntry: "Whats up",
          personalia: {
            first: "aaaaaaaa",
            last: "bbbbbbb",
            birthday: "2021-03-08",
          },
        },
        {
          logEntry: "nothing to see here",
          personalia: {
            first: "cccccc",
            last: "dddddddd",
            birthday: "2021-03-08",
          },
        },
      ],
      valid: false,
      schema: {
        $schema: "http://json-schema.org/draft-04/schema#",
        type: "object",
        title: "Newsletter Subscription",
        description:
          "Sign up for free newsletters and get more delivered to your inbox",
        properties: {
          personalia: {
            title: "Personalia",
            type: "object",
            properties: {
              first: {
                type: "string",
                maxLength: 80,
                title: "First Name",
              },
              last: {
                type: "string",
                maxLength: 80,
                title: "Last Name",
              },
              birthday: {
                type: "string",
                format: "date-time",
                title: "Birthday",
                attrs: {
                  type: "date",
                },
              },
            },
            required: ["birthday"],
          },
          logEntry: {
            type: "string",
            maxLength: 80,
            title: "Log Entry",
          },
        },

        additionalProperties: false,
        required: ["text", "email", "multiSelect2", "datetime"],
      },
    };
  },
  methods: {
    onChange(value) {
      this.dataObj = value;
    },
    validateForm() {
      let aaa = this.$refs["schemaTable"].validate().then(
        (value) => {
          this.valid = true;
        },
        (reason) => {
          this.valid = false;
        }
      );
      //console.log(aaa);
      //aaa
    },
    resetForm() {
      this.$refs["schemaTable"].resetFields();
    },
  },
};
</script>

<style scoped>
/* info icon */
.el-icon-info {
  color: #00adffb3;
}
.highlight-code >>> .hljs {
  background: unset;
  line-height: 20px;
  font-size: 14px;
}
el-row {
  margin: 10px;
}
</style>

