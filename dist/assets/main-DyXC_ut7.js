import{c as L,g as O,d as E,a as Y,b as T,o as A,q as H,e as $,w as F,T as N,f as z}from"./style-WdId_iU8.js";import{t as g,n as v,g as I,a as R,e as U,m as C,b as y}from"./en-US-CNxzIahJ.js";/* empty css                */function j(n,t){let e=n,s=t;const r=L(T,"chats");let o=null;const i=async f=>{const c=new Date,l={username:s,room:e,message:f,created_at:N.fromDate(c)};try{return await z(r,l)}catch(u){throw console.log("Error addchat = ",u),u}},a=f=>{o&&o(),o=A(H(r,F("room","==",e),$("created_at")),c=>{c.docChanges().forEach(l=>{l.type==="added"&&f(l.doc.data())})})},d=f=>{e=f},m=f=>{s=f,localStorage.setItem("username",s)};return(()=>{let f=setInterval(async()=>{try{const c=await O(r);if(c.empty){console.log("No message to delete "),clearInterval(f);return}c.forEach(async l=>{await E(Y(T,"chats",l.id))}),console.log("all messages deleted successfully")}catch(c){console.error("Error deleteing message : ",c)}},15e3)})(),{addChat:i,getChats:a,updateUsername:m,updateChatroom:d}}function x(n,t){const e=+g(n)-+g(t);return e<0?-1:e>0?1:e}function k(n,t,e){const[s,r]=v(e==null?void 0:e.in,n,t),o=s.getFullYear()-r.getFullYear(),i=s.getMonth()-r.getMonth();return o*12+i}function G(n){return t=>{const s=(n?Math[n]:Math.trunc)(t);return s===0?0:s}}function B(n,t){return+g(n)-+g(t)}function J(n,t){const e=g(n,t==null?void 0:t.in);return e.setHours(23,59,59,999),e}function K(n,t){const e=g(n,t==null?void 0:t.in),s=e.getMonth();return e.setFullYear(e.getFullYear(),s+1,0),e.setHours(23,59,59,999),e}function P(n,t){const e=g(n,t==null?void 0:t.in);return+J(e,t)==+K(e,t)}function Q(n,t,e){const[s,r,o]=v(e==null?void 0:e.in,n,n,t),i=x(r,o),a=Math.abs(k(r,o));if(a<1)return 0;r.getMonth()===1&&r.getDate()>27&&r.setDate(30),r.setMonth(r.getMonth()-i*a);let d=x(r,o)===-i;P(s)&&a===1&&x(s,o)===1&&(d=!1);const m=i*(a-+d);return m===0?0:m}function V(n,t,e){const s=B(n,t)/1e3;return G(e==null?void 0:e.roundingMethod)(s)}function W(n,t,e){const s=R(),r=(e==null?void 0:e.locale)??s.locale??U,o=2520,i=x(n,t);if(isNaN(i))throw new RangeError("Invalid time value");const a=Object.assign({},e,{addSuffix:e==null?void 0:e.addSuffix,comparison:i}),[d,m]=v(e==null?void 0:e.in,...i>0?[t,n]:[n,t]),h=V(m,d),f=(I(m)-I(d))/1e3,c=Math.round((h-f)/60);let l;if(c<2)return e!=null&&e.includeSeconds?h<5?r.formatDistance("lessThanXSeconds",5,a):h<10?r.formatDistance("lessThanXSeconds",10,a):h<20?r.formatDistance("lessThanXSeconds",20,a):h<40?r.formatDistance("halfAMinute",0,a):h<60?r.formatDistance("lessThanXMinutes",1,a):r.formatDistance("xMinutes",1,a):c===0?r.formatDistance("lessThanXMinutes",1,a):r.formatDistance("xMinutes",c,a);if(c<45)return r.formatDistance("xMinutes",c,a);if(c<90)return r.formatDistance("aboutXHours",1,a);if(c<C){const u=Math.round(c/60);return r.formatDistance("aboutXHours",u,a)}else{if(c<o)return r.formatDistance("xDays",1,a);if(c<y){const u=Math.round(c/C);return r.formatDistance("xDays",u,a)}else if(c<y*2)return l=Math.round(c/y),r.formatDistance("aboutXMonths",l,a)}if(l=Q(m,d),l<12){const u=Math.round(c/y);return r.formatDistance("xMonths",u,a)}else{const u=l%12,S=Math.trunc(l/12);return u<3?r.formatDistance("aboutXYears",S,a):u<9?r.formatDistance("overXYears",S,a):r.formatDistance("almostXYears",S+1,a)}}function Z(n){return{newli:s=>{const r=W(s.created_at.toDate(),new Date,{addSuffix:!0}),o=`
                <li class="shadow-xl rounded-lg px-4 py-2">
                        <div class="flex justify-between">
                            <h5 class="text-gray-600 font-medium text-sm">${s.username}</h5>
                            <i class="text-gray-500 text-xs">${r}</i>

                        </div>
                            <p class="text-gray-600 text-sm">${s.message}</p>

                </li>
        `;n.innerHTML+=o},resetli:()=>{n.innerHTML=""}}}const p=document.querySelector(".chatrooms"),ee=document.querySelector(".chat-ul"),w=document.querySelector(".chat-form"),D=document.querySelector(".user-form"),_=document.querySelector(".msg"),X=document.querySelector(".roomtitle"),q=localStorage.username?localStorage.username:"Guest";D.username.placeholder=`username is ${q} `;const M=j("general",q);X.textContent="General";const b=Z(ee);w.addEventListener("submit",n=>{n.preventDefault();const t=w.message.value.trim();M.addChat(t).then(()=>w.reset()).catch(e=>console.log(e))});D.addEventListener("submit",n=>{n.preventDefault();const t=D.username.value.trim();M.updateUsername(t),D.reset(),_.innerText=`New name updated to ${t}`,D.username.placeholder=`username is ${t}`,setTimeout(()=>_.innerText="",3e3)});p.addEventListener("click",n=>{n.preventDefault();const t=n.target.closest("button");if(t){b.resetli();const e=t.getAttribute("id"),s=t.querySelector("h3").innerText;X.textContent=s,M.updateChatroom(e)}M.getChats(e=>{b.newli(e)})});M.getChats(n=>{b.newli(n)});
