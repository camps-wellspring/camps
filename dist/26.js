((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"767e33e8-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"767e33e8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"section\",\n    [\n      _c(\"label\", {\n        staticClass: \"text-editor__label\",\n        domProps: { textContent: _vm._s(_vm.$t(\"label.\" + _vm.fieldName)) }\n      }),\n      _c(\"form-group\", {\n        attrs: { name: _vm.fieldName },\n        scopedSlots: _vm._u([\n          {\n            key: \"default\",\n            fn: function(ref) {\n              var attrs = ref.attrs\n              return _c(\n                \"VueEditor\",\n                _vm._b(\n                  {\n                    directives: [\n                      {\n                        name: \"input-validation\",\n                        rawName: \"v-input-validation\",\n                        value: _vm.fieldName,\n                        expression: \"fieldName\"\n                      }\n                    ],\n                    staticClass: \"editor\",\n                    attrs: { editorToolbar: _vm.customToolbar },\n                    model: {\n                      value: _vm.form[_vm.fieldName],\n                      callback: function($$v) {\n                        _vm.$set(_vm.form, _vm.fieldName, $$v)\n                      },\n                      expression: \"form[fieldName]\"\n                    }\n                  },\n                  \"VueEditor\",\n                  attrs,\n                  false\n                )\n              )\n            }\n          }\n        ])\n      }),\n      _c(\"transition\", { attrs: { name: \"fadeIn\", mode: \"in-out\" } }, [\n        _vm.validationErrors.ErrorsKeys.includes(_vm.fieldName)\n          ? _c(\"span\", { staticClass: \"editor__errors\" }, [\n              _vm._v(_vm._s(_vm.validationErrors.serverError) + \"\\n    \")\n            ])\n          : _vm._e()\n      ]),\n      _c(\"br\"),\n      _c(\n        \"v-btn\",\n        {\n          staticClass: \"primary my-3\",\n          attrs: {\n            loading: _vm.loadingButton,\n            disabled: _vm.form[_vm.fieldName] === \"\",\n            type: \"submit\"\n          },\n          on: {\n            click: function($event) {\n              $event.preventDefault()\n              return _vm.handleSubmit($event)\n            }\n          }\n        },\n        [_vm._v(_vm._s(_vm.$t(\"button.save\")))]\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvY2FjaGUtbG9hZGVyL2Rpc3QvY2pzLmpzP3tcImNhY2hlRGlyZWN0b3J5XCI6XCJub2RlX21vZHVsZXMvLmNhY2hlL3Z1ZS1sb2FkZXJcIixcImNhY2hlSWRlbnRpZmllclwiOlwiNzY3ZTMzZTgtdnVlLWxvYWRlci10ZW1wbGF0ZVwifSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPyEuL25vZGVfbW9kdWxlcy92dWV0aWZ5LWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/IS4vc3JjL3ZpZXdzL3NldHRpbmdzL0VkaXRvci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2IxZjdkNjImLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3NldHRpbmdzL0VkaXRvci52dWU/MTIwOSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwic2VjdGlvblwiLFxuICAgIFtcbiAgICAgIF9jKFwibGFiZWxcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LWVkaXRvcl9fbGFiZWxcIixcbiAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0uJHQoXCJsYWJlbC5cIiArIF92bS5maWVsZE5hbWUpKSB9XG4gICAgICB9KSxcbiAgICAgIF9jKFwiZm9ybS1ncm91cFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IG5hbWU6IF92bS5maWVsZE5hbWUgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAge1xuICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgdmFyIGF0dHJzID0gcmVmLmF0dHJzXG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcIlZ1ZUVkaXRvclwiLFxuICAgICAgICAgICAgICAgIF92bS5fYihcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5wdXQtdmFsaWRhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWlucHV0LXZhbGlkYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmaWVsZE5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZWRpdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGVkaXRvclRvb2xiYXI6IF92bS5jdXN0b21Ub29sYmFyIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5mb3JtW192bS5maWVsZE5hbWVdLFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5mb3JtLCBfdm0uZmllbGROYW1lLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm1bZmllbGROYW1lXVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIlZ1ZUVkaXRvclwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnMsXG4gICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSlcbiAgICAgIH0pLFxuICAgICAgX2MoXCJ0cmFuc2l0aW9uXCIsIHsgYXR0cnM6IHsgbmFtZTogXCJmYWRlSW5cIiwgbW9kZTogXCJpbi1vdXRcIiB9IH0sIFtcbiAgICAgICAgX3ZtLnZhbGlkYXRpb25FcnJvcnMuRXJyb3JzS2V5cy5pbmNsdWRlcyhfdm0uZmllbGROYW1lKVxuICAgICAgICAgID8gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZWRpdG9yX19lcnJvcnNcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnZhbGlkYXRpb25FcnJvcnMuc2VydmVyRXJyb3IpICsgXCJcXG4gICAgXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0pLFxuICAgICAgX2MoXCJiclwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInYtYnRuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcmltYXJ5IG15LTNcIixcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmdCdXR0b24sXG4gICAgICAgICAgICBkaXNhYmxlZDogX3ZtLmZvcm1bX3ZtLmZpZWxkTmFtZV0gPT09IFwiXCIsXG4gICAgICAgICAgICB0eXBlOiBcInN1Ym1pdFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICByZXR1cm4gX3ZtLmhhbmRsZVN1Ym1pdCgkZXZlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJidXR0b24uc2F2ZVwiKSkpXVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"767e33e8-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\n");

/***/ }),

