$wnd.jsme.runAsyncCallback10('var hta="400px",ita="Accept",jta="Close (ESC)",kta="Paste",lta="Paste the text to import into the text area below.",mta="accept",nta="close",m$="data-selenium-id",ota="dragend",pta="dragenter",qta="dragover",rta="drop",sta="file",tta="gwt-FileUpload",uta="gwt-HTML",vta="jsa_clipboard/button/",wta="jsa_clipboard/text_area",xta="jsa_clipboard/window";w(254,242,{});function n$(){n$=y;o$=new yD(ota,new p$)}function q$(a){a.a.cancelBubble=!0;JB(a.a)}function p$(){}w(255,254,{},p$);_.ge=function(){q$(this)};\n_.je=function(){return o$};var o$;function r$(){r$=y;s$=new yD(pta,new t$)}function t$(){}w(256,254,{},t$);_.ge=function(){q$(this)};_.je=function(){return s$};var s$;function u$(){u$=y;v$=new yD(qta,new w$)}function w$(){}w(257,254,{},w$);_.ge=function(){q$(this)};_.je=function(){return v$};var v$;function x$(){x$=y;y$=new yD(rta,new z$)}function z$(){}w(258,254,{},z$);\n_.ge=function(a){var b,c,d,e;this.a.cancelBubble=!0;JB(this.a);d=(this.a.dataTransfer||null).files;e=0;a:for(;e<d.length;++e){if(0<a.a.d&&e>=a.a.d)break a;b=d[e];c=new FileReader;yta(c,a.a.b);1==a.a.c&&c.readAsText(b)}0==d.length&&(b=(this.a.dataTransfer||null).getData(vq),a.a.b.a.a.d.ob[Rq]=null!=b?b:n)};_.je=function(){return y$};var y$;function A$(a,b,c){UE(!a.lb?a.lb=new gF(a):a.lb,c,b)}function B$(){this.ob=FB(sta);this.ob[fn]=tta}w(384,365,Fr,B$);_.Ce=function(a){JH(this,a)};\nfunction C$(a){var b=IB(Bn);Xv(kq,H1(b));this.ob=b;this.b=new Y2(this.ob);this.ob[fn]=uta;X2(this.b,a,!0);f3(this)}w(388,389,Fr,C$);function D$(a,b){var c,d;c=IB(Iq);d=IB(uq);d[Hm]=a.a.a;d.style[Sq]=a.b.a;var e=(HG(),IG(d));c.appendChild(e);GG(a.d,c);VH(a,b,d)}function E$(){PI.call(this);this.a=(SI(),ZI);this.b=($I(),cJ);this.e[an]=Xf;this.e[$m]=Xf}w(437,381,Pr,E$);_._e=function(a){var b;b=HB(a.ob);(a=ZH(this,a))&&this.d.removeChild(HB(b));return a};\nfunction F$(a){try{a.s=!1;var b,c,d;d=a.gb;c=a._;d||(a.ob.style[Tq]=ao,yJ(a.ob,!1),a._=!1,a.nf());b=a.ob;b.style[mo]=0+(CC(),yp);b.style[Dq]=bg;Y4(a,L0(YB($doc)+(XB()-CB(a.ob,dp)>>1),0),L0(ZB($doc)+(WB()-CB(a.ob,cp)>>1),0));d||((a._=c)?(a.ob.style[kn]=Mp,a.ob.style[Tq]=Uq,yJ(a.ob,!0),Cx(a.fb,200)):(a.ob.style[Tq]=Uq,yJ(a.ob,!0)))}finally{a.s=!0}}function G$(a,b){var c;c=(new P3(a)).xd.ng();c.ob.setAttribute(m$,vta+b);return c}\nfunction H$(a){var b;b=G$(jta,nta);FH(b,new I$(a),(ED(),ED(),FD));return b}\nfunction J$(){L4();var a,b,c,d,e;j5.call(this,(C5(),D5),null,!0);this.Dj();this.cb=!0;this.ob.setAttribute(m$,xta);this.U=!0;a=new C$(this.e);this.d=new kK;this.d.ob.setAttribute(m$,wta);zH(this.d,dg);wH(this.d,dg);C4(this,hta);e=new E$;e.ob.style[$n]=dg;e.e[an]=10;c=(SI(),TI);e.a=c;D$(e,a);D$(e,this.d);this.c=new gJ;this.c.e[an]=20;for(b=this.Bj(),c=0,d=b.length;c<d;++c)a=b[c],dJ(this.c,a);D$(e,this.c);Q4(this,e);$4(this,!1);FH(this.d,new K$(this),(ZD(),ZD(),$D));this.Cj()}w(798,799,P0,J$);\n_.Bj=function(){return A(vK,o,50,[H$(this)])};_.Cj=function(){var a=this.d;a.ob.readOnly=!0;var b=AH(a.ob)+"-readonly";vH(a.Oe(),b,!0)};_.Dj=function(){B5(this.H.b,"Copy")};_.nf=function(){i5(this);this.ob.style[Zq]=hg};_.c=null;_.d=null;_.e="Press Ctrl-C (Command-C on Mac) or right click (Option-click on Mac) on the selected text to copy it, then paste into another program.";function K$(a){this.a=a}w(801,1,{},K$);_.re=function(a){27==(a.a.keyCode||0)&&S4(this.a,!1)};_.a=null;\nfunction I$(a){this.a=a}w(802,1,{},I$);_.me=function(){S4(this.a,!1)};_.a=null;function L$(a){this.a=a}w(803,1,{},L$);\n_.Ud=function(){BH(this.a.d.ob,!0);NI(this.a.d,!0);var a=this.a.d,b;b=DB(a.ob,Rq).length;if(0<b&&a.jb){if(0>b)throw new sW("Length must be a positive integer. Length: "+b);if(b>DB(a.ob,Rq).length)throw new sW("From Index: 0  To Index: "+b+"  Text Length: "+DB(a.ob,Rq).length);var a=a.ob,c=0;try{var d=a.createTextRange(),e=a.value.substr(c,b).match(/(\\r\\n)/gi);null!=e&&(b-=e.length);var f=a.value.substring(0,c).match(/(\\r\\n)/gi);null!=f&&(c-=f.length);d.collapse(!0);d.moveStart("character",c);d.moveEnd("character",\nb);d.select()}catch(g){}}};_.a=null;function M$(a){var b;b=G$(a.a,mta);FH(b,new N$(a),(ED(),ED(),FD));return b}function O$(a){a.e=lta;a.a=ita;B5(a.H.b,kta)}function P$(a){L4();J$.call(this);this.b=a}w(805,798,P0,P$);_.Bj=function(){return A(vK,o,50,[M$(this),H$(this)])};_.Cj=function(){wH(this.d,"150px")};_.Dj=function(){O$(this)};_.nf=function(){i5(this);this.ob.style[Zq]=hg;pB((mB(),nB),new Q$(this))};_.a=null;_.b=null;function R$(a){L4();P$.call(this,a)}w(804,805,P0,R$);\n_.Bj=function(){var a;return A(vK,o,50,[M$(this),(a=new B$,a.ob.setAttribute(m$,"jsa_clipboard/button/browse_upload"),FH(a,new S$(this),(T1(),T1(),U1)),a),H$(this)])};_.Cj=function(){wH(this.d,"150px");var a=new T$(this),b=this.d;A$(b,new U$,(r$(),r$(),s$));A$(b,new V$,(n$(),n$(),o$));A$(b,new W$,(u$(),u$(),v$));A$(b,new X$(a),(x$(),x$(),y$))};_.Dj=function(){O$(this);this.e+=" Or drag and drop a file on it."};function S$(a){this.a=a}w(806,1,{},S$);\n_.le=function(a){var b,c;b=new FileReader;a=(c=a.a.srcElement,c.files[0]);zta(b,new Y$(this));b.readAsText(a)};_.a=null;function Y$(a){this.a=a}w(807,1,{},Y$);_.Ej=function(a){hK(this.a.a.d,a)};_.a=null;w(810,1,{});w(809,810,{});_.b=null;_.c=1;_.d=-1;function T$(a){this.a=a;this.b=new Z$(this);this.c=this.d=1}w(808,809,{},T$);_.a=null;function Z$(a){this.a=a}w(811,1,{},Z$);_.Ej=function(a){this.a.a.d.ob[Rq]=null!=a?a:n};_.a=null;function N$(a){this.a=a}w(815,1,{},N$);\n_.me=function(){if(this.a.b){var a=this.a.b,b;b=new yN(a.a,0,DB(this.a.d.ob,Rq));$T(a.a.a,b.a)}S4(this.a,!1)};_.a=null;function Q$(a){this.a=a}w(816,1,{},Q$);_.Ud=function(){BH(this.a.d.ob,!0);NI(this.a.d,!0)};_.a=null;w(817,1,es);_.de=function(){var a,b;a=new $$(this.a);void 0!=$wnd.FileReader?b=new R$(a):b=new P$(a);E4(b);F$(b)};function $$(a){this.a=a}w(818,1,{},$$);_.a=null;w(819,1,es);\n_.de=function(){var a;a=new J$;var b=this.a,c,d;hK(a.d,b);c=(d=PW(b,"\\r\\n|\\r|\\n|\\n\\r"),d.length);1>=c&&(c=~~(b.length/16));wH(a.d,20*(10>c+1?c+1:10)+yp);pB((mB(),nB),new L$(a));E4(a);F$(a)};function zta(a,b){a.onload=function(a){b.Ej(a.target.result)}}function yta(a,b){a.onloadend=function(a){b.Ej(a.target.result)}}function X$(a){this.a=a}w(826,1,{},X$);_.a=null;function U$(){}w(827,1,{},U$);function V$(){}w(828,1,{},V$);function W$(){}w(829,1,{},W$);Z(810);Z(809);Z(826);Z(827);Z(828);Z(829);Z(254);\nZ(256);Z(255);Z(257);Z(258);Z(798);Z(805);Z(804);Z(818);Z(801);Z(802);Z(803);Z(815);Z(816);Z(806);Z(807);Z(808);Z(811);Z(388);Z(437);Z(384);V(N0)(10);\n//# sourceURL=10.js\n')
