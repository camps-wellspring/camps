(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b89a0e4"],{"6f49":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"technologies"},[i("global-toolbar",{attrs:{title:"technologies","action-button":"","action-button-text":"create"},on:{ButtonClicked:function(t){return e.initDialog("create")}}}),i("v-data-table",{attrs:{headers:e.headers,items:e.items,"disable-pagination":"","hide-default-footer":"",loading:e.loading.table},scopedSlots:e._u([{key:"item",fn:function(t){var a=t.item,n=t.index;return[i("tr",[i("td",[e._v(e._s(a.name))]),i("td",{staticClass:"table-logo"},[i("v-avatar",{staticClass:"square"},[i("img",{attrs:{src:a[e.config.imgType].path,alt:a[e.config.imgType].description},on:{click:function(t){return e.handleImgPreview(a[e.config.imgType].path)}}})])],1),i("td",[i("v-chip",{staticClass:"color-chip",attrs:{color:a.color}})],1),i("td",{staticClass:"text-center"},[i("toggle-service",{attrs:{"is-edit":!0,"model-name":e.config.modelName,"model-id":a.id,field:"visible",validate:!0},model:{value:a.visible,callback:function(t){e.$set(a,"visible",t)},expression:"item.visible"}})],1),i("td",[i("v-btn",{attrs:{icon:""},on:{click:function(t){return e.initDialog("update",a)}}},[i("v-icon",{attrs:{medium:"",title:"edit"}},[e._v("mdi-pencil")])],1),i("v-btn",{attrs:{icon:""}},[i("v-icon",{attrs:{medium:"",title:"delete"},on:{click:function(t){return e.handleDelete(a.id,n)}}},[e._v("\n              mdi-delete")])],1)],1)])]}}])}),i("DialogComponent",{scopedSlots:e._u([{key:"heading",fn:function(){return[i("v-card-title",[e._v(e._s(e.dialogTitle))])]},proxy:!0},e.dialog?{key:"body",fn:function(){return[i("action",{tag:"component",attrs:{"curr-item":e.editingItem,"action-type":e.actionType,config:e.config,dialog:e.dialog},on:{closed:e.handleDialogClose}})]},proxy:!0}:null],null,!0),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}}),i("global-image-preview",{attrs:{"image-path":e.currImg,"show-dialog":e.imgPreviewDialog},on:{closePreview:e.closePreview}})],1)},n=[],o=i("8165"),l={name:"Platforms",components:{action:()=>Promise.all([i.e("chunk-47aa1273"),i.e("chunk-2d0e13b6")]).then(i.bind(null,"7a0f"))},mixins:[o["a"]],data(){return{headerValues:["name","icon","color","visible","actions"],model:{name:"",color:"",icon:null},config:{modelName:"platforms",imgType:"icon"}}}},s=l,c=i("2877"),d=i("6544"),r=i.n(d),g=i("8212"),m=i("8336"),h=i("99d9"),u=i("cc20"),p=i("8fea"),f=i("132d"),b=Object(c["a"])(s,a,n,!1,null,null,null);t["default"]=b.exports;r()(b,{VAvatar:g["a"],VBtn:m["a"],VCardTitle:h["c"],VChip:u["a"],VDataTable:p["a"],VIcon:f["a"]})},8165:function(e,t,i){"use strict";var a=i("297e"),n=i("2cc4"),o=i("9257");t["a"]={mixins:[o["a"]],data(){return{items:[],actionType:"",editingItem:{},loading:{table:!1},dialog:!1}},computed:{headers(){return Object(a["a"])(this.headerValues)},dialogTitle(){return"update"===this.actionType?this.$t("heading.edit"):this.$t("heading.create")}},created(){this.fetchItems()},methods:{fetchItems(){this.loading.table=!0,Object(n["b"])({reqName:this.config.modelName}).then(e=>{this.items=e.data.data,this.loading.table=!1}).catch(()=>this.loading.table=!1)},initDialog(e,t){this.actionType=e,this.editingItem="update"===e?t:this.model,this.dialog=!0},handleDialogClose(){this.dialog=!1,this.fetchItems()},handleDelete(e,t){this.popUp(this.$t("message.delete")).then(i=>{i.dismiss||(this.loading.table=!0,Object(n["a"])({reqName:this.config.modelName,id:e}).then(()=>{this.items.splice(t,1),this.loading.table=!1}).catch(()=>{this.loading.table=!1}))})}}}},9257:function(e,t,i){"use strict";t["a"]={data(){return{imgPreviewDialog:!1,currImg:""}},methods:{handleImgPreview(e){this.currImg=e,this.imgPreviewDialog=!0},closePreview(){this.imgPreviewDialog=!1}}}}}]);
//# sourceMappingURL=chunk-5b89a0e4.935083eb.js.map