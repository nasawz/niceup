(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[15],{223:function(t,i,e){"use strict";e.r(i);var n=e(37),r=e(5);Object(r["a"])({classes:["num-class","desc-class","thumb-class","title-class","price-class","origin-price-class"],mixins:[n["a"]],props:{tag:String,num:String,desc:String,thumb:String,title:String,price:{type:String,observer:"updatePrice"},centered:Boolean,lazyLoad:Boolean,thumbLink:String,originPrice:String,thumbMode:{type:String,value:"aspectFit"},currency:{type:String,value:"\xa5"}},methods:{updatePrice:function(){var t=this.data.price,i=t.toString().split(".");this.setData({integerStr:i[0],decimalStr:i[1]?".".concat(i[1]):""})},onClickThumb:function(){this.jumpLink("thumbLink")}}})}},[[223,0,1,2]]]);