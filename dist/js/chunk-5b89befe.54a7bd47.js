(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b89befe"],{"6b40":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"store_categories"},[i("global-toolbar",{attrs:{title:"store-categories","action-button":"","action-button-text":"create"},on:{ButtonClicked:function(t){return e.initDialog("create")}}}),i("v-data-table",{attrs:{headers:e.headers,items:e.items,"hide-default-footer":"",loading:e.loading.table},scopedSlots:e._u([{key:"item",fn:function(t){var a=t.item,o=t.index;return[i("tr",[i("td",[e._v(e._s(a.name))]),i("td",{staticClass:"table-logo"},[i("v-avatar",{staticClass:"square"},[i("img",{attrs:{src:a[e.config.imgType].path,alt:a[e.config.imgType].description},on:{click:function(t){return e.handleImgPreview(a[e.config.imgType].path)}}})])],1),i("td",[i("v-chip",{staticClass:"color-chip",attrs:{color:a.color}})],1),i("td",[i("v-btn",{attrs:{icon:""},on:{click:function(t){return e.initDialog("update",a)}}},[i("v-icon",{attrs:{medium:"",title:"edit"}},[e._v("mdi-pencil")])],1),i("v-btn",{attrs:{icon:""}},[i("v-icon",{attrs:{medium:"",title:"delete"},on:{click:function(t){return e.handleDelete(a.slug,o)}}},[e._v("\n              mdi-delete")])],1)],1)])]}}])}),i("DialogComponent",{scopedSlots:e._u([{key:"heading",fn:function(){return[i("v-card-title",[e._v(e._s(e.dialogTitle))])]},proxy:!0},e.dialog?{key:"body",fn:function(){return[i("action",{tag:"component",attrs:{"curr-item":e.editingItem,"action-type":e.actionType,config:e.config,dialog:e.dialog},on:{closed:e.handleDialogClose}})]},proxy:!0}:null],null,!0),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}}),i("global-image-preview",{attrs:{"image-path":e.currImg,"show-dialog":e.imgPreviewDialog},on:{closePreview:e.closePreview}})],1)},o=[],n=i("8165"),l={name:"Categories",components:{action:()=>Promise.all([i.e("chunk-47aa1273"),i.e("chunk-2d0d2ba1")]).then(i.bind(null,"5a76"))},mixins:[n["a"]],data(){return{headerValues:["name","icon","color","actions"],model:{name:"",color:"",icon:null},config:{idType:"slug",modelName:"store-categories",imgType:"icon"}}}},s=l,c=i("2877"),r=i("6544"),d=i.n(r),g=i("8212"),h=i("8336"),m=i("99d9"),u=i("cc20"),p=i("8fea"),b=i("132d"),f=Object(c["a"])(s,a,o,!1,null,null,null);t["default"]=f.exports;d()(f,{VAvatar:g["a"],VBtn:h["a"],VCardTitle:m["c"],VChip:u["a"],VDataTable:p["a"],VIcon:b["a"]})},8165:function(e,t,i){"use strict";var a=i("297e"),o=i("2cc4"),n=i("9257");t["a"]={mixins:[n["a"]],data(){return{items:[],actionType:"",editingItem:{},loading:{table:!1},dialog:!1}},computed:{headers(){return Object(a["a"])(this.headerValues)},dialogTitle(){return"update"===this.actionType?this.$t("heading.edit"):this.$t("heading.create")}},created(){this.fetchItems()},methods:{fetchItems(){this.loading.table=!0,Object(o["b"])({reqName:this.config.modelName}).then(e=>{this.items=e.data.data,this.loading.table=!1}).catch(()=>this.loading.table=!1)},initDialog(e,t){this.actionType=e,this.editingItem="update"===e?t:this.model,this.dialog=!0},handleDialogClose(){this.dialog=!1,this.fetchItems()},handleDelete(e,t){this.popUp(this.$t("message.delete")).then(i=>{i.dismiss||(this.loading.table=!0,Object(o["a"])({reqName:this.config.modelName,id:e}).then(()=>{this.items.splice(t,1),this.loading.table=!1}).catch(()=>{this.loading.table=!1}))})}}}},9257:function(e,t,i){"use strict";t["a"]={data(){return{imgPreviewDialog:!1,currImg:""}},methods:{handleImgPreview(e){this.currImg=e,this.imgPreviewDialog=!0},closePreview(){this.imgPreviewDialog=!1}}}}}]);
//# sourceMappingURL=chunk-5b89befe.54a7bd47.js.map