/***/ "./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/settings/Editor.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue2_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue2-editor */ \"./node_modules/vue2-editor/dist/vue2-editor.esm.js\");\n/* harmony import */ var _helpers_apiMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/helpers/apiMethods */ \"./src/helpers/apiMethods.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"Editor\",\n  inject: [\"$v\"],\n  props: {\n    fieldName: {\n      type: String\n    },\n    language: {\n      type: String,\n      default: \"en\"\n    },\n    form: {\n      type: Object,\n      default: () => {}\n    }\n  },\n  components: {\n    VueEditor: vue2_editor__WEBPACK_IMPORTED_MODULE_0__[\"VueEditor\"]\n  },\n  methods: {\n    handleSubmit() {\n      this.loadingButton = true;\n      const reqData = {\n        [this.fieldName]: this.form[this.fieldName],\n        locale: this.language\n      };\n      Object(_helpers_apiMethods__WEBPACK_IMPORTED_MODULE_1__[\"StoreData\"])({ reqName: \"settings\", data: reqData })\n        .catch(err => console.log(err))\n        .finally(() => (this.loadingButton = false));\n    },\n    checkValid() {\n      const value = this.form[this.fieldName].length;\n\n      if (value < 3 || value > 100) {\n        return true;\n      } else {\n        return false;\n      }\n    }\n  },\n  data() {\n    return {\n      loadingButton: false,\n      customToolbar: [\n        [\"bold\", \"italic\", \"underline\", \"strike\"],\n        [{ align: \"\" }, { align: \"justify\" }, { align: \"right\" }],\n        [{ font: [] }],\n        [{ header: [false, 1, 2, 3, 4, 5, 6] }],\n        [{ size: [\"small\", false, \"large\", \"huge\"] }],\n\n        [{ header: 1 }, { header: 2 }],\n        [\"blockquote\", \"code-block\"],\n        [{ list: \"ordered\" }, { list: \"bullet\" }, { list: \"check\" }],\n        [{ script: \"sub\" }, { script: \"super\" }],\n        [{ indent: \"-1\" }, { indent: \"+1\" }],\n        [{ color: [] }, { background: [] }],\n\n        [{ direction: \"rtl\" }],\n        [\"clean\"]\n      ]\n    };\n  }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPyEuL3NyYy92aWV3cy9zZXR0aW5ncy9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9FZGl0b3IudnVlPzUwZWMiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8c2VjdGlvbj5cbiAgICA8bGFiZWwgY2xhc3M9XCJ0ZXh0LWVkaXRvcl9fbGFiZWxcIiB2LXRleHQ9XCIkdChgbGFiZWwuJHtmaWVsZE5hbWV9YClcIj48L2xhYmVsPlxuICAgIDxmb3JtLWdyb3VwIDpuYW1lPVwiZmllbGROYW1lXCI+XG4gICAgICA8VnVlRWRpdG9yXG4gICAgICAgIGNsYXNzPVwiZWRpdG9yXCJcbiAgICAgICAgdi1tb2RlbD1cImZvcm1bZmllbGROYW1lXVwiXG4gICAgICAgIHNsb3Qtc2NvcGU9XCJ7IGF0dHJzIH1cIlxuICAgICAgICB2LWJpbmQ9XCJhdHRyc1wiXG4gICAgICAgIDplZGl0b3JUb29sYmFyPVwiY3VzdG9tVG9vbGJhclwiXG4gICAgICAgIHYtaW5wdXQtdmFsaWRhdGlvbj1cImZpZWxkTmFtZVwiXG4gICAgICAvPlxuICAgIDwvZm9ybS1ncm91cD5cblxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJmYWRlSW5cIiBtb2RlPVwiaW4tb3V0XCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImVkaXRvcl9fZXJyb3JzXCJcbiAgICAgICAgdi1pZj1cInZhbGlkYXRpb25FcnJvcnMuRXJyb3JzS2V5cy5pbmNsdWRlcyhmaWVsZE5hbWUpXCJcbiAgICAgICAgPnt7IHZhbGlkYXRpb25FcnJvcnMuc2VydmVyRXJyb3IgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3RyYW5zaXRpb24+XG5cbiAgICA8YnIgLz5cbiAgICA8di1idG5cbiAgICAgIDpsb2FkaW5nPVwibG9hZGluZ0J1dHRvblwiXG4gICAgICBAY2xpY2sucHJldmVudD1cImhhbmRsZVN1Ym1pdFwiXG4gICAgICA6ZGlzYWJsZWQ9XCJmb3JtW2ZpZWxkTmFtZV0gPT09ICcnXCJcbiAgICAgIGNsYXNzPVwicHJpbWFyeSBteS0zXCJcbiAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgPnt7ICR0KFwiYnV0dG9uLnNhdmVcIikgfX08L3YtYnRuXG4gICAgPlxuICA8L3NlY3Rpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgVnVlRWRpdG9yIH0gZnJvbSBcInZ1ZTItZWRpdG9yXCI7XG5pbXBvcnQgeyBTdG9yZURhdGEgfSBmcm9tIFwiQC9oZWxwZXJzL2FwaU1ldGhvZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBcIkVkaXRvclwiLFxuICBpbmplY3Q6IFtcIiR2XCJdLFxuICBwcm9wczoge1xuICAgIGZpZWxkTmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICBsYW5ndWFnZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogXCJlblwiXG4gICAgfSxcbiAgICBmb3JtOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiAoKSA9PiB7fVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIFZ1ZUVkaXRvclxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlU3VibWl0KCkge1xuICAgICAgdGhpcy5sb2FkaW5nQnV0dG9uID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHJlcURhdGEgPSB7XG4gICAgICAgIFt0aGlzLmZpZWxkTmFtZV06IHRoaXMuZm9ybVt0aGlzLmZpZWxkTmFtZV0sXG4gICAgICAgIGxvY2FsZTogdGhpcy5sYW5ndWFnZVxuICAgICAgfTtcbiAgICAgIFN0b3JlRGF0YSh7IHJlcU5hbWU6IFwic2V0dGluZ3NcIiwgZGF0YTogcmVxRGF0YSB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIC5maW5hbGx5KCgpID0+ICh0aGlzLmxvYWRpbmdCdXR0b24gPSBmYWxzZSkpO1xuICAgIH0sXG4gICAgY2hlY2tWYWxpZCgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtW3RoaXMuZmllbGROYW1lXS5sZW5ndGg7XG5cbiAgICAgIGlmICh2YWx1ZSA8IDMgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2FkaW5nQnV0dG9uOiBmYWxzZSxcbiAgICAgIGN1c3RvbVRvb2xiYXI6IFtcbiAgICAgICAgW1wiYm9sZFwiLCBcIml0YWxpY1wiLCBcInVuZGVybGluZVwiLCBcInN0cmlrZVwiXSxcbiAgICAgICAgW3sgYWxpZ246IFwiXCIgfSwgeyBhbGlnbjogXCJqdXN0aWZ5XCIgfSwgeyBhbGlnbjogXCJyaWdodFwiIH1dLFxuICAgICAgICBbeyBmb250OiBbXSB9XSxcbiAgICAgICAgW3sgaGVhZGVyOiBbZmFsc2UsIDEsIDIsIDMsIDQsIDUsIDZdIH1dLFxuICAgICAgICBbeyBzaXplOiBbXCJzbWFsbFwiLCBmYWxzZSwgXCJsYXJnZVwiLCBcImh1Z2VcIl0gfV0sXG5cbiAgICAgICAgW3sgaGVhZGVyOiAxIH0sIHsgaGVhZGVyOiAyIH1dLFxuICAgICAgICBbXCJibG9ja3F1b3RlXCIsIFwiY29kZS1ibG9ja1wiXSxcbiAgICAgICAgW3sgbGlzdDogXCJvcmRlcmVkXCIgfSwgeyBsaXN0OiBcImJ1bGxldFwiIH0sIHsgbGlzdDogXCJjaGVja1wiIH1dLFxuICAgICAgICBbeyBzY3JpcHQ6IFwic3ViXCIgfSwgeyBzY3JpcHQ6IFwic3VwZXJcIiB9XSxcbiAgICAgICAgW3sgaW5kZW50OiBcIi0xXCIgfSwgeyBpbmRlbnQ6IFwiKzFcIiB9XSxcbiAgICAgICAgW3sgY29sb3I6IFtdIH0sIHsgYmFja2dyb3VuZDogW10gfV0sXG5cbiAgICAgICAgW3sgZGlyZWN0aW9uOiBcInJ0bFwiIH1dLFxuICAgICAgICBbXCJjbGVhblwiXVxuICAgICAgXVxuICAgIH07XG4gIH1cbn07XG48L3NjcmlwdD5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=script&lang=js&\n");

