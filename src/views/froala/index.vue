<template>
  <div id="app">
    <froala :config="config" v-model="content"></froala>
  </div>
</template>

<script>
import jQuery from 'jquery';
import VueFroala from 'vue-froala-wysiwyg';
export default {
  name: 'app',
  data() {
    return {
      config: {
        // zIndex: 2501,
        // width:900, //宽度可设置
        height: 500,//高度可以设置
        heightMax: 800, // heightMax heightMin 都可以设置
        toolbarSticky: true,
        autofocus: true,
        // 上方的工具栏
        toolbarButtons: [
          "fullscreen",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "|",
          "paragraphFormat",
          "fontFamily",
          "fontSize",
          "paragraphStyle",
          "color",
          "inlineClass",
          "inlineStyle",
          "lineHeight",
          "|",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "quote",
          "-",
          "insertLink",
          "insertImage",
          // "insertVideo",
          "embedly",
          // "insertFile",
          "insertTable",
          "|",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "insertHR",
          "selectAll",
          "clearFormatting",
          "|",
          "print",
          // "getPDF",
          "spellChecker",
          "help",
          "html",
          "|",
          "undo",
          "redo"
        ],
        placeholderText: "请输入内容......",
        language: "zh_cn",
        imageDefaultWidth: 500,
        //图片的上传地址 ，请不要删除，thanks
        // imageUploadURL: "xxxxxx",
        // imageManagerLoadURL: "xxxxxx",

        fontFamily: {
          "Microsoft YaHei": "微软雅黑",
          SimSun: "宋体",
          NSimSun: "新宋体",
          SimHei: "黑体",
          "Microsoft JhengHei": "微软正黑体",
          KaiTi: "楷体",
          "Roboto,sans-serif": "Roboto",
          "Oswald,sans-serif": "Oswald",
          "Montserrat,sans-serif": "Montserrat",
          "'Open Sans Condensed',sans-serif": "Open Sans Condensed",
          "Arial,Helvetica,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Impact,Charcoal,sans-serif": "Impact",
          "Tahoma,Geneva,sans-serif": "Tahoma",
          "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
          "Verdana,Geneva,sans-serif": "Verdana"
        },
        quickInsertButtons: ["image", "table", "embedly", "ul", "ol", "hr"],

        paragraphFormatSelection: true,
        fontFamilySelection: true,
        fontSizeSelection: true,
        tabSpaces: 4,

        // 请求头 请暂时不要delete
        // requestHeaders: { Authorization: localStorage.eleToken },

        events: {
          "froalaEditor.initialized": () => {
            console.log("initialized");
          }
        }
      },
      content: ""
    }
  }
}
</script>


<style type="text/css">
  /* 取消froala富文本编辑器的红框Unlicend Copy of the froala editor, use it legally by purchasing a license */
  /* a[href="https://froala.com/wysiwyg-editor"], a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
    display: none !important;
    position: absolute;
    top: -99999999px;
    } */
</style>