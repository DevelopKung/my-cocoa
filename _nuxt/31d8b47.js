(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{608:function(e,r,t){var content=t(644);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(19).default)("2415b4b9",content,!0,{sourceMap:!1})},643:function(e,r,t){"use strict";t(608)},644:function(e,r,t){var n=t(18),o=t(345),d=t(645),l=n((function(i){return i[1]})),c=o(d);l.push([e.i,".bg-gradient[data-v-80fb5ce4]{width:100%;min-width:100%;border-radius:10px;position:relative;color:#fff;padding:1.5rem;cursor:pointer}.bg-gradient[data-v-80fb5ce4]:hover{transform:scale(1.02);transition-duration:1s}.bg-gradient .img[data-v-80fb5ce4]{position:absolute;top:0;right:0;height:100%}.pink[data-v-80fb5ce4]{background:linear-gradient(90deg, #ffbf96, #fe7096)}.blue[data-v-80fb5ce4]{background:linear-gradient(90deg, #90caf9, #047edf 99%)}.green[data-v-80fb5ce4]{background:linear-gradient(90deg, #84d9d2, #07cdae)}.purple[data-v-80fb5ce4]{background:linear-gradient(90deg, #939de7, #6777ef)}.login[data-v-80fb5ce4]{height:100vh;display:flex;justify-content:center;align-items:center;background-image:url("+c+") !important;background-repeat:no-repeat;background-size:cover;font-family:sans-serif}",""]),l.locals={},e.exports=l},645:function(e,r,t){e.exports=t.p+"img/bg.10f784c.jpg"},659:function(e,r,t){"use strict";t.r(r);var n=t(247),o=t(226),d=t(192),l=t(578),c=t(5),f=(t(48),{layout:"blank",data:function(){return{username:"Admin-1",password:"123456",loading:!1}},methods:{login:function(e){var r=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.loading=!0,e.preventDefault(),n={username:r.username,password:r.password},t.prev=3,t.next=6,r.$auth.loginWith("local",{data:n});case 6:if(0!=t.sent.data.status){t.next=13;break}return Swal.fire({icon:"error",title:"รหัสผ่านไม่ถูกต้อง"}),t.next=11,r.$auth.logout();case 11:return r.loading=!1,t.abrupt("return");case 13:r.$router.push("/"),r.loading=!1,t.next=21;break;case 17:t.prev=17,t.t0=t.catch(3),r.$router.push("/login"),r.loading=!1;case 21:case"end":return t.stop()}}),t,null,[[3,17]])})))()}}}),v=(t(643),t(62)),component=Object(v.a)(f,(function(){var e=this,r=e._self._c;return r("div",{staticClass:"login"},[r(o.a,{staticClass:"mx-2",attrs:{outlined:"",width:"400","max-height":"400"}},[r(d.d,[e._v("LOGIN")]),e._v(" "),r(d.c,[r(l.a,{attrs:{label:"Username",placeholder:"กรุณากรอก Username"},model:{value:e.username,callback:function(r){e.username=r},expression:"username"}}),e._v(" "),r(l.a,{attrs:{label:"Password",placeholder:"กรุณากรอก Password",type:"password"},model:{value:e.password,callback:function(r){e.password=r},expression:"password"}}),e._v(" "),r(n.a,{attrs:{loading:e.loading,color:"primary",block:"",dark:"",elevation:"0"},on:{click:e.login}},[e._v("ตกลง")])],1)],1)],1)}),[],!1,null,"80fb5ce4",null);r.default=component.exports}}]);