/***/ }),

/***/ "./src/views/settings/Editor.vue":
/*!***************************************!*\
  !*** ./src/views/settings/Editor.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.vue?vue&type=template&id=3b1f7d62& */ \"./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\");\n/* harmony import */ var _Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.vue?vue&type=script&lang=js& */ \"./src/views/settings/Editor.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__[\"VBtn\"]})\n\n\n/* hot reload */\nif (true) {\n  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ \"./node_modules/vue-hot-reload-api/dist/index.js\")\n  api.install(__webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\"))\n  if (api.compatible) {\n    module.hot.accept()\n    if (!api.isRecorded('3b1f7d62')) {\n      api.createRecord('3b1f7d62', component.options)\n    } else {\n      api.reload('3b1f7d62', component.options)\n    }\n    module.hot.accept(/*! ./Editor.vue?vue&type=template&id=3b1f7d62& */ \"./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.vue?vue&type=template&id=3b1f7d62& */ \"./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\");\n(function () {\n      api.rerender('3b1f7d62', {\n        render: _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n        staticRenderFns: _Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]\n      })\n    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))\n  }\n}\ncomponent.options.__file = \"src/views/settings/Editor.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy92aWV3cy9zZXR0aW5ncy9FZGl0b3IudnVlP2RjNDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNiMWY3ZDYyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXRvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0VkaXRvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiB2dWV0aWZ5LWxvYWRlciAqL1xuaW1wb3J0IGluc3RhbGxDb21wb25lbnRzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9ydW50aW1lL2luc3RhbGxDb21wb25lbnRzLmpzXCJcbmltcG9ydCB7IFZCdG4gfSBmcm9tICd2dWV0aWZ5L2xpYi9jb21wb25lbnRzL1ZCdG4nO1xuaW5zdGFsbENvbXBvbmVudHMoY29tcG9uZW50LCB7VkJ0bn0pXG5cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9tYWJyb3VrL3NpdGVzL2FkYWJpcml5YWRoX2FkbWluL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzNiMWY3ZDYyJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzNiMWY3ZDYyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzNiMWY3ZDYyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNiMWY3ZDYyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzNiMWY3ZDYyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/views/settings/Editor.vue\n");

