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
          <toolbar-button 
            popup-text="Undo" 
            icon-name="undo"
            @buttonClicked="false" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Redo" 
            icon-name="redo"
            @buttonClicked="commands.redo" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Bold" 
            icon-name="bold"
            :is-active="isActive.bold()"
            @buttonClicked="commands.bold" >
          </toolbar-button>

          <!-- <el-tooltip content="Bold" placement="top-start" effect="dark">
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
          </el-tooltip> -->

          <!-- italic -->
          <toolbar-button 
            popup-text="Italic" 
            icon-name="italic"
            :is-active="isActive.italic()"
            @buttonClicked="commands.italic" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Strike Through" 
            icon-name="strike"
            :is-active="isActive.strike()"
            @buttonClicked="commands.strike" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Underline" 
            icon-name="underline"
            :is-active="isActive.underline()"
            @buttonClicked="commands.underline" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Code" 
            icon-name="code"
            :is-active="isActive.code()"
            @buttonClicked="commands.code" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Paragraph" 
            icon-name="paragraph"
            :is-active="isActive.paragraph()"
            @buttonClicked="commands.paragraph" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Header 1" 
            icon-name="h1"
            :is-active="isActive.heading({ level: 1 })"
            @buttonClicked="commands.heading({ level: 1 })" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Header 2" 
            icon-name="h2"
            :is-active="isActive.heading({ level: 2 }) "
            @buttonClicked="commands.heading({ level: 2 }) " >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Header 3" 
            icon-name="h3"
            :is-active="isActive.heading({ level: 3 })"
            @buttonClicked="commands.heading({ level: 3 })" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Unordered List" 
            icon-name="ul"
            :is-active="isActive.bullet_list()"
            @buttonClicked="commands.ul" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Ordered List" 
            icon-name="ol"
            :is-active="isActive.ordered_list() "
            @buttonClicked="commands.ol" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Quote" 
            icon-name="quote"
            :is-active="isActive.blockquote()"
            @buttonClicked="commands.blockquote" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Insert a Link" 
            icon-name="link"
            :is-active="isActive.link()"
            @buttonClicked="commands.link" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Link to Image" 
            icon-name="image"
            :is-active="isActive.image()"
            @buttonClicked="commands.image" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Code Block" 
            icon-name="code"
            :is-active="isActive.code()"
            @buttonClicked="commands.code" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Table" 
            icon-name="table"
            :is-active="isActive.table()"
            @buttonClicked="
                commands.createTable({
                  rowsCount: 3,
                  colsCount: 3,
                  withHeaderRow: true,
                })
              " >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Delete Table" 
            icon-name="delete_table"
            :is-active="isActive.delete_table()"
            @buttonClicked="commands.deleteTable" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Column Before" 
            icon-name="add_col_before"
            :is-active="isActive.add_col_before()"
            @buttonClicked="commands.addColumnBefore" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Column After" 
            icon-name="add_col_after"
            :is-active="isActive.add_col_after()"
            @buttonClicked="commands.addColumnAfter" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Delete Column" 
            icon-name="delete_col"
            :is-active="isActive.delete_col()"
            @buttonClicked="commands.deleteColumn" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Row Before" 
            icon-name="add_row_before"
            :is-active="isActive.add_row_before()"
            @buttonClicked="commands.addRowBefore" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Add Row After" 
            icon-name="add_row_after"
            :is-active="isActive.add_row_after()"
            @buttonClicked="commands.addRowAfter" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Delete Row" 
            icon-name="delete_row"
            :is-active="isActive.delete_row()"
            @buttonClicked="commands.deleteRow" >
          </toolbar-button>

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
          <toolbar-button 
            popup-text="Combine Cells" 
            icon-name="combine_cells"
            :is-active="isActive.combine_cells()"
            @buttonClicked="commands.toggleCellMerge" >
          </toolbar-button>

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

import ToolbarButton from "./ToolbarButton";
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
    ToolbarButton
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