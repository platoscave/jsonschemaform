<template>
  <div>
    <editor-menu-bar
      v-if="
        readonly === false &&
        (typeof value === 'object' || !value.startsWith('<pre><code>'))
      "
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div class="menubar">
        <!-- button must have type="button" since we are in a form
        See https://github.com/ueberdosis/tiptap/issues/729 -->
        <div class="toolbar">
          <!-- undo -->
          <!-- <el-tooltip content="Undo" placement="top-start" effect="dark">
            <button type="button" class="menubar__button" @click="commands.undo">
              <svg class="icon undo">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#undo'"
                ></use>
              </svg>
            </button>
          </el-tooltip> -->

          <!-- redo -->
          <!-- <el-tooltip content="Redo" placement="top-start" effect="dark">
            <button type="button" class="menubar__button" @click="commands.redo">
              <svg class="icon redo">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#redo'"
                ></use>
              </svg>
            </button>
          </el-tooltip> -->

          <!-- bold -->
          <el-tooltip content="Bold" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <svg class="icon bold">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#bold'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- italic -->
          <el-tooltip content="Italic" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <svg class="icon italic">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#italic'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- strike -->
          <el-tooltip
            content="Strike Through"
            placement="top-start"
            effect="dark"
          >
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
              <svg class="icon strike">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#strike'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- underline -->
          <el-tooltip content="Underline" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <svg class="icon underline">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#underline'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- code -->
          <el-tooltip content="Code" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code"
            >
              <svg class="icon code">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#code'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- paragraph -->
          <el-tooltip
            content="Add Paragraph"
            placement="top-start"
            effect="dark"
          >
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <svg class="icon paragraph">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#paragraph'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- header 1 -->
          <el-tooltip content="Header 1" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              H1
            </button>
          </el-tooltip>

          <!-- header 2 -->
          <el-tooltip content="Header 2" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              H2
            </button>
          </el-tooltip>

          <!-- header 3 -->
          <el-tooltip content="Header 3" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              H3
            </button>
          </el-tooltip>

          <!-- ul -->
          <el-tooltip
            content="Unordered List"
            placement="top-start"
            effect="dark"
          >
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <svg class="icon ul">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#ul'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- ol -->
          <el-tooltip
            content="Ordered List"
            placement="top-start"
            effect="dark"
          >
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <svg class="icon ol">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#ol'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- quote -->
          <el-tooltip content="Quote" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <svg class="icon quote">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#quotes'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- link -->
          <!-- TODO See https://github.com/ueberdosis/tiptap/blob/main/examples/Components/Routes/Links/index.vue -->
          <!-- <el-tooltip content="Insert a Link" placement="top-start" effect="dark">
            <button type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.link() }"
              @click="commands.link"
            >
              <svg class="icon link">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#link'"
                ></use>
              </svg>
            </button>
          </el-tooltip> -->

          <!-- image -->
          <el-tooltip
            content="Link to Image"
            placement="top-start"
            effect="dark"
          >
            <button
              type="button"
              class="menubar__button"
              @click="showImagePrompt(commands.image)"
            >
              <svg class="icon image">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#image'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- code_block -->
          <el-tooltip content="Code Block" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
            >
              <svg class="icon code">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#code'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <!-- table -->
          <el-tooltip content="Add Table" placement="top-start" effect="dark">
            <button
              type="button"
              class="menubar__button"
              @click="
                commands.createTable({
                  rowsCount: 3,
                  colsCount: 3,
                  withHeaderRow: false,
                })
              "
            >
              <svg class="icon table">
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  :xlink:href="'toolbar-symbols.svg#table'"
                ></use>
              </svg>
            </button>
          </el-tooltip>

          <span v-if="isActive.table()">
            <!-- delete_table -->
            <el-tooltip
              type="button"
              content="Delete Table"
              placement="top-start"
              effect="dark"
            >
              <button class="menubar__button" @click="commands.deleteTable">
                <svg class="icon delete_table">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#delete_table'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- add_col_before -->
            <el-tooltip
              content="Add Column Before"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.addColumnBefore"
              >
                <svg class="icon add_col_before">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#add_col_before'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- add_col_after -->
            <el-tooltip
              content="Add Column After"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.addColumnAfter"
              >
                <svg class="icon add_col_after">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#add_col_after'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- delete_col-->
            <el-tooltip
              content="Delete Column"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.deleteColumn"
              >
                <svg class="icon delete_col">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#delete_col'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- add_row_before-->
            <el-tooltip
              content="Add Row Before"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.addRowBefore"
              >
                <svg class="icon add_row_before">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#add_row_before'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- add_row_after-->
            <el-tooltip
              content="Add Row After"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.addRowAfter"
              >
                <svg class="icon add_row_after">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#add_row_after'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- delete_row-->
            <el-tooltip
              content="Delete Row"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.deleteRow"
              >
                <svg class="icon delete_row">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#delete_row'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>

            <!-- combine_cells-->
            <el-tooltip
              content="Combine Cells"
              placement="top-start"
              effect="dark"
            >
              <button
                type="button"
                class="menubar__button"
                @click="commands.toggleCellMerge"
              >
                <svg class="icon combine_cells">
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    :xlink:href="'toolbar-symbols.svg#combine_cells'"
                  ></use>
                </svg>
              </button>
            </el-tooltip>
          </span>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content
      class="editor-content"
      :editor="editor"
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
      v-on:inputjson="$emit('inputjson', $event)"
    />
  </div>
</template>

<script>

// Tiptap version 2 will improve v-model
// https://stackoverflow.com/questions/63912152/how-can-i-put-content-from-tiptap-text-editor-into-a-v-model

import EditorContent from "./TiptapContent";
import { Editor, EditorMenuBar } from "tiptap";
import {
  CodeBlockHighlight,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  Image,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";

import javascript from "highlight.js/lib/languages/javascript";
//import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    value: [String, Object],
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new CodeBlockHighlight({
            languages: {
              javascript,
              json,
              xml,
            },
          }),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Image(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        emptyDocument: {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        },
      }),
    };
  },
  watch: {
    readonly: {
      immediate: true,
      handler() {
        this.editor.options.editable = !this.readonly;
        // also update the editor border:
        this.editor.view.update(this.editor.view.props);
      },
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
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
.menubar__button {
  color: lightgray;
  font-size: 16px;
  background-color: #ffffff1a;
  border-radius: 4px;
  border-color: #00adff66;
  border-style: solid;
  border-width: 1px;
  padding-top: 4px;
  margin-right: 3px;
}
.menubar__button.is-active {
  background-color: #00adff66;
}
.editor-content >>> .ProseMirror {
  background-color: #ffffff08;
  border-color: #00adff66;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border-spacing: 0px;
}
.editor-content >>> .ProseMirror[contenteditable="false"] {
  border-width: 0px;
}
.editor-content >>> .ProseMirror > pre {
  line-height: 20px;
}
.editor-content >>> td {
  background-color: #ffffff0d;
  padding: 5px;
  border-radius: 4px;
  min-width: 20px;
  vertical-align: top;
}
.editor-content >>> p {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>