/***/ }),

/***/ "./src/views/settings/Editor.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/views/settings/Editor.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Editor.vue?vue&type=script&lang=js& */ \"./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZT81ZTMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWV0aWZ5LWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYWNoZS1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMC0wIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdG9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/views/settings/Editor.vue?vue&type=script&lang=js&\n");

/***/ }),

/***/ "./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&":
/*!**********************************************************************!*\
  !*** ./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_767e33e8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"767e33e8-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Editor.vue?vue&type=template&id=3b1f7d62& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"767e33e8-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_767e33e8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_767e33e8_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_3b1f7d62___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zYjFmN2Q2MiYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdmlld3Mvc2V0dGluZ3MvRWRpdG9yLnZ1ZT84MDk5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCItIWNhY2hlLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjpcXFwibm9kZV9tb2R1bGVzLy5jYWNoZS92dWUtbG9hZGVyXFxcIixcXFwiY2FjaGVJZGVudGlmaWVyXFxcIjpcXFwiNzY3ZTMzZTgtdnVlLWxvYWRlci10ZW1wbGF0ZVxcXCJ9IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhY2hlLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0b3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNiMWY3ZDYyJlwiIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/views/settings/Editor.vue?vue&type=template&id=3b1f7d62&\n");

/***/ })

}]);