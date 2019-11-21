(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46ca2a84"],{1499:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",[a("v-card-title",[e._v(e._s(this.$t("label.features")))]),a("v-divider"),a("v-card-text",{staticClass:"py-2"},[e.editMode?a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"6"}},[a("locale-select",{on:{change:e.fireLocaleChange}})],1)],1):e._e(),a("v-form",[a("form-wrapper",{attrs:{validator:e.$v.feature}},[a("v-row",[a("v-col",{attrs:{md:"6",sm:"8",cols:"12"}},[a("form-group",{attrs:{name:"name"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.attrs;return[a("v-text-field",e._b({attrs:{label:e.$t("label.name"),outlined:""},on:{blur:function(t){return e.$v.feature.name.$touch()}},model:{value:e.feature.name,callback:function(t){e.$set(e.feature,"name",t)},expression:"feature.name"}},"v-text-field",s,!1))]}}])})],1),a("v-col",{staticClass:"d-flex justify-end",attrs:{md:"6",sm:"4",cols:"12"}},[a("v-btn",{attrs:{color:"primary",large:"",loading:e.loading.save},on:{click:e.save}},[e._v(e._s(e.$t("button.save")))]),e.editMode?a("v-btn",{staticClass:"mx-1",attrs:{color:"secondary",large:""},on:{click:e.reset}},[e._v(e._s(e.$t("button.reset")))]):e._e()],1)],1)],1)],1),a("v-data-table",{attrs:{headers:e.headers,items:e.features,"hide-default-footer":"",loading:e.tableLoading,"items-per-page":20},scopedSlots:e._u([{key:"item",fn:function(t){var s=t.item,r=t.index;return[a("tr",[a("td",[e._v(e._s(s.name))]),a("td",[a("v-icon",{staticClass:"edit",attrs:{small:"",title:e.$t("label.edit")},on:{click:function(t){return e.handleEdit(s)}}},[e._v("mdi-pencil")]),a("v-icon",{staticClass:"delete",attrs:{title:e.$t("label.delete"),small:""},on:{click:function(t){return e.handleDelete(s,r)}}},[e._v("mdi-delete")])],1)])]}}])})],1),a("v-divider",{staticClass:"mx-5"}),a("v-card-actions",{staticClass:"py-4 mx-2"},[a("v-spacer"),a("v-btn",{attrs:{color:"secondary",large:""},on:{click:e.closeFeatures}},[e._v(e._s(e.$t("button.close")))])],1)],1)},r=[],i=a("297e"),d=a("2cc4"),l=a("a78e"),n=a.n(l),o=a("b5ae"),u={name:"global-features",props:{FeaturedItemType:{type:String,default:"service"},FeaturedItemId:{type:Number,required:!0}},mounted(){this.createTableHeaders(),this.getFeatures()},data(){return{headers:[],features:[],editMode:!1,feature:{name:""},currentFeatureId:null,currentFeatureIndex:null,locale:n.a.get("language"),tableLoading:!0,loading:{save:!1}}},methods:{getFeatures(){console.log("getting features"),Object(d["b"])({reqName:`${this.FeaturedItemType}-features?${this.FeaturedItemType}_id=${this.FeaturedItemId}`}).then(e=>{const{data:t}=e.data;this.features=[...t]}).catch(e=>{console.log(e)}).finally(()=>{this.tableLoading=!1})},createTableHeaders(){const e=["name","actions"];this.headers=Object(i["a"])(e)},fireLocaleChange(e){this.locale=e,this.getFeatureData()},handleEdit({id:e},t){this.currentFeatureId=e,this.currentFeatureIndex=t,this.editMode=!0,this.getFeatureData()},getFeatureData(){Object(d["c"])({reqName:`${this.FeaturedItemType}-features`,id:this.currentFeatureId,locale:this.locale}).then(e=>{this.feature.name=e.data[`${this.FeaturedItemType}_feature`].name}).catch(e=>{console.log(e)})},save(){this.loading.save=!0,this.editMode?this.UpdateFeature():this.StoreFeature()},StoreFeature(){let e={...this.feature};e[`${this.FeaturedItemType}_id`]=this.FeaturedItemId,Object(d["d"])({reqName:`${this.FeaturedItemType}-features`,data:e}).then(e=>{this.loading.save=!1,console.log("store",e),this.features.push(e.data[`${this.FeaturedItemType}_feature`]),this.reset()}).catch(e=>{console.log(e),this.loading.save=!1})},UpdateFeature(){Object(d["e"])({reqName:`${this.FeaturedItemType}-features`,id:this.currentFeatureId,data:{...this.feature,locale:this.locale,_method:"PUT"}}).then(e=>{this.features.splice(this.currentFeatureIndex,1,e.data[`${this.FeaturedItemType}_feature`]),console.log("update",e),this.loading.save=!1,this.reset()}).catch(e=>{console.log(e),this.loading.save=!1})},handleDelete({id:e},t){this.popUp().then(a=>{a.dismiss||Object(d["a"])({reqName:`${this.FeaturedItemType}-features`,id:e}).then(()=>{this.features.splice(t,1)}).catch(e=>console.log(e))})},reset(){this.$v.$reset(),this.feature={name:""},this.editMode=!1,this.locale=n.a.get("language")},closeFeatures(){this.$emit("closeFeatures")}},validations(){return{feature:{name:{required:o["required"],minLength:Object(o["minLength"])(3),maxLength:Object(o["maxLength"])(20)}}}}},c=u,h=a("2877"),m=a("6544"),f=a.n(m),v=a("8336"),p=a("b0af"),g=a("99d9"),b=a("62ad"),_=a("8fea"),F=a("ce7e"),$=a("4bd4"),y=a("132d"),I=a("0fd9"),V=a("2fa4"),w=a("8654"),T=Object(h["a"])(c,s,r,!1,null,null,null);t["default"]=T.exports;f()(T,{VBtn:v["a"],VCard:p["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:b["a"],VDataTable:_["a"],VDivider:F["a"],VForm:$["a"],VIcon:y["a"],VRow:I["a"],VSpacer:V["a"],VTextField:w["a"]})},"4bd4":function(e,t,a){"use strict";var s=a("58df"),r=a("7e2b"),i=a("3206");t["a"]=Object(s["a"])(r["a"],Object(i["b"])("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>{return e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0})},a={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",s=>{s&&(this.errorBag.hasOwnProperty(e._uid)||(a.valid=t(e)))}):a.valid=t(e),a},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const a=this.watchers.find(e=>e._uid===t._uid);a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})}}]);
//# sourceMappingURL=chunk-46ca2a84.a1b5c70c.js.map