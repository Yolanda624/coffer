1. run vue create name 

2. yarn add jquery  or  npm install jquery --save

3. yarn add babel-runtime@6.26.0. or  npm install babel-runtime@6.26.0 --save
   
4. yarn add froala-editor or npm install froala-editor --save  
5. yarn add vue-froala-wysiwyg or npm i vue-froala-wysiwyg --save  
   注意一定要保证babel-runtime完整下载完成后，再下载froala。要不然装包froala会失败。

6. froala 上方的操作按钮需要图标 font-awesome 的支持,所以也需要安装
   yarn add font-awesome or npm install font-awesome --save 

7. 
 >main.js

```javascript
    import jquery from 'jquery'
    window.jquery = window.$ = jquery
```

5. 
 >main.js

```javascript
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)
```
6.  
 >app.vue

```javascript
<template>
  <div id="app">
    <froala tag="textarea" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'app',
  data () {
    return {
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script>
```

7.
    yarn serve or npm serve