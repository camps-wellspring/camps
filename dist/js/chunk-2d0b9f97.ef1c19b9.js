(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9f97"],{"34dd":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",{staticClass:"form-page"},[a("v-toolbar",{staticClass:"mb-4",attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[e._v(e._s(e.formTitle))]),a("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}})],1),a("v-container",[e.$route.params.slug?a("v-col",{attrs:{cols:"12"}},[a("locale-select",{on:{change:e.fireLocaleChange}})],1):e._e(),a("form-wrapper",{attrs:{validator:e.$v.form}},[a("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit(t)}}},[a("MainInfo",{attrs:{form:e.form}}),a("v-card",[a("v-card-title",[e._v("Media")]),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-subheader",[e._v("logo")]),a("new-image-upload",{staticClass:"file-upload__image",attrs:{imgUrl:e.form.logo?e.form.logo.path:"",resetToggle:e.resetImage,maxSize:e.logoSize,imgId:e.form.logo?e.form.logo.id:null},on:{fileSelected:e.handleselectLogo}})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-subheader",[e._v("Main Image")]),a("new-image-upload",{staticClass:"file-upload__image",attrs:{imgUrl:e.form.main_media?e.form.main_media.path:"",resetToggle:e.resetImage,maxSize:e.mainImageSize,imgId:e.form.main_media?e.form.main_media.id:null},on:{fileSelected:e.handleSelectMainImage}})],1),a("upload-video",{attrs:{videosFiles:e.videosFiles,updatedVideos:e.form.videos},on:{set_videos:e.handleSetVideo}}),a("v-col",{staticClass:"mt-3",attrs:{cols:"12",md:"6"}},[a("multi-image-upload",{attrs:{maxSize:e.photosMaxSize,imgsUrl:e.getPhotos()},on:{fileSelected:e.setPhotos,handle_delete_image:e.handleDeletePhoto}})],1)],1)],1)],1),a("Platform",{attrs:{form:e.form,myPlatforms:e.myPlatforms}}),a("v-col",{attrs:{cols:"12"}},[a("v-btn",{staticClass:"primary",attrs:{type:"submit",disabled:e.$v.form.$invalid,loading:e.btnLoading}},[e._v(e._s(e.$t("button.save")))])],1)],1)])],1)],1)},i=[],r=a("b5ae"),s=a("2cc4"),l=a("a78e"),n=a.n(l),d={name:"CreateAndEdit",components:{MainInfo:()=>a.e("chunk-2d0e6c06").then(a.bind(null,"99a1")),Platform:()=>a.e("chunk-2d0c8bd7").then(a.bind(null,"55bc"))},provide(){return{$v:this.$v}},data(){return{form:{name:"",description:"",priority:"",logo:"",photos:[],platforms_ids:"",work_url:"",main_media:"",videos:[]},updateData:{},videosFiles:[],mediaPhotos:[],myPlatforms:[],logoSize:1.24,mainImageSize:2.48,photosMaxSize:1.24,resetImage:!1,btnLoading:!1,logoChange:!1,mainMediaChanged:!1,multiImageChanged:!1,videoChanged:!1,locale:n.a.get("language")}},mounted(){this.showWorkData()},methods:{fireLocaleChange(e){this.locale=e,this.showWorkData()},handleSetVideo(e){this.videoChanged=!0,this.form.videos=e},showWorkData(){const{slug:e}=this.$route.params;"edit_work"===this.$route.name&&Object(s["c"])({reqName:"works",id:e,locale:this.locale}).then(e=>{const{work:t}=e.data,{name:a,description:o,logo:i,media:r,platforms:s,main_media:l,priority:n}=t;this.updateData=t,this.form={name:a,description:o,logo:i,main_media:l,priority:n,video:"",platforms_ids:"",work_url:"",videos:[]},this.myPlatforms=s,this.mediaPhotos=[],r.map(e=>{"photo"===e.type?e.main||"logo"===e.title||this.mediaPhotos.push(e):(this.videosFiles.push(e),this.form.videos.push(e))})}).catch(e=>console.log(e))},resetData(){this.$v.form.$reset(),this.form={}},handleDeletePhoto(e){this.mediaPhotos.splice(e,1)},getPhotos(){if(this.mediaPhotos)return this.mediaPhotos},setPhotos(e){this.form.photos=e,this.multiImageChanged=!0},handleSubmit(){this.btnLoading=!0,"create_work"===this.$route.name?this.createWork():this.updateWork()},handleSelectMainImage(e){this.form.main_media=e.file,this.mainMediaChanged=!0},handleselectLogo(e){this.form.logo=e.file,this.logoChange=!0},buildData(){const e=new FormData,{name:t,description:a,main_media:o,photos:i,priority:r,logo:s,videos:l}=this.form;return!this.$route.params.slug&&e.append("main_media",o),e.append("name",t),a&&e.append("description",a),e.append("priority",r),!this.$route.params.slug&&e.append("logo",s),this.multiImageChanged&&i.map(t=>e.append("photos[]",t)),this.videoChanged&&l.map(t=>e.append("videos[]",t)),this.myPlatforms.length&&this.myPlatforms.map((t,a)=>{e.append(`platforms[${a}][id]`,t.id),e.append(`platforms[${a}][url]`,t.url)}),e.append("visible",!0),this.$route.params.slug&&e.append("locale",this.locale),"edit_work"===this.$route.name&&e.append("_method","put"),e},createWork(){const e=this.buildData();Object(s["d"])({reqName:"works",data:e}).then(()=>{this.$router.go(-1)}).catch(e=>console.log(e)).finally(()=>{this.btnLoading=!1})},updateWork(){const e=this.buildData();Object(s["e"])({reqName:"works",data:e,id:this.$route.params.slug}).then(()=>{this.$router.go(-1),this.videoChanged=!1}).catch(e=>console.log(e)).finally(()=>{this.btnLoading=!1})}},validations(){return{form:{name:{required:r["required"],minLength:Object(r["minLength"])(3),maxLength:Object(r["maxLength"])(150)},description:{minLength:Object(r["minLength"])(3),maxLength:Object(r["maxLength"])(500)},priority:{required:r["required"],numeric:r["numeric"]},logo:{required:r["required"]},platforms_ids:{required:Object(r["requiredIf"])(e=>{return""!==e.work_url})},work_url:{url:r["url"],required:Object(r["requiredIf"])(e=>{return""!==e.platforms_ids})}}}},computed:{formTitle(){return"create_work"===this.$route.name?this.$t("heading.create"):this.$t("heading.edit")}},watch:{form:{handler(e){this.form=e},immediate:!0}}},m=d,h=a("2877"),c=a("6544"),u=a.n(c),p=a("8336"),g=a("b0af"),f=a("99d9"),v=a("62ad"),b=a("a523"),_=a("ce7e"),w=a("0fd9"),C=a("e0c7"),$=a("71d9"),k=a("2a7f"),P=Object(h["a"])(m,o,i,!1,null,null,null);t["default"]=P.exports;u()(P,{VBtn:p["a"],VCard:g["a"],VCardText:f["b"],VCardTitle:f["c"],VCol:v["a"],VContainer:b["a"],VDivider:_["a"],VRow:w["a"],VSubheader:C["a"],VToolbar:$["a"],VToolbarTitle:k["b"]})}}]);
//# sourceMappingURL=chunk-2d0b9f97.ef1c19b9.js.map