(function(e){function t(t){for(var n,a,o=t[0],c=t[1],u=t[2],d=0,m=[];d<o.length;d++)a=o[d],r[a]&&m.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],n=!0,o=1;o<s.length;o++){var c=s[o];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=s[0]))}return e}var n={},r={app:0},i=[];function a(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;i.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"51f7":function(e,t,s){"use strict";var n=s("f241"),r=s.n(n);r.a},"56d7":function(e,t,s){"use strict";s.r(t);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("2b0e"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},i=[],a={name:"app"},o=a,c=(s("51f7"),s("2877")),u=Object(c["a"])(o,r,i,!1,null,null,null),l=u.exports,d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login"},[s("logo"),s("font-awesome-icon",{class:{"spinning-vinyl":!0,spinning:e.isSpinning||e.forceSpinning},attrs:{icon:["fal","compact-disc"]}}),s("h3",{directives:[{name:"show",rawName:"v-show",value:e.forceSpinning,expression:"forceSpinning"}]},[e._v("Looking up "+e._s(e.discogsUsername)+"...")]),s("br"),s("div",{staticClass:"options"},[s("div",{staticClass:"connect-discogs button",on:{mouseover:function(t){e.isSpinning=!0},mouseleave:function(t){e.isSpinning=!1}}},[s("font-awesome-icon",{attrs:{icon:"compact-disc"}}),e._v(" Connect Discogs\n        ")],1),s("div",{staticClass:"or"},[e._v("\n            OR\n        ")]),s("div",{staticClass:"discogs-username"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.discogsUsername,expression:"discogsUsername"}],attrs:{placeholder:"Discogs Username",type:"text",name:"discogs-username"},domProps:{value:e.discogsUsername},on:{keyup:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm(t)},function(t){e.isSpinning=!1}],keydown:function(t){e.isSpinning=!0},input:function(t){t.target.composing||(e.discogsUsername=t.target.value)}}})])])],1)},m=[],p=(s("96cf"),s("3b8d")),g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h1",{staticClass:"logo"},[e._v("Spin Vinyl")])},f=[],h={name:"logo"},v=h,y=(s("ff89"),Object(c["a"])(v,g,f,!1,null,"5298961e",null)),b=y.exports,_=s("2f62"),w=s("bc3a"),A=s.n(w),D={getMaster:function(){var e=Object(p["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://api.discogs.com/masters/"+t+"?token=RUWgPYGkypLztPqcshEmvlmtDXMJOsGUhEZEyKHY");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),getCollection:function(){var e=Object(p["a"])(regeneratorRuntime.mark(function e(t,s,n,r){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://api.discogs.com/users/"+t+"/collection/folders/0/releases?per_page=10000&oauth_token="+s+"&oauth_token_secret="+n+"&page="+r+"&token=RUWgPYGkypLztPqcshEmvlmtDXMJOsGUhEZEyKHY");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));function t(t,s,n,r){return e.apply(this,arguments)}return t}()},k={name:"home",data:function(){return{discogsUsername:"",isSpinning:!1,forceSpinning:!1}},components:{Logo:b},methods:{submitForm:function(){var e=Object(p["a"])(regeneratorRuntime.mark(function e(){var t,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.forceSpinning=!0,this.$store.commit("discogs/setDiscogsName",{username:this.discogsUsername}),t=1,e.prev=3,e.next=6,D.getCollection(this.$store.state.discogs.discogsUsername,this.$store.state.discogs.discogsOauthToken,this.$store.state.discogs.discogsOauthSecret,t);case 6:s=e.sent,e.next=13;break;case 9:return e.prev=9,e.t0=e["catch"](3),"Request failed with status code 404"===e.t0.message&&(alert("Username "+this.discogsUsername+" not found"),this.discogsUsername="",this.forceSpinning=!1),e.abrupt("return");case 13:if(!(void 0!==s.data.releases&&s.data.releases.length>0&&s.data.releases.length%500===0)){e.next=27;break}return t+=1,e.prev=15,e.next=18,D.getCollection(this.$store.state.discogs.discogsUsername,this.$store.state.discogs.discogsOauthToken,this.$store.state.discogs.discogsOauthSecret,t);case 18:s=e.sent,e.next=24;break;case 21:return e.prev=21,e.t1=e["catch"](15),e.abrupt("break",27);case 24:this.$store.commit("discogs/addToDiscogsCollection",{additions:s.data.releases}),e.next=13;break;case 27:this.$store.commit("discogs/setDiscogsCollection",{collection:s.data.releases}),this.$router.push("/random-album");case 29:case"end":return e.stop()}},e,this,[[3,9],[15,21]])}));function t(){return e.apply(this,arguments)}return t}()},computed:Object(_["b"])({storeDiscogsName:function(e){return e.discogs.discogsUsername}})},C=k,O=Object(c["a"])(C,d,m,!1,null,"17c0edf0",null),$=O.exports,x=function(){var e=this,t=e.$createElement,s=e._self._c||t;return void 0!==e.master.id?s("div",{staticClass:"listen",style:e.cssProps},[s("div",{staticClass:"image"},[s("img",{attrs:{src:e.master.images[0].uri}}),s("h1",[e._v(e._s(e.master.title))]),s("h3",[e._v(e._s(e.master.artists[0].name))]),s("a",{staticClass:"button",on:{click:e.newAlbum}},[e._v("\n            New Album\n        ")])]),s("div",{staticClass:"tracks"},e._l(e.master.tracklist,function(t){return s("div",{staticClass:"track"},[s("div",{staticClass:"title"},[e._v("\n                "+e._s(t.position)+": "+e._s(t.title)+"\n            ")]),s("div",{staticClass:"duration"},[e._v("\n                "+e._s(t.duration)+"\n            ")])])}),0)]):e._e()},S=[],B={name:"listening",data:function(){return{gradient:{primary:"#DBD5A4",secondary:"#649173"},gradients:[{primary:"#B993D6",secondary:"#8CA6DB"},{primary:"#870000",secondary:"#190A05"},{primary:"#00d2ff",secondary:"#3a7bd5"},{primary:"#D3959B",secondary:"#BFE6BA"},{primary:"#DAD299",secondary:"#B0DAB9"},{primary:"#f2709c",secondary:"#ff9472"},{primary:"#E6DADA",secondary:"#274046"},{primary:"#DBD5A4",secondary:"#649173"},{primary:"#5D4157",secondary:"#A8CABA"}],master:{}}},methods:{newAlbum:function(){this.$router.push("/random-album")}},computed:{cssProps:function(){return{"--gradient-primary":this.gradient.primary,"--gradient-secondary":this.gradient.secondary}}},mounted:function(){if(0!==this.$store.state.discogs.collection.length){for(var e=this.$store.state.discogs.masters,t=0;t<e.length;t++)if(e[t].id==this.$route.params.id){console.log(e[t]),this.master=e[t];break}}else this.$router.push("/")}},U=B,j=Object(c["a"])(U,x,S,!1,null,"43f07e70",null),M=j.exports,E=function(){var e=this,t=e.$createElement,s=e._self._c||t;return void 0!==e.selectedAlbum.basic_information?s("div",{staticClass:"random-album",style:e.cssProps},[s("img",{attrs:{src:e.selectedAlbum.basic_information.cover_image}}),s("font-awesome-icon",{class:{spinner:!0,visible:e.isSpinning},attrs:{icon:["fal","compact-disc"]}}),s("h1",[e._v(e._s(e.selectedAlbum.basic_information.title))]),s("h3",[e._v(" "+e._s(e.selectedAlbum.basic_information.artists[0].name))]),s("br"),s("div",{staticClass:"button try-again",on:{click:e.tryAgain}},[e._v("\n        Try again\n    ")]),s("div",{staticClass:"button select",on:{click:e.listen}},[e._v("\n        Start Listening\n    ")])],1):e._e()},P=[],R={name:"random-album",data:function(){return{selectedAlbum:{},isSpinning:!1,gradients:[{primary:"#B993D6",secondary:"#8CA6DB"},{primary:"#870000",secondary:"#190A05"},{primary:"#00d2ff",secondary:"#3a7bd5"},{primary:"#D3959B",secondary:"#BFE6BA"},{primary:"#DAD299",secondary:"#B0DAB9"},{primary:"#f2709c",secondary:"#ff9472"},{primary:"#E6DADA",secondary:"#274046"},{primary:"#DBD5A4",secondary:"#649173"},{primary:"#5D4157",secondary:"#A8CABA"}],gradient:{primary:"#DBD5A4",secondary:"#649173"}}},computed:{cssProps:function(){return{"--gradient-primary":this.gradient.primary,"--gradient-secondary":this.gradient.secondary}}},methods:{tryAgain:function(){this.gradient=this.gradients[Math.floor(Math.random()*this.gradients.length)],this.selectedAlbum=this.$store.state.discogs.collection[Math.floor(Math.random()*this.$store.state.discogs.collection.length)]},listen:function(){var e=Object(p["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.isSpinning=!0,e.next=3,D.getMaster(this.selectedAlbum.basic_information.master_id);case 3:t=e.sent,this.$store.commit("discogs/addMaster",{master:t.data}),this.$router.push("/listen/"+t.data.id);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){0!==this.$store.state.discogs.collection.length?(this.gradient=this.gradients[Math.floor(Math.random()*this.gradients.length)],this.selectedAlbum=this.$store.state.discogs.collection[Math.floor(Math.random()*this.$store.state.discogs.collection.length)]):this.$router.push("/")}},T=R,N=Object(c["a"])(T,E,P,!1,null,"54aa6762",null),L=N.exports,F=s("ecee"),G={discogsUsername:"",discogsOauthToken:"",discogsOauthSecret:"",collection:[],masters:[]},J={},Y={},q={addMaster:function(e,t){var s=t.master;e.masters.push(s)},setDiscogsName:function(e,t){var s=t.username;e.discogsUsername=s},setDiscogsCollection:function(e,t){var s=t.collection;e.collection=s},addToDiscogsCollection:function(e,t){var s=t.additions;e.collections.push(s)}},z={namespaced:!0,state:G,getters:J,actions:Y,mutations:q};n["a"].use(_["a"]);var H=!1,K=new _["a"].Store({modules:{discogs:z},strict:H}),W=s("584e"),X=s("c074"),Z=s("ad3d"),V=s("8c4f");F["c"].add(W["a"],X["a"]),n["a"].component("font-awesome-icon",Z["a"]),n["a"].config.productionTip=!1,n["a"].use(V["a"]);var I=[{path:"/random-album",component:L},{path:"/",component:$},{path:"/listen/:id",component:M}],Q=new V["a"]({routes:I});new n["a"]({store:K,router:Q,render:function(e){return e(l)}}).$mount("#app")},e724:function(e,t,s){},f241:function(e,t,s){},ff89:function(e,t,s){"use strict";var n=s("e724"),r=s.n(n);r.a}});
//# sourceMappingURL=app.790a9e3a.js.map