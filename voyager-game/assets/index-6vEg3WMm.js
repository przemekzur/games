var Nc=Object.defineProperty;var Uc=(i,e,t)=>e in i?Nc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var oe=(i,e,t)=>Uc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const go="162",Qn={ROTATE:0,DOLLY:1,PAN:2},ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Oc=0,Fo=1,Fc=2,Rl=1,Bc=2,fn=3,xn=0,Pt=1,pn=2,_n=0,Mi=1,Yi=2,Bo=3,zo=4,zc=5,Wn=100,kc=101,Gc=102,ko=103,Go=104,Hc=200,Vc=201,Wc=202,Xc=203,$r=204,Kr=205,qc=206,Yc=207,jc=208,$c=209,Kc=210,Zc=211,Jc=212,Qc=213,eh=214,th=0,nh=1,ih=2,ks=3,sh=4,rh=5,oh=6,ah=7,Pl=0,lh=1,ch=2,Rn=0,hh=1,uh=2,dh=3,fh=4,ph=5,mh=6,gh=7,Ll=300,Ei=301,bi=302,Zr=303,Jr=304,js=306,Qr=1e3,Yt=1001,eo=1002,Ct=1003,Ho=1004,Di=1005,Dt=1006,lr=1007,qn=1008,Pn=1009,_h=1010,vh=1011,_o=1012,Dl=1013,Cn=1014,mn=1015,vn=1016,Il=1017,Nl=1018,Yn=1020,xh=1021,jt=1023,yh=1024,Mh=1025,jn=1026,Ti=1027,Sh=1028,Ul=1029,Eh=1030,Ol=1031,Fl=1033,cr=33776,hr=33777,ur=33778,dr=33779,Vo=35840,Wo=35841,Xo=35842,qo=35843,Bl=36196,Yo=37492,jo=37496,$o=37808,Ko=37809,Zo=37810,Jo=37811,Qo=37812,ea=37813,ta=37814,na=37815,ia=37816,sa=37817,ra=37818,oa=37819,aa=37820,la=37821,fr=36492,ca=36494,ha=36495,bh=36283,ua=36284,da=36285,fa=36286,Th=3200,wh=3201,zl=0,Ah=1,An="",Zt="srgb",In="srgb-linear",vo="display-p3",$s="display-p3-linear",Gs="linear",st="srgb",Hs="rec709",Vs="p3",ti=7680,pa=519,Ch=512,Rh=513,Ph=514,kl=515,Lh=516,Dh=517,Ih=518,Nh=519,ma=35044,ga="300 es",to=1035,gn=2e3,Ws=2001;class Zn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _a=1234567;const ki=Math.PI/180,ji=180/Math.PI;function Jn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[i&255]+Et[i>>8&255]+Et[i>>16&255]+Et[i>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function xt(i,e,t){return Math.max(e,Math.min(t,i))}function xo(i,e){return(i%e+e)%e}function Uh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Oh(i,e,t){return i!==e?(t-i)/(e-i):0}function Gi(i,e,t){return(1-t)*i+t*e}function Fh(i,e,t,n){return Gi(i,e,1-Math.exp(-t*n))}function Bh(i,e=1){return e-Math.abs(xo(i,e*2)-e)}function zh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function kh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Gh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hh(i,e){return i+Math.random()*(e-i)}function Vh(i){return i*(.5-Math.random())}function Wh(i){i!==void 0&&(_a=i);let e=_a+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xh(i){return i*ki}function qh(i){return i*ji}function no(i){return(i&i-1)===0&&i!==0}function Yh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xs(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jh(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),p=o((e-n)/2),m=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*p,a*c);break;case"YZY":i.set(l*p,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*p,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*m,a*c);break;case"YXY":i.set(l*m,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Jt={DEG2RAD:ki,RAD2DEG:ji,generateUUID:Jn,clamp:xt,euclideanModulo:xo,mapLinear:Uh,inverseLerp:Oh,lerp:Gi,damp:Fh,pingpong:Bh,smoothstep:zh,smootherstep:kh,randInt:Gh,randFloat:Hh,randFloatSpread:Vh,seededRandom:Wh,degToRad:Xh,radToDeg:qh,isPowerOfTwo:no,ceilPowerOfTwo:Yh,floorPowerOfTwo:Xs,setQuaternionFromProperEuler:jh,normalize:wt,denormalize:_i};class ie{constructor(e=0,t=0){ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,s,r,o,a,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],m=n[5],g=n[8],_=s[0],f=s[3],d=s[6],S=s[1],v=s[4],M=s[7],L=s[2],A=s[5],T=s[8];return r[0]=o*_+a*S+l*L,r[3]=o*f+a*v+l*A,r[6]=o*d+a*M+l*T,r[1]=c*_+h*S+u*L,r[4]=c*f+h*v+u*A,r[7]=c*d+h*M+u*T,r[2]=p*_+m*S+g*L,r[5]=p*f+m*v+g*A,r[8]=p*d+m*M+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,p=a*l-h*r,m=c*r-o*l,g=t*u+n*p+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=p*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new Xe;function Gl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $h(){const i=qs("canvas");return i.style.display="block",i}const va={};function Kh(i){i in va||(va[i]=!0,console.warn(i))}const xa=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ya=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ss={[In]:{transfer:Gs,primaries:Hs,toReference:i=>i,fromReference:i=>i},[Zt]:{transfer:st,primaries:Hs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[$s]:{transfer:Gs,primaries:Vs,toReference:i=>i.applyMatrix3(ya),fromReference:i=>i.applyMatrix3(xa)},[vo]:{transfer:st,primaries:Vs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ya),fromReference:i=>i.applyMatrix3(xa).convertLinearToSRGB()}},Zh=new Set([In,$s]),et={enabled:!0,_workingColorSpace:In,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Zh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ss[e].toReference,s=ss[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ss[i].primaries},getTransfer:function(i){return i===An?Gs:ss[i].transfer}};function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ni;class Hl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ni===void 0&&(ni=qs("canvas")),ni.width=e.width,ni.height=e.height;const n=ni.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ni}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Si(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Si(t[n]/255)*255):t[n]=Si(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jh=0;class Vl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Jn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(gr(s[o].image)):r.push(gr(s[o]))}else r=gr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;class Nt extends Zn{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=Yt,s=Yt,r=Dt,o=qn,a=jt,l=Pn,c=Nt.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Jn(),this.name="",this.source=new Vl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ll)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qr:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qr:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Ll;Nt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],m=l[5],g=l[9],_=l[2],f=l[6],d=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(m+1)/2,L=(d+1)/2,A=(h+p)/4,T=(u+_)/4,N=(g+f)/4;return v>M&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=T/n):M>L?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=N/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=T/r,s=N/r),this.set(n,s,r,t),this}let S=Math.sqrt((f-g)*(f-g)+(u-_)*(u-_)+(p-h)*(p-h));return Math.abs(S)<.001&&(S=1),this.x=(f-g)/S,this.y=(u-_)/S,this.z=(p-h)/S,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eu extends Zn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const r=new Nt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Vl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $t extends eu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Wl extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tu extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $n{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const p=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=p,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==p||c!==m||h!==g){let f=1-a;const d=l*p+c*m+h*g+u*_,S=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const L=Math.sqrt(v),A=Math.atan2(L,d*S);f=Math.sin(f*A)/L,a=Math.sin(a*A)/L}const M=a*S;if(l=l*f+p*M,c=c*f+m*M,h=h*f+g*M,u=u*f+_*M,f===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],p=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*m-c*p,e[t+1]=l*g+h*p+c*u-a*m,e[t+2]=c*g+h*m+a*p-l*u,e[t+3]=h*g-a*u-l*p-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),p=l(n/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=p*h*u+c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u-p*m*g;break;case"YXZ":this._x=p*h*u+c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u+p*m*g;break;case"ZXY":this._x=p*h*u-c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u-p*m*g;break;case"ZYX":this._x=p*h*u-c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u+p*m*g;break;case"YZX":this._x=p*h*u+c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u-p*m*g;break;case"XZY":this._x=p*h*u-c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=n+a+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ma.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ma.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _r.copy(this).projectOnVector(e),this.sub(_r)}reflect(e){return this.sub(_r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _r=new C,Ma=new $n;class Qi{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vt):Vt.fromBufferAttribute(r,o),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rs.copy(n.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ii),os.subVectors(this.max,Ii),ii.subVectors(e.a,Ii),si.subVectors(e.b,Ii),ri.subVectors(e.c,Ii),yn.subVectors(si,ii),Mn.subVectors(ri,si),Fn.subVectors(ii,ri);let t=[0,-yn.z,yn.y,0,-Mn.z,Mn.y,0,-Fn.z,Fn.y,yn.z,0,-yn.x,Mn.z,0,-Mn.x,Fn.z,0,-Fn.x,-yn.y,yn.x,0,-Mn.y,Mn.x,0,-Fn.y,Fn.x,0];return!vr(t,ii,si,ri,os)||(t=[1,0,0,0,1,0,0,0,1],!vr(t,ii,si,ri,os))?!1:(as.crossVectors(yn,Mn),t=[as.x,as.y,as.z],vr(t,ii,si,ri,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ln=[new C,new C,new C,new C,new C,new C,new C,new C],Vt=new C,rs=new Qi,ii=new C,si=new C,ri=new C,yn=new C,Mn=new C,Fn=new C,Ii=new C,os=new C,as=new C,Bn=new C;function vr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bn.fromArray(i,r);const a=s.x*Math.abs(Bn.x)+s.y*Math.abs(Bn.y)+s.z*Math.abs(Bn.z),l=e.dot(Bn),c=t.dot(Bn),h=n.dot(Bn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const nu=new Qi,Ni=new C,xr=new C;class Ks{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ni.subVectors(e,this.center);const t=Ni.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ni,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ni.copy(e.center).add(xr)),this.expandByPoint(Ni.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const cn=new C,yr=new C,ls=new C,Sn=new C,Mr=new C,cs=new C,Sr=new C;class Zs{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cn.copy(this.origin).addScaledVector(this.direction,t),cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){yr.copy(e).add(t).multiplyScalar(.5),ls.copy(t).sub(e).normalize(),Sn.copy(this.origin).sub(yr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ls),a=Sn.dot(this.direction),l=-Sn.dot(ls),c=Sn.lengthSq(),h=Math.abs(1-o*o);let u,p,m,g;if(h>0)if(u=o*l-a,p=o*a-l,g=r*h,u>=0)if(p>=-g)if(p<=g){const _=1/h;u*=_,p*=_,m=u*(u+o*p+2*a)+p*(o*u+p+2*l)+c}else p=r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;else p<=-g?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+p*(p+2*l)+c):p<=g?(u=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+p*(p+2*l)+c);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yr).addScaledVector(ls,p),m}intersectSphere(e,t){cn.subVectors(e.center,this.origin);const n=cn.dot(this.direction),s=cn.dot(cn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),h>=0?(r=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(a=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,cn)!==null}intersectTriangle(e,t,n,s,r){Mr.subVectors(t,e),cs.subVectors(n,e),Sr.crossVectors(Mr,cs);let o=this.direction.dot(Sr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Sn.subVectors(this.origin,e);const l=a*this.direction.dot(cs.crossVectors(Sn,cs));if(l<0)return null;const c=a*this.direction.dot(Mr.cross(Sn));if(c<0||l+c>o)return null;const h=-a*Sn.dot(Sr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,n,s,r,o,a,l,c,h,u,p,m,g,_,f){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,p,m,g,_,f)}set(e,t,n,s,r,o,a,l,c,h,u,p,m,g,_,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=p,d[3]=m,d[7]=g,d[11]=_,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/oi.setFromMatrixColumn(e,0).length(),r=1/oi.setFromMatrixColumn(e,1).length(),o=1/oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=o*h,m=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=p-_*c,t[9]=-a*l,t[2]=_-p*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const p=l*h,m=l*u,g=c*h,_=c*u;t[0]=p+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=_+p*a,t[10]=o*l}else if(e.order==="ZXY"){const p=l*h,m=l*u,g=c*h,_=c*u;t[0]=p-_*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=_-p*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const p=o*h,m=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-m,t[8]=p*c+_,t[1]=l*u,t[5]=_*c+p,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-p*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*u+g,t[10]=p-_*u}else if(e.order==="XZY"){const p=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+_,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=_*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iu,e,su)}lookAt(e,t,n){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),En.crossVectors(n,Ot),En.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),En.crossVectors(n,Ot)),En.normalize(),hs.crossVectors(Ot,En),s[0]=En.x,s[4]=hs.x,s[8]=Ot.x,s[1]=En.y,s[5]=hs.y,s[9]=Ot.y,s[2]=En.z,s[6]=hs.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],m=n[13],g=n[2],_=n[6],f=n[10],d=n[14],S=n[3],v=n[7],M=n[11],L=n[15],A=s[0],T=s[4],N=s[8],$=s[12],x=s[1],w=s[5],J=s[9],Q=s[13],D=s[2],Y=s[6],H=s[10],U=s[14],O=s[3],k=s[7],z=s[11],q=s[15];return r[0]=o*A+a*x+l*D+c*O,r[4]=o*T+a*w+l*Y+c*k,r[8]=o*N+a*J+l*H+c*z,r[12]=o*$+a*Q+l*U+c*q,r[1]=h*A+u*x+p*D+m*O,r[5]=h*T+u*w+p*Y+m*k,r[9]=h*N+u*J+p*H+m*z,r[13]=h*$+u*Q+p*U+m*q,r[2]=g*A+_*x+f*D+d*O,r[6]=g*T+_*w+f*Y+d*k,r[10]=g*N+_*J+f*H+d*z,r[14]=g*$+_*Q+f*U+d*q,r[3]=S*A+v*x+M*D+L*O,r[7]=S*T+v*w+M*Y+L*k,r[11]=S*N+v*J+M*H+L*z,r[15]=S*$+v*Q+M*U+L*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],m=e[14],g=e[3],_=e[7],f=e[11],d=e[15];return g*(+r*l*u-s*c*u-r*a*p+n*c*p+s*a*m-n*l*m)+_*(+t*l*m-t*c*p+r*o*p-s*o*m+s*c*h-r*l*h)+f*(+t*c*u-t*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+d*(-s*a*h-t*l*u+t*a*p+s*o*u-n*o*p+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],m=e[11],g=e[12],_=e[13],f=e[14],d=e[15],S=u*f*c-_*p*c+_*l*m-a*f*m-u*l*d+a*p*d,v=g*p*c-h*f*c-g*l*m+o*f*m+h*l*d-o*p*d,M=h*_*c-g*u*c+g*a*m-o*_*m-h*a*d+o*u*d,L=g*u*l-h*_*l-g*a*p+o*_*p+h*a*f-o*u*f,A=t*S+n*v+s*M+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=S*T,e[1]=(_*p*r-u*f*r-_*s*m+n*f*m+u*s*d-n*p*d)*T,e[2]=(a*f*r-_*l*r+_*s*c-n*f*c-a*s*d+n*l*d)*T,e[3]=(u*l*r-a*p*r-u*s*c+n*p*c+a*s*m-n*l*m)*T,e[4]=v*T,e[5]=(h*f*r-g*p*r+g*s*m-t*f*m-h*s*d+t*p*d)*T,e[6]=(g*l*r-o*f*r-g*s*c+t*f*c+o*s*d-t*l*d)*T,e[7]=(o*p*r-h*l*r+h*s*c-t*p*c-o*s*m+t*l*m)*T,e[8]=M*T,e[9]=(g*u*r-h*_*r-g*n*m+t*_*m+h*n*d-t*u*d)*T,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*d+t*a*d)*T,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*m-t*a*m)*T,e[12]=L*T,e[13]=(h*_*s-g*u*s+g*n*p-t*_*p-h*n*f+t*u*f)*T,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*f-t*a*f)*T,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*p+t*a*p)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,p=r*c,m=r*h,g=r*u,_=o*h,f=o*u,d=a*u,S=l*c,v=l*h,M=l*u,L=n.x,A=n.y,T=n.z;return s[0]=(1-(_+d))*L,s[1]=(m+M)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(m-M)*A,s[5]=(1-(p+d))*A,s[6]=(f+S)*A,s[7]=0,s[8]=(g+v)*T,s[9]=(f-S)*T,s[10]=(1-(p+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=oi.set(s[0],s[1],s[2]).length();const o=oi.set(s[4],s[5],s[6]).length(),a=oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Wt.copy(this);const c=1/r,h=1/o,u=1/a;return Wt.elements[0]*=c,Wt.elements[1]*=c,Wt.elements[2]*=c,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=gn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s);let m,g;if(a===gn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ws)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=gn){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(o-r),p=(t+e)*c,m=(n+s)*h;let g,_;if(a===gn)g=(o+r)*u,_=-2*u;else if(a===Ws)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const oi=new C,Wt=new rt,iu=new C(0,0,0),su=new C(1,1,1),En=new C,hs=new C,Ot=new C,Sa=new rt,Ea=new $n;class sn{constructor(e=0,t=0,n=0,s=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(xt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ea.setFromEuler(this),this.setFromQuaternion(Ea,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ru=0;const ba=new C,ai=new $n,hn=new rt,us=new C,Ui=new C,ou=new C,au=new $n,Ta=new C(1,0,0),wa=new C(0,1,0),Aa=new C(0,0,1),lu={type:"added"},cu={type:"removed"},Er={type:"childadded",child:null},br={type:"childremoved",child:null};class Lt extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new C,t=new sn,n=new $n,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new Xe}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Ta,e)}rotateY(e){return this.rotateOnAxis(wa,e)}rotateZ(e){return this.rotateOnAxis(Aa,e)}translateOnAxis(e,t){return ba.copy(e).applyQuaternion(this.quaternion),this.position.add(ba.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ta,e)}translateY(e){return this.translateOnAxis(wa,e)}translateZ(e){return this.translateOnAxis(Aa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?us.copy(e):us.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Ui,us,this.up):hn.lookAt(us,Ui,this.up),this.quaternion.setFromRotationMatrix(hn),s&&(hn.extractRotation(s.matrixWorld),ai.setFromRotationMatrix(hn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(lu),Er.child=e,this.dispatchEvent(Er),Er.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cu),br.child=e,this.dispatchEvent(br),br.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,ou),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,au,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),p=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new C(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new C,un=new C,Tr=new C,dn=new C,li=new C,ci=new C,Ca=new C,wr=new C,Ar=new C,Cr=new C;class en{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xt.subVectors(e,t),s.cross(Xt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xt.subVectors(s,t),un.subVectors(n,t),Tr.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(un),l=Xt.dot(Tr),c=un.dot(un),h=un.dot(Tr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,m=(c*l-a*h)*p,g=(o*h-a*l)*p;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,dn)===null?!1:dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,dn.x),l.addScaledVector(o,dn.y),l.addScaledVector(a,dn.z),l)}static isFrontFacing(e,t,n,s){return Xt.subVectors(n,t),un.subVectors(e,t),Xt.cross(un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),un.subVectors(this.a,this.b),Xt.cross(un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return en.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;li.subVectors(s,n),ci.subVectors(r,n),wr.subVectors(e,n);const l=li.dot(wr),c=ci.dot(wr);if(l<=0&&c<=0)return t.copy(n);Ar.subVectors(e,s);const h=li.dot(Ar),u=ci.dot(Ar);if(h>=0&&u<=h)return t.copy(s);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(li,o);Cr.subVectors(e,r);const m=li.dot(Cr),g=ci.dot(Cr);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ci,a);const f=h*g-m*u;if(f<=0&&u-h>=0&&m-g>=0)return Ca.subVectors(r,s),a=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Ca,a);const d=1/(f+_+p);return o=_*d,a=p*d,t.copy(n).addScaledVector(li,o).addScaledVector(ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},ds={h:0,s:0,l:0};function Rr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=xo(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Rr(o,r,e+1/3),this.g=Rr(o,r,e),this.b=Rr(o,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Zt){const n=Xl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Zt){return et.fromWorkingColorSpace(bt.copy(this),e),Math.round(xt(bt.r*255,0,255))*65536+Math.round(xt(bt.g*255,0,255))*256+Math.round(xt(bt.b*255,0,255))}getHexString(e=Zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(bt.copy(this),t);const n=bt.r,s=bt.g,r=bt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=Zt){et.fromWorkingColorSpace(bt.copy(this),e);const t=bt.r,n=bt.g,s=bt.b;return e!==Zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bn),this.setHSL(bn.h+e,bn.s+t,bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bn),e.getHSL(ds);const n=Gi(bn.h,ds.h,t),s=Gi(bn.s,ds.s,t),r=Gi(bn.l,ds.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bt=new ke;ke.NAMES=Xl;let hu=0;class Ci extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=Mi,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=Kr,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$r&&(n.blendSrc=this.blendSrc),this.blendDst!==Kr&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Dn extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=Pl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new C,fs=new ie;class Rt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ma,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Kh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fs.fromBufferAttribute(this,t),fs.applyMatrix3(e),this.setXY(t,fs.x,fs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=_i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_i(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_i(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_i(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),n=wt(n,this.array),s=wt(s,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ma&&(e.usage=this.usage),e}}class ql extends Rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yl extends Rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nt extends Rt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uu=0;const kt=new rt,Pr=new Lt,hi=new C,Ft=new Qi,Oi=new Qi,vt=new C;class yt extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gl(e)?Yl:ql)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kt.makeRotationFromQuaternion(e),this.applyMatrix4(kt),this}rotateX(e){return kt.makeRotationX(e),this.applyMatrix4(kt),this}rotateY(e){return kt.makeRotationY(e),this.applyMatrix4(kt),this}rotateZ(e){return kt.makeRotationZ(e),this.applyMatrix4(kt),this}translate(e,t,n){return kt.makeTranslation(e,t,n),this.applyMatrix4(kt),this}scale(e,t,n){return kt.makeScale(e,t,n),this.applyMatrix4(kt),this}lookAt(e){return Pr.lookAt(e),Pr.updateMatrix(),this.applyMatrix4(Pr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new nt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ft.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Ft.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Ft.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Ft.min),this.boundingBox.expandByPoint(Ft.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Ft.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Oi.setFromBufferAttribute(a),this.morphTargetsRelative?(vt.addVectors(Ft.min,Oi.min),Ft.expandByPoint(vt),vt.addVectors(Ft.max,Oi.max),Ft.expandByPoint(vt)):(Ft.expandByPoint(Oi.min),Ft.expandByPoint(Oi.max))}Ft.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(vt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)vt.fromBufferAttribute(a,c),l&&(hi.fromBufferAttribute(e,c),vt.add(hi)),s=Math.max(s,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new C,l[N]=new C;const c=new C,h=new C,u=new C,p=new ie,m=new ie,g=new ie,_=new C,f=new C;function d(N,$,x){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,$),u.fromBufferAttribute(n,x),p.fromBufferAttribute(r,N),m.fromBufferAttribute(r,$),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),m.sub(p),g.sub(p);const w=1/(m.x*g.y-g.x*m.y);isFinite(w)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(w),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(w),a[N].add(_),a[$].add(_),a[x].add(_),l[N].add(f),l[$].add(f),l[x].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let N=0,$=S.length;N<$;++N){const x=S[N],w=x.start,J=x.count;for(let Q=w,D=w+J;Q<D;Q+=3)d(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const v=new C,M=new C,L=new C,A=new C;function T(N){L.fromBufferAttribute(s,N),A.copy(L);const $=a[N];v.copy($),v.sub(L.multiplyScalar(L.dot($))).normalize(),M.crossVectors(A,$);const w=M.dot(l[N])<0?-1:1;o.setXYZW(N,v.x,v.y,v.z,w)}for(let N=0,$=S.length;N<$;++N){const x=S[N],w=x.start,J=x.count;for(let Q=w,D=w+J;Q<D;Q+=3)T(e.getX(Q+0)),T(e.getX(Q+1)),T(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let p=0,m=e.count;p<m;p+=3){const g=e.getX(p+0),_=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,f),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,p=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,f=l.length;_<f;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let d=0;d<h;d++)p[g++]=c[m++]}return new Rt(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const p=c[h],m=e(p,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let p=0,m=u.length;p<m;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ra=new rt,zn=new Zs,ps=new Ks,Pa=new C,ui=new C,di=new C,fi=new C,Lr=new C,ms=new C,gs=new ie,_s=new ie,vs=new ie,La=new C,Da=new C,Ia=new C,xs=new C,ys=new C;class ve extends Lt{constructor(e=new yt,t=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ms.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Lr.fromBufferAttribute(u,e),o?ms.addScaledVector(Lr,h):ms.addScaledVector(Lr.sub(t),h))}t.add(ms)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),zn.copy(e.ray).recast(e.near),!(ps.containsPoint(zn.origin)===!1&&(zn.intersectSphere(ps,Pa)===null||zn.origin.distanceToSquared(Pa)>(e.far-e.near)**2))&&(Ra.copy(r).invert(),zn.copy(e.ray).applyMatrix4(Ra),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const f=p[g],d=o[f.materialIndex],S=Math.max(f.start,m.start),v=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let M=S,L=v;M<L;M+=3){const A=a.getX(M),T=a.getX(M+1),N=a.getX(M+2);s=Ms(this,d,e,n,c,h,u,A,T,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let f=g,d=_;f<d;f+=3){const S=a.getX(f),v=a.getX(f+1),M=a.getX(f+2);s=Ms(this,o,e,n,c,h,u,S,v,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const f=p[g],d=o[f.materialIndex],S=Math.max(f.start,m.start),v=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let M=S,L=v;M<L;M+=3){const A=M,T=M+1,N=M+2;s=Ms(this,d,e,n,c,h,u,A,T,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let f=g,d=_;f<d;f+=3){const S=f,v=f+1,M=f+2;s=Ms(this,o,e,n,c,h,u,S,v,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function du(i,e,t,n,s,r,o,a){let l;if(e.side===Pt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===xn,a),l===null)return null;ys.copy(a),ys.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ys);return c<t.near||c>t.far?null:{distance:c,point:ys.clone(),object:i}}function Ms(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,ui),i.getVertexPosition(l,di),i.getVertexPosition(c,fi);const h=du(i,e,t,n,ui,di,fi,xs);if(h){s&&(gs.fromBufferAttribute(s,a),_s.fromBufferAttribute(s,l),vs.fromBufferAttribute(s,c),h.uv=en.getInterpolation(xs,ui,di,fi,gs,_s,vs,new ie)),r&&(gs.fromBufferAttribute(r,a),_s.fromBufferAttribute(r,l),vs.fromBufferAttribute(r,c),h.uv1=en.getInterpolation(xs,ui,di,fi,gs,_s,vs,new ie)),o&&(La.fromBufferAttribute(o,a),Da.fromBufferAttribute(o,l),Ia.fromBufferAttribute(o,c),h.normal=en.getInterpolation(xs,ui,di,fi,La,Da,Ia,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new C,materialIndex:0};en.getNormal(ui,di,fi,u.normal),h.face=u}return h}class $e extends yt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let p=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(u,2));function g(_,f,d,S,v,M,L,A,T,N,$){const x=M/T,w=L/N,J=M/2,Q=L/2,D=A/2,Y=T+1,H=N+1;let U=0,O=0;const k=new C;for(let z=0;z<H;z++){const q=z*w-Q;for(let re=0;re<Y;re++){const Re=re*x-J;k[_]=Re*S,k[f]=q*v,k[d]=D,c.push(k.x,k.y,k.z),k[_]=0,k[f]=0,k[d]=A>0?1:-1,h.push(k.x,k.y,k.z),u.push(re/T),u.push(1-z/N),U+=1}}for(let z=0;z<N;z++)for(let q=0;q<T;q++){const re=p+q+Y*z,Re=p+q+Y*(z+1),B=p+(q+1)+Y*(z+1),ee=p+(q+1)+Y*z;l.push(re,Re,ee),l.push(Re,B,ee),O+=6}a.addGroup(m,O,$),m+=O,p+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function At(i){const e={};for(let t=0;t<i.length;t++){const n=wi(i[t]);for(const s in n)e[s]=n[s]}return e}function fu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function jl(i){return i.getRenderTarget()===null?i.outputColorSpace:et.workingColorSpace}const Ys={clone:wi,merge:At};var pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pu,this.fragmentShader=mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wi(e.uniforms),this.uniformsGroups=fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class $l extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new C,Na=new ie,Ua=new ie;class Bt extends $l{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ki*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ji*2*Math.atan(Math.tan(ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Tn.x,Tn.y).multiplyScalar(-e/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-e/Tn.z)}getViewSize(e,t){return this.getViewBounds(e,Na,Ua),t.subVectors(Ua,Na)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ki*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,mi=1;class gu extends Lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bt(pi,mi,e,t);s.layers=this.layers,this.add(s);const r=new Bt(pi,mi,e,t);r.layers=this.layers,this.add(r);const o=new Bt(pi,mi,e,t);o.layers=this.layers,this.add(o);const a=new Bt(pi,mi,e,t);a.layers=this.layers,this.add(a);const l=new Bt(pi,mi,e,t);l.layers=this.layers,this.add(l);const c=new Bt(pi,mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,p,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kl extends Nt{constructor(e,t,n,s,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ei,super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _u extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Kl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $e(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:_n});r.uniforms.tEquirect.value=t;const o=new ve(s,r),a=t.minFilter;return t.minFilter===qn&&(t.minFilter=Dt),new gu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Dr=new C,vu=new C,xu=new Xe;class wn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Dr.subVectors(n,t).cross(vu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Dr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||xu.getNormalMatrix(e),s=this.coplanarPoint(Dr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kn=new Ks,Ss=new C;class Mo{constructor(e=new wn,t=new wn,n=new wn,s=new wn,r=new wn,o=new wn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],p=s[7],m=s[8],g=s[9],_=s[10],f=s[11],d=s[12],S=s[13],v=s[14],M=s[15];if(n[0].setComponents(l-r,p-c,f-m,M-d).normalize(),n[1].setComponents(l+r,p+c,f+m,M+d).normalize(),n[2].setComponents(l+o,p+h,f+g,M+S).normalize(),n[3].setComponents(l-o,p-h,f-g,M-S).normalize(),n[4].setComponents(l-a,p-u,f-_,M-v).normalize(),t===gn)n[5].setComponents(l+a,p+u,f+_,M+v).normalize();else if(t===Ws)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),kn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kn)}intersectsSprite(e){return kn.center.set(0,0,0),kn.radius=.7071067811865476,kn.applyMatrix4(e.matrixWorld),this.intersectsSphere(kn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ss.x=s.normal.x>0?e.max.x:e.min.x,Ss.y=s.normal.y>0?e.max.y:e.min.y,Ss.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zl(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function yu(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,h){const u=c.array,p=c.usage,m=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,p),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,u){const p=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),m.count===-1&&g.length===0&&i.bufferSubData(u,0,p),g.length!==0){for(let _=0,f=g.length;_<f;_++){const d=g[_];t?i.bufferSubData(u,d.start*p.BYTES_PER_ELEMENT,p,d.start,d.count):i.bufferSubData(u,d.start*p.BYTES_PER_ELEMENT,p.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(u,m.offset*p.BYTES_PER_ELEMENT,p,m.offset,m.count):i.bufferSubData(u,m.offset*p.BYTES_PER_ELEMENT,p.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const p=n.get(c);(!p||p.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class Js extends yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,p=t/l,m=[],g=[],_=[],f=[];for(let d=0;d<h;d++){const S=d*p-o;for(let v=0;v<c;v++){const M=v*u-r;g.push(M,-S,0),_.push(0,0,1),f.push(v/a),f.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<a;S++){const v=S+c*d,M=S+c*(d+1),L=S+1+c*(d+1),A=S+1+c*d;m.push(v,M,A),m.push(M,L,A)}this.setIndex(m),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.width,e.height,e.widthSegments,e.heightSegments)}}var Mu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Su=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Eu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Au=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ru=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Du=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Iu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Nu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Uu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Wu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Yu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ju=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,td=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,od=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_d=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Md=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ld=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Id=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ud=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Od=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Fd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,zd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$d=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,of=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_f=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ef=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Pf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Mu,alphahash_pars_fragment:Su,alphamap_fragment:Eu,alphamap_pars_fragment:bu,alphatest_fragment:Tu,alphatest_pars_fragment:wu,aomap_fragment:Au,aomap_pars_fragment:Cu,batching_pars_vertex:Ru,batching_vertex:Pu,begin_vertex:Lu,beginnormal_vertex:Du,bsdfs:Iu,iridescence_fragment:Nu,bumpmap_pars_fragment:Uu,clipping_planes_fragment:Ou,clipping_planes_pars_fragment:Fu,clipping_planes_pars_vertex:Bu,clipping_planes_vertex:zu,color_fragment:ku,color_pars_fragment:Gu,color_pars_vertex:Hu,color_vertex:Vu,common:Wu,cube_uv_reflection_fragment:Xu,defaultnormal_vertex:qu,displacementmap_pars_vertex:Yu,displacementmap_vertex:ju,emissivemap_fragment:$u,emissivemap_pars_fragment:Ku,colorspace_fragment:Zu,colorspace_pars_fragment:Ju,envmap_fragment:Qu,envmap_common_pars_fragment:ed,envmap_pars_fragment:td,envmap_pars_vertex:nd,envmap_physical_pars_fragment:pd,envmap_vertex:id,fog_vertex:sd,fog_pars_vertex:rd,fog_fragment:od,fog_pars_fragment:ad,gradientmap_pars_fragment:ld,lightmap_fragment:cd,lightmap_pars_fragment:hd,lights_lambert_fragment:ud,lights_lambert_pars_fragment:dd,lights_pars_begin:fd,lights_toon_fragment:md,lights_toon_pars_fragment:gd,lights_phong_fragment:_d,lights_phong_pars_fragment:vd,lights_physical_fragment:xd,lights_physical_pars_fragment:yd,lights_fragment_begin:Md,lights_fragment_maps:Sd,lights_fragment_end:Ed,logdepthbuf_fragment:bd,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:wd,logdepthbuf_vertex:Ad,map_fragment:Cd,map_pars_fragment:Rd,map_particle_fragment:Pd,map_particle_pars_fragment:Ld,metalnessmap_fragment:Dd,metalnessmap_pars_fragment:Id,morphinstance_vertex:Nd,morphcolor_vertex:Ud,morphnormal_vertex:Od,morphtarget_pars_vertex:Fd,morphtarget_vertex:Bd,normal_fragment_begin:zd,normal_fragment_maps:kd,normal_pars_fragment:Gd,normal_pars_vertex:Hd,normal_vertex:Vd,normalmap_pars_fragment:Wd,clearcoat_normal_fragment_begin:Xd,clearcoat_normal_fragment_maps:qd,clearcoat_pars_fragment:Yd,iridescence_pars_fragment:jd,opaque_fragment:$d,packing:Kd,premultiplied_alpha_fragment:Zd,project_vertex:Jd,dithering_fragment:Qd,dithering_pars_fragment:ef,roughnessmap_fragment:tf,roughnessmap_pars_fragment:nf,shadowmap_pars_fragment:sf,shadowmap_pars_vertex:rf,shadowmap_vertex:of,shadowmask_pars_fragment:af,skinbase_vertex:lf,skinning_pars_vertex:cf,skinning_vertex:hf,skinnormal_vertex:uf,specularmap_fragment:df,specularmap_pars_fragment:ff,tonemapping_fragment:pf,tonemapping_pars_fragment:mf,transmission_fragment:gf,transmission_pars_fragment:_f,uv_pars_fragment:vf,uv_pars_vertex:xf,uv_vertex:yf,worldpos_vertex:Mf,background_vert:Sf,background_frag:Ef,backgroundCube_vert:bf,backgroundCube_frag:Tf,cube_vert:wf,cube_frag:Af,depth_vert:Cf,depth_frag:Rf,distanceRGBA_vert:Pf,distanceRGBA_frag:Lf,equirect_vert:Df,equirect_frag:If,linedashed_vert:Nf,linedashed_frag:Uf,meshbasic_vert:Of,meshbasic_frag:Ff,meshlambert_vert:Bf,meshlambert_frag:zf,meshmatcap_vert:kf,meshmatcap_frag:Gf,meshnormal_vert:Hf,meshnormal_frag:Vf,meshphong_vert:Wf,meshphong_frag:Xf,meshphysical_vert:qf,meshphysical_frag:Yf,meshtoon_vert:jf,meshtoon_frag:$f,points_vert:Kf,points_frag:Zf,shadow_vert:Jf,shadow_frag:Qf,sprite_vert:ep,sprite_frag:tp},ge={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Qt={basic:{uniforms:At([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:At([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ke(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:At([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:At([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:At([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new ke(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:At([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:At([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:At([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:At([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:At([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:At([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:At([ge.common,ge.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:At([ge.lights,ge.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Qt.physical={uniforms:At([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Es={r:0,b:0,g:0},Gn=new sn,np=new rt;function ip(i,e,t,n,s,r,o){const a=new ke(0);let l=r===!0?0:1,c,h,u=null,p=0,m=null;function g(f,d){let S=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),S=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===js)?(h===void 0&&(h=new ve(new $e(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:wi(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Gn.copy(d.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(np.makeRotationFromEuler(Gn)),h.material.toneMapped=et.getTransfer(v.colorSpace)!==st,(u!==v||p!==v.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,p=v.version,m=i.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ve(new Js(2,2),new Tt({name:"BackgroundMaterial",uniforms:wi(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=et.getTransfer(v.colorSpace)!==st,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||p!==v.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,p=v.version,m=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function _(f,d){f.getRGB(Es,jl(i)),n.buffers.color.setClear(Es.r,Es.g,Es.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(f,d=1){a.set(f),l=d,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,_(a,l)},render:g}}function sp(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=f(null);let c=l,h=!1;function u(D,Y,H,U,O){let k=!1;if(o){const z=_(U,H,Y);c!==z&&(c=z,m(c.object)),k=d(D,U,H,O),k&&S(D,U,H,O)}else{const z=Y.wireframe===!0;(c.geometry!==U.id||c.program!==H.id||c.wireframe!==z)&&(c.geometry=U.id,c.program=H.id,c.wireframe=z,k=!0)}O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(k||h)&&(h=!1,N(D,Y,H,U),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function p(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(D){return n.isWebGL2?i.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,Y,H){const U=H.wireframe===!0;let O=a[D.id];O===void 0&&(O={},a[D.id]=O);let k=O[Y.id];k===void 0&&(k={},O[Y.id]=k);let z=k[U];return z===void 0&&(z=f(p()),k[U]=z),z}function f(D){const Y=[],H=[],U=[];for(let O=0;O<s;O++)Y[O]=0,H[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:H,attributeDivisors:U,object:D,attributes:{},index:null}}function d(D,Y,H,U){const O=c.attributes,k=Y.attributes;let z=0;const q=H.getAttributes();for(const re in q)if(q[re].location>=0){const B=O[re];let ee=k[re];if(ee===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),B===void 0||B.attribute!==ee||ee&&B.data!==ee.data)return!0;z++}return c.attributesNum!==z||c.index!==U}function S(D,Y,H,U){const O={},k=Y.attributes;let z=0;const q=H.getAttributes();for(const re in q)if(q[re].location>=0){let B=k[re];B===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(B=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(B=D.instanceColor));const ee={};ee.attribute=B,B&&B.data&&(ee.data=B.data),O[re]=ee,z++}c.attributes=O,c.attributesNum=z,c.index=U}function v(){const D=c.newAttributes;for(let Y=0,H=D.length;Y<H;Y++)D[Y]=0}function M(D){L(D,0)}function L(D,Y){const H=c.newAttributes,U=c.enabledAttributes,O=c.attributeDivisors;H[D]=1,U[D]===0&&(i.enableVertexAttribArray(D),U[D]=1),O[D]!==Y&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,Y),O[D]=Y)}function A(){const D=c.newAttributes,Y=c.enabledAttributes;for(let H=0,U=Y.length;H<U;H++)Y[H]!==D[H]&&(i.disableVertexAttribArray(H),Y[H]=0)}function T(D,Y,H,U,O,k,z){z===!0?i.vertexAttribIPointer(D,Y,H,O,k):i.vertexAttribPointer(D,Y,H,U,O,k)}function N(D,Y,H,U){if(n.isWebGL2===!1&&(D.isInstancedMesh||U.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const O=U.attributes,k=H.getAttributes(),z=Y.defaultAttributeValues;for(const q in k){const re=k[q];if(re.location>=0){let Re=O[q];if(Re===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(Re=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(Re=D.instanceColor)),Re!==void 0){const B=Re.normalized,ee=Re.itemSize,ae=t.get(Re);if(ae===void 0)continue;const me=ae.buffer,xe=ae.type,Ee=ae.bytesPerElement,Ne=n.isWebGL2===!0&&(xe===i.INT||xe===i.UNSIGNED_INT||Re.gpuType===Dl);if(Re.isInterleavedBufferAttribute){const we=Re.data,P=we.stride,he=Re.offset;if(we.isInstancedInterleavedBuffer){for(let K=0;K<re.locationSize;K++)L(re.location+K,we.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=we.meshPerAttribute*we.count)}else for(let K=0;K<re.locationSize;K++)M(re.location+K);i.bindBuffer(i.ARRAY_BUFFER,me);for(let K=0;K<re.locationSize;K++)T(re.location+K,ee/re.locationSize,xe,B,P*Ee,(he+ee/re.locationSize*K)*Ee,Ne)}else{if(Re.isInstancedBufferAttribute){for(let we=0;we<re.locationSize;we++)L(re.location+we,Re.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let we=0;we<re.locationSize;we++)M(re.location+we);i.bindBuffer(i.ARRAY_BUFFER,me);for(let we=0;we<re.locationSize;we++)T(re.location+we,ee/re.locationSize,xe,B,ee*Ee,ee/re.locationSize*we*Ee,Ne)}}else if(z!==void 0){const B=z[q];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(re.location,B);break;case 3:i.vertexAttrib3fv(re.location,B);break;case 4:i.vertexAttrib4fv(re.location,B);break;default:i.vertexAttrib1fv(re.location,B)}}}}A()}function $(){J();for(const D in a){const Y=a[D];for(const H in Y){const U=Y[H];for(const O in U)g(U[O].object),delete U[O];delete Y[H]}delete a[D]}}function x(D){if(a[D.id]===void 0)return;const Y=a[D.id];for(const H in Y){const U=Y[H];for(const O in U)g(U[O].object),delete U[O];delete Y[H]}delete a[D.id]}function w(D){for(const Y in a){const H=a[Y];if(H[D.id]===void 0)continue;const U=H[D.id];for(const O in U)g(U[O].object),delete U[O];delete H[D.id]}}function J(){Q(),h=!0,c!==l&&(c=l,m(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:J,resetDefaultState:Q,dispose:$,releaseStatesOfGeometry:x,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:M,disableUnusedAttributes:A}}function rp(i,e,t,n){const s=n.isWebGL2;let r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,p){if(p===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,u,p),t.update(u,r,p)}function c(h,u,p){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<p;g++)this.render(h[g],u[g]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,p);let g=0;for(let _=0;_<p;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function op(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),f=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=p>0,M=o||e.has("OES_texture_float"),L=v&&M,A=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:p,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:f,maxVaryings:d,maxFragmentUniforms:S,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:L,maxSamples:A}}function ap(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new wn,a=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||n!==0||s;return s=p,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=h(u,p,0)},this.setState=function(u,p,m){const g=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!f)r?h(null):c();else{const S=r?0:n,v=S*4;let M=d.clippingState||null;l.value=M,M=h(g,p,v,m);for(let L=0;L!==v;++L)M[L]=t[L];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,p,m,g){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=l.value,g!==!0||f===null){const d=m+_*4,S=p.matrixWorldInverse;a.getNormalMatrix(S),(f===null||f.length<d)&&(f=new Float32Array(d));for(let v=0,M=m;v!==_;++v,M+=4)o.copy(u[v]).applyMatrix4(S,a),o.normal.toArray(f,M),f[M+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}}function lp(i){let e=new WeakMap;function t(o,a){return a===Zr?o.mapping=Ei:a===Jr&&(o.mapping=bi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Zr||a===Jr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _u(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Jl extends $l{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const vi=4,Oa=[.125,.215,.35,.446,.526,.582],Xn=20,Ir=new Jl,Fa=new ke;let Nr=null,Ur=0,Or=0;const Vn=(1+Math.sqrt(5))/2,gi=1/Vn,Ba=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Vn,gi),new C(0,Vn,-gi),new C(gi,0,Vn),new C(-gi,0,Vn),new C(Vn,gi,0),new C(-Vn,gi,0)];class za{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ha(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ga(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nr,Ur,Or),e.scissorTest=!1,bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:vn,format:jt,colorSpace:In,depthBuffer:!1},s=ka(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ka(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(r)),this._blurMaterial=hp(r,e,t)}return s}_compileMaterial(e){const t=new ve(this._lodPlanes[0],e);this._renderer.compile(t,Ir)}_sceneToCubeUV(e,t,n,s){const a=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Fa),h.toneMapping=Rn,h.autoClear=!1;const m=new Dn({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),g=new ve(new $e,m);let _=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,_=!0):(m.color.copy(Fa),_=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):S===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const v=this._cubeSize;bs(s,S*v,d>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=u,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ei||e.mapping===bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ha()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ga());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ve(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ir)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ba[(s-1)%Ba.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ve(this._lodPlanes[s],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Xn-1),_=r/g,f=isFinite(r)?1+Math.floor(h*_):Xn;f>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Xn}`);const d=[];let S=0;for(let T=0;T<Xn;++T){const N=T/_,$=Math.exp(-N*N/2);d.push($),T===0?S+=$:T<f&&(S+=2*$)}for(let T=0;T<d.length;T++)d[T]=d[T]/S;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:v}=this;p.dTheta.value=g,p.mipInt.value=v-n;const M=this._sizeLods[s],L=3*M*(s>v-vi?s-v+vi:0),A=4*(this._cubeSize-M);bs(t,L,A,3*M,2*M),l.setRenderTarget(t),l.render(u,Ir)}}function cp(i){const e=[],t=[],n=[];let s=i;const r=i-vi+1+Oa.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-vi?l=Oa[o-i+vi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,f=2,d=1,S=new Float32Array(_*g*m),v=new Float32Array(f*g*m),M=new Float32Array(d*g*m);for(let A=0;A<m;A++){const T=A%3*2/3-1,N=A>2?0:-1,$=[T,N,0,T+2/3,N,0,T+2/3,N+1,0,T,N,0,T+2/3,N+1,0,T,N+1,0];S.set($,_*g*A),v.set(p,f*g*A);const x=[A,A,A,A,A,A];M.set(x,d*g*A)}const L=new yt;L.setAttribute("position",new Rt(S,_)),L.setAttribute("uv",new Rt(v,f)),L.setAttribute("faceIndex",new Rt(M,d)),e.push(L),s>vi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ka(i,e,t){const n=new $t(i,e,t);return n.texture.mapping=js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hp(i,e,t){const n=new Float32Array(Xn),s=new C(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:So(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Ga(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:So(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function Ha(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:So(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_n,depthTest:!1,depthWrite:!1})}function So(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function up(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Zr||l===Jr,h=l===Ei||l===bi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new za(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new za(i));const p=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,p),a.addEventListener("dispose",r),p.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function dp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function fp(i,e,t,n){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);for(const g in p.morphAttributes){const _=p.morphAttributes[g];for(let f=0,d=_.length;f<d;f++)e.remove(_[f])}p.removeEventListener("dispose",o),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,t.memory.geometries++),p}function l(u){const p=u.attributes;for(const g in p)e.update(p[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let f=0,d=_.length;f<d;f++)e.update(_[f],i.ARRAY_BUFFER)}}function c(u){const p=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const S=m.array;_=m.version;for(let v=0,M=S.length;v<M;v+=3){const L=S[v+0],A=S[v+1],T=S[v+2];p.push(L,A,A,T,T,L)}}else if(g!==void 0){const S=g.array;_=g.version;for(let v=0,M=S.length/3-1;v<M;v+=3){const L=v+0,A=v+1,T=v+2;p.push(L,A,A,T,T,L)}}else return;const f=new(Gl(p)?Yl:ql)(p,1);f.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,f)}function h(u){const p=r.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function pp(i,e,t,n){const s=n.isWebGL2;let r;function o(m){r=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,a,m*l),t.update(g,r,1)}function u(m,g,_){if(_===0)return;let f,d;if(s)f=i,d="drawElementsInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](r,g,a,m*l,_),t.update(g,r,_)}function p(m,g,_){if(_===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<_;d++)this.render(m[d]/l,g[d]);else{f.multiDrawElementsWEBGL(r,g,0,a,m,0,_);let d=0;for(let S=0;S<_;S++)d+=g[S];t.update(d,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=p}function mp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gp(i,e){return i[0]-e[0]}function _p(i,e){return Math.abs(e[1])-Math.abs(i[1])}function vp(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new at,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let f=r.get(h);if(f===void 0||f.count!==_){let Q=function(){w.dispose(),r.delete(h),h.removeEventListener("dispose",Q)};var m=Q;f!==void 0&&f.texture.dispose();const d=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,v=h.morphAttributes.color!==void 0,M=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let T=0;d===!0&&(T=1),S===!0&&(T=2),v===!0&&(T=3);let N=h.attributes.position.count*T,$=1;N>e.maxTextureSize&&($=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const x=new Float32Array(N*$*4*_),w=new Wl(x,N,$,_);w.type=mn,w.needsUpdate=!0;const J=T*4;for(let D=0;D<_;D++){const Y=M[D],H=L[D],U=A[D],O=N*$*4*D;for(let k=0;k<Y.count;k++){const z=k*J;d===!0&&(o.fromBufferAttribute(Y,k),x[O+z+0]=o.x,x[O+z+1]=o.y,x[O+z+2]=o.z,x[O+z+3]=0),S===!0&&(o.fromBufferAttribute(H,k),x[O+z+4]=o.x,x[O+z+5]=o.y,x[O+z+6]=o.z,x[O+z+7]=0),v===!0&&(o.fromBufferAttribute(U,k),x[O+z+8]=o.x,x[O+z+9]=o.y,x[O+z+10]=o.z,x[O+z+11]=U.itemSize===4?o.w:1)}}f={count:_,texture:w,size:new ie(N,$)},r.set(h,f),h.addEventListener("dispose",Q)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",c.morphTexture,t);else{let d=0;for(let v=0;v<p.length;v++)d+=p[v];const S=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",S),u.getUniforms().setValue(i,"morphTargetInfluences",p)}u.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}else{const g=p===void 0?0:p.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[h.id]=_}for(let M=0;M<g;M++){const L=_[M];L[0]=M,L[1]=p[M]}_.sort(_p);for(let M=0;M<8;M++)M<g&&_[M][1]?(a[M][0]=_[M][0],a[M][1]=_[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(gp);const f=h.morphAttributes.position,d=h.morphAttributes.normal;let S=0;for(let M=0;M<8;M++){const L=a[M],A=L[0],T=L[1];A!==Number.MAX_SAFE_INTEGER&&T?(f&&h.getAttribute("morphTarget"+M)!==f[A]&&h.setAttribute("morphTarget"+M,f[A]),d&&h.getAttribute("morphNormal"+M)!==d[A]&&h.setAttribute("morphNormal"+M,d[A]),s[M]=T,S+=T):(f&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),d&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),s[M]=0)}const v=h.morphTargetsRelative?1:1-S;u.getUniforms().setValue(i,"morphTargetBaseInfluence",v),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function xp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ql extends Nt{constructor(e,t,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:jn,h!==jn&&h!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===jn&&(n=Cn),n===void 0&&h===Ti&&(n=Yn),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ct,this.minFilter=l!==void 0?l:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ec=new Nt,tc=new Ql(1,1);tc.compareFunction=kl;const nc=new Wl,ic=new tu,sc=new Kl,Va=[],Wa=[],Xa=new Float32Array(16),qa=new Float32Array(9),Ya=new Float32Array(4);function Ri(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Va[s];if(r===void 0&&(r=new Float32Array(s),Va[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Qs(i,e){let t=Wa[e];t===void 0&&(t=new Int32Array(e),Wa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ya.set(n),i.uniformMatrix2fv(this.addr,!1,Ya),gt(t,n)}}function Tp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;qa.set(n),i.uniformMatrix3fv(this.addr,!1,qa),gt(t,n)}}function wp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Xa.set(n),i.uniformMatrix4fv(this.addr,!1,Xa),gt(t,n)}}function Ap(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Lp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Np(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function Up(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?tc:ec;t.setTexture2D(e||r,s)}function Op(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ic,s)}function Fp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sc,s)}function Bp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||nc,s)}function zp(i){switch(i){case 5126:return yp;case 35664:return Mp;case 35665:return Sp;case 35666:return Ep;case 35674:return bp;case 35675:return Tp;case 35676:return wp;case 5124:case 35670:return Ap;case 35667:case 35671:return Cp;case 35668:case 35672:return Rp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Dp;case 36295:return Ip;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Op;case 35680:case 36300:case 36308:case 36293:return Fp;case 36289:case 36303:case 36311:case 36292:return Bp}}function kp(i,e){i.uniform1fv(this.addr,e)}function Gp(i,e){const t=Ri(e,this.size,2);i.uniform2fv(this.addr,t)}function Hp(i,e){const t=Ri(e,this.size,3);i.uniform3fv(this.addr,t)}function Vp(i,e){const t=Ri(e,this.size,4);i.uniform4fv(this.addr,t)}function Wp(i,e){const t=Ri(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xp(i,e){const t=Ri(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function qp(i,e){const t=Ri(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Yp(i,e){i.uniform1iv(this.addr,e)}function jp(i,e){i.uniform2iv(this.addr,e)}function $p(i,e){i.uniform3iv(this.addr,e)}function Kp(i,e){i.uniform4iv(this.addr,e)}function Zp(i,e){i.uniform1uiv(this.addr,e)}function Jp(i,e){i.uniform2uiv(this.addr,e)}function Qp(i,e){i.uniform3uiv(this.addr,e)}function em(i,e){i.uniform4uiv(this.addr,e)}function tm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||ec,r[o])}function nm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ic,r[o])}function im(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||sc,r[o])}function sm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||nc,r[o])}function rm(i){switch(i){case 5126:return kp;case 35664:return Gp;case 35665:return Hp;case 35666:return Vp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return Yp;case 35667:case 35671:return jp;case 35668:case 35672:return $p;case 35669:case 35673:return Kp;case 5125:return Zp;case 36294:return Jp;case 36295:return Qp;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}class om{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zp(t.type)}}class am{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rm(t.type)}}class lm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Fr=/(\w+)(\])?(\[|\.)?/g;function ja(i,e){i.seq.push(e),i.map[e.id]=e}function cm(i,e,t){const n=i.name,s=n.length;for(Fr.lastIndex=0;;){const r=Fr.exec(n),o=Fr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ja(t,c===void 0?new om(a,i,e):new am(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new lm(a),ja(t,u)),t=u}}}class Is{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);cm(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function $a(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const hm=37297;let um=0;function dm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function fm(i){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i);let n;switch(e===t?n="":e===Vs&&t===Hs?n="LinearDisplayP3ToLinearSRGB":e===Hs&&t===Vs&&(n="LinearSRGBToLinearDisplayP3"),i){case In:case $s:return[n,"LinearTransferOETF"];case Zt:case vo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ka(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+dm(i.getShaderSource(e),o)}else return s}function pm(i,e){const t=fm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function mm(i,e){let t;switch(e){case hh:t="Linear";break;case uh:t="Reinhard";break;case dh:t="OptimizedCineon";break;case fh:t="ACESFilmic";break;case mh:t="AgX";break;case gh:t="Neutral";break;case ph:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function gm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.alphaToCoverage||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(xi).join(`
`)}function _m(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xi).join(`
`)}function vm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function xi(i){return i!==""}function Za(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ja(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(i){return i.replace(ym,Sm)}const Mm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Sm(i,e){let t=We[e];if(t===void 0){const n=Mm.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return io(t)}const Em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qa(i){return i.replace(Em,bm)}function bm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function el(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	`;return i.isWebGL2&&(e+=`precision ${i.precision} sampler3D;
		precision ${i.precision} sampler2DArray;
		precision ${i.precision} sampler2DShadow;
		precision ${i.precision} samplerCubeShadow;
		precision ${i.precision} sampler2DArrayShadow;
		precision ${i.precision} isampler2D;
		precision ${i.precision} isampler3D;
		precision ${i.precision} isamplerCube;
		precision ${i.precision} isampler2DArray;
		precision ${i.precision} usampler2D;
		precision ${i.precision} usampler3D;
		precision ${i.precision} usamplerCube;
		precision ${i.precision} usampler2DArray;
		`),i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Bc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===fn&&(e="SHADOWMAP_TYPE_VSM"),e}function wm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ei:case bi:e="ENVMAP_TYPE_CUBE";break;case js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Am(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case bi:e="ENVMAP_MODE_REFRACTION";break}return e}function Cm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Pl:e="ENVMAP_BLENDING_MULTIPLY";break;case lh:e="ENVMAP_BLENDING_MIX";break;case ch:e="ENVMAP_BLENDING_ADD";break}return e}function Rm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Pm(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Tm(t),c=wm(t),h=Am(t),u=Cm(t),p=Rm(t),m=t.isWebGL2?"":gm(t),g=_m(t),_=vm(r),f=s.createProgram();let d,S,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xi).join(`
`),d.length>0&&(d+=`
`),S=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(xi).join(`
`),S.length>0&&(S+=`
`)):(d=[el(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xi).join(`
`),S=[m,el(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rn?"#define TONE_MAPPING":"",t.toneMapping!==Rn?We.tonemapping_pars_fragment:"",t.toneMapping!==Rn?mm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,pm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xi).join(`
`)),o=io(o),o=Za(o,t),o=Ja(o,t),a=io(a),a=Za(a,t),a=Ja(a,t),o=Qa(o),a=Qa(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const M=v+d+o,L=v+S+a,A=$a(s,s.VERTEX_SHADER,M),T=$a(s,s.FRAGMENT_SHADER,L);s.attachShader(f,A),s.attachShader(f,T),t.index0AttributeName!==void 0?s.bindAttribLocation(f,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(f,0,"position"),s.linkProgram(f);function N(J){if(i.debug.checkShaderErrors){const Q=s.getProgramInfoLog(f).trim(),D=s.getShaderInfoLog(A).trim(),Y=s.getShaderInfoLog(T).trim();let H=!0,U=!0;if(s.getProgramParameter(f,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,f,A,T);else{const O=Ka(s,A,"vertex"),k=Ka(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(f,s.VALIDATE_STATUS)+`

Material Name: `+J.name+`
Material Type: `+J.type+`

Program Info Log: `+Q+`
`+O+`
`+k)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(D===""||Y==="")&&(U=!1);U&&(J.diagnostics={runnable:H,programLog:Q,vertexShader:{log:D,prefix:d},fragmentShader:{log:Y,prefix:S}})}s.deleteShader(A),s.deleteShader(T),$=new Is(s,f),x=xm(s,f)}let $;this.getUniforms=function(){return $===void 0&&N(this),$};let x;this.getAttributes=function(){return x===void 0&&N(this),x};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(f,hm)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=um++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=A,this.fragmentShader=T,this}let Lm=0;class Dm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Im(e),t.set(e,n)),n}}class Im{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Nm(i,e,t,n,s,r,o){const a=new yo,l=new Dm,c=new Set,h=[],u=s.isWebGL2,p=s.logarithmicDepthBuffer,m=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return c.add(x),x===0?"uv":`uv${x}`}function d(x,w,J,Q,D){const Y=Q.fog,H=D.geometry,U=x.isMeshStandardMaterial?Q.environment:null,O=(x.isMeshStandardMaterial?t:e).get(x.envMap||U),k=O&&O.mapping===js?O.image.height:null,z=_[x.type];x.precision!==null&&(g=s.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const q=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,re=q!==void 0?q.length:0;let Re=0;H.morphAttributes.position!==void 0&&(Re=1),H.morphAttributes.normal!==void 0&&(Re=2),H.morphAttributes.color!==void 0&&(Re=3);let B,ee,ae,me;if(z){const Qe=Qt[z];B=Qe.vertexShader,ee=Qe.fragmentShader}else B=x.vertexShader,ee=x.fragmentShader,l.update(x),ae=l.getVertexShaderID(x),me=l.getFragmentShaderID(x);const xe=i.getRenderTarget(),Ee=D.isInstancedMesh===!0,Ne=D.isBatchedMesh===!0,we=!!x.map,P=!!x.matcap,he=!!O,K=!!x.aoMap,ue=!!x.lightMap,te=!!x.bumpMap,ye=!!x.normalMap,Me=!!x.displacementMap,Te=!!x.emissiveMap,Ge=!!x.metalnessMap,b=!!x.roughnessMap,y=x.anisotropy>0,j=x.clearcoat>0,Z=x.iridescence>0,le=x.sheen>0,se=x.transmission>0,Oe=y&&!!x.anisotropyMap,Ie=j&&!!x.clearcoatMap,pe=j&&!!x.clearcoatNormalMap,_e=j&&!!x.clearcoatRoughnessMap,Fe=Z&&!!x.iridescenceMap,fe=Z&&!!x.iridescenceThicknessMap,ht=le&&!!x.sheenColorMap,qe=le&&!!x.sheenRoughnessMap,De=!!x.specularMap,Ae=!!x.specularColorMap,Pe=!!x.specularIntensityMap,R=se&&!!x.transmissionMap,ne=se&&!!x.thicknessMap,Ce=!!x.gradientMap,I=!!x.alphaMap,de=x.alphaTest>0,G=!!x.alphaHash,ce=!!x.extensions;let Se=Rn;x.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Se=i.toneMapping);const je={isWebGL2:u,shaderID:z,shaderType:x.type,shaderName:x.name,vertexShader:B,fragmentShader:ee,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:me,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:Ne,instancing:Ee,instancingColor:Ee&&D.instanceColor!==null,instancingMorph:Ee&&D.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:In,alphaToCoverage:!!x.alphaToCoverage,map:we,matcap:P,envMap:he,envMapMode:he&&O.mapping,envMapCubeUVHeight:k,aoMap:K,lightMap:ue,bumpMap:te,normalMap:ye,displacementMap:m&&Me,emissiveMap:Te,normalMapObjectSpace:ye&&x.normalMapType===Ah,normalMapTangentSpace:ye&&x.normalMapType===zl,metalnessMap:Ge,roughnessMap:b,anisotropy:y,anisotropyMap:Oe,clearcoat:j,clearcoatMap:Ie,clearcoatNormalMap:pe,clearcoatRoughnessMap:_e,iridescence:Z,iridescenceMap:Fe,iridescenceThicknessMap:fe,sheen:le,sheenColorMap:ht,sheenRoughnessMap:qe,specularMap:De,specularColorMap:Ae,specularIntensityMap:Pe,transmission:se,transmissionMap:R,thicknessMap:ne,gradientMap:Ce,opaque:x.transparent===!1&&x.blending===Mi&&x.alphaToCoverage===!1,alphaMap:I,alphaTest:de,alphaHash:G,combine:x.combine,mapUv:we&&f(x.map.channel),aoMapUv:K&&f(x.aoMap.channel),lightMapUv:ue&&f(x.lightMap.channel),bumpMapUv:te&&f(x.bumpMap.channel),normalMapUv:ye&&f(x.normalMap.channel),displacementMapUv:Me&&f(x.displacementMap.channel),emissiveMapUv:Te&&f(x.emissiveMap.channel),metalnessMapUv:Ge&&f(x.metalnessMap.channel),roughnessMapUv:b&&f(x.roughnessMap.channel),anisotropyMapUv:Oe&&f(x.anisotropyMap.channel),clearcoatMapUv:Ie&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:pe&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&f(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:qe&&f(x.sheenRoughnessMap.channel),specularMapUv:De&&f(x.specularMap.channel),specularColorMapUv:Ae&&f(x.specularColorMap.channel),specularIntensityMapUv:Pe&&f(x.specularIntensityMap.channel),transmissionMapUv:R&&f(x.transmissionMap.channel),thicknessMapUv:ne&&f(x.thicknessMap.channel),alphaMapUv:I&&f(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ye||y),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!H.attributes.uv&&(we||I),fog:!!Y,useFog:x.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:D.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Re,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&J.length>0,shadowMapType:i.shadowMap.type,toneMapping:Se,useLegacyLights:i._useLegacyLights,decodeVideoTexture:we&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===st,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===pn,flipSided:x.side===Pt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:ce&&x.extensions.derivatives===!0,extensionFragDepth:ce&&x.extensions.fragDepth===!0,extensionDrawBuffers:ce&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ce&&x.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function S(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const J in x.defines)w.push(J),w.push(x.defines[J]);return x.isRawShaderMaterial===!1&&(v(w,x),M(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function v(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function M(x,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.instancingMorph&&a.enable(4),w.matcap&&a.enable(5),w.envMap&&a.enable(6),w.normalMapObjectSpace&&a.enable(7),w.normalMapTangentSpace&&a.enable(8),w.clearcoat&&a.enable(9),w.iridescence&&a.enable(10),w.alphaTest&&a.enable(11),w.vertexColors&&a.enable(12),w.vertexAlphas&&a.enable(13),w.vertexUv1s&&a.enable(14),w.vertexUv2s&&a.enable(15),w.vertexUv3s&&a.enable(16),w.vertexTangents&&a.enable(17),w.anisotropy&&a.enable(18),w.alphaHash&&a.enable(19),w.batching&&a.enable(20),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.alphaToCoverage&&a.enable(20),x.push(a.mask)}function L(x){const w=_[x.type];let J;if(w){const Q=Qt[w];J=Ys.clone(Q.uniforms)}else J=x.uniforms;return J}function A(x,w){let J;for(let Q=0,D=h.length;Q<D;Q++){const Y=h[Q];if(Y.cacheKey===w){J=Y,++J.usedTimes;break}}return J===void 0&&(J=new Pm(i,w,x,r),h.push(J)),J}function T(x){if(--x.usedTimes===0){const w=h.indexOf(x);h[w]=h[h.length-1],h.pop(),x.destroy()}}function N(x){l.remove(x)}function $(){l.dispose()}return{getParameters:d,getProgramCacheKey:S,getUniforms:L,acquireProgram:A,releaseProgram:T,releaseShaderCache:N,programs:h,dispose:$}}function Um(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Om(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function tl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,p,m,g,_,f){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:p,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:f},i[e]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=f),e++,d}function a(u,p,m,g,_,f){const d=o(u,p,m,g,_,f);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function l(u,p,m,g,_,f){const d=o(u,p,m,g,_,f);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function c(u,p){t.length>1&&t.sort(u||Om),n.length>1&&n.sort(p||tl),s.length>1&&s.sort(p||tl)}function h(){for(let u=e,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Fm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new nl,i.set(n,[o])):s>=r.length?(o=new nl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Bm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new ke};break;case"SpotLight":t={position:new C,direction:new C,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function zm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let km=0;function Gm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Hm(i,e){const t=new Bm,n=zm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new C);const r=new C,o=new rt,a=new rt;function l(h,u){let p=0,m=0,g=0;for(let J=0;J<9;J++)s.probe[J].set(0,0,0);let _=0,f=0,d=0,S=0,v=0,M=0,L=0,A=0,T=0,N=0,$=0;h.sort(Gm);const x=u===!0?Math.PI:1;for(let J=0,Q=h.length;J<Q;J++){const D=h[J],Y=D.color,H=D.intensity,U=D.distance,O=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)p+=Y.r*H*x,m+=Y.g*H*x,g+=Y.b*H*x;else if(D.isLightProbe){for(let k=0;k<9;k++)s.probe[k].addScaledVector(D.sh.coefficients[k],H);$++}else if(D.isDirectionalLight){const k=t.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity*x),D.castShadow){const z=D.shadow,q=n.get(D);q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,s.directionalShadow[_]=q,s.directionalShadowMap[_]=O,s.directionalShadowMatrix[_]=D.shadow.matrix,M++}s.directional[_]=k,_++}else if(D.isSpotLight){const k=t.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(Y).multiplyScalar(H*x),k.distance=U,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,s.spot[d]=k;const z=D.shadow;if(D.map&&(s.spotLightMap[T]=D.map,T++,z.updateMatrices(D),D.castShadow&&N++),s.spotLightMatrix[d]=z.matrix,D.castShadow){const q=n.get(D);q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,s.spotShadow[d]=q,s.spotShadowMap[d]=O,A++}d++}else if(D.isRectAreaLight){const k=t.get(D);k.color.copy(Y).multiplyScalar(H),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),s.rectArea[S]=k,S++}else if(D.isPointLight){const k=t.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity*x),k.distance=D.distance,k.decay=D.decay,D.castShadow){const z=D.shadow,q=n.get(D);q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,q.shadowCameraNear=z.camera.near,q.shadowCameraFar=z.camera.far,s.pointShadow[f]=q,s.pointShadowMap[f]=O,s.pointShadowMatrix[f]=D.shadow.matrix,L++}s.point[f]=k,f++}else if(D.isHemisphereLight){const k=t.get(D);k.skyColor.copy(D.color).multiplyScalar(H*x),k.groundColor.copy(D.groundColor).multiplyScalar(H*x),s.hemi[v]=k,v++}}S>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_FLOAT_1,s.rectAreaLTC2=ge.LTC_FLOAT_2):(s.rectAreaLTC1=ge.LTC_HALF_1,s.rectAreaLTC2=ge.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_FLOAT_1,s.rectAreaLTC2=ge.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ge.LTC_HALF_1,s.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=m,s.ambient[2]=g;const w=s.hash;(w.directionalLength!==_||w.pointLength!==f||w.spotLength!==d||w.rectAreaLength!==S||w.hemiLength!==v||w.numDirectionalShadows!==M||w.numPointShadows!==L||w.numSpotShadows!==A||w.numSpotMaps!==T||w.numLightProbes!==$)&&(s.directional.length=_,s.spot.length=d,s.rectArea.length=S,s.point.length=f,s.hemi.length=v,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=A+T-N,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=$,w.directionalLength=_,w.pointLength=f,w.spotLength=d,w.rectAreaLength=S,w.hemiLength=v,w.numDirectionalShadows=M,w.numPointShadows=L,w.numSpotShadows=A,w.numSpotMaps=T,w.numLightProbes=$,s.version=km++)}function c(h,u){let p=0,m=0,g=0,_=0,f=0;const d=u.matrixWorldInverse;for(let S=0,v=h.length;S<v;S++){const M=h[S];if(M.isDirectionalLight){const L=s.directional[p];L.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),p++}else if(M.isSpotLight){const L=s.spot[g];L.position.setFromMatrixPosition(M.matrixWorld),L.position.applyMatrix4(d),L.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),g++}else if(M.isRectAreaLight){const L=s.rectArea[_];L.position.setFromMatrixPosition(M.matrixWorld),L.position.applyMatrix4(d),a.identity(),o.copy(M.matrixWorld),o.premultiply(d),a.extractRotation(o),L.halfWidth.set(M.width*.5,0,0),L.halfHeight.set(0,M.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const L=s.point[m];L.position.setFromMatrixPosition(M.matrixWorld),L.position.applyMatrix4(d),m++}else if(M.isHemisphereLight){const L=s.hemi[f];L.direction.setFromMatrixPosition(M.matrixWorld),L.direction.transformDirection(d),f++}}}return{setup:l,setupView:c,state:s}}function il(i,e){const t=new Hm(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Vm(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new il(i,e),t.set(r,[l])):o>=a.length?(l=new il(i,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Wm extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xm extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jm(i,e,t){let n=new Mo;const s=new ie,r=new ie,o=new at,a=new Wm({depthPacking:wh}),l=new Xm,c={},h=t.maxTextureSize,u={[xn]:Pt,[Pt]:xn,[pn]:pn},p=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:qm,fragmentShader:Ym}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ve(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let d=this.type;this.render=function(A,T,N){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;const $=i.getRenderTarget(),x=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),J=i.state;J.setBlending(_n),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const Q=d!==fn&&this.type===fn,D=d===fn&&this.type!==fn;for(let Y=0,H=A.length;Y<H;Y++){const U=A[Y],O=U.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const k=O.getFrameExtents();if(s.multiply(k),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/k.x),s.x=r.x*k.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/k.y),s.y=r.y*k.y,O.mapSize.y=r.y)),O.map===null||Q===!0||D===!0){const q=this.type!==fn?{minFilter:Ct,magFilter:Ct}:{};O.map!==null&&O.map.dispose(),O.map=new $t(s.x,s.y,q),O.map.texture.name=U.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const z=O.getViewportCount();for(let q=0;q<z;q++){const re=O.getViewport(q);o.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),J.viewport(o),O.updateMatrices(U,q),n=O.getFrustum(),M(T,N,O.camera,U,this.type)}O.isPointLightShadow!==!0&&this.type===fn&&S(O,N),O.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget($,x,w)};function S(A,T){const N=e.update(_);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new $t(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,N,p,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,N,m,_,null)}function v(A,T,N,$){let x=null;const w=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)x=w;else if(x=N.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const J=x.uuid,Q=T.uuid;let D=c[J];D===void 0&&(D={},c[J]=D);let Y=D[Q];Y===void 0&&(Y=x.clone(),D[Q]=Y,T.addEventListener("dispose",L)),x=Y}if(x.visible=T.visible,x.wireframe=T.wireframe,$===fn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:u[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,N.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const J=i.properties.get(x);J.light=N}return x}function M(A,T,N,$,x){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===fn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const Q=e.update(A),D=A.material;if(Array.isArray(D)){const Y=Q.groups;for(let H=0,U=Y.length;H<U;H++){const O=Y[H],k=D[O.materialIndex];if(k&&k.visible){const z=v(A,k,$,x);A.onBeforeShadow(i,A,T,N,Q,z,O),i.renderBufferDirect(N,null,Q,z,A,O),A.onAfterShadow(i,A,T,N,Q,z,O)}}}else if(D.visible){const Y=v(A,D,$,x);A.onBeforeShadow(i,A,T,N,Q,Y,null),i.renderBufferDirect(N,null,Q,Y,A,null),A.onAfterShadow(i,A,T,N,Q,Y,null)}}const J=A.children;for(let Q=0,D=J.length;Q<D;Q++)M(J[Q],T,N,$,x)}function L(A){A.target.removeEventListener("dispose",L);for(const N in c){const $=c[N],x=A.target.uuid;x in $&&($[x].dispose(),delete $[x])}}}function $m(i,e,t){const n=t.isWebGL2;function s(){let I=!1;const de=new at;let G=null;const ce=new at(0,0,0,0);return{setMask:function(Se){G!==Se&&!I&&(i.colorMask(Se,Se,Se,Se),G=Se)},setLocked:function(Se){I=Se},setClear:function(Se,je,Qe,tt,ut){ut===!0&&(Se*=tt,je*=tt,Qe*=tt),de.set(Se,je,Qe,tt),ce.equals(de)===!1&&(i.clearColor(Se,je,Qe,tt),ce.copy(de))},reset:function(){I=!1,G=null,ce.set(-1,0,0,0)}}}function r(){let I=!1,de=null,G=null,ce=null;return{setTest:function(Se){Se?Ee(i.DEPTH_TEST):Ne(i.DEPTH_TEST)},setMask:function(Se){de!==Se&&!I&&(i.depthMask(Se),de=Se)},setFunc:function(Se){if(G!==Se){switch(Se){case th:i.depthFunc(i.NEVER);break;case nh:i.depthFunc(i.ALWAYS);break;case ih:i.depthFunc(i.LESS);break;case ks:i.depthFunc(i.LEQUAL);break;case sh:i.depthFunc(i.EQUAL);break;case rh:i.depthFunc(i.GEQUAL);break;case oh:i.depthFunc(i.GREATER);break;case ah:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}G=Se}},setLocked:function(Se){I=Se},setClear:function(Se){ce!==Se&&(i.clearDepth(Se),ce=Se)},reset:function(){I=!1,de=null,G=null,ce=null}}}function o(){let I=!1,de=null,G=null,ce=null,Se=null,je=null,Qe=null,tt=null,ut=null;return{setTest:function(Je){I||(Je?Ee(i.STENCIL_TEST):Ne(i.STENCIL_TEST))},setMask:function(Je){de!==Je&&!I&&(i.stencilMask(Je),de=Je)},setFunc:function(Je,it,Mt){(G!==Je||ce!==it||Se!==Mt)&&(i.stencilFunc(Je,it,Mt),G=Je,ce=it,Se=Mt)},setOp:function(Je,it,Mt){(je!==Je||Qe!==it||tt!==Mt)&&(i.stencilOp(Je,it,Mt),je=Je,Qe=it,tt=Mt)},setLocked:function(Je){I=Je},setClear:function(Je){ut!==Je&&(i.clearStencil(Je),ut=Je)},reset:function(){I=!1,de=null,G=null,ce=null,Se=null,je=null,Qe=null,tt=null,ut=null}}}const a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let p={},m={},g=new WeakMap,_=[],f=null,d=!1,S=null,v=null,M=null,L=null,A=null,T=null,N=null,$=new ke(0,0,0),x=0,w=!1,J=null,Q=null,D=null,Y=null,H=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,k=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(z)[1]),O=k>=1):z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),O=k>=2);let q=null,re={};const Re=i.getParameter(i.SCISSOR_BOX),B=i.getParameter(i.VIEWPORT),ee=new at().fromArray(Re),ae=new at().fromArray(B);function me(I,de,G,ce){const Se=new Uint8Array(4),je=i.createTexture();i.bindTexture(I,je),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<G;Qe++)n&&(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)?i.texImage3D(de,0,i.RGBA,1,1,ce,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(de+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return je}const xe={};xe[i.TEXTURE_2D]=me(i.TEXTURE_2D,i.TEXTURE_2D,1),xe[i.TEXTURE_CUBE_MAP]=me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(xe[i.TEXTURE_2D_ARRAY]=me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),xe[i.TEXTURE_3D]=me(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ee(i.DEPTH_TEST),l.setFunc(ks),Me(!1),Te(Fo),Ee(i.CULL_FACE),te(_n);function Ee(I){p[I]!==!0&&(i.enable(I),p[I]=!0)}function Ne(I){p[I]!==!1&&(i.disable(I),p[I]=!1)}function we(I,de){return m[I]!==de?(i.bindFramebuffer(I,de),m[I]=de,n&&(I===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=de),I===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=de)),!0):!1}function P(I,de){let G=_,ce=!1;if(I){G=g.get(de),G===void 0&&(G=[],g.set(de,G));const Se=I.textures;if(G.length!==Se.length||G[0]!==i.COLOR_ATTACHMENT0){for(let je=0,Qe=Se.length;je<Qe;je++)G[je]=i.COLOR_ATTACHMENT0+je;G.length=Se.length,ce=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,ce=!0);if(ce)if(t.isWebGL2)i.drawBuffers(G);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(G);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function he(I){return f!==I?(i.useProgram(I),f=I,!0):!1}const K={[Wn]:i.FUNC_ADD,[kc]:i.FUNC_SUBTRACT,[Gc]:i.FUNC_REVERSE_SUBTRACT};if(n)K[ko]=i.MIN,K[Go]=i.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(K[ko]=I.MIN_EXT,K[Go]=I.MAX_EXT)}const ue={[Hc]:i.ZERO,[Vc]:i.ONE,[Wc]:i.SRC_COLOR,[$r]:i.SRC_ALPHA,[Kc]:i.SRC_ALPHA_SATURATE,[jc]:i.DST_COLOR,[qc]:i.DST_ALPHA,[Xc]:i.ONE_MINUS_SRC_COLOR,[Kr]:i.ONE_MINUS_SRC_ALPHA,[$c]:i.ONE_MINUS_DST_COLOR,[Yc]:i.ONE_MINUS_DST_ALPHA,[Zc]:i.CONSTANT_COLOR,[Jc]:i.ONE_MINUS_CONSTANT_COLOR,[Qc]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function te(I,de,G,ce,Se,je,Qe,tt,ut,Je){if(I===_n){d===!0&&(Ne(i.BLEND),d=!1);return}if(d===!1&&(Ee(i.BLEND),d=!0),I!==zc){if(I!==S||Je!==w){if((v!==Wn||A!==Wn)&&(i.blendEquation(i.FUNC_ADD),v=Wn,A=Wn),Je)switch(I){case Mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yi:i.blendFunc(i.ONE,i.ONE);break;case Bo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Bo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,L=null,T=null,N=null,$.set(0,0,0),x=0,S=I,w=Je}return}Se=Se||de,je=je||G,Qe=Qe||ce,(de!==v||Se!==A)&&(i.blendEquationSeparate(K[de],K[Se]),v=de,A=Se),(G!==M||ce!==L||je!==T||Qe!==N)&&(i.blendFuncSeparate(ue[G],ue[ce],ue[je],ue[Qe]),M=G,L=ce,T=je,N=Qe),(tt.equals($)===!1||ut!==x)&&(i.blendColor(tt.r,tt.g,tt.b,ut),$.copy(tt),x=ut),S=I,w=!1}function ye(I,de){I.side===pn?Ne(i.CULL_FACE):Ee(i.CULL_FACE);let G=I.side===Pt;de&&(G=!G),Me(G),I.blending===Mi&&I.transparent===!1?te(_n):te(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),a.setMask(I.colorWrite);const ce=I.stencilWrite;c.setTest(ce),ce&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),b(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ee(i.SAMPLE_ALPHA_TO_COVERAGE):Ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(I){J!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),J=I)}function Te(I){I!==Oc?(Ee(i.CULL_FACE),I!==Q&&(I===Fo?i.cullFace(i.BACK):I===Fc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ne(i.CULL_FACE),Q=I}function Ge(I){I!==D&&(O&&i.lineWidth(I),D=I)}function b(I,de,G){I?(Ee(i.POLYGON_OFFSET_FILL),(Y!==de||H!==G)&&(i.polygonOffset(de,G),Y=de,H=G)):Ne(i.POLYGON_OFFSET_FILL)}function y(I){I?Ee(i.SCISSOR_TEST):Ne(i.SCISSOR_TEST)}function j(I){I===void 0&&(I=i.TEXTURE0+U-1),q!==I&&(i.activeTexture(I),q=I)}function Z(I,de,G){G===void 0&&(q===null?G=i.TEXTURE0+U-1:G=q);let ce=re[G];ce===void 0&&(ce={type:void 0,texture:void 0},re[G]=ce),(ce.type!==I||ce.texture!==de)&&(q!==G&&(i.activeTexture(G),q=G),i.bindTexture(I,de||xe[I]),ce.type=I,ce.texture=de)}function le(){const I=re[q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function se(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ie(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function qe(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function De(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(I){ee.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ee.copy(I))}function Pe(I){ae.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),ae.copy(I))}function R(I,de){let G=u.get(de);G===void 0&&(G=new WeakMap,u.set(de,G));let ce=G.get(I);ce===void 0&&(ce=i.getUniformBlockIndex(de,I.name),G.set(I,ce))}function ne(I,de){const ce=u.get(de).get(I);h.get(de)!==ce&&(i.uniformBlockBinding(de,ce,I.__bindingPointIndex),h.set(de,ce))}function Ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),p={},q=null,re={},m={},g=new WeakMap,_=[],f=null,d=!1,S=null,v=null,M=null,L=null,A=null,T=null,N=null,$=new ke(0,0,0),x=0,w=!1,J=null,Q=null,D=null,Y=null,H=null,ee.set(0,0,i.canvas.width,i.canvas.height),ae.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ee,disable:Ne,bindFramebuffer:we,drawBuffers:P,useProgram:he,setBlending:te,setMaterial:ye,setFlipSided:Me,setCullFace:Te,setLineWidth:Ge,setPolygonOffset:b,setScissorTest:y,activeTexture:j,bindTexture:Z,unbindTexture:le,compressedTexImage2D:se,compressedTexImage3D:Oe,texImage2D:qe,texImage3D:De,updateUBOMapping:R,uniformBlockBinding:ne,texStorage2D:fe,texStorage3D:ht,texSubImage2D:Ie,texSubImage3D:pe,compressedTexSubImage2D:_e,compressedTexSubImage3D:Fe,scissor:Ae,viewport:Pe,reset:Ce}}function Km(i,e,t,n,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ie,u=new WeakMap;let p;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,y){return g?new OffscreenCanvas(b,y):qs("canvas")}function f(b,y,j,Z){let le=1;const se=Ge(b);if((se.width>Z||se.height>Z)&&(le=Z/Math.max(se.width,se.height)),le<1||y===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Oe=y?Xs:Math.floor,Ie=Oe(le*se.width),pe=Oe(le*se.height);p===void 0&&(p=_(Ie,pe));const _e=j?_(Ie,pe):p;return _e.width=Ie,_e.height=pe,_e.getContext("2d").drawImage(b,0,0,Ie,pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+Ie+"x"+pe+")."),_e}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function d(b){const y=Ge(b);return no(y.width)&&no(y.height)}function S(b){return a?!1:b.wrapS!==Yt||b.wrapT!==Yt||b.minFilter!==Ct&&b.minFilter!==Dt}function v(b,y){return b.generateMipmaps&&y&&b.minFilter!==Ct&&b.minFilter!==Dt}function M(b){i.generateMipmap(b)}function L(b,y,j,Z,le=!1){if(a===!1)return y;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let se=y;if(y===i.RED&&(j===i.FLOAT&&(se=i.R32F),j===i.HALF_FLOAT&&(se=i.R16F),j===i.UNSIGNED_BYTE&&(se=i.R8)),y===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.R8UI),j===i.UNSIGNED_SHORT&&(se=i.R16UI),j===i.UNSIGNED_INT&&(se=i.R32UI),j===i.BYTE&&(se=i.R8I),j===i.SHORT&&(se=i.R16I),j===i.INT&&(se=i.R32I)),y===i.RG&&(j===i.FLOAT&&(se=i.RG32F),j===i.HALF_FLOAT&&(se=i.RG16F),j===i.UNSIGNED_BYTE&&(se=i.RG8)),y===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(se=i.RG8UI),j===i.UNSIGNED_SHORT&&(se=i.RG16UI),j===i.UNSIGNED_INT&&(se=i.RG32UI),j===i.BYTE&&(se=i.RG8I),j===i.SHORT&&(se=i.RG16I),j===i.INT&&(se=i.RG32I)),y===i.RGBA){const Oe=le?Gs:et.getTransfer(Z);j===i.FLOAT&&(se=i.RGBA32F),j===i.HALF_FLOAT&&(se=i.RGBA16F),j===i.UNSIGNED_BYTE&&(se=Oe===st?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function A(b,y,j){return v(b,j)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==Dt?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function T(b){return b===Ct||b===Ho||b===Di?i.NEAREST:i.LINEAR}function N(b){const y=b.target;y.removeEventListener("dispose",N),x(y),y.isVideoTexture&&u.delete(y)}function $(b){const y=b.target;y.removeEventListener("dispose",$),J(y)}function x(b){const y=n.get(b);if(y.__webglInit===void 0)return;const j=b.source,Z=m.get(j);if(Z){const le=Z[y.__cacheKey];le.usedTimes--,le.usedTimes===0&&w(b),Object.keys(Z).length===0&&m.delete(j)}n.remove(b)}function w(b){const y=n.get(b);i.deleteTexture(y.__webglTexture);const j=b.source,Z=m.get(j);delete Z[y.__cacheKey],o.memory.textures--}function J(b){const y=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let le=0;le<y.__webglFramebuffer[Z].length;le++)i.deleteFramebuffer(y.__webglFramebuffer[Z][le]);else i.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[Z]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const j=b.textures;for(let Z=0,le=j.length;Z<le;Z++){const se=n.get(j[Z]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),o.memory.textures--),n.remove(j[Z])}n.remove(b)}let Q=0;function D(){Q=0}function Y(){const b=Q;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),Q+=1,b}function H(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function U(b,y){const j=n.get(b);if(b.isVideoTexture&&Me(b),b.isRenderTargetTexture===!1&&b.version>0&&j.__version!==b.version){const Z=b.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(j,b,y);return}}t.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+y)}function O(b,y){const j=n.get(b);if(b.version>0&&j.__version!==b.version){ae(j,b,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+y)}function k(b,y){const j=n.get(b);if(b.version>0&&j.__version!==b.version){ae(j,b,y);return}t.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+y)}function z(b,y){const j=n.get(b);if(b.version>0&&j.__version!==b.version){me(j,b,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+y)}const q={[Qr]:i.REPEAT,[Yt]:i.CLAMP_TO_EDGE,[eo]:i.MIRRORED_REPEAT},re={[Ct]:i.NEAREST,[Ho]:i.NEAREST_MIPMAP_NEAREST,[Di]:i.NEAREST_MIPMAP_LINEAR,[Dt]:i.LINEAR,[lr]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},Re={[Ch]:i.NEVER,[Nh]:i.ALWAYS,[Rh]:i.LESS,[kl]:i.LEQUAL,[Ph]:i.EQUAL,[Ih]:i.GEQUAL,[Lh]:i.GREATER,[Dh]:i.NOTEQUAL};function B(b,y,j){if(y.type===mn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Dt||y.magFilter===lr||y.magFilter===Di||y.magFilter===qn||y.minFilter===Dt||y.minFilter===lr||y.minFilter===Di||y.minFilter===qn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),j?(i.texParameteri(b,i.TEXTURE_WRAP_S,q[y.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,q[y.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,q[y.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,re[y.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,re[y.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==Yt||y.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,T(y.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==Ct&&y.minFilter!==Dt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,Re[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ct||y.minFilter!==Di&&y.minFilter!==qn||y.type===mn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===vn&&e.has("OES_texture_half_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const Z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ee(b,y){let j=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",N));const Z=y.source;let le=m.get(Z);le===void 0&&(le={},m.set(Z,le));const se=H(y);if(se!==b.__cacheKey){le[se]===void 0&&(le[se]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,j=!0),le[se].usedTimes++;const Oe=le[b.__cacheKey];Oe!==void 0&&(le[b.__cacheKey].usedTimes--,Oe.usedTimes===0&&w(y)),b.__cacheKey=se,b.__webglTexture=le[se].texture}return j}function ae(b,y,j){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);const le=ee(b,y),se=y.source;t.bindTexture(Z,b.__webglTexture,i.TEXTURE0+j);const Oe=n.get(se);if(se.version!==Oe.__version||le===!0){t.activeTexture(i.TEXTURE0+j);const Ie=et.getPrimaries(et.workingColorSpace),pe=y.colorSpace===An?null:et.getPrimaries(y.colorSpace),_e=y.colorSpace===An||Ie===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Fe=S(y)&&d(y.image)===!1;let fe=f(y.image,Fe,!1,s.maxTextureSize);fe=Te(y,fe);const ht=d(fe)||a,qe=r.convert(y.format,y.colorSpace);let De=r.convert(y.type),Ae=L(y.internalFormat,qe,De,y.colorSpace,y.isVideoTexture);B(Z,y,ht);let Pe;const R=y.mipmaps,ne=a&&y.isVideoTexture!==!0&&Ae!==Bl,Ce=Oe.__version===void 0||le===!0,I=se.dataReady,de=A(y,fe,ht);if(y.isDepthTexture)Ae=i.DEPTH_COMPONENT,a?y.type===mn?Ae=i.DEPTH_COMPONENT32F:y.type===Cn?Ae=i.DEPTH_COMPONENT24:y.type===Yn?Ae=i.DEPTH24_STENCIL8:Ae=i.DEPTH_COMPONENT16:y.type===mn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===jn&&Ae===i.DEPTH_COMPONENT&&y.type!==_o&&y.type!==Cn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Cn,De=r.convert(y.type)),y.format===Ti&&Ae===i.DEPTH_COMPONENT&&(Ae=i.DEPTH_STENCIL,y.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Yn,De=r.convert(y.type))),Ce&&(ne?t.texStorage2D(i.TEXTURE_2D,1,Ae,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Ae,fe.width,fe.height,0,qe,De,null));else if(y.isDataTexture)if(R.length>0&&ht){ne&&Ce&&t.texStorage2D(i.TEXTURE_2D,de,Ae,R[0].width,R[0].height);for(let G=0,ce=R.length;G<ce;G++)Pe=R[G],ne?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,Pe.width,Pe.height,qe,De,Pe.data):t.texImage2D(i.TEXTURE_2D,G,Ae,Pe.width,Pe.height,0,qe,De,Pe.data);y.generateMipmaps=!1}else ne?(Ce&&t.texStorage2D(i.TEXTURE_2D,de,Ae,fe.width,fe.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe.width,fe.height,qe,De,fe.data)):t.texImage2D(i.TEXTURE_2D,0,Ae,fe.width,fe.height,0,qe,De,fe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ne&&Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Ae,R[0].width,R[0].height,fe.depth);for(let G=0,ce=R.length;G<ce;G++)Pe=R[G],y.format!==jt?qe!==null?ne?I&&t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,Pe.width,Pe.height,fe.depth,qe,Pe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Ae,Pe.width,Pe.height,fe.depth,0,Pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,Pe.width,Pe.height,fe.depth,qe,De,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Ae,Pe.width,Pe.height,fe.depth,0,qe,De,Pe.data)}else{ne&&Ce&&t.texStorage2D(i.TEXTURE_2D,de,Ae,R[0].width,R[0].height);for(let G=0,ce=R.length;G<ce;G++)Pe=R[G],y.format!==jt?qe!==null?ne?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,Pe.width,Pe.height,qe,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Ae,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,Pe.width,Pe.height,qe,De,Pe.data):t.texImage2D(i.TEXTURE_2D,G,Ae,Pe.width,Pe.height,0,qe,De,Pe.data)}else if(y.isDataArrayTexture)ne?(Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,Ae,fe.width,fe.height,fe.depth),I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,qe,De,fe.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,fe.width,fe.height,fe.depth,0,qe,De,fe.data);else if(y.isData3DTexture)ne?(Ce&&t.texStorage3D(i.TEXTURE_3D,de,Ae,fe.width,fe.height,fe.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,qe,De,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,fe.width,fe.height,fe.depth,0,qe,De,fe.data);else if(y.isFramebufferTexture){if(Ce)if(ne)t.texStorage2D(i.TEXTURE_2D,de,Ae,fe.width,fe.height);else{let G=fe.width,ce=fe.height;for(let Se=0;Se<de;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ae,G,ce,0,qe,De,null),G>>=1,ce>>=1}}else if(R.length>0&&ht){if(ne&&Ce){const G=Ge(R[0]);t.texStorage2D(i.TEXTURE_2D,de,Ae,G.width,G.height)}for(let G=0,ce=R.length;G<ce;G++)Pe=R[G],ne?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,qe,De,Pe):t.texImage2D(i.TEXTURE_2D,G,Ae,qe,De,Pe);y.generateMipmaps=!1}else if(ne){if(Ce){const G=Ge(fe);t.texStorage2D(i.TEXTURE_2D,de,Ae,G.width,G.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,qe,De,fe)}else t.texImage2D(i.TEXTURE_2D,0,Ae,qe,De,fe);v(y,ht)&&M(Z),Oe.__version=se.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function me(b,y,j){if(y.image.length!==6)return;const Z=ee(b,y),le=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+j);const se=n.get(le);if(le.version!==se.__version||Z===!0){t.activeTexture(i.TEXTURE0+j);const Oe=et.getPrimaries(et.workingColorSpace),Ie=y.colorSpace===An?null:et.getPrimaries(y.colorSpace),pe=y.colorSpace===An||Oe===Ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const _e=y.isCompressedTexture||y.image[0].isCompressedTexture,Fe=y.image[0]&&y.image[0].isDataTexture,fe=[];for(let G=0;G<6;G++)!_e&&!Fe?fe[G]=f(y.image[G],!1,!0,s.maxCubemapSize):fe[G]=Fe?y.image[G].image:y.image[G],fe[G]=Te(y,fe[G]);const ht=fe[0],qe=d(ht)||a,De=r.convert(y.format,y.colorSpace),Ae=r.convert(y.type),Pe=L(y.internalFormat,De,Ae,y.colorSpace),R=a&&y.isVideoTexture!==!0,ne=se.__version===void 0||Z===!0,Ce=le.dataReady;let I=A(y,ht,qe);B(i.TEXTURE_CUBE_MAP,y,qe);let de;if(_e){R&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,I,Pe,ht.width,ht.height);for(let G=0;G<6;G++){de=fe[G].mipmaps;for(let ce=0;ce<de.length;ce++){const Se=de[ce];y.format!==jt?De!==null?R?Ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce,0,0,Se.width,Se.height,De,Se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce,Pe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce,0,0,Se.width,Se.height,De,Ae,Se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce,Pe,Se.width,Se.height,0,De,Ae,Se.data)}}}else{if(de=y.mipmaps,R&&ne){de.length>0&&I++;const G=Ge(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,I,Pe,G.width,G.height)}for(let G=0;G<6;G++)if(Fe){R?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,fe[G].width,fe[G].height,De,Ae,fe[G].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Pe,fe[G].width,fe[G].height,0,De,Ae,fe[G].data);for(let ce=0;ce<de.length;ce++){const je=de[ce].image[G].image;R?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce+1,0,0,je.width,je.height,De,Ae,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce+1,Pe,je.width,je.height,0,De,Ae,je.data)}}else{R?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,De,Ae,fe[G]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Pe,De,Ae,fe[G]);for(let ce=0;ce<de.length;ce++){const Se=de[ce];R?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce+1,0,0,De,Ae,Se.image[G]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+G,ce+1,Pe,De,Ae,Se.image[G])}}}v(y,qe)&&M(i.TEXTURE_CUBE_MAP),se.__version=le.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function xe(b,y,j,Z,le,se){const Oe=r.convert(j.format,j.colorSpace),Ie=r.convert(j.type),pe=L(j.internalFormat,Oe,Ie,j.colorSpace);if(!n.get(y).__hasExternalTextures){const Fe=Math.max(1,y.width>>se),fe=Math.max(1,y.height>>se);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,se,pe,Fe,fe,y.depth,0,Oe,Ie,null):t.texImage2D(le,se,pe,Fe,fe,0,Oe,Ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ye(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,le,n.get(j).__webglTexture,0,te(y)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,le,n.get(j).__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(b,y,j){if(i.bindRenderbuffer(i.RENDERBUFFER,b),y.depthBuffer&&!y.stencilBuffer){let Z=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(j||ye(y)){const le=y.depthTexture;le&&le.isDepthTexture&&(le.type===mn?Z=i.DEPTH_COMPONENT32F:le.type===Cn&&(Z=i.DEPTH_COMPONENT24));const se=te(y);ye(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,Z,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,se,Z,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,Z,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(y.depthBuffer&&y.stencilBuffer){const Z=te(y);j&&ye(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,y.width,y.height):ye(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{const Z=y.textures;for(let le=0;le<Z.length;le++){const se=Z[le],Oe=r.convert(se.format,se.colorSpace),Ie=r.convert(se.type),pe=L(se.internalFormat,Oe,Ie,se.colorSpace),_e=te(y);j&&ye(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,pe,y.width,y.height):ye(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,pe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,pe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ne(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),U(y.depthTexture,0);const Z=n.get(y.depthTexture).__webglTexture,le=te(y);if(y.depthTexture.format===jn)ye(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(y.depthTexture.format===Ti)ye(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function we(b){const y=n.get(b),j=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");Ne(y.__webglFramebuffer,b)}else if(j){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ee(y.__webglDepthbuffer[Z],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Ee(y.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function P(b,y,j){const Z=n.get(b);y!==void 0&&xe(Z.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&we(b)}function he(b){const y=b.texture,j=n.get(b),Z=n.get(y);b.addEventListener("dispose",$);const le=b.textures,se=b.isWebGLCubeRenderTarget===!0,Oe=le.length>1,Ie=d(b)||a;if(Oe||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,o.memory.textures++),se){j.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(a&&y.mipmaps&&y.mipmaps.length>0){j.__webglFramebuffer[pe]=[];for(let _e=0;_e<y.mipmaps.length;_e++)j.__webglFramebuffer[pe][_e]=i.createFramebuffer()}else j.__webglFramebuffer[pe]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){j.__webglFramebuffer=[];for(let pe=0;pe<y.mipmaps.length;pe++)j.__webglFramebuffer[pe]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(Oe)if(s.drawBuffers)for(let pe=0,_e=le.length;pe<_e;pe++){const Fe=n.get(le[pe]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&ye(b)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let pe=0;pe<le.length;pe++){const _e=le[pe];j.__webglColorRenderbuffer[pe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[pe]);const Fe=r.convert(_e.format,_e.colorSpace),fe=r.convert(_e.type),ht=L(_e.internalFormat,Fe,fe,_e.colorSpace,b.isXRRenderTarget===!0),qe=te(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,qe,ht,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,j.__webglColorRenderbuffer[pe])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),Ee(j.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),B(i.TEXTURE_CUBE_MAP,y,Ie);for(let pe=0;pe<6;pe++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let _e=0;_e<y.mipmaps.length;_e++)xe(j.__webglFramebuffer[pe][_e],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,_e);else xe(j.__webglFramebuffer[pe],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);v(y,Ie)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let pe=0,_e=le.length;pe<_e;pe++){const Fe=le[pe],fe=n.get(Fe);t.bindTexture(i.TEXTURE_2D,fe.__webglTexture),B(i.TEXTURE_2D,Fe,Ie),xe(j.__webglFramebuffer,b,Fe,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,0),v(Fe,Ie)&&M(i.TEXTURE_2D)}t.unbindTexture()}else{let pe=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?pe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(pe,Z.__webglTexture),B(pe,y,Ie),a&&y.mipmaps&&y.mipmaps.length>0)for(let _e=0;_e<y.mipmaps.length;_e++)xe(j.__webglFramebuffer[_e],b,y,i.COLOR_ATTACHMENT0,pe,_e);else xe(j.__webglFramebuffer,b,y,i.COLOR_ATTACHMENT0,pe,0);v(y,Ie)&&M(pe),t.unbindTexture()}b.depthBuffer&&we(b)}function K(b){const y=d(b)||a,j=b.textures;for(let Z=0,le=j.length;Z<le;Z++){const se=j[Z];if(v(se,y)){const Oe=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ie=n.get(se).__webglTexture;t.bindTexture(Oe,Ie),M(Oe),t.unbindTexture()}}}function ue(b){if(a&&b.samples>0&&ye(b)===!1){const y=b.textures,j=b.width,Z=b.height;let le=i.COLOR_BUFFER_BIT;const se=[],Oe=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(b),pe=y.length>1;if(pe)for(let _e=0;_e<y.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let _e=0;_e<y.length;_e++){se.push(i.COLOR_ATTACHMENT0+_e),b.depthBuffer&&se.push(Oe);const Fe=Ie.__ignoreDepthValues!==void 0?Ie.__ignoreDepthValues:!1;if(Fe===!1&&(b.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),pe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[_e]),Fe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Oe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Oe])),pe){const fe=n.get(y[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,fe,0)}i.blitFramebuffer(0,0,j,Z,0,0,j,Z,le,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pe)for(let _e=0;_e<y.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[_e]);const Fe=n.get(y[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}}function te(b){return Math.min(s.maxSamples,b.samples)}function ye(b){const y=n.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Me(b){const y=o.render.frame;u.get(b)!==y&&(u.set(b,y),b.update())}function Te(b,y){const j=b.colorSpace,Z=b.format,le=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===to||j!==In&&j!==An&&(et.getTransfer(j)===st?a===!1?e.has("EXT_sRGB")===!0&&Z===jt?(b.format=to,b.minFilter=Dt,b.generateMipmaps=!1):y=Hl.sRGBToLinear(y):(Z!==jt||le!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),y}function Ge(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(h.width=b.naturalWidth||b.width,h.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(h.width=b.displayWidth,h.height=b.displayHeight):(h.width=b.width,h.height=b.height),h}this.allocateTextureUnit=Y,this.resetTextureUnits=D,this.setTexture2D=U,this.setTexture2DArray=O,this.setTexture3D=k,this.setTextureCube=z,this.rebindTextures=P,this.setupRenderTarget=he,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=ue,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ye}function Zm(i,e,t){const n=t.isWebGL2;function s(r,o=An){let a;const l=et.getTransfer(o);if(r===Pn)return i.UNSIGNED_BYTE;if(r===Il)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Nl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===_h)return i.BYTE;if(r===vh)return i.SHORT;if(r===_o)return i.UNSIGNED_SHORT;if(r===Dl)return i.INT;if(r===Cn)return i.UNSIGNED_INT;if(r===mn)return i.FLOAT;if(r===vn)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===xh)return i.ALPHA;if(r===jt)return i.RGBA;if(r===yh)return i.LUMINANCE;if(r===Mh)return i.LUMINANCE_ALPHA;if(r===jn)return i.DEPTH_COMPONENT;if(r===Ti)return i.DEPTH_STENCIL;if(r===to)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Sh)return i.RED;if(r===Ul)return i.RED_INTEGER;if(r===Eh)return i.RG;if(r===Ol)return i.RG_INTEGER;if(r===Fl)return i.RGBA_INTEGER;if(r===cr||r===hr||r===ur||r===dr)if(l===st)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===cr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===dr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===cr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===hr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ur)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===dr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Vo||r===Wo||r===Xo||r===qo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Vo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Wo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Xo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===qo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Bl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Yo||r===jo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Yo)return l===st?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===jo)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===$o||r===Ko||r===Zo||r===Jo||r===Qo||r===ea||r===ta||r===na||r===ia||r===sa||r===ra||r===oa||r===aa||r===la)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===$o)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ko)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Zo)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Jo)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Qo)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ea)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ta)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===na)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ia)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===sa)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ra)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===oa)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===aa)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===la)return l===st?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===fr||r===ca||r===ha)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===fr)return l===st?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ca)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ha)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===bh||r===ua||r===da||r===fa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===fr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===ua)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===da)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===fa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Jm extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class tn extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const f=t.getJointPose(_,n),d=this._getHandJoint(c,_);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Nt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,s=new Tt({extensions:{fragDepth:!0},vertexShader:eg,fragmentShader:tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ve(new Js(20,20),s)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class ig extends Zn{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,p=null,m=null,g=null;const _=new ng,f=t.getContextAttributes();let d=null,S=null;const v=[],M=[],L=new ie;let A=null;const T=new Bt;T.layers.enable(1),T.viewport=new at;const N=new Bt;N.layers.enable(2),N.viewport=new at;const $=[T,N],x=new Jm;x.layers.enable(1),x.layers.enable(2);let w=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let ee=v[B];return ee===void 0&&(ee=new Br,v[B]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(B){let ee=v[B];return ee===void 0&&(ee=new Br,v[B]=ee),ee.getGripSpace()},this.getHand=function(B){let ee=v[B];return ee===void 0&&(ee=new Br,v[B]=ee),ee.getHandSpace()};function Q(B){const ee=M.indexOf(B.inputSource);if(ee===-1)return;const ae=v[ee];ae!==void 0&&(ae.update(B.inputSource,B.frame,c||o),ae.dispatchEvent({type:B.type,data:B.inputSource}))}function D(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",Y);for(let B=0;B<v.length;B++){const ee=M[B];ee!==null&&(M[B]=null,v[B].disconnect(ee))}w=null,J=null,_.reset(),e.setRenderTarget(d),m=null,p=null,u=null,s=null,S=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){a=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",D),s.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:s.renderState.layers===void 0?f.antialias:!0,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new $t(m.framebufferWidth,m.framebufferHeight,{format:jt,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let ee=null,ae=null,me=null;f.depth&&(me=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=f.stencil?Ti:jn,ae=f.stencil?Yn:Cn);const xe={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};u=new XRWebGLBinding(s,t),p=u.createProjectionLayer(xe),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new $t(p.textureWidth,p.textureHeight,{format:jt,type:Pn,depthTexture:new Ql(p.textureWidth,p.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0});const Ee=e.properties.get(S);Ee.__ignoreDepthValues=p.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Re.setContext(s),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Y(B){for(let ee=0;ee<B.removed.length;ee++){const ae=B.removed[ee],me=M.indexOf(ae);me>=0&&(M[me]=null,v[me].disconnect(ae))}for(let ee=0;ee<B.added.length;ee++){const ae=B.added[ee];let me=M.indexOf(ae);if(me===-1){for(let Ee=0;Ee<v.length;Ee++)if(Ee>=M.length){M.push(ae),me=Ee;break}else if(M[Ee]===null){M[Ee]=ae,me=Ee;break}if(me===-1)break}const xe=v[me];xe&&xe.connect(ae)}}const H=new C,U=new C;function O(B,ee,ae){H.setFromMatrixPosition(ee.matrixWorld),U.setFromMatrixPosition(ae.matrixWorld);const me=H.distanceTo(U),xe=ee.projectionMatrix.elements,Ee=ae.projectionMatrix.elements,Ne=xe[14]/(xe[10]-1),we=xe[14]/(xe[10]+1),P=(xe[9]+1)/xe[5],he=(xe[9]-1)/xe[5],K=(xe[8]-1)/xe[0],ue=(Ee[8]+1)/Ee[0],te=Ne*K,ye=Ne*ue,Me=me/(-K+ue),Te=Me*-K;ee.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(Te),B.translateZ(Me),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert();const Ge=Ne+Me,b=we+Me,y=te-Te,j=ye+(me-Te),Z=P*we/b*Ge,le=he*we/b*Ge;B.projectionMatrix.makePerspective(y,j,Z,le,Ge,b),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}function k(B,ee){ee===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(ee.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;_.texture!==null&&(B.near=_.depthNear,B.far=_.depthFar),x.near=N.near=T.near=B.near,x.far=N.far=T.far=B.far,(w!==x.near||J!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),w=x.near,J=x.far,T.near=w,T.far=J,N.near=w,N.far=J,T.updateProjectionMatrix(),N.updateProjectionMatrix(),B.updateProjectionMatrix());const ee=B.parent,ae=x.cameras;k(x,ee);for(let me=0;me<ae.length;me++)k(ae[me],ee);ae.length===2?O(x,T,N):x.projectionMatrix.copy(T.projectionMatrix),z(B,x,ee)};function z(B,ee,ae){ae===null?B.matrix.copy(ee.matrixWorld):(B.matrix.copy(ae.matrixWorld),B.matrix.invert(),B.matrix.multiply(ee.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(ee.projectionMatrix),B.projectionMatrixInverse.copy(ee.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=ji*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(B){l=B,p!==null&&(p.fixedFoveation=B),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=B)},this.hasDepthSensing=function(){return _.texture!==null};let q=null;function re(B,ee){if(h=ee.getViewerPose(c||o),g=ee,h!==null){const ae=h.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let me=!1;ae.length!==x.cameras.length&&(x.cameras.length=0,me=!0);for(let Ee=0;Ee<ae.length;Ee++){const Ne=ae[Ee];let we=null;if(m!==null)we=m.getViewport(Ne);else{const he=u.getViewSubImage(p,Ne);we=he.viewport,Ee===0&&(e.setRenderTargetTextures(S,he.colorTexture,p.ignoreDepthValues?void 0:he.depthStencilTexture),e.setRenderTarget(S))}let P=$[Ee];P===void 0&&(P=new Bt,P.layers.enable(Ee),P.viewport=new at,$[Ee]=P),P.matrix.fromArray(Ne.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Ne.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(we.x,we.y,we.width,we.height),Ee===0&&(x.matrix.copy(P.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),me===!0&&x.cameras.push(P)}const xe=s.enabledFeatures;if(xe&&xe.includes("depth-sensing")){const Ee=u.getDepthInformation(ae[0]);Ee&&Ee.isValid&&Ee.texture&&_.init(e,Ee,s.renderState)}}for(let ae=0;ae<v.length;ae++){const me=M[ae],xe=v[ae];me!==null&&xe!==void 0&&xe.update(me,ee,c||o)}_.render(e,x),q&&q(B,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Re=new Zl;Re.setAnimationLoop(re),this.setAnimationLoop=function(B){q=B},this.dispose=function(){}}}const Hn=new sn,sg=new rt;function rg(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,jl(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,S,v,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),u(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,M)):d.isMeshMatcapMaterial?(r(f,d),g(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),_(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(o(f,d),d.isLineDashedMaterial&&a(f,d)):d.isPointsMaterial?l(f,d,S,v):d.isSpriteMaterial?c(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Pt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Pt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const S=e.get(d),v=S.envMap,M=S.envMapRotation;if(v&&(f.envMap.value=v,Hn.copy(M),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),f.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(Hn)),f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap){f.lightMap.value=d.lightMap;const L=i._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=d.lightMapIntensity*L,t(d.lightMap,f.lightMapTransform)}d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function o(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function a(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function l(f,d,S,v){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*S,f.scale.value=v*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),e.get(d).envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,S){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pt&&f.clearcoatNormalScale.value.negate())),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function _(f,d){const S=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function og(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,v){const M=v.program;n.uniformBlockBinding(S,M)}function c(S,v){let M=s[S.id];M===void 0&&(g(S),M=h(S),s[S.id]=M,S.addEventListener("dispose",f));const L=v.program;n.updateUBOMapping(S,L);const A=e.render.frame;r[S.id]!==A&&(p(S),r[S.id]=A)}function h(S){const v=u();S.__bindingPointIndex=v;const M=i.createBuffer(),L=S.__size,A=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const v=s[S.id],M=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,T=M.length;A<T;A++){const N=Array.isArray(M[A])?M[A]:[M[A]];for(let $=0,x=N.length;$<x;$++){const w=N[$];if(m(w,A,$,L)===!0){const J=w.__offset,Q=Array.isArray(w.value)?w.value:[w.value];let D=0;for(let Y=0;Y<Q.length;Y++){const H=Q[Y],U=_(H);typeof H=="number"||typeof H=="boolean"?(w.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,J+D,w.__data)):H.isMatrix3?(w.__data[0]=H.elements[0],w.__data[1]=H.elements[1],w.__data[2]=H.elements[2],w.__data[3]=0,w.__data[4]=H.elements[3],w.__data[5]=H.elements[4],w.__data[6]=H.elements[5],w.__data[7]=0,w.__data[8]=H.elements[6],w.__data[9]=H.elements[7],w.__data[10]=H.elements[8],w.__data[11]=0):(H.toArray(w.__data,D),D+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,J,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,v,M,L){const A=S.value,T=v+"_"+M;if(L[T]===void 0)return typeof A=="number"||typeof A=="boolean"?L[T]=A:L[T]=A.clone(),!0;{const N=L[T];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return L[T]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function g(S){const v=S.uniforms;let M=0;const L=16;for(let T=0,N=v.length;T<N;T++){const $=Array.isArray(v[T])?v[T]:[v[T]];for(let x=0,w=$.length;x<w;x++){const J=$[x],Q=Array.isArray(J.value)?J.value:[J.value];for(let D=0,Y=Q.length;D<Y;D++){const H=Q[D],U=_(H),O=M%L;O!==0&&L-O<U.boundary&&(M+=L-O),J.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=M,M+=U.storage}}}const A=M%L;return A>0&&(M+=L-A),S.__size=M,S.__cache={},this}function _(S){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function f(S){const v=S.target;v.removeEventListener("dispose",f);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class rc{constructor(e={}){const{canvas:t=$h(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let p;n!==null?p=n.getContextAttributes().alpha:p=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,f=null;const d=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Zt,this._useLegacyLights=!1,this.toneMapping=Rn,this.toneMappingExposure=1;const v=this;let M=!1,L=0,A=0,T=null,N=-1,$=null;const x=new at,w=new at;let J=null;const Q=new ke(0);let D=0,Y=t.width,H=t.height,U=1,O=null,k=null;const z=new at(0,0,Y,H),q=new at(0,0,Y,H);let re=!1;const Re=new Mo;let B=!1,ee=!1,ae=null;const me=new rt,xe=new ie,Ee=new C,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function we(){return T===null?U:1}let P=n;function he(E,F){for(let W=0;W<E.length;W++){const X=E[W],V=t.getContext(X,F);if(V!==null)return V}return null}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${go}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",de,!1),P===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),P=he(F,E),P===null)throw he(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let K,ue,te,ye,Me,Te,Ge,b,y,j,Z,le,se,Oe,Ie,pe,_e,Fe,fe,ht,qe,De,Ae,Pe;function R(){K=new dp(P),ue=new op(P,K,e),K.init(ue),De=new Zm(P,K,ue),te=new $m(P,K,ue),ye=new mp(P),Me=new Um,Te=new Km(P,K,te,Me,ue,De,ye),Ge=new lp(v),b=new up(v),y=new yu(P,ue),Ae=new sp(P,K,y,ue),j=new fp(P,y,ye,Ae),Z=new xp(P,j,y,ye),fe=new vp(P,ue,Te),pe=new ap(Me),le=new Nm(v,Ge,b,K,ue,Ae,pe),se=new rg(v,Me),Oe=new Fm,Ie=new Vm(K,ue),Fe=new ip(v,Ge,b,te,Z,p,l),_e=new jm(v,Z,ue),Pe=new og(P,ye,ue,te),ht=new rp(P,K,ye,ue),qe=new pp(P,K,ye,ue),ye.programs=le.programs,v.capabilities=ue,v.extensions=K,v.properties=Me,v.renderLists=Oe,v.shadowMap=_e,v.state=te,v.info=ye}R();const ne=new ig(v,P);this.xr=ne,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=K.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=K.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(E){E!==void 0&&(U=E,this.setSize(Y,H,!1))},this.getSize=function(E){return E.set(Y,H)},this.setSize=function(E,F,W=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,H=F,t.width=Math.floor(E*U),t.height=Math.floor(F*U),W===!0&&(t.style.width=E+"px",t.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(Y*U,H*U).floor()},this.setDrawingBufferSize=function(E,F,W){Y=E,H=F,U=W,t.width=Math.floor(E*W),t.height=Math.floor(F*W),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(x)},this.getViewport=function(E){return E.copy(z)},this.setViewport=function(E,F,W,X){E.isVector4?z.set(E.x,E.y,E.z,E.w):z.set(E,F,W,X),te.viewport(x.copy(z).multiplyScalar(U).round())},this.getScissor=function(E){return E.copy(q)},this.setScissor=function(E,F,W,X){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,F,W,X),te.scissor(w.copy(q).multiplyScalar(U).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(E){te.setScissorTest(re=E)},this.setOpaqueSort=function(E){O=E},this.setTransparentSort=function(E){k=E},this.getClearColor=function(E){return E.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(E=!0,F=!0,W=!0){let X=0;if(E){let V=!1;if(T!==null){const be=T.texture.format;V=be===Fl||be===Ol||be===Ul}if(V){const be=T.texture.type,Le=be===Pn||be===Cn||be===_o||be===Yn||be===Il||be===Nl,Ue=Fe.getClearColor(),Be=Fe.getClearAlpha(),Ye=Ue.r,ze=Ue.g,He=Ue.b;Le?(m[0]=Ye,m[1]=ze,m[2]=He,m[3]=Be,P.clearBufferuiv(P.COLOR,0,m)):(g[0]=Ye,g[1]=ze,g[2]=He,g[3]=Be,P.clearBufferiv(P.COLOR,0,g))}else X|=P.COLOR_BUFFER_BIT}F&&(X|=P.DEPTH_BUFFER_BIT),W&&(X|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Oe.dispose(),Ie.dispose(),Me.dispose(),Ge.dispose(),b.dispose(),Z.dispose(),Ae.dispose(),Pe.dispose(),le.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",ut),ne.removeEventListener("sessionend",Je),ae&&(ae.dispose(),ae=null),it.stop()};function Ce(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=ye.autoReset,F=_e.enabled,W=_e.autoUpdate,X=_e.needsUpdate,V=_e.type;R(),ye.autoReset=E,_e.enabled=F,_e.autoUpdate=W,_e.needsUpdate=X,_e.type=V}function de(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function G(E){const F=E.target;F.removeEventListener("dispose",G),ce(F)}function ce(E){Se(E),Me.remove(E)}function Se(E){const F=Me.get(E).programs;F!==void 0&&(F.forEach(function(W){le.releaseProgram(W)}),E.isShaderMaterial&&le.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,W,X,V,be){F===null&&(F=Ne);const Le=V.isMesh&&V.matrixWorld.determinant()<0,Ue=Pc(E,F,W,X,V);te.setMaterial(X,Le);let Be=W.index,Ye=1;if(X.wireframe===!0){if(Be=j.getWireframeAttribute(W),Be===void 0)return;Ye=2}const ze=W.drawRange,He=W.attributes.position;let dt=ze.start*Ye,Ut=(ze.start+ze.count)*Ye;be!==null&&(dt=Math.max(dt,be.start*Ye),Ut=Math.min(Ut,(be.start+be.count)*Ye)),Be!==null?(dt=Math.max(dt,0),Ut=Math.min(Ut,Be.count)):He!=null&&(dt=Math.max(dt,0),Ut=Math.min(Ut,He.count));const _t=Ut-dt;if(_t<0||_t===1/0)return;Ae.setup(V,X,Ue,W,Be);let an,lt=ht;if(Be!==null&&(an=y.get(Be),lt=qe,lt.setIndex(an)),V.isMesh)X.wireframe===!0?(te.setLineWidth(X.wireframeLinewidth*we()),lt.setMode(P.LINES)):lt.setMode(P.TRIANGLES);else if(V.isLine){let Ve=X.linewidth;Ve===void 0&&(Ve=1),te.setLineWidth(Ve*we()),V.isLineSegments?lt.setMode(P.LINES):V.isLineLoop?lt.setMode(P.LINE_LOOP):lt.setMode(P.LINE_STRIP)}else V.isPoints?lt.setMode(P.POINTS):V.isSprite&&lt.setMode(P.TRIANGLES);if(V.isBatchedMesh)lt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else if(V.isInstancedMesh)lt.renderInstances(dt,_t,V.count);else if(W.isInstancedBufferGeometry){const Ve=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,sr=Math.min(W.instanceCount,Ve);lt.renderInstances(dt,_t,sr)}else lt.render(dt,_t)};function je(E,F,W){E.transparent===!0&&E.side===pn&&E.forceSinglePass===!1?(E.side=Pt,E.needsUpdate=!0,is(E,F,W),E.side=xn,E.needsUpdate=!0,is(E,F,W),E.side=pn):is(E,F,W)}this.compile=function(E,F,W=null){W===null&&(W=E),f=Ie.get(W),f.init(),S.push(f),W.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(f.pushLight(V),V.castShadow&&f.pushShadow(V))}),E!==W&&E.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(f.pushLight(V),V.castShadow&&f.pushShadow(V))}),f.setupLights(v._useLegacyLights);const X=new Set;return E.traverse(function(V){const be=V.material;if(be)if(Array.isArray(be))for(let Le=0;Le<be.length;Le++){const Ue=be[Le];je(Ue,W,V),X.add(Ue)}else je(be,W,V),X.add(be)}),S.pop(),f=null,X},this.compileAsync=function(E,F,W=null){const X=this.compile(E,F,W);return new Promise(V=>{function be(){if(X.forEach(function(Le){Me.get(Le).currentProgram.isReady()&&X.delete(Le)}),X.size===0){V(E);return}setTimeout(be,10)}K.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Qe=null;function tt(E){Qe&&Qe(E)}function ut(){it.stop()}function Je(){it.start()}const it=new Zl;it.setAnimationLoop(tt),typeof self<"u"&&it.setContext(self),this.setAnimationLoop=function(E){Qe=E,ne.setAnimationLoop(E),E===null?it.stop():it.start()},ne.addEventListener("sessionstart",ut),ne.addEventListener("sessionend",Je),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(F),F=ne.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,F,T),f=Ie.get(E,S.length),f.init(),S.push(f),me.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Re.setFromProjectionMatrix(me),ee=this.localClippingEnabled,B=pe.init(this.clippingPlanes,ee),_=Oe.get(E,d.length),_.init(),d.push(_),Mt(E,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(O,k),this.info.render.frame++,B===!0&&pe.beginShadows();const W=f.state.shadowsArray;if(_e.render(W,E,F),B===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1)&&Fe.render(_,E),f.setupLights(v._useLegacyLights),F.isArrayCamera){const X=F.cameras;for(let V=0,be=X.length;V<be;V++){const Le=X[V];Nn(_,E,Le,Le.viewport)}}else Nn(_,E,F);T!==null&&(Te.updateMultisampleRenderTarget(T),Te.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(v,E,F),Ae.resetDefaultState(),N=-1,$=null,S.pop(),S.length>0?f=S[S.length-1]:f=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function Mt(E,F,W,X){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Re.intersectsSprite(E)){X&&Ee.setFromMatrixPosition(E.matrixWorld).applyMatrix4(me);const Le=Z.update(E),Ue=E.material;Ue.visible&&_.push(E,Le,Ue,W,Ee.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Re.intersectsObject(E))){const Le=Z.update(E),Ue=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ee.copy(E.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ee.copy(Le.boundingSphere.center)),Ee.applyMatrix4(E.matrixWorld).applyMatrix4(me)),Array.isArray(Ue)){const Be=Le.groups;for(let Ye=0,ze=Be.length;Ye<ze;Ye++){const He=Be[Ye],dt=Ue[He.materialIndex];dt&&dt.visible&&_.push(E,Le,dt,W,Ee.z,He)}}else Ue.visible&&_.push(E,Le,Ue,W,Ee.z,null)}}const be=E.children;for(let Le=0,Ue=be.length;Le<Ue;Le++)Mt(be[Le],F,W,X)}function Nn(E,F,W,X){const V=E.opaque,be=E.transmissive,Le=E.transparent;f.setupLightsView(W),B===!0&&pe.setGlobalState(v.clippingPlanes,W),be.length>0&&ts(V,be,F,W),X&&te.viewport(x.copy(X)),V.length>0&&ns(V,F,W),be.length>0&&ns(be,F,W),Le.length>0&&ns(Le,F,W),te.buffers.depth.setTest(!0),te.buffers.depth.setMask(!0),te.buffers.color.setMask(!0),te.setPolygonOffset(!1)}function ts(E,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const be=ue.isWebGL2;ae===null&&(ae=new $t(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")?vn:Pn,minFilter:qn,samples:be?4:0})),v.getDrawingBufferSize(xe),be?ae.setSize(xe.x,xe.y):ae.setSize(Xs(xe.x),Xs(xe.y));const Le=v.getRenderTarget();v.setRenderTarget(ae),v.getClearColor(Q),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const Ue=v.toneMapping;v.toneMapping=Rn,ns(E,W,X),Te.updateMultisampleRenderTarget(ae),Te.updateRenderTargetMipmap(ae);let Be=!1;for(let Ye=0,ze=F.length;Ye<ze;Ye++){const He=F[Ye],dt=He.object,Ut=He.geometry,_t=He.material,an=He.group;if(_t.side===pn&&dt.layers.test(X.layers)){const lt=_t.side;_t.side=Pt,_t.needsUpdate=!0,Do(dt,W,X,Ut,_t,an),_t.side=lt,_t.needsUpdate=!0,Be=!0}}Be===!0&&(Te.updateMultisampleRenderTarget(ae),Te.updateRenderTargetMipmap(ae)),v.setRenderTarget(Le),v.setClearColor(Q,D),v.toneMapping=Ue}function ns(E,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let V=0,be=E.length;V<be;V++){const Le=E[V],Ue=Le.object,Be=Le.geometry,Ye=X===null?Le.material:X,ze=Le.group;Ue.layers.test(W.layers)&&Do(Ue,F,W,Be,Ye,ze)}}function Do(E,F,W,X,V,be){E.onBeforeRender(v,F,W,X,V,be),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(v,F,W,X,E,be),V.transparent===!0&&V.side===pn&&V.forceSinglePass===!1?(V.side=Pt,V.needsUpdate=!0,v.renderBufferDirect(W,F,X,V,E,be),V.side=xn,V.needsUpdate=!0,v.renderBufferDirect(W,F,X,V,E,be),V.side=pn):v.renderBufferDirect(W,F,X,V,E,be),E.onAfterRender(v,F,W,X,V,be)}function is(E,F,W){F.isScene!==!0&&(F=Ne);const X=Me.get(E),V=f.state.lights,be=f.state.shadowsArray,Le=V.state.version,Ue=le.getParameters(E,V.state,be,F,W),Be=le.getProgramCacheKey(Ue);let Ye=X.programs;X.environment=E.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(E.isMeshStandardMaterial?b:Ge).get(E.envMap||X.environment),X.envMapRotation=X.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ye===void 0&&(E.addEventListener("dispose",G),Ye=new Map,X.programs=Ye);let ze=Ye.get(Be);if(ze!==void 0){if(X.currentProgram===ze&&X.lightsStateVersion===Le)return No(E,Ue),ze}else Ue.uniforms=le.getUniforms(E),E.onBuild(W,Ue,v),E.onBeforeCompile(Ue,v),ze=le.acquireProgram(Ue,Be),Ye.set(Be,ze),X.uniforms=Ue.uniforms;const He=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(He.clippingPlanes=pe.uniform),No(E,Ue),X.needsLights=Dc(E),X.lightsStateVersion=Le,X.needsLights&&(He.ambientLightColor.value=V.state.ambient,He.lightProbe.value=V.state.probe,He.directionalLights.value=V.state.directional,He.directionalLightShadows.value=V.state.directionalShadow,He.spotLights.value=V.state.spot,He.spotLightShadows.value=V.state.spotShadow,He.rectAreaLights.value=V.state.rectArea,He.ltc_1.value=V.state.rectAreaLTC1,He.ltc_2.value=V.state.rectAreaLTC2,He.pointLights.value=V.state.point,He.pointLightShadows.value=V.state.pointShadow,He.hemisphereLights.value=V.state.hemi,He.directionalShadowMap.value=V.state.directionalShadowMap,He.directionalShadowMatrix.value=V.state.directionalShadowMatrix,He.spotShadowMap.value=V.state.spotShadowMap,He.spotLightMatrix.value=V.state.spotLightMatrix,He.spotLightMap.value=V.state.spotLightMap,He.pointShadowMap.value=V.state.pointShadowMap,He.pointShadowMatrix.value=V.state.pointShadowMatrix),X.currentProgram=ze,X.uniformsList=null,ze}function Io(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Is.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function No(E,F){const W=Me.get(E);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function Pc(E,F,W,X,V){F.isScene!==!0&&(F=Ne),Te.resetTextureUnits();const be=F.fog,Le=X.isMeshStandardMaterial?F.environment:null,Ue=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:In,Be=(X.isMeshStandardMaterial?b:Ge).get(X.envMap||Le),Ye=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ze=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),He=!!W.morphAttributes.position,dt=!!W.morphAttributes.normal,Ut=!!W.morphAttributes.color;let _t=Rn;X.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(_t=v.toneMapping);const an=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,lt=an!==void 0?an.length:0,Ve=Me.get(X),sr=f.state.lights;if(B===!0&&(ee===!0||E!==$)){const zt=E===$&&X.id===N;pe.setState(X,E,zt)}let ot=!1;X.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==sr.state.version||Ve.outputColorSpace!==Ue||V.isBatchedMesh&&Ve.batching===!1||!V.isBatchedMesh&&Ve.batching===!0||V.isInstancedMesh&&Ve.instancing===!1||!V.isInstancedMesh&&Ve.instancing===!0||V.isSkinnedMesh&&Ve.skinning===!1||!V.isSkinnedMesh&&Ve.skinning===!0||V.isInstancedMesh&&Ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ve.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ve.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ve.instancingMorph===!1&&V.morphTexture!==null||Ve.envMap!==Be||X.fog===!0&&Ve.fog!==be||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==pe.numPlanes||Ve.numIntersection!==pe.numIntersection)||Ve.vertexAlphas!==Ye||Ve.vertexTangents!==ze||Ve.morphTargets!==He||Ve.morphNormals!==dt||Ve.morphColors!==Ut||Ve.toneMapping!==_t||ue.isWebGL2===!0&&Ve.morphTargetsCount!==lt)&&(ot=!0):(ot=!0,Ve.__version=X.version);let Un=Ve.currentProgram;ot===!0&&(Un=is(X,F,V));let Uo=!1,Li=!1,rr=!1;const St=Un.getUniforms(),On=Ve.uniforms;if(te.useProgram(Un.program)&&(Uo=!0,Li=!0,rr=!0),X.id!==N&&(N=X.id,Li=!0),Uo||$!==E){St.setValue(P,"projectionMatrix",E.projectionMatrix),St.setValue(P,"viewMatrix",E.matrixWorldInverse);const zt=St.map.cameraPosition;zt!==void 0&&zt.setValue(P,Ee.setFromMatrixPosition(E.matrixWorld)),ue.logarithmicDepthBuffer&&St.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&St.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),$!==E&&($=E,Li=!0,rr=!0)}if(V.isSkinnedMesh){St.setOptional(P,V,"bindMatrix"),St.setOptional(P,V,"bindMatrixInverse");const zt=V.skeleton;zt&&(ue.floatVertexTextures?(zt.boneTexture===null&&zt.computeBoneTexture(),St.setValue(P,"boneTexture",zt.boneTexture,Te)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}V.isBatchedMesh&&(St.setOptional(P,V,"batchingTexture"),St.setValue(P,"batchingTexture",V._matricesTexture,Te));const or=W.morphAttributes;if((or.position!==void 0||or.normal!==void 0||or.color!==void 0&&ue.isWebGL2===!0)&&fe.update(V,W,Un),(Li||Ve.receiveShadow!==V.receiveShadow)&&(Ve.receiveShadow=V.receiveShadow,St.setValue(P,"receiveShadow",V.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(On.envMap.value=Be,On.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Li&&(St.setValue(P,"toneMappingExposure",v.toneMappingExposure),Ve.needsLights&&Lc(On,rr),be&&X.fog===!0&&se.refreshFogUniforms(On,be),se.refreshMaterialUniforms(On,X,U,H,ae),Is.upload(P,Io(Ve),On,Te)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Is.upload(P,Io(Ve),On,Te),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&St.setValue(P,"center",V.center),St.setValue(P,"modelViewMatrix",V.modelViewMatrix),St.setValue(P,"normalMatrix",V.normalMatrix),St.setValue(P,"modelMatrix",V.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const zt=X.uniformsGroups;for(let ar=0,Ic=zt.length;ar<Ic;ar++)if(ue.isWebGL2){const Oo=zt[ar];Pe.update(Oo,Un),Pe.bind(Oo,Un)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Un}function Lc(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function Dc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,F,W){Me.get(E.texture).__webglTexture=F,Me.get(E.depthTexture).__webglTexture=W;const X=Me.get(E);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||K.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const W=Me.get(E);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,W=0){T=E,L=F,A=W;let X=!0,V=null,be=!1,Le=!1;if(E){const Be=Me.get(E);Be.__useDefaultFramebuffer!==void 0?(te.bindFramebuffer(P.FRAMEBUFFER,null),X=!1):Be.__webglFramebuffer===void 0?Te.setupRenderTarget(E):Be.__hasExternalTextures&&Te.rebindTextures(E,Me.get(E.texture).__webglTexture,Me.get(E.depthTexture).__webglTexture);const Ye=E.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Le=!0);const ze=Me.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?V=ze[F][W]:V=ze[F],be=!0):ue.isWebGL2&&E.samples>0&&Te.useMultisampledRTT(E)===!1?V=Me.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?V=ze[W]:V=ze,x.copy(E.viewport),w.copy(E.scissor),J=E.scissorTest}else x.copy(z).multiplyScalar(U).floor(),w.copy(q).multiplyScalar(U).floor(),J=re;if(te.bindFramebuffer(P.FRAMEBUFFER,V)&&ue.drawBuffers&&X&&te.drawBuffers(E,V),te.viewport(x),te.scissor(w),te.setScissorTest(J),be){const Be=Me.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Be.__webglTexture,W)}else if(Le){const Be=Me.get(E.texture),Ye=F||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Be.__webglTexture,W||0,Ye)}N=-1},this.readRenderTargetPixels=function(E,F,W,X,V,be,Le){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){te.bindFramebuffer(P.FRAMEBUFFER,Ue);try{const Be=E.texture,Ye=Be.format,ze=Be.type;if(Ye!==jt&&De.convert(Ye)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const He=ze===vn&&(K.has("EXT_color_buffer_half_float")||ue.isWebGL2&&K.has("EXT_color_buffer_float"));if(ze!==Pn&&De.convert(ze)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ze===mn&&(ue.isWebGL2||K.has("OES_texture_float")||K.has("WEBGL_color_buffer_float")))&&!He){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-X&&W>=0&&W<=E.height-V&&P.readPixels(F,W,X,V,De.convert(Ye),De.convert(ze),be)}finally{const Be=T!==null?Me.get(T).__webglFramebuffer:null;te.bindFramebuffer(P.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(E,F,W=0){const X=Math.pow(2,-W),V=Math.floor(F.image.width*X),be=Math.floor(F.image.height*X);Te.setTexture2D(F,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,E.x,E.y,V,be),te.unbindTexture()},this.copyTextureToTexture=function(E,F,W,X=0){const V=F.image.width,be=F.image.height,Le=De.convert(W.format),Ue=De.convert(W.type);Te.setTexture2D(W,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,W.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,W.unpackAlignment),F.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,X,E.x,E.y,V,be,Le,Ue,F.image.data):F.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,X,E.x,E.y,F.mipmaps[0].width,F.mipmaps[0].height,Le,F.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,X,E.x,E.y,Le,Ue,F.image),X===0&&W.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),te.unbindTexture()},this.copyTextureToTexture3D=function(E,F,W,X,V=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const be=Math.round(E.max.x-E.min.x),Le=Math.round(E.max.y-E.min.y),Ue=E.max.z-E.min.z+1,Be=De.convert(X.format),Ye=De.convert(X.type);let ze;if(X.isData3DTexture)Te.setTexture3D(X,0),ze=P.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)Te.setTexture2DArray(X,0),ze=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,X.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,X.unpackAlignment);const He=P.getParameter(P.UNPACK_ROW_LENGTH),dt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ut=P.getParameter(P.UNPACK_SKIP_PIXELS),_t=P.getParameter(P.UNPACK_SKIP_ROWS),an=P.getParameter(P.UNPACK_SKIP_IMAGES),lt=W.isCompressedTexture?W.mipmaps[V]:W.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,lt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,E.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,E.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,E.min.z),W.isDataTexture||W.isData3DTexture?P.texSubImage3D(ze,V,F.x,F.y,F.z,be,Le,Ue,Be,Ye,lt.data):X.isCompressedArrayTexture?P.compressedTexSubImage3D(ze,V,F.x,F.y,F.z,be,Le,Ue,Be,lt.data):P.texSubImage3D(ze,V,F.x,F.y,F.z,be,Le,Ue,Be,Ye,lt),P.pixelStorei(P.UNPACK_ROW_LENGTH,He),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ut),P.pixelStorei(P.UNPACK_SKIP_ROWS,_t),P.pixelStorei(P.UNPACK_SKIP_IMAGES,an),V===0&&X.generateMipmaps&&P.generateMipmap(ze),te.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?Te.setTextureCube(E,0):E.isData3DTexture?Te.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Te.setTexture2DArray(E,0):Te.setTexture2D(E,0),te.unbindTexture()},this.resetState=function(){L=0,A=0,T=null,te.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===vo?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===$s?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ag extends rc{}ag.prototype.isWebGL1Renderer=!0;class lg extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ns extends Ci{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sl=new rt,so=new Zs,Ts=new Ks,ws=new C;class zr extends Lt{constructor(e=new yt,t=new Ns){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(s),Ts.radius+=r,e.ray.intersectsSphere(Ts)===!1)return;sl.copy(s).invert(),so.copy(e.ray).applyMatrix4(sl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=p,_=m;g<_;g++){const f=c.getX(g);ws.fromBufferAttribute(u,f),rl(ws,f,l,s,e,t,this)}}else{const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=p,_=m;g<_;g++)ws.fromBufferAttribute(u,g),rl(ws,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rl(i,e,t,n,s,r,o){const a=so.distanceSqToPoint(i);if(a<t){const l=new C;so.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,m=(o-h)/p;return(s+m)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ie:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,s=[],r=[],o=[],a=new C,l=new rt;for(let m=0;m<=e;m++){const g=m/e;s[m]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(s[m-1],s[m]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(xt(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(a,g))}o[m].crossVectors(s[m],r[m])}if(t===!0){let m=Math.acos(xt(r[0].dot(r[e]),-1,1));m/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(m=-m);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],m*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Eo extends on{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ie){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,m=c-this.aY;l=p*h-m*u+this.aX,c=p*u+m*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class cg extends Eo{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function bo(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let p=(o-r)/c-(a-r)/(c+h)+(a-o)/h,m=(a-o)/h-(l-o)/(h+u)+(l-a)/u;p*=h,m*=h,s(o,a,p,m)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const As=new C,kr=new bo,Gr=new bo,Hr=new bo;class hg extends on{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(As.subVectors(s[0],s[1]).add(s[0]),c=As);const u=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(As.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=As),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),m),_=Math.pow(u.distanceToSquared(p),m),f=Math.pow(p.distanceToSquared(h),m);_<1e-4&&(_=1),g<1e-4&&(g=_),f<1e-4&&(f=_),kr.initNonuniformCatmullRom(c.x,u.x,p.x,h.x,g,_,f),Gr.initNonuniformCatmullRom(c.y,u.y,p.y,h.y,g,_,f),Hr.initNonuniformCatmullRom(c.z,u.z,p.z,h.z,g,_,f)}else this.curveType==="catmullrom"&&(kr.initCatmullRom(c.x,u.x,p.x,h.x,this.tension),Gr.initCatmullRom(c.y,u.y,p.y,h.y,this.tension),Hr.initCatmullRom(c.z,u.z,p.z,h.z,this.tension));return n.set(kr.calc(l),Gr.calc(l),Hr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ol(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function ug(i,e){const t=1-i;return t*t*e}function dg(i,e){return 2*(1-i)*i*e}function fg(i,e){return i*i*e}function Hi(i,e,t,n){return ug(i,e)+dg(i,t)+fg(i,n)}function pg(i,e){const t=1-i;return t*t*t*e}function mg(i,e){const t=1-i;return 3*t*t*i*e}function gg(i,e){return 3*(1-i)*i*i*e}function _g(i,e){return i*i*i*e}function Vi(i,e,t,n,s){return pg(i,e)+mg(i,t)+gg(i,n)+_g(i,s)}class oc extends on{constructor(e=new ie,t=new ie,n=new ie,s=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ie){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vi(e,s.x,r.x,o.x,a.x),Vi(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class vg extends on{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vi(e,s.x,r.x,o.x,a.x),Vi(e,s.y,r.y,o.y,a.y),Vi(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ac extends on{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xg extends on{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lc extends on{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Hi(e,s.x,r.x,o.x),Hi(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yg extends on{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Hi(e,s.x,r.x,o.x),Hi(e,s.y,r.y,o.y),Hi(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class cc extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ol(a,l.x,c.x,h.x,u.x),ol(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ie().fromArray(s))}return this}}var ro=Object.freeze({__proto__:null,ArcCurve:cg,CatmullRomCurve3:hg,CubicBezierCurve:oc,CubicBezierCurve3:vg,EllipseCurve:Eo,LineCurve:ac,LineCurve3:xg,QuadraticBezierCurve:lc,QuadraticBezierCurve3:yg,SplineCurve:cc});class Mg extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ro[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new ro[s.type]().fromJSON(s))}return this}}class al extends Mg{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ac(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new lc(this.currentPoint.clone(),new ie(e,t),new ie(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new oc(this.currentPoint.clone(),new ie(e,t),new ie(n,s),new ie(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new cc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){const c=new Eo(e,t,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wi extends yt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new C,h=new ie;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){const m=n+u/t*s;c.x=e*Math.cos(m),c.y=e*Math.sin(m),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[p]/e+1)/2,h.y=(o[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(a,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class It extends yt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],m=[];let g=0;const _=[],f=n/2;let d=0;S(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new nt(u,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(m,2));function S(){const M=new C,L=new C;let A=0;const T=(t-e)/n;for(let N=0;N<=r;N++){const $=[],x=N/r,w=x*(t-e)+e;for(let J=0;J<=s;J++){const Q=J/s,D=Q*l+a,Y=Math.sin(D),H=Math.cos(D);L.x=w*Y,L.y=-x*n+f,L.z=w*H,u.push(L.x,L.y,L.z),M.set(Y,T,H).normalize(),p.push(M.x,M.y,M.z),m.push(Q,1-x),$.push(g++)}_.push($)}for(let N=0;N<s;N++)for(let $=0;$<r;$++){const x=_[$][N],w=_[$+1][N],J=_[$+1][N+1],Q=_[$][N+1];h.push(x,w,Q),h.push(w,J,Q),A+=6}c.addGroup(d,A,0),d+=A}function v(M){const L=g,A=new ie,T=new C;let N=0;const $=M===!0?e:t,x=M===!0?1:-1;for(let J=1;J<=s;J++)u.push(0,f*x,0),p.push(0,x,0),m.push(.5,.5),g++;const w=g;for(let J=0;J<=s;J++){const D=J/s*l+a,Y=Math.cos(D),H=Math.sin(D);T.x=$*H,T.y=f*x,T.z=$*Y,u.push(T.x,T.y,T.z),p.push(0,x,0),A.x=Y*.5+.5,A.y=H*.5*x+.5,m.push(A.x,A.y),g++}for(let J=0;J<s;J++){const Q=L+J,D=w+J;M===!0?h.push(D,D+1,Q):h.push(D+1,D,Q),N+=3}c.addGroup(d,N,M===!0?1:2),d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class To extends It{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new To(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wo extends yt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const v=new C,M=new C,L=new C;for(let A=0;A<t.length;A+=3)m(t[A+0],v),m(t[A+1],M),m(t[A+2],L),l(v,M,L,S)}function l(S,v,M,L){const A=L+1,T=[];for(let N=0;N<=A;N++){T[N]=[];const $=S.clone().lerp(M,N/A),x=v.clone().lerp(M,N/A),w=A-N;for(let J=0;J<=w;J++)J===0&&N===A?T[N][J]=$:T[N][J]=$.clone().lerp(x,J/w)}for(let N=0;N<A;N++)for(let $=0;$<2*(A-N)-1;$++){const x=Math.floor($/2);$%2===0?(p(T[N][x+1]),p(T[N+1][x]),p(T[N][x])):(p(T[N][x+1]),p(T[N+1][x+1]),p(T[N+1][x]))}}function c(S){const v=new C;for(let M=0;M<r.length;M+=3)v.x=r[M+0],v.y=r[M+1],v.z=r[M+2],v.normalize().multiplyScalar(S),r[M+0]=v.x,r[M+1]=v.y,r[M+2]=v.z}function h(){const S=new C;for(let v=0;v<r.length;v+=3){S.x=r[v+0],S.y=r[v+1],S.z=r[v+2];const M=f(S)/2/Math.PI+.5,L=d(S)/Math.PI+.5;o.push(M,1-L)}g(),u()}function u(){for(let S=0;S<o.length;S+=6){const v=o[S+0],M=o[S+2],L=o[S+4],A=Math.max(v,M,L),T=Math.min(v,M,L);A>.9&&T<.1&&(v<.2&&(o[S+0]+=1),M<.2&&(o[S+2]+=1),L<.2&&(o[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function m(S,v){const M=S*3;v.x=e[M+0],v.y=e[M+1],v.z=e[M+2]}function g(){const S=new C,v=new C,M=new C,L=new C,A=new ie,T=new ie,N=new ie;for(let $=0,x=0;$<r.length;$+=9,x+=6){S.set(r[$+0],r[$+1],r[$+2]),v.set(r[$+3],r[$+4],r[$+5]),M.set(r[$+6],r[$+7],r[$+8]),A.set(o[x+0],o[x+1]),T.set(o[x+2],o[x+3]),N.set(o[x+4],o[x+5]),L.copy(S).add(v).add(M).divideScalar(3);const w=f(L);_(A,x+0,S,w),_(T,x+2,v,w),_(N,x+4,M,w)}}function _(S,v,M,L){L<0&&S.x===1&&(o[v]=S.x-1),M.x===0&&M.z===0&&(o[v]=L/2/Math.PI+.5)}function f(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wo(e.vertices,e.indices,e.radius,e.details)}}class er extends wo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new er(e.radius,e.detail)}}class Us extends al{constructor(e){super(e),this.uuid=Jn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new al().fromJSON(s))}return this}}const Sg={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=hc(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,p,m;if(n&&(r=Ag(i,e,r,t)),i.length>80*t){a=c=i[0],l=h=i[1];for(let g=t;g<s;g+=t)u=i[g],p=i[g+1],u<a&&(a=u),p<l&&(l=p),u>c&&(c=u),p>h&&(h=p);m=Math.max(c-a,h-l),m=m!==0?32767/m:0}return $i(r,o,t,a,l,m,0),o}};function hc(i,e,t,n,s){let r,o;if(s===Bg(i,e,t,n)>0)for(r=e;r<t;r+=n)o=ll(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=ll(r,i[r],i[r+1],o);return o&&tr(o,o.next)&&(Zi(o),o=o.next),o}function Kn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(tr(t,t.next)||ct(t.prev,t,t.next)===0)){if(Zi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function $i(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Dg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?bg(i,n,s,r):Eg(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Zi(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Tg(Kn(i),e,t),$i(i,e,t,n,s,r,2)):o===2&&wg(i,e,t,n,s,r):$i(Kn(i),e,t,n,s,r,1);break}}}function Eg(i){const e=i.prev,t=i,n=i.next;if(ct(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,p=s>r?s>o?s:o:r>o?r:o,m=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=p&&g.y>=u&&g.y<=m&&yi(s,a,r,l,o,c,g.x,g.y)&&ct(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function bg(i,e,t,n){const s=i.prev,r=i,o=i.next;if(ct(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,p=o.y,m=a<l?a<c?a:c:l<c?l:c,g=h<u?h<p?h:p:u<p?u:p,_=a>l?a>c?a:c:l>c?l:c,f=h>u?h>p?h:p:u>p?u:p,d=oo(m,g,e,t,n),S=oo(_,f,e,t,n);let v=i.prevZ,M=i.nextZ;for(;v&&v.z>=d&&M&&M.z<=S;){if(v.x>=m&&v.x<=_&&v.y>=g&&v.y<=f&&v!==s&&v!==o&&yi(a,h,l,u,c,p,v.x,v.y)&&ct(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=m&&M.x<=_&&M.y>=g&&M.y<=f&&M!==s&&M!==o&&yi(a,h,l,u,c,p,M.x,M.y)&&ct(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=d;){if(v.x>=m&&v.x<=_&&v.y>=g&&v.y<=f&&v!==s&&v!==o&&yi(a,h,l,u,c,p,v.x,v.y)&&ct(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=S;){if(M.x>=m&&M.x<=_&&M.y>=g&&M.y<=f&&M!==s&&M!==o&&yi(a,h,l,u,c,p,M.x,M.y)&&ct(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Tg(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!tr(s,r)&&uc(s,n,n.next,r)&&Ki(s,r)&&Ki(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Zi(n),Zi(n.next),n=i=r),n=n.next}while(n!==i);return Kn(n)}function wg(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ug(o,a)){let l=dc(o,a);o=Kn(o,o.next),l=Kn(l,l.next),$i(o,e,t,n,s,r,0),$i(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Ag(i,e,t,n){const s=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=hc(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Ng(c));for(s.sort(Cg),r=0;r<s.length;r++)t=Rg(s[r],t);return t}function Cg(i,e){return i.x-e.x}function Rg(i,e){const t=Pg(i,e);if(!t)return e;const n=dc(t,i);return Kn(n,n.next),Kn(t,t.next)}function Pg(i,e){let t=e,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const p=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=r&&p>n&&(n=p,s=t.x<t.next.x?t:t.next,p===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&yi(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),Ki(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&Lg(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function Lg(i,e){return ct(i.prev,i,e.prev)<0&&ct(e.next,i,i.next)<0}function Dg(i,e,t,n){let s=i;do s.z===0&&(s.z=oo(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ig(s)}function Ig(i){let e,t,n,s,r,o,a,l,c=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,c*=2}while(o>1);return i}function oo(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Ng(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function yi(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Ug(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Og(i,e)&&(Ki(i,e)&&Ki(e,i)&&Fg(i,e)&&(ct(i.prev,i,e.prev)||ct(i,e.prev,e))||tr(i,e)&&ct(i.prev,i,i.next)>0&&ct(e.prev,e,e.next)>0)}function ct(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function tr(i,e){return i.x===e.x&&i.y===e.y}function uc(i,e,t,n){const s=Rs(ct(i,e,t)),r=Rs(ct(i,e,n)),o=Rs(ct(t,n,i)),a=Rs(ct(t,n,e));return!!(s!==r&&o!==a||s===0&&Cs(i,t,e)||r===0&&Cs(i,n,e)||o===0&&Cs(t,i,n)||a===0&&Cs(t,e,n))}function Cs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Rs(i){return i>0?1:i<0?-1:0}function Og(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&uc(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ki(i,e){return ct(i.prev,i,i.next)<0?ct(i,e,i.next)>=0&&ct(i,i.prev,e)>=0:ct(i,e,i.prev)<0||ct(i,i.next,e)<0}function Fg(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function dc(i,e){const t=new ao(i.i,i.x,i.y),n=new ao(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ll(i,e,t,n){const s=new ao(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ao(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Bg(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Xi{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Xi.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];cl(e),hl(n,e);let o=e.length;t.forEach(cl);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,hl(n,t[l]);const a=Sg.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function cl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function hl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class qi extends yt{constructor(e=new Us([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new nt(s,3)),this.setAttribute("uv",new nt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:m-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:zg;let v,M=!1,L,A,T,N;d&&(v=d.getSpacedPoints(h),M=!0,p=!1,L=d.computeFrenetFrames(h,!1),A=new C,T=new C,N=new C),p||(f=0,m=0,g=0,_=0);const $=a.extractPoints(c);let x=$.shape;const w=$.holes;if(!Xi.isClockWise(x)){x=x.reverse();for(let P=0,he=w.length;P<he;P++){const K=w[P];Xi.isClockWise(K)&&(w[P]=K.reverse())}}const Q=Xi.triangulateShape(x,w),D=x;for(let P=0,he=w.length;P<he;P++){const K=w[P];x=x.concat(K)}function Y(P,he,K){return he||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(he,K)}const H=x.length,U=Q.length;function O(P,he,K){let ue,te,ye;const Me=P.x-he.x,Te=P.y-he.y,Ge=K.x-P.x,b=K.y-P.y,y=Me*Me+Te*Te,j=Me*b-Te*Ge;if(Math.abs(j)>Number.EPSILON){const Z=Math.sqrt(y),le=Math.sqrt(Ge*Ge+b*b),se=he.x-Te/Z,Oe=he.y+Me/Z,Ie=K.x-b/le,pe=K.y+Ge/le,_e=((Ie-se)*b-(pe-Oe)*Ge)/(Me*b-Te*Ge);ue=se+Me*_e-P.x,te=Oe+Te*_e-P.y;const Fe=ue*ue+te*te;if(Fe<=2)return new ie(ue,te);ye=Math.sqrt(Fe/2)}else{let Z=!1;Me>Number.EPSILON?Ge>Number.EPSILON&&(Z=!0):Me<-Number.EPSILON?Ge<-Number.EPSILON&&(Z=!0):Math.sign(Te)===Math.sign(b)&&(Z=!0),Z?(ue=-Te,te=Me,ye=Math.sqrt(y)):(ue=Me,te=Te,ye=Math.sqrt(y/2))}return new ie(ue/ye,te/ye)}const k=[];for(let P=0,he=D.length,K=he-1,ue=P+1;P<he;P++,K++,ue++)K===he&&(K=0),ue===he&&(ue=0),k[P]=O(D[P],D[K],D[ue]);const z=[];let q,re=k.concat();for(let P=0,he=w.length;P<he;P++){const K=w[P];q=[];for(let ue=0,te=K.length,ye=te-1,Me=ue+1;ue<te;ue++,ye++,Me++)ye===te&&(ye=0),Me===te&&(Me=0),q[ue]=O(K[ue],K[ye],K[Me]);z.push(q),re=re.concat(q)}for(let P=0;P<f;P++){const he=P/f,K=m*Math.cos(he*Math.PI/2),ue=g*Math.sin(he*Math.PI/2)+_;for(let te=0,ye=D.length;te<ye;te++){const Me=Y(D[te],k[te],ue);me(Me.x,Me.y,-K)}for(let te=0,ye=w.length;te<ye;te++){const Me=w[te];q=z[te];for(let Te=0,Ge=Me.length;Te<Ge;Te++){const b=Y(Me[Te],q[Te],ue);me(b.x,b.y,-K)}}}const Re=g+_;for(let P=0;P<H;P++){const he=p?Y(x[P],re[P],Re):x[P];M?(T.copy(L.normals[0]).multiplyScalar(he.x),A.copy(L.binormals[0]).multiplyScalar(he.y),N.copy(v[0]).add(T).add(A),me(N.x,N.y,N.z)):me(he.x,he.y,0)}for(let P=1;P<=h;P++)for(let he=0;he<H;he++){const K=p?Y(x[he],re[he],Re):x[he];M?(T.copy(L.normals[P]).multiplyScalar(K.x),A.copy(L.binormals[P]).multiplyScalar(K.y),N.copy(v[P]).add(T).add(A),me(N.x,N.y,N.z)):me(K.x,K.y,u/h*P)}for(let P=f-1;P>=0;P--){const he=P/f,K=m*Math.cos(he*Math.PI/2),ue=g*Math.sin(he*Math.PI/2)+_;for(let te=0,ye=D.length;te<ye;te++){const Me=Y(D[te],k[te],ue);me(Me.x,Me.y,u+K)}for(let te=0,ye=w.length;te<ye;te++){const Me=w[te];q=z[te];for(let Te=0,Ge=Me.length;Te<Ge;Te++){const b=Y(Me[Te],q[Te],ue);M?me(b.x,b.y+v[h-1].y,v[h-1].x+K):me(b.x,b.y,u+K)}}}B(),ee();function B(){const P=s.length/3;if(p){let he=0,K=H*he;for(let ue=0;ue<U;ue++){const te=Q[ue];xe(te[2]+K,te[1]+K,te[0]+K)}he=h+f*2,K=H*he;for(let ue=0;ue<U;ue++){const te=Q[ue];xe(te[0]+K,te[1]+K,te[2]+K)}}else{for(let he=0;he<U;he++){const K=Q[he];xe(K[2],K[1],K[0])}for(let he=0;he<U;he++){const K=Q[he];xe(K[0]+H*h,K[1]+H*h,K[2]+H*h)}}n.addGroup(P,s.length/3-P,0)}function ee(){const P=s.length/3;let he=0;ae(D,he),he+=D.length;for(let K=0,ue=w.length;K<ue;K++){const te=w[K];ae(te,he),he+=te.length}n.addGroup(P,s.length/3-P,1)}function ae(P,he){let K=P.length;for(;--K>=0;){const ue=K;let te=K-1;te<0&&(te=P.length-1);for(let ye=0,Me=h+f*2;ye<Me;ye++){const Te=H*ye,Ge=H*(ye+1),b=he+ue+Te,y=he+te+Te,j=he+te+Ge,Z=he+ue+Ge;Ee(b,y,j,Z)}}}function me(P,he,K){l.push(P),l.push(he),l.push(K)}function xe(P,he,K){Ne(P),Ne(he),Ne(K);const ue=s.length/3,te=S.generateTopUV(n,s,ue-3,ue-2,ue-1);we(te[0]),we(te[1]),we(te[2])}function Ee(P,he,K,ue){Ne(P),Ne(he),Ne(ue),Ne(he),Ne(K),Ne(ue);const te=s.length/3,ye=S.generateSideWallUV(n,s,te-6,te-3,te-2,te-1);we(ye[0]),we(ye[1]),we(ye[3]),we(ye[1]),we(ye[2]),we(ye[3])}function Ne(P){s.push(l[P*3+0]),s.push(l[P*3+1]),s.push(l[P*3+2])}function we(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return kg(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ro[s.type]().fromJSON(s)),new qi(n,e.options)}}const zg={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ie(r,o),new ie(a,l),new ie(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],p=e[s*3],m=e[s*3+1],g=e[s*3+2],_=e[r*3],f=e[r*3+1],d=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ie(o,1-l),new ie(c,1-u),new ie(p,1-g),new ie(_,1-d)]:[new ie(a,1-l),new ie(h,1-u),new ie(m,1-g),new ie(f,1-d)]}};function kg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Gt extends yt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,p=new C,m=[],g=[],_=[],f=[];for(let d=0;d<=n;d++){const S=[],v=d/n;let M=0;d===0&&o===0?M=.5/t:d===n&&l===Math.PI&&(M=-.5/t);for(let L=0;L<=t;L++){const A=L/t;u.x=-e*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(A+M,1-v),S.push(c++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<t;S++){const v=h[d][S+1],M=h[d][S],L=h[d+1][S],A=h[d+1][S+1];(d!==0||o>0)&&m.push(v,M,A),(d!==n-1||l<Math.PI)&&m.push(M,L,A)}this.setIndex(m),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ji extends yt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new C,u=new C,p=new C;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const _=g/s*r,f=m/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(_),u.y=(e+t*Math.cos(f))*Math.sin(_),u.z=t*Math.sin(f),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(g/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const _=(s+1)*m+g-1,f=(s+1)*(m-1)+g-1,d=(s+1)*(m-1)+g,S=(s+1)*m+g;o.push(_,f,S),o.push(f,d,S)}this.setIndex(o),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ze extends Ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zl,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fc extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Vr=new rt,ul=new C,dl=new C;class Gg{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mo,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ul.setFromMatrixPosition(e.matrixWorld),t.position.copy(ul),dl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dl),t.updateMatrixWorld(),Vr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const fl=new rt,Fi=new C,Wr=new C;class Hg extends Gg{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Fi),Wr.copy(n.position),Wr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wr),n.updateMatrixWorld(),s.makeTranslation(-Fi.x,-Fi.y,-Fi.z),fl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl)}}class Kt extends fc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Vg extends fc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class pc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=pl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=pl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function pl(){return(typeof performance>"u"?Date:performance).now()}const ml=new rt;class Wg{constructor(e,t,n=0,s=1/0){this.ray=new Zs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ml.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ml),this}intersectObject(e,t=!0,n=[]){return lo(e,this,n,t),n.sort(gl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lo(e[s],this,n,t);return n.sort(gl),n}}function gl(i,e){return i.distance-e.distance}function lo(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,o=s.length;r<o;r++)lo(s[r],e,t,!0)}}class _l{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);const rn=Object.create(null);rn.open="0";rn.close="1";rn.ping="2";rn.pong="3";rn.message="4";rn.upgrade="5";rn.noop="6";const Os=Object.create(null);Object.keys(rn).forEach(i=>{Os[rn[i]]=i});const co={type:"error",data:"parser error"},mc=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",gc=typeof ArrayBuffer=="function",_c=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i&&i.buffer instanceof ArrayBuffer,Ao=({type:i,data:e},t,n)=>mc&&e instanceof Blob?t?n(e):vl(e,n):gc&&(e instanceof ArrayBuffer||_c(e))?t?n(e):vl(new Blob([e]),n):n(rn[i]+(e||"")),vl=(i,e)=>{const t=new FileReader;return t.onload=function(){const n=t.result.split(",")[1];e("b"+(n||""))},t.readAsDataURL(i)};function xl(i){return i instanceof Uint8Array?i:i instanceof ArrayBuffer?new Uint8Array(i):new Uint8Array(i.buffer,i.byteOffset,i.byteLength)}let Xr;function Xg(i,e){if(mc&&i.data instanceof Blob)return i.data.arrayBuffer().then(xl).then(e);if(gc&&(i.data instanceof ArrayBuffer||_c(i.data)))return e(xl(i.data));Ao(i,!1,t=>{Xr||(Xr=new TextEncoder),e(Xr.encode(t))})}const yl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",zi=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let i=0;i<yl.length;i++)zi[yl.charCodeAt(i)]=i;const qg=i=>{let e=i.length*.75,t=i.length,n,s=0,r,o,a,l;i[i.length-1]==="="&&(e--,i[i.length-2]==="="&&e--);const c=new ArrayBuffer(e),h=new Uint8Array(c);for(n=0;n<t;n+=4)r=zi[i.charCodeAt(n)],o=zi[i.charCodeAt(n+1)],a=zi[i.charCodeAt(n+2)],l=zi[i.charCodeAt(n+3)],h[s++]=r<<2|o>>4,h[s++]=(o&15)<<4|a>>2,h[s++]=(a&3)<<6|l&63;return c},Yg=typeof ArrayBuffer=="function",Co=(i,e)=>{if(typeof i!="string")return{type:"message",data:vc(i,e)};const t=i.charAt(0);return t==="b"?{type:"message",data:jg(i.substring(1),e)}:Os[t]?i.length>1?{type:Os[t],data:i.substring(1)}:{type:Os[t]}:co},jg=(i,e)=>{if(Yg){const t=qg(i);return vc(t,e)}else return{base64:!0,data:i}},vc=(i,e)=>{switch(e){case"blob":return i instanceof Blob?i:new Blob([i]);case"arraybuffer":default:return i instanceof ArrayBuffer?i:i.buffer}},xc="",$g=(i,e)=>{const t=i.length,n=new Array(t);let s=0;i.forEach((r,o)=>{Ao(r,!1,a=>{n[o]=a,++s===t&&e(n.join(xc))})})},Kg=(i,e)=>{const t=i.split(xc),n=[];for(let s=0;s<t.length;s++){const r=Co(t[s],e);if(n.push(r),r.type==="error")break}return n};function Zg(){return new TransformStream({transform(i,e){Xg(i,t=>{const n=t.length;let s;if(n<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,n);else if(n<65536){s=new Uint8Array(3);const r=new DataView(s.buffer);r.setUint8(0,126),r.setUint16(1,n)}else{s=new Uint8Array(9);const r=new DataView(s.buffer);r.setUint8(0,127),r.setBigUint64(1,BigInt(n))}i.data&&typeof i.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(t)})}})}let qr;function Ps(i){return i.reduce((e,t)=>e+t.length,0)}function Ls(i,e){if(i[0].length===e)return i.shift();const t=new Uint8Array(e);let n=0;for(let s=0;s<e;s++)t[s]=i[0][n++],n===i[0].length&&(i.shift(),n=0);return i.length&&n<i[0].length&&(i[0]=i[0].slice(n)),t}function Jg(i,e){qr||(qr=new TextDecoder);const t=[];let n=0,s=-1,r=!1;return new TransformStream({transform(o,a){for(t.push(o);;){if(n===0){if(Ps(t)<1)break;const l=Ls(t,1);r=(l[0]&128)===128,s=l[0]&127,s<126?n=3:s===126?n=1:n=2}else if(n===1){if(Ps(t)<2)break;const l=Ls(t,2);s=new DataView(l.buffer,l.byteOffset,l.length).getUint16(0),n=3}else if(n===2){if(Ps(t)<8)break;const l=Ls(t,8),c=new DataView(l.buffer,l.byteOffset,l.length),h=c.getUint32(0);if(h>Math.pow(2,21)-1){a.enqueue(co);break}s=h*Math.pow(2,32)+c.getUint32(4),n=3}else{if(Ps(t)<s)break;const l=Ls(t,s);a.enqueue(Co(r?l:qr.decode(l),e)),n=0}if(s===0||s>i){a.enqueue(co);break}}}})}const yc=4;function pt(i){if(i)return Qg(i)}function Qg(i){for(var e in pt.prototype)i[e]=pt.prototype[e];return i}pt.prototype.on=pt.prototype.addEventListener=function(i,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+i]=this._callbacks["$"+i]||[]).push(e),this};pt.prototype.once=function(i,e){function t(){this.off(i,t),e.apply(this,arguments)}return t.fn=e,this.on(i,t),this};pt.prototype.off=pt.prototype.removeListener=pt.prototype.removeAllListeners=pt.prototype.removeEventListener=function(i,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+i];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+i],this;for(var n,s=0;s<t.length;s++)if(n=t[s],n===e||n.fn===e){t.splice(s,1);break}return t.length===0&&delete this._callbacks["$"+i],this};pt.prototype.emit=function(i){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+i],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(t){t=t.slice(0);for(var n=0,s=t.length;n<s;++n)t[n].apply(this,e)}return this};pt.prototype.emitReserved=pt.prototype.emit;pt.prototype.listeners=function(i){return this._callbacks=this._callbacks||{},this._callbacks["$"+i]||[]};pt.prototype.hasListeners=function(i){return!!this.listeners(i).length};const nr=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),Ht=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),e0="arraybuffer";function Mc(i,...e){return e.reduce((t,n)=>(i.hasOwnProperty(n)&&(t[n]=i[n]),t),{})}const t0=Ht.setTimeout,n0=Ht.clearTimeout;function ir(i,e){e.useNativeTimers?(i.setTimeoutFn=t0.bind(Ht),i.clearTimeoutFn=n0.bind(Ht)):(i.setTimeoutFn=Ht.setTimeout.bind(Ht),i.clearTimeoutFn=Ht.clearTimeout.bind(Ht))}const i0=1.33;function s0(i){return typeof i=="string"?r0(i):Math.ceil((i.byteLength||i.size)*i0)}function r0(i){let e=0,t=0;for(let n=0,s=i.length;n<s;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Sc(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function o0(i){let e="";for(let t in i)i.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(i[t]));return e}function a0(i){let e={},t=i.split("&");for(let n=0,s=t.length;n<s;n++){let r=t[n].split("=");e[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return e}class l0 extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type="TransportError"}}class Ro extends pt{constructor(e){super(),this.writable=!1,ir(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,n){return super.emitReserved("error",new l0(e,t,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Co(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=o0(e);return t.length?"?"+t:""}}class c0 extends Ro{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||t()})),this.writable||(n++,this.once("drain",function(){--n||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};Kg(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,$g(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Sc()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let Ec=!1;try{Ec=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const h0=Ec;function u0(){}class d0 extends c0{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let n=location.port;n||(n=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||n!==e.port}}doWrite(e,t){const n=this.request({method:"POST",data:e});n.on("success",t),n.on("error",(s,r)=>{this.onError("xhr post error",s,r)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,n)=>{this.onError("xhr poll error",t,n)}),this.pollXhr=e}}class nn extends pt{constructor(e,t,n){super(),this.createRequest=e,ir(this,n),this._opts=n,this._method=n.method||"GET",this._uri=t,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var e;const t=Mc(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const n=this._xhr=this.createRequest(t);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&n.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var s;n.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=nn.requestsCount++,nn.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=u0,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete nn.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}nn.requestsCount=0;nn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ml);else if(typeof addEventListener=="function"){const i="onpagehide"in Ht?"pagehide":"unload";addEventListener(i,Ml,!1)}}function Ml(){for(let i in nn.requests)nn.requests.hasOwnProperty(i)&&nn.requests[i].abort()}const f0=function(){const i=bc({xdomain:!1});return i&&i.responseType!==null}();class p0 extends d0{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=f0&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new nn(bc,this.uri(),e)}}function bc(i){const e=i.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||h0))return new XMLHttpRequest}catch{}if(!e)try{return new Ht[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Tc=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class m0 extends Ro{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,n=Tc?{}:Mc(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,n)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],s=t===e.length-1;Ao(n,this.supportsBinary,r=>{try{this.doWrite(n,r)}catch{}s&&nr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Sc()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const Yr=Ht.WebSocket||Ht.MozWebSocket;class g0 extends m0{createSocket(e,t,n){return Tc?new Yr(e,t,n):t?new Yr(e,t):new Yr(e)}doWrite(e,t){this.ws.send(t)}}class _0 extends Ro{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=Jg(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=e.readable.pipeThrough(t).getReader(),s=Zg();s.readable.pipeTo(e.writable),this._writer=s.writable.getWriter();const r=()=>{n.read().then(({done:a,value:l})=>{a||(this.onPacket(l),r())}).catch(a=>{})};r();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],s=t===e.length-1;this._writer.write(n).then(()=>{s&&nr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const v0={websocket:g0,webtransport:_0,polling:p0},x0=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,y0=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ho(i){if(i.length>8e3)throw"URI too long";const e=i,t=i.indexOf("["),n=i.indexOf("]");t!=-1&&n!=-1&&(i=i.substring(0,t)+i.substring(t,n).replace(/:/g,";")+i.substring(n,i.length));let s=x0.exec(i||""),r={},o=14;for(;o--;)r[y0[o]]=s[o]||"";return t!=-1&&n!=-1&&(r.source=e,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=M0(r,r.path),r.queryKey=S0(r,r.query),r}function M0(i,e){const t=/\/{2,9}/g,n=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&n.splice(0,1),e.slice(-1)=="/"&&n.splice(n.length-1,1),n}function S0(i,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,s,r){s&&(t[s]=r)}),t}const uo=typeof addEventListener=="function"&&typeof removeEventListener=="function",Fs=[];uo&&addEventListener("offline",()=>{Fs.forEach(i=>i())},!1);class Ln extends pt{constructor(e,t){if(super(),this.binaryType=e0,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const n=ho(e);t.hostname=n.host,t.secure=n.protocol==="https"||n.protocol==="wss",t.port=n.port,n.query&&(t.query=n.query)}else t.host&&(t.hostname=ho(t.host).host);ir(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(n=>{const s=n.prototype.name;this.transports.push(s),this._transportsByName[s]=n}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=a0(this.opts.query)),uo&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Fs.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=yc,t.transport=e,this.id&&(t.sid=this.id);const n=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&Ln.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",Ln.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let n=0;n<this.writeBuffer.length;n++){const s=this.writeBuffer[n].data;if(s&&(t+=s0(s)),n>0&&t>this._maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,nr(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,n){return this._sendPacket("message",e,t,n),this}send(e,t,n){return this._sendPacket("message",e,t,n),this}_sendPacket(e,t,n,s){if(typeof t=="function"&&(s=t,t=void 0),typeof n=="function"&&(s=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const r={type:e,data:t,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},n=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}_onError(e){if(Ln.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),uo&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const n=Fs.indexOf(this._offlineEventListener);n!==-1&&Fs.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}Ln.protocol=yc;class E0 extends Ln{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),n=!1;Ln.priorWebsocketSuccess=!1;const s=()=>{n||(t.send([{type:"ping",data:"probe"}]),t.once("packet",u=>{if(!n)if(u.type==="pong"&&u.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;Ln.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(h(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const p=new Error("probe error");p.transport=t.name,this.emitReserved("upgradeError",p)}}))};function r(){n||(n=!0,h(),t.close(),t=null)}const o=u=>{const p=new Error("probe error: "+u);p.transport=t.name,r(),this.emitReserved("upgradeError",p)};function a(){o("transport closed")}function l(){o("socket closed")}function c(u){t&&u.name!==t.name&&r()}const h=()=>{t.removeListener("open",s),t.removeListener("error",o),t.removeListener("close",a),this.off("close",l),this.off("upgrading",c)};t.once("open",s),t.once("error",o),t.once("close",a),this.once("close",l),this.once("upgrading",c),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{n||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let n=0;n<e.length;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}let b0=class extends E0{constructor(e,t={}){const n=typeof e=="object"?e:t;(!n.transports||n.transports&&typeof n.transports[0]=="string")&&(n.transports=(n.transports||["polling","websocket","webtransport"]).map(s=>v0[s]).filter(s=>!!s)),super(e,n)}};function T0(i,e="",t){let n=i;t=t||typeof location<"u"&&location,i==null&&(i=t.protocol+"//"+t.host),typeof i=="string"&&(i.charAt(0)==="/"&&(i.charAt(1)==="/"?i=t.protocol+i:i=t.host+i),/^(https?|wss?):\/\//.test(i)||(typeof t<"u"?i=t.protocol+"//"+i:i="https://"+i),n=ho(i)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+e,n.href=n.protocol+"://"+r+(t&&t.port===n.port?"":":"+n.port),n}const w0=typeof ArrayBuffer=="function",A0=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i.buffer instanceof ArrayBuffer,wc=Object.prototype.toString,C0=typeof Blob=="function"||typeof Blob<"u"&&wc.call(Blob)==="[object BlobConstructor]",R0=typeof File=="function"||typeof File<"u"&&wc.call(File)==="[object FileConstructor]";function Po(i){return w0&&(i instanceof ArrayBuffer||A0(i))||C0&&i instanceof Blob||R0&&i instanceof File}function Bs(i,e){if(!i||typeof i!="object")return!1;if(Array.isArray(i)){for(let t=0,n=i.length;t<n;t++)if(Bs(i[t]))return!0;return!1}if(Po(i))return!0;if(i.toJSON&&typeof i.toJSON=="function"&&arguments.length===1)return Bs(i.toJSON(),!0);for(const t in i)if(Object.prototype.hasOwnProperty.call(i,t)&&Bs(i[t]))return!0;return!1}function P0(i){const e=[],t=i.data,n=i;return n.data=fo(t,e),n.attachments=e.length,{packet:n,buffers:e}}function fo(i,e){if(!i)return i;if(Po(i)){const t={_placeholder:!0,num:e.length};return e.push(i),t}else if(Array.isArray(i)){const t=new Array(i.length);for(let n=0;n<i.length;n++)t[n]=fo(i[n],e);return t}else if(typeof i=="object"&&!(i instanceof Date)){const t={};for(const n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=fo(i[n],e));return t}return i}function L0(i,e){return i.data=po(i.data,e),delete i.attachments,i}function po(i,e){if(!i)return i;if(i&&i._placeholder===!0){if(typeof i.num=="number"&&i.num>=0&&i.num<e.length)return e[i.num];throw new Error("illegal attachments")}else if(Array.isArray(i))for(let t=0;t<i.length;t++)i[t]=po(i[t],e);else if(typeof i=="object")for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&(i[t]=po(i[t],e));return i}const D0=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Ke;(function(i){i[i.CONNECT=0]="CONNECT",i[i.DISCONNECT=1]="DISCONNECT",i[i.EVENT=2]="EVENT",i[i.ACK=3]="ACK",i[i.CONNECT_ERROR=4]="CONNECT_ERROR",i[i.BINARY_EVENT=5]="BINARY_EVENT",i[i.BINARY_ACK=6]="BINARY_ACK"})(Ke||(Ke={}));class I0{constructor(e){this.replacer=e}encode(e){return(e.type===Ke.EVENT||e.type===Ke.ACK)&&Bs(e)?this.encodeAsBinary({type:e.type===Ke.EVENT?Ke.BINARY_EVENT:Ke.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===Ke.BINARY_EVENT||e.type===Ke.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=P0(e),n=this.encodeAsString(t.packet),s=t.buffers;return s.unshift(n),s}}class Lo extends pt{constructor(e){super(),this.reviver=e}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const n=t.type===Ke.BINARY_EVENT;n||t.type===Ke.BINARY_ACK?(t.type=n?Ke.EVENT:Ke.ACK,this.reconstructor=new N0(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(Po(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const n={type:Number(e.charAt(0))};if(Ke[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===Ke.BINARY_EVENT||n.type===Ke.BINARY_ACK){const r=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(r,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");n.attachments=Number(o)}if(e.charAt(t+1)==="/"){const r=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););n.nsp=e.substring(r,t)}else n.nsp="/";const s=e.charAt(t+1);if(s!==""&&Number(s)==s){const r=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}n.id=Number(e.substring(r,t+1))}if(e.charAt(++t)){const r=this.tryParse(e.substr(t));if(Lo.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case Ke.CONNECT:return Sl(t);case Ke.DISCONNECT:return t===void 0;case Ke.CONNECT_ERROR:return typeof t=="string"||Sl(t);case Ke.EVENT:case Ke.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&D0.indexOf(t[0])===-1);case Ke.ACK:case Ke.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class N0{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=L0(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function Sl(i){return Object.prototype.toString.call(i)==="[object Object]"}const U0=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Lo,Encoder:I0,get PacketType(){return Ke}},Symbol.toStringTag,{value:"Module"}));function qt(i,e,t){return i.on(e,t),function(){i.off(e,t)}}const O0=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ac extends pt{constructor(e,t,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[qt(e,"open",this.onopen.bind(this)),qt(e,"packet",this.onpacket.bind(this)),qt(e,"error",this.onerror.bind(this)),qt(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var n,s,r;if(O0.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const o={type:Ke.EVENT,data:t};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const h=this.ids++,u=t.pop();this._registerAckCallback(h,u),o.id=h}const a=(s=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||s===void 0?void 0:s.writable,l=this.connected&&!(!((r=this.io.engine)===null||r===void 0)&&r._hasPingExpired());return this.flags.volatile&&!a||(l?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(e,t){var n;const s=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(s===void 0){this.acks[e]=t;return}const r=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===e&&this.sendBuffer.splice(a,1);t.call(this,new Error("operation has timed out"))},s),o=(...a)=>{this.io.clearTimeoutFn(r),t.apply(this,a)};o.withError=!0,this.acks[e]=o}emitWithAck(e,...t){return new Promise((n,s)=>{const r=(o,a)=>o?s(o):n(a);r.withError=!0,t.push(r),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...r)=>(this._queue[0],s!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(s)):(this._queue.shift(),t&&t(null,...r)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:Ke.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(n=>String(n.id)===e)){const n=this.acks[e];delete this.acks[e],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case Ke.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Ke.EVENT:case Ke.BINARY_EVENT:this.onevent(e);break;case Ke.ACK:case Ke.BINARY_ACK:this.onack(e);break;case Ke.DISCONNECT:this.ondisconnect();break;case Ke.CONNECT_ERROR:this.destroy();const n=new Error(e.data.message);n.data=e.data.data,this.emitReserved("connect_error",n);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const n of t)n.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let n=!1;return function(...s){n||(n=!0,t.packet({type:Ke.ACK,id:e,data:s}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Ke.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const n of t)n.apply(this,e.data)}}}function Pi(i){i=i||{},this.ms=i.min||100,this.max=i.max||1e4,this.factor=i.factor||2,this.jitter=i.jitter>0&&i.jitter<=1?i.jitter:0,this.attempts=0}Pi.prototype.duration=function(){var i=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*i);i=Math.floor(e*10)&1?i+t:i-t}return Math.min(i,this.max)|0};Pi.prototype.reset=function(){this.attempts=0};Pi.prototype.setMin=function(i){this.ms=i};Pi.prototype.setMax=function(i){this.max=i};Pi.prototype.setJitter=function(i){this.jitter=i};class mo extends pt{constructor(e,t){var n;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,ir(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((n=t.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new Pi({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const s=t.parser||U0;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new b0(this.uri,this.opts);const t=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const s=qt(t,"open",function(){n.onopen(),e&&e()}),r=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),e?e(a):this.maybeReconnectOnOpen()},o=qt(t,"error",r);if(this._timeout!==!1){const a=this._timeout,l=this.setTimeoutFn(()=>{s(),r(new Error("timeout")),t.close()},a);this.opts.autoUnref&&l.unref(),this.subs.push(()=>{this.clearTimeoutFn(l)})}return this.subs.push(s),this.subs.push(o),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(qt(e,"ping",this.onping.bind(this)),qt(e,"data",this.ondata.bind(this)),qt(e,"error",this.onerror.bind(this)),qt(e,"close",this.onclose.bind(this)),qt(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){nr(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let n=this.nsps[e];return n?this._autoConnect&&!n.active&&n.connect():(n=new Ac(this,e,t),this.nsps[e]=n),n}_destroy(e){const t=Object.keys(this.nsps);for(const n of t)if(this.nsps[n].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const Bi={};function zs(i,e){typeof i=="object"&&(e=i,i=void 0),e=e||{};const t=T0(i,e.path||"/socket.io"),n=t.source,s=t.id,r=t.path,o=Bi[s]&&r in Bi[s].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let l;return a?l=new mo(n,e):(Bi[s]||(Bi[s]=new mo(n,e)),l=Bi[s]),t.query&&!e.query&&(e.query=t.queryKey),l.socket(t.path,e)}Object.assign(zs,{Manager:mo,Socket:Ac,io:zs,connect:zs});const El={type:"change"},jr={type:"start"},bl={type:"end"},Ds=new Zs,Tl=new wn,F0=Math.cos(70*Jt.DEG2RAD);class B0 extends Zn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:ei.ROTATE,TWO:ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Ie),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ie),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(El),n.update(),r=s.NONE},this.update=function(){const R=new C,ne=new $n().setFromUnitVectors(e.up,new C(0,1,0)),Ce=ne.clone().invert(),I=new C,de=new $n,G=new C,ce=2*Math.PI;return function(je=null){const Qe=n.object.position;R.copy(Qe).sub(n.target),R.applyQuaternion(ne),a.setFromVector3(R),n.autoRotate&&r===s.NONE&&J(x(je)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let tt=n.minAzimuthAngle,ut=n.maxAzimuthAngle;isFinite(tt)&&isFinite(ut)&&(tt<-Math.PI?tt+=ce:tt>Math.PI&&(tt-=ce),ut<-Math.PI?ut+=ce:ut>Math.PI&&(ut-=ce),tt<=ut?a.theta=Math.max(tt,Math.min(ut,a.theta)):a.theta=a.theta>(tt+ut)/2?Math.max(tt,a.theta):Math.min(ut,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Je=!1;if(n.zoomToCursor&&A||n.object.isOrthographicCamera)a.radius=z(a.radius);else{const it=a.radius;a.radius=z(a.radius*c),Je=it!=a.radius}if(R.setFromSpherical(a),R.applyQuaternion(Ce),Qe.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&A){let it=null;if(n.object.isPerspectiveCamera){const Mt=R.length();it=z(Mt*c);const Nn=Mt-it;n.object.position.addScaledVector(M,Nn),n.object.updateMatrixWorld(),Je=!!Nn}else if(n.object.isOrthographicCamera){const Mt=new C(L.x,L.y,0);Mt.unproject(n.object);const Nn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Je=Nn!==n.object.zoom;const ts=new C(L.x,L.y,0);ts.unproject(n.object),n.object.position.sub(ts).add(Mt),n.object.updateMatrixWorld(),it=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;it!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(it).add(n.object.position):(Ds.origin.copy(n.object.position),Ds.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ds.direction))<F0?e.lookAt(n.target):(Tl.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ds.intersectPlane(Tl,n.target))))}else if(n.object.isOrthographicCamera){const it=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),it!==n.object.zoom&&(n.object.updateProjectionMatrix(),Je=!0)}return c=1,A=!1,Je||I.distanceToSquared(n.object.position)>o||8*(1-de.dot(n.object.quaternion))>o||G.distanceToSquared(n.target)>o?(n.dispatchEvent(El),I.copy(n.object.position),de.copy(n.object.quaternion),G.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Fe),n.domElement.removeEventListener("pointerdown",Te),n.domElement.removeEventListener("pointercancel",b),n.domElement.removeEventListener("wheel",Z),n.domElement.removeEventListener("pointermove",Ge),n.domElement.removeEventListener("pointerup",b),n.domElement.getRootNode().removeEventListener("keydown",se,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ie),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const o=1e-6,a=new _l,l=new _l;let c=1;const h=new C,u=new ie,p=new ie,m=new ie,g=new ie,_=new ie,f=new ie,d=new ie,S=new ie,v=new ie,M=new C,L=new ie;let A=!1;const T=[],N={};let $=!1;function x(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function w(R){const ne=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*ne)}function J(R){l.theta-=R}function Q(R){l.phi-=R}const D=function(){const R=new C;return function(Ce,I){R.setFromMatrixColumn(I,0),R.multiplyScalar(-Ce),h.add(R)}}(),Y=function(){const R=new C;return function(Ce,I){n.screenSpacePanning===!0?R.setFromMatrixColumn(I,1):(R.setFromMatrixColumn(I,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(Ce),h.add(R)}}(),H=function(){const R=new C;return function(Ce,I){const de=n.domElement;if(n.object.isPerspectiveCamera){const G=n.object.position;R.copy(G).sub(n.target);let ce=R.length();ce*=Math.tan(n.object.fov/2*Math.PI/180),D(2*Ce*ce/de.clientHeight,n.object.matrix),Y(2*I*ce/de.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(Ce*(n.object.right-n.object.left)/n.object.zoom/de.clientWidth,n.object.matrix),Y(I*(n.object.top-n.object.bottom)/n.object.zoom/de.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function U(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function O(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(R,ne){if(!n.zoomToCursor)return;A=!0;const Ce=n.domElement.getBoundingClientRect(),I=R-Ce.left,de=ne-Ce.top,G=Ce.width,ce=Ce.height;L.x=I/G*2-1,L.y=-(de/ce)*2+1,M.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function z(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function q(R){u.set(R.clientX,R.clientY)}function re(R){k(R.clientX,R.clientX),d.set(R.clientX,R.clientY)}function Re(R){g.set(R.clientX,R.clientY)}function B(R){p.set(R.clientX,R.clientY),m.subVectors(p,u).multiplyScalar(n.rotateSpeed);const ne=n.domElement;J(2*Math.PI*m.x/ne.clientHeight),Q(2*Math.PI*m.y/ne.clientHeight),u.copy(p),n.update()}function ee(R){S.set(R.clientX,R.clientY),v.subVectors(S,d),v.y>0?U(w(v.y)):v.y<0&&O(w(v.y)),d.copy(S),n.update()}function ae(R){_.set(R.clientX,R.clientY),f.subVectors(_,g).multiplyScalar(n.panSpeed),H(f.x,f.y),g.copy(_),n.update()}function me(R){k(R.clientX,R.clientY),R.deltaY<0?O(w(R.deltaY)):R.deltaY>0&&U(w(R.deltaY)),n.update()}function xe(R){let ne=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?Q(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,n.keyPanSpeed),ne=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?Q(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(0,-n.keyPanSpeed),ne=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(n.keyPanSpeed,0),ne=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):H(-n.keyPanSpeed,0),ne=!0;break}ne&&(R.preventDefault(),n.update())}function Ee(R){if(T.length===1)u.set(R.pageX,R.pageY);else{const ne=Ae(R),Ce=.5*(R.pageX+ne.x),I=.5*(R.pageY+ne.y);u.set(Ce,I)}}function Ne(R){if(T.length===1)g.set(R.pageX,R.pageY);else{const ne=Ae(R),Ce=.5*(R.pageX+ne.x),I=.5*(R.pageY+ne.y);g.set(Ce,I)}}function we(R){const ne=Ae(R),Ce=R.pageX-ne.x,I=R.pageY-ne.y,de=Math.sqrt(Ce*Ce+I*I);d.set(0,de)}function P(R){n.enableZoom&&we(R),n.enablePan&&Ne(R)}function he(R){n.enableZoom&&we(R),n.enableRotate&&Ee(R)}function K(R){if(T.length==1)p.set(R.pageX,R.pageY);else{const Ce=Ae(R),I=.5*(R.pageX+Ce.x),de=.5*(R.pageY+Ce.y);p.set(I,de)}m.subVectors(p,u).multiplyScalar(n.rotateSpeed);const ne=n.domElement;J(2*Math.PI*m.x/ne.clientHeight),Q(2*Math.PI*m.y/ne.clientHeight),u.copy(p)}function ue(R){if(T.length===1)_.set(R.pageX,R.pageY);else{const ne=Ae(R),Ce=.5*(R.pageX+ne.x),I=.5*(R.pageY+ne.y);_.set(Ce,I)}f.subVectors(_,g).multiplyScalar(n.panSpeed),H(f.x,f.y),g.copy(_)}function te(R){const ne=Ae(R),Ce=R.pageX-ne.x,I=R.pageY-ne.y,de=Math.sqrt(Ce*Ce+I*I);S.set(0,de),v.set(0,Math.pow(S.y/d.y,n.zoomSpeed)),U(v.y),d.copy(S);const G=(R.pageX+ne.x)*.5,ce=(R.pageY+ne.y)*.5;k(G,ce)}function ye(R){n.enableZoom&&te(R),n.enablePan&&ue(R)}function Me(R){n.enableZoom&&te(R),n.enableRotate&&K(R)}function Te(R){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",Ge),n.domElement.addEventListener("pointerup",b)),!qe(R)&&(fe(R),R.pointerType==="touch"?pe(R):y(R)))}function Ge(R){n.enabled!==!1&&(R.pointerType==="touch"?_e(R):j(R))}function b(R){switch(ht(R),T.length){case 0:n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",Ge),n.domElement.removeEventListener("pointerup",b),n.dispatchEvent(bl),r=s.NONE;break;case 1:const ne=T[0],Ce=N[ne];pe({pointerId:ne,pageX:Ce.x,pageY:Ce.y});break}}function y(R){let ne;switch(R.button){case 0:ne=n.mouseButtons.LEFT;break;case 1:ne=n.mouseButtons.MIDDLE;break;case 2:ne=n.mouseButtons.RIGHT;break;default:ne=-1}switch(ne){case Qn.DOLLY:if(n.enableZoom===!1)return;re(R),r=s.DOLLY;break;case Qn.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;Re(R),r=s.PAN}else{if(n.enableRotate===!1)return;q(R),r=s.ROTATE}break;case Qn.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;q(R),r=s.ROTATE}else{if(n.enablePan===!1)return;Re(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(jr)}function j(R){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;B(R);break;case s.DOLLY:if(n.enableZoom===!1)return;ee(R);break;case s.PAN:if(n.enablePan===!1)return;ae(R);break}}function Z(R){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(R.preventDefault(),n.dispatchEvent(jr),me(le(R)),n.dispatchEvent(bl))}function le(R){const ne=R.deltaMode,Ce={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ne){case 1:Ce.deltaY*=16;break;case 2:Ce.deltaY*=100;break}return R.ctrlKey&&!$&&(Ce.deltaY*=10),Ce}function se(R){R.key==="Control"&&($=!0,n.domElement.getRootNode().addEventListener("keyup",Oe,{passive:!0,capture:!0}))}function Oe(R){R.key==="Control"&&($=!1,n.domElement.getRootNode().removeEventListener("keyup",Oe,{passive:!0,capture:!0}))}function Ie(R){n.enabled===!1||n.enablePan===!1||xe(R)}function pe(R){switch(De(R),T.length){case 1:switch(n.touches.ONE){case ei.ROTATE:if(n.enableRotate===!1)return;Ee(R),r=s.TOUCH_ROTATE;break;case ei.PAN:if(n.enablePan===!1)return;Ne(R),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case ei.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(R),r=s.TOUCH_DOLLY_PAN;break;case ei.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;he(R),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(jr)}function _e(R){switch(De(R),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;K(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;ue(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ye(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Me(R),n.update();break;default:r=s.NONE}}function Fe(R){n.enabled!==!1&&R.preventDefault()}function fe(R){T.push(R.pointerId)}function ht(R){delete N[R.pointerId];for(let ne=0;ne<T.length;ne++)if(T[ne]==R.pointerId){T.splice(ne,1);return}}function qe(R){for(let ne=0;ne<T.length;ne++)if(T[ne]==R.pointerId)return!0;return!1}function De(R){let ne=N[R.pointerId];ne===void 0&&(ne=new ie,N[R.pointerId]=ne),ne.set(R.pageX,R.pageY)}function Ae(R){const ne=R.pointerId===T[0]?T[1]:T[0];return N[ne]}n.domElement.addEventListener("contextmenu",Fe),n.domElement.addEventListener("pointerdown",Te),n.domElement.addEventListener("pointercancel",b),n.domElement.addEventListener("wheel",Z,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",se,{passive:!0,capture:!0}),this.update()}}const Cc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class es{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const z0=new Jl(-1,1,1,-1,0,1);class k0 extends yt{constructor(){super(),this.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new nt([0,2,0,0,2,0],2))}}const G0=new k0;class Rc{constructor(e){this._mesh=new ve(G0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,z0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class H0 extends es{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ys.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Rc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class wl extends es{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class V0 extends es{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class W0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ie);this._width=n.width,this._height=n.height,t=new $t(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new H0(Cc),this.copyPass.material.blending=_n,this.clock=new pc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}wl!==void 0&&(o instanceof wl?n=!0:o instanceof V0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class X0 extends es{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ke}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const q0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ke(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ai extends es{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ie(e.x,e.y):new ie(256,256),this.clearColor=new ke(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new $t(r,o,{type:vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const p=new $t(r,o,{type:vn});p.texture.name="UnrealBloomPass.h"+u,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);const m=new $t(r,o,{type:vn});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),o=Math.round(o/2)}const a=q0;this.highPassUniforms=Ys.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ie(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Cc;this.copyUniforms=Ys.clone(h.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Yi,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ke,this.oldClearAlpha=1,this.basic=new Dn,this.fsQuad=new Rc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ie(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ai.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ai.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Tt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ie(.5,.5)},direction:{value:new ie(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ai.BlurDirectionX=new ie(1,0);Ai.BlurDirectionY=new ie(0,1);class Y0{constructor(e){oe(this,"scene");oe(this,"camera");oe(this,"renderer");oe(this,"controls");oe(this,"composer");oe(this,"updatables",[]);oe(this,"clock",new pc);const t=document.getElementById(e);if(!t)throw new Error(`Container with id '${e}' not found.`);this.scene=new lg;const n=t.clientWidth||window.innerWidth,s=t.clientHeight||window.innerHeight;this.camera=new Bt(75,n/s,.1,1e4),this.renderer=new rc({antialias:!1,alpha:!0}),this.renderer.setSize(n,s),this.renderer.setPixelRatio(window.devicePixelRatio),t.appendChild(this.renderer.domElement);const r=new X0(this.scene,this.camera),o=new Ai(new ie(n,s),1.5,.4,.85);o.threshold=0,o.strength=1.5,o.radius=.5,this.composer=new W0(this.renderer),this.composer.addPass(r),this.composer.addPass(o),this.controls=new B0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,window.addEventListener("resize",this.onWindowResize.bind(this),!1)}addUpdatable(e){this.updatables.push(e)}removeUpdatable(e){const t=this.updatables.indexOf(e);t>-1&&this.updatables.splice(t,1)}onWindowResize(){const e=this.renderer.domElement.parentElement;if(e){const t=e.clientWidth,n=e.clientHeight;this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,n),this.composer.setSize(t,n)}}start(){this.clock.start(),this.renderer.setAnimationLoop(this.animate.bind(this))}animate(e){const t=this.clock.getDelta();this.controls.enabled&&this.controls.update();for(const n of this.updatables)n&&typeof n.update=="function"&&n.update(e,t);this.composer.render()}}class j0{constructor(e){oe(this,"scene");oe(this,"starfield");oe(this,"starMaterial");oe(this,"brightStarfield");oe(this,"brightStarMaterial");oe(this,"spaceDust");oe(this,"ambientLight");oe(this,"sunMeshes",[]);oe(this,"sunLights",[]);oe(this,"sunBaseIntensities",[]);oe(this,"sunBaseScales",[]);oe(this,"warpStretchTarget",1);oe(this,"brightWarpStretchTarget",1);oe(this,"planetAnimations",[]);oe(this,"planets",[]);oe(this,"collectibles",[]);this.scene=e,this.createStarfield(e),this.createPlanets(e),this.createCollectibles(e),this.ambientLight=new Vg(1581104,.12),e.add(this.ambientLight),this.jumpToSystem(0)}createStarfield(e){const t=new yt,n=5e3,s=new Float32Array(n*3),r=new Float32Array(n*3),o=[new ke(16777215),new ke(11393254),new ke(16758465)];for(let _=0;_<n;_++){const f=500+Math.random()*2e3,d=2*Math.PI*Math.random(),S=Math.acos(2*Math.random()-1),v=f*Math.sin(S)*Math.cos(d),M=f*Math.sin(S)*Math.sin(d),L=f*Math.cos(S);s[_*3]=v,s[_*3+1]=M,s[_*3+2]=L;const A=o[Math.floor(Math.random()*o.length)];r[_*3]=A.r,r[_*3+1]=A.g,r[_*3+2]=A.b}t.setAttribute("position",new Rt(s,3)),t.setAttribute("color",new Rt(r,3)),this.starMaterial=new Ns({size:2,vertexColors:!0,transparent:!0,opacity:.8,sizeAttenuation:!0}),this.starfield=new zr(t,this.starMaterial),e.add(this.starfield);const a=500,l=new yt,c=new Float32Array(a*3),h=new Float32Array(a*3);for(let _=0;_<a;_++){const f=100+Math.random()*400,d=2*Math.PI*Math.random(),S=Math.acos(2*Math.random()-1);c[_*3]=f*Math.sin(S)*Math.cos(d),c[_*3+1]=f*Math.sin(S)*Math.sin(d),c[_*3+2]=f*Math.cos(S),h[_*3]=1,h[_*3+1]=1,h[_*3+2]=1}l.setAttribute("position",new Rt(c,3)),l.setAttribute("color",new Rt(h,3)),this.brightStarMaterial=new Ns({size:4,vertexColors:!0,transparent:!0,opacity:1,sizeAttenuation:!0}),this.brightStarfield=new zr(l,this.brightStarMaterial),e.add(this.brightStarfield);const u=1e4,p=new yt,m=new Float32Array(u*3);for(let _=0;_<u;_++)m[_*3]=(Math.random()-.5)*4e3,m[_*3+1]=(Math.random()-.5)*4e3,m[_*3+2]=(Math.random()-.5)*4e3;p.setAttribute("position",new Rt(m,3));const g=new Ns({color:8947848,size:.5,transparent:!0,opacity:.5,sizeAttenuation:!0});this.spaceDust=new zr(p,g),e.add(this.spaceDust)}createPlanets(e){const t=[{pos:[-500,-200,-1e3],size:150,color:3359846},{pos:[800,300,-400],size:250,color:9127187},{pos:[200,-100,800],size:100,color:2263842},{pos:[-900,500,200],size:180,color:14423100},{pos:[400,800,600],size:80,color:8388736}];for(let n=0;n<25;n++)t.push({pos:[(Math.random()-.5)*4e3,(Math.random()-.5)*4e3,(Math.random()-.5)*4e3],size:50+Math.random()*200,color:Math.floor(Math.random()*16777215)});t.forEach(n=>{const s=new Gt(n.size,64,64),r=new Ze({color:n.color,roughness:.8,metalness:.1,flatShading:!1}),o=new ve(s,r);o.position.set(n.pos[0],n.pos[1],n.pos[2]),e.add(o),this.planets.push(o),this.planetAnimations.push({mesh:o,basePosition:o.position.clone(),orbitRadius:Math.min(140,15+n.size*.25+Math.random()*45),orbitSpeed:.004+Math.random()*.01,orbitPhase:Math.random()*Math.PI*2,bobAmplitude:2+Math.random()*8,bobSpeed:.15+Math.random()*.35,spinSpeedY:.04+Math.random()*.06,spinSpeedX:.01+Math.random()*.02}),o.rotation.z=(Math.random()-.5)*.6})}createCollectibles(e){const t=["Titanium","Plasma","Credits"];for(let s=0;s<300;s++){const r=t[Math.floor(Math.random()*t.length)];let o,a;r==="Titanium"?(o=new er(2),a=new Ze({color:8947848,roughness:.9,metalness:.2})):r==="Plasma"?(o=new Gt(1.5,16,16),a=new Ze({color:65535,emissive:65535,emissiveIntensity:.8})):(o=new $e(2,2,2),a=new Ze({color:16766720,roughness:.3,metalness:1}));const l=new ve(o,a),c=(Math.random()-.5)*4e3,h=(Math.random()-.5)*4e3,u=(Math.random()-.5)*4e3;l.position.set(c,h,u),l.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),e.add(l),this.collectibles.push({mesh:l,type:r,value:r==="Credits"?50+Math.floor(Math.random()*50):10+Math.floor(Math.random()*10)})}}update(e,t){if(t===void 0)return;const n=e*.001;if(this.starfield){this.starfield.rotation.y+=.01*t,this.starfield.rotation.x+=.005*t;const s=Jt.lerp(this.starfield.scale.z,this.warpStretchTarget,Math.min(1,t*3.5));this.starfield.scale.set(1,1,s)}if(this.brightStarfield){this.brightStarfield.rotation.y+=.015*t,this.brightStarfield.rotation.x+=.008*t;const s=Jt.lerp(this.brightStarfield.scale.z,this.brightWarpStretchTarget,Math.min(1,t*4.5));this.brightStarfield.scale.set(1,1,s)}this.spaceDust&&(this.spaceDust.rotation.y+=.002*t,this.spaceDust.rotation.x+=.001*t),this.starMaterial&&(this.starMaterial.opacity=.7+Math.sin(n*.8)*.12,this.starMaterial.size=1.8+Math.sin(n*.6+1.2)*.3),this.brightStarMaterial&&(this.brightStarMaterial.opacity=.85+Math.sin(n*1.5+.8)*.1,this.brightStarMaterial.size=3.8+Math.sin(n*1.1+2.4)*.35),this.sunLights.forEach((s,r)=>{const o=.93+Math.sin(n*(.22+r*.08)+r)*.07;s.intensity=this.sunBaseIntensities[r]*o}),this.sunMeshes.forEach((s,r)=>{const o=1+Math.sin(n*(.18+r*.05)+r*1.7)*.03,a=this.sunBaseScales[r];s.scale.setScalar(a*o)}),this.planetAnimations.forEach(s=>{const r=n*s.orbitSpeed+s.orbitPhase,o=Math.cos(r)*s.orbitRadius,a=Math.sin(r)*s.orbitRadius,l=Math.sin(n*s.bobSpeed+s.orbitPhase)*s.bobAmplitude;s.mesh.position.set(s.basePosition.x+o,s.basePosition.y+l,s.basePosition.z+a),s.mesh.rotation.y+=s.spinSpeedY*t,s.mesh.rotation.x+=s.spinSpeedX*t}),this.collectibles.forEach(s=>{s.mesh.rotation.x+=.5*t,s.mesh.rotation.y+=.5*t})}setWarpStretch(e){e?(this.warpStretchTarget=10,this.brightWarpStretchTarget=20):(this.warpStretchTarget=1,this.brightWarpStretchTarget=1)}createSeededRandom(e){let t=e>>>0;return()=>{t+=1831565813;let n=Math.imul(t^t>>>15,t|1);return n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}rebuildSystemSuns(e){this.sunMeshes.forEach(r=>{this.scene.remove(r),r.geometry.dispose(),Array.isArray(r.material)?r.material.forEach(o=>o.dispose()):r.material.dispose()}),this.sunLights.forEach(r=>this.scene.remove(r)),this.sunMeshes=[],this.sunLights=[],this.sunBaseIntensities=[],this.sunBaseScales=[];const t=1+Math.floor(e()*3);let n=new ke(0,0,0);for(let r=0;r<t;r++){const o=6200+e()*3600,a=e()*Math.PI*2,l=Math.acos(2*e()-1),c=new C(o*Math.sin(l)*Math.cos(a),o*Math.sin(l)*Math.sin(a),o*Math.cos(l)),h=(.04+e()*.17+r*.23)%1,u=.45+e()*.3,p=.58+e()*.22,m=new ke().setHSL(h,u,p);n.add(m);const g=260+e()*420,_=new Dn({color:m,transparent:!0,opacity:.96}),f=new ve(new Gt(g,24,18),_);f.position.copy(c),this.scene.add(f),this.sunMeshes.push(f),this.sunBaseScales.push(1);const d=1.6+e()*1.6,S=new Kt(m,d,16e3,1.25);S.position.copy(c),this.scene.add(S),this.sunLights.push(S),this.sunBaseIntensities.push(d)}n.multiplyScalar(1/t);const s=.06+t*.03;this.ambientLight.color.copy(n).multiplyScalar(.65),this.ambientLight.intensity=s}jumpToSystem(e){const t=this.createSeededRandom((e+1)*7919),n=1800+t()*1800;this.planets.forEach((r,o)=>{const a=450+t()*n,l=t()*Math.PI*2,c=Math.acos(2*t()-1),h=new C(a*Math.sin(c)*Math.cos(l),a*Math.sin(c)*Math.sin(l),a*Math.cos(c));r.position.copy(h),r.rotation.set(t()*Math.PI,t()*Math.PI,t()*Math.PI);const u=r.material,p=t(),m=.35+t()*.35,g=.32+t()*.28;u.color.setHSL(p,m,g),this.planetAnimations[o]&&(this.planetAnimations[o].basePosition.copy(h),this.planetAnimations[o].orbitRadius=12+t()*90,this.planetAnimations[o].orbitSpeed=.003+t()*.012,this.planetAnimations[o].orbitPhase=t()*Math.PI*2,this.planetAnimations[o].bobAmplitude=1.5+t()*8,this.planetAnimations[o].bobSpeed=.12+t()*.42,this.planetAnimations[o].spinSpeedY=.03+t()*.07,this.planetAnimations[o].spinSpeedX=.008+t()*.025)}),this.collectibles.forEach(r=>{r.mesh.position.set((t()-.5)*4200,(t()-.5)*4200,(t()-.5)*4200),r.mesh.rotation.set(t()*Math.PI,t()*Math.PI,t()*Math.PI)});const s=t();this.starMaterial.color.setHSL(s,.18,1),this.brightStarMaterial.color.setHSL((s+.08)%1,.35,1),this.rebuildSystemSuns(this.createSeededRandom((e+1)*104729))}}class Al{constructor(e){oe(this,"mesh");oe(this,"visualGroup");oe(this,"engines",[]);oe(this,"engineMaterials",[]);oe(this,"shipLights",[]);oe(this,"animatedParts",[]);oe(this,"emissivePulses",[]);oe(this,"hullNodes",[]);oe(this,"innerRings",[]);oe(this,"shieldMesh",null);oe(this,"shieldUniforms");oe(this,"shieldPulseTimer",0);oe(this,"keys",{w:!1,s:!1,a:!1,d:!1,ArrowUp:!1,ArrowDown:!1,ArrowLeft:!1,ArrowRight:!1,Shift:!1});oe(this,"isWarping",!1);oe(this,"speedMultiplier",1);oe(this,"forcedWarpMode",!1);oe(this,"displacementPulseTimer",0);oe(this,"displacementSpinAngle",0);oe(this,"maxSpeed",50);oe(this,"acceleration",40);oe(this,"deceleration",20);oe(this,"currentSpeed",0);oe(this,"pitchSpeed",1.5);oe(this,"yawSpeed",1.5);this.mesh=new tn,this.visualGroup=new tn,this.visualGroup.rotation.y=Math.PI,this.mesh.add(this.visualGroup),this.buildExploration(),this.initShield(),e.add(this.mesh),window.addEventListener("keydown",t=>this.handleKeyDown(t),!1),window.addEventListener("keyup",t=>this.handleKeyUp(t),!1)}initShield(){this.shieldUniforms={time:{value:0},pulse:{value:0},baseGlow:{value:.2},color:{value:new ke(65535)}};const e=`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,t=`
            uniform float time;
            uniform float pulse;
            uniform float baseGlow;
            uniform vec3 color;
            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() {
                vec3 viewDir = normalize(-vPosition);
                float fresnel = dot(viewDir, vNormal);
                fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
                fresnel = pow(fresnel, 2.0);

                // Hexagonal/rippling pattern
                float pattern = sin(vPosition.y * 10.0 + time * 5.0) * sin(vPosition.x * 10.0 + time * 5.0);
                pattern = pattern * 0.5 + 0.5;

                float intensity = fresnel * (0.3 + 0.7 * pattern) * (pulse + baseGlow);
                gl_FragColor = vec4(color, intensity);
            }
        `,n=new Tt({uniforms:this.shieldUniforms,vertexShader:e,fragmentShader:t,transparent:!0,blending:Yi,depthWrite:!1,side:xn}),s=new Gt(22,32,32);this.shieldMesh=new ve(s,n),this.mesh.add(this.shieldMesh)}pulseShield(){this.shieldPulseTimer=1}setShieldActive(e){this.shieldUniforms&&(this.shieldUniforms.baseGlow.value=e?.2:0)}setShipClass(e){for(;this.visualGroup.children.length>0;)this.visualGroup.remove(this.visualGroup.children[0]);this.engines=[],this.engineMaterials=[],this.innerRings=[],this.shipLights=[],this.animatedParts=[],this.emissivePulses=[],this.hullNodes=[],e==="Scout"?this.buildScout():e==="Cruiser"?this.buildCruiser():e==="Interceptor"?this.buildInterceptor():this.buildExploration()}setForcedWarpMode(e){this.forcedWarpMode=e}triggerDisplacementPulse(e=.95){this.displacementPulseTimer=Math.max(this.displacementPulseTimer,e)}addAnimatedPart(e,t,n,s,r,o=Math.random()*Math.PI*2){const a=t==="rotation"?e.rotation:e.position;this.animatedParts.push({object:e,channel:t,axis:n,base:a[n],amplitude:s,speed:r,phase:o})}addEmissivePulse(e,t,n,s,r=Math.random()*Math.PI*2){this.emissivePulses.push({material:e,baseIntensity:t,amplitude:n,speed:s,phase:r})}buildScout(){const e=new Ze({color:11184810,roughness:.2,metalness:.8}),t=new Ze({color:2236962,roughness:.5,metalness:.9}),n=new Ze({color:1118481,roughness:.1,metalness:.9}),s=new Ze({color:65535,emissive:65535,emissiveIntensity:2}),r=new $e(2,1.5,12),o=new ve(r,e),a=r.attributes.position;for(let S=0;S<a.count;S++)a.getZ(S)>0&&(a.setX(S,a.getX(S)*.3),a.setY(S,a.getY(S)*.3));r.computeVertexNormals(),o.position.set(0,0,0),this.visualGroup.add(o),this.hullNodes.push(o);const l=new $e(1.2,1,4),c=new ve(l,n),h=l.attributes.position;for(let S=0;S<h.count;S++)h.getZ(S)>0&&h.setY(S,h.getY(S)*.2);l.computeVertexNormals(),c.position.set(0,1,1),this.visualGroup.add(c);const u=new ve(new $e(.3,1.5,2.5),t);u.position.set(0,1.2,-3.2),this.visualGroup.add(u);const p=new ve(new $e(.25,1.1,2),t);p.position.set(0,-1,-2.5),this.visualGroup.add(p);const m=new Us;m.moveTo(0,0),m.lineTo(8,-6),m.lineTo(8,-8),m.lineTo(0,-4);const g={depth:.4,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.1,bevelThickness:.1},_=new qi(m,g),f=new ve(_,t);f.rotation.x=Math.PI/2,f.position.set(-1,0,2),this.visualGroup.add(f),this.addAnimatedPart(f,"rotation","z",.03,2.2);const d=new ve(_,t);d.rotation.x=Math.PI/2,d.rotation.y=Math.PI,d.position.set(1,0,2),this.visualGroup.add(d),this.addAnimatedPart(d,"rotation","z",.03,2.2,Math.PI);for(const S of[-2,2]){const v=new $e(1.5,1,4),M=new ve(v,t);M.position.set(S,0,-5),this.visualGroup.add(M);const L=new $e(1.2,.8,.5),A=s.clone(),T=new ve(L,A);T.position.set(S,0,-7.25),this.visualGroup.add(T),this.engines.push(T),this.engineMaterials.push(A),this.addEmissivePulse(A,1.2,.45,5.5);const N=new Kt(4513279,.8,35,2.2);N.position.set(S,0,-7.5),this.visualGroup.add(N),this.shipLights.push(N)}}buildCruiser(){const e=new Ze({color:3355443,roughness:.6,metalness:.6}),t=new Ze({color:1710618,roughness:.8,metalness:.8}),n=new Ze({color:16724736,emissive:16724736,emissiveIntensity:2}),s=new Ze({color:5592405,roughness:.4,metalness:.9}),r=new Us;r.moveTo(0,18),r.lineTo(-12,-16),r.lineTo(12,-16),r.lineTo(0,18);const o={depth:3,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.4,bevelThickness:.4},a=new qi(r,o),l=new ve(a,e);l.rotation.x=Math.PI/2,l.position.set(0,-1,0),this.visualGroup.add(l),this.hullNodes.push(l);const c=new $e(6,4,20),h=new ve(c,t);h.position.set(0,1,-2),this.visualGroup.add(h),this.hullNodes.push(h);const u=new $e(4,3,5),p=new ve(u,s);p.position.set(0,4,-8),this.visualGroup.add(p);const m=new $e(2,2,4),g=new ve(m,t);g.position.set(0,2.5,-8),this.visualGroup.add(g);const _=new $e(10,1.5,14),f=new ve(_,s);f.position.set(0,1.5,-4),this.visualGroup.add(f);for(const d of[-7,7]){const S=new $e(2,2,6),v=new ve(S,s);v.position.set(d,.5,-4),this.visualGroup.add(v),this.addAnimatedPart(v,"rotation","y",.06,.8,d<0?0:Math.PI)}for(const d of[-6,0,6]){const S=new $e(5,2.5,3),v=new ve(S,t);v.position.set(d,0,-17),this.visualGroup.add(v);const M=new $e(4.5,1.5,.5),L=n.clone(),A=new ve(M,L);A.position.set(d,0,-18.5),this.visualGroup.add(A),this.engines.push(A),this.engineMaterials.push(L),this.addEmissivePulse(L,1.4,.5,4);const T=new Kt(16729122,.9,40,2);T.position.set(d,0,-18.5),this.visualGroup.add(T),this.shipLights.push(T)}}buildInterceptor(){const e=new Ze({color:3094082,roughness:.34,metalness:.78}),t=new Ze({color:2041136,roughness:.45,metalness:.82}),n=new Ze({color:4015704,roughness:.4,metalness:.8}),s=new Ze({color:8114165,emissive:2797275,emissiveIntensity:.4,roughness:.15,metalness:.4}),r=new Ze({color:3528184,emissive:2539484,emissiveIntensity:1.1,roughness:.2,metalness:.25}),o=new Ze({color:5563391,emissive:3788799,emissiveIntensity:1.6,roughness:.1,metalness:.1}),a=new Us;a.moveTo(0,15),a.lineTo(-5.4,3.2),a.lineTo(-7.5,-12.5),a.lineTo(0,-15.5),a.lineTo(7.5,-12.5),a.lineTo(5.4,3.2),a.lineTo(0,15);const l=new ve(new qi(a,{depth:2.4,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.32,bevelThickness:.22}),e);l.rotation.x=Math.PI/2,l.position.set(0,.1,-2),this.visualGroup.add(l),this.hullNodes.push(l);const c=new ve(new $e(6.2,2.1,6.2),t);c.position.set(0,1.3,-9.8),this.visualGroup.add(c);const h=new ve(new To(1.5,6.4,8),n);h.rotation.x=Math.PI/2,h.position.set(0,-.05,13.4),this.visualGroup.add(h);const u=new ve(new It(.15,1.15,4.9,14),s);u.rotation.x=Math.PI/2,u.position.set(0,1.1,6.8),u.scale.set(1.35,1,1),this.visualGroup.add(u),this.addEmissivePulse(s,.35,.12,1.4);const p=new ve(new $e(1.1,.7,3.2),t);p.position.set(-2.7,-.2,-4.4),p.rotation.z=.12,this.visualGroup.add(p);const m=new ve(new $e(1.1,.7,3.2),t);m.position.set(2.7,-.2,-4.4),m.rotation.z=-.12,this.visualGroup.add(m);const g=new $e(8.8,.55,6.8),_=new ve(g,n);_.position.set(-4.8,-.25,-7.3),_.rotation.z=.38,_.rotation.y=.08,this.visualGroup.add(_),this.addAnimatedPart(_,"rotation","z",.012,1.6);const f=new ve(g,n);f.position.set(4.8,-.25,-7.3),f.rotation.z=-.38,f.rotation.y=-.08,this.visualGroup.add(f),this.addAnimatedPart(f,"rotation","z",.012,1.6,Math.PI);const d=new ve(new $e(4.2,.45,3.2),t);d.position.set(-2.6,-1.3,-10),d.rotation.z=.26,this.visualGroup.add(d);const S=new ve(new $e(4.2,.45,3.2),t);S.position.set(2.6,-1.3,-10),S.rotation.z=-.26,this.visualGroup.add(S);const v=[{pos:new C(0,.55,5.2),rotY:0,size:[2.8,.14,2.6]},{pos:new C(-2.4,.12,-4.8),rotY:.15,size:[1.7,.12,3.2]},{pos:new C(2.4,.12,-4.8),rotY:-.15,size:[1.7,.12,3.2]},{pos:new C(0,-.35,-9.1),rotY:0,size:[2.2,.12,2.8]}];for(const M of v){const L=new ve(new $e(M.size[0],M.size[1],M.size[2]),r);L.position.copy(M.pos),L.rotation.y=M.rotY,this.visualGroup.add(L)}this.addEmissivePulse(r,.95,.26,2.8);for(const M of[-.95,0,.95]){const L=o.clone(),A=new ve(new Wi(.52,18),L);A.position.set(M,.15,-16.2),A.rotation.y=Math.PI,this.visualGroup.add(A),this.engines.push(A),this.engineMaterials.push(L),this.addEmissivePulse(L,1.35,.34,4.4,M*.8);const T=new Kt(4708351,.9,28,2);T.position.set(M,.1,-16.5),this.visualGroup.add(T),this.shipLights.push(T)}}buildExploration(){const e=new Ze({color:14081513,roughness:.42,metalness:.62}),t=new Ze({color:11187655,roughness:.5,metalness:.66}),n=new Ze({color:2831427,roughness:.72,metalness:.74}),s=new Ze({color:9148330,roughness:.42,metalness:.72}),r=new Ze({color:13235199,emissive:11791103,emissiveIntensity:.55,roughness:.22,metalness:.22}),o=new Ze({color:16743004,emissive:16735295,emissiveIntensity:1.1,roughness:.18,metalness:.15}),a=new Ze({color:6673151,emissive:4571135,emissiveIntensity:1.25,roughness:.14,metalness:.12}),l=new Ze({color:16736067,emissive:16727839,emissiveIntensity:1,roughness:.3,metalness:.1}),c=new Ze({color:8701951,emissive:6863103,emissiveIntensity:.95,roughness:.2,metalness:.2}),h=new Ze({color:13281655,emissive:8349248,emissiveIntensity:.35,roughness:.5,metalness:.55}),u=new C(0,.1,8.5),p=new ve(new It(12.8,11.4,.85,64),e);p.position.copy(u).add(new C(0,.35,0)),this.visualGroup.add(p),this.hullNodes.push(p);const m=new ve(new It(11.3,12.6,.72,64),e);m.position.copy(u).add(new C(0,-.4,0)),this.visualGroup.add(m);const g=new ve(new Ji(12.15,.24,18,120),s);g.rotation.x=Math.PI/2,g.position.copy(u),this.visualGroup.add(g);const _=new ve(new It(2.1,2.6,.45,28),t);_.position.copy(u).add(new C(0,.88,.35)),this.visualGroup.add(_);const f=new ve(new Gt(1.45,24,18),s);f.position.copy(u).add(new C(0,1.2,.45)),f.scale.set(1,.42,1),this.visualGroup.add(f);const d=new ve(new Gt(1.7,24,16),n);d.position.copy(u).add(new C(0,-.98,-.4)),d.scale.set(1,.32,1),this.visualGroup.add(d);const S=new ve(new Ji(9.4,.09,8,96),h);S.rotation.x=Math.PI/2,S.position.copy(u).add(new C(0,.51,-.2)),this.visualGroup.add(S);for(const ee of[.18,-.06])for(let ae=0;ae<56;ae++){const me=ae/56*Math.PI*2,xe=new ve(new $e(.34,.1,.46),r);xe.position.set(Math.cos(me)*10.5,u.y+ee,u.z+Math.sin(me)*10.5),xe.lookAt(u.x,u.y+ee,u.z),this.visualGroup.add(xe)}this.addEmissivePulse(r,.5,.1,.85);const v=new ve(new $e(3.6,2.2,9.8),e);v.position.set(0,-1.05,2.5),this.visualGroup.add(v),this.hullNodes.push(v);const M=new ve(new $e(2.2,.7,6.2),t);M.position.set(0,-.2,1.7),this.visualGroup.add(M);const L=new ve(new It(2.85,1.95,20.5,24),e);L.rotation.x=Math.PI/2,L.position.set(0,-2.15,-7.6),this.visualGroup.add(L),this.hullNodes.push(L);const A=new ve(new $e(2.2,.8,12.8),t);A.position.set(0,-1.2,-8.2),this.visualGroup.add(A);const T=new ve(new $e(1.6,1.4,.2),n);T.position.set(0,-2.1,-18.05),this.visualGroup.add(T);const N=new ve(new It(2,2.3,.42,32),t);N.rotation.x=Math.PI/2,N.position.set(0,-2.1,2.45),this.visualGroup.add(N);const $=new ve(new Wi(1.75,32),c);$.position.set(0,-2.1,2.75),this.visualGroup.add($),this.addEmissivePulse(c,.85,.18,1.7);const x=new Kt(7912191,.9,38,2);x.position.set(0,-2.1,3),this.visualGroup.add(x),this.shipLights.push(x);const w=new ve(new $e(3.6,.22,.8),o);w.position.set(0,.62,-3.55),this.visualGroup.add(w),this.engines.push(w),this.engineMaterials.push(o),this.addEmissivePulse(o,.9,.16,2.1);const J=new $e(10.4,.9,3.8),Q=new ve(J,n);Q.position.set(-5.4,1.05,-10.3),Q.rotation.z=Math.atan2(4.8,8.4),this.visualGroup.add(Q);const D=new ve(J,n);D.position.set(5.4,1.05,-10.3),D.rotation.z=-Math.atan2(4.8,8.4),this.visualGroup.add(D);const Y=(ee,ae)=>{const me=new tn;me.position.set(ee,3.25,-.2);const xe=new ve(new It(.95,1.22,22.8,22),e);xe.rotation.x=Math.PI/2,xe.position.set(0,0,-12.1),me.add(xe);const Ee=new ve(new $e(1.45,.26,18.4),s);Ee.position.set(0,.92,-12),me.add(Ee);const Ne=l.clone(),we=new ve(new Gt(1.08,20,18),Ne);we.position.set(0,0,-1),we.scale.set(1,1,1.3),me.add(we),this.addEmissivePulse(Ne,.95,.34,4.2,ae);const P=[a.clone(),a.clone()];for(let ye=0;ye<P.length;ye++){const Me=ye===0?-1:1,Te=new ve(new $e(1.95,.24,17.2),P[ye]);Te.position.set(0,Me*.56,-12),me.add(Te),this.addEmissivePulse(P[ye],1,.2,2.6,ae+ye*Math.PI)}const he=a.clone(),K=new ve(new Wi(.95,24),he);K.position.set(0,0,-23.6),K.rotation.y=Math.PI,me.add(K),this.engines.push(K),this.engineMaterials.push(he),this.addEmissivePulse(he,1.25,.26,3.2,ae);const ue=new Kt(6736127,1,48,2);ue.position.set(0,0,-23.8),me.add(ue),this.shipLights.push(ue);const te=new Kt(16736063,.55,22,2.2);return te.position.set(0,0,-.7),me.add(te),this.shipLights.push(te),this.addAnimatedPart(me,"position","y",.03,.55,ae),this.addAnimatedPart(me,"rotation","z",.006,.6,ae),me};this.visualGroup.add(Y(8.9,0)),this.visualGroup.add(Y(-8.9,Math.PI));const H=new Ze({color:16731983,emissive:16722474,emissiveIntensity:.9,roughness:.3,metalness:.1}),U=new Ze({color:5898107,emissive:3143775,emissiveIntensity:.9,roughness:.3,metalness:.1}),O=new Ze({color:14742271,emissive:13363711,emissiveIntensity:.85,roughness:.3,metalness:.1}),k=new ve(new Gt(.18,10,10),H);k.position.set(-12.2,.22,8.4),this.visualGroup.add(k),this.addEmissivePulse(H,.75,.16,1.1);const z=new Kt(16728899,.45,12,2);z.position.copy(k.position),this.visualGroup.add(z),this.shipLights.push(z);const q=new ve(new Gt(.18,10,10),U);q.position.set(12.2,.22,8.4),this.visualGroup.add(q),this.addEmissivePulse(U,.75,.16,1.1,Math.PI*.4);const re=new Kt(5439352,.45,12,2);re.position.copy(q.position),this.visualGroup.add(re),this.shipLights.push(re);const Re=new ve(new Gt(.16,10,10),O);Re.position.set(0,-2,-18.4),this.visualGroup.add(Re),this.addEmissivePulse(O,.7,.14,1.3);const B=new Kt(13691903,.4,10,2);B.position.copy(Re.position),this.visualGroup.add(B),this.shipLights.push(B)}handleKeyDown(e){this.keys.hasOwnProperty(e.key)?this.keys[e.key]=!0:this.keys.hasOwnProperty(e.key.toLowerCase())&&(this.keys[e.key.toLowerCase()]=!0)}handleKeyUp(e){this.keys.hasOwnProperty(e.key)?this.keys[e.key]=!1:this.keys.hasOwnProperty(e.key.toLowerCase())&&(this.keys[e.key.toLowerCase()]=!1)}update(e,t){if(t===void 0)return;const n=e*.001;this.isWarping=this.keys.Shift||this.forcedWarpMode;const s=(this.isWarping?this.maxSpeed*10:this.maxSpeed)*this.speedMultiplier,r=(this.isWarping?this.acceleration*5:this.acceleration)*this.speedMultiplier;if(this.innerRings&&this.innerRings.length>0){const _=this.isWarping?3.2:1;this.innerRings[0].rotation.z+=t*.5*_,this.innerRings[1].rotation.z-=t*.8*_}if(this.shieldMesh)if(this.shieldUniforms.time.value=n,this.shieldPulseTimer>0){this.shieldPulseTimer-=t;const _=Math.max(0,this.shieldPulseTimer);this.shieldUniforms.pulse.value=_}else this.shieldUniforms.pulse.value=0;this.keys.w?this.currentSpeed+=r*t:this.keys.s?this.currentSpeed-=r*t:this.currentSpeed>0?this.currentSpeed=Math.max(0,this.currentSpeed-this.deceleration*(this.isWarping?5:1)*t):this.currentSpeed<0&&(this.currentSpeed=Math.min(0,this.currentSpeed+this.deceleration*t)),this.currentSpeed=Math.max(-this.maxSpeed*.5*this.speedMultiplier,Math.min(s,this.currentSpeed)),this.keys.a&&this.mesh.rotateY(this.yawSpeed*t),this.keys.d&&this.mesh.rotateY(-this.yawSpeed*t),this.keys.ArrowUp&&this.mesh.rotateX(this.pitchSpeed*t),this.keys.ArrowDown&&this.mesh.rotateX(-this.pitchSpeed*t),this.mesh.translateZ(-this.currentSpeed*t);const o=Math.max(1,s),a=Jt.clamp(Math.max(0,this.currentSpeed)/o,0,1),l=Jt.clamp(this.currentSpeed/o,-1,1),c=this.isWarping?1.3:1,h=1+Math.sin(n*18)*.03+a*.45+(this.isWarping?.2:0);this.engines.forEach((_,f)=>{const d=Math.sin(n*(8+f*.7))*.02,S=this.isWarping?1.5+a*1.4:1;_.scale.set(h+d,h+d,S),this.engineMaterials[f].emissiveIntensity=(.6+a*2.1+d*6)*c}),this.emissivePulses.forEach(_=>{const f=Math.sin(n*_.speed+_.phase)*_.amplitude;_.material.emissiveIntensity=Math.max(.05,_.baseIntensity+f+a*.35+(this.isWarping?.35:0))}),this.shipLights.forEach((_,f)=>{const d=Math.sin(n*(2.2+f*.2)+f)*.08;_.intensity=Math.max(.2,(.6+a*1.3+d)*c)}),this.displacementPulseTimer>0?(this.displacementPulseTimer=Math.max(0,this.displacementPulseTimer-t),this.displacementSpinAngle+=t*19,this.engineMaterials.forEach(_=>{_.emissiveIntensity+=.9})):this.displacementSpinAngle=Jt.lerp(this.displacementSpinAngle,0,t*5.5),this.animatedParts.forEach(_=>{const f=_.channel==="rotation"?_.object.rotation:_.object.position;f[_.axis]=_.base+Math.sin(n*_.speed+_.phase)*_.amplitude*(this.isWarping?1.4:1)});const u=(this.keys.a?1:0)+(this.keys.d?-1:0),p=(this.keys.ArrowUp?1:0)+(this.keys.ArrowDown?-1:0),m=u*.16-l*.05,g=-p*.12+a*.02;this.visualGroup.rotation.z=Jt.lerp(this.visualGroup.rotation.z,m,t*4),this.visualGroup.rotation.x=Jt.lerp(this.visualGroup.rotation.x,g,t*3),this.visualGroup.rotation.y=Math.PI+Math.sin(this.displacementSpinAngle)*.65,this.visualGroup.position.y=Jt.lerp(this.visualGroup.position.y,Math.sin(n*1.6)*.18+a*.08,t*2.5),this.hullNodes.forEach((_,f)=>{_.rotation.y=Math.sin(n*.6+f*.9)*.006})}}class $0{constructor(e){oe(this,"mesh");oe(this,"tunnel");oe(this,"material");oe(this,"currentOpacity",0);oe(this,"targetOpacity",0);oe(this,"localTime",0);this.mesh=new tn;const t=new It(60,60,2e3,64,1,!0);t.rotateX(Math.PI/2),t.translate(0,0,-800),this.material=new Tt({uniforms:{time:{value:0},opacity:{value:0},phase:{value:0}},vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform float time;
                uniform float opacity;
                uniform float phase;
                varying vec2 vUv;
                
                // Pseudo-random hash
                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
                }
                
                void main() {
                    vec2 uv = vUv;

                    // Fade ends of the cylinder
                    float edgeFade = smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.8, uv.y);

                    // Normal warp streaks
                    float speed = 25.0;
                    float scrollOffset = time * speed;
                    vec2 id = vec2(floor(uv.x * 200.0), floor(uv.y * 5.0 - scrollOffset));
                    float n = hash(id);
                    float streak = smoothstep(0.97, 1.0, n);
                    float ringNoise = sin(uv.y * 150.0 - time * 40.0);
                    float ring = smoothstep(0.95, 1.0, ringNoise) * 0.2;
                    vec3 color1 = vec3(0.1, 0.4, 1.0);
                    vec3 color2 = vec3(0.5, 0.1, 0.8);
                    vec3 color3 = vec3(0.0, 0.8, 1.0);
                    float mixFactor1 = (sin(uv.x * 10.0 + time * 2.0) + 1.0) * 0.5;
                    float mixFactor2 = (cos(uv.x * 15.0 - time) + 1.0) * 0.5;
                    vec3 baseColor = mix(mix(color1, color2, mixFactor1), color3, mixFactor2 * 0.5);
                    vec3 warpColor = baseColor * (streak * 4.0 + ring + 0.3);
                    float warpAlpha = edgeFade * clamp(streak + ring + 0.3, 0.0, 1.0);

                    // Mycelial network for spore jump phase
                    vec2 p = uv * vec2(12.0, 20.0);
                    float flow = time * 2.8;
                    float curveA = sin(p.x + sin(p.y * 0.75 + flow) * 2.0 + flow * 1.7);
                    float curveB = sin(p.y * 1.4 + cos(p.x * 0.65 - flow) * 2.2 - flow * 1.15);
                    float fibers = smoothstep(0.92, 0.995, abs(curveA * curveB));
                    float nodes = smoothstep(0.975, 1.0, hash(floor(p + vec2(flow * 4.0, flow * 2.5))));
                    float radial = smoothstep(0.55, 0.0, abs(uv.x - 0.5));

                    vec3 sporeBase = mix(vec3(0.05, 0.25, 0.45), vec3(0.18, 0.95, 0.75), radial);
                    vec3 sporeColor = sporeBase * (0.24 + fibers * 2.8 + nodes * 1.4);
                    float sporeAlpha = edgeFade * clamp(0.16 + fibers + nodes * 0.8, 0.0, 1.0);

                    // Displacement burst
                    float burst = smoothstep(0.2, 1.0, abs(sin(time * 35.0 + uv.y * 40.0)));
                    vec3 displaceColor = vec3(0.8, 0.95, 1.0) * (0.55 + burst * 0.9);
                    float displaceAlpha = edgeFade * clamp(0.4 + burst * 0.8, 0.0, 1.0);

                    float sporeMix = smoothstep(1.4, 2.2, phase);
                    float displaceMix = smoothstep(2.2, 3.0, phase);

                    vec3 finalColor = mix(warpColor, sporeColor, sporeMix);
                    finalColor = mix(finalColor, displaceColor, displaceMix);
                    float alpha = mix(warpAlpha, sporeAlpha, sporeMix);
                    alpha = mix(alpha, displaceAlpha, displaceMix);

                    // Fade ends of the cylinder
                    gl_FragColor = vec4(finalColor, alpha * opacity);
                }
            `,side:Pt,transparent:!0,blending:Yi,depthWrite:!1}),this.tunnel=new ve(t,this.material),this.mesh.add(this.tunnel),this.mesh.visible=!1,e.add(this.mesh)}update(e,t,n,s,r="idle"){if(e===void 0)return;this.localTime+=e,this.mesh.position.copy(n),this.mesh.quaternion.copy(s),this.targetOpacity=t?1:0;const o=4;this.currentOpacity<this.targetOpacity?this.currentOpacity=Math.min(this.targetOpacity,this.currentOpacity+o*e):this.currentOpacity>this.targetOpacity&&(this.currentOpacity=Math.max(this.targetOpacity,this.currentOpacity-o*e));let a=0;r==="black-alert"&&(a=1),r==="spore"&&(a=2),r==="displace"&&(a=3),this.material.uniforms.opacity.value=this.currentOpacity,this.material.uniforms.time.value=this.localTime,this.material.uniforms.phase.value=a,this.mesh.visible=this.currentOpacity>0}}class K0{constructor(e){oe(this,"mesh");oe(this,"hullMaterial");this.mesh=new tn,this.hullMaterial=new Ze({color:11141120,roughness:.3,metalness:.8});const t=new er(5),n=new ve(t,this.hullMaterial);this.mesh.add(n);const s=new Dn({color:16729156}),r=new Ji(7,.5,16,32),o=new ve(r,s);o.rotation.x=Math.PI/2,this.mesh.add(o),this.mesh.position.set(0,0,-40),e.add(this.mesh)}update(e){this.mesh.rotation.y+=.01,this.mesh.rotation.z=Math.sin(e*.002)*.2,this.mesh.position.y=Math.sin(e*.003)*2}destroy(e){e.remove(this.mesh),this.mesh.traverse(t=>{t instanceof ve&&(t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose())})}}class Z0{constructor(){oe(this,"state");oe(this,"observers",[]);this.state={energy:1e3,hull:100,crew:150,dilithium:100,torpedoes:10,inCombat:!1,enemyHull:0,credits:1e3,titanium:0,plasma:0,maxHull:100,maxEnergy:1e3,speedMultiplier:1,shipClass:"Exploration",shieldsActive:!0}}getState(){return{...this.state}}updateState(e){this.state={...this.state,...e},this.notify()}subscribe(e){this.observers.push(e),e(this.getState())}notify(){const e=this.getState();this.observers.forEach(t=>t(e))}}class J0{constructor(e,t){oe(this,"systems",[]);oe(this,"currentSystemId",0);oe(this,"gameState");oe(this,"onEvent");oe(this,"systemNames",["Ocampa","Talax","Kazon","Vidii","Borg Prime","Fluidic Space","Hirogen","Malon","Krenim","Devore","Vaadwaur","Nyria","Sikaris","Voth","Bane","Turei","Qomar","Brunali","Haakonia","Nihydron","Kraylor","Ankari","Baxial","Dralian","Enaran"]);this.gameState=e,this.onEvent=t,this.generateMap()}generateMap(){for(let t=0;t<25;t++)this.systems.push({id:t,name:this.systemNames[t%this.systemNames.length]+(t>=this.systemNames.length?` ${Math.floor(t/this.systemNames.length)}`:""),x:Math.random()*800+100,y:Math.random()*600+100,connections:[]});for(let t=0;t<25;t++){const n=this.systems.map((r,o)=>({id:o,dist:Math.hypot(r.x-this.systems[t].x,r.y-this.systems[t].y)})).filter(r=>r.id!==t).sort((r,o)=>r.dist-o.dist),s=Math.floor(Math.random()*3)+1;for(let r=0;r<s;r++){const o=n[r].id;this.systems[t].connections.includes(o)||this.systems[t].connections.push(o),this.systems[o].connections.includes(t)||this.systems[o].connections.push(t)}}}canWarpTo(e){return this.systems[e]?this.systems[this.currentSystemId].connections.includes(e)?this.gameState.getState().dilithium<10?{ok:!1,reason:"Insufficient Dilithium for warp!"}:{ok:!0}:{ok:!1,reason:"Cannot warp there: No direct connection."}:{ok:!1,reason:"Unknown target system."}}warpTo(e){const t=this.canWarpTo(e);if(!t.ok)return this.onEvent(t.reason??"Warp failed."),!1;const n=this.gameState.getState();this.gameState.updateState({dilithium:n.dilithium-10}),this.currentSystemId=e;const s=this.systems[e];return this.onEvent(`Warped to ${s.name} system.`),this.triggerRandomEvent(),!0}triggerRandomEvent(){const e=[{msg:"Arrived safely. Nothing found.",effect:()=>{}},{msg:"Encountered an anomaly! Energy -10.",effect:()=>{const n=this.gameState.getState();this.gameState.updateState({energy:Math.max(0,n.energy-10)})}},{msg:"Traded with a passing vessel. Dilithium +5.",effect:()=>{const n=this.gameState.getState();this.gameState.updateState({dilithium:n.dilithium+5})}},{msg:"Minor skirmish with raiders. Hull -5%, Energy -20.",effect:()=>{const n=this.gameState.getState();this.gameState.updateState({hull:Math.max(0,n.hull-5),energy:Math.max(0,n.energy-20)})}},{msg:"Found stranded escape pod. Crew +2.",effect:()=>{const n=this.gameState.getState();this.gameState.updateState({crew:n.crew+2})}},{msg:"RED ALERT! Hostile vessel detected!",effect:()=>{this.gameState.updateState({inCombat:!0,enemyHull:100})}}],t=e[Math.floor(Math.random()*e.length)];this.onEvent(t.msg),t.effect()}}class Q0{constructor(e,t){oe(this,"layer");oe(this,"topBar");oe(this,"eventLog");oe(this,"mapOverlay");oe(this,"combatOverlay");oe(this,"dialogOverlay");oe(this,"dialogText");oe(this,"dialogPrompt");oe(this,"shipyardOverlay");oe(this,"awayTeamOverlay");oe(this,"jumpOverlay");oe(this,"jumpStage");oe(this,"jumpTarget");oe(this,"jumpProgressFill");oe(this,"gameState");oe(this,"sectorMap");oe(this,"isMapOpen",!1);oe(this,"isDialogOpen",!1);oe(this,"isShipyardOpen",!1);oe(this,"isAwayTeamOpen",!1);oe(this,"isMapJumpInProgress",!1);oe(this,"jumpPhase","idle");oe(this,"awayStory",null);oe(this,"onFirePhasers");oe(this,"onFireTorpedoes");oe(this,"onFlee");oe(this,"onMapWarpRequested");this.gameState=e,this.sectorMap=t,this.layer=document.getElementById("ui-layer"),this.layer.style.pointerEvents="none",this.initUI(),this.gameState.subscribe(n=>this.updateState(n)),window.addEventListener("keydown",n=>{n.key.toLowerCase()==="m"?this.toggleMap():(n.key.toLowerCase()==="i"||n.key==="Tab")&&(n.preventDefault(),this.toggleShipyard())})}initUI(){this.topBar=document.createElement("div"),this.topBar.className="top-bar ui-panel",this.layer.appendChild(this.topBar),this.eventLog=document.createElement("div"),this.eventLog.className="event-log ui-panel",this.layer.appendChild(this.eventLog);const e=document.createElement("div");e.style.position="absolute",e.style.top="10px",e.style.right="10px",e.style.display="flex",e.style.gap="10px",e.style.pointerEvents="auto";const t=document.createElement("button");t.className="ui-btn",t.innerText="MAP (M)",t.onclick=()=>this.toggleMap(),e.appendChild(t);const n=document.createElement("button");n.className="ui-btn",n.innerText="SHIPYARD (I/Tab)",n.onclick=()=>this.toggleShipyard(),e.appendChild(n),this.layer.appendChild(e),this.mapOverlay=document.createElement("div"),this.mapOverlay.className="map-overlay",this.mapOverlay.style.display="none",this.layer.appendChild(this.mapOverlay),this.combatOverlay=document.createElement("div"),this.combatOverlay.className="combat-overlay ui-panel",this.combatOverlay.style.display="none",this.combatOverlay.innerHTML=`
            <h3>TACTICAL VIEW</h3>
            <div id="enemy-stats" style="margin-bottom: 10px; color: #ff4444;">ENEMY HULL: 100%</div>
            <button id="btn-phasers" class="ui-btn">FIRE PHASERS (10 Energy)</button>
            <button id="btn-torpedoes" class="ui-btn">FIRE TORPEDO (1 Torpedo)</button>
            <button id="btn-flee" class="ui-btn">FLEE (20 Dilithium)</button>
        `,this.layer.appendChild(this.combatOverlay),setTimeout(()=>{const o=document.getElementById("btn-phasers");o&&(o.onclick=()=>{var c;return(c=this.onFirePhasers)==null?void 0:c.call(this)});const a=document.getElementById("btn-torpedoes");a&&(a.onclick=()=>{var c;return(c=this.onFireTorpedoes)==null?void 0:c.call(this)});const l=document.getElementById("btn-flee");l&&(l.onclick=()=>{var c;return(c=this.onFlee)==null?void 0:c.call(this)})},0),this.dialogPrompt=document.createElement("div"),this.dialogPrompt.className="ui-panel",this.dialogPrompt.style.position="absolute",this.dialogPrompt.style.bottom="250px",this.dialogPrompt.style.left="50%",this.dialogPrompt.style.transform="translateX(-50%)",this.dialogPrompt.style.display="none",this.dialogPrompt.style.fontSize="1.2rem",this.dialogPrompt.style.fontWeight="bold",this.dialogPrompt.style.color="#fff",this.dialogPrompt.innerText="Press F to Hail Planet | L to Land Away Team",this.layer.appendChild(this.dialogPrompt),this.dialogOverlay=document.createElement("div"),this.dialogOverlay.className="dialog-overlay ui-panel",this.dialogOverlay.style.position="absolute",this.dialogOverlay.style.top="50%",this.dialogOverlay.style.left="50%",this.dialogOverlay.style.transform="translate(-50%, -50%)",this.dialogOverlay.style.width="400px",this.dialogOverlay.style.display="none",this.dialogOverlay.style.textAlign="center";const s=document.createElement("h3");s.innerText="INCOMING TRANSMISSION",this.dialogOverlay.appendChild(s),this.dialogText=document.createElement("p"),this.dialogText.style.margin="20px 0",this.dialogText.style.fontSize="1.1rem",this.dialogOverlay.appendChild(this.dialogText);const r=document.createElement("button");r.className="ui-btn",r.innerText="END TRANSMISSION",r.onclick=()=>this.hideDialog(),this.dialogOverlay.appendChild(r),this.layer.appendChild(this.dialogOverlay),this.awayTeamOverlay=document.createElement("div"),this.awayTeamOverlay.className="away-team-overlay ui-panel",this.awayTeamOverlay.style.position="absolute",this.awayTeamOverlay.style.top="50%",this.awayTeamOverlay.style.left="50%",this.awayTeamOverlay.style.transform="translate(-50%, -50%)",this.awayTeamOverlay.style.width="460px",this.awayTeamOverlay.style.maxWidth="92vw",this.awayTeamOverlay.style.display="none",this.awayTeamOverlay.style.textAlign="center",this.layer.appendChild(this.awayTeamOverlay),this.shipyardOverlay=document.createElement("div"),this.shipyardOverlay.className="shipyard-overlay ui-panel",this.shipyardOverlay.style.display="none",this.shipyardOverlay.style.position="absolute",this.shipyardOverlay.style.top="10%",this.shipyardOverlay.style.left="10%",this.shipyardOverlay.style.width="80%",this.shipyardOverlay.style.height="80%",this.shipyardOverlay.style.backgroundColor="rgba(0, 0, 0, 0.9)",this.shipyardOverlay.style.zIndex="100",this.shipyardOverlay.style.overflowY="auto",this.shipyardOverlay.style.pointerEvents="auto",this.layer.appendChild(this.shipyardOverlay),this.jumpOverlay=document.createElement("div"),this.jumpOverlay.className="jump-overlay",this.jumpOverlay.style.display="none",this.jumpOverlay.innerHTML=`
            <div class="jump-alert-rail top">BLACK ALERT • BLACK ALERT • BLACK ALERT • BLACK ALERT •</div>
            <div class="jump-overlay-inner">
                <div class="jump-alert">BLACK ALERT</div>
                <div class="jump-stage" id="jump-stage">Preparing displacement-activated spore hub drive...</div>
                <div class="jump-target" id="jump-target"></div>
                <div class="jump-progress"><div class="jump-progress-fill" id="jump-progress-fill"></div></div>
            </div>
            <div class="jump-alert-rail bottom">BLACK ALERT • BLACK ALERT • BLACK ALERT • BLACK ALERT •</div>
        `,this.layer.appendChild(this.jumpOverlay),this.jumpStage=this.jumpOverlay.querySelector("#jump-stage"),this.jumpTarget=this.jumpOverlay.querySelector("#jump-target"),this.jumpProgressFill=this.jumpOverlay.querySelector("#jump-progress-fill")}updateState(e){if(this.topBar.innerHTML=`
            <div class="stat"><span class="label">SHIELDS:</span> <span class="val" style="color: ${e.shieldsActive?"#0f0":"#f00"}">${e.shieldsActive?"ON":"OFF"}</span></div>
            <div class="stat"><span class="label">ENERGY:</span> <span class="val">${Math.floor(e.energy)}/${e.maxEnergy}</span></div>
            <div class="stat"><span class="label">HULL:</span> <span class="val">${Math.floor(e.hull)}/${e.maxHull}</span></div>
            <div class="stat"><span class="label">CREW:</span> <span class="val">${e.crew}</span></div>
            <div class="stat"><span class="label">DILITHIUM:</span> <span class="val">${e.dilithium}</span></div>
            <div class="stat"><span class="label">TORPEDOES:</span> <span class="val">${e.torpedoes}</span></div>
            <div class="stat"><span class="label">CREDITS:</span> <span class="val">${e.credits}</span></div>
            <div class="stat"><span class="label">TITANIUM:</span> <span class="val">${e.titanium}</span></div>
            <div class="stat"><span class="label">PLASMA:</span> <span class="val">${e.plasma}</span></div>
        `,e.inCombat){this.combatOverlay.style.display="block";const t=document.getElementById("enemy-stats");t&&(t.innerText=`ENEMY HULL: ${Math.floor(e.enemyHull)}%`),this.isMapOpen&&this.toggleMap(),this.isShipyardOpen&&this.toggleShipyard()}else this.combatOverlay.style.display="none";this.isShipyardOpen&&this.renderShipyard()}logEvent(e){const t=document.createElement("div");t.className="log-entry",t.innerText=`> ${e}`,this.eventLog.appendChild(t),this.eventLog.scrollTop=this.eventLog.scrollHeight}toggleMap(){this.isMapJumpInProgress||(this.isMapOpen=!this.isMapOpen,this.isMapOpen?(this.isShipyardOpen&&this.toggleShipyard(),this.mapOverlay.style.display="block",this.renderMap()):this.mapOverlay.style.display="none")}closeMap(){this.isMapOpen&&this.toggleMap()}toggleShipyard(){this.isShipyardOpen=!this.isShipyardOpen,this.isShipyardOpen?(this.isMapOpen&&this.toggleMap(),this.shipyardOverlay.style.display="block",this.renderShipyard()):this.shipyardOverlay.style.display="none"}renderShipyard(){const e=this.gameState.getState();this.shipyardOverlay.innerHTML=`
            <div style="padding: 20px;">
                <h2 style="color: #0ff; margin-top: 0;">SHIPYARD & INVENTORY</h2>
                <div style="display: flex; gap: 20px; margin-bottom: 20px; background: rgba(0,255,255,0.1); padding: 10px; border-radius: 5px;">
                    <div><strong style="color: #ffaa00;">Credits:</strong> ${e.credits}</div>
                    <div><strong style="color: #aaaaaa;">Titanium:</strong> ${e.titanium}</div>
                    <div><strong style="color: #00ffff;">Plasma:</strong> ${e.plasma}</div>
                </div>
                
                <div style="display: flex; gap: 40px;">
                    <div style="flex: 1;">
                        <h3 style="color: #0ff;">UPGRADES</h3>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;">Max Hull (${e.maxHull})</div>
                            <button id="upg-hull" class="ui-btn">Upgrade Hull (Cost: 50 Titanium)</button>
                        </div>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;">Max Energy (${e.maxEnergy})</div>
                            <button id="upg-energy" class="ui-btn">Upgrade Energy (Cost: 50 Plasma)</button>
                        </div>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;">Speed Multiplier (${e.speedMultiplier.toFixed(1)}x)</div>
                            <button id="upg-speed" class="ui-btn">Upgrade Speed (Cost: 100 Credits)</button>
                        </div>
                    </div>
                    
                    <div style="flex: 1;">
                        <h3 style="color: #0ff;">SHIPS</h3>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;"><strong>Exploration</strong> (Balanced)</div>
                            <button id="ship-exploration" class="ui-btn" ${e.shipClass==="Exploration"?"disabled":""}>${e.shipClass==="Exploration"?"Current":"Select / Buy (Cost: 0)"}</button>
                        </div>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;"><strong>Scout</strong> (Fast, Less Hull)</div>
                            <button id="ship-scout" class="ui-btn" ${e.shipClass==="Scout"?"disabled":""}>${e.shipClass==="Scout"?"Current":"Select / Buy (Cost: 500 Credits)"}</button>
                        </div>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;"><strong>Cruiser</strong> (Slow, Heavy Hull)</div>
                            <button id="ship-cruiser" class="ui-btn" ${e.shipClass==="Cruiser"?"disabled":""}>${e.shipClass==="Cruiser"?"Current":"Select / Buy (Cost: 1000 Credits)"}</button>
                        </div>
                        <div style="margin-bottom: 15px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                            <div style="margin-bottom: 5px;"><strong>Interceptor</strong> (Stealth Strike, Very Fast)</div>
                            <button id="ship-interceptor" class="ui-btn" ${e.shipClass==="Interceptor"?"disabled":""}>${e.shipClass==="Interceptor"?"Current":"Select / Buy (Cost: 0)"}</button>
                        </div>
                    </div>
                </div>
                <button class="ui-btn" id="close-shipyard-btn" style="margin-top: 20px;">CLOSE SHIPYARD</button>
            </div>
        `;const t=document.getElementById("upg-hull");t&&(t.onclick=()=>{const h=this.gameState.getState();h.titanium>=50?(this.gameState.updateState({titanium:h.titanium-50,maxHull:h.maxHull+50}),this.logEvent("Hull upgraded!")):this.logEvent("Not enough Titanium.")});const n=document.getElementById("upg-energy");n&&(n.onclick=()=>{const h=this.gameState.getState();h.plasma>=50?(this.gameState.updateState({plasma:h.plasma-50,maxEnergy:h.maxEnergy+500}),this.logEvent("Energy upgraded!")):this.logEvent("Not enough Plasma.")});const s=document.getElementById("upg-speed");s&&(s.onclick=()=>{const h=this.gameState.getState();h.credits>=100?(this.gameState.updateState({credits:h.credits-100,speedMultiplier:h.speedMultiplier+.5}),this.logEvent("Speed upgraded!")):this.logEvent("Not enough Credits.")});const r=document.getElementById("ship-exploration");r&&(r.onclick=()=>{this.gameState.updateState({shipClass:"Exploration"}),this.logEvent("Switched to Exploration ship.")});const o=document.getElementById("ship-scout");o&&(o.onclick=()=>{const h=this.gameState.getState();h.credits>=500?(this.gameState.updateState({credits:h.credits-500,shipClass:"Scout",maxHull:50,speedMultiplier:1.5}),this.logEvent("Purchased Scout ship!")):this.logEvent("Not enough Credits for Scout.")});const a=document.getElementById("ship-cruiser");a&&(a.onclick=()=>{const h=this.gameState.getState();h.credits>=1e3?(this.gameState.updateState({credits:h.credits-1e3,shipClass:"Cruiser",maxHull:300,speedMultiplier:.7}),this.logEvent("Purchased Cruiser ship!")):this.logEvent("Not enough Credits for Cruiser.")});const l=document.getElementById("ship-interceptor");l&&(l.onclick=()=>{this.gameState.updateState({shipClass:"Interceptor",maxHull:90,speedMultiplier:2.2}),this.logEvent("Interceptor commissioned. Tactical systems online.")});const c=document.getElementById("close-shipyard-btn");c&&(c.onclick=()=>this.toggleShipyard())}showDialogPrompt(e){this.isDialogOpen||(this.dialogPrompt.style.display=e?"block":"none")}showDialog(e){this.isDialogOpen=!0,this.dialogPrompt.style.display="none",this.dialogText.innerText=e,this.dialogOverlay.style.display="block"}hideDialog(){this.isDialogOpen=!1,this.dialogOverlay.style.display="none"}showAwayTeamDialog(e="Uncharted Planet"){this.isAwayTeamOpen=!0,this.dialogPrompt.style.display="none",this.awayTeamOverlay.style.display="block";const t=["Ghosts of the Relay","Vault Beneath Ice","Echoes in the Ruins"],n=["Long-range scans detected an artificial signal beneath the surface.","A collapsed city-grid is emitting organized power spikes.","Life-signs appear and disappear in perfect intervals."],s=["ion storms","subspace tremors","hostile scavengers"],r=["proto-navigation core","mycelial crystal lattice","pre-warp tactical archive"];this.awayStory={planetName:e,missionTitle:t[Math.floor(Math.random()*t.length)],hook:n[Math.floor(Math.random()*n.length)],threat:s[Math.floor(Math.random()*s.length)],relic:r[Math.floor(Math.random()*r.length)],phase:0,intel:0,risk:0,bonusCredits:0,focus:"structure",finalReport:""},this.renderAwayTeamStory()}hideAwayTeamDialog(){this.isAwayTeamOpen=!1,this.awayTeamOverlay.style.display="none",this.awayStory=null}renderAwayStoryPanel(e,t,n){this.awayTeamOverlay.innerHTML=`
            <h3 style="color: #0ff; margin-top: 0;">${e}</h3>
            <p style="margin: 16px 0 20px; line-height: 1.4;">${t}</p>
            <div id="away-team-choice-wrap" style="display: flex; flex-direction: column; gap: 10px;"></div>
        `;const s=this.awayTeamOverlay.querySelector("#away-team-choice-wrap");n.forEach(r=>{const o=document.createElement("button");o.className="ui-btn",o.innerText=r.label,o.onclick=r.handler,s.appendChild(o)})}applyAwayStoryOutcome(e){if(!this.awayStory)return;const t=this.awayStory,n=this.gameState.getState();let s={};if(e==="diplomatic")if(t.intel>=2){const r=130+t.bonusCredits+Math.floor(Math.random()*70),o=12+Math.floor(Math.random()*12);s={credits:n.credits+r,dilithium:n.dilithium+o},t.finalReport=`Negotiations succeeded. The away team recovered the ${t.relic} and secured ${r} credits plus ${o} dilithium.`}else{const r=Math.min(2,n.crew),o=80+Math.floor(Math.random()*50);s={crew:Math.max(0,n.crew-r),credits:n.credits+o},t.finalReport=`Talks broke down under pressure. We withdrew with ${o} credits worth of data, but lost ${r} crew in the retreat.`}else if(e==="tactical")if(t.risk<=2){const r=18+Math.floor(Math.random()*10),o=16+Math.floor(Math.random()*10);s={titanium:n.titanium+r,plasma:n.plasma+o},t.finalReport=`Tactical sweep was clean. Recovered ${r} titanium and ${o} plasma caches from the site.`}else{const r=6+Math.floor(Math.random()*6),o=Math.min(1+Math.floor(Math.random()*2),n.crew),a=10+Math.floor(Math.random()*8);s={hull:Math.max(0,n.hull-r),crew:Math.max(0,n.crew-o),titanium:n.titanium+a},t.finalReport=`Hostiles engaged during extraction. We secured ${a} titanium, but lost ${o} crew and sustained ${r}% hull damage.`}else{const r=35+Math.floor(Math.random()*25),o=4+Math.floor(Math.random()*6);s={energy:Math.max(0,n.energy-r),dilithium:n.dilithium+o},t.finalReport=`Emergency evacuation complete. We avoided major casualties, but used ${r} energy and only recovered ${o} dilithium.`}this.gameState.updateState(s),this.logEvent(t.finalReport),t.phase=3,this.renderAwayTeamStory()}renderAwayTeamStory(){if(!this.awayStory)return;const e=this.awayStory;if(e.phase===0){this.renderAwayStoryPanel(`AWAY TEAM: ${e.missionTitle}`,`${e.planetName}: ${e.hook} Atmospheric conditions report ${e.threat}. Choose your insertion strategy.`,[{label:"Deploy Recon Drones",handler:()=>{e.intel+=2,e.risk=Math.max(0,e.risk-1),e.phase=1,this.renderAwayTeamStory()}},{label:"Hot Landing Near Signal",handler:()=>{e.risk+=2,e.phase=1,this.renderAwayTeamStory()}},{label:"Establish Perimeter",handler:()=>{e.intel+=1,e.risk+=1,e.phase=1,this.renderAwayTeamStory()}}]);return}if(e.phase===1){const t=e.intel>=2?"Drones mapped secure corridors and a central vault.":"Sensor interference is high. Team reports fragmented telemetry.";this.renderAwayStoryPanel(`Mission Update: ${e.planetName}`,`${t} The objective appears tied to a ${e.relic}. Choose mission focus.`,[{label:"Investigate Ancient Structure",handler:()=>{e.focus="structure",e.bonusCredits+=70,e.risk+=1,e.phase=2,this.renderAwayTeamStory()}},{label:"Track Bio-signatures",handler:()=>{e.focus="bios",e.bonusCredits+=35,e.risk+=2,e.phase=2,this.renderAwayTeamStory()}},{label:"Collect Energy Samples",handler:()=>{e.focus="samples",e.bonusCredits+=15,e.intel+=1,e.phase=2,this.renderAwayTeamStory()}}]);return}if(e.phase===2){const t=e.focus==="structure"?`The away team found an intact vault linked to the ${e.relic}.`:e.focus==="bios"?`Non-hostile lifeforms are guarding the route to the ${e.relic}.`:`Energy pockets around the ${e.relic} are becoming unstable.`;this.renderAwayStoryPanel(`Critical Choice: ${e.missionTitle}`,`${t} Command decision required.`,[{label:"Attempt Diplomatic Contact",handler:()=>this.applyAwayStoryOutcome("diplomatic")},{label:"Execute Tactical Recovery",handler:()=>this.applyAwayStoryOutcome("tactical")},{label:"Abort and Evacuate Team",handler:()=>this.applyAwayStoryOutcome("evac")}]);return}this.renderAwayStoryPanel(`Mission Complete: ${e.planetName}`,e.finalReport,[{label:"Return Team to Ship",handler:()=>this.hideAwayTeamDialog()}])}getIsDialogOpen(){return this.isDialogOpen||this.isShipyardOpen||this.isMapOpen||this.isAwayTeamOpen}getIsMapJumpInProgress(){return this.isMapJumpInProgress}getJumpPhase(){return this.jumpPhase}sleep(e){return new Promise(t=>setTimeout(t,e))}async playSporeJumpSequence(e){this.isMapJumpInProgress=!0,this.jumpOverlay.style.display="flex",this.jumpOverlay.classList.remove("black-alert-phase","spore-phase","displace-phase"),this.jumpOverlay.classList.add("black-alert-phase"),this.jumpPhase="black-alert",this.jumpStage.innerText="BLACK ALERT. Condition One. All stations report.",this.jumpTarget.innerText=`Destination: ${e}`,this.jumpProgressFill.style.width="0%",this.logEvent("BLACK ALERT: Spore drive jump protocol engaged."),await this.sleep(800),this.jumpProgressFill.style.width="22%",this.jumpStage.innerText="Spore drive chamber pressurizing...",await this.sleep(900),this.jumpProgressFill.style.width="48%",this.jumpStage.innerText="Mycelial navigation lattice synchronizing...",await this.sleep(850),this.jumpProgressFill.style.width="72%",this.jumpOverlay.classList.remove("black-alert-phase"),this.jumpOverlay.classList.add("spore-phase"),this.jumpPhase="spore",this.jumpStage.innerText="Spore hub tunnel formed. Stand by for displacement.",await this.sleep(700),this.jumpOverlay.classList.add("displace-phase"),this.jumpPhase="displace",this.jumpProgressFill.style.width="100%",this.jumpStage.innerText="DISPLACEMENT JUMP.",await this.sleep(950),this.jumpOverlay.style.display="none",this.jumpOverlay.classList.remove("black-alert-phase","spore-phase","displace-phase"),this.isMapJumpInProgress=!1,this.jumpPhase="idle",this.logEvent(`Jump complete. Arrived in ${e}.`)}renderMap(){this.mapOverlay.innerHTML="";const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width","100%"),e.setAttribute("height","100%"),e.style.position="absolute",e.style.top="0",e.style.left="0",this.sectorMap.systems.forEach(n=>{n.connections.forEach(s=>{const r=this.sectorMap.systems[s];if(n.id<r.id){const o=document.createElementNS("http://www.w3.org/2000/svg","line");o.setAttribute("x1",n.x.toString()),o.setAttribute("y1",n.y.toString()),o.setAttribute("x2",r.x.toString()),o.setAttribute("y2",r.y.toString());const a=n.id===this.sectorMap.currentSystemId||r.id===this.sectorMap.currentSystemId;o.setAttribute("stroke",a?"rgba(0, 255, 255, 0.5)":"rgba(100, 100, 100, 0.3)"),o.setAttribute("stroke-width",a?"2":"1"),e.appendChild(o)}})}),this.mapOverlay.appendChild(e),this.sectorMap.systems.forEach(n=>{const s=document.createElement("div");s.className="map-node",s.style.left=`${n.x}px`,s.style.top=`${n.y}px`,n.id===this.sectorMap.currentSystemId?s.classList.add("current"):this.sectorMap.systems[this.sectorMap.currentSystemId].connections.includes(n.id)&&(s.classList.add("connected"),s.onclick=async()=>{if(this.isMapJumpInProgress)return;(this.onMapWarpRequested?await this.onMapWarpRequested(n.id):this.sectorMap.warpTo(n.id))&&this.renderMap()});const r=document.createElement("div");r.className="map-label",r.innerText=n.name,s.appendChild(r),this.mapOverlay.appendChild(s)});const t=document.createElement("button");t.className="map-close-btn ui-btn",t.innerText="CLOSE MAP",t.onclick=()=>this.toggleMap(),this.mapOverlay.appendChild(t)}}class e_{constructor(e,t,n){oe(this,"mesh");oe(this,"velocity");oe(this,"speed",200);oe(this,"age",0);oe(this,"maxAge",3);const s=new It(.5,.5,4,8);s.rotateX(Math.PI/2);const r=new Dn({color:65280});this.mesh=new ve(s,r),this.mesh.position.copy(t);const o=t.clone().add(n);this.mesh.lookAt(o),this.velocity=n.normalize().multiplyScalar(this.speed),e.add(this.mesh)}update(e,t){t!==void 0&&(this.age+=t,this.mesh.position.addScaledVector(this.velocity,t))}destroy(e){e.remove(this.mesh),this.mesh.geometry.dispose(),Array.isArray(this.mesh.material)?this.mesh.material.forEach(t=>t.dispose()):this.mesh.material.dispose()}}console.log("Voyager Engine Started");const Cl=()=>{const i=new Y0("game-container"),e=new j0(i.scene);i.addUpdatable(e);const t=new Al(i.scene);i.addUpdatable(t);const n=new Z0;let s;const r=U=>{s?s.logEvent(U):console.log(U)},o=new J0(n,r);s=new Q0(n,o),s.logEvent("Captain's Log: Journey begins in the Delta Quadrant."),s.onMapWarpRequested=async U=>{const O=o.canWarpTo(U);if(!O.ok)return s.logEvent(O.reason??"Warp route unavailable."),!1;const k=o.systems[U];s.closeMap(),t.setForcedWarpMode(!0),t.pulseShield();try{await s.playSporeJumpSequence(k.name);const z=o.warpTo(U);return z&&e.jumpToSystem(U),z}finally{t.setForcedWarpMode(!1)}},i.controls.enabled=!0,i.camera.position.set(0,15,50);const a=75,l=120,c=new $0(i.scene);let h=new C,u="idle";const p={on:()=>{},emit:()=>{}},m=new Map;p.on("connect",()=>{console.log("Connected to multiplayer server")}),p.on("playerJoined",U=>{const O=new Al(i.scene);m.set(U,O),i.addUpdatable(O)}),p.on("playerLeft",U=>{const O=m.get(U);O&&(i.scene.remove(O.mesh),i.removeUpdatable(O),m.delete(U))}),p.on("playerMoved",U=>{const O=m.get(U.id);O&&(O.mesh.position.set(U.position.x,U.position.y,U.position.z),O.mesh.quaternion.set(U.quaternion.x,U.quaternion.y,U.quaternion.z,U.quaternion.w),U.isWarping!==void 0&&(O.isWarping=U.isWarping))});const g={update:(U,O)=>{if(O===void 0)return;const k=s.getJumpPhase(),z=k==="spore"?8:k==="displace"?20:0,q=(t.isWarping?l:a)+z;i.camera.fov=Jt.lerp(i.camera.fov,q,O*5),i.camera.updateProjectionMatrix(),e.setWarpStretch(t.isWarping),k==="displace"&&u!=="displace"&&t.triggerDisplacementPulse(.95),c.update(O,t.isWarping,t.mesh.position,t.mesh.quaternion,k),i.controls.target.copy(t.mesh.position),i.camera.position.sub(h);let re=0;k==="black-alert"&&(re=.12),k==="spore"&&(re=.22),k==="displace"&&(re=.52),re>0?h.set((Math.random()-.5)*re,(Math.random()-.5)*re,(Math.random()-.5)*re*.7):h.set(0,0,0),i.camera.position.add(h),u=k}};i.addUpdatable(g);let _=null,f=300;window.addEventListener("keydown",U=>{if(U.key.toLowerCase()==="f"&&_&&!s.getIsDialogOpen())s.showDialog("Greetings Captain. We have dilithium for trade if you have the credits. Be wary of the Borg.");else if(U.key.toLowerCase()==="l"&&_&&!s.getIsDialogOpen())if(t.mesh.position.distanceTo(_.position)<150){const k=e.planets.indexOf(_)+1;s.showAwayTeamDialog(`Planet ${k}`)}else s.logEvent("Too far away to send an Away Team. Get closer to the planet.")});const d={update:()=>{if(s.getIsDialogOpen())return;let U=!1,O=1/0,k=null;for(const z of e.planets){const q=t.mesh.position.distanceTo(z.position);q<f&&q<O&&(U=!0,O=q,k=z)}U?(s.showDialogPrompt(!0),_=k):(s.showDialogPrompt(!1),_=null)}};i.addUpdatable(d);const S=t.update.bind(t);t.update=(U,O)=>{(!s.getIsDialogOpen()||s.getIsMapJumpInProgress())&&(S(U,O),p.emit("updateTransform",{position:{x:t.mesh.position.x,y:t.mesh.position.y,z:t.mesh.position.z},quaternion:{x:t.mesh.quaternion.x,y:t.mesh.quaternion.y,z:t.mesh.quaternion.z,w:t.mesh.quaternion.w},isWarping:t.isWarping}))};let v=null,M=0;const L=[],A=new Wg,T=new ie(0,0);let N=0;const $=180,x=U=>U==="Interceptor"?[new C(-1.2,.25,8.6),new C(1.2,.25,8.6)]:U==="Scout"?[new C(-.8,.3,5),new C(.8,.3,5)]:U==="Cruiser"?[new C(-2.3,.55,8),new C(2.3,.55,8)]:[new C(-1.7,.45,9.2),new C(1.7,.45,9.2)],w=(U,O,k=.24)=>{const z=new Dn({color:16762250,transparent:!0,opacity:.95}),q=new Dn({color:16743225,transparent:!0,opacity:.45}),re=new ve(new It(.09,.09,1,8),z),Re=new ve(new It(.22,.22,1,8),q);re.geometry.rotateX(Math.PI/2),Re.geometry.rotateX(Math.PI/2);const B=new tn;B.add(Re),B.add(re),i.scene.add(B);let ee=0;const ae={update:(me,xe)=>{ee+=xe;const Ee=ee/k,Ne=Math.max(0,1-Ee);z.opacity=.95*Ne,q.opacity=.45*Ne;const we=t.visualGroup.localToWorld(U.clone()),P=new C().subVectors(O,we),he=P.length();he>.001&&(B.position.copy(we).addScaledVector(P,.5),B.scale.set(1,1,he),B.lookAt(O)),ee>=k&&(i.scene.remove(B),re.geometry.dispose(),Re.geometry.dispose(),z.dispose(),q.dispose(),i.removeUpdatable(ae))}};ae.update(0,0),i.addUpdatable(ae)},J=()=>{if(s.getIsDialogOpen())return;const U=Date.now();if(U-N<$)return;N=U;const O=n.getState();if(O.energy>=10){n.updateState({energy:O.energy-10}),t.pulseShield(),A.setFromCamera(T,i.camera);let k=null,z=A.ray.origin.clone().add(A.ray.direction.clone().multiplyScalar(1600)),q=[];if(v&&(q=A.intersectObject(v.mesh,!0)),q.length>0)z=q[0].point,k=q[0].object;else{const ae=A.intersectObjects(i.scene.children,!0).filter(me=>{let xe=me.object;for(;xe;){if(xe===t.mesh)return!1;xe=xe.parent}return!0});ae.length>0&&(z=ae[0].point,k=ae[0].object)}const re=n.getState().shipClass;x(re).forEach(ee=>{w(ee,z,.24)});let B=0;if(k&&v){let ee=!1,ae=k;for(;ae;){if(ae===v.mesh){ee=!0;break}ae=ae.parent}if(ee){const me=n.getState();B=14+Math.floor(Math.random()*7),n.updateState({enemyHull:Math.max(0,me.enemyHull-B)}),D()}}B>0?s.logEvent(`Phaser array scored a hit (-${B} enemy hull).`):s.logEvent("Phaser pulse fired.")}else s.logEvent("Not enough energy to fire phasers!")},Q=()=>{if(s.getIsDialogOpen())return;const U=n.getState();if(U.torpedoes>=1){n.updateState({torpedoes:U.torpedoes-1}),t.pulseShield();const O=new C(0,0,-1).applyQuaternion(t.mesh.quaternion).normalize(),k=t.mesh.position.clone().add(O.clone().multiplyScalar(20)),z=new e_(i.scene,k,O);z.mesh.scale.set(3,3,3);const q=new Ze({color:16755200,emissive:16755200,emissiveIntensity:2});z.mesh.material=q,z.target=v?v.mesh:null;const re=z.update.bind(z);z.update=(Re,B)=>{if(z.target){const ee=z.target.position,ae=new C().subVectors(ee,z.mesh.position).normalize(),me=z.velocity.clone().normalize();me.lerp(ae,B*2).normalize(),z.velocity.copy(me).multiplyScalar(z.speed),z.mesh.lookAt(z.mesh.position.clone().add(me))}re(Re,B)},L.push(z),s.logEvent("Fired Torpedo!")}else s.logEvent("No torpedoes left.")};window.addEventListener("keydown",U=>{if(U.code==="Space")J();else if(U.key.toLowerCase()==="t")Q();else if(U.key.toLowerCase()==="x"){const O=n.getState();n.updateState({shieldsActive:!O.shieldsActive}),s.logEvent(`Shields turned ${O.shieldsActive?"OFF":"ON"}.`)}}),window.addEventListener("mousedown",U=>{U.target.tagName==="CANVAS"&&(U.button===0&&J(),U.button===2&&Q())}),window.addEventListener("contextmenu",U=>U.preventDefault()),s.onFirePhasers=()=>J(),s.onFireTorpedoes=()=>Q(),s.onFlee=()=>{const U=n.getState();U.inCombat&&U.dilithium>=20?(n.updateState({dilithium:U.dilithium-20,inCombat:!1}),s.logEvent("Emergency warp engaged! Fled the battle.")):s.logEvent("Not enough dilithium to flee.")};const D=()=>{const U=n.getState();U.enemyHull<=0&&U.inCombat&&(s.logEvent("Enemy vessel destroyed! Salvaged 20 dilithium and 2 torpedoes."),n.updateState({inCombat:!1,dilithium:U.dilithium+20,torpedoes:U.torpedoes+2}))};let Y="Exploration";n.subscribe(U=>{if(U.shipClass!==Y&&(Y=U.shipClass,t.setShipClass(Y)),t.speedMultiplier=U.speedMultiplier,t.setShieldActive(U.energy>0&&U.shieldsActive),U.inCombat&&!v){v=new K0(i.scene);const O=new C(0,0,-1).applyQuaternion(t.mesh.quaternion);v.mesh.position.copy(t.mesh.position).add(O.multiplyScalar(200)),i.addUpdatable(v),M=Date.now()}else!U.inCombat&&v&&(v.destroy(i.scene),i.removeUpdatable(v),v=null)});const H={update:(U,O)=>{if(O===void 0)return;const k=n.getState();for(let z=e.collectibles.length-1;z>=0;z--){const q=e.collectibles[z];if(t.mesh.position.distanceTo(q.mesh.position)<15){i.scene.remove(q.mesh),e.collectibles.splice(z,1);const re=n.getState();q.type==="Titanium"&&n.updateState({titanium:re.titanium+q.value}),q.type==="Plasma"&&n.updateState({plasma:re.plasma+q.value}),q.type==="Credits"&&n.updateState({credits:re.credits+q.value}),s.logEvent(`+${q.value} ${q.type}`)}}for(let z=L.length-1;z>=0;z--){const q=L[z];q.update(U,O);let re=!1;k.inCombat&&v&&q.mesh.position.distanceTo(v.mesh.position)<20&&(n.updateState({enemyHull:Math.max(0,k.enemyHull-40)}),re=!0,s.logEvent("Torpedo hit enemy for 40 damage!"),D()),(re||q.age>q.maxAge)&&(q.destroy(i.scene),L.splice(z,1))}if(k.inCombat&&v){const z=Date.now();if(z-M>3e3&&(M=z,t.mesh.position.distanceTo(v.mesh.position)<400)){const q=Math.floor(Math.random()*10)+5;k.shieldsActive&&k.energy>0?(Math.random()>.5?(n.updateState({hull:Math.max(0,k.hull-q/2)}),s.logEvent(`Enemy hit us! Hull took ${q/2} damage.`)):(n.updateState({energy:Math.max(0,k.energy-q*2)}),s.logEvent(`Enemy hit us! Shields lost ${q*2} energy.`)),t.pulseShield()):(n.updateState({hull:Math.max(0,k.hull-q)}),s.logEvent(`Enemy hit us directly! Hull took ${q} damage.`))}}}};i.addUpdatable(H),i.start()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Cl):Cl();
