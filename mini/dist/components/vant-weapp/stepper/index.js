(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[83],{208:function(t,e,a){"use strict";a.r(e);var i=a(5),s=a(10),n=600,r=200;function l(t,e){var a=Math.pow(10,10);return Math.round((t+e)*a)/a}function u(t,e){return String(t)===String(e)}Object(i["a"])({field:!0,classes:["input-class","plus-class","minus-class"],props:{value:{type:null,observer:function(t){u(t,this.data.currentValue)||this.setData({currentValue:this.format(t)})}},integer:{type:Boolean,observer:"check"},disabled:Boolean,inputWidth:null,buttonSize:null,asyncChange:Boolean,disableInput:Boolean,decimalLength:{type:Number,value:null,observer:"check"},min:{type:null,value:1,observer:"check"},max:{type:null,value:Number.MAX_SAFE_INTEGER,observer:"check"},step:{type:null,value:1},showPlus:{type:Boolean,value:!0},showMinus:{type:Boolean,value:!0},disablePlus:Boolean,disableMinus:Boolean,longPress:{type:Boolean,value:!0}},data:{currentValue:""},created:function(){this.setData({currentValue:this.format(this.data.value)})},methods:{check:function(){var t=this.format(this.data.currentValue);u(t,this.data.currentValue)||this.setData({currentValue:t})},isDisabled:function(t){return"plus"===t?this.data.disabled||this.data.disablePlus||this.data.currentValue>=this.data.max:this.data.disabled||this.data.disableMinus||this.data.currentValue<=this.data.min},onFocus:function(t){this.$emit("focus",t.detail)},onBlur:function(t){var e=this.format(t.detail.value);this.emitChange(e),this.$emit("blur",Object.assign(Object.assign({},t.detail),{value:e}))},filter:function(t){return t=String(t).replace(/[^0-9.-]/g,""),this.data.integer&&-1!==t.indexOf(".")&&(t=t.split(".")[0]),t},format:function(t){return t=this.filter(t),t=""===t?0:+t,t=Math.max(Math.min(this.data.max,t),this.data.min),Object(s["e"])(this.data.decimalLength)&&(t=t.toFixed(this.data.decimalLength)),t},onInput:function(t){var e=t.detail||{},a=e.value,i=void 0===a?"":a;if(""!==i){var n=this.filter(i);if(Object(s["e"])(this.data.decimalLength)&&-1!==n.indexOf(".")){var r=n.split(".");n="".concat(r[0],".").concat(r[1].slice(0,this.data.decimalLength))}this.emitChange(n)}},emitChange:function(t){this.data.asyncChange||this.setData({currentValue:t}),this.$emit("change",t)},onChange:function(){var t=this.type;if(this.isDisabled(t))this.$emit("overlimit",t);else{var e="minus"===t?-this.data.step:+this.data.step,a=this.format(l(+this.data.currentValue,e));this.emitChange(a),this.$emit(t)}},longPressStep:function(){var t=this;this.longPressTimer=setTimeout((function(){t.onChange(),t.longPressStep()}),r)},onTap:function(t){var e=t.currentTarget.dataset.type;this.type=e,this.onChange()},onTouchStart:function(t){var e=this;if(this.data.longPress){clearTimeout(this.longPressTimer);var a=t.currentTarget.dataset.type;this.type=a,this.isLongPress=!1,this.longPressTimer=setTimeout((function(){e.isLongPress=!0,e.onChange(),e.longPressStep()}),n)}},onTouchEnd:function(){this.data.longPress&&clearTimeout(this.longPressTimer)}}})}},[[208,0,1,2]]]);