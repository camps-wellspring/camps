(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-690fc554"],{"61fb":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",["update"===t.actionType?i("locale-select",{attrs:{loading:t.loading.fetch},on:{change:t.handleLocaleChange}}):t._e(),i("form-wrapper",{attrs:{validator:t.$v.form}},[i("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("form-group",{attrs:{name:"name"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.attrs;return[i("v-text-field",t._b({attrs:{outlined:"",label:t.$t("label.name")},on:{blur:function(e){return t.$v.form.name.$touch()}},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}},"v-text-field",a,!1))]}}])})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("form-group",{attrs:{name:t.config.imgType},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.attrs;return[i("new-image-upload",t._b({staticClass:"file-upload__image",attrs:{imgUrl:t.form[t.config.imgType]&&t.form[t.config.imgType].path,imgId:t.form[t.config.imgType]&&t.form[t.config.imgType].id,"max-size":2},on:{fileSelected:t.handleImg,ImageUpdated:function(e){t.imgUpdated=!0}}},"new-image-upload",a,!1))]}}])})],1),i("v-col",{attrs:{cols:"12"}},[i("v-btn",{staticClass:"primary",attrs:{type:"submit",disabled:t.$v.form.$invalid,loading:t.loading.submit}},[t._v(t._s(t.$t("button.submit")))])],1)],1)],1)])],1)},o=[],n=i("b5ae"),r=i("8d97"),s={mixins:[r["a"]],validations(){return{form:{name:{required:n["required"],minLength:Object(n["minLength"])(3),maxLength:Object(n["maxLength"])(40)},[this.config.imgType]:{required:Object(n["requiredIf"])(()=>"create"===this.actionType)}}}}},c=s,l=i("2877"),m=i("6544"),d=i.n(m),h=i("8336"),u=i("62ad"),f=i("a523"),g=i("0fd9"),p=i("8654"),b=Object(l["a"])(c,a,o,!1,null,null,null);e["default"]=b.exports;d()(b,{VBtn:h["a"],VCol:u["a"],VContainer:f["a"],VRow:g["a"],VTextField:p["a"]})},"8d97":function(t,e,i){"use strict";var a=i("2cc4"),o={data(){return{locale:""}},computed:{currLocale(){return this.locale?this.locale:this.$store.getters.locale}},methods:{handleLocaleChange(t){this.loading.fetch=!0,Object(a["c"])({reqName:this.config.modelName,id:this.currItem[this.config.idType||"id"],locale:t}).then(e=>{this.locale=t,this.form=e.data[Object.keys(e.data)[0]],this.loading.fetch=!1}).catch(()=>this.loading.fetch=!1)}}};e["a"]={mixins:[o],props:{currItem:{type:Object,default:()=>{}},config:{type:Object,default:()=>{}},actionType:{type:String,default:""},dialog:{type:Boolean,default:""}},data(){return{imgUpdated:!0,form:{},loading:{submit:!1,fetch:!1}}},computed:{itemId(){return this.config.idType?this.config.idType:"id"}},watch:{currItem:{handler(t){this.form={...t}},immediate:!0,deep:!0}},mounted(){window.eventBus.$on("SET_DIALOG",t=>{t||this.reset()})},methods:{onSubmit(){"update"===this.actionType?this.update().then(()=>this.imgUpdated&&this.closeDialog()):this.create().then(()=>this.closeDialog())},update(){return new Promise(t=>{this.loading.submit=!0;let e={};for(const i in this.form)this.form[i]&&(e[i]=this.form[i]);e.locale=this.currLocale,e._method="put",Object(a["e"])({reqName:this.config.modelName,data:e,id:this.currItem[this.itemId]}).then(()=>{this.loading.submit=!1,t()}).catch(()=>this.loading.submit=!1)})},create(){return new Promise(t=>{this.loading.submit=!0;let e=new FormData;for(const i in this.form)e.append(i,this.form[i]);Object(a["d"])({reqName:this.config.modelName,data:e}).then(()=>{this.loading.submit=!1,t()}).catch(()=>this.loading.submit=!1)})},handleImg(t){this.form[this.config.imgType]=t.file,this.imgUpdated=!1,this.$v.form[this.config.imgType].$touch()},closeDialog(){this.reset(),this.$emit("closed")},reset(){this.form={},this.locale=this.$store.getters.locale}}}}}]);
//# sourceMappingURL=chunk-690fc554.ca3e1c30.js.map