(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-257be300"],{"4bd4":function(e,t,i){"use strict";var a=i("58df"),s=i("7e2b"),l=i("3206");t["a"]=Object(a["a"])(s["a"],Object(l["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>{return e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0})},i={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=e.$watch("shouldValidate",a=>{a&&(this.errorBag.hasOwnProperty(e._uid)||(i.valid=t(e)))}):i.valid=t(e),i},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const i=this.watchers.find(e=>e._uid===t._uid);i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})},"8f70":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("main",[i("global-toolbar",{attrs:{title:"time_ranges",actionButton:!0},on:{ButtonClicked:function(t){e.showTimesDialog=!0}}}),i("v-data-table",{attrs:{headers:e.headers,items:e.times,"hide-default-footer":"",loading:e.tableLoading},scopedSlots:e._u([{key:"item",fn:function(t){var a=t.item,s=t.index;return[i("tr",[i("td",[e._v(e._s(a.text)+" "+e._s(e.$t("label.months")))]),i("td",{staticClass:"toggle-adjust"},[i("toggle-service",{attrs:{"is-edit":!0,"model-name":"time-ranges","model-id":a.id,field:"project_available",validate:!0},model:{value:a.is_project_available,callback:function(t){e.$set(a,"is_project_available",t)},expression:"item.is_project_available"}})],1),i("td",{staticClass:"toggle-adjust"},[i("toggle-service",{attrs:{"is-edit":!0,"model-name":"time-ranges","model-id":a.id,field:"service_available",validate:!0},model:{value:a.is_service_available,callback:function(t){e.$set(a,"is_service_available",t)},expression:"item.is_service_available"}})],1),i("td",[i("v-icon",{staticClass:"edit",attrs:{small:"",title:e.$t("label.edit")},on:{click:function(t){return e.handleEdit(a,s)}}},[e._v("mdi-pencil")]),i("v-icon",{staticClass:"delete",attrs:{title:e.$t("label.delete"),small:""},on:{click:function(t){return e.handleDelete(a,s)}}},[e._v("mdi-delete")])],1)])]}}])}),i("v-dialog",{attrs:{"max-width":"700px"},model:{value:e.showTimesDialog,callback:function(t){e.showTimesDialog=t},expression:"showTimesDialog"}},[i("v-card",[i("v-card-title",[e._v(e._s(e.editMode?this.$t("label.edit_times"):this.$t("label.create_times")))]),i("v-divider"),i("v-card-text",{staticClass:"py-3"},[e.showTimesDialog?i("v-form",[i("form-wrapper",{attrs:{validator:e.$v.time}},[i("v-row",[e.editMode?e._e():i("v-col",{attrs:{cols:"12"}},e._l(e.selectedTimes,(function(t,a){return i("v-chip",{key:a,staticClass:"ma-2",attrs:{close:""},on:{"click:close":function(t){return e.selectedTimes.splice(a,1)}}},[e._v("\n                  "+e._s(t)+"\n                ")])})),1),i("v-col",{attrs:{md:e.editMode?12:10,cols:"12"}},[i("form-group",{attrs:{name:"min"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.attrs;return[i("v-text-field",e._b({attrs:{label:e.$t("label.minimum"),type:"number",outlined:""},on:{blur:function(t){return e.$v.time.min.$touch()}},model:{value:e.time.min,callback:function(t){e.$set(e.time,"min",t)},expression:"time.min"}},"v-text-field",a,!1))]}}],null,!1,1338870065)})],1),e.editMode?e._e():i("v-col",{staticClass:"text-end",attrs:{md:"2",cols:"12"}},[i("v-btn",{attrs:{color:"primary",disabled:e.$v.$invalid,"x-large":""},on:{click:e.addTime}},[e._v("\n                  "+e._s(e.$t("label.add"))+"\n                ")])],1)],1)],1)],1):e._e()],1),i("v-divider",{staticClass:"mx-4"}),i("v-card-actions",{staticClass:"py-4 mx-2"},[i("v-spacer"),i("v-btn",{attrs:{color:"secondary"},on:{click:e.closeTimesDialog}},[e._v(e._s(this.$t("button.cancel")))]),i("v-btn",{attrs:{color:"primary",loading:e.loading.save,disabled:e.saveValidation},on:{click:e.save}},[e._v(e._s(this.$t("button.save")))])],1)],1)],1)],1)},s=[],l=i("297e"),n=i("b5ae"),r=i("2cc4"),d=i("a78e"),o=i.n(d),c={name:"time_ranges",data(){return{headers:[],times:[],tableLoading:!0,time:{min:null},selectedTimes:[],currentTimeId:null,currentTimeIndex:null,editMode:!1,showTimesDialog:!1,loading:{save:!1}}},computed:{saveValidation(){return!this.editMode&&0===this.selectedTimes.length||this.editMode&&this.$v.$invalid}},mounted(){this.createTableHeaders(),this.getTimes()},methods:{createTableHeaders(){const e=["range","project_available","service_available","actions"];this.headers=Object(l["a"])(e)},getTimes(){Object(r["b"])({reqName:"time-ranges"}).then(e=>{const{data:t}=e.data;this.times=t,this.times.pop()}).catch(e=>{console.log(e)}).finally(()=>{this.tableLoading=!1})},handleEdit({id:e},t){this.currentTimeId=e,this.currentTimeIndex=t,this.editMode=!0,this.showTimesDialog=!0,this.getTimeData()},getTimeData(){Object(r["c"])({reqName:"time-ranges",id:this.currentTimeId,locale:o.a.get("language")}).then(e=>{const{time_range:t}=e.data;this.time.min=t.min}).catch(e=>{console.log(e)})},addTime(){this.selectedTimes.includes(this.time.min)||this.selectedTimes.push(this.time.min),this.time.min=null,this.$v.$reset()},save(){this.loading.save=!0,this.editMode?this.UpdateTime():this.StoreTime()},StoreTime(){let e=new FormData;this.selectedTimes.forEach(t=>{e.append(`times[${t}]`,1*t)}),Object(r["d"])({reqName:"time-ranges",data:e}).then(()=>{this.loading.save=!1,this.getTimes(),this.closeTimesDialog()}).catch(e=>{console.log(e),this.loading.save=!1})},UpdateTime(){let e=new FormData;e.append("min",this.time.min),e.append("_method","PUT"),e.append("locale",o.a.get("language")),Object(r["e"])({reqName:"time-ranges",id:this.currentTimeId,data:e}).then(e=>{this.times.splice(this.currentTimeIndex,1,e.data.time_range),this.loading.save=!1,this.getTimes(),this.closeTimesDialog()}).catch(e=>{console.log(e),this.loading.save=!1})},handleDelete({id:e},t){this.popUp().then(i=>{i.dismiss||Object(r["a"])({reqName:"time-ranges",id:e}).then(()=>{this.times.splice(t,1),this.getTimes()}).catch(e=>console.log(e))})},closeTimesDialog(){this.showTimesDialog=!1,this.resetTimes()},resetTimes(){this.$v.$reset(),this.selectedTimes=[],this.time={min:null},this.currentTimeId=null,this.currentTimeIndex=null,this.editMode=!1}},validations(){return{time:{min:{required:n["required"],minValue:Object(n["minValue"])(1),maxValue:Object(n["maxValue"])(1e5)}}}}},m=c,h=i("2877"),u=i("6544"),v=i.n(u),g=i("8336"),p=i("b0af"),b=i("99d9"),_=i("cc20"),T=i("62ad"),f=i("8fea"),$=i("169a"),w=i("ce7e"),V=i("4bd4"),x=i("132d"),D=i("0fd9"),j=i("2fa4"),k=i("8654"),C=Object(h["a"])(m,a,s,!1,null,null,null);t["default"]=C.exports;v()(C,{VBtn:g["a"],VCard:p["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VChip:_["a"],VCol:T["a"],VDataTable:f["a"],VDialog:$["a"],VDivider:w["a"],VForm:V["a"],VIcon:x["a"],VRow:D["a"],VSpacer:j["a"],VTextField:k["a"]})}}]);
//# sourceMappingURL=chunk-257be300.8f591c16.js.map