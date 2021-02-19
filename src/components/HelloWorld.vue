<template>
  <div>
    <el-row>
    <el-switch
      v-model="readonly"
      active-text="ReadOnly"
      inactive-text="Read/Write"
    >
    </el-switch>
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
    <json-schema-form
      ref="schemaForm"
      class="json-schema-form"
      v-model="dataObj"
      :schema="schema"
      :form-read-only="readonly"
      :omit-empty-fields="omitEmptyFields"
      v-on:change="onChange"
    >
    </json-schema-form>
    <hr />

    <h4>dataObj</h4>
    <highlight-code lang="json">{{
      JSON.stringify(dataObj, null, 4)
    }}</highlight-code>

    <h4>Schema</h4>
    <highlight-code lang="json">{{
      JSON.stringify(schema, null, 4)
    }}</highlight-code>

    <h4>State</h4>
    <pre>{{ state }} </pre>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import JsonSchemaForm from './JsonSchemaForm';

export default {
  name: "hello-world",
  components: {
    'json-schema-form': JsonSchemaForm
  },
  data() {
    return {
      readonly: false,
      omitEmptyFields: false,
      dataObj: {
        textarea: "Through the\ngrapevine.",
        enum: "Promotion",
        multiSelect: ["Promotion", "Weekly News"],
        multiSelect2: ["Promotion", "Weekly News"],
        subFormArr: [
          {
            logEntry: "First entry",
            datetime: "2021-01-21T23:00:00.000Z",
          },
          {
            logEntry: "Second entry",
          },
        ],
        htmlDoc:
          '<h3>HTML stored as string</h3><p>The table editor is still a bit quirky. Tiptap version 2 is said to improve on this. Watch this spot.</p><table><tbody><tr><td data-colwidth="61"><p></p></td><td data-colwidth="79"><p>A</p></td><td data-colwidth="25"><p>B</p></td></tr><tr><td data-colwidth="61"><p>R1</p></td><td data-colwidth="79"><p>R1A</p></td><td data-colwidth="25"><p>R1B</p></td></tr><tr><td data-colwidth="61"><p>R2</p></td><td data-colwidth="79"><p>R2A</p></td><td data-colwidth="25"><p>R2B</p></td></tr></tbody></table>',
        htmlDoc2: {
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: {
                level: 3,
              },
              content: [
                {
                  type: "text",
                  text: "HTML stored as json",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text:
                    "This is an example of HTML stored as json. One of the advantages of storing it this way is, you can easily sanatize/validate it server-side, using jsonschema.",
                },
              ],
            },
          ],
        },
        icon:
          "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGc+CiAgICA8cGF0aCBmaWxsPSIjODBiM2ZmIiBkPSJNIDEyLjQ3MjQzNSwwLjQ1NDUxNDU4IDEyLjY2MTgzNSwxNy4xNDk5NTcgMS41NzA5MjM4LDE4LjAwNzMzOCBaIi8+CiAgICA8cGF0aCBmaWxsPSIjODBiM2ZmIiBkPSJtIDE0LjI3NzY2NiwzLjMzMDI1MiAwLjQwNDE2MSwxMy41MjMyMzggOC4wMDgwMTYsMC41ODg2NDcgeiIvPgogICAgPHBhdGggZmlsbD0iIzgwODBmZiIgZD0iTSAwLjE0MTQwNTMyLDE5LjQ2MjE3OCA5LjY1MjUxNjMsMjMuODcyMTIyIDIzLjk3NjcxMSwxOC4zNjkxOTggWiIvPgogIDwvZz4KPC9zdmc+",
        json:
          '{\n  json: {\n    type: "string",\n    title: "Json",\n    contentMediaType: "application/json",\n  }\n}',
      },
      state: {},
      valid: false,
      schema: {
        $schema: "http://json-schema.org/draft-04/schema#",
        type: "object",
        title: "Newsletter Subscription",
        description:
          "Sign up for free newsletters and get more delivered to your inbox",
        properties: {
          text: {
            type: "string",
            minLength: 6,
            maxLength: 80,
            title: "Full Name",
            attrs: {
              placeholder: "Your Full Name",
            },
            description: "This is a tooltip description",
          },
          email: {
            type: "string",
            format: "email",
            maxLength: 120,
            title: "Email",
            attrs: {
              type: "email",
              placeholder: "name@provider.com",
            },
          },
          password: {
            type: "string",
            title: "Password",
            default: "hello",
            attrs: {
              type: "password",
            },
          },
          regex: {
            type: "string",
            title: "RegEx",
            pattern: "[a-e]+",
          },
          number: {
            type: "number",
            title: "Number",
            minimum: 10,
            maxmaximum: 100,
            precision: 2,
          },
          datetime: {
            type: "string",
            format: "date-time",
            title: "Date Time",
            attrs: {
              type: "datetime",
            },
          },
          boolean: {
            type: "boolean",
            title: "I agree to the terms and conditions.",
          },
          enum: {
            type: "string",
            title: "Select String",
            description: "From less than five options",
            enum: ["Daily New", "Promotion"],
          },
          enum2: {
            type: "string",
            title: "Select String",
            description: "From more than four options",
            enum: [
              "Promotion",
              "Daily News",
              "Weekly News",
              "Mothly News",
              "Anual News",
            ],
            attrs: {
              placeholder: "Select subscription",
            },
          },
          multiSelect: {
            type: "array",
            title: "Multi Select",
            items: {
              type: "string",
              enum: ["Promotion", "Daily News", "Weekly News"],
            },
            description: "From less than five options",
          },
          multiSelect2: {
            type: "array",
            title: "Multi Select",
            items: {
              type: "string",
              enum: [
                "Promotion",
                "Daily News",
                "Weekly News",
                "Mothly News",
                "Anual News",
              ],
            },
            description: "From more than four options",
          },
          textarea: {
            type: "string",
            maxLength: 120,
            title: "Textarea",
            description: "Auto grow.",
            attrs: {
              type: "textarea",
              placeholder: "How did you hear about us?",
            },
          },
          htmlDoc: {
            type: "string",
            contentMediaType: "text/html",
            maxLength: 1000,
            title: "HTML Document",
            attrs: {
              placeholder: "Tell us about your vacation.",
            },
          },
          htmlDoc2: {
            type: "string",
            contentEncoding: "json",
            contentMediaType: "text/html",
            maxLength: 1000,
            title: "HTML Document",
            attrs: {
              placeholder: "Tell us about your vacation.",
            },
          },
          icon: {
            type: "string",
            title: "base64 SVG Icon",
            contentEncoding: "base64",
            contentMediaType: "image/svg+xml",
            description:
              'Try adding <circle fill="lightblue" cx="12" cy="12" r="12"/> after <g>',
          },
          json: {
            type: "string",
            title: "Json",
            contentMediaType: "application/json",
          },
          subFormObj: {
            title: "Nested Object",
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
              subFormObj: {
                title: "Dubble Nested Object",
                type: "object",
                properties: {
                  pet: {
                    type: "string",
                    maxLength: 80,
                    title: "Favorite Pet",
                  },
                },
                //required: ["pet"],
              },
            },
          },
          subFormArr: {
            title: "Array of Objects",
            type: "array",
            items: {
              type: "object",
              properties: {
                datetime: {
                  type: "string",
                  format: "date-time",
                  title: "Timestamp",
                  default: "now",
                  attrs: {
                    type: "datetime",
                  },
                },
                logEntry: {
                  type: "string",
                  maxLength: 500,
                  title: "Log",
                  attrs: {
                    type: "textarea",
                    placeholder: "What happend?",
                  },
                },
              },
        //required: ["logEntry"],
            },
            attrs: {
              draggable: true,
            },
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
      let aaa = this.$refs["schemaForm"].validate().then(
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
      this.$refs["schemaForm"].resetFields();
    },
  },
};
</script>


<style scoped>
pre {
  text-align: left;
}
.json-schema-form {
  max-width: 750px;
}
.hljs .json {
  background: inherit;
}
.json-schema-form >>> .control-background {
  background-color: #ffffff08;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  border-color: #00adff66;
  border-style: solid;
  border-width: 1px;
  min-height: 30px;
}
.json-schema-form >>> .subform-background {
  background-color: #ffffff08;
  padding: 10px;
  min-height: 30px;
  border-radius: 4px;
}
.json-schema-form >>> .el-form-item--small.el-form-item:last-child {
  margin-bottom: 0px;
}
.json-schema-form >>> .el-icon-info {
  color: #00adffb3;
}
.json-schema-form >>> .el-input__inner {
  background-color: #ffffff08;
  border-color: #00adff66;
}
.json-schema-form >>> .el-textarea__inner {
  background-color: #ffffff08;
  border-color: #00adff66;
}
.json-schema-form >>> .el-select.el-select--small {
  border-radius: 4px;
  border-color: #00adff66;
  border-style: solid;
  border-width: 1px;
}
.json-schema-form >>> .el-tag {
  background-color: #ffffff08;
}
.json-schema-form >>> .el-select__tags-text {
  color: #00adff;
}
.json-schema-form >>> .el-input__inner::placeholder {
  color: #00adff66;
}
.json-schema-form >>> input[readonly] {
  border-width: 0px;
}
.json-schema-form >>> textarea[readonly] {
  border-width: 0px;
}
.json-schema-form >>> div[readonly] {
  border-width: 0px;
}
.json-schema-form >>> p {
  line-height: 24px;
}
.json-schema-form >>> h1 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
.json-schema-form >>> h2 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
.json-schema-form >>> h3 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}

/* For the array of objects */
.json-schema-form >>> .subform-margin-bottom {
  margin-bottom: 10px;
}
.json-schema-form >>> .selected {
  border-color: #eee;
  border-style: solid;
  border-width: 1px;
}
.json-schema-form >>> .subform-margin-bottom:hover {
  cursor: pointer;
}
.json-schema-form >>> .drop-separator {
  background-color: #00adff66;
  height: 1px;
  border: none;
}
</style>
