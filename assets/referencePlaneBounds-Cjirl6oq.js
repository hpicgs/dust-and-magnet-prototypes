import{t as e}from"./numberParsing-CrA8g1wW.js";function t(e){return e&&typeof e[Symbol.iterator]==`function`}function n(e){return e&&typeof e[Symbol.asyncIterator]==`function`}function r(e){if(typeof e==`string`)return[e];if(t(e)||n(e))return e;if(e==null)return[];throw TypeError(`CSV chunk source must be a string, iterable, or async iterable.`)}function i(e){return!e||e.every(e=>String(e||``).trim().length===0)}function a({skipEmptyRows:e=!0,delimiter:t=`,`}={}){if(![`,`,`;`,`	`].includes(t))throw Error(`CSV delimiter must be a comma, semicolon, or tab.`);let n=[],r=``,a=!1,o=!1,s=!1,c=()=>{n.push(r.trim()),r=``},l=t=>{c(),(!e||!i(n))&&t.push(n),n=[]},u=(e,n)=>{if(o){if(e===`"`){r+=`"`,o=!1;return}a=!1,o=!1,u(e,n);return}if(!(s&&(s=!1,e===`
`))){if(e===`"`){a?o=!0:a=!0;return}if(e===t&&!a){c();return}if((e===`
`||e===`\r`)&&!a){l(n),s=e===`\r`;return}r+=e}};return{push(e){let t=[],n=String(e??``);for(let e=0;e<n.length;e+=1)u(n[e],t);return t},finish(){let e=[];if(o&&=(a=!1,!1),a)throw Error(`CSV parse error: unterminated quoted field.`);return(r.length>0||n.length>0)&&l(e),e}}}function o(e,t={}){let n=a(t);return[...n.push(e),...n.finish()]}async function*s(e,t={}){let n=a(t);for await(let t of r(e))for(let e of n.push(t))yield e;for(let e of n.finish())yield e}function c(e){let t=[],n=``,r=!1;for(let i=0;i<e.length;i+=1){let a=e[i];if(a===`"`){let t=e[i+1];r&&t===`"`?(n+=`"`,i+=1):r=!r;continue}if(a===`,`&&!r){t.push(n.trim()),n=``;continue}n+=a}return t.push(n.trim()),t}function l(e,t={}){return o(String(e||``),t)}function u(e){let t=e==null?``:String(e);return/[",\n\r]/.test(t)?`"${t.replace(/"/g,`""`)}"`:t}function d(e){return e.map(u).join(`,`)}var f=1e-6;function p(e){return l(e)}function m(e){let t=String(e??``).trim();if(!t)return NaN;let n=t.replace(/\s+/g,``);if(/^[+-]?\d+(?:[.,]\d+)?$/.test(n))return Number(n.replace(`,`,`.`));let r=n.lastIndexOf(`.`),i=n.lastIndexOf(`,`),a=Math.max(r,i);if(a>=0){let e=n.slice(0,a).replace(/[.,](?=\d{3}(?:[.,]|$))/g,``).replace(/[.,]/g,``),t=n.slice(a+1).replace(/[.,]/g,``);return Number(`${e}.${t}`)}return Number(n.replace(/[.,](?=\d{3}(?:[.,]|$))/g,``).replace(/[.,]/g,``))}function h(e,t){if(!Array.isArray(e)||e.length===0)return NaN;if(e.length===1)return e[0];let n=Math.min(1,Math.max(0,t))*(e.length-1),r=Math.floor(n),i=Math.ceil(n);if(r===i)return e[r];let a=n-r;return e[r]*(1-a)+e[i]*a}function g(e){let t=String(e??``).trim();return t?Number.isFinite(m(t)):!1}function _(e){if(!Array.isArray(e)||e.length===0)return!1;let t=e.filter(e=>String(e||``).trim().length>0);if(t.length===0)return!1;let n=t.filter(e=>!g(e));return t.some(e=>/[A-Za-z_\u00C0-\u024F]/.test(String(e)))&&n.length>=Math.max(1,Math.ceil(t.length*.5))}function v(e,t){let n=String(e||``).trim();return n.length>0?n:`Column ${t+1}`}function y(e,t,n){let r=String(e||``).trim().toLowerCase();if(r===`id`||r===`identifier`)return`id`;if(r===`x`||r===`x_1`||r===`x1`)return`x`;if(r===`y`||r===`y_1`||r===`y1`)return`y`;if(r===`name`||r===`label`||r===`description`)return`description`;let i=(t||[]).filter(e=>String(e??``).trim().length>0);return i.length>0&&i.every(e=>g(e))?`feature`:n===0?`id`:`other`}function b(e,t){return{...x(p(e),t),csvText:e}}function x(e,t,{hasHeaderRow:n=_(e[0])}={}){if(e.length===0)throw Error(`CSV is empty.`);let r=e.reduce((e,t)=>Math.max(e,t.length),0);if(r===0)throw Error(`CSV contains no columns.`);let i=n?e[0]:null,a=n?e.slice(1):e.slice();if(a.length===0)throw Error(`CSV contains no data rows.`);return{fileName:t,rows:e,width:r,hasHeaderRow:n,headerRow:i,dataRows:a,sampleRows:a.slice(0,5),columns:Array.from({length:r},(e,t)=>{let n=v(i?.[t]||``,t);return{index:t,name:n,role:y(n,a.slice(0,20).map(e=>e[t]||``),t),keep:!0}})}}function S(e){let t=Array.isArray(e?.columns)?e.columns.filter(e=>e.keep!==!1):[],n=Array.isArray(e?.dataRows)?e.dataRows:[];if(t.length===0)throw Error(`At least one column must be kept.`);let r=t.filter(e=>e.role===`feature`);if(r.length===0)throw Error(`At least one column must be marked as feature.`);let i=t.filter(e=>e.role===`id`);if(i.length>1)throw Error(`Only one column can be marked as ID.`);let a=t.filter(e=>e.role===`x`),o=t.filter(e=>e.role===`y`);if(a.length>1||o.length>1)throw Error(`Only one column can be marked as X and only one as Y.`);let s=r.map((e,t)=>({sourceIndex:e.index,displayName:v(e.name,e.index),featureIndex:t,featureName:`f_${t+1}`,rawName:`f_${t+1}_raw`})),c=s.map(()=>Array(n.length));for(let e=0;e<n.length;e+=1){let t=n[e];for(let n=0;n<s.length;n+=1){let r=s[n],i=String(t[r.sourceIndex]||``).trim();if(!i)throw Error(`Missing feature value at data row ${e+1}, column "${r.displayName}".`);let a=m(i);if(!Number.isFinite(a))throw Error(`Invalid numeric feature value at data row ${e+1}, column "${r.displayName}".`);c[n][e]=a}}let l=s.map((e,t)=>{let n=[...c[t]].sort((e,t)=>e-t);return{min:h(n,.02),max:h(n,.98)}}),u=[],d=[],p=s.map(e=>e.featureName),g=s.map(e=>e.displayName);d.push({kind:`id`,row1:v(i[0]?.name||`ID`,i[0]?.index??0),row2:`description`});let _={description:0,other:0},y=new Map(s.map(e=>[e.sourceIndex,e]));t.forEach(e=>{if(e.role===`id`)return;if(e.role===`feature`){let t=y.get(e.index),n=u.length;u.push({index:e.index,extraIndex:n,row1:`${t.displayName} Raw`,row2:t.rawName}),d.push({kind:`extra`,extraIndex:n,row1:`${t.displayName} Raw`,row2:t.rawName}),d.push({kind:`feature`,featureIndex:t.featureIndex,row1:t.displayName,row2:t.featureName,name:t.featureName,displayName:t.displayName});return}let t=v(e.name,e.index),n=``;e.role===`x`?n=`x_1`:e.role===`y`?n=`y_1`:e.role===`description`?(_.description+=1,n=`description`):(_.other+=1,n=`other_${_.other}`);let r=u.length;u.push({index:e.index,extraIndex:r,row1:t,row2:n}),d.push({kind:`extra`,extraIndex:r,row1:t,row2:n})});let b=i[0]?.index??-1,x=n.map((e,t)=>{let n=s.map((e,n)=>{let r=c[n][t],{min:i,max:a}=l[n];return!Number.isFinite(i)||!Number.isFinite(a)||Math.abs(a-i)<=f?0:Math.min(1,Math.max(0,(r-i)/(a-i)))});return{id:b>=0&&String(e[b]||``).trim()||String(t+1),name:``,features:n,extraValues:u.map(t=>String(e[t.index]||``).trim()),x:0,y:0,vx:0,vy:0}});return{featureNames:p,featureDisplayNames:g,extraColumns:u,columnLayout:d,columnsWithXY:[...p,`x`,`y`],points:x,snapshots:[]}}var ee=/^#[0-9a-f]{6}$/i;function C(e,t=`#000000`){let n=String(e||``).trim().toLowerCase();return ee.test(n)?n:t}function w(e,t=[1,1,1]){let n=C(e,``);return n?[Number.parseInt(n.slice(1,3),16)/255,Number.parseInt(n.slice(3,5),16)/255,Number.parseInt(n.slice(5,7),16)/255]:t.slice(0,3)}function te(e,t,n){let r=Math.max(0,Math.min(1,Number.isFinite(n)?n:0));return[e[0]*(1-r)+t[0]*r,e[1]*(1-r)+t[1]*r,e[2]*(1-r)+t[2]*r]}function T(e,t=.2){let n=1-Math.max(0,Math.min(1,Number.isFinite(t)?t:0));return[Math.max(0,Math.min(1,Number(e?.[0])||0))*n,Math.max(0,Math.min(1,Number(e?.[1])||0))*n,Math.max(0,Math.min(1,Number(e?.[2])||0))*n]}function ne(e){let t=String(e||``).trim(),n=/^\/((?:\\.|[^/])*)\/([a-z]*)$/.exec(t);return n?{pattern:n[1],flags:n[2]||``}:null}function E(t){let n=String(t?.matchType||t?.type||`exact`).trim().toLowerCase()===`regex`?`regex`:`exact`;return{matchType:n,expression:String(t?.expression??t?.pattern??t?.value??``).trim(),flags:n===`regex`?String(t?.flags||``).trim():``,weight:e(Number(t?.weight))}}function D(e){let t=String(e?.matchType||e?.type||`exact`).trim().toLowerCase()===`regex`?`regex`:`exact`;return{matchType:t,expression:String(e?.expression??e?.pattern??e?.value??``).trim(),flags:t===`regex`?String(e?.flags||``).trim():``,colorHex:C(e?.colorHex??e?.color??`#ffffff`)}}function O(e){let t=String(e||``).trim(),n=ne(t);return n?{matchType:`regex`,expression:n.pattern,flags:n.flags}:{matchType:`exact`,expression:t,flags:``}}function k(t){let n=String(t||``),r=[],i=0,a=n.split(/\r?\n/);for(let t of a){let n=t.trim();if(!n)continue;let a=n.lastIndexOf(`:`);if(a<0)continue;let o=n.slice(0,a).trim(),s=n.slice(a+1).trim();if(!o)continue;let c=e(Number.parseFloat(s));if(o.toLowerCase()===`otherwise`){i=c;continue}let l=O(o);if(!l.expression)continue;let u=E({...l,weight:c}),d=r.findIndex(e=>e.matchType===u.matchType&&e.expression===u.expression&&e.flags===u.flags);d>=0?r[d]=u:r.push(u)}return{entries:r,otherwiseWeight:i}}function re(e){let t=E(e);return`${t.matchType===`regex`?`/${t.expression}/${t.flags}`:t.expression}:${t.weight}`}function ie(e){let t=oe(e),n=t.entries.map(e=>re(e));return n.push(`otherwise:${t.otherwiseWeight}`),n.join(`
`)}function A(e){let t=oe(e);return JSON.stringify(t)}function j(e){let t=N(e);return JSON.stringify(t)}function M(e){let t=String(e||``).trim();if(!t)return oe({entries:[],otherwiseWeight:0});try{return oe(JSON.parse(t))}catch{return k(t.replace(/\|/g,`
`))}}function ae(e){let t=String(e||``).trim();if(!t)return N({entries:[],otherwiseColorHex:`#ffffff`});try{return N(JSON.parse(t))}catch{return N({entries:[],otherwiseColorHex:`#ffffff`})}}function oe(t){return typeof t==`string`?M(t):{entries:(Array.isArray(t?.entries)?t.entries:[]).map(e=>E(e)).filter(e=>e.expression.length>0),otherwiseWeight:e(Number(t?.otherwiseWeight))}}function N(e){return typeof e==`string`?ae(e):{entries:(Array.isArray(e?.entries)?e.entries:[]).map(e=>D(e)).filter(e=>e.expression.length>0),otherwiseColorHex:C(e?.otherwiseColorHex??e?.otherwiseColor??`#ffffff`)}}function se(e,t){let n=Array.isArray(e?.extraColumns)?e.extraColumns:[],r=String(t?.categoryDescriptorTag||``).trim().toLowerCase(),i=String(t?.categoryDescriptorName||``).trim().toLowerCase();if(!r&&!i)return-1;for(let e of n){if(!e||!Number.isInteger(e.extraIndex))continue;let t=String(e.row2||``).trim().toLowerCase(),n=String(e.row1||``).trim().toLowerCase();if(r&&t===r||i&&n===i)return e.extraIndex}return-1}function ce(e,t){return!e||!Array.isArray(e.extraValues)||!Number.isInteger(t)||t<0?``:String(e.extraValues[t]??``).trim()}function le(e,t){let n=E(e);if(n.matchType===`regex`)try{return new RegExp(n.expression,n.flags).test(t)}catch{return!1}return n.expression===t}function ue(e,t,n){let r=Number.isInteger(t?.categoryExtraIndex)?t.categoryExtraIndex:se(n,t);if(r<0)return 0;let i=ce(e,r),a=oe(t?.categoryMappings),o=a.entries.find(e=>le(e,i));return o?o.weight:a.otherwiseWeight}function de(e,t,n){let r=Number.isInteger(t?.categoryExtraIndex)?t.categoryExtraIndex:se(n,t),i=N(t?.categoryMappings);if(r<0)return i.otherwiseColorHex;let a=ce(e,r),o=i.entries.find(e=>le(e,a));return o?o.colorHex:i.otherwiseColorHex}function fe(e){return Number.isFinite(e)?e:1}function pe(e){return Number.isFinite(e?.strength)?fe(e.strength):fe(e?.alpha)}var me=Object.freeze([`none`,`inverse`,`smooth`,`threshold`,`gamma`,`clamp`,`pulse`,`constant`,`gaussianPeak`,`stair`,`noise`]),he=new Set(me);function P(){return{type:`none`,tau:.5,delta:.05,gamma:2.2,clampA:.25,clampB:.75,pulseA:.25,pulseB:.75,constantA:.25,constantB:.75,constantValue:.5,gaussianPeakA:.5,gaussianPeakR:.15,gaussianPeakEpsilon:.01,stairK:4,noiseA:-.1,noiseB:.1}}function F(e){let t=String(e||``).trim();return t.toLowerCase()===`gaussianpeak`?`gaussianPeak`:t.toLowerCase()}function ge(e){return he.has(F(e))}function I(e,t=`none`){let n=F(e);return he.has(n)?n:F(t)}var _e=new Set([`single`,`inversemagnet`,`min`,`max`,`mix`,`profile`,`variance`,`length`,`filter`,`sink`,`xypointdistance`,`similarity`,`category`]);function ve(e){return ge(e)}function L(e){let t=P(),n={type:I(e?.type,t.type),tau:Number.isFinite(e?.tau)?e.tau:t.tau,delta:Number.isFinite(e?.delta)?e.delta:t.delta,gamma:Number.isFinite(e?.gamma)?e.gamma:t.gamma,clampA:Number.isFinite(e?.clampA)?e.clampA:t.clampA,clampB:Number.isFinite(e?.clampB)?e.clampB:t.clampB,pulseA:Number.isFinite(e?.pulseA)?e.pulseA:t.pulseA,pulseB:Number.isFinite(e?.pulseB)?e.pulseB:t.pulseB,constantA:Number.isFinite(e?.constantA)?e.constantA:t.constantA,constantB:Number.isFinite(e?.constantB)?e.constantB:t.constantB,constantValue:Number.isFinite(e?.constantValue)?e.constantValue:t.constantValue,gaussianPeakA:Number.isFinite(e?.gaussianPeakA)?e.gaussianPeakA:t.gaussianPeakA,gaussianPeakR:Number.isFinite(e?.gaussianPeakR)?e.gaussianPeakR:t.gaussianPeakR,gaussianPeakEpsilon:Number.isFinite(e?.gaussianPeakEpsilon)?e.gaussianPeakEpsilon:t.gaussianPeakEpsilon,stairK:Number.isFinite(e?.stairK)?e.stairK:t.stairK,noiseA:Number.isFinite(e?.noiseA)?e.noiseA:t.noiseA,noiseB:Number.isFinite(e?.noiseB)?e.noiseB:t.noiseB};return n.tau=Math.max(0,Math.min(1,n.tau)),n.delta=Math.max(1e-6,n.delta),n.gamma=Math.min(4,Math.max(1e-6,n.gamma)),n.clampA=Math.max(0,Math.min(1,n.clampA)),n.clampB=Math.max(0,Math.min(1,n.clampB)),n.pulseA=Math.max(0,Math.min(1,n.pulseA)),n.pulseB=Math.max(0,Math.min(1,n.pulseB)),n.constantA=Math.max(0,Math.min(1,n.constantA)),n.constantB=Math.max(0,Math.min(1,n.constantB)),n.constantValue=Math.max(0,Math.min(1,n.constantValue)),n.gaussianPeakA=Math.max(0,Math.min(1,n.gaussianPeakA)),n.gaussianPeakR=Math.max(0,n.gaussianPeakR),n.gaussianPeakEpsilon=Math.max(1e-6,Math.min(.999999,n.gaussianPeakEpsilon)),n.stairK=Math.max(2,Math.round(n.stairK)),n.noiseA=Math.max(-1,Math.min(1,n.noiseA)),n.noiseB=Math.max(-1,Math.min(1,n.noiseB)),n.type===`threshold`?(Math.min(n.tau,1-n.tau)<=0&&(n.tau=.5),n.delta=Math.max(1e-6,Math.min(Math.min(n.tau,1-n.tau),n.delta))):n.type===`clamp`&&n.clampA>n.clampB?(n.clampA=t.clampA,n.clampB=t.clampB):n.type===`pulse`&&n.pulseA>n.pulseB?(n.pulseA=t.pulseA,n.pulseB=t.pulseB):n.type===`constant`&&n.constantA>n.constantB?(n.constantA=t.constantA,n.constantB=t.constantB):n.type===`noise`&&n.noiseA>n.noiseB&&(n.noiseA=t.noiseA,n.noiseB=t.noiseB),n}function ye(e){if(!_e.has(e))throw Error(`Magnet type must be single, inversemagnet, min, max, mix, profile, variance, length, filter, xypointdistance, similarity, or category.`)}function be(e){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Mix lambda must be in range [0,1].`)}function xe(e=0){return{sourceType:e===0?`feature`:`none`,featureDimension:+(e===0),sourceMagnetId:0,inverted:!1,transfer:P(),blend:+(e===0)}}function Se(e,t={}){let n=Array.isArray(e)?e:[],r=Number.isInteger(t.featureDimensionA)?t.featureDimensionA:0,i=Number.isInteger(t.featureDimensionB)?t.featureDimensionB:0,a=Number.isFinite(t.mixLambda)?Math.max(0,Math.min(1,t.mixLambda)):.5,o=1-a,s=a,c=(n.length>0?n:[{sourceType:r>0&&o>0?`feature`:`none`,featureDimension:r,sourceMagnetId:0,inverted:!1,blend:r>0?o:0},{sourceType:i>0&&s>0?`feature`:`none`,featureDimension:i,sourceMagnetId:0,inverted:!1,blend:i>0?s:0}]).slice(0,6).map((e,t)=>{let n=String(e?.sourceType||e?.mode||``).trim().toLowerCase(),r=n===`magnet`?`magnet`:n===`none`?`none`:`feature`,i=Number.parseInt(String(e?.featureDimension??e?.featureDimensionA??e?.feature??0),10),a=Number.parseInt(String(e?.sourceMagnetId??e?.magnetId??0),10),o=Number(e?.blend??e?.blendFactor??e?.factor??0),s=r===`none`?0:Number.isFinite(o)&&o>=0?o:0;return{sourceType:r,featureDimension:Number.isInteger(i)&&i>0?i:0,sourceMagnetId:Number.isInteger(a)&&a>0?a:0,inverted:!!(e?.inverted??e?.invert),transfer:L(e?.transfer||e?.transfer1||P()),blend:s,slot:t}});for(;c.length<6;)c.push(xe(c.length));return c}function R(e){let t=Se(e).filter(e=>e.blend>0);if(t.length<1)throw Error(`Mix magnet requires at least one input source with blend factor > 0.`);for(let e of t){if(e.sourceType===`feature`&&e.featureDimension<=0)throw Error(`Mix magnet feature sources require a feature dimension.`);if(e.sourceType===`magnet`&&e.sourceMagnetId<=0)throw Error(`Mix magnet magnet sources require a source magnet.`)}}function Ce(e=0){return{sourceType:`none`,featureDimension:0,sourceMagnetId:0,inverted:!1,transfer:P()}}function we(e,t={}){let n=Array.isArray(e)?e:[],r=Number.isInteger(t.featureDimensionA)?t.featureDimensionA:0,i=Number.isInteger(t.featureDimensionB)?t.featureDimensionB:0,a=(n.length>0?n:[{sourceType:`feature`,featureDimension:r,sourceMagnetId:0,inverted:!1},{sourceType:`feature`,featureDimension:i,sourceMagnetId:0,inverted:!1}]).slice(0,6).map((e,t)=>{let n=String(e?.sourceType||e?.mode||``).trim().toLowerCase(),r=n===`magnet`?`magnet`:n===`none`?`none`:`feature`,i=Number.parseInt(String(e?.featureDimension??e?.featureDimensionA??e?.feature??0),10),a=Number.parseInt(String(e?.sourceMagnetId??e?.magnetId??0),10);return{sourceType:r,featureDimension:Number.isInteger(i)&&i>0?i:0,sourceMagnetId:Number.isInteger(a)&&a>0?a:0,inverted:!!(e?.inverted??e?.invert),transfer:L(e?.transfer||e?.transfer1||P()),slot:t}});for(;a.length<6;)a.push(Ce(a.length));return a}function Te(e){if(we(e).filter(e=>e.sourceType===`none`?!1:e.sourceType===`feature`?e.featureDimension>0:e.sourceMagnetId>0).length<1)throw Error(`Max magnet requires at least one input source.`)}function z(e=0){return{sourceType:`none`,featureDimension:0,sourceMagnetId:0,inverted:!1,transfer:P()}}function Ee(e,t={}){let n=Array.isArray(e)?e:[],r=Number.isInteger(t.featureDimensionA)?t.featureDimensionA:0,i=Number.isInteger(t.featureDimensionB)?t.featureDimensionB:0,a=(n.length>0?n:[{sourceType:`feature`,featureDimension:r,sourceMagnetId:0,inverted:!1},{sourceType:`feature`,featureDimension:i,sourceMagnetId:0,inverted:!1}]).slice(0,6).map((e,t)=>{let n=String(e?.sourceType||e?.mode||``).trim().toLowerCase(),r=n===`magnet`?`magnet`:n===`none`?`none`:`feature`,i=Number.parseInt(String(e?.featureDimension??e?.featureDimensionA??e?.feature??0),10),a=Number.parseInt(String(e?.sourceMagnetId??e?.magnetId??0),10);return{sourceType:r,featureDimension:Number.isInteger(i)&&i>0?i:0,sourceMagnetId:Number.isInteger(a)&&a>0?a:0,inverted:!!(e?.inverted??e?.invert),transfer:L(e?.transfer||e?.transfer1||P()),slot:t}});for(;a.length<6;)a.push(z(a.length));return a}function De(e){if(Ee(e).filter(e=>e.sourceType===`none`?!1:e.sourceType===`feature`?e.featureDimension>0:e.sourceMagnetId>0).length<1)throw Error(`Min magnet requires at least one input source.`)}function Oe(e=0){return{enabled:e===0,sourceIndex:+(e===0),target:.5,radius:.1,epsilon:1e-4,weight:+(e===0),slot:e}}function ke(e,t={}){let n=Array.isArray(e)?e:[],r=Number.isInteger(t.featureDimensionA)?t.featureDimensionA:0,i=(n.length>0?n:[{enabled:r>0,sourceIndex:r,target:.5,radius:.1,epsilon:1e-4,weight:+(r>0)}]).slice(0,8).map((e,t)=>{let n=Number.parseInt(String(e?.sourceIndex??e?.featureDimension??e?.feature??0),10),r=Number(e?.target),i=Number(e?.radius),a=Number(e?.epsilon),o=Number(e?.weight);return{enabled:e?.enabled!==!1,sourceIndex:Number.isInteger(n)&&n>0?n:0,target:Number.isFinite(r)?Math.max(0,Math.min(1,r)):.5,radius:Number.isFinite(i)?Math.max(1e-6,i):.1,epsilon:Number.isFinite(a)?Math.max(1e-8,Math.min(.999999,a)):1e-4,weight:Number.isFinite(o)?Math.max(0,o):1,slot:t}});for(;i.length<8;)i.push(Oe(i.length));return i}function Ae(e){return ke(e).filter(e=>e.enabled!==!1&&e.sourceIndex>0&&e.weight>0)}function je(e){if(Ae(e).length<1)throw Error(`Profile magnet requires at least one enabled criterion with feature dimension and weight > 0.`)}function Me(e){if(!ve(e))throw Error(`Transfer function must be one of: none, inverse, smooth, threshold, gamma, clamp, pulse, constant, gaussianPeak, stair, noise.`)}function Ne(e,t){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Threshold tau must be in range [0,1].`);if(!Number.isFinite(t)||t<=0)throw Error(`Threshold delta must be > 0.`);if(e-t<0||e+t>1)throw Error(`Threshold constraints must hold: tau - delta >= 0 and tau + delta <= 1.`)}function Pe(e){if(!Number.isFinite(e)||e<=0||e>4)throw Error(`Gamma must be in range (0,4].`)}function Fe(e,t){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Clamp a must be in range [0,1].`);if(!Number.isFinite(t)||t<0||t>1)throw Error(`Clamp b must be in range [0,1].`);if(e>t)throw Error(`Clamp requires a <= b.`)}function Ie(e,t){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Pulse a must be in range [0,1].`);if(!Number.isFinite(t)||t<0||t>1)throw Error(`Pulse b must be in range [0,1].`);if(e>t)throw Error(`Pulse requires a <= b.`)}function Le(e,t,n){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Constant a must be in range [0,1].`);if(!Number.isFinite(t)||t<0||t>1)throw Error(`Constant b must be in range [0,1].`);if(e>t)throw Error(`Constant requires a <= b.`);if(!Number.isFinite(n)||n<0||n>1)throw Error(`Constant value must be in range [0,1].`)}function Re(e,t,n){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Gaussian peak center must be in range [0,1].`);if(!Number.isFinite(t)||t<0)throw Error(`Gaussian peak radius must be >= 0.`);if(!Number.isFinite(n)||n<=0||n>=1)throw Error(`Gaussian peak epsilon must be in range (0,1).`)}function ze(e){if(!Number.isInteger(e)||e<=1)throw Error(`Stair k must be an integer > 1.`)}function Be(e,t){if(!Number.isFinite(e)||e<-1||e>1)throw Error(`Noise a must be in range [-1,1].`);if(!Number.isFinite(t)||t<-1||t>1)throw Error(`Noise b must be in range [-1,1].`);if(e>t)throw Error(`Noise requires a <= b.`)}function Ve(e){let t=L(e);Me(t.type),t.type===`threshold`?Ne(t.tau,t.delta):t.type===`gamma`?Pe(t.gamma):t.type===`clamp`?Fe(t.clampA,t.clampB):t.type===`pulse`?Ie(t.pulseA,t.pulseB):t.type===`constant`?Le(t.constantA,t.constantB,t.constantValue):t.type===`gaussianPeak`?Re(t.gaussianPeakA,t.gaussianPeakR,t.gaussianPeakEpsilon):t.type===`stair`?ze(t.stairK):t.type===`noise`&&Be(t.noiseA,t.noiseB)}function He(e,t){if(!Number.isFinite(e)||e<0||e>1)throw Error(`Sink delta must be in range [0,1].`);if(!Number.isFinite(t)||t<0||t>1)throw Error(`Sink capture radius must be in range [0,1].`)}function Ue(e,t){if(!Number.isInteger(e))throw Error(`Feature dimension must be an integer.`);if(e<0)throw Error(`Feature dimension must be >= 0.`);if(t===0&&e!==0)throw Error(`No feature data loaded, only feature dimension 0 is allowed.`);if(t>0&&e>t)throw Error(`Feature dimension must be 0 (none) or in range 1..${t}.`)}function We(e,t){return t<2?0:e===1?2:1}function Ge(e,t,n,r){if(ye(e),e!==`inversemagnet`&&(Ue(t,r),Ue(n,r),!(e===`single`||e===`filter`||e===`sink`||e===`min`||e===`max`||e===`mix`||e===`profile`||e===`variance`||e===`length`||e===`xypointdistance`||e===`similarity`||e===`category`))){if(t===0||n===0)throw Error(`Magnet type "${e}" requires two selected feature dimensions.`);if(t===n)throw Error(`Magnet type "${e}" requires two distinct feature dimensions.`)}}function Ke(e){if(!Array.isArray(e))return[];let t=new Set;for(let n of e)!Number.isInteger(n)||n<=0||t.add(n);return Array.from(t).sort((e,t)=>e-t)}function qe(e){return typeof e!=`string`||e.trim().length===0?[]:Ke(e.split(/[|,;\s]+/).filter(Boolean).map(e=>Number.parseInt(e,10)))}function Je(){return 4}function Ye(e){let t=Number.isFinite(e)?e:Number(e);return Number.isFinite(t)?Math.max(1e-6,Math.min(100,t)):Je()}function Xe(e,t){let n=Ke(t);if(n.length===0)return[];let r=Array.isArray(e)?e:[];return n.map((e,t)=>{let n=Number.isFinite(r[t])?r[t]:Number(r[t]);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):1})}function Ze(e){let t=Number.isFinite(e)?e:Number(e);if(!Number.isFinite(t)||t<=0)throw Error(`Similarity sharpness must be > 0.`)}var Qe=`Fallback Layer`,$e=.02,et=`#8ec7ff`,tt=.16;function nt(e,t){let n=Number.parseInt(String(e??t),10);return Number.isInteger(n)&&n>0?n:t}function rt(e){let t=Number.parseInt(String(e??0),10);return Number.isInteger(t)&&t>0?t:0}function it(t,n){if(t==null||t===``)return n;let r=Number(t);return Number.isFinite(r)?e(r,n):n}function at(e){let t=String(e||``).trim().toLowerCase();return t===`2d`||t===`2d layout`||t===`2d-layout`?`2d`:t===`height`?`height`:t===`scatter3d`||t===`3dsp`||t===`3d scatter plot`||t===`3d-scatter-plot`||t===`3dscatterplot`?`scatter3d`:`layer`}function ot(t,{maxIntervals:n=1/0}={}){return(Array.isArray(t)?t:[]).slice(0,n).map(t=>{let n=Number(t?.z),r=Number(t?.wMin),i=Number(t?.wMax),a=Number.isFinite(Number(t?.wMin))?Number(t.wMin):Number.isFinite(Number(t?.zMin))?Number(t.zMin):r,o=Number.isFinite(Number(t?.wMax))?Number(t.wMax):Number.isFinite(Number(t?.zMax))?Number(t.zMax):i,s=Number.isFinite(Number(t?.z))?Number(t.z):Number.isFinite(Number(t?.zLayer))?Number(t.zLayer):Number.isFinite(n)?n:a;if(!Number.isFinite(a)||!Number.isFinite(o)||!Number.isFinite(s))return null;let c=Math.min(e(a),e(o)),l=Math.max(e(a),e(o)),u=e(s);return{wMin:c,wMax:l,z:u,zMin:c,zMax:l,zLayer:u,name:String(t?.name||``).trim()||`Layer`,active:t?.active!==!1}}).filter(Boolean)}function st(e,t={}){let n=String(e||``).trim();if(!n)return[];try{return ot(JSON.parse(n),t)}catch{return[]}}function ct(e,t=Qe){return String(e||``).trim()||t}function lt(t,n=0){if(t==null||t===``)return n;let r=Number(t);return Number.isFinite(r)?e(r,n):n}function ut(e,t=et){return C(e,t)}function dt(e,t=tt){return it(e,t)}function ft(t,n=$e){return t==null||t===``?n:e(Number(t),n)}function pt(e){return String(e||``).trim().toLowerCase()===`magnet`?`magnet`:`feature`}function mt(e,t,n=.1,r=1){let i=it(e,n),a=it(t,r);return{zMin:Math.min(i,a),zMax:Math.max(i,a)}}function ht(e={},t=1){let n=rt(e?.sourceMagnetId),r=String(e?.sourceMode||``).trim().toLowerCase(),i=r===`magnet`||r!==`feature`&&n>0?`magnet`:`feature`,a=t===1?`X`:t===2?`Y`:`Z`,o=t===3?0:-.5,s=t===3?1:.5;return{axisName:String(e?.axisName||e?.name||a).trim()||a,sourceMode:i,featureDimension:nt(e?.featureDimension,t),sourceMagnetId:i===`magnet`?n:0,outputMin:Number.isFinite(Number(e?.outputMin))?Number(e.outputMin):o,outputMax:Number.isFinite(Number(e?.outputMax))?Number(e.outputMax):s,transfer:L(e?.transfer||e?.transfer1||{type:`none`})}}function gt(e={}){return{x:ht(e?.x,1),y:ht(e?.y,2),z:ht(e?.z,3)}}function _t(e={}){let t=rt(e.sourceMagnetId),n=String(e.sourceMode||``).trim().toLowerCase(),r=n===`feature`||n===`magnet`?n:t>0?`magnet`:`feature`;return{type:`layer`,name:String(e.name||`Z-Layout`).trim()||`Z-Layout`,sourceMode:r,featureDimension:nt(e.featureDimension??e.featureDimensionA,1),sourceMagnetId:r===`magnet`?t:0,layerMappingMode:`interval`,layerBaseName:ct(e.layerBaseName),layerBaseZ:lt(e.layerBaseZ),auxiliaryPlaneColorHex:ut(e.auxiliaryPlaneColorHex),auxiliaryPlaneAlpha:dt(e.auxiliaryPlaneAlpha),layerIntervals:ot(e.layerIntervals),transfer1:L(e.transfer1||{type:`none`}),transfer2:L(e.transfer2||{type:`none`})}}function vt(e={}){return{type:`2d`,name:String(e.name||`2D Layout`).trim()||`2D Layout`,zHeight:ft(e.zHeight??e.z??e.layerBaseZ)}}function yt(e={}){let t=pt(e.sourceMode),n=rt(e.sourceMagnetId),r=mt(e.zMin,e.zMax);return{type:`height`,name:String(e.name||`Height Layout`).trim()||`Height Layout`,sourceMode:t,featureDimension:nt(e.featureDimension??e.featureDimensionA,1),sourceMagnetId:t===`magnet`?n:0,zMin:r.zMin,zMax:r.zMax,transfer1:L(e.transfer1||{type:`none`}),transfer2:L(e.transfer2||{type:`none`})}}function bt(e={}){return{type:`scatter3d`,name:String(e.name||`3D Scatter Plot`).trim()||`3D Scatter Plot`,scatterAxes:gt(e.scatterAxes)}}function xt(e={}){let t=at(e?.type);return t===`2d`?vt(e):t===`height`?yt(e):t===`scatter3d`?bt(e):_t(e)}function St(e,t,n){return(e&&Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0)??n}function Ct(e){let t=String(St(e,`type`,`none`)||`none`).trim();return t.toLowerCase()===`gaussianpeak`?`gaussianPeak`:t.toLowerCase()||`none`}function B(e){return A(e)}function wt(e,t,n,r,i=`global`){let a=Ct(r);if(a!==`none`){if(e(t,`${n}.type`,a,`enum`,i),a===`threshold`){e(t,`${n}.tau`,St(r,`tau`,.5),`float`,i),e(t,`${n}.delta`,St(r,`delta`,.05),`float`,i);return}if(a===`gamma`){e(t,`${n}.gamma`,St(r,`gamma`,2.2),`float`,i);return}if(a===`clamp`){e(t,`${n}.clamp_a`,St(r,`clampA`,.25),`float`,i),e(t,`${n}.clamp_b`,St(r,`clampB`,.75),`float`,i);return}if(a===`pulse`){e(t,`${n}.pulse_a`,St(r,`pulseA`,.25),`float`,i),e(t,`${n}.pulse_b`,St(r,`pulseB`,.75),`float`,i);return}if(a===`constant`){e(t,`${n}.constant_a`,St(r,`constantA`,.25),`float`,i),e(t,`${n}.constant_b`,St(r,`constantB`,.75),`float`,i),e(t,`${n}.constant_value`,St(r,`constantValue`,.5),`float`,i);return}if(a===`gaussianPeak`){e(t,`${n}.gaussian_peak_a`,St(r,`gaussianPeakA`,.5),`float`,i),e(t,`${n}.gaussian_peak_r`,St(r,`gaussianPeakR`,.15),`float`,i),e(t,`${n}.gaussian_peak_epsilon`,St(r,`gaussianPeakEpsilon`,.01),`float`,i);return}if(a===`stair`){e(t,`${n}.stair_k`,St(r,`stairK`,4),`int`,i);return}a===`noise`&&(e(t,`${n}.noise_a`,St(r,`noiseA`,-.1),`float`,i),e(t,`${n}.noise_b`,St(r,`noiseB`,.1),`float`,i))}}function Tt(e,t,n){let r=String(t.type||`single`).trim().toLowerCase();if(r===`single`){e(`magnet`,`feature_a`,t.featureDimensionA??0,`int`,n);return}if(r===`inversemagnet`){e(`magnet`,`source_magnet_id`,t.sourceMagnetId??0,`int`,n);return}if(r===`category`){e(`magnet`,`category_descriptor_tag`,t.categoryDescriptorTag??``,`string`,n),e(`magnet`,`category_descriptor_name`,t.categoryDescriptorName??``,`string`,n),e(`magnet`,`category_mappings`,B(t.categoryMappings),`string`,n);return}if(r===`min`||r===`max`){e(`magnet`,`feature_a`,t.featureDimensionA??0,`int`,n),e(`magnet`,`feature_b`,t.featureDimensionB??0,`int`,n),r===`min`&&e(`magnet`,`min_sources`,JSON.stringify(Array.isArray(t.minSources)?t.minSources:[]),`string`,n),r===`max`&&e(`magnet`,`max_sources`,JSON.stringify(Array.isArray(t.maxSources)?t.maxSources:[]),`string`,n);return}if(r===`mix`){e(`magnet`,`feature_a`,t.featureDimensionA??0,`int`,n),e(`magnet`,`feature_b`,t.featureDimensionB??0,`int`,n),e(`magnet`,`mix_lambda`,t.mixLambda??.5,`float`,n),e(`magnet`,`mix_sources`,JSON.stringify(Array.isArray(t.mixSources)?t.mixSources:[]),`string`,n);return}if(r===`profile`){e(`magnet`,`profile_criteria`,JSON.stringify(ke(t.profileCriteria,t)),`string`,n);return}if(r===`variance`||r===`length`){e(`magnet`,`variance_dims`,Array.isArray(t.varianceDimensions)?t.varianceDimensions.join(`|`):``,`string`,n);return}if(r===`filter`||r===`sink`){e(`magnet`,`feature_a`,t.featureDimensionA??0,`int`,n),Number.isInteger(t.sourceMagnetId)&&t.sourceMagnetId>0&&e(`magnet`,`source_magnet_id`,t.sourceMagnetId,`int`,n),e(`magnet`,`filter_display_mode`,t.filterDisplayMode===`grid`?`grid`:`hide`,`enum`,n),e(`magnet`,`sink_delta`,t.sinkDelta??.001,`float`,n),e(`magnet`,`sink_capture_radius`,t.sinkCaptureRadius??.01,`float`,n);return}if(r===`xypointdistance`){e(`magnet`,`xy_ref_id`,t.xyReferencePointId??``,`string`,n),e(`magnet`,`xy_ref_x`,t.xyReferenceX??``,`float`,n),e(`magnet`,`xy_ref_y`,t.xyReferenceY??``,`float`,n),e(`magnet`,`xy_max_distance`,t.xyMaxDistance??``,`float`,n);return}if(r===`similarity`){e(`magnet`,`similarity_dims`,Array.isArray(t.similarityDimensions)?t.similarityDimensions.join(`|`):``,`string`,n),e(`magnet`,`similarity_ref_id`,t.similarityReferencePointId??``,`string`,n),e(`magnet`,`similarity_ref_values`,Array.isArray(t.similarityReferenceValues)?t.similarityReferenceValues.join(`|`):``,`string`,n),e(`magnet`,`similarity_weights`,Array.isArray(t.similarityDimensionWeights)?t.similarityDimensionWeights.join(`|`):``,`string`,n),e(`magnet`,`similarity_sharpness`,t.similaritySharpness??4,`float`,n);return}}function Et(e,t,n,r={}){let i=r.position??null,a=r.normalizedPosition??null,o=t.transfer1||{},s=t.transfer2||{};e(`magnet`,`id`,`M${t.id}`,`string`,n),e(`magnet`,`name`,t.name??``,`string`,n),e(`magnet`,`type`,t.type??`single`,`enum`,n),e(`magnet`,`active`,!!t.active,`bool`,n),e(`magnet`,`x`,i?.x??t.x??0,`float`,n),e(`magnet`,`y`,i?.y??t.y??0,`float`,n),e(`magnet`,`x_rel`,a?.u??t.normalizedPosition?.u??``,`float`,n),e(`magnet`,`y_rel`,a?.v??t.normalizedPosition?.v??``,`float`,n),e(`magnet`,`color`,t.colorHex??`#ff0000`,`color`,n),e(`magnet`,`strength`,pe(t),`float`,n),Tt(e,t,n),wt(e,`magnet`,`transfer1`,o,n),wt(e,`magnet`,`transfer2`,s,n)}function Dt(e,t,n=`global`){let r=at(t?.type||t?.layoutType),i=Number.parseInt(String(t?.sourceMagnetId??0),10);if(e(`layout`,`type`,r,`enum`,n),r===`2d`){let r=vt(t);e(`layout`,`2d.name`,r.name,`string`,n),e(`layout`,`2d.z_height`,r.zHeight,`float`,n);return}if(r===`height`){let r=yt(t);e(`layout`,`height.name`,r.name,`string`,n),e(`layout`,`height.source_mode`,r.sourceMode,`enum`,n),e(`layout`,`height.feature_dimension`,r.featureDimension,`int`,n),e(`layout`,`height.source_magnet_id`,r.sourceMagnetId,`int`,n),e(`layout`,`height.z_min`,r.zMin,`float`,n),e(`layout`,`height.z_max`,r.zMax,`float`,n),wt(e,`layout`,`height.transfer1`,r.transfer1,n),wt(e,`layout`,`height.transfer2`,r.transfer2,n);return}if(r===`scatter3d`){let r=gt(t?.scatterAxes);e(`layout`,`scatter3d.name`,String(t?.name||``).trim()||`3D Scatter Plot`,`string`,n);for(let t of[`x`,`y`,`z`]){let i=r[t];e(`layout`,`scatter3d.${t}.axis_name`,i.axisName,`string`,n),e(`layout`,`scatter3d.${t}.source_mode`,i.sourceMode,`enum`,n),e(`layout`,`scatter3d.${t}.feature_dimension`,i.featureDimension,`int`,n),e(`layout`,`scatter3d.${t}.source_magnet_id`,i.sourceMagnetId,`int`,n),e(`layout`,`scatter3d.${t}.output_min`,i.outputMin,`float`,n),e(`layout`,`scatter3d.${t}.output_max`,i.outputMax,`float`,n),wt(e,`layout`,`scatter3d.${t}.transfer`,i.transfer,n)}return}e(`layout`,`layer.name`,String(t?.name||``).trim()||`Z-Layout`,`string`,n);let a=String(t?.sourceMode||``).trim().toLowerCase(),o=a===`feature`||a===`magnet`?a:Number.isInteger(i)&&i>0?`magnet`:`feature`,s=Number.parseInt(String(t?.featureDimension??1),10);e(`layout`,`layer.source_mode`,o,`enum`,n),e(`layout`,`layer.feature_dimension`,Number.isInteger(s)&&s>0?s:1,`int`,n),e(`layout`,`layer.source_magnet_id`,o===`magnet`&&Number.isInteger(i)&&i>0?i:0,`int`,n),e(`layout`,`layer.fallback_name`,ct(t?.layerBaseName),`string`,n),e(`layout`,`layer.fallback_z`,lt(t?.layerBaseZ),`float`,n),e(`layout`,`layer.auxiliary_plane_color`,ut(t?.auxiliaryPlaneColorHex),`color`,n),e(`layout`,`layer.auxiliary_plane_alpha`,dt(t?.auxiliaryPlaneAlpha),`float`,n),e(`layout`,`layer.assignments_json`,JSON.stringify(ot(t?.layerIntervals)),`string`,n),wt(e,`layout`,`layer.transfer1`,t?.transfer1||{},n),wt(e,`layout`,`layer.transfer2`,t?.transfer2||{},n)}function Ot(e,t){if(!e||!t)return null;let n=Number(e.x),r=Number(e.y),i=Number(t.xMin),a=Number(t.xMax),o=Number(t.yMin),s=Number(t.yMax),c=a-i,l=s-o;return!Number.isFinite(n)||!Number.isFinite(r)||!Number.isFinite(i)||!Number.isFinite(a)||!Number.isFinite(o)||!Number.isFinite(s)||c<=0||l<=0?null:{u:(n-i)/c,v:(r-o)/l}}function kt(e){return[`project`,`display`,`analysis`,`placement`,`particles`,`layout`,`magnet`,`snapshot`].includes(e)}function At(e){let t=l(e);if(t.length<3)return null;let n=t[0],r=t[1],i=(n[0]||``).trim().toLowerCase(),a=(r[0]||``).trim().toLowerCase();if(i!==`featurespace`||a!==`featuredimensions`)return null;let o=[],s=t.reduce((e,t)=>Math.max(e,t.length),Math.max(n.length,r.length)),c=[],u=[],d=[],f=[],p=(n[1]||``).trim().toLowerCase()===`id`||(r[1]||``).trim().toLowerCase()===`description`,m=(n[2]||``).trim().toLowerCase()===`name`;for(let e=0;e<s;e+=1){if(e===0)continue;let t=n[e]||``,i=r[e]||``,a=(r[e]||``).trim().toLowerCase();if(e===1&&p)f.push({index:e,kind:`id`,row1:t||`ID`,row2:i||`description`});else if(e===2&&m)f.push({index:e,kind:`name`,row1:t||`Name`,row2:i||`description`});else if(/^f_\d+$/.test(a)){let r=(n[e]||``).trim(),o=c.length,s={index:e,name:a,displayName:r&&r.toLowerCase()!==`description`?r:a};c.push(s),f.push({index:e,kind:`feature`,featureIndex:o,row1:t,row2:i,name:s.name,displayName:s.displayName})}else{let n=/^(.+)_(x|y|sink|rgb|rgba|size_px)$/.exec(a);if(n){let r={index:e,snapshotId:n[1],field:n[2],row1:t,row2:i};d.push(r),f.push({index:e,kind:`snapshot`,snapshotId:r.snapshotId,field:r.field,row1:r.row1,row2:r.row2})}else{let n=u.length;u.push({index:e,extraIndex:n,row1:t,row2:i}),f.push({index:e,kind:`extra`,extraIndex:n,row1:t,row2:i})}}}if(c.length===0)throw Error(`Schema v2: no feature columns found in row 2 (expected f_i tags).`);let h={project:[],display:[],analysis:[],placement:[],particles:[],layout:[],magnet:[],snapshot:[]},g=[],_=(e,t,{directFeatureRow:n=!1}={})=>{let r=e=>n?e-1:e,i=+!n,a=n?1:2,o=(e[i]||``).trim(),s={id:o.length>0?o:String(g.length+1),name:m?(e[a]||``).trim():``,features:c.map(({index:n,name:i})=>{let a=(e[r(n)]||``).trim(),o=Number(a);if(!Number.isFinite(o))throw Error(`Schema v2: invalid number at row ${t}, column "${i}".`);return o}),extraValues:u.map(({index:t})=>(e[r(t)]||``).trim()),_snapshotValues:Object.create(null),x:0,y:0,vx:0,vy:0};for(let t of d){let n=(e[r(t.index)]||``).trim();if(Object.prototype.hasOwnProperty.call(s._snapshotValues,t.snapshotId)||(s._snapshotValues[t.snapshotId]={x:``,y:``,sink:``,rgb:``,rgba:``,size_px:``}),t.field===`x`||t.field===`y`||t.field===`size_px`){let e=Number(n);s._snapshotValues[t.snapshotId][t.field]=Number.isFinite(e)?e:``}else s._snapshotValues[t.snapshotId][t.field]=n}g.push(s)},v=e=>c.every(({index:t})=>{let n=(e[t-1]||``).trim();return n.length===0?!1:Number.isFinite(Number(n))});for(let e=2;e<t.length;e+=1){let n=t[e],r=e+1,i=(n[0]||``).trim().toLowerCase();if(i===`feature`){_(n,r);continue}if(!kt(i)&&v(n)){_(n,r,{directFeatureRow:!0});continue}if(!Object.prototype.hasOwnProperty.call(h,i)){o.push(`Row ${e+1}: unknown category "${n[0]||``}" ignored.`);continue}h[i].push({row:e+1,key:(n[1]||``).trim(),value:(n[2]||``).trim(),type:(n[3]||``).trim().toLowerCase(),scope:(n[4]||``).trim(),comment:(n[5]||``).trim()})}let y=new Map,b=new Map;for(let e of h.snapshot){let t=(e.key||``).trim().toLowerCase(),n=(e.scope||``).trim().toLowerCase();if(n){if(b.has(n)||b.set(n,{storeColors:!1,includeCanvasPosition:!1,includeParticleSize:!1,includeParticleColor:!1,range:{xMin:null,xMax:null,yMin:null,yMax:null}}),t===`name`&&n)y.set(n,e.value||n);else if(t===`store_colors`){let t=String(e.value||``).trim().toLowerCase();b.get(n).storeColors=t===`true`||t===`1`||t===`yes`||t===`on`}else if(t===`include_canvas_position`){let t=String(e.value||``).trim().toLowerCase();b.get(n).includeCanvasPosition=t===`true`||t===`1`||t===`yes`||t===`on`}else if(t===`include_particle_size_px`){let t=String(e.value||``).trim().toLowerCase();b.get(n).includeParticleSize=t===`true`||t===`1`||t===`yes`||t===`on`}else if(t===`include_particle_color_rgba`){let t=String(e.value||``).trim().toLowerCase();b.get(n).includeParticleColor=t===`true`||t===`1`||t===`yes`||t===`on`}else if(t===`plane.x_min`){let t=Number(e.value);b.get(n).range.xMin=Number.isFinite(t)?t:null}else if(t===`plane.x_max`){let t=Number(e.value);b.get(n).range.xMax=Number.isFinite(t)?t:null}else if(t===`plane.y_min`){let t=Number(e.value);b.get(n).range.yMin=Number.isFinite(t)?t:null}else if(t===`plane.y_max`){let t=Number(e.value);b.get(n).range.yMax=Number.isFinite(t)?t:null}}}let x=Array.from(new Set(d.map(e=>e.snapshotId.toLowerCase()))).map(e=>{let t=b.get(e)||{storeColors:!1,includeCanvasPosition:!1,includeParticleSize:!1,includeParticleColor:!1,range:{xMin:null,xMax:null,yMin:null,yMax:null}},n=g.map(t=>{let n=t._snapshotValues?.[e];return n?{x:n.x,y:n.y,sink:n.sink||``,rgb:n.rgb||``,rgba:n.rgba||``,size_px:n.size_px}:{x:``,y:``,sink:``,rgb:``,rgba:``,size_px:``}}),r=!!t.includeCanvasPosition||n.some(e=>Number.isFinite(e.x)||Number.isFinite(e.y)),i=!!t.includeParticleSize||n.some(e=>Number.isFinite(e.size_px)),a=!!(t.includeParticleColor||t.storeColors)||n.some(e=>String(e.rgba||e.rgb||``).trim().length>0);return{id:e,name:y.get(e)||e,storeColors:!!(t.storeColors||a),includeCanvasPosition:r,includeParticleSize:i,includeParticleColor:a,range:t.range,values:n}});for(let e of g)delete e._snapshotValues;return{featureNames:c.map(e=>e.name),featureDisplayNames:c.map(e=>e.displayName||e.name),extraColumns:u,columnLayout:f,columnsWithXY:[...c.map(e=>e.name),`x`,`y`],points:g,snapshots:x,categories:h,warnings:o}}function jt(e){let{dataset:t,project:n={},display:r={},placement:i={},layout:a=null,particles:o={},magnets:s=[],analyses:c=[],activeAnalysisId:l=null}=e||{};if(!t||!Array.isArray(t.points)||!Array.isArray(t.featureNames))throw Error(`Schema v2 export requires a loaded dataset.`);let u=t.featureNames.length,f=Array.isArray(t.snapshots)?t.snapshots:[],p=Array.isArray(t.columnLayout)&&t.columnLayout.length>0?t.columnLayout.map(e=>({...e})):[{kind:`id`,row1:`ID`,row2:`description`},{kind:`name`,row1:`Name`,row2:`description`},...Array.from({length:u},(e,n)=>({kind:`feature`,featureIndex:n,row1:Array.isArray(t.featureDisplayNames)&&t.featureDisplayNames[n]?t.featureDisplayNames[n]:`Feature ${n+1}`,row2:`f_${n+1}`,name:`f_${n+1}`}))],m=new Set(p.filter(e=>e.kind===`snapshot`).map(e=>`${String(e.snapshotId||``).toLowerCase()}:${e.field}`)),h=[...p];for(let e of f){let t=String(e?.id||``).trim();if(!t)continue;let n=e.name||t,r=Array.isArray(e.values)?e.values:[],i=[],a=!!e.includeCanvasPosition||r.some(e=>Number.isFinite(e?.x)||Number.isFinite(e?.y)),o=!!e.includeParticleSize||r.some(e=>Number.isFinite(e?.size_px)),s=!!(e.includeParticleColor||e.storeColors)||r.some(e=>String(e?.rgba||e?.rgb||``).trim().length>0);if(a&&i.push({field:`x`,row1:`${n} X`,row2:`${t}_x`},{field:`y`,row1:`${n} Y`,row2:`${t}_y`}),o&&i.push({field:`size_px`,row1:`${n} Size`,row2:`${t}_size_px`}),s){let e=r.some(e=>String(e?.rgba||``).trim().length>0)||!r.some(e=>String(e?.rgb||``).trim().length>0);i.push({field:e?`rgba`:`rgb`,row1:`${n} ${e?`RGBA`:`RGB`}`,row2:`${t}_${e?`rgba`:`rgb`}`})}r.some(e=>String(e?.sink||``).trim().length>0)&&i.push({field:`sink`,row1:`${n} Sink`,row2:`${t}_sink`});for(let e of i){let n=`${t.toLowerCase()}:${e.field}`;m.has(n)||(m.add(n),h.push({kind:`snapshot`,snapshotId:t,field:e.field,row1:e.row1,row2:e.row2}))}}let g=[];g.push(d([`featurespace`,...h.map(e=>e.row1??``)])),g.push(d([`featuredimensions`,...h.map(e=>e.row2??``)]));let _=(e,t,n,r=``,i=`global`,a=``)=>{g.push(d([e,t,n,r,i,a]))},v=Array.isArray(c)&&c.length>0,y=v?c.map((e,t)=>({id:e?.id??t+1,name:e?.name??`Analysis ${t+1}`,labelPosition:e?.labelPosition??null,particleSize:e?.particleSize??null,particleColor:e?.particleColor??null,placement:e?.placement??null,layouts:Array.isArray(e?.layouts)?e.layouts:[],layout:e?.layerLayout??null,magnets:Array.isArray(e?.magnets)?e.magnets:[]})):[],b=new Map(y.map((e,t)=>[e.id,`A${t+1}`])),x=b.get(l)||b.get(y[0]?.id)||`A1`;_(`project`,`schema_version`,n.schemaVersion??2,`int`),_(`project`,`title`,n.title??``,`string`),_(`project`,`subtitle`,n.subtitle??``,`string`),_(`project`,`description`,n.description??``,`string`),_(`project`,`created_at`,n.createdAt??``,`string`),_(`project`,`authors`,n.authors??``,`string`),_(`project`,`dataset_filename`,n.datasetFileName??``,`string`),v&&_(`project`,`active_analysis_scope`,x,`string`);for(let e of f){let t=String(e?.id||``).trim();if(!t)continue;_(`snapshot`,`id`,t,`string`,t),_(`snapshot`,`name`,e.name??t,`string`,t),_(`snapshot`,`store_colors`,!!e.storeColors,`bool`,t),_(`snapshot`,`include_canvas_position`,!!e.includeCanvasPosition,`bool`,t),_(`snapshot`,`include_particle_size_px`,!!e.includeParticleSize,`bool`,t),_(`snapshot`,`include_particle_color_rgba`,!!e.includeParticleColor,`bool`,t);let n=e.range||{};_(`snapshot`,`plane.x_min`,n.xMin??``,`float`,t),_(`snapshot`,`plane.x_max`,n.xMax??``,`float`,t),_(`snapshot`,`plane.y_min`,n.yMin??``,`float`,t),_(`snapshot`,`plane.y_max`,n.yMax??``,`float`,t)}if(_(`display`,`plane.x_min`,r.xMin,`float`),_(`display`,`plane.x_max`,r.xMax,`float`),_(`display`,`plane.y_min`,r.yMin,`float`),_(`display`,`plane.y_max`,r.yMax,`float`),_(`display`,`background.color`,r.backgroundColor,`color`),_(`display`,`reference.color`,r.referenceColor??`#202020`,`color`),_(`display`,`reference.axis_color`,r.referenceAxisColor??`#1a1a1a`,`color`),_(`display`,`reference.grid_color`,r.referenceGridColor??`#131313`,`color`),_(`display`,`side_planes.color`,r.sidePlaneColor??`#2a2a2a`,`color`),_(`display`,`side_planes.visible`,r.sidePlaneVisible??!0,`bool`),_(`display`,`reference.grid_visible`,r.referenceGridVisible??!0,`bool`),_(`display`,`reference.line_width_px`,r.referenceLineWidthPx??1.25,`float`),_(`display`,`magnet.size_px`,e.magnetSizePx,`float`),_(`display`,`magnet.shape`,r.magnetShapeType??`quadrat`,`enum`),_(`display`,`pathtrail.width`,r.pathtrailWidth,`float`),_(`display`,`pathtrail.glow_duration`,r.pathtrailGlowDuration,`float`),_(`display`,`pathtrail.end_transparency`,r.pathtrailEndTransparency,`float`),_(`display`,`pathtrail.min_length`,r.pathtrailMinLength,`float`),_(`display`,`pathtrail.enabled`,r.movementTraceEnabled,`bool`),_(`display`,`pathtrail.style`,r.movementTraceStyle,`enum`),_(`display`,`target_density_grid_size`,r.targetDensityGridSize,`int`),_(`display`,`target_density_color0`,r.targetDensityColor0,`color`),_(`display`,`target_density_color1`,r.targetDensityColor1,`color`),_(`display`,`target_density_alpha`,r.targetDensityAlpha,`float`),_(`display`,`target_density_epsilon`,r.targetDensityEpsilon,`float`),wt(_,`display`,`target_density_transfer`,r.targetDensityTransfer||{}),_(`display`,`knn.enabled`,r.knnEnabled,`bool`),_(`display`,`knn.k`,r.knnK,`int`),_(`display`,`knn.threshold_mode`,r.knnThresholdMode,`enum`),_(`display`,`knn.tau_a`,r.knnTauA,`float`),_(`display`,`knn.tau_q`,r.knnTauQ,`float`),_(`display`,`knn.min_cluster_size`,r.knnMinClusterSize,`int`),_(`display`,`knn.draw_edges`,r.knnDrawEdges,`bool`),_(`display`,`knn.draw_hull`,r.knnDrawHull,`bool`),_(`placement`,`initial_mode`,i.initialMode,`enum`),!v){_(`placement`,`speed`,i.speed,`int`),_(`placement`,`max_iterations`,i.maxIterations,`int`),_(`placement`,`delta`,i.delta,`float`),_(`placement`,`eta`,i.eta,`float`),_(`placement`,`rho`,i.rho,`float`),_(`placement`,`lambda`,i.lambda,`float`),_(`placement`,`beta`,i.beta,`float`),_(`placement`,`gamma`,i.gamma,`float`),_(`placement`,`vmax`,i.vmax,`float`),_(`placement`,`real_time_magnets`,i.realTimeMagnets,`bool`),_(`placement`,`two_phase_mode`,i.twoPhaseMode,`bool`),_(`placement`,`use_spatial_grid`,i.useSpatialGrid,`bool`),_(`placement`,`skip_tiny_buffers`,i.skipTinyBuffers,`bool`),_(`placement`,`worker_mode`,i.workerMode,`bool`),_(`placement`,`show_target_density_map`,i.showTargetDensityMap,`bool`),_(`placement`,`mode`,i.mode,`enum`),_(`placement`,`gpu_particle_orientation`,i.gpuParticleOrientation,`enum`),_(`placement`,`barycentric_speed`,i.barycentricSpeed,`int`),_(`placement`,`barycentric_iterations`,i.barycentricIterations,`int`),_(`placement`,`barycentric_local_iterations`,i.barycentricLocalIterations,`int`),_(`placement`,`barycentric_eta`,i.barycentricEta,`float`),_(`placement`,`barycentric_kappa`,i.barycentricKappa,`float`),_(`placement`,`barycentric_lambda`,i.barycentricLambda,`float`),_(`placement`,`barycentric_rho`,i.barycentricRho,`float`),_(`placement`,`barycentric_delta_max`,i.barycentricDeltaMax,`float`),_(`placement`,`barycentric_delta_threshold`,i.barycentricDeltaThreshold,`float`),_(`placement`,`barycentric_interaction_mode`,i.barycentricInteractionMode,`enum`),_(`placement`,`barycentric_pure_positions`,i.barycentricPurePositions,`bool`),_(`placement`,`pbd_speed`,i.pbdSpeed,`int`),_(`placement`,`pbd_max_iterations`,i.pbdMaxIterations,`int`),_(`placement`,`pbd_local_iterations`,i.pbdLocalIterations,`int`),_(`placement`,`pbd_eta`,i.pbdEta,`float`),_(`placement`,`pbd_kappa`,i.pbdKappa,`float`),_(`placement`,`pbd_radius`,i.pbdRadius,`float`),_(`placement`,`pbd_omega`,i.pbdOmega,`float`),_(`placement`,`pbd_delta`,i.pbdDelta,`float`),_(`placement`,`pbd_adaptive_density`,i.pbdAdaptiveDensity,`bool`),_(`particles`,`size.mode`,o.sizeMode,`enum`),_(`particles`,`size.adaptive`,o.sizeAdaptive,`bool`),_(`particles`,`size.static_quad_width_px`,o.staticQuadWidthPx,`float`),_(`particles`,`size.feature_dimension`,o.sizeFeatureDimension,`int`),_(`particles`,`size.magnet_id`,o.sizeMagnetId,`int`),_(`particles`,`size.sink_mode`,o.sinkSizeMode,`enum`),_(`particles`,`size.sink_fixed_px`,o.sinkFixedPx,`float`),_(`particles`,`size.min_px`,o.sizeMinPx,`float`),_(`particles`,`size.max_px`,o.sizeMaxPx,`float`),_(`particles`,`size.density_rendering_enabled`,o.densityRenderingEnabled,`bool`),_(`particles`,`size.density_sensitivity`,o.densityRenderingSensitivity,`float`),_(`particles`,`size.density_min_alpha`,o.densityRenderingMinAlpha,`float`),_(`particles`,`size.density_softness`,o.densityRenderingSoftness,`float`),_(`particles`,`color.mode`,o.colorMode,`enum`),_(`particles`,`color.shape`,o.renderShape,`enum`),_(`particles`,`color.static_hex`,o.staticColorHex,`color`),_(`particles`,`color.feature_dimension`,o.colorFeatureDimension,`int`),_(`particles`,`color.category_descriptor_tag`,o.colorCategoryDescriptorTag,`string`),_(`particles`,`color.category_descriptor_name`,o.colorCategoryDescriptorName,`string`),_(`particles`,`color.category_mappings`,o.colorCategoryMappings?j(o.colorCategoryMappings):``,`string`),_(`particles`,`color.feature_color0_hex`,o.featureColor0Hex,`color`),_(`particles`,`color.feature_color1_hex`,o.featureColor1Hex,`color`),_(`particles`,`color.ramp_json`,o.colorRampStops?JSON.stringify(o.colorRampStops):``,`string`),wt(_,`particles`,`color.feature_transfer`,o.featureTransfer||{}),_(`particles`,`color.magnet_id`,o.colorMagnetId,`int`),_(`particles`,`color.magnet_color0_hex`,o.magnetColor0Hex,`color`),_(`particles`,`color.magnet_color1_hex`,o.magnetColor1Hex,`color`),_(`particles`,`alpha.source_mode`,o.alphaSourceMode,`enum`),_(`particles`,`alpha.magnet_id`,o.alphaMagnetId,`int`),_(`particles`,`alpha.density_min`,o.alphaDensityMin,`float`),_(`particles`,`alpha.density_max`,o.alphaDensityMax,`float`),_(`particles`,`color.static_transparency`,o.staticTransparency,`float`),_(`particles`,`color.feature_transparency`,o.featureTransparency,`float`),_(`particles`,`color.magnet_transparency`,o.magnetTransparency,`float`),_(`particles`,`alpha.mode`,o.alphaDensityMode,`enum`),_(`particles`,`alpha.radius_px`,o.densityAlphaRadiusPx,`float`),_(`particles`,`alpha.min`,o.densityAlphaMin,`float`),_(`particles`,`shape.splat_edge_width`,o.splatEdgeWidth,`float`),_(`particles`,`shape.splat_edge_strength`,o.splatEdgeStrength,`float`),_(`particles`,`shape.splat_sharpness`,o.splatSharpness,`float`),_(`particles`,`shape.height_fog_enabled`,o.heightFogEnabled,`bool`);let t=[...s].sort((e,t)=>(e.id??0)-(t.id??0));Array.isArray(e.layouts)&&e.layouts.length>0?e.layouts.forEach((e,t)=>{Dt(_,e,`L${t+1}`)}):a&&Dt(_,a);for(let e of t)Et(_,e,`M${e.id}`,{position:{x:e.x??0,y:e.y??0},normalizedPosition:e.normalizedPosition??null})}for(let e of y){let t=b.get(e.id),n=e.labelPosition||{};_(`analysis`,`id`,t,`string`,t),_(`analysis`,`name`,e.name??t,`string`,t),_(`analysis`,`label_x`,n.x??``,`float`,t),_(`analysis`,`label_y`,n.y??``,`float`,t);let a=e.placement||{},o=a.force||{},s=a.barycentric||{},c=a.pbd||{};_(`placement`,`mode`,a.mode??i.mode,`enum`,t),_(`placement`,`speed`,o.speed,`int`,t),_(`placement`,`max_iterations`,o.maxSteps,`int`,t),_(`placement`,`delta`,o.delta,`float`,t),_(`placement`,`eta`,o.eta,`float`,t),_(`placement`,`rho`,o.rho,`float`,t),_(`placement`,`lambda`,o.lambda,`float`,t),_(`placement`,`beta`,o.beta,`float`,t),_(`placement`,`gamma`,o.gamma,`float`,t),_(`placement`,`vmax`,o.vmax,`float`,t),_(`placement`,`real_time_magnets`,a.realTimeMagnets,`bool`,t),_(`placement`,`two_phase_mode`,a.twoPhaseMode,`bool`,t),_(`placement`,`use_spatial_grid`,a.useSpatialGrid,`bool`,t),_(`placement`,`skip_tiny_buffers`,a.skipTinyBuffers,`bool`,t),_(`placement`,`worker_mode`,a.workerPlacement,`bool`,t),_(`placement`,`gpu_particle_orientation`,a.gpuParticleOrientation,`enum`,t),_(`placement`,`show_target_density_map`,a.showTargetDensityMap,`bool`,t),_(`placement`,`barycentric_speed`,s.speed,`int`,t),_(`placement`,`barycentric_iterations`,s.transitionSteps,`int`,t),_(`placement`,`barycentric_local_iterations`,s.localIterations,`int`,t),_(`placement`,`barycentric_eta`,s.eta,`float`,t),_(`placement`,`barycentric_kappa`,s.kappa,`float`,t),_(`placement`,`barycentric_lambda`,s.lambda,`float`,t),_(`placement`,`barycentric_rho`,s.rho,`float`,t),_(`placement`,`barycentric_delta_max`,s.deltaMax,`float`,t),_(`placement`,`barycentric_delta_threshold`,s.deltaThreshold,`float`,t),_(`placement`,`barycentric_interaction_mode`,s.interactionMode,`enum`,t),_(`placement`,`barycentric_pure_positions`,s.purePositions,`bool`,t),_(`placement`,`pbd_speed`,c.speed,`int`,t),_(`placement`,`pbd_max_iterations`,c.maxSteps,`int`,t),_(`placement`,`pbd_local_iterations`,c.localIterations,`int`,t),_(`placement`,`pbd_eta`,c.eta,`float`,t),_(`placement`,`pbd_kappa`,c.kappa,`float`,t),_(`placement`,`pbd_radius`,c.radius,`float`,t),_(`placement`,`pbd_omega`,c.omega,`float`,t),_(`placement`,`pbd_delta`,c.delta,`float`,t),_(`placement`,`pbd_adaptive_density`,c.adaptiveDensity,`bool`,t);let l=e.particleSize||{},u=e.particleColor||{};Array.isArray(e.layouts)&&e.layouts.length>0?e.layouts.forEach((e,n)=>{Dt(_,e,`${t}:L${n+1}`)}):e.layout&&Dt(_,e.layout,t),_(`particles`,`size.mode`,l.mode,`enum`,t),_(`particles`,`size.adaptive`,l.adaptive,`bool`,t),_(`particles`,`size.static_quad_width_px`,l.quadWidthPx,`float`,t),_(`particles`,`size.feature_dimension`,l.featureDimension,`int`,t),_(`particles`,`size.magnet_id`,l.magnetId,`int`,t),_(`particles`,`size.sink_mode`,l.sinkSizeMode,`enum`,t),_(`particles`,`size.sink_fixed_px`,l.sinkFixedPx,`float`,t),_(`particles`,`size.min_px`,l.minPx,`float`,t),_(`particles`,`size.max_px`,l.maxPx,`float`,t),_(`particles`,`size.density_rendering_enabled`,l.densityRenderingEnabled,`bool`,t),_(`particles`,`size.density_sensitivity`,l.densityRenderingSensitivity,`float`,t),_(`particles`,`size.density_min_alpha`,l.densityRenderingMinAlpha,`float`,t),_(`particles`,`size.density_softness`,l.densityRenderingSoftness,`float`,t),_(`particles`,`color.mode`,u.mode,`enum`,t),_(`particles`,`color.shape`,u.renderShape,`enum`,t),_(`particles`,`color.static_hex`,u.staticColorHex,`color`,t),_(`particles`,`color.feature_dimension`,u.featureDimension,`int`,t),_(`particles`,`color.category_descriptor_tag`,u.categoryDescriptorTag,`string`,t),_(`particles`,`color.category_descriptor_name`,u.categoryDescriptorName,`string`,t),_(`particles`,`color.category_mappings`,u.categoryMappings?j(u.categoryMappings):``,`string`,t),_(`particles`,`color.feature_color0_hex`,u.featureColor0Hex,`color`,t),_(`particles`,`color.feature_color1_hex`,u.featureColor1Hex,`color`,t),_(`particles`,`color.ramp_json`,u.colorRampStops?JSON.stringify(u.colorRampStops):``,`string`,t),wt(_,`particles`,`color.feature_transfer`,u.featureTransfer||{},t),_(`particles`,`color.magnet_id`,u.magnetId,`int`,t),_(`particles`,`color.magnet_color0_hex`,u.magnetColor0Hex,`color`,t),_(`particles`,`color.magnet_color1_hex`,u.magnetColor1Hex,`color`,t),_(`particles`,`alpha.source_mode`,u.alphaSourceMode,`enum`,t),_(`particles`,`alpha.magnet_id`,u.alphaMagnetId,`int`,t),_(`particles`,`alpha.density_min`,u.alphaDensityMin,`float`,t),_(`particles`,`alpha.density_max`,u.alphaDensityMax,`float`,t),_(`particles`,`color.static_transparency`,u.staticTransparency,`float`,t),_(`particles`,`color.feature_transparency`,u.featureTransparency,`float`,t),_(`particles`,`color.magnet_transparency`,u.magnetTransparency,`float`,t),_(`particles`,`alpha.mode`,u.alphaDensityMode,`enum`,t),_(`particles`,`alpha.radius_px`,u.densityAlphaRadiusPx,`float`,t),_(`particles`,`alpha.min`,u.densityAlphaMin,`float`,t),_(`particles`,`shape.splat_edge_width`,u.splatEdgeWidth,`float`,t),_(`particles`,`shape.splat_edge_strength`,u.splatEdgeStrength,`float`,t),_(`particles`,`shape.splat_sharpness`,u.splatSharpness,`float`,t),_(`particles`,`shape.height_fog_enabled`,u.heightFogEnabled,`bool`,t);let d=[...e.magnets||[]].sort((e,t)=>(e.id??0)-(t.id??0));for(let e of d){let n=`${t}:M${e.id}`,i=Number.isFinite(e?.x)&&Number.isFinite(e?.y)?{x:e.x,y:e.y}:e?.position||null;Et(_,e,n,{position:i,normalizedPosition:e?.normalizedPosition||Ot(i,r)})}}return t.points.forEach((e,n)=>{let r=e.id!=null&&String(e.id).trim().length>0?e.id:n+1,i=[`feature`];for(let a of h)if(a.kind===`id`)i.push(r);else if(a.kind===`name`)i.push(e.name??``);else if(a.kind===`feature`){let n=Number.isInteger(a.featureIndex)?a.featureIndex:0,r;r=Number.isInteger(e.featureOffset)&&t.featureValues?t.featureValues[e.featureOffset+n]:e.features?.[n],i.push(Number.isFinite(r)?r:0)}else if(a.kind===`extra`){let t=Number.isInteger(a.extraIndex)?a.extraIndex:-1;i.push(t>=0?e.extraValues?.[t]??``:``)}else if(a.kind===`snapshot`){let e=f.find(e=>String(e?.id||``).trim().toLowerCase()===String(a.snapshotId||``).trim().toLowerCase())?.values?.[n]||{};i.push(e[a.field]??``)}else i.push(``);g.push(d(i))}),g.join(`
`)}function Mt(e){let{dataset:t}=e||{};if(!t||!Array.isArray(t.points)||!Array.isArray(t.featureNames))throw Error(`Feature-space CSV export requires a loaded dataset.`);let n=t.featureNames.length,r=Array.isArray(t.columnLayout)&&t.columnLayout.length>0?t.columnLayout.filter(e=>e.kind!==`snapshot`).map(e=>({...e})):[{kind:`id`,row1:`ID`,row2:`description`},{kind:`name`,row1:`Name`,row2:`description`},...Array.from({length:n},(e,n)=>({kind:`feature`,featureIndex:n,row1:Array.isArray(t.featureDisplayNames)&&t.featureDisplayNames[n]?t.featureDisplayNames[n]:`Feature ${n+1}`,row2:t.featureNames[n]||`f_${n+1}`,name:t.featureNames[n]||`f_${n+1}`}))],i=[d([`featurespace`,...r.map(e=>e.row1??``)]),d([`featuredimensions`,...r.map(e=>e.row2??``)])];return t.points.forEach((e,n)=>{let a=e.id!=null&&String(e.id).trim().length>0?e.id:n+1,o=[`feature`];for(let n of r)if(n.kind===`id`)o.push(a);else if(n.kind===`name`)o.push(e.name??``);else if(n.kind===`feature`){let r=Number.isInteger(n.featureIndex)?n.featureIndex:0,i;i=Number.isInteger(e.featureOffset)&&t.featureValues?t.featureValues[e.featureOffset+r]:e.features?.[r],o.push(Number.isFinite(i)?i:0)}else if(n.kind===`extra`){let t=Number.isInteger(n.extraIndex)?n.extraIndex:-1;o.push(t>=0?e.extraValues?.[t]??``:``)}else o.push(``);i.push(d(o))}),i.join(`
`)}function Nt(e){let t=new Map;for(let n of e||[])n.key&&t.set(n.key.toLowerCase(),n.value);return t}function Pt(e){let t=String(e||``).trim().toLowerCase();return t.length===0||t===`global`}function Ft(e,t=`global`){let n=String(t||``).trim().toLowerCase();return Nt((e||[]).filter(e=>{let t=String(e.scope||``).trim().toLowerCase();return n===`global`?Pt(t):t===n}))}function It(e){let t=new Map;for(let n of e||[]){let e=String(n.scope||`global`).trim();e&&(t.has(e)||t.set(e,[]),t.get(e).push(n))}return t}function Lt(e,t,n,{parseFloatMaybe:r,parseIntMaybe:i,normalizeTransferConfig:a}){return a({type:String(e.get(`${t}.type`)||n?.type||`none`).toLowerCase(),tau:r(e.get(`${t}.tau`))??n?.tau??.5,delta:r(e.get(`${t}.delta`))??n?.delta??.05,gamma:r(e.get(`${t}.gamma`))??n?.gamma??2.2,clampA:r(e.get(`${t}.clamp_a`))??n?.clampA??.25,clampB:r(e.get(`${t}.clamp_b`))??n?.clampB??.75,pulseA:r(e.get(`${t}.pulse_a`))??n?.pulseA??.25,pulseB:r(e.get(`${t}.pulse_b`))??n?.pulseB??.75,constantA:r(e.get(`${t}.constant_a`))??n?.constantA??.25,constantB:r(e.get(`${t}.constant_b`))??n?.constantB??.75,constantValue:r(e.get(`${t}.constant_value`))??n?.constantValue??.5,gaussianPeakA:r(e.get(`${t}.gaussian_peak_a`))??n?.gaussianPeakA??.5,gaussianPeakR:r(e.get(`${t}.gaussian_peak_r`))??n?.gaussianPeakR??.15,gaussianPeakEpsilon:r(e.get(`${t}.gaussian_peak_epsilon`))??n?.gaussianPeakEpsilon??.01,stairK:i(e.get(`${t}.stair_k`))??n?.stairK??4,noiseA:r(e.get(`${t}.noise_a`))??n?.noiseA??-.1,noiseB:r(e.get(`${t}.noise_b`))??n?.noiseB??.1})}function Rt(e){return String(e||``).split(`|`).map(e=>Number.parseFloat(e)).filter(e=>Number.isFinite(e))}function zt(e){return String(e||``).split(`|`).map(e=>Number.parseFloat(e)).filter(e=>Number.isFinite(e))}function Bt(e,{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r}){let i=at(e.get(`type`));if(i===`2d`)return{type:`2d`,name:String(e.get(`2d.name`)||`2D Layout`).trim()||`2D Layout`,zHeight:ft(t(e.get(`2d.z_height`)),0)};if(i===`height`){let i=t(e.get(`height.z_min`)),a=t(e.get(`height.z_max`)),o=pt(e.get(`height.source_mode`)),s=mt(i,a);return{type:`height`,name:String(e.get(`height.name`)||`Height Layout`).trim()||`Height Layout`,sourceMode:o,featureDimension:n(e.get(`height.feature_dimension`))??1,sourceMagnetId:n(e.get(`height.source_magnet_id`))??0,zMin:s.zMin,zMax:s.zMax,transfer1:Lt(e,`height.transfer1`,r({type:`none`}),{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r}),transfer2:Lt(e,`height.transfer2`,r({type:`none`}),{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r})}}if(i===`scatter3d`){let i=(i,a)=>{let o=pt(e.get(`scatter3d.${i}.source_mode`));return ht({axisName:String(e.get(`scatter3d.${i}.axis_name`)||(i===`x`?`X`:i===`y`?`Y`:`Z`)).trim()||i.toUpperCase(),sourceMode:o,featureDimension:n(e.get(`scatter3d.${i}.feature_dimension`))??a,sourceMagnetId:o===`magnet`?n(e.get(`scatter3d.${i}.source_magnet_id`))??0:0,outputMin:t(e.get(`scatter3d.${i}.output_min`))??(i===`z`?0:-.5),outputMax:t(e.get(`scatter3d.${i}.output_max`))??(i===`z`?1:.5),transfer:Lt(e,e.has(`scatter3d.${i}.transfer.type`)?`scatter3d.${i}.transfer`:`scatter3d.${i}.transfer1`,r({type:`none`}),{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r})},a)};return{type:`scatter3d`,name:String(e.get(`scatter3d.name`)||`3D Scatter Plot`).trim()||`3D Scatter Plot`,scatterAxes:{x:i(`x`,1),y:i(`y`,2),z:i(`z`,3)}}}let a=n(e.get(`layer.source_magnet_id`))??0,o=String(e.get(`layer.source_mode`)||``).trim().toLowerCase(),s=o===`feature`||o===`magnet`?o:a>0?`magnet`:`feature`,c=e.has(`layer.fallback_name`)?e.get(`layer.fallback_name`):e.get(`layer.base_name`),l=e.has(`layer.fallback_z`)?t(e.get(`layer.fallback_z`)):t(e.get(`layer.base_z`)),u=e.has(`layer.assignments_json`)?e.get(`layer.assignments_json`):e.get(`layer.intervals_json`);return{type:`layer`,name:String(e.get(`layer.name`)||`Z-Layout`).trim()||`Z-Layout`,sourceMode:s,featureDimension:n(e.get(`layer.feature_dimension`))??1,sourceMagnetId:s===`magnet`?a:0,layerMappingMode:`interval`,layerBaseName:ct(c),layerBaseZ:lt(l),auxiliaryPlaneColorHex:ut(e.get(`layer.auxiliary_plane_color`)),auxiliaryPlaneAlpha:dt(t(e.get(`layer.auxiliary_plane_alpha`))),layerIntervals:st(u),transfer1:Lt(e,`layer.transfer1`,r({type:`none`}),{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r}),transfer2:Lt(e,`layer.transfer2`,r({type:`none`}),{parseFloatMaybe:t,parseIntMaybe:n,normalizeTransferConfig:r})}}function Vt(e,{parseFloatMaybe:t}){let n=t(e.get(`x_rel`)),r=t(e.get(`y_rel`));return n!=null&&r!=null?{u:n,v:r}:null}function Ht(e,{scope:t,fallbackId:n,parseFloatMaybe:r,parseIntMaybe:i,parseBoolMaybe:a,parseVarianceDimensionsText:o,parseMagnetInstanceId:s,denormalizePositionFromPlane:c,normalizeTransferConfig:l}){let u=String(e.get(`id`)||t||``).trim(),d=s(e.get(`id`),t),f=Vt(e,{parseFloatMaybe:r}),p=r(e.get(`x`)),m=r(e.get(`y`));return{id:Number.isInteger(d)?d:n,name:e.get(`name`)||u||t,colorHex:e.get(`color`)||`#ff0000`,active:a(e.get(`active`))??!0,type:(e.get(`type`)||`single`).toLowerCase()===`sink`?`filter`:(e.get(`type`)||`single`).toLowerCase(),sourceMagnetId:i(e.get(`source_magnet_id`))??0,featureDimensionA:i(e.get(`feature_a`))??0,featureDimensionB:i(e.get(`feature_b`))??0,varianceDimensions:o(e.get(`variance_dims`)),categoryDescriptorTag:String(e.get(`category_descriptor_tag`)||``).trim(),categoryDescriptorName:String(e.get(`category_descriptor_name`)||``).trim(),categoryExtraIndex:-1,categoryMappings:M(e.get(`category_mappings`)),minSources:(()=>{try{let t=JSON.parse(String(e.get(`min_sources`)||`[]`));return Array.isArray(t)?t:[]}catch{return[]}})(),maxSources:(()=>{try{let t=JSON.parse(String(e.get(`max_sources`)||`[]`));return Array.isArray(t)?t:[]}catch{return[]}})(),mixLambda:r(e.get(`mix_lambda`))??.5,mixSources:(()=>{try{let t=JSON.parse(String(e.get(`mix_sources`)||`[]`));return Array.isArray(t)?t:[]}catch{return[]}})(),profileCriteria:(()=>{try{let t=JSON.parse(String(e.get(`profile_criteria`)||`[]`));return Array.isArray(t)?t:[]}catch{return[]}})(),transfer1:Lt(e,`transfer1`,l({type:`none`}),{parseFloatMaybe:r,parseIntMaybe:i,normalizeTransferConfig:l}),transfer2:Lt(e,`transfer2`,l({type:`none`}),{parseFloatMaybe:r,parseIntMaybe:i,normalizeTransferConfig:l}),sinkDelta:r(e.get(`sink_delta`))??.001,sinkCaptureRadius:r(e.get(`sink_capture_radius`))??.01,filterDisplayMode:String(e.get(`filter_display_mode`)||`hide`).trim().toLowerCase()===`grid`?`grid`:`hide`,strength:r(e.get(`strength`))??r(e.get(`alpha`))??1,xyReferencePointId:String(e.get(`xy_ref_id`)||``).trim(),xyReferenceX:r(e.get(`xy_ref_x`)),xyReferenceY:r(e.get(`xy_ref_y`)),xyMaxDistance:r(e.get(`xy_max_distance`)),similarityDimensions:o(e.get(`similarity_dims`)),similarityReferencePointId:String(e.get(`similarity_ref_id`)||``).trim(),similarityReferenceValues:Rt(e.get(`similarity_ref_values`)),similarityDimensionWeights:zt(e.get(`similarity_weights`)),similaritySharpness:r(e.get(`similarity_sharpness`)),similarityMaxDistance:r(e.get(`similarity_max_distance`)),normalizedPosition:f,position:c(f,p!=null&&m!=null?{x:p,y:m}:null)}}function Ut(e,t){if(!Number.isFinite(e))throw RangeError(`${t} must be a finite number.`);let n=Math.trunc(e);if(n<0)throw RangeError(`${t} must be non-negative.`);return Math.min(n,2**53-1)}function Wt(e,t){if(!Number.isFinite(e))throw RangeError(`${t} must be a finite number.`);let n=Math.trunc(e);if(n<=0)throw RangeError(`${t} must be positive.`);return Math.min(n,2**53-1)}function Gt({particleCount:e,maxBatchItems:t}){let n=Ut(e,`particleCount`),r=Wt(t,`maxBatchItems`),i=[];for(let e=0,t=0;e<n;t+=1){let a=Math.min(n,e+r),o=a-e;i.push({batchIndex:t,startIndex:e,count:o,endExclusive:a,globalIdOffset:e}),e=a}return{particleCount:n,maxBatchItems:r,batchCount:i.length,isBatched:i.length>1,batches:i}}function Kt(e){return e?.id}function qt(e,t){return Array.isArray(t)?t:Array.isArray(e?.points)?e.points:[]}function Jt(e,t){if(!Number.isInteger(e)||e<0||e>=t)throw RangeError(`Batch index ${e} is outside the batch plan.`);return e}function Yt(e,t){if(!Number.isInteger(e)||e<0||e>=t)throw RangeError(`Particle index ${e} is outside the dataset.`);return e}function Xt(e,t){if(Number.isInteger(t))return e.batches[Jt(t,e.batchCount)];if(t&&Number.isInteger(t.batchIndex)){let n=e.batches[Jt(t.batchIndex,e.batchCount)];if(n.startIndex!==t.startIndex||n.count!==t.count||n.endExclusive!==t.endExclusive)throw RangeError(`Batch descriptor ${t.batchIndex} does not match the batch plan.`);return n}throw TypeError(`Batch must be a batch index or descriptor.`)}function Zt(e,t,n){if(t){if(t.particleCount!==e.length)throw RangeError(`Batch plan particle count does not match the dataset.`);return t}return Gt({particleCount:e.length,maxBatchItems:n??Math.max(1,e.length)})}function Qt({dataset:e=null,points:t=null,batchPlan:n=null,maxBatchItems:r=null,getParticleId:i=Kt}={}){let a=qt(e,t),o=Zt(a,n,r),s=typeof i==`function`?i:Kt,c=null;function l(e){return a[Yt(e,a.length)]}function u(e){let t=Yt(e,a.length),n=s(a[t],t);return n==null?null:String(n)}function d(){if(c)return c;c=new Map;for(let e=0;e<a.length;e+=1){let t=s(a[e],e);if(t==null)continue;let n=String(t);c.has(n)||c.set(n,e)}return c}function f(e){return e==null?-1:d().get(String(e))??-1}function p(e){return Xt(o,e)}function m(e){let t=p(e);return a.slice(t.startIndex,t.endExclusive)}function h(e,t){let n=p(e);if(!Number.isInteger(t)||t<0||t>=n.count)throw RangeError(`Batch-local particle index ${t} is outside batch ${n.batchIndex}.`);return n.globalIdOffset+t}return{dataset:e,points:a,particleCount:a.length,featureCount:Array.isArray(e?.featureNames)?e.featureNames.length:0,batchPlan:o,batches:o.batches,getBatchDescriptor:p,getBatchRows:m,getGlobalIndex:h,getParticleByIndex:l,getParticleIdAt:u,getParticleIndexById:f,getParticleById(e){let t=f(e);return t>=0?a[t]:null},hasParticleId(e){return f(e)>=0}}}function V(e){e&&typeof e.destroy==`function`&&e.destroy()}function $t(e){try{V(e)}catch{}}function en({name:e=`webgpu-resource-owner`,release:t=null}={}){let n=String(e||``).trim();if(!n)throw Error(`GPU resource owner requires a non-empty name.`);let r=!1;return{name:n,kind:`gpu-resource-owner`,get released(){return r},release(){r||(r=!0,typeof t==`function`&&t())}}}function tn(e,t,n){let r=Math.max(4,n?.byteLength||0),i=e.createBuffer({label:t,size:r,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return n&&n.byteLength>0&&e.queue.writeBuffer(i,0,n.buffer,n.byteOffset,n.byteLength),i}var nn=Object.freeze([`maxBufferSize`,`maxStorageBufferBindingSize`]),rn=`timestamp-query`;Object.freeze([rn]);function an(e,t=nn){let n={};for(let r of t){let t=Number(e?.[r]);n[r]=Number.isFinite(t)&&t>0?t:null}return n}function on(e,{requestHighBufferLimits:t=!0,names:n=nn}={}){if(!t)return{};let r={};for(let t of n){let n=Number(e?.[t]);Number.isFinite(n)&&n>0&&(r[t]=n)}return r}function sn(e,{requestTimestampQuery:t=!0}={}){let n=[];return t&&e?.has?.(`timestamp-query`)&&n.push(rn),n}function cn({requiredLimits:e={},requiredFeatures:t=[]}={}){let n={};return Object.keys(e).length>0&&(n.requiredLimits=e),t.length>0&&(n.requiredFeatures=t),Object.keys(n).length>0?n:void 0}function ln(e){return Number.isFinite(e)?Math.max(0,Math.min(24,Math.trunc(e))):0}function un(e,t,n){let r=Array.isArray(e)?e:[],i=ln(t),a=new Float32Array(r.length*24);if(r.length===0||i===0||typeof n!=`function`)return a;for(let e=0;e<r.length;e+=1){let t=r[e],o=e*24;for(let r=0;r<i;r+=1){let i=n(t,r,e);a[o+r]=Number.isFinite(i)?i:0}}return a}function dn(e,t){let n=Array.isArray(e)?e:[],r=new Uint32Array(Math.max(1,n.length));if(n.length===0)return r;for(let e=0;e<n.length;e+=1)r[e]=typeof t==`function`&&!t(n[e],e)?0:1;return r}function fn(e,t,n={}){let r=Number.isFinite(n.globalIdOffset)?Math.max(0,Math.trunc(n.globalIdOffset)):0;return{particleCount:Math.max(0,Number.isFinite(e)?Math.trunc(e):0),featureDimensionCount:ln(t),strideBlocks:6,strideScalars:24,globalIdOffset:r}}function pn({batchStore:e,batch:t,featureDimensionCount:n,getFeatureValue:r,getParticleActive:i}){if(!e||typeof e.getBatchDescriptor!=`function`||typeof e.getBatchRows!=`function`)throw Error(`Feature batch packing requires a particle batch store.`);let a=e.getBatchDescriptor(t),o=e.getBatchRows(a);return{descriptor:a,rows:o,packed:un(o,n,(e,t,n)=>{let i=a.globalIdOffset+n;return typeof r==`function`?r(e,t,i,n,a):void 0}),activeMask:dn(o,(e,t)=>{let n=a.globalIdOffset+t;return typeof i==`function`?i(e,n,t,a):!0}),metadata:fn(a.count,n,{globalIdOffset:a.globalIdOffset})}}async function mn(e=globalThis.navigator,{requestHighBufferLimits:t=!0,requestTimestampQuery:n=!0}={}){if(!e?.gpu)return null;let r=await e.gpu.requestAdapter();if(!r)return null;let i=an(r.limits),a=on(r.limits,{requestHighBufferLimits:t}),o=sn(r.features,{requestTimestampQuery:n}),s=cn({requiredLimits:a,requiredFeatures:o}),c=Object.keys(a).length>0;try{let e=await r.requestDevice(s);return{adapter:r,device:e,adapterLimits:i,deviceLimits:an(e.limits),requiredLimits:a,requiredFeatures:o,requiredLimitsError:``}}catch(t){if(!c&&o.length===0)throw t;let r=await e.gpu.requestAdapter();if(!r)throw t;let i=sn(r.features,{requestTimestampQuery:n}),s=await r.requestDevice(cn({requiredFeatures:i}));return{adapter:r,device:s,adapterLimits:an(r.limits),deviceLimits:an(s.limits),requiredLimits:a,requiredFeatures:i,requiredLimitsError:t instanceof Error?t.message:String(t||`unknown required-limits error`)}}}function hn(e){if(e){if(Array.isArray(e.batchResources))for(let t of e.batchResources)hn(t);V(e.featureBuffer),V(e.activeMaskBuffer),V(e.metadataBuffer)}}function gn(e){return new Uint32Array([e.particleCount,e.featureDimensionCount,e.strideBlocks,e.strideScalars])}function _n({device:e,packed:t,activeMask:n,metadata:r,labelPrefix:i}){let a=gn(r),o=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC,s=GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,c=null,l=null,u=null;try{c=e.createBuffer({label:`${i}Buffer`,size:t.byteLength||Float32Array.BYTES_PER_ELEMENT,usage:o}),e.queue.writeBuffer(c,0,t.buffer,t.byteOffset,t.byteLength),l=e.createBuffer({label:`${i}ActiveMaskBuffer`,size:n.byteLength||Uint32Array.BYTES_PER_ELEMENT,usage:o}),e.queue.writeBuffer(l,0,n.buffer,n.byteOffset,n.byteLength),u=e.createBuffer({label:`${i}MetadataBuffer`,size:a.byteLength,usage:s}),e.queue.writeBuffer(u,0,a.buffer,a.byteOffset,a.byteLength)}catch(e){throw V(c),V(l),V(u),e}return{featureBuffer:c,activeMaskBuffer:l,metadataBuffer:u}}function vn({device:e,points:t,featureDimensionCount:n,getFeatureValue:r,getParticleActive:i,labelPrefix:a=`FeatureDataset`}){if(!e)throw Error(`WebGPU device is required to upload feature dataset.`);let o=un(t,n,r),s=dn(t,i),c=fn(t?.length||0,n);return{..._n({device:e,packed:o,activeMask:s,metadata:c,labelPrefix:a}),packed:o,activeMask:s,metadata:c}}async function yn({device:e,batchStore:t=null,dataset:n=null,points:r=null,batchPlan:i=null,maxBatchItems:a=null,featureDimensionCount:o,getFeatureValue:s,getParticleActive:c,labelPrefix:l=`FeatureDatasetBatch`,flushAfterEachBatch:u=!0}){if(!e)return{ok:!1,error:`WebGPU device is required to upload feature dataset batches.`,batchResources:[],batchPlan:null,metadata:null};let d=null,f=[];try{d=t||Qt({dataset:n,points:r,batchPlan:i,maxBatchItems:a});for(let t of d.batches){let n=pn({batchStore:d,batch:t,featureDimensionCount:o,getFeatureValue:s,getParticleActive:c}),r=_n({device:e,packed:n.packed,activeMask:n.activeMask,metadata:n.metadata,labelPrefix:`${l}${t.batchIndex}`});f.push({...r,descriptor:n.descriptor,packedByteLength:n.packed.byteLength,activeMaskByteLength:n.activeMask.byteLength,metadata:n.metadata}),u&&typeof e.queue?.onSubmittedWorkDone==`function`?await e.queue.onSubmittedWorkDone():await Promise.resolve()}return{ok:!0,batchResources:f,batchPlan:d.batchPlan,metadata:{particleCount:d.particleCount,featureDimensionCount:ln(o),strideBlocks:6,strideScalars:24,batchCount:d.batchPlan.batchCount,maxBatchItems:d.batchPlan.maxBatchItems}}}catch(e){for(let e of f)hn(e);return{ok:!1,error:e instanceof Error?e.message:String(e),failedBatchIndex:f.length,batchResources:[],batchPlan:d?.batchPlan||null,metadata:d?{particleCount:d.particleCount,featureDimensionCount:ln(o),strideBlocks:6,strideScalars:24,batchCount:d.batchPlan.batchCount,maxBatchItems:d.batchPlan.maxBatchItems}:null}}}var bn=1e-4;function xn(){return[{position:0,colorHex:`#000000`},{position:1,colorHex:`#ffffff`}]}function Sn(){return[{min:0,max:1,startColorHex:`#000000`,endColorHex:`#ffffff`}]}function Cn(e=1,t=`Default`){return{id:e,name:t,fallbackColorHex:`#000000`,intervals:Sn()}}function wn(e){return En(e).map(e=>({...e}))}function Tn(e){let t=On(e),n=[];for(let e of t.intervals)n.push({position:e.min,colorHex:e.startColorHex}),n.push({position:e.max,colorHex:e.endColorHex});return n.length===0?xn():En(n)}function En(e,t=xn()){let n=(Array.isArray(e)&&e.length>0?e:t).map(e=>{let t=Number.parseFloat(e?.position),n=C(e?.colorHex,``);return!Number.isFinite(t)||!n?null:{position:Math.max(0,Math.min(1,t)),colorHex:n}}).filter(Boolean).sort((e,t)=>e.position-t.position);if(n.length===0)return xn();if(n.length===1){let e=n[0];return e.position<=.5?[{position:e.position,colorHex:e.colorHex},{position:1,colorHex:e.colorHex}]:[{position:0,colorHex:e.colorHex},{position:e.position,colorHex:e.colorHex}]}for(let e=1;e<n.length;e+=1)n[e].position<=n[e-1].position&&(n[e].position=Math.min(1,n[e-1].position+bn));for(let e=n.length-2;e>=0;--e)n[e].position>=n[e+1].position&&(n[e].position=Math.max(0,n[e+1].position-bn));return n}function Dn(t,n=Sn()){let r=(Array.isArray(t)&&t.length>0?t:n).map(t=>{let n=e(t?.min??t?.start??t?.a??0),r=e(t?.max??t?.end??t?.b??1);return n<=r?{min:n,max:r,startColorHex:C(t?.startColorHex??t?.color0Hex??t?.colorHex??`#000000`),endColorHex:C(t?.endColorHex??t?.color1Hex??t?.colorHex??`#ffffff`)}:null}).filter(Boolean).sort((e,t)=>e.min-t.min||e.max-t.max);if(r.length===0)return Sn();let i=[];for(let e of r){let t=i[i.length-1];t&&e.min<t.max-bn||i.push(e)}return i}function On(e,t=Cn()){let n=e&&typeof e==`object`?e:t,r=t&&typeof t==`object`?t:Cn(),i=Number.parseInt(String(n.id??r.id??1),10),a=String(n.name||r.name||`Color Ramp`).trim()||`Color Ramp`,o=C(n.fallbackColorHex??r.fallbackColorHex??`#000000`),s=Dn(n.intervals,Array.isArray(r.intervals)?r.intervals:Sn());return{id:Number.isInteger(i)&&i>0?i:1,name:a,fallbackColorHex:o,intervals:s}}function kn(e){let t=Array.isArray(e)&&e.length>0?e:[Cn()],n=new Set,r=1,i=t.map(e=>{let t=On(e,Cn(r)),i=t.id;for(;n.has(i);)i+=1;return n.add(i),r=Math.max(r,i+1),{...t,id:i}});return i.length>0?i:[Cn()]}function An(e){let t=On(e);return{...t,intervals:t.intervals.map(e=>({...e}))}}function jn(e){return kn(e).map(An)}function Mn(e,t=xn()){let n=String(e||``).trim();if(!n)return En(t);try{return En(JSON.parse(n),t)}catch{return En(t)}}var Nn=4,Pn=2147483647,Fn=-2147483648;function In(e){e&&(V(e.weightsBuffer),V(e.layerZBuffer),V(e.positionsBuffer),V(e.readbackBuffer),V(e.activeMaskReadbackBuffer),V(e.filterOwnerBuffer),V(e.filterOwnerReadbackBuffer),V(e.sizesBuffer),V(e.sizesReadbackBuffer),V(e.colorsBuffer),V(e.colorsReadbackBuffer),V(e.boundsBuffer),V(e.magnetBuffer),V(e.paramsBuffer),V(e.sizeParamsBuffer))}function Ln(e){return Math.max(16,e*4*Float32Array.BYTES_PER_ELEMENT)}function Rn(e){return Math.max(16,e*Nn*4*Float32Array.BYTES_PER_ELEMENT)}function zn(e){return Math.max(Uint32Array.BYTES_PER_ELEMENT,e*Uint32Array.BYTES_PER_ELEMENT)}function Bn(e){return Math.max(Float32Array.BYTES_PER_ELEMENT,e*Float32Array.BYTES_PER_ELEMENT)}function Vn(e){return Math.max(4*Float32Array.BYTES_PER_ELEMENT,e*4*Float32Array.BYTES_PER_ELEMENT)}function Hn(){return 4*Int32Array.BYTES_PER_ELEMENT}function Un(){return new Int32Array([Pn,Pn,Fn,Fn])}function Wn(e){let t=e||globalThis.GPUBufferUsage;if(!t)throw Error(`GPU placement resources require GPUBufferUsage.`);return t}function Gn(e,t,n,r){return e.createBuffer({label:t,size:n,usage:r})}function Kn(e,t){return e.createComputePipeline({layout:`auto`,compute:{module:e.createShaderModule({code:t}),entryPoint:`main`}})}function qn(e,t,n=null){if(!n||typeof n.get!=`function`||typeof n.set!=`function`)return Kn(e,t);let r=String(t||``),i=n.get(r);if(i)return i;let a=Kn(e,t);return n.set(r,a),a}function Jn({device:e,previousResources:t,particleCount:n,semanticsSignature:r,weightShaderSource:i,filterSemanticsSignature:a=``,filterShaderSource:o=``,sizeSemanticsSignature:s=``,sizeShaderSource:c=``,layerSemanticsSignature:l=``,layerShaderSource:u=``,qSemanticsSignature:d=``,qShaderSource:f=``,qUsesFeatureBuffer:p=!1,allocateReadbackBuffers:m=!0,maxMagnetCount:h,boundsShaderSource:g,createDefaultLayerDescriptor:_,buildLayoutShaderSource:v,buildQShaderSource:y,gpuBufferUsage:b=null,pipelineCache:x=null}){if(!e)throw Error(`GPU placement resources require a WebGPU device.`);if(!Number.isInteger(h)||h<=0)throw Error(`GPU placement resources require a positive max magnet count.`);if(typeof _!=`function`||typeof v!=`function`||typeof y!=`function`)throw Error(`GPU placement resources require layout shader dependency functions.`);let S=Wn(b),ee=u?null:_(),C=l||ee?.semanticsSignature||``,w=u||v(ee),te=d||C,T=f||y(ee),ne=!!p||/@binding\(6\)/.test(T),E=m!==!1,D=!!t&&t.allocateReadbackBuffers!==E,O=!t||t.particleCount!==n||!t.layerZBuffer||D,k=!t||t.semanticsSignature!==r,re=!!o&&(!t||t.filterSemanticsSignature!==a),ie=!!c&&(!t||t.sizeSemanticsSignature!==s),A=!t||t.layerSemanticsSignature!==C,j=!t||t.qSemanticsSignature!==te,M=t||null;return(!M||O)&&(M&&In(M),M={particleCount:n,maxMagnetCount:h,allocateReadbackBuffers:E,semanticsSignature:``,weightShaderSource:``,weightsValid:!1,weightsSignature:``,filterSemanticsSignature:``,filterShaderSource:``,sizeSemanticsSignature:``,sizeShaderSource:``,layerSemanticsSignature:``,layerShaderSource:``,qSemanticsSignature:``,qShaderSource:``,qUsesFeatureBuffer:!1,layerZValid:!1,weightPipeline:null,filterPipeline:null,sizePipeline:null,layerPipeline:null,qPipeline:null,weightsBuffer:Gn(e,`GpuPlacementWeightsBuffer`,Rn(n),S.STORAGE|S.COPY_SRC),layerZBuffer:Gn(e,`GpuPlacementLayerZBuffer`,Bn(n),S.STORAGE|S.COPY_SRC),positionsBuffer:Gn(e,`GpuPlacementPositionsBuffer`,Ln(n),S.STORAGE|S.COPY_SRC),readbackBuffer:E?Gn(e,`GpuPlacementReadbackBuffer`,Ln(n),S.COPY_DST|S.MAP_READ):null,activeMaskReadbackBuffer:E?Gn(e,`GpuPlacementActiveMaskReadbackBuffer`,zn(n),S.COPY_DST|S.MAP_READ):null,filterOwnerBuffer:Gn(e,`GpuPlacementFilterOwnerBuffer`,zn(n),S.STORAGE|S.COPY_SRC),filterOwnerReadbackBuffer:E?Gn(e,`GpuPlacementFilterOwnerReadbackBuffer`,zn(n),S.COPY_DST|S.MAP_READ):null,sizesBuffer:Gn(e,`GpuPlacementSizesBuffer`,Bn(n),S.STORAGE|S.COPY_SRC),sizesReadbackBuffer:E?Gn(e,`GpuPlacementSizesReadbackBuffer`,Bn(n),S.COPY_DST|S.MAP_READ):null,colorsBuffer:Gn(e,`GpuPlacementColorsBuffer`,Vn(n),S.STORAGE|S.COPY_SRC),colorsReadbackBuffer:E?Gn(e,`GpuPlacementColorsReadbackBuffer`,Vn(n),S.COPY_DST|S.MAP_READ):null,boundsBuffer:Gn(e,`GpuPlacementBoundsBuffer`,Hn(),S.STORAGE|S.COPY_DST),magnetBuffer:Gn(e,`GpuPlacementMagnetBuffer`,h*4*Float32Array.BYTES_PER_ELEMENT,S.STORAGE|S.COPY_DST),paramsBuffer:Gn(e,`GpuPlacementParamsBuffer`,32,S.UNIFORM|S.COPY_DST),sizeParamsBuffer:Gn(e,`GpuPlacementSizeParamsBuffer`,80,S.UNIFORM|S.COPY_DST)}),(j||!M.qPipeline)&&(M.qPipeline=qn(e,T,x),M.qSemanticsSignature=te,M.qShaderSource=T,M.qUsesFeatureBuffer=ne),M.boundsPipeline||=qn(e,g,x),k&&(M.weightPipeline=qn(e,i,x),M.semanticsSignature=r,M.weightShaderSource=i,M.weightsValid=!1,M.weightsSignature=``),o?re&&(M.filterPipeline=qn(e,o,x),M.filterSemanticsSignature=a,M.filterShaderSource=o):(M.filterPipeline=null,M.filterSemanticsSignature=``,M.filterShaderSource=``),c?ie&&(M.sizePipeline=qn(e,c,x),M.sizeSemanticsSignature=s,M.sizeShaderSource=c):(M.sizePipeline=null,M.sizeSemanticsSignature=``,M.sizeShaderSource=``),A&&(M.layerPipeline=qn(e,w,x),M.layerSemanticsSignature=C,M.layerShaderSource=w,M.layerZValid=!1),M.particleCount=n,M}function Yn(e){let t=new Uint32Array(Math.max(1,Number.isInteger(e)&&e>0?e:0));return t.fill(1),t}function Xn(e,t,n){if(!e?.queue||typeof e.queue.writeBuffer!=`function`)throw Error(`Active-mask reset requires a WebGPU device queue.`);if(!t)throw Error(`Active-mask reset requires an active-mask GPU buffer.`);let r=Yn(n);return e.queue.writeBuffer(t,0,r.buffer,r.byteOffset,r.byteLength),{particleCount:Number.isInteger(n)&&n>0?n:0,byteLength:r.byteLength}}var Zn=new Set([`info`,`warning`,`error`]),Qn=new Set([`cpu`,`gpu`,`mixed`,`unknown`]),$n=new Set([`setup`,`measured`,`overhead`]),er=new Set([`normal`,`bypass`,`refresh`,`read-only`]);function tr(e){return!!e&&typeof e==`object`&&!Array.isArray(e)}function H(e,t=``){return String(e||``).trim()||t}function U(e){return Array.isArray(e)?e.slice():[]}function nr(e,t=1){let n=Number(e);return Number.isFinite(n)&&n>0?Math.max(1,Math.trunc(n)):t}function W(e,t){if(!e)throw Error(t)}function rr(e){return e==null?`null`:typeof e==`number`?Number.isFinite(e)?String(e):`null`:typeof e==`string`||typeof e==`boolean`?JSON.stringify(e):Array.isArray(e)?`[${e.map(e=>rr(e)).join(`,`)}]`:tr(e)?`{${Object.keys(e).sort((e,t)=>e.localeCompare(t)).map(t=>`${JSON.stringify(t)}:${rr(e[t])}`).join(`,`)}}`:JSON.stringify(String(e))}function ir(e,t={}){let n=H(e,`invalid`),r=tr(t)||Array.isArray(t)?t:{value:t};return{name:n,parts:r,signature:`${n}:${rr(r)}`}}function ar(e,t=`invalidationKey`){return W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`),W(typeof e.signature==`string`&&e.signature.length>0,`${t}.signature is required.`),e}function or({severity:e=`info`,code:t=`diagnostic`,message:n=``,stageName:r=``,details:i=null}={}){return{severity:Zn.has(String(e||``).trim())?String(e).trim():`info`,code:H(t,`diagnostic`),message:String(n||``),stageName:H(r),details:i}}function sr(e,t,n={}){return or({...n,severity:`warning`,code:e,message:t})}function cr(e,t=`diagnostic`){return W(tr(e),`${t} must be an object.`),W(Zn.has(e.severity),`${t}.severity is invalid.`),W(!!H(e.code),`${t}.code is required.`),W(typeof e.message==`string`,`${t}.message must be a string.`),e}function lr({name:e,stageName:t=``,startMs:n=null,endMs:r=null,durationMs:i=null,details:a=null}={}){let o=Number.isFinite(i)?Math.max(0,Number(i)):Number.isFinite(n)&&Number.isFinite(r)?Math.max(0,Number(r)-Number(n)):0;return{name:H(e,`timing`),stageName:H(t),startMs:Number.isFinite(n)?Number(n):null,endMs:Number.isFinite(r)?Number(r):null,durationMs:o,details:a}}function ur(e,t=`timing`){return W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`),W(Number.isFinite(e.durationMs)&&e.durationMs>=0,`${t}.durationMs must be non-negative.`),e}function dr({role:e=`measured`,trackMemory:t=!0,memoryResidency:n=`unknown`,traceTiming:r=!0,iterations:i=1,waitForCompletion:a=!1,cacheMode:o=`normal`,includeInMeasurementReport:s=!0}={}){let c=Qn.has(String(n||``).trim())?String(n).trim():`unknown`,l=$n.has(String(e||``).trim())?String(e).trim():`measured`,u=er.has(String(o||``).trim())?String(o).trim():`normal`;return{role:l,trackMemory:!!t,memoryResidency:c,traceTiming:!!r,iterations:l===`setup`?1:nr(i),waitForCompletion:a,cacheMode:u,includeInMeasurementReport:!!s}}function fr(e,t=`assessment`){return W(tr(e),`${t} must be an object.`),W($n.has(e.role),`${t}.role is invalid.`),W(typeof e.trackMemory==`boolean`,`${t}.trackMemory must be a boolean.`),W(Qn.has(e.memoryResidency),`${t}.memoryResidency is invalid.`),W(typeof e.traceTiming==`boolean`,`${t}.traceTiming must be a boolean.`),W(Number.isInteger(e.iterations)&&e.iterations>0,`${t}.iterations must be a positive integer.`),W(typeof e.waitForCompletion==`boolean`||typeof e.waitForCompletion==`function`,`${t}.waitForCompletion must be a boolean or function.`),W(er.has(e.cacheMode),`${t}.cacheMode is invalid.`),W(typeof e.includeInMeasurementReport==`boolean`,`${t}.includeInMeasurementReport must be a boolean.`),e}function pr({name:e,kind:t=`module`,modulePath:n=``,cleanup:r=null}={}){return{name:H(e,`owner`),kind:H(t,`module`),modulePath:H(n),cleanup:r}}function mr(e,t=`owner`){return W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`),W(!!H(e.kind),`${t}.kind is required.`),e}function G({name:e,kind:t=`value`,source:n=``,required:r=!0,description:i=``}={}){return{name:H(e,`input`),kind:H(t,`value`),source:H(n),required:!!r,description:String(i||``)}}function K({name:e,kind:t=`value`,target:n=``,lifetime:r=`transient`,owner:i=null,description:a=``}={}){return{name:H(e,`output`),kind:H(t,`value`),target:H(n),lifetime:H(r,`transient`),owner:i,description:String(a||``)}}function q({name:e,kind:t=`value`,owner:n=null,description:r=``}={}){return{name:H(e,`artifact`),kind:H(t,`value`),owner:n,description:String(r||``)}}function J({stageName:e,artifactName:t=``,required:n=!0}={}){return{stageName:H(e,`stage`),artifactName:H(t),required:!!n}}function hr(e,t=`port`){return W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`),W(!!H(e.kind),`${t}.kind is required.`),e}function gr(e,t=`input`){return hr(e,t)}function _r(e,t=`output`){return hr(e,t),e.owner!=null&&mr(e.owner,`${t}.owner`),e}function vr(e,t=`artifact`){return hr(e,t),e.owner!=null&&mr(e.owner,`${t}.owner`),e}function yr(e,t=`dependency`){return W(tr(e),`${t} must be an object.`),W(!!H(e.stageName),`${t}.stageName is required.`),e}function br({name:e,label:t=``,phase:n=``,inputs:r=[],outputs:i=[],artifacts:a=[],dependencies:o=[],invalidationKey:s=null,resolveInvalidationKey:c=null,execute:l=null,diagnostics:u=[],timings:d=[],owner:f=null,assessment:p=null}={}){return{name:H(e,`stage`),label:H(t),phase:H(n),inputs:U(r),outputs:U(i),artifacts:U(a),dependencies:U(o),invalidationKey:s,resolveInvalidationKey:c,execute:l,diagnostics:U(u),timings:U(d),owner:f,assessment:p==null?null:dr(p)}}function xr(e,t=`stage`){W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`);for(let n=0;n<U(e.inputs).length;n+=1)gr(e.inputs[n],`${t}.inputs[${n}]`);for(let n=0;n<U(e.outputs).length;n+=1)_r(e.outputs[n],`${t}.outputs[${n}]`);for(let n=0;n<U(e.artifacts).length;n+=1)vr(e.artifacts[n],`${t}.artifacts[${n}]`);for(let n=0;n<U(e.dependencies).length;n+=1)yr(e.dependencies[n],`${t}.dependencies[${n}]`);e.invalidationKey!=null&&ar(e.invalidationKey,`${t}.invalidationKey`),e.resolveInvalidationKey!=null&&W(typeof e.resolveInvalidationKey==`function`,`${t}.resolveInvalidationKey must be a function when present.`),e.owner!=null&&mr(e.owner,`${t}.owner`),e.assessment!=null&&fr(e.assessment,`${t}.assessment`),e.execute!=null&&W(typeof e.execute==`function`,`${t}.execute must be a function when present.`);for(let n=0;n<U(e.diagnostics).length;n+=1)cr(e.diagnostics[n],`${t}.diagnostics[${n}]`);for(let n=0;n<U(e.timings).length;n+=1)ur(e.timings[n],`${t}.timings[${n}]`);return e}function Sr({name:e,stages:t=[]}={}){return{name:H(e,`phase`),stages:U(t)}}function Cr(e,t=`phase`){W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`);for(let n=0;n<U(e.stages).length;n+=1)xr(e.stages[n],`${t}.stages[${n}]`);return e}function wr({name:e,phases:t=[],stages:n=[]}={}){return{name:H(e,`pipeline`),phases:U(t),stages:U(n)}}function Tr(e,t=`pipeline`){W(tr(e),`${t} must be an object.`),W(!!H(e.name),`${t}.name is required.`);for(let n=0;n<U(e.phases).length;n+=1)Cr(e.phases[n],`${t}.phases[${n}]`);for(let n=0;n<U(e.stages).length;n+=1)xr(e.stages[n],`${t}.stages[${n}]`);return e}function Er(e=null,{diagnostics:t=[],timings:n=[]}={}){return{ok:!0,value:e,diagnostics:U(t),timings:U(n)}}function Dr(e,{diagnostics:t=[],timings:n=[]}={}){return{ok:!1,error:e instanceof Error?e.message:String(e||`Unknown error`),diagnostics:U(t),timings:U(n)}}var Or=`particle-magnets-webgpu`,kr=Object.freeze({DATA:`data`,PREPARATION:`preparation`,PLACEMENT:`placement`,SCENE:`scene`,INTERACTION:`interaction`}),Y=Object.freeze({DATASET_NORMALIZATION:`dataset-normalization`,FEATURE_PROJECTION:`feature-projection`,FEATURE_UPLOAD:`feature-upload`,MAGNET_DESCRIPTOR_PREPARATION:`magnet-descriptor-preparation`,WEIGHT_PASS:`w-pass`,FILTER_MASK_PASS:`filter-mask-pass`,LAYOUT_PASS:`layout-pass`,PLACEMENT_PASS:`q-pass`,VISUAL_MAPPING_PASS:`sc-pass`,BOUNDS_PASS:`bounds-pass`,DENSITY_SHADOW_PREPARATION:`density-shadow-preparation`,SCENE_COMPOSITION:`scene-composition`,RENDER_PASS:`render-pass`,PICK_PASS:`pick-pass`,INTERACTION_FEEDBACK:`interaction-feedback`}),X=Object.freeze({persistence:pr({name:`persistence`,kind:`module`,modulePath:`src/persistence/`}),core:pr({name:`core`,kind:`module`,modulePath:`src/core/`}),featureStore:pr({name:`feature-gpu-store`,kind:`module`,modulePath:`src/engine/webgpu/featureGpuStore.js`}),placement:pr({name:`gpu-placement`,kind:`module`,modulePath:`src/engine/webgpu/gpuPlacement.js`}),renderer:pr({name:`gpu-renderer`,kind:`module`,modulePath:`src/engine/webgpu/gpuRenderer.js`}),adapter:pr({name:`gpu-prototype-engine-adapter`,kind:`module`,modulePath:`src/engine/gpuPrototypeEngineAdapter.js`})});function Ar(e,t={}){return ir(e,t)}function jr(e){return e===kr.DATA?`cpu`:`gpu`}function Mr(e){return xr(br({...e,assessment:{trackMemory:!0,memoryResidency:jr(e?.phase),traceTiming:!0,iterations:1,waitForCompletion:!1,...e?.assessment||{}}}))}function Nr(){return[Mr({name:Y.DATASET_NORMALIZATION,phase:kr.DATA,inputs:[G({name:`csvText`,kind:`text`,source:`file-api`}),G({name:`projectJson`,kind:`object`,source:`file-api`,required:!1})],outputs:[K({name:`projectState`,kind:`product-state`}),K({name:`parserWarnings`,kind:`diagnostics`})],artifacts:[q({name:`parsedSchemaV2`,kind:`product-state`,owner:X.persistence})],invalidationKey:Ar(Y.DATASET_NORMALIZATION,{csvTextVersion:`input`,projectJsonVersion:`input`}),owner:X.persistence,assessment:{role:`setup`,cacheMode:`normal`}}),Mr({name:Y.FEATURE_PROJECTION,phase:kr.DATA,inputs:[G({name:`projectState`,kind:`product-state`,source:Y.DATASET_NORMALIZATION}),G({name:`categoryDescriptors`,kind:`product-state`,required:!1})],outputs:[K({name:`featureMatrix`,kind:`array`}),K({name:`featureMetadata`,kind:`metadata`})],artifacts:[q({name:`derivedFeatureDimensions`,kind:`array`,owner:X.core})],dependencies:[J({stageName:Y.DATASET_NORMALIZATION,artifactName:`parsedSchemaV2`})],invalidationKey:Ar(Y.FEATURE_PROJECTION,{datasetVersion:`input`,categoryDescriptorSignature:`input`}),owner:X.core,assessment:{role:`setup`,cacheMode:`normal`}}),Mr({name:Y.FEATURE_UPLOAD,phase:kr.PREPARATION,inputs:[G({name:`featureMatrix`,kind:`array`,source:Y.FEATURE_PROJECTION}),G({name:`activeMask`,kind:`array`,required:!1}),G({name:`device`,kind:`webgpu-device`})],outputs:[K({name:`featureBuffer`,kind:`gpu-buffer`}),K({name:`activeMaskBuffer`,kind:`gpu-buffer`}),K({name:`featureGpuMetadata`,kind:`metadata`})],artifacts:[q({name:`featureGpuResources`,kind:`gpu-resources`,owner:X.featureStore})],dependencies:[J({stageName:Y.FEATURE_PROJECTION,artifactName:`derivedFeatureDimensions`})],invalidationKey:Ar(Y.FEATURE_UPLOAD,{featureMatrixVersion:`input`,particleCount:`input`,featureDimensionCount:`input`}),owner:X.featureStore,assessment:{role:`setup`,cacheMode:`normal`}}),Mr({name:Y.MAGNET_DESCRIPTOR_PREPARATION,phase:kr.PREPARATION,inputs:[G({name:`sourceMagnets`,kind:`product-state`}),G({name:`filterMagnets`,kind:`product-state`,required:!1}),G({name:`activeLayout`,kind:`product-state`}),G({name:`particleMapping`,kind:`product-state`}),G({name:`featureGpuMetadata`,kind:`metadata`,source:Y.FEATURE_UPLOAD})],outputs:[K({name:`placementDescriptors`,kind:`descriptor`}),K({name:`filterDescriptors`,kind:`descriptor`}),K({name:`layoutDescriptor`,kind:`descriptor`}),K({name:`visualMappingDescriptor`,kind:`descriptor`}),K({name:`shaderSources`,kind:`shader-source`})],artifacts:[q({name:`descriptorState`,kind:`descriptor-state`,owner:X.placement})],dependencies:[J({stageName:Y.FEATURE_UPLOAD,artifactName:`featureGpuResources`})],invalidationKey:Ar(Y.MAGNET_DESCRIPTOR_PREPARATION,{magnetSignature:`input`,filterSignature:`input`,layoutSignature:`input`,particleMappingSignature:`input`}),owner:X.placement}),Mr({name:Y.FILTER_MASK_PASS,phase:kr.PLACEMENT,inputs:[G({name:`featureBuffer`,kind:`gpu-buffer`,source:Y.FEATURE_UPLOAD}),G({name:`filterDescriptors`,kind:`descriptor`,source:Y.MAGNET_DESCRIPTOR_PREPARATION})],outputs:[K({name:`activeMaskBuffer`,kind:`gpu-buffer`}),K({name:`filterOwnerBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`activeMaskBuffer`,kind:`gpu-buffer`,owner:X.featureStore}),q({name:`filterOwnerBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.FEATURE_UPLOAD,artifactName:`featureGpuResources`}),J({stageName:Y.MAGNET_DESCRIPTOR_PREPARATION,artifactName:`descriptorState`})],invalidationKey:Ar(Y.FILTER_MASK_PASS,{filterSemanticsSignature:`input`,featureMatrixVersion:`input`}),owner:X.placement}),Mr({name:Y.WEIGHT_PASS,phase:kr.PLACEMENT,inputs:[G({name:`featureBuffer`,kind:`gpu-buffer`,source:Y.FEATURE_UPLOAD}),G({name:`placementDescriptors`,kind:`descriptor`,source:Y.MAGNET_DESCRIPTOR_PREPARATION})],outputs:[K({name:`weightsBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`weightsBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.FEATURE_UPLOAD,artifactName:`featureGpuResources`}),J({stageName:Y.MAGNET_DESCRIPTOR_PREPARATION,artifactName:`descriptorState`})],invalidationKey:Ar(Y.WEIGHT_PASS,{semanticsSignature:`input`,particleCount:`input`,noiseSeed:`input`}),owner:X.placement}),Mr({name:Y.LAYOUT_PASS,phase:kr.PLACEMENT,inputs:[G({name:`featureBuffer`,kind:`gpu-buffer`,source:Y.FEATURE_UPLOAD}),G({name:`layoutDescriptor`,kind:`descriptor`,source:Y.MAGNET_DESCRIPTOR_PREPARATION})],outputs:[K({name:`layerZBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`layerZBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.FEATURE_UPLOAD,artifactName:`featureGpuResources`}),J({stageName:Y.MAGNET_DESCRIPTOR_PREPARATION,artifactName:`descriptorState`})],invalidationKey:Ar(Y.LAYOUT_PASS,{layoutSemanticsSignature:`input`,featureMatrixVersion:`input`}),owner:X.placement}),Mr({name:Y.PLACEMENT_PASS,phase:kr.PLACEMENT,inputs:[G({name:`weightsBuffer`,kind:`gpu-buffer`,source:Y.WEIGHT_PASS,required:!1}),G({name:`layerZBuffer`,kind:`gpu-buffer`,source:Y.LAYOUT_PASS}),G({name:`activeMaskBuffer`,kind:`gpu-buffer`,source:Y.FILTER_MASK_PASS}),G({name:`placementParameters`,kind:`uniform-data`})],outputs:[K({name:`positionsBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`positionsBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.WEIGHT_PASS,artifactName:`weightsBuffer`,required:!1}),J({stageName:Y.FILTER_MASK_PASS,artifactName:`activeMaskBuffer`}),J({stageName:Y.LAYOUT_PASS,artifactName:`layerZBuffer`})],invalidationKey:Ar(Y.PLACEMENT_PASS,{qSemanticsSignature:`input`,placementParameters:`input`,activeMaskVersion:`input`}),owner:X.placement}),Mr({name:Y.BOUNDS_PASS,phase:kr.PLACEMENT,inputs:[G({name:`positionsBuffer`,kind:`gpu-buffer`,source:Y.PLACEMENT_PASS}),G({name:`activeMaskBuffer`,kind:`gpu-buffer`,source:Y.FILTER_MASK_PASS})],outputs:[K({name:`boundsBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`boundsBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.PLACEMENT_PASS,artifactName:`positionsBuffer`})],invalidationKey:Ar(Y.BOUNDS_PASS,{positionsVersion:`input`,activeMaskVersion:`input`}),owner:X.placement}),Mr({name:Y.VISUAL_MAPPING_PASS,phase:kr.PLACEMENT,inputs:[G({name:`featureBuffer`,kind:`gpu-buffer`,source:Y.FEATURE_UPLOAD}),G({name:`activeMaskBuffer`,kind:`gpu-buffer`,source:Y.FILTER_MASK_PASS}),G({name:`visualMappingDescriptor`,kind:`descriptor`,source:Y.MAGNET_DESCRIPTOR_PREPARATION})],outputs:[K({name:`sizesBuffer`,kind:`gpu-buffer`}),K({name:`colorsBuffer`,kind:`gpu-buffer`})],artifacts:[q({name:`sizesBuffer`,kind:`gpu-buffer`,owner:X.placement}),q({name:`colorsBuffer`,kind:`gpu-buffer`,owner:X.placement})],dependencies:[J({stageName:Y.FEATURE_UPLOAD,artifactName:`featureGpuResources`}),J({stageName:Y.FILTER_MASK_PASS,artifactName:`activeMaskBuffer`})],invalidationKey:Ar(Y.VISUAL_MAPPING_PASS,{sizeSemanticsSignature:`input`,colorSemanticsSignature:`input`,alphaSemanticsSignature:`input`}),owner:X.placement}),Mr({name:Y.DENSITY_SHADOW_PREPARATION,phase:kr.SCENE,inputs:[G({name:`positionsBuffer`,kind:`gpu-buffer`,source:Y.PLACEMENT_PASS}),G({name:`sizesBuffer`,kind:`gpu-buffer`,source:Y.VISUAL_MAPPING_PASS}),G({name:`colorsBuffer`,kind:`gpu-buffer`,source:Y.VISUAL_MAPPING_PASS}),G({name:`camera`,kind:`render-state`})],outputs:[K({name:`densityTexture`,kind:`gpu-texture`}),K({name:`shadowDensityTexture`,kind:`gpu-texture`})],artifacts:[q({name:`densityTexture`,kind:`gpu-texture`,owner:X.renderer}),q({name:`shadowDensityTexture`,kind:`gpu-texture`,owner:X.renderer})],dependencies:[J({stageName:Y.PLACEMENT_PASS,artifactName:`positionsBuffer`}),J({stageName:Y.VISUAL_MAPPING_PASS,artifactName:`sizesBuffer`})],invalidationKey:Ar(Y.DENSITY_SHADOW_PREPARATION,{positionsVersion:`input`,visualMappingVersion:`input`,cameraVersion:`input`,densitySettingsSignature:`input`}),owner:X.renderer}),Mr({name:Y.SCENE_COMPOSITION,phase:kr.SCENE,inputs:[G({name:`renderBuffers`,kind:`gpu-resources`}),G({name:`magnets`,kind:`product-state`}),G({name:`activeLayout`,kind:`product-state`}),G({name:`labels`,kind:`ui-state`,required:!1})],outputs:[K({name:`sceneResources`,kind:`gpu-resources`})],artifacts:[q({name:`sceneResources`,kind:`gpu-resources`,owner:X.renderer})],dependencies:[J({stageName:Y.BOUNDS_PASS,artifactName:`boundsBuffer`}),J({stageName:Y.DENSITY_SHADOW_PREPARATION,artifactName:`densityTexture`,required:!1})],invalidationKey:Ar(Y.SCENE_COMPOSITION,{renderBufferVersion:`input`,sceneStateSignature:`input`}),owner:X.renderer}),Mr({name:Y.RENDER_PASS,phase:kr.SCENE,inputs:[G({name:`sceneResources`,kind:`gpu-resources`,source:Y.SCENE_COMPOSITION}),G({name:`camera`,kind:`render-state`}),G({name:`canvasSize`,kind:`render-state`})],outputs:[K({name:`framebuffer`,kind:`canvas-frame`})],artifacts:[q({name:`framebuffer`,kind:`canvas-frame`,owner:X.renderer})],dependencies:[J({stageName:Y.SCENE_COMPOSITION,artifactName:`sceneResources`})],invalidationKey:Ar(Y.RENDER_PASS,{sceneResourcesVersion:`input`,cameraVersion:`input`,canvasSize:`input`}),owner:X.renderer}),Mr({name:Y.PICK_PASS,phase:kr.INTERACTION,inputs:[G({name:`renderBuffers`,kind:`gpu-resources`}),G({name:`camera`,kind:`render-state`}),G({name:`pickRequest`,kind:`interaction-state`})],outputs:[K({name:`pickResult`,kind:`interaction-result`})],artifacts:[q({name:`pickResult`,kind:`interaction-result`,owner:X.renderer})],dependencies:[J({stageName:Y.PLACEMENT_PASS,artifactName:`positionsBuffer`}),J({stageName:Y.VISUAL_MAPPING_PASS,artifactName:`sizesBuffer`})],invalidationKey:Ar(Y.PICK_PASS,{renderBufferVersion:`input`,cameraVersion:`input`,pickRequest:`input`}),owner:X.renderer}),Mr({name:Y.INTERACTION_FEEDBACK,phase:kr.INTERACTION,inputs:[G({name:`pickResult`,kind:`interaction-result`,source:Y.PICK_PASS}),G({name:`uiState`,kind:`ui-state`})],outputs:[K({name:`selectionState`,kind:`ui-state`}),K({name:`protocolMessages`,kind:`diagnostics`})],artifacts:[q({name:`selectionState`,kind:`ui-state`,owner:X.adapter}),q({name:`protocolMessages`,kind:`diagnostics`,owner:X.adapter})],dependencies:[J({stageName:Y.PICK_PASS,artifactName:`pickResult`})],invalidationKey:Ar(Y.INTERACTION_FEEDBACK,{pickResultVersion:`input`,selectionVersion:`input`}),owner:X.adapter})]}Object.freeze(Nr());function Pr(){let e=Nr(),t=new Map;for(let n of e){let e=n.phase||kr.PREPARATION;t.has(e)||t.set(e,[]),t.get(e).push(n)}return Tr(wr({name:Or,phases:Object.values(kr).map(e=>Sr({name:e,stages:t.get(e)||[]})),stages:e}))}Object.freeze(Pr());var Fr=Object.freeze({CPU_SETUP:`gpu-placement-cpu-setup`,COMMAND_ENCODING:`gpu-placement-command-encoding`});function Ir(e=null){return typeof e==`function`?e:e&&typeof e.now==`function`?()=>e.now():globalThis.performance&&typeof globalThis.performance.now==`function`?()=>globalThis.performance.now():()=>Date.now()}function Lr({clock:e=null}={}){let t=Ir(e),n=[];function r({name:e,stageName:r=Y.PLACEMENT_PASS,details:i=null}={}){let a=t(),o=null;return(s=i)=>o||(o=lr({name:e,stageName:r,startMs:a,endMs:t(),details:s}),n.push(o),o)}return{start:r,getTimings(){return n.slice()}}}function Rr(e){if(e!=null)return e;let t=globalThis.GPUMapMode?.READ;if(t==null)throw Error(`GPU readback requires GPUMapMode.READ or an explicit mapMode.`);return t}async function zr(e,{mapMode:t=null}={}){if(!e||typeof e.mapAsync!=`function`||typeof e.getMappedRange!=`function`||typeof e.unmap!=`function`)throw Error(`GPU readback requires a mappable GPU buffer.`);await e.mapAsync(Rr(t));try{return e.getMappedRange().slice(0)}finally{e.unmap()}}var Z=Object.freeze({INPUT_PREP:`placement-input-prep`,DESCRIPTOR_PREP:`placement-descriptor-prep`,WEIGHT_PASS:`placement-w-pass`,FILTER_MASK_PASS:`placement-filter-mask-pass`,LAYOUT_PASS:`placement-layout-pass`,PLACEMENT_PASS:`placement-q-pass`,BOUNDS_PASS:`placement-bounds-pass`,VISUAL_MAPPING_PASS:`placement-sc-pass`,RESULT_NORMALIZATION:`placement-result-normalization`}),Br=Object.freeze([Z.INPUT_PREP,Z.DESCRIPTOR_PREP,Z.WEIGHT_PASS,Z.FILTER_MASK_PASS,Z.LAYOUT_PASS,Z.PLACEMENT_PASS,Z.BOUNDS_PASS,Z.VISUAL_MAPPING_PASS,Z.RESULT_NORMALIZATION]);new Set(Br);var Vr=8,Hr=1/1e6,Ur=0;function Wr(e){let t=globalThis.GPUBufferUsage?.[e];return Number.isFinite(t)?t:0}function Gr(e){let t=globalThis.GPUMapMode?.[e];return Number.isFinite(t)?t:0}function Kr(e){return!!(e&&typeof e.createQuerySet==`function`&&typeof e.createBuffer==`function`&&e.features?.has?.(`timestamp-query`)&&Wr(`QUERY_RESOLVE`)&&Wr(`COPY_SRC`)&&Wr(`COPY_DST`)&&Wr(`MAP_READ`)&&Gr(`READ`))}function qr(e){return e&&typeof e==`object`&&!Array.isArray(e)?{...e}:{}}function Jr(e=null){return typeof e==`function`?e:e&&typeof e.now==`function`?()=>e.now():globalThis.performance&&typeof globalThis.performance.now==`function`?()=>globalThis.performance.now():()=>Date.now()}function Yr({name:e,stageName:t,reason:n,details:r={}}){return lr({name:e,stageName:t,durationMs:0,details:{kind:`gpu-execution`,status:`skipped`,reason:n,...qr(r)}})}function Xr(e,t){let n=new BigUint64Array(e);return t.map(e=>{let t=n[e.beginQueryIndex]??0n,r=n[e.endQueryIndex]??t,i=r>t?r-t:0n;return lr({name:e.name,stageName:e.stageName,durationMs:Number(i)*Hr,details:{kind:`gpu-execution`,...qr(e.details)}})})}function Zr({device:e,enabled:t=!1,passCapacity:n=0,unavailableReason:r=`timestamp-query-unavailable`,clock:i=null}={}){let a=Jr(i),o=Math.max(0,Math.trunc(Number(n||0)))*2,s=[],c=[],l=null,u=null,d=null,f=0,p=!1,m=``,h=[],g=null,_=!1;if(t)if(o<=0)m=`no-timestamp-query-capacity`;else if(!Kr(e))m=r;else try{l=e.createQuerySet({type:`timestamp`,count:o});let t=o*Vr;u=e.createBuffer({label:`GpuPlacementTimestampResolveBuffer`,size:t,usage:Wr(`QUERY_RESOLVE`)|Wr(`COPY_SRC`)}),d=e.createBuffer({label:`GpuPlacementTimestampReadbackBuffer`,size:t,usage:Wr(`COPY_DST`)|Wr(`MAP_READ`)}),p=!0}catch(e){m=e instanceof Error?e.message:String(e||r)}function v({name:e,stageName:n,details:i={}}={}){let a=qr(i);if(!t)return{descriptor:{},finish(){}};if(!p||f+1>=o){let t=!1;return{descriptor:{},finish(i=a){t||(t=!0,c.push(Yr({name:e,stageName:n,reason:p?`timestamp-query-capacity-exhausted`:m||r,details:i})))}}}let u=f,d=f+1;f+=2;let h={name:e,stageName:n,beginQueryIndex:u,endQueryIndex:d,details:a};return s.push(h),{descriptor:{timestampWrites:{querySet:l,beginningOfPassWriteIndex:u,endOfPassWriteIndex:d}},finish(e=a){h.details=qr(e)}}}function y(e){if(!p||s.length===0||!e?.resolveQuerySet||!e?.copyBufferToBuffer)return;let t=a(),n=f*Vr;e.resolveQuerySet(l,0,f,u,0),e.copyBufferToBuffer(u,0,d,0,n),h.push(lr({name:`gpu-timestamp-query-resolve-command-encoding`,stageName:`gpu-timestamp-query-resolve`,startMs:t,endMs:a(),details:{kind:`timestamp-query-overhead`,queryCount:f,byteLength:n}}))}async function b(){if(!p||s.length===0||!d?.mapAsync)return[...c,...h];let e=a();try{let t=f*Vr;await d.mapAsync(Gr(`READ`),0,t);let n=d.getMappedRange(0,t).slice(0);return d.unmap?.(),h.push(lr({name:`gpu-timestamp-query-readback-map`,stageName:`gpu-timestamp-query-readback`,startMs:e,endMs:a(),details:{kind:`timestamp-query-overhead`,queryCount:f,byteLength:t}})),[...c,...Xr(n,s),...h]}catch(e){return[...c,...h,...s.map(t=>Yr({name:t.name,stageName:t.stageName,reason:e instanceof Error?e.message:String(e||`timestamp-query-readback-failed`),details:t.details}))]}}async function x(){return g||=b(),g}function S(){_||(_=!0,l?.destroy?.(),u?.destroy?.(),d?.destroy?.())}return{enabled:t,ready:p,startPass:v,resolve:y,collectTimings:x,release:S}}function Qr(e,{idPrefix:t=`gpu-timestamp-query`,kind:n=`gpu-timestamp-query`}={}){let r=`${t}:${Ur+=1}`,i=null,a=!1,o=()=>{a||(a=!0,e?.release?.())};return{id:r,kind:n,collectTimings(){return i||=Promise.resolve().then(()=>e?.collectTimings?.()||[]).finally(o),i},release:o}}var $r=256,ei=1e-6,ti=1337,ni=1e6,ri=-4,ii=4,ai=0,oi=1,si=0,ci=-.25,li=32,ui=0,di=1,fi=2,pi=1,mi=2,hi=3,gi=4,_i=5,vi=6,yi=7,bi=8,xi=0,Si=1,Ci=2,wi=0,Ti=1,Ei=2,Di=0,Oi=1,ki=32,Ai=new Set(me),ji=Object.freeze({type:`none`,tau:.5,delta:.05,gamma:1,clampA:0,clampB:1,pulseA:.25,pulseB:.75,constantA:.25,constantB:.75,constantValue:.5,gaussianPeakA:.5,gaussianPeakR:.15,gaussianPeakEpsilon:.01,stairK:4,noiseA:-.05,noiseB:.05}),Mi=[`x`,`y`,`z`,`w`];function Ni(t){let n=P(),r={type:F(typeof t?.type==`string`?t.type.trim():n.type),tau:Number.isFinite(t?.tau)?t.tau:n.tau,delta:Number.isFinite(t?.delta)?t.delta:n.delta,gamma:Number.isFinite(t?.gamma)?t.gamma:n.gamma,clampA:Number.isFinite(t?.clampA)?t.clampA:n.clampA,clampB:Number.isFinite(t?.clampB)?t.clampB:n.clampB,pulseA:Number.isFinite(t?.pulseA)?t.pulseA:n.pulseA,pulseB:Number.isFinite(t?.pulseB)?t.pulseB:n.pulseB,constantA:Number.isFinite(t?.constantA)?t.constantA:n.constantA,constantB:Number.isFinite(t?.constantB)?t.constantB:n.constantB,constantValue:Number.isFinite(t?.constantValue)?t.constantValue:n.constantValue,gaussianPeakA:Number.isFinite(t?.gaussianPeakA)?t.gaussianPeakA:n.gaussianPeakA,gaussianPeakR:Number.isFinite(t?.gaussianPeakR)?t.gaussianPeakR:n.gaussianPeakR,gaussianPeakEpsilon:Number.isFinite(t?.gaussianPeakEpsilon)?t.gaussianPeakEpsilon:n.gaussianPeakEpsilon,stairK:Number.isFinite(t?.stairK)?t.stairK:n.stairK,noiseA:Number.isFinite(t?.noiseA)?t.noiseA:n.noiseA,noiseB:Number.isFinite(t?.noiseB)?t.noiseB:n.noiseB};return r.tau=e(r.tau),r.delta=Math.max(1e-6,r.delta),r.gamma=Math.min(4,Math.max(1e-6,r.gamma)),r.clampA=e(r.clampA),r.clampB=e(r.clampB),r.pulseA=e(r.pulseA),r.pulseB=e(r.pulseB),r.constantA=e(r.constantA),r.constantB=e(r.constantB),r.constantValue=e(r.constantValue),r.gaussianPeakA=e(r.gaussianPeakA),r.gaussianPeakR=Math.max(0,r.gaussianPeakR),r.gaussianPeakEpsilon=Math.max(1e-6,Math.min(.999999,r.gaussianPeakEpsilon)),r.stairK=Math.max(2,Math.round(r.stairK)),r.noiseA=Math.max(-1,Math.min(1,r.noiseA)),r.noiseB=Math.max(-1,Math.min(1,r.noiseB)),r.type===`clamp`&&r.clampA>r.clampB&&(r.clampA=n.clampA,r.clampB=n.clampB),r.type===`pulse`&&r.pulseA>r.pulseB&&(r.pulseA=n.pulseA,r.pulseB=n.pulseB),r.type===`constant`&&r.constantA>r.constantB&&(r.constantA=n.constantA,r.constantB=n.constantB),r.type===`noise`&&r.noiseA>r.noiseB&&(r.noiseA=n.noiseA,r.noiseB=n.noiseB),r}function Pi(e){let t=Ni(e),n=F(t.type)===`staircase`?`stair`:F(t.type);return Ai.has(n)?{type:n,tau:t.tau,delta:t.delta,gamma:t.gamma,clampA:t.clampA,clampB:t.clampB,pulseA:t.pulseA,pulseB:t.pulseB,constantA:t.constantA,constantB:t.constantB,constantValue:t.constantValue,gaussianPeakA:t.gaussianPeakA,gaussianPeakR:t.gaussianPeakR,gaussianPeakEpsilon:t.gaussianPeakEpsilon,stairK:t.stairK,noiseA:t.noiseA,noiseB:t.noiseB}:null}function Fi(e){if(!Array.isArray(e))return[];let t=new Set;for(let n of e)!Number.isInteger(n)||n<=0||n>24||t.add(n);return Array.from(t).sort((e,t)=>e-t)}function Ii(e,t){return!Array.isArray(e)||t<1||e.length!==t?[]:e.map(e=>{let t=Number.isFinite(e)?e:Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):0})}function Li(e){return`interval`}function Ri(e){return ot(e,{maxIntervals:li})}function zi(e,t){return Number.isInteger(e)&&e>=1&&e<=t}function Bi(e){return e?.type===`single`?pi:e?.type===`min`?mi:e?.type===`max`?hi:e?.type===`mix`?yi:e?.type===`profile`?bi:e?.type===`variance`?gi:e?.type===`length`?_i:e?.type===`similarity`?vi:0}function Vi(e){let t=Pi(e?.transfer1),n=Pi(e?.transfer2);return!t||!n?null:{transfer1:t,transfer2:n}}function Hi(t,n,r=new Map,i=new Set){let a=Bi(t);if(!a)return null;let o=qi(t);if(o>0&&i.has(o))return null;let s=new Set(i);o>0&&s.add(o);let c=Vi(t);if(!c)return null;let l=Fi(a===vi?t?.similarityDimensions:t?.varianceDimensions),u=Ii(t?.similarityReferenceValues,l.length),d=Xe(t?.similarityDimensionWeights,l),f=Number.isFinite(t?.similaritySharpness)?Math.max(1e-6,t.similaritySharpness):Je(),p=Number.isInteger(t.featureDimensionA)?t.featureDimensionA:0,m=Number.isInteger(t.featureDimensionB)?t.featureDimensionB:0,h=Number.isFinite(t.mixLambda)?e(t.mixLambda):.5,g=[],_=[],v=[],y=[];if(a===gi){if(l.length<2||l.some(e=>e>n))return null}else if(a===_i){if(l.length<1||l.some(e=>e>n))return null}else if(a===vi){if(l.length<1||l.some(e=>e>n)||u.length!==l.length)return null}else if(a===mi){if(g=Ee(t?.minSources,t).slice(0,6).map(e=>{if(e.sourceType===`feature`)return zi(e.featureDimension,n)?{...e,featureIndex:e.featureDimension-1,sourceDescriptor:null}:null;if(e.sourceType===`none`)return null;let t=Number.parseInt(String(e.sourceMagnetId??0),10),i=r.get(t);if(!i||Xi(i.type))return null;let a=ea(i,n,new Map,r,s);return a?{...e,featureIndex:0,sourceDescriptor:a}:null}).filter(Boolean),g.length<1)return null}else if(a===hi){if(_=we(t?.maxSources,t).slice(0,6).map(e=>{if(e.sourceType===`feature`)return zi(e.featureDimension,n)?{...e,featureIndex:e.featureDimension-1,sourceDescriptor:null}:null;let t=Number.parseInt(String(e.sourceMagnetId??0),10),i=r.get(t);if(!i||Xi(i.type))return null;let a=ea(i,n,new Map,r,s);return a?{...e,featureIndex:0,sourceDescriptor:a}:null}).filter(Boolean),_.length<1)return null}else if(a===yi){if(v=Se(t?.mixSources,t).filter(e=>e.blend>0).slice(0,6).map(e=>{if(e.sourceType===`feature`)return zi(e.featureDimension,n)?{...e,featureIndex:e.featureDimension-1,sourceDescriptor:null}:null;let t=Number.parseInt(String(e.sourceMagnetId??0),10),i=r.get(t);if(!i||Xi(i.type))return null;let a=ea(i,n,new Map,r,s);return a?{...e,featureIndex:0,sourceDescriptor:a}:null}).filter(Boolean),v.length<1)return null}else if(a===bi){if(y=ke(t?.profileCriteria,t).filter(e=>e.enabled!==!1&&e.weight>0).slice(0,8).map(e=>zi(e.sourceIndex,n)?{...e,featureIndex:e.sourceIndex-1}:null).filter(Boolean),y.length<1)return null}else if(!zi(p,n))return null;return{role:di,typeCode:a,featureIndexA:p>0?p-1:0,featureIndexB:m>0?m-1:0,subsetFeatureIndexes:l.map(e=>e-1),subsetReferenceValues:[...u],subsetActivationWeights:[...d],similaritySharpness:f,mixLambda:h,minSources:g,maxSources:_,mixSources:v,profileCriteria:y,transfer1:c.transfer1,transfer2:c.transfer2,sourceSlot:-1,sourceTypeCode:0,sourceFeatureIndexA:0,sourceFeatureIndexB:0,sourceSubsetFeatureIndexes:[],sourceSubsetReferenceValues:[],sourceSubsetActivationWeights:[],sourceSimilaritySharpness:Je(),sourceMixLambda:.5,sourceMinSources:[],sourceMaxSources:[],sourceMixSources:[],sourceProfileCriteria:[],sourceTransfer1:null,sourceTransfer2:null}}function Ui(){return{active:0,id:0,x:0,y:0,strength:0,role:ui,typeCode:0,featureIndexA:0,featureIndexB:0,subsetFeatureIndexes:[],subsetReferenceValues:[],subsetActivationWeights:[],similaritySharpness:Je(),mixLambda:.5,minSources:[],maxSources:[],mixSources:[],profileCriteria:[],transfer1:null,transfer2:null,sourceSlot:-1,sourceTypeCode:0,sourceFeatureIndexA:0,sourceFeatureIndexB:0,sourceSubsetFeatureIndexes:[],sourceSubsetReferenceValues:[],sourceSubsetActivationWeights:[],sourceSimilaritySharpness:Je(),sourceMixLambda:.5,sourceMinSources:[],sourceMaxSources:[],sourceMixSources:[],sourceProfileCriteria:[],sourceTransfer1:null,sourceTransfer2:null,filterTransfer1:null,filterTransfer2:null}}function Wi(e){return e?{...e}:null}function Gi(e){return(Array.isArray(e)?e:[]).map(e=>({enabled:e.enabled!==!1,sourceIndex:Number.isInteger(e.sourceIndex)?e.sourceIndex:0,featureIndex:Number.isInteger(e.featureIndex)?e.featureIndex:Math.max(0,(Number.parseInt(String(e.sourceIndex??1),10)||1)-1),target:Number.isFinite(e.target)?e.target:.5,radius:Number.isFinite(e.radius)?e.radius:.1,epsilon:Number.isFinite(e.epsilon)?e.epsilon:1e-4,weight:Number.isFinite(e.weight)?e.weight:1,slot:Number.isInteger(e.slot)?e.slot:0}))}function Ki(e){return(Array.isArray(e)?e:[]).map(e=>({sourceType:e.sourceType,featureIndex:Number.isInteger(e.featureIndex)?e.featureIndex:0,sourceMagnetId:Number.isInteger(e.sourceMagnetId)?e.sourceMagnetId:0,inverted:!!e.inverted,transfer:Wi(e.transfer)||Pi({type:`none`}),blend:Number.isFinite(e.blend)?e.blend:0,sourceDescriptor:e.sourceDescriptor?{...e.sourceDescriptor,subsetFeatureIndexes:[...e.sourceDescriptor.subsetFeatureIndexes||[]],subsetReferenceValues:[...e.sourceDescriptor.subsetReferenceValues||[]],subsetActivationWeights:[...e.sourceDescriptor.subsetActivationWeights||[]],mixSources:Ki(e.sourceDescriptor.mixSources),minSources:Ki(e.sourceDescriptor.minSources),maxSources:Ki(e.sourceDescriptor.maxSources),profileCriteria:Gi(e.sourceDescriptor.profileCriteria),sourceSubsetFeatureIndexes:[...e.sourceDescriptor.sourceSubsetFeatureIndexes||[]],sourceSubsetReferenceValues:[...e.sourceDescriptor.sourceSubsetReferenceValues||[]],sourceSubsetActivationWeights:[...e.sourceDescriptor.sourceSubsetActivationWeights||[]],sourceMixSources:Ki(e.sourceDescriptor.sourceMixSources),sourceMinSources:Ki(e.sourceDescriptor.sourceMinSources),sourceMaxSources:Ki(e.sourceDescriptor.sourceMaxSources),sourceProfileCriteria:Gi(e.sourceDescriptor.sourceProfileCriteria),transfer1:Wi(e.sourceDescriptor.transfer1),transfer2:Wi(e.sourceDescriptor.transfer2),sourceTransfer1:Wi(e.sourceDescriptor.sourceTransfer1),sourceTransfer2:Wi(e.sourceDescriptor.sourceTransfer2),filterTransfer1:Wi(e.sourceDescriptor.filterTransfer1),filterTransfer2:Wi(e.sourceDescriptor.filterTransfer2)}:null}))}function qi(e){let t=Number.parseInt(String(e?.id??0),10);return Number.isInteger(t)?t:0}function Ji(e,t){return{active:1,id:qi(e),x:Number.isFinite(e.x)?e.x:0,y:Number.isFinite(e.y)?e.y:0,strength:pe(e),role:t.role,typeCode:t.typeCode,featureIndexA:t.featureIndexA,featureIndexB:t.featureIndexB,subsetFeatureIndexes:[...t.subsetFeatureIndexes],subsetReferenceValues:[...t.subsetReferenceValues||[]],subsetActivationWeights:[...t.subsetActivationWeights||[]],similaritySharpness:Number.isFinite(t.similaritySharpness)?t.similaritySharpness:Je(),mixLambda:Number.isFinite(t.mixLambda)?t.mixLambda:.5,minSources:Ki(t.minSources),maxSources:Ki(t.maxSources),mixSources:Ki(t.mixSources),profileCriteria:Gi(t.profileCriteria),transfer1:Wi(t.transfer1),transfer2:Wi(t.transfer2),sourceMagnetId:0,sourceSlot:-1,sourceTypeCode:0,sourceFeatureIndexA:0,sourceFeatureIndexB:0,sourceSubsetFeatureIndexes:[],sourceSubsetReferenceValues:[],sourceSubsetActivationWeights:[],sourceSimilaritySharpness:Je(),sourceMixLambda:.5,sourceMinSources:[],sourceMaxSources:[],sourceMixSources:[],sourceProfileCriteria:[],sourceTransfer1:null,sourceTransfer2:null}}function Yi(e,t,n){return{active:1,id:qi(e),x:Number.isFinite(e.x)?e.x:0,y:Number.isFinite(e.y)?e.y:0,strength:pe(e),role:fi,typeCode:0,featureIndexA:0,featureIndexB:0,subsetFeatureIndexes:[],subsetReferenceValues:[],subsetActivationWeights:[],similaritySharpness:Je(),mixLambda:.5,transfer1:null,transfer2:null,sourceMagnetId:t,sourceSlot:-1,sourceTypeCode:n.typeCode,sourceFeatureIndexA:n.featureIndexA,sourceFeatureIndexB:n.featureIndexB,sourceSubsetFeatureIndexes:[...n.subsetFeatureIndexes||[]],sourceSubsetReferenceValues:[...n.subsetReferenceValues||[]],sourceSubsetActivationWeights:[...n.subsetActivationWeights||[]],sourceSimilaritySharpness:Number.isFinite(n.similaritySharpness)?n.similaritySharpness:Je(),sourceMixLambda:Number.isFinite(n.mixLambda)?n.mixLambda:.5,sourceMinSources:Ki(n.minSources),sourceMaxSources:Ki(n.maxSources),sourceMixSources:Ki(n.mixSources),sourceProfileCriteria:Gi(n.profileCriteria),sourceTransfer1:Wi(n.transfer1),sourceTransfer2:Wi(n.transfer2)}}function Xi(e){let t=String(e||``).trim().toLowerCase();return t===`filter`||t===`sink`}function Zi(){return{...ji}}function Qi(e,t){let n=new Map,r=new Map((Array.isArray(e)?e:[]).map(e=>[qi(e),e]));for(let i of Array.isArray(e)?e:[]){if(!i||i?.type===`inversemagnet`||Xi(i?.type))continue;let e=qi(i);if(e<=0||n.has(e))continue;let a=Hi(i,t,r);a&&n.set(e,a)}return n}function $i(e,t){let n=new Map,r=new Map((Array.isArray(e)?e:[]).map(e=>[qi(e),e]));for(let i of Array.isArray(e)?e:[]){if(i?.type===`inversemagnet`||Xi(i?.type))continue;let e=qi(i);if(e<=0||n.has(e))continue;let a=Hi(i,t,r);a&&n.set(e,a)}return n}function ea(e,t,n,r=new Map,i=new Set){if(!e||Xi(e?.type))return null;let a=Hi(e,t,r,i);if(a)return Ji({...e,active:!0},a);if(e?.type===`inversemagnet`){let a=Number.parseInt(String(e.sourceMagnetId??0),10),o=n.get(a)||Hi(r.get(a),t,r,i);return!Number.isInteger(a)||a<=0||!o?null:Yi({...e,active:!0},a,o)}return null}function ta(e,t,n,r=new Map,i=new Set){if(!e||Xi(e?.type))return null;let a=Hi(e,t,r,i);if(a)return Ji({...e,active:!0},a);if(e?.type===`inversemagnet`){let a=Number.parseInt(String(e.sourceMagnetId??0),10),o=n.get(a)||Hi(r.get(a),t,r,i);return!Number.isInteger(a)||a<=0||!o?null:Yi({...e,active:!0},a,o)}return null}function na(e,t){let n={...e,type:`single`,transfer1:Zi(),transfer2:Zi()},r=Hi(n,t);return r?Ji(n,r):null}function ra(e,t,n){return{...t,id:qi(e),x:Number.isFinite(e.x)?e.x:0,y:Number.isFinite(e.y)?e.y:0,strength:1,filterTransfer1:Wi(n.transfer1),filterTransfer2:Wi(n.transfer2)}}function ia(e,t){let n=[],r=0,i=Array.isArray(e)?e:[],a=new Map(i.map(e=>[qi(e),e])),o=Number.isInteger(t)?Math.max(0,Math.min(24,t)):0,s=new Map,c=Qi(i,o);for(let e of i){if(!e?.active)continue;if(n.length>=16){r+=1;continue}let t=Hi(e,o,a);if(t){let r=Ji(e,t);n.push(r);let i=r.id;i>0&&!s.has(i)&&s.set(i,n.length-1);continue}if(e?.type===`inversemagnet`){let t=Number.parseInt(String(e.sourceMagnetId??0),10),i=c.get(t);if(!Number.isInteger(t)||t<=0||!i){r+=1;continue}let a=Yi(e,t,i);n.push(a);let o=a.id;o>0&&!s.has(o)&&s.set(o,n.length-1);continue}r+=1}for(let e of n){if(e.role!==fi||!Number.isInteger(e.sourceMagnetId))continue;let t=s.get(e.sourceMagnetId);e.sourceSlot=Number.isInteger(t)?t:-1}for(;n.length<16;)n.push(Ui());let l=n.reduce((e,t)=>e+ +!!t.active,0),u=JSON.stringify(n.map(e=>({active:e.active,role:e.role,typeCode:e.typeCode,featureIndexA:e.featureIndexA,featureIndexB:e.featureIndexB,subsetFeatureIndexes:e.subsetFeatureIndexes,subsetReferenceValues:e.subsetReferenceValues,subsetActivationWeights:e.subsetActivationWeights,similaritySharpness:e.similaritySharpness,mixLambda:e.mixLambda,minSources:e.minSources,maxSources:e.maxSources,mixSources:e.mixSources,profileCriteria:e.profileCriteria,transfer1:e.transfer1,transfer2:e.transfer2,sourceSlot:e.sourceSlot,sourceTypeCode:e.sourceTypeCode,sourceFeatureIndexA:e.sourceFeatureIndexA,sourceFeatureIndexB:e.sourceFeatureIndexB,sourceSubsetFeatureIndexes:e.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:e.sourceSubsetReferenceValues,sourceSubsetActivationWeights:e.sourceSubsetActivationWeights,sourceSimilaritySharpness:e.sourceSimilaritySharpness,sourceMixLambda:e.sourceMixLambda,sourceMinSources:e.sourceMinSources,sourceMaxSources:e.sourceMaxSources,sourceMixSources:e.sourceMixSources,sourceProfileCriteria:e.sourceProfileCriteria,sourceTransfer1:e.sourceTransfer1,sourceTransfer2:e.sourceTransfer2})));return{descriptors:n,activeCount:l,ignoredCount:r,semanticsSignature:u}}function aa(){let e=Zi(),t=Zi();return{ok:!0,layoutType:`layer`,active:!0,sourceMode:`none`,sourceMagnetId:0,featureIndex:-1,sourceDescriptor:Ui(),baseZ:si,zMin:si,zMax:oi,mappingMode:`interval`,intervals:[],transfer1:e,transfer2:t,semanticsSignature:JSON.stringify({type:`layer`,layoutType:`layer`,active:!0,sourceMode:`none`,sourceMagnetId:0,featureIndex:-1,baseZ:si,zMin:si,zMax:oi,mappingMode:`interval`,intervals:[],transfer1:e,transfer2:t})}}function oa(e,t,n,r,i,a){let o=Number.parseInt(String(e?.sourceMagnetId??0),10),s=String(e?.sourceMode||``).trim().toLowerCase(),c=s===`magnet`||s!==`feature`&&o>0?`magnet`:`feature`,l=Number.parseInt(String(e?.featureDimension??t+1),10),u=c===`feature`&&zi(l,r)?l-1:-1,d=Ui();c===`magnet`&&(d=ta(n.find(e=>qi(e)===o)||null,r,i,a));let f=t===2?0:-.5,p=t===2?1:.5,m=Number.isFinite(Number(e?.outputMin))?Number(e.outputMin):f,h=Number.isFinite(Number(e?.outputMax))?Number(e.outputMax):p;return{sourceMode:c,sourceMagnetId:c===`magnet`?o:0,featureIndex:u,sourceDescriptor:d,outputMin:m,outputMax:h,transfer:Wi(e?.transfer||e?.transfer1),ok:c===`feature`?u>=0:!!d}}function sa(e){let t=String(e?.type||e?.layoutType||e?.layoutKind||``).trim().toLowerCase();return t===`2d`||t===`2d layout`||t===`2d-layout`?`2d`:t===`height`?`height`:t===`scatter3d`||t===`3dsp`||t===`3d scatter plot`?`scatter3d`:`layer`}function ca(e,t,n){let r=Array.isArray(t)?t:[],i=new Map(r.map(e=>[qi(e),e])),a=Number.isInteger(n)?Math.max(0,Math.min(24,n)):0,o=e&&typeof e==`object`?e:null;if(!o)return aa();let s=sa(o),c=Vi(o);if(!c)return{...aa(),ok:!1,error:`Layout transfer functions are not supported by the GPU layout pass.`};if(s===`scatter3d`){let e=$i(r,a),t=o.scatterAxes||{},n={x:oa(t.x,0,r,a,e,i),y:oa(t.y,1,r,a,e,i),z:oa(t.z,2,r,a,e,i)};for(let[e,t]of Object.entries(n))if(!t.ok)return{...aa(),ok:!1,error:`3D Scatter Plot ${e.toUpperCase()} source is not available on the GPU.`};let s={...aa(),ok:!0,layoutType:`scatter3d`,active:!0,scatterAxes:n};return s.semanticsSignature=JSON.stringify({type:`layout`,layoutType:`scatter3d`,active:s.active,scatterAxes:n}),s}if(s===`2d`){let e=Number.isFinite(Number(o.zHeight??o.z??o.layerBaseZ))?Math.max(ai,Math.min(oi,Number(o.zHeight??o.z??o.layerBaseZ))):si,t={...aa(),ok:!0,layoutType:`2d`,active:!0,sourceMode:`none`,sourceMagnetId:0,featureIndex:-1,sourceDescriptor:Ui(),baseZ:e,zMin:e,zMax:e,mappingMode:`constant`,intervals:[],transfer1:Zi(),transfer2:Zi()};return t.semanticsSignature=JSON.stringify({type:`layout`,layoutType:`2d`,active:!0,zHeight:e}),t}let l=Number.parseInt(String(o.sourceMagnetId??0),10),u=String(o.sourceMode||``).trim().toLowerCase()===`feature`?`feature`:Number.isInteger(l)&&l>0?`magnet`:`none`,d=Number.parseInt(String(o.featureDimension??o.featureDimensionA??0),10),f=u===`feature`&&zi(d,a)?d-1:-1;if(u===`feature`&&f<0)return{...aa(),ok:!1,error:`${s===`height`?`Height Layout`:`Layer Layout`} source feature dimension is not available on the GPU.`};let p=Ui();if(u===`magnet`){let e=$i(r,a);if(p=ta(r.find(e=>qi(e)===l)||null,a,e,i),!p)return{...aa(),ok:!1,error:`Layout source magnet is not supported by the GPU layout pass.`}}let m=Li(o.layerMappingMode),h=Ri(o.layerIntervals),g=o.layerBaseZ!=null&&o.layerBaseZ!==``&&Number.isFinite(Number(o.layerBaseZ))?Math.max(ai,Math.min(1.1,Number(o.layerBaseZ))):si,_=Number.isFinite(Number(o.zMin))?Math.max(ai,Math.min(oi,Number(o.zMin))):si,v=Number.isFinite(Number(o.zMax))?Math.max(ai,Math.min(oi,Number(o.zMax))):oi,y={ok:!0,layoutType:s,active:!0,sourceMode:u,sourceMagnetId:u===`magnet`?l:0,featureIndex:f,sourceDescriptor:p,baseZ:g,zMin:Math.min(_,v),zMax:Math.max(_,v),mappingMode:m,intervals:h,transfer1:Wi(c.transfer1),transfer2:Wi(c.transfer2)};return y.semanticsSignature=JSON.stringify({type:`layout`,layoutType:y.layoutType,active:y.active,sourceMode:y.sourceMode,sourceMagnetId:y.sourceMagnetId,featureIndex:y.featureIndex,baseZ:y.baseZ,zMin:y.zMin,zMax:y.zMax,sourceDescriptor:{role:p.role,typeCode:p.typeCode,featureIndexA:p.featureIndexA,featureIndexB:p.featureIndexB,subsetFeatureIndexes:p.subsetFeatureIndexes,subsetReferenceValues:p.subsetReferenceValues,subsetActivationWeights:p.subsetActivationWeights,similaritySharpness:p.similaritySharpness,mixLambda:p.mixLambda,minSources:p.minSources,maxSources:p.maxSources,mixSources:p.mixSources,profileCriteria:p.profileCriteria,transfer1:p.transfer1,transfer2:p.transfer2,sourceTypeCode:p.sourceTypeCode,sourceFeatureIndexA:p.sourceFeatureIndexA,sourceFeatureIndexB:p.sourceFeatureIndexB,sourceSubsetFeatureIndexes:p.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:p.sourceSubsetReferenceValues,sourceSubsetActivationWeights:p.sourceSubsetActivationWeights,sourceSimilaritySharpness:p.sourceSimilaritySharpness,sourceMixLambda:p.sourceMixLambda,sourceMinSources:p.sourceMinSources,sourceMaxSources:p.sourceMaxSources,sourceMixSources:p.sourceMixSources,sourceProfileCriteria:p.sourceProfileCriteria,sourceTransfer1:p.sourceTransfer1,sourceTransfer2:p.sourceTransfer2},mappingMode:y.mappingMode,intervals:y.intervals,transfer1:y.transfer1,transfer2:y.transfer2}),y}function la(e,t,n){let r=[],i=0,a=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=Number.isInteger(n)?Math.max(0,Math.min(24,n)):0,c=new Map,l=Qi(o,s);for(let e of o){let t=qi(e);t>0&&!c.has(t)&&c.set(t,e)}for(let e of a){if(!e?.active||!Xi(e?.type))continue;if(r.length>=16){i+=1;continue}let t=Vi(e);if(!t){i+=1;continue}let n=null,a=Number.parseInt(String(e.sourceMagnetId??0),10);if(n=Number.isInteger(a)&&a>0?ea(c.get(a),s,l,c):na(e,s),!n){i+=1;continue}r.push(ra(e,n,t))}for(;r.length<16;)r.push(Ui());let u=r.reduce((e,t)=>e+ +!!t.active,0),d=JSON.stringify(r.map(e=>({active:e.active,role:e.role,typeCode:e.typeCode,featureIndexA:e.featureIndexA,featureIndexB:e.featureIndexB,subsetFeatureIndexes:e.subsetFeatureIndexes,subsetReferenceValues:e.subsetReferenceValues,subsetActivationWeights:e.subsetActivationWeights,similaritySharpness:e.similaritySharpness,mixLambda:e.mixLambda,minSources:e.minSources,maxSources:e.maxSources,mixSources:e.mixSources,profileCriteria:e.profileCriteria,transfer1:e.transfer1,transfer2:e.transfer2,sourceTypeCode:e.sourceTypeCode,sourceFeatureIndexA:e.sourceFeatureIndexA,sourceFeatureIndexB:e.sourceFeatureIndexB,sourceSubsetFeatureIndexes:e.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:e.sourceSubsetReferenceValues,sourceSubsetActivationWeights:e.sourceSubsetActivationWeights,sourceSimilaritySharpness:e.sourceSimilaritySharpness,sourceMixLambda:e.sourceMixLambda,sourceMinSources:e.sourceMinSources,sourceMaxSources:e.sourceMaxSources,sourceMixSources:e.sourceMixSources,sourceProfileCriteria:e.sourceProfileCriteria,sourceTransfer1:e.sourceTransfer1,sourceTransfer2:e.sourceTransfer2,filterTransfer1:e.filterTransfer1,filterTransfer2:e.filterTransfer2})));return{descriptors:r,activeCount:u,ignoredCount:i,semanticsSignature:d}}function ua(e,t,n=[]){let r=String(e?.mode||`static`).trim().toLowerCase(),i=Number.isInteger(t)?Math.max(0,Math.min(24,t)):0,a=Math.max(0,Number.isFinite(e?.staticSizePx)?e.staticSizePx:0),o=Math.max(0,Number.isFinite(e?.minSizePx)?e.minSizePx:a),s=Math.max(o,Number.isFinite(e?.maxSizePx)?e.maxSizePx:o),c=Math.max(0,Number.isFinite(e?.sinkFixedSizePx)?e.sinkFixedSizePx:a),l=String(e?.sinkSizeMode||``).trim().toLowerCase()===`fixed`,u=!!e?.pulseBinarize,d=da(e?.colorConfig,i,n),f=e=>({...e,colorDescriptor:d,ok:!!(e.ok&&d.ok),ignored:!!(e.ignored||d.ignored),error:e.ok?d.error||``:e.error,errorKind:e.ok&&!d.ok?`color`:e.ok?``:`size`,semanticsSignature:e.ok&&d.ok?JSON.stringify({size:e.semanticsSignature,color:d.semanticsSignature}):``});if(r===`feature`){let t=Number.isInteger(e?.featureDimensionIndex)?e.featureDimensionIndex:-1;if(t<0||t>=i)return f({ok:!1,ignored:!0,error:`Feature-based particle size source is outside the GPU feature range.`,modeCode:xi,descriptor:Ui(),semanticsSignature:``});let n=JSON.stringify({mode:Si,featureIndex:t,staticSizePx:a,minSizePx:o,maxSizePx:s,sinkFixedSizePx:c,sinkFixedMode:l});return f({ok:!0,ignored:!1,modeCode:Si,featureIndex:t,staticSizePx:a,minSizePx:o,maxSizePx:s,sinkFixedSizePx:c,sinkFixedMode:l,pulseBinarize:!1,descriptor:Ui(),semanticsSignature:n})}if(r===`magnet`){let t=e?.selectedMagnet||null,r=Array.isArray(n)?n:[],d=new Map(r.map(e=>[qi(e),e])),p=ta(t,i,$i(r,i),d);return f(p?{ok:!0,ignored:!1,modeCode:Ci,featureIndex:0,staticSizePx:a,minSizePx:o,maxSizePx:s,sinkFixedSizePx:c,sinkFixedMode:l,pulseBinarize:u,descriptor:p,semanticsSignature:JSON.stringify({mode:Ci,staticSizePx:a,minSizePx:o,maxSizePx:s,sinkFixedSizePx:c,sinkFixedMode:l,pulseBinarize:u,descriptor:{role:p.role,typeCode:p.typeCode,featureIndexA:p.featureIndexA,featureIndexB:p.featureIndexB,subsetFeatureIndexes:p.subsetFeatureIndexes,subsetReferenceValues:p.subsetReferenceValues,subsetActivationWeights:p.subsetActivationWeights,similaritySharpness:p.similaritySharpness,mixLambda:p.mixLambda,minSources:p.minSources,maxSources:p.maxSources,mixSources:p.mixSources,profileCriteria:p.profileCriteria,transfer1:p.transfer1,transfer2:p.transfer2,sourceTypeCode:p.sourceTypeCode,sourceFeatureIndexA:p.sourceFeatureIndexA,sourceFeatureIndexB:p.sourceFeatureIndexB,sourceSubsetFeatureIndexes:p.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:p.sourceSubsetReferenceValues,sourceSubsetActivationWeights:p.sourceSubsetActivationWeights,sourceSimilaritySharpness:p.sourceSimilaritySharpness,sourceMixLambda:p.sourceMixLambda,sourceMinSources:p.sourceMinSources,sourceMaxSources:p.sourceMaxSources,sourceMixSources:p.sourceMixSources,sourceProfileCriteria:p.sourceProfileCriteria,sourceTransfer1:p.sourceTransfer1,sourceTransfer2:p.sourceTransfer2}})}:{ok:!1,ignored:!0,error:`Magnet-based particle size source is not supported by the GPU size pass.`,modeCode:xi,descriptor:Ui(),semanticsSignature:``})}let p=JSON.stringify({mode:xi,staticSizePx:a,sinkFixedSizePx:c,sinkFixedMode:l});return f({ok:!0,ignored:!1,modeCode:xi,featureIndex:0,staticSizePx:a,minSizePx:o,maxSizePx:s,sinkFixedSizePx:c,sinkFixedMode:l,pulseBinarize:!1,descriptor:Ui(),semanticsSignature:p})}function da(e,t,n=[]){if(!e)return{...ga(),alphaDescriptor:_a()};let r=String(e?.mode||`static`).trim().toLowerCase(),i=ga(e),a=va(e?.alphaConfig,t,n),o=e=>({...e,alphaDescriptor:a,ok:!!(e.ok&&a.ok),ignored:!!(e.ignored||a.ignored),error:e.ok?a.error||``:e.error,semanticsSignature:e.ok&&a.ok?JSON.stringify({color:e.semanticsSignature,alpha:a.semanticsSignature}):``}),s=Number.isInteger(t)?Math.max(0,Math.min(24,t)):0,c=ha(e.colorRamp||e.colorRampStops),l=Pi(e.valueTransfer||{type:`none`});if(!l)return{...i,alphaDescriptor:a,ok:!1,ignored:!0,error:`Particle color transfer function is not supported by the GPU SC-pass.`};if(r===`feature`){let t=Number.isInteger(e?.featureDimensionIndex)?e.featureDimensionIndex:-1;return t<0||t>=s?{...i,alphaDescriptor:a,ok:!1,ignored:!0,error:`Feature-based particle color source is outside the GPU feature range.`}:o({ok:!0,ignored:!1,modeCode:Ti,featureIndex:t,staticRgb:i.staticRgb,rampStops:c.intervals,ramp:c,pulseBinarize:!1,valueTransfer:l,descriptor:Ui(),semanticsSignature:JSON.stringify({mode:Ti,featureIndex:t,staticRgb:i.staticRgb,ramp:c,valueTransfer:l})})}if(r===`magnet`){let t=e?.selectedMagnet||null,r=Array.isArray(n)?n:[],u=new Map(r.map(e=>[qi(e),e])),d=ta(t,s,$i(r,s),u);return d?o({ok:!0,ignored:!1,modeCode:Ei,featureIndex:0,staticRgb:i.staticRgb,rampStops:c.intervals,ramp:c,pulseBinarize:!!e?.pulseBinarize,valueTransfer:l,descriptor:d,semanticsSignature:JSON.stringify({mode:Ei,staticRgb:i.staticRgb,ramp:c,pulseBinarize:!!e?.pulseBinarize,valueTransfer:l,descriptor:{role:d.role,typeCode:d.typeCode,featureIndexA:d.featureIndexA,featureIndexB:d.featureIndexB,subsetFeatureIndexes:d.subsetFeatureIndexes,subsetReferenceValues:d.subsetReferenceValues,subsetActivationWeights:d.subsetActivationWeights,similaritySharpness:d.similaritySharpness,mixLambda:d.mixLambda,minSources:d.minSources,maxSources:d.maxSources,mixSources:d.mixSources,profileCriteria:d.profileCriteria,transfer1:d.transfer1,transfer2:d.transfer2,sourceTypeCode:d.sourceTypeCode,sourceFeatureIndexA:d.sourceFeatureIndexA,sourceFeatureIndexB:d.sourceFeatureIndexB,sourceSubsetFeatureIndexes:d.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:d.sourceSubsetReferenceValues,sourceSubsetActivationWeights:d.sourceSubsetActivationWeights,sourceSimilaritySharpness:d.sourceSimilaritySharpness,sourceMixLambda:d.sourceMixLambda,sourceMinSources:d.sourceMinSources,sourceMaxSources:d.sourceMaxSources,sourceMixSources:d.sourceMixSources,sourceProfileCriteria:d.sourceProfileCriteria,sourceTransfer1:d.sourceTransfer1,sourceTransfer2:d.sourceTransfer2}})}):{...i,alphaDescriptor:a,ok:!1,ignored:!0,error:`Magnet-based particle color source is not supported by the GPU SC-pass.`}}return o(i)}function fa(e){let t=new Float32Array(64);for(let n=0;n<16;n+=1){let r=e[n],i=n*4;t[i]=Number.isFinite(r?.x)?r.x:0,t[i+1]=Number.isFinite(r?.y)?r.y:0,t[i+2]=Number.isFinite(r?.strength)?r.strength:0,t[i+3]=+!!r?.active}return t}function pa(e){let t=Math.max(0,Math.min(23,e|0));return`clamp01(f.b${Math.floor(t/4)}.${Mi[t%4]})`}function Q(e){let t=Number.isFinite(e)?e:0;if(Object.is(t,-0))return`-0.0`;let n=`${t}`;return/[.eE]/.test(n)?n:`${n}.0`}function ma(t){return En(t).slice(0,ki).map(t=>({position:e(t.position),rgb:w(t.colorHex)}))}function ha(t){if(t&&typeof t==`object`&&!Array.isArray(t)&&Array.isArray(t.intervals)){let n=On(t);return{fallbackRgb:w(n.fallbackColorHex),intervals:n.intervals.slice(0,ki).map(t=>({min:e(t.min),max:e(t.max),startRgb:w(t.startColorHex),endRgb:w(t.endColorHex)}))}}let n=ma(t);return{fallbackRgb:[0,0,0],intervals:n.slice(1).map((e,t)=>{let r=n[t];return{min:r.position,max:e.position,startRgb:r.rgb,endRgb:e.rgb}})}}function ga(t={}){let n=Array.isArray(t.staticRgb)?t.staticRgb.slice(0,3).map((t,n)=>e(Number.isFinite(t)?t:[1,1,1][n])):w(t.staticColorHex||`#ffffff`),r=ha(t.colorRamp||t.colorRampStops||[{position:0,colorHex:`#000000`},{position:1,colorHex:`#ffffff`}]);return{ok:!0,ignored:!1,modeCode:wi,featureIndex:0,staticRgb:n,rampStops:r.intervals,ramp:r,pulseBinarize:!1,valueTransfer:Pi(t.valueTransfer||{type:`none`})||Zi(),descriptor:Ui(),semanticsSignature:JSON.stringify({mode:wi,staticRgb:n})}}function _a(t={}){return{ok:!0,ignored:!1,modeCode:Di,staticAlpha:e(Number.isFinite(t?.staticAlpha)?t.staticAlpha:1),pulseBinarize:!1,descriptor:Ui(),semanticsSignature:JSON.stringify({mode:Di,staticAlpha:e(Number.isFinite(t?.staticAlpha)?t.staticAlpha:1)})}}function va(e,t,n=[]){let r=_a(e);if(String(e?.mode||`static`).trim().toLowerCase()!==`magnet`)return r;let i=Number.isInteger(t)?Math.max(0,Math.min(24,t)):0,a=e?.selectedMagnet||null,o=Array.isArray(n)?n:[],s=new Map(o.map(e=>[qi(e),e])),c=ta(a,i,$i(o,i),s);return c?{ok:!0,ignored:!1,modeCode:Oi,staticAlpha:r.staticAlpha,pulseBinarize:!!e?.pulseBinarize,descriptor:c,semanticsSignature:JSON.stringify({mode:Oi,staticAlpha:r.staticAlpha,pulseBinarize:!!e?.pulseBinarize,descriptor:{role:c.role,typeCode:c.typeCode,featureIndexA:c.featureIndexA,featureIndexB:c.featureIndexB,subsetFeatureIndexes:c.subsetFeatureIndexes,subsetReferenceValues:c.subsetReferenceValues,subsetActivationWeights:c.subsetActivationWeights,similaritySharpness:c.similaritySharpness,mixLambda:c.mixLambda,minSources:c.minSources,maxSources:c.maxSources,mixSources:c.mixSources,profileCriteria:c.profileCriteria,transfer1:c.transfer1,transfer2:c.transfer2,sourceTypeCode:c.sourceTypeCode,sourceFeatureIndexA:c.sourceFeatureIndexA,sourceFeatureIndexB:c.sourceFeatureIndexB,sourceSubsetFeatureIndexes:c.sourceSubsetFeatureIndexes,sourceSubsetReferenceValues:c.sourceSubsetReferenceValues,sourceSubsetActivationWeights:c.sourceSubsetActivationWeights,sourceSimilaritySharpness:c.sourceSimilaritySharpness,sourceMixLambda:c.sourceMixLambda,sourceMinSources:c.sourceMinSources,sourceMaxSources:c.sourceMaxSources,sourceMixSources:c.sourceMixSources,sourceProfileCriteria:c.sourceProfileCriteria,sourceTransfer1:c.sourceTransfer1,sourceTransfer2:c.sourceTransfer2}})}:{...r,ok:!1,ignored:!0,error:`Magnet-based particle alpha source is not supported by the GPU SC-pass.`}}function ya(e,t,n=`vec3<f32>(0.0, 0.0, params.noiseSeed)`){return!t||t.type===`none`?`clamp01(${e})`:t.type===`inverse`?`(1.0 - clamp01(${e}))`:t.type===`smooth`?`smoothstep01(${e})`:t.type===`threshold`?`applyThresholdTransfer(${e}, ${Q(t.tau)}, ${Q(t.delta)})`:t.type===`gamma`?`pow(clamp01(${e}), ${Q(t.gamma)})`:t.type===`clamp`?`applyClampTransfer(${e}, ${Q(t.clampA)}, ${Q(t.clampB)})`:t.type===`pulse`?`applyPulseTransfer(${e}, ${Q(t.pulseA)}, ${Q(t.pulseB)})`:t.type===`constant`?`applyConstantTransfer(${e}, ${Q(t.constantA)}, ${Q(t.constantB)}, ${Q(t.constantValue)})`:t.type===`gaussianPeak`?`applyGaussianPeakTransfer(${e}, ${Q(t.gaussianPeakA)}, ${Q(t.gaussianPeakR)}, ${Q(t.gaussianPeakEpsilon)})`:t.type===`stair`?`applyStairTransfer(${e}, ${Q(t.stairK)})`:t.type===`noise`?`applyNoiseTransfer(${e}, ${Q(t.noiseA)}, ${Q(t.noiseB)}, ${n})`:`clamp01(${e})`}function $(e,t=``){let n=[],r=e=>`${t}${e}`,i=r(`base`),a=r(`afterTransfer1`),o=r(`afterTransfer2`);if(e.typeCode===pi)n.push(`let ${i} = ${pa(e.featureIndexA)};`);else if(e.typeCode===mi){let t=Array.isArray(e.minSources)?e.minSources:[],a=[];if(t.forEach((e,t)=>{let i=r(`minSource${t}`);if(e.sourceType===`magnet`&&e.sourceDescriptor)if(e.sourceDescriptor.role===fi&&e.sourceDescriptor.sourceTypeCode){let t=$(xa(e.sourceDescriptor),`${i}_inverse_`);n.push(...t.lines),n.push(`let ${i} = clamp01(1.0 - ${t.resultExpr});`)}else{let t=$(ba(e.sourceDescriptor),`${i}_`);n.push(...t.lines),n.push(`let ${i} = clamp01(${t.resultExpr});`)}else n.push(`let ${i} = ${pa(e.featureIndex)};`);if(e.inverted){let o=r(`minSource${t}Inv`);n.push(`let ${o} = 1.0 - ${i};`);let s=r(`minSource${t}Transfer`);n.push(`let ${s} = ${ya(o,e.transfer||Zi(),`vec3<f32>(f32(particleIndex), ${Q(510+t)}, params.noiseSeed + ${Q(t)})`)};`),a.push(s)}else{let o=r(`minSource${t}Transfer`);n.push(`let ${o} = ${ya(i,e.transfer||Zi(),`vec3<f32>(f32(particleIndex), ${Q(510+t)}, params.noiseSeed + ${Q(t)})`)};`),a.push(o)}}),a.length<1)n.push(`let ${i} = 0.0;`);else{let e=`clamp01(${a[0]})`;for(let t=1;t<a.length;t+=1)e=`min(${e}, clamp01(${a[t]}))`;n.push(`let ${i} = ${e};`)}}else if(e.typeCode===hi){let t=Array.isArray(e.maxSources)?e.maxSources:[],a=[];if(t.forEach((e,t)=>{let i=r(`maxSource${t}`);if(e.sourceType===`magnet`&&e.sourceDescriptor)if(e.sourceDescriptor.role===fi&&e.sourceDescriptor.sourceTypeCode){let t=$(xa(e.sourceDescriptor),`${i}_inverse_`);n.push(...t.lines),n.push(`let ${i} = clamp01(1.0 - ${t.resultExpr});`)}else{let t=$(ba(e.sourceDescriptor),`${i}_`);n.push(...t.lines),n.push(`let ${i} = clamp01(${t.resultExpr});`)}else n.push(`let ${i} = ${pa(e.featureIndex)};`);if(e.inverted){let o=r(`maxSource${t}Inv`);n.push(`let ${o} = 1.0 - ${i};`);let s=r(`maxSource${t}Transfer`);n.push(`let ${s} = ${ya(o,e.transfer||Zi(),`vec3<f32>(f32(particleIndex), ${Q(610+t)}, params.noiseSeed + ${Q(t)})`)};`),a.push(s)}else{let o=r(`maxSource${t}Transfer`);n.push(`let ${o} = ${ya(i,e.transfer||Zi(),`vec3<f32>(f32(particleIndex), ${Q(610+t)}, params.noiseSeed + ${Q(t)})`)};`),a.push(o)}}),a.length<1)n.push(`let ${i} = 0.0;`);else{let e=`clamp01(${a[0]})`;for(let t=1;t<a.length;t+=1)e=`max(${e}, clamp01(${a[t]}))`;n.push(`let ${i} = ${e};`)}}else if(e.typeCode===yi){let t=(Array.isArray(e.mixSources)?e.mixSources:[]).filter(e=>Number.isFinite(e.blend)&&e.blend>0),a=[],o=[];if(t.forEach((e,t)=>{let i=r(`mixSource${t}`);if(e.sourceType===`magnet`&&e.sourceDescriptor)if(e.sourceDescriptor.role===fi&&e.sourceDescriptor.sourceTypeCode){let t=$(xa(e.sourceDescriptor),`${i}_inverse_`);n.push(...t.lines),n.push(`let ${i} = clamp01(1.0 - ${t.resultExpr});`)}else{let t=$(ba(e.sourceDescriptor),`${i}_`);n.push(...t.lines),n.push(`let ${i} = clamp01(${t.resultExpr});`)}else n.push(`let ${i} = ${pa(e.featureIndex)};`);let s=e.inverted?`(1.0 - ${i})`:i,c=r(`mixSource${t}Transfer`);n.push(`let ${c} = ${ya(s,e.transfer||Zi(),`vec3<f32>(f32(particleIndex), ${Q(710+t)}, params.noiseSeed + ${Q(t)})`)};`);let l=Q(e.blend);a.push(`(${l} * clamp01(${c}))`),o.push(l)}),a.length<1)n.push(`let ${i} = 0.0;`);else{let e=r(`mixBlendSum`);n.push(`let ${e} = ${o.join(` + `)};`),n.push(`let ${i} = select(0.0, (${a.join(` + `)}) / ${e}, ${e} > 0.0);`)}}else if(e.typeCode===bi){let t=Array.isArray(e.profileCriteria)?e.profileCriteria:[],a=[],o=[];if(t.forEach((e,t)=>{if(e.enabled===!1||!Number.isFinite(e.weight)||e.weight<=0)return;let i=r(`profileSource${t}`),s=r(`profileDelta${t}`),c=-Math.log(Math.max(1e-8,Math.min(.999999,e.epsilon)))/Math.max(1e-12,e.radius*e.radius),l=Math.max(0,e.weight);n.push(`let ${i} = ${pa(e.featureIndex)};`),n.push(`let ${s} = ${i} - ${Q(e.target)};`),a.push(`${Q(l)} * (-${Q(c)} * ${s} * ${s})`),o.push(Q(l))}),a.length<1)n.push(`let ${i} = 0.0;`);else{let e=r(`profileLogSum`),t=r(`profileWeightSum`);n.push(`let ${e} = ${a.join(` + `)};`),n.push(`let ${t} = ${o.join(` + `)};`),n.push(`let ${i} = select(0.0, exp(${e} / ${t}), ${t} > ${Q(ei)});`)}}else if(e.typeCode===_i||e.typeCode===gi||e.typeCode===vi){let t=(Array.isArray(e.subsetFeatureIndexes)?e.subsetFeatureIndexes:[]).map((e,t)=>{let i=r(`v${t}`);return n.push(`let ${i} = ${pa(e)};`),i});if(e.typeCode===_i){let e=t.map(e=>`(${e} * ${e})`).join(` + `);n.push(`let ${i} = sqrt(${e}) / sqrt(${Q(Math.max(1,t.length))});`)}else if(e.typeCode===gi){let e=r(`mean`),a=r(`variance`);n.push(`let ${e} = (${t.join(` + `)}) / ${Q(t.length)};`);let o=t.map(t=>`((${t} - ${e}) * (${t} - ${e}))`).join(` + `);n.push(`let ${a} = (${o}) / ${Q(t.length)};`),n.push(`let ${i} = 1.0 - (4.0 * ${a});`)}else{let a=Array.isArray(e.subsetReferenceValues)?e.subsetReferenceValues:[],o=Array.isArray(e.subsetActivationWeights)?e.subsetActivationWeights:[],s=[],c=[];for(let e=0;e<t.length;e+=1){let i=r(`r${e}`),l=r(`a${e}`);n.push(`let ${i} = ${Q(a[e]??0)};`),n.push(`let ${l} = ${Q(o[e]??1)};`),s.push(`${l} * ((${t[e]} - ${i}) * (${t[e]} - ${i}))`),c.push(l)}let l=r(`weightedSq`),u=r(`activationSum`),d=Number.isFinite(e.similaritySharpness)?e.similaritySharpness:Je();n.push(`let ${l} = ${s.join(` + `)};`),n.push(`let ${u} = ${c.join(` + `)};`),n.push(`let ${i} = select(0.0, exp(-${Q(d)} * (${l} / ${u})), ${u} > ${Q(ei)});`)}}else n.push(`let ${i} = 0.0;`);return n.push(`let ${a} = ${ya(i,e.transfer1,`vec3<f32>(f32(particleIndex), ${Q(e.noiseTag1||1)}, params.noiseSeed)`)};`),n.push(`let ${o} = ${ya(a,e.transfer2,`vec3<f32>(f32(particleIndex), ${Q(e.noiseTag2||2)}, params.noiseSeed + 17.0)`)};`),{lines:n,resultExpr:o}}function ba(e){return{typeCode:e.typeCode,featureIndexA:e.featureIndexA,featureIndexB:e.featureIndexB,subsetFeatureIndexes:e.subsetFeatureIndexes||[],subsetReferenceValues:e.subsetReferenceValues||[],subsetActivationWeights:e.subsetActivationWeights||[],similaritySharpness:e.similaritySharpness,mixLambda:e.mixLambda,minSources:Ki(e.minSources),maxSources:Ki(e.maxSources),mixSources:Ki(e.mixSources),profileCriteria:Gi(e.profileCriteria),transfer1:e.transfer1||Pi({type:`none`}),transfer2:e.transfer2||Pi({type:`none`}),noiseTag1:100+e.typeCode,noiseTag2:200+e.typeCode}}function xa(e){return{typeCode:e.sourceTypeCode,featureIndexA:e.sourceFeatureIndexA,featureIndexB:e.sourceFeatureIndexB,subsetFeatureIndexes:e.sourceSubsetFeatureIndexes||[],subsetReferenceValues:e.sourceSubsetReferenceValues||[],subsetActivationWeights:e.sourceSubsetActivationWeights||[],similaritySharpness:e.sourceSimilaritySharpness,mixLambda:e.sourceMixLambda,minSources:Ki(e.sourceMinSources),maxSources:Ki(e.sourceMaxSources),mixSources:Ki(e.sourceMixSources),profileCriteria:Gi(e.sourceProfileCriteria),transfer1:e.sourceTransfer1||Pi({type:`none`}),transfer2:e.sourceTransfer2||Pi({type:`none`}),noiseTag1:300+e.sourceTypeCode,noiseTag2:400+e.sourceTypeCode}}function Sa(e,t){if(!e.active||e.role===ui)return`fn magnet_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  return 0.0;\n}`;if(e.role===di&&e.typeCode){let{lines:n,resultExpr:r}=$(ba(e));return`fn magnet_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${n.join(`
  `)}\n  return clamp01(${r});\n}`}if(e.role===fi&&e.sourceTypeCode){let{lines:n,resultExpr:r}=$(xa(e),`source_`);return`fn magnet_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${n.join(`
  `)}\n  return clamp01(1.0 - ${r});\n}`}return`fn magnet_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  return 0.0;\n}`}function Ca(e,t){if(!e.active||e.role===ui)return`fn filter_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  return 1.0;\n}`;let n=[],r=`1.0`;if(e.role===di&&e.typeCode){let i=$(ba(e),`filter${t}_`);n=i.lines,r=i.resultExpr}else if(e.role===fi&&e.sourceTypeCode){let i=$(xa(e),`filter${t}_source_`);n=i.lines,r=`(1.0 - ${i.resultExpr})`}let i=`filter${t}_afterFilter1`,a=`filter${t}_afterFilter2`,o=e.filterTransfer1||Zi(),s=e.filterTransfer2||Zi();return`fn filter_${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${[...n,`let ${i} = ${ya(r,o,`vec3<f32>(f32(particleIndex), ${Q(500+t)}, params.noiseSeed + 31.0)`)};`,`let ${a} = ${ya(i,s,`vec3<f32>(f32(particleIndex), ${Q(600+t)}, params.noiseSeed + 47.0)`)};`].join(`
  `)}\n  return clamp01(${a});\n}`}function wa(e){if(!e?.ok)return`fn size_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`;if(e.modeCode===Si)return`fn size_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  return ${pa(e.featureIndex)};\n}`;if(e.modeCode===Ci){let t=e.descriptor;if(t?.role===di&&t.typeCode){let{lines:e,resultExpr:n}=$(ba(t),`size_`);return`fn size_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(${n});\n}`}if(t?.role===fi&&t.sourceTypeCode){let{lines:e,resultExpr:n}=$(xa(t),`size_source_`);return`fn size_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(1.0 - ${n});\n}`}}return`fn size_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`}function Ta(e){if(!e?.ok)return`fn color_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`;if(e.modeCode===Ti)return`fn color_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  return ${pa(e.featureIndex)};\n}`;if(e.modeCode===Ei){let t=e.descriptor;if(t?.role===di&&t.typeCode){let{lines:e,resultExpr:n}=$(ba(t),`color_`);return`fn color_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(${n});\n}`}if(t?.role===fi&&t.sourceTypeCode){let{lines:e,resultExpr:n}=$(xa(t),`color_source_`);return`fn color_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(1.0 - ${n});\n}`}}return`fn color_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`}function Ea(e){if(!e||e.modeCode===Di)return`fn alpha_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`;let t=e.descriptor;if(t?.role===di&&t.typeCode){let{lines:e,resultExpr:n}=$(ba(t),`alpha_`);return`fn alpha_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(${n});\n}`}if(t?.role===fi&&t.sourceTypeCode){let{lines:e,resultExpr:n}=$(xa(t),`alpha_source_`);return`fn alpha_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(1.0 - ${n});\n}`}return`fn alpha_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`}function Da(t){let n=Array.isArray(t)?t:[1,1,1];return`vec3<f32>(${Q(e(n[0]))}, ${Q(e(n[1]))}, ${Q(e(n[2]))})`}function Oa(e){let t=e?.ramp&&Array.isArray(e.ramp.intervals)?e.ramp:ha(e?.rampStops),n=Array.isArray(t.intervals)&&t.intervals.length>0?t.intervals:ha().intervals,r=Array.isArray(t.fallbackRgb)?t.fallbackRgb:[0,0,0],i=[`fn sample_color_ramp(value: f32) -> vec3<f32> {`,`  let t = clamp01(value);`];for(let e of n)i.push(`  if (t >= ${Q(e.min)} && t <= ${Q(e.max)}) {`),i.push(`    let localT = (t - ${Q(e.min)}) / max(0.0001, ${Q(e.max-e.min)});`),i.push(`    return mix(${Da(e.startRgb)}, ${Da(e.endRgb)}, clamp01(localT));`),i.push(`  }`);return i.push(`  return ${Da(r)};`),i.push(`}`),i.join(`
`)}function ka(e){let t=wa(e),n=e?.colorDescriptor||ga(),r=n.alphaDescriptor||_a(),i=Ta(n),a=Ea(r),o=Oa(n),s=ya(`colorWeight`,n.valueTransfer||Zi(),`vec3<f32>(f32(index), 700.0, params.noiseSeed + 71.0)`);return`
struct FeatureVec {
  b0: vec4<f32>,
  b1: vec4<f32>,
  b2: vec4<f32>,
  b3: vec4<f32>,
  b4: vec4<f32>,
  b5: vec4<f32>,
};

struct SizeParams {
  particleCount: f32,
  mode: f32,
  featureIndex: f32,
  sinkFixedMode: f32,
  staticSizePx: f32,
  minSizePx: f32,
  maxSizePx: f32,
  sinkFixedSizePx: f32,
  noiseSeed: f32,
  pulseBinarize: f32,
  colorMode: f32,
  colorFeatureIndex: f32,
  colorRampStopCount: f32,
  colorPulseBinarize: f32,
  alphaMode: f32,
  staticAlpha: f32,
  alphaPulseBinarize: f32,
  _pad0: f32,
};

@group(0) @binding(0) var<storage, read> features: array<FeatureVec>;
@group(0) @binding(1) var<uniform> params: SizeParams;
@group(0) @binding(2) var<storage, read> activeMask: array<u32>;
@group(0) @binding(3) var<storage, read_write> sizes: array<f32>;
@group(0) @binding(4) var<storage, read_write> colors: array<vec4<f32>>;

fn clamp01(value: f32) -> f32 {
  return clamp(value, 0.0, 1.0);
}

fn smoothstep01(value: f32) -> f32 {
  let t = clamp01(value);
  return 3.0 * t * t - 2.0 * t * t * t;
}

fn applyThresholdTransfer(weight: f32, tau: f32, delta: f32) -> f32 {
  let w = clamp01(weight);
  let t = clamp01(tau);
  let maxDelta = min(t, 1.0 - t);
  let d = max(1e-6, min(maxDelta, delta));
  let lower = t - d;
  let upper = t + d;
  if (w <= lower) {
    return 0.0;
  }
  if (w >= upper) {
    return 1.0;
  }
  let x = (w - lower) / (2.0 * d);
  return smoothstep01(x);
}

fn applyClampTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (abs(bb - aa) <= 1e-12) {
    return select(0.0, 1.0, w > aa);
  }
  if (w <= aa) {
    return 0.0;
  }
  if (w >= bb) {
    return 1.0;
  }
  return (w - aa) / (bb - aa);
}

fn applyPulseTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return 0.0;
  }
  return 1.0;
}

fn applyConstantTransfer(weight: f32, a: f32, b: f32, value: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return w;
  }
  return clamp01(value);
}

fn applyGaussianPeakTransfer(weight: f32, a: f32, r: f32, epsilon: f32) -> f32 {
  let w = clamp01(weight);
  let center = clamp01(a);
  let radius = max(0.0, r);
  if (radius <= 0.0) {
    return select(0.0, 1.0, abs(w - center) <= 1e-6);
  }
  let safeEpsilon = clamp(epsilon, 1e-6, 0.999999);
  let alpha = -log(safeEpsilon) / (radius * radius);
  return clamp01(exp(-alpha * (w - center) * (w - center)));
}

fn applyStairTransfer(weight: f32, k: f32) -> f32 {
  let steps = max(2.0, round(k));
  let index = min(steps - 1.0, floor(clamp01(weight) * steps));
  return index / (steps - 1.0);
}

fn noiseHash(seed: vec3<f32>) -> f32 {
  return fract(sin(dot(seed, vec3<f32>(12.9898, 78.233, 37.719))) * 43758.5453123);
}

fn applyNoiseTransfer(weight: f32, a: f32, b: f32, seed: vec3<f32>) -> f32 {
  let aa = clamp(a, -1.0, 1.0);
  let bb = clamp(b, -1.0, 1.0);
  let low = min(aa, bb);
  let high = max(aa, bb);
  let value = low + ((high - low) * noiseHash(seed));
  return clamp01(weight + value);
}

${t}
${i}
${a}
${o}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= u32(params.particleCount)) {
    return;
  }
  let f = features[index];
  var sizePx = max(0.0, params.staticSizePx);
  if (activeMask[index] == 0u && params.sinkFixedMode > 0.5) {
    sizePx = max(0.0, params.sinkFixedSizePx);
  } else if (params.mode >= 0.5) {
    var weight = clamp01(size_source(f, index));
    if (params.pulseBinarize > 0.5) {
      weight = select(0.0, 1.0, weight >= 0.5);
    }
    sizePx = max(0.0, params.minSizePx + (weight * (params.maxSizePx - params.minSizePx)));
  }
  sizes[index] = sizePx;

  var colorRgb = ${Da(n.staticRgb||[1,1,1])};
  if (params.colorMode >= 0.5) {
    var colorWeight = clamp01(color_source(f, index));
    if (params.colorPulseBinarize > 0.5) {
      colorWeight = select(0.0, 1.0, colorWeight >= 0.5);
    }
    let colorT = ${s};
    colorRgb = sample_color_ramp(colorT);
  }
  var alpha = clamp01(params.staticAlpha);
  if (params.alphaMode > 0.5) {
    alpha = clamp01(alpha_source(f, index));
    if (params.alphaPulseBinarize > 0.5) {
      alpha = select(0.0, 1.0, alpha >= 0.5);
    }
  }
  colors[index] = vec4<f32>(colorRgb, alpha);
}`}function Aa(e){return`
struct FeatureVec {
  b0: vec4<f32>,
  b1: vec4<f32>,
  b2: vec4<f32>,
  b3: vec4<f32>,
  b4: vec4<f32>,
  b5: vec4<f32>,
};

struct PlacementParams {
  particleCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  centerX: f32,
  centerY: f32,
  beta: f32,
  noiseSeed: f32,
};

@group(0) @binding(0) var<storage, read> features: array<FeatureVec>;
@group(0) @binding(1) var<uniform> params: PlacementParams;
@group(0) @binding(2) var<storage, read_write> activeMask: array<u32>;
@group(0) @binding(3) var<storage, read_write> filterOwnerSlots: array<u32>;

fn clamp01(value: f32) -> f32 {
  return clamp(value, 0.0, 1.0);
}

fn smoothstep01(value: f32) -> f32 {
  let t = clamp01(value);
  return 3.0 * t * t - 2.0 * t * t * t;
}

fn applyThresholdTransfer(weight: f32, tau: f32, delta: f32) -> f32 {
  let w = clamp01(weight);
  let t = clamp01(tau);
  let maxDelta = min(t, 1.0 - t);
  let d = max(1e-6, min(maxDelta, delta));
  let lower = t - d;
  let upper = t + d;
  if (w <= lower) {
    return 0.0;
  }
  if (w >= upper) {
    return 1.0;
  }
  let x = (w - lower) / (2.0 * d);
  return smoothstep01(x);
}

fn applyClampTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (abs(bb - aa) <= 1e-12) {
    return select(0.0, 1.0, w > aa);
  }
  if (w <= aa) {
    return 0.0;
  }
  if (w >= bb) {
    return 1.0;
  }
  return (w - aa) / (bb - aa);
}

fn applyPulseTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return 0.0;
  }
  return 1.0;
}

fn applyConstantTransfer(weight: f32, a: f32, b: f32, value: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return w;
  }
  return clamp01(value);
}

fn applyGaussianPeakTransfer(weight: f32, a: f32, r: f32, epsilon: f32) -> f32 {
  let w = clamp01(weight);
  let center = clamp01(a);
  let radius = max(0.0, r);
  if (radius <= 0.0) {
    return select(0.0, 1.0, abs(w - center) <= 1e-6);
  }
  let safeEpsilon = clamp(epsilon, 1e-6, 0.999999);
  let alpha = -log(safeEpsilon) / (radius * radius);
  return clamp01(exp(-alpha * (w - center) * (w - center)));
}

fn applyStairTransfer(weight: f32, k: f32) -> f32 {
  let steps = max(2.0, round(k));
  let index = min(steps - 1.0, floor(clamp01(weight) * steps));
  return index / (steps - 1.0);
}

fn noiseHash(seed: vec3<f32>) -> f32 {
  return fract(sin(dot(seed, vec3<f32>(12.9898, 78.233, 37.719))) * 43758.5453123);
}

fn applyNoiseTransfer(weight: f32, a: f32, b: f32, seed: vec3<f32>) -> f32 {
  let aa = clamp(a, -1.0, 1.0);
  let bb = clamp(b, -1.0, 1.0);
  let low = min(aa, bb);
  let high = max(aa, bb);
  let value = low + ((high - low) * noiseHash(seed));
  return clamp01(weight + value);
}

${e.map((e,t)=>Ca(e,t)).join(`

`)}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount) {
    return;
  }
  let f = features[index];
  var filterOwner = 0u;
${e.map((e,t)=>e?.active?`  if (filterOwner == 0u && filter_${t}(f, index) <= ${Q(ei)}) {\n    filterOwner = ${t+1}u;\n  }`:``).filter(Boolean).join(`
`)||`  filterOwner = 0u;`}
  filterOwnerSlots[index] = filterOwner;
  activeMask[index] = select(1u, 0u, filterOwner > 0u);
}`}function ja(e){return`
struct FeatureVec {
  b0: vec4<f32>,
  b1: vec4<f32>,
  b2: vec4<f32>,
  b3: vec4<f32>,
  b4: vec4<f32>,
  b5: vec4<f32>,
};

struct PlacementParams {
  particleCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  centerX: f32,
  centerY: f32,
  beta: f32,
  noiseSeed: f32,
};

@group(0) @binding(0) var<storage, read> features: array<FeatureVec>;
@group(0) @binding(1) var<uniform> params: PlacementParams;
@group(0) @binding(2) var<storage, read_write> weights: array<vec4<f32>>;

fn clamp01(value: f32) -> f32 {
  return clamp(value, 0.0, 1.0);
}

fn smoothstep01(value: f32) -> f32 {
  let t = clamp01(value);
  return 3.0 * t * t - 2.0 * t * t * t;
}

fn applyThresholdTransfer(weight: f32, tau: f32, delta: f32) -> f32 {
  let w = clamp01(weight);
  let t = clamp01(tau);
  let maxDelta = min(t, 1.0 - t);
  let d = max(1e-6, min(maxDelta, delta));
  let lower = t - d;
  let upper = t + d;
  if (w <= lower) {
    return 0.0;
  }
  if (w >= upper) {
    return 1.0;
  }
  let x = (w - lower) / (2.0 * d);
  return smoothstep01(x);
}

fn applyClampTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (abs(bb - aa) <= 1e-12) {
    return select(0.0, 1.0, w > aa);
  }
  if (w <= aa) {
    return 0.0;
  }
  if (w >= bb) {
    return 1.0;
  }
  return (w - aa) / (bb - aa);
}

fn applyPulseTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return 0.0;
  }
  return 1.0;
}

fn applyConstantTransfer(weight: f32, a: f32, b: f32, value: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return w;
  }
  return clamp01(value);
}

fn applyGaussianPeakTransfer(weight: f32, a: f32, r: f32, epsilon: f32) -> f32 {
  let w = clamp01(weight);
  let center = clamp01(a);
  let radius = max(0.0, r);
  if (radius <= 0.0) {
    return select(0.0, 1.0, abs(w - center) <= 1e-6);
  }
  let safeEpsilon = clamp(epsilon, 1e-6, 0.999999);
  let alpha = -log(safeEpsilon) / (radius * radius);
  return clamp01(exp(-alpha * (w - center) * (w - center)));
}

fn applyStairTransfer(weight: f32, k: f32) -> f32 {
  let steps = max(2.0, round(k));
  let index = min(steps - 1.0, floor(clamp01(weight) * steps));
  return index / (steps - 1.0);
}

fn noiseHash(seed: vec3<f32>) -> f32 {
  return fract(sin(dot(seed, vec3<f32>(12.9898, 78.233, 37.719))) * 43758.5453123);
}

fn applyNoiseTransfer(weight: f32, a: f32, b: f32, seed: vec3<f32>) -> f32 {
  let aa = clamp(a, -1.0, 1.0);
  let bb = clamp(b, -1.0, 1.0);
  let low = min(aa, bb);
  let high = max(aa, bb);
  let value = low + ((high - low) * noiseHash(seed));
  return clamp01(weight + value);
}

${e.map((e,t)=>Sa(e,t)).join(`

`)}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount) {
    return;
  }
  let f = features[index];
  let base = index * 4u;
  weights[base + 0u] = vec4<f32>(magnet_0(f, index), magnet_1(f, index), magnet_2(f, index), magnet_3(f, index));
  weights[base + 1u] = vec4<f32>(magnet_4(f, index), magnet_5(f, index), magnet_6(f, index), magnet_7(f, index));
  weights[base + 2u] = vec4<f32>(magnet_8(f, index), magnet_9(f, index), magnet_10(f, index), magnet_11(f, index));
  weights[base + 3u] = vec4<f32>(magnet_12(f, index), magnet_13(f, index), magnet_14(f, index), magnet_15(f, index));
}`}function Ma(e){let t=e?.ok?e:aa();if(t.sourceMode===`feature`)return`fn layer_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  return ${pa(t.featureIndex)};\n}`;if(t.sourceMode===`magnet`){let e=t.sourceDescriptor;if(e?.role===di&&e.typeCode){let{lines:t,resultExpr:n}=$(ba(e),`layer_source_`);return`fn layer_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${t.join(`
  `)}\n  return clamp01(${n});\n}`}if(e?.role===fi&&e.sourceTypeCode){let{lines:t,resultExpr:n}=$(xa(e),`layer_source_inverse_`);return`fn layer_source(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${t.join(`
  `)}\n  return clamp01(1.0 - ${n});\n}`}}return`fn layer_source(f: FeatureVec, particleIndex: u32) -> f32 {
  return 0.0;
}`}function Na(e){let t=e?.ok?e:aa();if(t.layoutType===`2d`)return[`fn sample_layer_z(value: f32) -> f32 {`,`  return ${Q(Number.isFinite(Number(t.baseZ))?Number(t.baseZ):si)};`,`}`].join(`
`);if(t.layoutType===`height`){let e=Number.isFinite(Number(t.zMin))?Number(t.zMin):si,n=Number.isFinite(Number(t.zMax))?Number(t.zMax):oi;return[`fn sample_layer_z(value: f32) -> f32 {`,`  let zMin = ${Q(Math.min(e,n))};`,`  let zMax = ${Q(Math.max(e,n))};`,`  let w = clamp01(value);`,`  return zMin + (w * (zMax - zMin));`,`}`].join(`
`)}let n=Ri(t.intervals),r=Number.isFinite(Number(t.baseZ))?Number(t.baseZ):si;if(t.sourceMode===`none`||n.length===0)return[`fn sample_layer_z(value: f32) -> f32 {`,`  return ${Q(r)};`,`}`].join(`
`);let i=[`fn sample_layer_z(value: f32) -> f32 {`,`  let fallback = ${Q(r)};`,`  let w = clamp01(value);`];for(let e of n){let t=Q(e.zMin),n=Q(e.zMax),r=e.zMax>=oi?`w <= ${Q(oi)}`:`w < ${n}`;i.push(`  if (w >= ${t} && ${r}) {`),i.push(`    return ${Q(e.active===!1?ci:e.zLayer)};`),i.push(`  }`)}return i.push(`  return fallback;`),i.push(`}`),i.join(`
`)}function Pa(e){let t=e?.ok?e:aa();return`
struct FeatureVec {
  b0: vec4<f32>,
  b1: vec4<f32>,
  b2: vec4<f32>,
  b3: vec4<f32>,
  b4: vec4<f32>,
  b5: vec4<f32>,
};

struct PlacementParams {
  particleCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  centerX: f32,
  centerY: f32,
  beta: f32,
  noiseSeed: f32,
};

@group(0) @binding(0) var<storage, read> features: array<FeatureVec>;
@group(0) @binding(1) var<uniform> params: PlacementParams;
@group(0) @binding(2) var<storage, read_write> layerZ: array<f32>;

fn clamp01(value: f32) -> f32 {
  return clamp(value, 0.0, 1.0);
}

fn smoothstep01(value: f32) -> f32 {
  let t = clamp01(value);
  return 3.0 * t * t - 2.0 * t * t * t;
}

fn applyThresholdTransfer(weight: f32, tau: f32, delta: f32) -> f32 {
  let w = clamp01(weight);
  let t = clamp01(tau);
  let maxDelta = min(t, 1.0 - t);
  let d = max(1e-6, min(maxDelta, delta));
  let lower = t - d;
  let upper = t + d;
  if (w <= lower) {
    return 0.0;
  }
  if (w >= upper) {
    return 1.0;
  }
  let x = (w - lower) / (2.0 * d);
  return smoothstep01(x);
}

fn applyClampTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (abs(bb - aa) <= 1e-12) {
    return select(0.0, 1.0, w > aa);
  }
  if (w <= aa) {
    return 0.0;
  }
  if (w >= bb) {
    return 1.0;
  }
  return (w - aa) / (bb - aa);
}

fn applyPulseTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return 0.0;
  }
  return 1.0;
}

fn applyConstantTransfer(weight: f32, a: f32, b: f32, value: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return w;
  }
  return clamp01(value);
}

fn applyGaussianPeakTransfer(weight: f32, a: f32, r: f32, epsilon: f32) -> f32 {
  let w = clamp01(weight);
  let center = clamp01(a);
  let radius = max(0.0, r);
  if (radius <= 0.0) {
    return select(0.0, 1.0, abs(w - center) <= 1e-6);
  }
  let safeEpsilon = clamp(epsilon, 1e-6, 0.999999);
  let alpha = -log(safeEpsilon) / (radius * radius);
  return clamp01(exp(-alpha * (w - center) * (w - center)));
}

fn applyStairTransfer(weight: f32, k: f32) -> f32 {
  let steps = max(2.0, round(k));
  let stepIndex = min(steps - 1.0, floor(clamp01(weight) * steps));
  return stepIndex / (steps - 1.0);
}

fn noiseHash(seed: vec3<f32>) -> f32 {
  return fract(sin(dot(seed, vec3<f32>(12.9898, 78.233, 37.719))) * 43758.5453123);
}

fn applyNoiseTransfer(weight: f32, a: f32, b: f32, seed: vec3<f32>) -> f32 {
  let aa = clamp(a, -1.0, 1.0);
  let bb = clamp(b, -1.0, 1.0);
  let low = min(aa, bb);
  let high = max(aa, bb);
  let value = low + ((high - low) * noiseHash(seed));
  return clamp01(weight + value);
}

${Ma(t)}

${Na(t)}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount) {
    return;
  }
  let f = features[index];
  let layerAfterTransfer1 = ${ya(`layer_source(f, index)`,t.transfer1||Zi(),`vec3<f32>(f32(index), 900.0, params.noiseSeed + 101.0)`)};
  let layerValue = clamp01(${ya(`layerAfterTransfer1`,t.transfer2||Zi(),`vec3<f32>(f32(index), 901.0, params.noiseSeed + 103.0)`)});
  layerZ[index] = sample_layer_z(layerValue);
}`}function Fa(e,t){let n=e||{};if(n.sourceMode===`feature`&&Number.isInteger(n.featureIndex)&&n.featureIndex>=0)return`fn ${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  return ${pa(n.featureIndex)};\n}`;let r=n.sourceDescriptor;if(r){if(r.role===di){let{lines:e,resultExpr:n}=$(ba(r),`${t}_`);return`fn ${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(${n});\n}`}if(r.role===fi&&r.sourceTypeCode){let{lines:e,resultExpr:n}=$(xa(r),`${t}_inverse_`);return`fn ${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  ${e.join(`
  `)}\n  return clamp01(1.0 - ${n});\n}`}}return`fn ${t}(f: FeatureVec, particleIndex: u32) -> f32 {\n  return 0.0;\n}`}function Ia(e,t){let n=e||{},r=ya(`rawValue`,n.transfer,`vec3<f32>(f32(particleIndex), ${Q(n.featureIndex??0)}, params.noiseSeed)`),i=Number.isFinite(n.outputMin)?n.outputMin:-1,a=Number.isFinite(n.outputMax)?n.outputMax:1;return`fn ${t}(rawValue: f32, particleIndex: u32) -> f32 {
  let transferred = clamp01(${r});
  let outputMin = ${Q(i)};
  let outputMax = ${Q(a)};
  return outputMin + transferred * (outputMax - outputMin);
}`}function La(){return`
struct FeatureVec {
  b0: vec4<f32>,
  b1: vec4<f32>,
  b2: vec4<f32>,
  b3: vec4<f32>,
  b4: vec4<f32>,
  b5: vec4<f32>,
};

struct PlacementParams {
  particleCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  centerX: f32,
  centerY: f32,
  beta: f32,
  noiseSeed: f32,
};

fn clamp01(value: f32) -> f32 {
  return clamp(value, 0.0, 1.0);
}

fn smoothstep01(value: f32) -> f32 {
  let t = clamp01(value);
  return 3.0 * t * t - 2.0 * t * t * t;
}

fn applyThresholdTransfer(weight: f32, tau: f32, delta: f32) -> f32 {
  let w = clamp01(weight);
  let t = clamp01(tau);
  let maxDelta = min(t, 1.0 - t);
  let d = max(1e-6, min(maxDelta, delta));
  let lower = t - d;
  let upper = t + d;
  if (w <= lower) {
    return 0.0;
  }
  if (w >= upper) {
    return 1.0;
  }
  let x = (w - lower) / (2.0 * d);
  return smoothstep01(x);
}

fn applyClampTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (abs(bb - aa) <= 1e-12) {
    return select(0.0, 1.0, w > aa);
  }
  if (w <= aa) {
    return 0.0;
  }
  if (w >= bb) {
    return 1.0;
  }
  return (w - aa) / (bb - aa);
}

fn applyPulseTransfer(weight: f32, a: f32, b: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return 0.0;
  }
  return 1.0;
}

fn applyConstantTransfer(weight: f32, a: f32, b: f32, value: f32) -> f32 {
  let w = clamp01(weight);
  let aa = clamp01(a);
  let bb = clamp01(b);
  if (w < aa || w > bb) {
    return w;
  }
  return clamp01(value);
}

fn applyGaussianPeakTransfer(weight: f32, a: f32, r: f32, epsilon: f32) -> f32 {
  let w = clamp01(weight);
  let center = clamp01(a);
  let radius = max(0.0, r);
  if (radius <= 0.0) {
    return select(0.0, 1.0, abs(w - center) <= 1e-6);
  }
  let safeEpsilon = clamp(epsilon, 1e-6, 0.999999);
  let alpha = -log(safeEpsilon) / (radius * radius);
  return clamp01(exp(-alpha * (w - center) * (w - center)));
}

fn applyStairTransfer(weight: f32, k: f32) -> f32 {
  let steps = max(2.0, round(k));
  let stepIndex = min(steps - 1.0, floor(clamp01(weight) * steps));
  return stepIndex / (steps - 1.0);
}

fn noiseHash(seed: vec3<f32>) -> f32 {
  return fract(sin(dot(seed, vec3<f32>(12.9898, 78.233, 37.719))) * 43758.5453123);
}

fn applyNoiseTransfer(weight: f32, a: f32, b: f32, seed: vec3<f32>) -> f32 {
  let aa = clamp(a, -1.0, 1.0);
  let bb = clamp(b, -1.0, 1.0);
  let low = min(aa, bb);
  let high = max(aa, bb);
  let value = low + ((high - low) * noiseHash(seed));
  return clamp01(weight + value);
}
`}function Ra(e=null){let t=e?.ok?e:aa();if(t.layoutType===`scatter3d`){let e=t.scatterAxes||{};return`
${La()}

@group(0) @binding(2) var<uniform> params: PlacementParams;
@group(0) @binding(3) var<storage, read_write> positions: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read> activeMask: array<u32>;
@group(0) @binding(6) var<storage, read> features: array<FeatureVec>;

${Fa(e.x,`scatter_x_source`)}
${Fa(e.y,`scatter_y_source`)}
${Fa(e.z,`scatter_z_source`)}
${Ia(e.x,`scatter_x_map`)}
${Ia(e.y,`scatter_y_map`)}
${Ia(e.z,`scatter_z_map`)}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount) {
    return;
  }
  if (activeMask[index] == 0u) {
    positions[index] = vec4<f32>(0.0, 0.0, 0.0, 0.0);
    return;
  }
  let f = features[index];
  let x = scatter_x_map(scatter_x_source(f, index), index);
  let y = scatter_y_map(scatter_y_source(f, index), index);
  let z = scatter_z_map(scatter_z_source(f, index), index);
  positions[index] = vec4<f32>(x, y, z, 1.0);
}`}return`
${La()}

@group(0) @binding(0) var<storage, read> weights: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> magnets: array<vec4<f32>>;
@group(0) @binding(2) var<uniform> params: PlacementParams;
@group(0) @binding(3) var<storage, read_write> positions: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read> activeMask: array<u32>;
@group(0) @binding(5) var<storage, read> layerZ: array<f32>;

fn getWeight(base: u32, magnetIndex: u32) -> f32 {
  let block = weights[base + (magnetIndex / 4u)];
  switch (magnetIndex & 3u) {
    case 0u: {
      return block.x;
    }
    case 1u: {
      return block.y;
    }
    case 2u: {
      return block.z;
    }
    default: {
      return block.w;
    }
  }
}

fn clampToReferencePlaneBorder(rawX: f32, rawY: f32, centerX: f32, centerY: f32) -> vec2<f32> {
  if (rawX >= -1.0 && rawX <= 1.0 && rawY >= -1.0 && rawY <= 1.0) {
    return vec2<f32>(rawX, rawY);
  }
  let safeCenter = vec2<f32>(clamp(centerX, -1.0, 1.0), clamp(centerY, -1.0, 1.0));
  let delta = vec2<f32>(rawX, rawY) - safeCenter;
  var scale = 1.0;
  if (abs(delta.x) > ${ei}) {
    if (delta.x > 0.0) {
      scale = min(scale, (1.0 - safeCenter.x) / delta.x);
    } else {
      scale = min(scale, (-1.0 - safeCenter.x) / delta.x);
    }
  }
  if (abs(delta.y) > ${ei}) {
    if (delta.y > 0.0) {
      scale = min(scale, (1.0 - safeCenter.y) / delta.y);
    } else {
      scale = min(scale, (-1.0 - safeCenter.y) / delta.y);
    }
  }
  let result = safeCenter + (delta * max(0.0, scale));
  return clamp(result, vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, 1.0));
}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount) {
    return;
  }
  if (activeMask[index] == 0u) {
    positions[index] = vec4<f32>(0.0, 0.0, 0.0, 0.0);
    return;
  }
  let base = index * 4u;
  var signedSumX = 0.0;
  var signedSumY = 0.0;
  var absWeightSum = 0.0;
  for (var magnetIndex = 0u; magnetIndex < 16u; magnetIndex = magnetIndex + 1u) {
    let magnetState = magnets[magnetIndex];
    if (magnetState.w < 0.5) {
      continue;
    }
    let signedWeight = magnetState.z * getWeight(base, magnetIndex);
    if (abs(signedWeight) <= ${ei}) {
      continue;
    }
    let influence = abs(signedWeight);
    var targetX = magnetState.x;
    var targetY = magnetState.y;
    if (signedWeight < 0.0) {
      let dirX = params.centerX - magnetState.x;
      let dirY = params.centerY - magnetState.y;
      let dirLength = sqrt((dirX * dirX) + (dirY * dirY));
      if (dirLength > ${ei}) {
        targetX = magnetState.x + (influence * (dirX / dirLength));
        targetY = magnetState.y + (influence * (dirY / dirLength));
      }
    }
    signedSumX = signedSumX + (influence * targetX);
    signedSumY = signedSumY + (influence * targetY);
    absWeightSum = absWeightSum + influence;
  }
  let beta = max(0.0, params.beta);
  let denom = absWeightSum + beta;
  if (denom <= ${ei}) {
    positions[index] = vec4<f32>(clamp(params.centerX, -1.0, 1.0), clamp(params.centerY, -1.0, 1.0), layerZ[index], 1.0);
    return;
  }
  let clampedTarget = clampToReferencePlaneBorder(
    (signedSumX + (beta * params.centerX)) / denom,
    (signedSumY + (beta * params.centerY)) / denom,
    params.centerX,
    params.centerY
  );
  positions[index] = vec4<f32>(
    clampedTarget.x,
    clampedTarget.y,
    layerZ[index],
    1.0
  );
}`}var za=`
struct PlacementParams {
  particleCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  centerX: f32,
  centerY: f32,
  beta: f32,
  noiseSeed: f32,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> activeMask: array<u32>;
@group(0) @binding(2) var<uniform> params: PlacementParams;
@group(0) @binding(3) var<storage, read_write> bounds: array<atomic<i32>>;

fn quantizePosition(value: f32) -> i32 {
  let clamped = clamp(value, ${ri.toFixed(1)}, ${ii.toFixed(1)});
  return i32(round(clamped * ${ni.toFixed(1)}));
}

@compute @workgroup_size(${$r})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let index = gid.x;
  if (index >= params.particleCount || activeMask[index] == 0u) {
    return;
  }
  let q = positions[index];
  if (q.w <= 0.0 || q.z < ${ai.toFixed(1)}) {
    return;
  }
  atomicMin(&bounds[0], quantizePosition(q.x));
  atomicMin(&bounds[1], quantizePosition(q.y));
  atomicMax(&bounds[2], quantizePosition(q.x));
atomicMax(&bounds[3], quantizePosition(q.y));
}
`;function Ba({particleCount:e,centerX:t,centerY:n,beta:r,noiseSeed:i}){let a=new ArrayBuffer(32),o=new Uint32Array(a,0,4),s=new Float32Array(a,16,4);return o[0]=e>>>0,s[0]=Number.isFinite(t)?t:0,s[1]=Number.isFinite(n)?n:0,s[2]=Number.isFinite(r)?r:0,s[3]=Number.isFinite(i)?i:0,a}function Va({semanticsSignature:e=``,particleCount:t=0,noiseSeed:n=ti}={}){return JSON.stringify({semanticsSignature:e,particleCount:t,noiseSeed:n})}function Ha(t,n,r){let i=new Float32Array(20),a=t?.colorDescriptor||ga(),o=a.alphaDescriptor||_a();return i[0]=Math.max(0,n|0),i[1]=Number.isFinite(t?.modeCode)?t.modeCode:xi,i[2]=Number.isInteger(t?.featureIndex)?t.featureIndex:0,i[3]=+!!t?.sinkFixedMode,i[4]=Math.max(0,Number.isFinite(t?.staticSizePx)?t.staticSizePx:0),i[5]=Math.max(0,Number.isFinite(t?.minSizePx)?t.minSizePx:i[4]),i[6]=Math.max(i[5],Number.isFinite(t?.maxSizePx)?t.maxSizePx:i[5]),i[7]=Math.max(0,Number.isFinite(t?.sinkFixedSizePx)?t.sinkFixedSizePx:i[4]),i[8]=Number.isFinite(r)?r:0,i[9]=+!!t?.pulseBinarize,i[10]=Number.isFinite(a.modeCode)?a.modeCode:wi,i[11]=Number.isInteger(a.featureIndex)?a.featureIndex:0,i[12]=Array.isArray(a.rampStops)?a.rampStops.length:0,i[13]=+!!a.pulseBinarize,i[14]=Number.isFinite(o.modeCode)?o.modeCode:Di,i[15]=e(Number.isFinite(o.staticAlpha)?o.staticAlpha:1),i[16]=+!!o.pulseBinarize,i}function Ua({device:e,featureResources:t,placementResources:n,particleCount:r,hasSizePass:i}){if(!e)throw Error(`GPU placement pass requires a WebGPU device.`);if(!t?.featureBuffer||!t?.activeMaskBuffer)throw Error(`GPU placement pass requires uploaded feature and active-mask buffers.`);if(!n?.weightsBuffer||!n?.layerZBuffer||!n?.positionsBuffer||!n?.boundsBuffer||!n?.magnetBuffer||!n?.paramsBuffer)throw Error(`GPU placement pass resources are incomplete.`);if(!n.weightPipeline||!n.qPipeline||!n.boundsPipeline)throw Error(`GPU placement pass requires compiled W, Q, and bounds pipelines.`);if(!n.layerPipeline)throw Error(`GPU placement pass requires a compiled Layer pipeline for Q.z.`);if(i&&(!n.sizePipeline||!n.sizesBuffer||!n.colorsBuffer||!n.sizeParamsBuffer))throw Error(`GPU SC-pass resources are incomplete.`);if(!Number.isInteger(r)||r<0)throw Error(`GPU placement pass received an invalid particle count.`);if(r>(t.metadata?.particleCount||0))throw Error(`GPU placement pass particle count exceeds uploaded feature dataset.`);if(r>(n.particleCount||0))throw Error(`GPU placement pass particle count exceeds placement buffer capacity.`)}function Wa({placementResources:e,readPositions:t,readActiveMask:n,readParticleSizes:r,readParticleColors:i,hasFilterPass:a,hasSizePass:o}){if(t&&!e.readbackBuffer)throw Error(`GPU placement readback requested but the position readback buffer is not allocated.`);if(n&&!e.activeMaskReadbackBuffer)throw Error(`GPU placement readback requested but the active-mask readback buffer is not allocated.`);if(n&&a&&!e.filterOwnerReadbackBuffer)throw Error(`GPU placement readback requested but the filter-owner readback buffer is not allocated.`);if(r&&o&&!e.sizesReadbackBuffer)throw Error(`GPU placement readback requested but the particle-size readback buffer is not allocated.`);if(i&&o&&!e.colorsReadbackBuffer)throw Error(`GPU placement readback requested but the particle-color readback buffer is not allocated.`)}function Ga({device:e,previousResources:t,particleCount:n,semanticsSignature:r,weightShaderSource:i,filterSemanticsSignature:a=``,filterShaderSource:o=``,sizeSemanticsSignature:s=``,sizeShaderSource:c=``,layerSemanticsSignature:l=``,layerShaderSource:u=``,qSemanticsSignature:d=``,qShaderSource:f=``,qUsesFeatureBuffer:p=!1,allocateReadbackBuffers:m=!0}){return Jn({device:e,previousResources:t,particleCount:n,semanticsSignature:r,weightShaderSource:i,filterSemanticsSignature:a,filterShaderSource:o,sizeSemanticsSignature:s,sizeShaderSource:c,layerSemanticsSignature:l,layerShaderSource:u,qSemanticsSignature:d,qShaderSource:f,qUsesFeatureBuffer:p,allocateReadbackBuffers:m,maxMagnetCount:16,boundsShaderSource:za,createDefaultLayerDescriptor:aa,buildLayoutShaderSource:Pa,buildQShaderSource:Ra})}async function Ka(e){let t=e?.placementResources;if(!t)return qa(e);let n=t.passQueue||Promise.resolve(),r=()=>{},i=new Promise(e=>{r=e});t.passQueue=n.catch(()=>{}).then(()=>i),await n.catch(()=>{});try{return await qa(e)}finally{r()}}async function qa({device:e,featureResources:t,placementResources:n,descriptors:r,filterDescriptors:i=[],sizeDescriptor:a=null,centerX:o,centerY:s,beta:c,particleCount:l,readPositions:u=!0,readActiveMask:d=!1,readParticleSizes:f=!1,readParticleColors:p=!1,clock:m=null,commandEncoder:h=null,submitCommands:g=!0,performanceMeasurement:_=null,timestampRecorder:v=null,timingDetails:y=null}){let b=!!h,x=!!(u||d||f&&a?.ok||p&&a?.ok);if(b&&x)throw Error(`GPU placement pass cannot use an external command encoder when readback is requested.`);if(b&&g!==!1)throw Error(`GPU placement pass with an external command encoder must be submitted by the caller.`);if(!b&&g===!1)throw Error(`GPU placement pass can only skip submission when an external command encoder is provided.`);let S=!!(_?.enabled&&_?.waitForCompletion),ee=!!_?.deferTimestampReadback,C=y&&typeof y==`object`&&!Array.isArray(y)?y:{},w=Lr({clock:m}),te=e=>`${e}:command-encoding`,T=e=>`${e}:gpu-execution`,ne=({name:e,stageName:t,details:n={}})=>w.start({name:e,stageName:t,details:{kind:`command-encoding`,reportName:te(t),...C,...n}}),E=({name:e,stageName:t,reason:n,details:r={}})=>{ne({name:e,stageName:t,details:{status:`skipped`,reason:n,...r}})({kind:`command-encoding`,reportName:te(t),status:`skipped`,reason:n,...C,...r})},D=!v,O=v||Zr({device:e,enabled:S&&!b,passCapacity:6,unavailableReason:b?`external-command-encoder`:`timestamp-query-unavailable`,clock:m}),k=async()=>{let e=D?await O.collectTimings():[];return D&&O.release(),e},re=async()=>[...w.getTimings(),...await k()],ie=w.start({name:Fr.CPU_SETUP,stageName:Z.INPUT_PREP}),A=ti,j=Va({semanticsSignature:n.semanticsSignature,particleCount:l,noiseSeed:A}),M=!n.weightsValid||n.weightsSignature!==j,ae=Ba({particleCount:l,centerX:o,centerY:s,beta:c,noiseSeed:A}),oe=fa(r);e.queue.writeBuffer(n.paramsBuffer,0,ae),e.queue.writeBuffer(n.magnetBuffer,0,oe.buffer,oe.byteOffset,oe.byteLength);let N=!!n.sizePipeline&&!!a?.ok,se=!!n.layerPipeline,ce=se&&!n.layerZValid;if(Ua({device:e,featureResources:t,placementResources:n,particleCount:l,hasSizePass:N}),N){let t=Ha(a,l,1434);e.queue.writeBuffer(n.sizeParamsBuffer,0,t.buffer,t.byteOffset,t.byteLength)}let le=!!n.filterPipeline&&Array.isArray(i)&&i.some(e=>e?.active);Wa({placementResources:n,readPositions:u,readActiveMask:d,readParticleSizes:f,readParticleColors:p,hasFilterPass:le,hasSizePass:N}),le||Xn(e,t.activeMaskBuffer,l);let ue=le?e.createBindGroup({layout:n.filterPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:t.featureBuffer}},{binding:1,resource:{buffer:n.paramsBuffer}},{binding:2,resource:{buffer:t.activeMaskBuffer}},{binding:3,resource:{buffer:n.filterOwnerBuffer}}]}):null,de=M?e.createBindGroup({layout:n.weightPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:t.featureBuffer}},{binding:1,resource:{buffer:n.paramsBuffer}},{binding:2,resource:{buffer:n.weightsBuffer}}]}):null,fe=ce?e.createBindGroup({layout:n.layerPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:t.featureBuffer}},{binding:1,resource:{buffer:n.paramsBuffer}},{binding:2,resource:{buffer:n.layerZBuffer}}]}):null,pe=n.qUsesFeatureBuffer?[{binding:2,resource:{buffer:n.paramsBuffer}},{binding:3,resource:{buffer:n.positionsBuffer}},{binding:4,resource:{buffer:t.activeMaskBuffer}},{binding:6,resource:{buffer:t.featureBuffer}}]:[{binding:0,resource:{buffer:n.weightsBuffer}},{binding:1,resource:{buffer:n.magnetBuffer}},{binding:2,resource:{buffer:n.paramsBuffer}},{binding:3,resource:{buffer:n.positionsBuffer}},{binding:4,resource:{buffer:t.activeMaskBuffer}},{binding:5,resource:{buffer:n.layerZBuffer}}],me=e.createBindGroup({layout:n.qPipeline.getBindGroupLayout(0),entries:pe});e.queue.writeBuffer(n.boundsBuffer,0,Un());let he=e.createBindGroup({layout:n.boundsPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:n.positionsBuffer}},{binding:1,resource:{buffer:t.activeMaskBuffer}},{binding:2,resource:{buffer:n.paramsBuffer}},{binding:3,resource:{buffer:n.boundsBuffer}}]}),P=N?e.createBindGroup({layout:n.sizePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:t.featureBuffer}},{binding:1,resource:{buffer:n.sizeParamsBuffer}},{binding:2,resource:{buffer:t.activeMaskBuffer}},{binding:3,resource:{buffer:n.sizesBuffer}},{binding:4,resource:{buffer:n.colorsBuffer}}]}):null,F=Math.ceil(l/$r);ie({...C,particleCount:l,workgroupCount:F,hasFilterPass:le,hasSizePass:N,hasLayerPass:se,needsWeightPass:M,needsLayerPass:ce,readPositions:!!u,readActiveMask:!!d,readParticleSizes:!!(f&&N),readParticleColors:!!(p&&N)});let ge=w.start({name:Fr.COMMAND_ENCODING,stageName:`gpu-command-encoding-total`}),I=h||e.createCommandEncoder(),_e=!1;if(ue){let e=O.startPass({name:`gpu-placement-filter-mask-gpu-execution`,stageName:Z.FILTER_MASK_PASS,details:{...C,reportName:T(Z.FILTER_MASK_PASS)}}),t=ne({name:`gpu-placement-filter-mask-command-encoding`,stageName:Z.FILTER_MASK_PASS}),r=I.beginComputePass(e.descriptor);r.setPipeline(n.filterPipeline),r.setBindGroup(0,ue),r.dispatchWorkgroups(F),r.end(),e.finish({kind:`gpu-execution`,reportName:T(Z.FILTER_MASK_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),t({kind:`command-encoding`,reportName:te(Z.FILTER_MASK_PASS),particleCount:l,workgroupCount:F,dispatched:!0})}else E({name:`gpu-placement-filter-mask-command-encoding`,stageName:Z.FILTER_MASK_PASS,reason:`no-active-filter-pass`,details:{particleCount:l,workgroupCount:F}});if(de){let e=O.startPass({name:`gpu-placement-w-gpu-execution`,stageName:Z.WEIGHT_PASS,details:{...C,reportName:T(Z.WEIGHT_PASS)}}),t=ne({name:`gpu-placement-w-command-encoding`,stageName:Z.WEIGHT_PASS}),r=I.beginComputePass(e.descriptor);r.setPipeline(n.weightPipeline),r.setBindGroup(0,de),r.dispatchWorkgroups(F),r.end(),_e=!0,e.finish({kind:`gpu-execution`,reportName:T(Z.WEIGHT_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),t({kind:`command-encoding`,reportName:te(Z.WEIGHT_PASS),particleCount:l,workgroupCount:F,dispatched:!0})}else E({name:`gpu-placement-w-command-encoding`,stageName:Z.WEIGHT_PASS,reason:`weights-cache-valid`,details:{particleCount:l,workgroupCount:F}});if(fe){let e=O.startPass({name:`gpu-placement-layout-gpu-execution`,stageName:Z.LAYOUT_PASS,details:{...C,reportName:T(Z.LAYOUT_PASS)}}),t=ne({name:`gpu-placement-layout-command-encoding`,stageName:Z.LAYOUT_PASS}),r=I.beginComputePass(e.descriptor);r.setPipeline(n.layerPipeline),r.setBindGroup(0,fe),r.dispatchWorkgroups(F),r.end(),e.finish({kind:`gpu-execution`,reportName:T(Z.LAYOUT_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),t({kind:`command-encoding`,reportName:te(Z.LAYOUT_PASS),particleCount:l,workgroupCount:F,dispatched:!0})}else E({name:`gpu-placement-layout-command-encoding`,stageName:Z.LAYOUT_PASS,reason:se?`layer-cache-valid`:`no-layer-pass`,details:{particleCount:l,workgroupCount:F}});let ve=O.startPass({name:`gpu-placement-q-gpu-execution`,stageName:Z.PLACEMENT_PASS,details:{...C,reportName:T(Z.PLACEMENT_PASS)}}),L=ne({name:`gpu-placement-q-command-encoding`,stageName:Z.PLACEMENT_PASS}),ye=I.beginComputePass(ve.descriptor);ye.setPipeline(n.qPipeline),ye.setBindGroup(0,me),ye.dispatchWorkgroups(F),ye.end(),ve.finish({kind:`gpu-execution`,reportName:T(Z.PLACEMENT_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),L({kind:`command-encoding`,reportName:te(Z.PLACEMENT_PASS),particleCount:l,workgroupCount:F,dispatched:!0});let be=O.startPass({name:`gpu-placement-bounds-gpu-execution`,stageName:Z.BOUNDS_PASS,details:{...C,reportName:T(Z.BOUNDS_PASS)}}),xe=ne({name:`gpu-placement-bounds-command-encoding`,stageName:Z.BOUNDS_PASS}),Se=I.beginComputePass(be.descriptor);if(Se.setPipeline(n.boundsPipeline),Se.setBindGroup(0,he),Se.dispatchWorkgroups(F),Se.end(),be.finish({kind:`gpu-execution`,reportName:T(Z.BOUNDS_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),xe({kind:`command-encoding`,reportName:te(Z.BOUNDS_PASS),particleCount:l,workgroupCount:F,dispatched:!0}),P){let e=O.startPass({name:`gpu-placement-sc-gpu-execution`,stageName:Z.VISUAL_MAPPING_PASS,details:{...C,reportName:T(Z.VISUAL_MAPPING_PASS)}}),t=ne({name:`gpu-placement-sc-command-encoding`,stageName:Z.VISUAL_MAPPING_PASS}),r=I.beginComputePass(e.descriptor);r.setPipeline(n.sizePipeline),r.setBindGroup(0,P),r.dispatchWorkgroups(F),r.end(),e.finish({kind:`gpu-execution`,reportName:T(Z.VISUAL_MAPPING_PASS),...C,particleCount:l,workgroupCount:F,dispatched:!0}),t({kind:`command-encoding`,reportName:te(Z.VISUAL_MAPPING_PASS),particleCount:l,workgroupCount:F,dispatched:!0})}else E({name:`gpu-placement-sc-command-encoding`,stageName:Z.VISUAL_MAPPING_PASS,reason:`no-sc-pass`,details:{particleCount:l,workgroupCount:F}});u&&I.copyBufferToBuffer(n.positionsBuffer,0,n.readbackBuffer,0,Ln(l)),d&&(I.copyBufferToBuffer(t.activeMaskBuffer,0,n.activeMaskReadbackBuffer,0,zn(l)),le&&I.copyBufferToBuffer(n.filterOwnerBuffer,0,n.filterOwnerReadbackBuffer,0,zn(l))),f&&N&&I.copyBufferToBuffer(n.sizesBuffer,0,n.sizesReadbackBuffer,0,Bn(l)),p&&N&&I.copyBufferToBuffer(n.colorsBuffer,0,n.colorsReadbackBuffer,0,Vn(l)),ge({kind:`aggregate-command-encoding`,rollup:!0,...C,particleCount:l,workgroupCount:F,dispatchedFilterPass:!!ue,dispatchedWeightPass:!!de,dispatchedLayerPass:!!fe,dispatchedPlacementPass:!0,dispatchedBoundsPass:!0,dispatchedVisualMappingPass:!!P,copiedPositions:!!u,copiedActiveMask:!!d,copiedFilterOwnerSlots:!!(d&&le),copiedParticleSizes:!!(f&&N),copiedParticleColors:!!(p&&N)}),D&&O.resolve(I);let R=null,Ce=[];if(g!==!1){let t=null,n=null;b||(n=w.start({name:`gpu-placement-queue-submit`,stageName:`placement-queue-submit`,details:{kind:`host-stage`}}),t=I.finish()),t&&(e.queue.submit([t]),n?.({kind:`host-stage`}),ee&&D?(R=w.getTimings(),Ce=[Qr({collectTimings:k,release:()=>{}},{idPrefix:`gpu-placement-timestamp-query`})]):R=await re())}if(_e&&(n.weightsValid=!0,n.weightsSignature=j),fe&&(n.layerZValid=!0),!u&&!d&&!(f&&N)&&!(p&&N))return{positions:null,activeMask:null,sizes:null,colors:null,filterOwnerSlots:null,buffers:{positionsBuffer:n.positionsBuffer,sizesBuffer:n.sizesBuffer,colorsBuffer:n.colorsBuffer,activeMaskBuffer:t.activeMaskBuffer,boundsBuffer:n.boundsBuffer},timings:R||await re(),timingReadbacks:Ce};let we=u?new Float32Array(await zr(n.readbackBuffer)):null;if(u&&!d&&!(f&&N)&&!(p&&N))return we;let Te=null;if(d){let e=await zr(n.activeMaskReadbackBuffer);Te=new Uint32Array(e).slice(0,l)}let z=null;if(d&&le){let e=await zr(n.filterOwnerReadbackBuffer);z=new Uint32Array(e).slice(0,l)}let Ee=null;if(f&&N){let e=await zr(n.sizesReadbackBuffer);Ee=new Float32Array(e).slice(0,l)}let De=null;if(p&&N){let e=await zr(n.colorsReadbackBuffer);De=new Float32Array(e).slice(0,l*4)}return{positions:we,activeMask:Te,sizes:Ee,colors:De,filterOwnerSlots:z,buffers:{positionsBuffer:n.positionsBuffer,sizesBuffer:n.sizesBuffer,colorsBuffer:n.colorsBuffer,activeMaskBuffer:t.activeMaskBuffer,boundsBuffer:n.boundsBuffer},timings:R||await re(),timingReadbacks:Ce}}function Ja(e){return!!e&&typeof e==`object`&&Object.getPrototypeOf(e)===Object.prototype}function Ya(e){return typeof e.slice==`function`?e.slice():new e.constructor(e)}function Xa(e){if(Array.isArray(e))return e.map(e=>Xa(e));if(ArrayBuffer.isView(e))return Ya(e);if(e instanceof ArrayBuffer)return e.slice(0);if(e instanceof Date)return new Date(e.getTime());if(Ja(e)){let t={};for(let[n,r]of Object.entries(e))t[n]=Xa(r);return t}return e}function Za(e){return Array.isArray(e)?Xa(e):[]}function Qa(e){return Ja(e)?Xa(e):null}function $a(e,t=0){return Number.isFinite(e)?e:t}function eo(e){return e==null?null:Number.isInteger(e)?Math.max(0,e):0}function to({magnets:e=[],filterMagnets:t=[],sourceMagnets:n=null,activeLayout:r=null,sizeConfig:i=null,colorConfig:a=null,centerX:o=0,centerY:s=0,beta:c=0,featureDimensionCount:l=null,renderToGpuCanvas:u=!1,readActiveMaskForSummary:d=!1,performanceMeasurement:f=null}={}){return{magnets:Za(e),filterMagnets:Za(t),sourceMagnets:Array.isArray(n)?Xa(n):null,activeLayout:Qa(r),sizeConfig:Qa(i),colorConfig:Qa(a),centerX:$a(o),centerY:$a(s),beta:$a(c),featureDimensionCount:eo(l),renderToGpuCanvas:!!u,readActiveMaskForSummary:!!d,performanceMeasurement:Qa(f)}}function no({points:e=[],featureDimensionCount:t=null,getFeatureValue:n=null,getParticleActive:r=null,batchPlan:i=null,batchStore:a=null,maxBatchItems:o=null,preferBatchedUpload:s=!1}={}){return{points:Za(e),pointCount:Array.isArray(e)?e.length:0,featureDimensionCount:eo(t),getFeatureValue:typeof n==`function`?n:null,getParticleActive:typeof r==`function`?r:null,batchPlan:i?Xa(i):null,batchStore:a||null,maxBatchItems:Number.isInteger(o)&&o>0?o:null,preferBatchedUpload:!!s}}var ro=new Set(Object.values(Y));function io(e){return typeof e==`string`?e:String(e??``)}function ao(e,t=0){let n=Number(e);return Number.isInteger(n)?n:t}function oo(e){if(!ro.has(e))throw Error(`Unknown WebGPU pipeline stage "${String(e||``)}".`);return e}function so(e,t={}){return oo(e),ar(ir(e,t))}function co({semanticsSignature:e=``,particleCount:t=0,noiseSeed:n=0}={}){return so(Y.WEIGHT_PASS,{noiseSeed:Number.isFinite(Number(n))?Number(n):0,particleCount:ao(t),semanticsSignature:io(e)})}function lo({filterSemanticsSignature:e=``,featureMatrixSignature:t=``,particleCount:n=0}={}){return so(Y.FILTER_MASK_PASS,{featureMatrixSignature:io(t),filterSemanticsSignature:io(e),particleCount:ao(n)})}function uo({layoutSemanticsSignature:e=``,featureMatrixSignature:t=``,particleCount:n=0}={}){return so(Y.LAYOUT_PASS,{featureMatrixSignature:io(t),layoutSemanticsSignature:io(e),particleCount:ao(n)})}function fo({sizeSemanticsSignature:e=``,colorSemanticsSignature:t=``,alphaSemanticsSignature:n=``,featureMatrixSignature:r=``,activeMaskSignature:i=``,particleCount:a=0}={}){return so(Y.VISUAL_MAPPING_PASS,{activeMaskSignature:io(i),alphaSemanticsSignature:io(n),colorSemanticsSignature:io(t),featureMatrixSignature:io(r),particleCount:ao(a),sizeSemanticsSignature:io(e)})}var po=Object.freeze({PLACEMENT_MAGNETS_IGNORED:`gpu-placement-magnets-ignored`,FILTER_MAGNETS_IGNORED:`gpu-filter-magnets-ignored`,LAYOUT_DESCRIPTOR_UNSUPPORTED:`gpu-layout-descriptor-unsupported`,VISUAL_MAPPING_DESCRIPTOR_UNSUPPORTED:`gpu-visual-mapping-descriptor-unsupported`});function mo(e){return Number.isInteger(e)?Math.max(0,e):0}function ho({code:e,stageName:t,descriptorKind:n,ignoredCount:r,activeCount:i=0}){let a=Number.isInteger(r)&&r>0?r:0;return a<=0?null:sr(e,`${a} ${n} descriptor${a===1?``:`s`} ignored by the WebGPU pipeline.`,{stageName:t,details:{descriptorKind:n,ignoredCount:a,activeCount:Number.isInteger(i)&&i>=0?i:0}})}function go({code:e,stageName:t,descriptorKind:n,error:r=``,errorKind:i=``}){let a=String(r||``).trim();return a?or({severity:`error`,code:e,message:a,stageName:t,details:{descriptorKind:n,errorKind:String(i||``)}}):null}function _o(...e){return e.flat().filter(Boolean)}function vo(e,t){let n=ia(e,mo(t)),r=_o(ho({code:po.PLACEMENT_MAGNETS_IGNORED,stageName:Y.MAGNET_DESCRIPTOR_PREPARATION,descriptorKind:`placement-magnet`,ignoredCount:n.ignoredCount,activeCount:n.activeCount}));return{descriptorState:n,weightShaderSource:ja(n.descriptors),invalidationKey:co({semanticsSignature:n.semanticsSignature,particleCount:0,noiseSeed:0}),diagnostics:r}}function yo(e,t,n){let r=la(e,t,mo(n)),i=_o(ho({code:po.FILTER_MAGNETS_IGNORED,stageName:Y.FILTER_MASK_PASS,descriptorKind:`filter-magnet`,ignoredCount:r.ignoredCount,activeCount:r.activeCount}));return{filterDescriptorState:r,filterShaderSource:r.activeCount>0?Aa(r.descriptors):``,invalidationKey:lo({filterSemanticsSignature:r.semanticsSignature,particleCount:0}),diagnostics:i}}function bo(e,t,n){let r=ca(e,Array.isArray(t)?t:[],mo(n)),i=_o(r?.ok?null:go({code:po.LAYOUT_DESCRIPTOR_UNSUPPORTED,stageName:Y.LAYOUT_PASS,descriptorKind:`layout`,error:r?.error||``}));return{layerDescriptorState:r,layerShaderSource:r?.ok?Pa(r):``,qShaderSource:r?.ok?Ra(r):``,qUsesFeatureBuffer:r?.layoutType===`scatter3d`,invalidationKey:uo({layoutSemanticsSignature:r?.semanticsSignature||``,particleCount:0}),diagnostics:i}}function xo({sizeConfig:e=null,colorConfig:t=null,sourceMagnets:n=[],fallbackMagnets:r=[],featureDimensionCount:i=0}={}){let a=e?{...e,colorConfig:t||null}:null,o=mo(i),s=a?.sourceMagnets||n||r,c=a?ua(a,o,s):null,l=_o(c&&!c.ok?go({code:po.VISUAL_MAPPING_DESCRIPTOR_UNSUPPORTED,stageName:Y.VISUAL_MAPPING_PASS,descriptorKind:`visual-mapping`,error:c.error||``,errorKind:c.errorKind||``}):null);return{combinedSizeConfig:a,sizeDescriptorState:c,sizeShaderSource:c?.ok?ka(c):``,invalidationKey:fo({sizeSemanticsSignature:c?.semanticsSignature||``,colorSemanticsSignature:c?.colorDescriptor?.semanticsSignature||``,alphaSemanticsSignature:c?.colorDescriptor?.alphaDescriptor?.semanticsSignature||``,particleCount:0}),diagnostics:l}}function So(e){let t=Number(e?.descriptor?.batchIndex??e?.batchIndex);return Number.isFinite(t)?Math.trunc(t):2**53-1}function Co(e){let t=Number(e?.descriptor?.startIndex??e?.startIndex);return Number.isFinite(t)?Math.trunc(t):2**53-1}function wo(e){return Array.isArray(e)?e:Array.isArray(e?.batchResources)?e.batchResources:[]}function To(e){return Array.isArray(e)?e:Array.isArray(e?.batches)?e.batches:[]}function Eo(e){let t=new Map;for(let n of wo(e)){let e=So(n);e!==2**53-1&&!t.has(e)&&t.set(e,n)}return t}function Do(e){return[...wo(e)].sort((e,t)=>So(e)-So(t)||Co(e)-Co(t))}function Oo(e,t){if(typeof t!=`function`)throw Error(`Batched placement resource iteration requires a callback.`);let n=Do(e);for(let e=0;e<n.length;e+=1){let r=n[e];t(r,r?.descriptor||null,e)}}function ko(e){Oo(e,e=>{In(e)})}function Ao({previousBatchedResources:e=null,batchPlan:t,name:n=`webgpu-batched-placement-resources`,createPlacementResources:r=Ga,...i}={}){let a=To(t),o=Eo(e),s=e?.pipelineCache instanceof Map?e.pipelineCache:new Map,c=[],l=new Set;try{for(let e of a){let t=o.get(e.batchIndex)||null,n=r({...i,previousResources:t,particleCount:e.count,pipelineCache:s});n.descriptor=e,n.batchIndex=e.batchIndex,n.globalIdOffset=e.globalIdOffset,c.push(n),t&&l.add(t)}}catch(e){for(let e of c)l.has(e)||In(e);throw e}for(let e of o.values())l.has(e)||In(e);let u=!1,d={batchResources:Do(c),batchPlan:t,pipelineCache:s,get batchCount(){return d.batchResources.length},get released(){return u},owner:null};return d.owner=en({name:n,release:()=>{u||=(ko(d),d.batchResources=[],!0)}}),d}function jo(e){let t=Number(e?.descriptor?.batchIndex??e?.batchIndex);return Number.isFinite(t)?Math.trunc(t):2**53-1}function Mo(e){let t=Number(e?.descriptor?.startIndex??e?.startIndex);return Number.isFinite(t)?Math.trunc(t):2**53-1}function No(e){return Array.isArray(e)?e:Array.isArray(e?.batchResources)?e.batchResources:[]}function Po(e){return[...No(e)].sort((e,t)=>jo(e)-jo(t)||Mo(e)-Mo(t))}function Fo(e){return!!e&&typeof e==`object`&&!Array.isArray(e)&&!ArrayBuffer.isView(e)}function Io(e,t=0){let n=Number(e);return Number.isFinite(n)&&n>=0?Math.trunc(n):t}function Lo(e,t=0){let n=Io(e?.count,t),r=Io(e?.globalIdOffset,Io(e?.startIndex,0)),i=Io(e?.startIndex,r);return{batchIndex:Io(e?.batchIndex,0),startIndex:i,count:n,endExclusive:Io(e?.endExclusive,i+n),globalIdOffset:r}}function Ro(e,t,n){if(!t)return;let r=Lo(t,e.count);if(e.batchIndex!==r.batchIndex||e.startIndex!==r.startIndex||e.count!==r.count||e.globalIdOffset!==r.globalIdOffset)throw Error(`${n} does not match the GPU placement batch descriptor.`)}function zo({batchDescriptor:e=null,featureResources:t=null,placementResources:n=null}={}){let r=Io(t?.metadata?.particleCount,0),i=Lo(e||t?.descriptor||n?.descriptor||{batchIndex:0,startIndex:Io(t?.metadata?.globalIdOffset,0),count:r,globalIdOffset:Io(t?.metadata?.globalIdOffset,0)},r);if(Ro(i,t?.descriptor,`Feature resources descriptor`),Ro(i,n?.descriptor,`Placement resources descriptor`),r!==i.count)throw Error(`Feature batch metadata particle count does not match the GPU placement batch descriptor.`);if(Number.isFinite(Number(n?.particleCount))&&n.particleCount<i.count)throw Error(`Placement batch resources are smaller than the GPU placement batch descriptor.`);return i}function Bo(e,t){if(!Fo(e))return e;let n={batchIndex:t.batchIndex,startIndex:t.startIndex,count:t.count,globalIdOffset:t.globalIdOffset},r=Fo(e.details)?{...e.details,...n}:e.details==null?n:{...n,details:e.details};return{...e,details:r}}function Vo(e,t){let n={batchDescriptor:t,batchIndex:t.batchIndex,startIndex:t.startIndex,count:t.count,globalIdOffset:t.globalIdOffset};return Fo(e)?{...e,...n,timings:Array.isArray(e.timings)?e.timings.map(e=>Bo(e,t)):[]}:{...n,positions:e,activeMask:null,sizes:null,colors:null,filterOwnerSlots:null,timings:[]}}async function Ho({batchDescriptor:e=null,runPlacementPasses:t=Ka,...n}={}){if(typeof t!=`function`)throw Error(`GPU placement batch execution requires a placement pass runner.`);let r=zo({batchDescriptor:e,featureResources:n.featureResources,placementResources:n.placementResources});return Vo(await t({...n,particleCount:r.count,timingDetails:{...Fo(n.timingDetails)?n.timingDetails:{},batchIndex:r.batchIndex,startIndex:r.startIndex,count:r.count,globalIdOffset:r.globalIdOffset}}),r)}function Uo(e){return Array.isArray(e)||ArrayBuffer.isView(e)}function Wo(e){let t=Uo(e)?e:Uo(e?.bounds)?e.bounds:null;return!t||t.length<4?Un():new Int32Array([Number.isFinite(Number(t[0]))?Math.trunc(Number(t[0])):2147483647,Number.isFinite(Number(t[1]))?Math.trunc(Number(t[1])):2147483647,Number.isFinite(Number(t[2]))?Math.trunc(Number(t[2])):-2147483648,Number.isFinite(Number(t[3]))?Math.trunc(Number(t[3])):-2147483648])}function Go(e){let t=Wo(e);return t[0]>t[2]||t[1]>t[3]}function Ko({bounds:e,descriptor:t=null,reason:n=``}={}){let r=Wo(e),i=Go(r);return{bounds:r,descriptor:t,empty:i,reason:i?n||`empty-bounds`:``}}function qo(e=[]){let t=Array.isArray(e)?e:[],n=Un(),r=[],i=0;for(let e=0;e<t.length;e+=1){let a=Ko(Uo(t[e])?{bounds:t[e]}:t[e]);if(a.empty){r.push({index:e,descriptor:a.descriptor,reason:a.reason});continue}n[0]=Math.min(n[0],a.bounds[0]),n[1]=Math.min(n[1],a.bounds[1]),n[2]=Math.max(n[2],a.bounds[2]),n[3]=Math.max(n[3],a.bounds[3]),i+=1}let a=i===0||Go(n);return{bounds:a?Un():n,empty:a,batchCount:t.length,contributingBatchCount:i,skippedBatchCount:r.length,skipped:r}}function Jo(e=[]){return qo((Array.isArray(e)?e:[]).map(e=>({bounds:e?.bounds||e?.boundsArray||e?.quantizedBounds,descriptor:e?.batchDescriptor||e?.descriptor||null,reason:e?.boundsSkippedReason||``})))}function Yo(e={}){return to(e)}async function Xo(e,t){return t()}function Zo(e){return Array.isArray(e?.batchResources)?Number.isInteger(e?.batchPlan?.batchCount)?e.batchPlan.batchCount:e.batchResources.length:0}function Qo(e){return Zo(e)===1&&!e?.featureBuffer?Po(e)[0]||null:e}function $o(e){return Zo(e)===1&&!e?.weightsBuffer?Do(e)[0]||null:e}function es(e){return e?.performanceMeasurement?.enabled&&e?.performanceMeasurement?.cacheMode===`bypass`}function ts(e,t){return!e.renderToGpuCanvas||!!e.readActiveMaskForSummary||!!e.readPositions||!!e.readActiveMask||!!(e.readParticleSizes&&t?.ok)||!!(e.readParticleColors&&t?.ok&&e.colorConfig)}function ns(e){let t=Array.isArray(e?.batchResources)?e.batchResources:[e];for(let e of t)!e||typeof e!=`object`||(e.weightsValid=!1,e.weightsSignature=``,e.layerZValid=!1)}function rs(e,t,n){return n?Number.isFinite(e?.metadata?.particleCount)?Math.max(0,Math.trunc(e.metadata.particleCount)):Po(e).reduce((e,t)=>e+Math.max(0,Math.trunc(Number(t?.metadata?.particleCount||t?.descriptor?.count||0))),0):t?.metadata?.particleCount||0}function is(e,t){let n=e.map(e=>e?.[t]);if(!n.some(e=>ArrayBuffer.isView(e))||!n.every(e=>ArrayBuffer.isView(e)))return null;let r=n[0].constructor,i=new r(n.reduce((e,t)=>e+t.length,0)),a=0;for(let e of n)i.set(e,a),a+=e.length;return i}function as(e){return{particleBatches:e.map(e=>({descriptor:e.batchDescriptor,positionsBuffer:e.buffers?.positionsBuffer||null,sizesBuffer:e.buffers?.sizesBuffer||null,colorsBuffer:e.buffers?.colorsBuffer||null,activeMaskBuffer:e.buffers?.activeMaskBuffer||null,boundsBuffer:e.buffers?.boundsBuffer||null}))}}function os(e){let t=new Map;for(let n of e){if(!n?.name)continue;let e=t.get(n.name)||{name:n.name,stageName:n.stageName||``,durations:[],batches:[]};e.durations.push(Number.isFinite(n.durationMs)?n.durationMs:0),e.batches.push({batchIndex:n.details?.batchIndex??null,startIndex:n.details?.startIndex??null,count:n.details?.count??null,durationMs:Number.isFinite(n.durationMs)?n.durationMs:0}),t.set(n.name,e)}return Array.from(t.values()).map(e=>{let t=e.durations.reduce((e,t)=>e+t,0),n=Math.min(...e.durations),r=Math.max(...e.durations);return{name:e.name,stageName:e.stageName,durationMs:e.durations.length>0?t/e.durations.length:0,details:{batchCount:e.durations.length,totalMs:t,minMs:Number.isFinite(n)?n:0,maxMs:Number.isFinite(r)?r:0,batches:e.batches}}})}function ss(e,t){if(!e||typeof e!=`object`)return e;let n=t?.batchDescriptor||{};return{...e,details:{...e.details&&typeof e.details==`object`?e.details:{},batchIndex:n.batchIndex??t?.batchIndex,startIndex:n.startIndex??t?.startIndex,count:n.count??t?.count,globalIdOffset:n.globalIdOffset??t?.globalIdOffset}}}async function cs({device:e,featureResources:t,placementResources:n=null,placementInput:r={},runInGpuErrorScope:i=Xo,createPlacementResources:a=Ga,createBatchedPlacementResources:o=Ao,runPlacementPasses:s=Ka,runPlacementBatchPasses:c=Ho,forceBatchedExecution:l=!1}={}){let u=Yo(r),d=Lr(),f=Zo(t),p=l?f>0:f>1,m=Qo(t),h=$o(n);if(p?!Array.isArray(t?.batchResources)||!t?.metadata:!m?.featureBuffer||!m?.metadata)return{ok:!1,error:`Feature dataset is not uploaded on GPU.`};let g=rs(t,m,p);if(g<=0)return{ok:!1,error:`No feature vectors available for GPU placement.`};let _=d.start({name:`gpu-placement-descriptor-prep`,stageName:Z.DESCRIPTOR_PREP,details:{kind:`host-stage`}}),v=u.featureDimensionCount??(p?t.metadata.featureDimensionCount:m.metadata.featureDimensionCount),{descriptorState:y,weightShaderSource:b,diagnostics:x=[]}=vo(u.magnets,v);if(y.activeCount<=0)return{ok:!1,error:y.ignoredCount>0?`No supported active magnets for GPU placement.`:`No active magnets for GPU placement.`,ignoredCount:y.ignoredCount,activeCount:y.activeCount,diagnostics:x};let{filterDescriptorState:S,filterShaderSource:ee,diagnostics:C=[]}=yo(u.filterMagnets,u.sourceMagnets||u.magnets,v),{layerDescriptorState:w,layerShaderSource:te,qShaderSource:T,qUsesFeatureBuffer:ne,diagnostics:E=[]}=bo(u.activeLayout,u.magnets,v),D=[...x,...C,...E];if(!w?.ok)return{ok:!1,error:`GPU layout error: ${w?.error||`GPU layout descriptor could not be built.`}`,diagnostics:D};let{combinedSizeConfig:O,sizeDescriptorState:k,sizeShaderSource:re,diagnostics:ie=[]}=xo({sizeConfig:u.sizeConfig,colorConfig:u.colorConfig,sourceMagnets:u.sourceMagnets||u.magnets,fallbackMagnets:u.magnets,featureDimensionCount:v});if(D.push(...ie),O&&!k?.ok){let e=k?.error||`GPU SC-pass descriptor could not be built.`;return{ok:!1,error:`GPU SC-pass error: ${e}`,sizeIgnored:k?.errorKind===`size`,sizeError:k?.errorKind===`size`?e:``,colorIgnored:k?.errorKind===`color`,colorError:k?.errorKind===`color`?e:``,diagnostics:D}}if(_({kind:`host-stage`,featureDimensionCount:v,activePlacementDescriptorCount:y.activeCount,activeFilterDescriptorCount:S.activeCount,hasVisualMappingDescriptor:!!O}),p){let r=ts(u,k),a=d.start({name:`gpu-placement-resource-prep`,stageName:`placement-resource-prep`,details:{kind:`host-stage`,batchCount:f}}),s=await i(`GPU placement resource upload`,()=>o({device:e,previousBatchedResources:n,batchPlan:t.batchPlan,semanticsSignature:y.semanticsSignature,weightShaderSource:b,filterSemanticsSignature:S.semanticsSignature,filterShaderSource:ee,sizeSemanticsSignature:k?.semanticsSignature||``,sizeShaderSource:re,layerSemanticsSignature:w?.semanticsSignature||``,layerShaderSource:te,qSemanticsSignature:w?.semanticsSignature||``,qShaderSource:T,qUsesFeatureBuffer:ne,allocateReadbackBuffers:r}));a({kind:`host-stage`,batchCount:f,mode:`batched`}),es(u)&&ns(s);let l=Po(t),p=Do(s),m=new Map(p.map(e=>[e.descriptor?.batchIndex,e])),h=(t,n,r={})=>({device:e,featureResources:t,placementResources:n,descriptors:y.descriptors,filterDescriptors:S.descriptors,sizeDescriptor:k,centerX:u.centerX,centerY:u.centerY,beta:u.beta,readPositions:!u.renderToGpuCanvas,readActiveMask:!u.renderToGpuCanvas||!!u.readActiveMaskForSummary,readParticleSizes:!u.renderToGpuCanvas&&!!k?.ok,readParticleColors:!u.renderToGpuCanvas&&!!(k?.ok&&u.colorConfig),performanceMeasurement:u.performanceMeasurement,...r}),_=e=>{let t=e.descriptor?.batchIndex,n=m.get(t);if(!n)throw Error(`GPU placement batch resources missing for batch ${t}.`);return n},v=[],x=[];try{if(u.renderToGpuCanvas&&u.performanceMeasurement?.enabled)v=await i(`GPU placement pass`,async()=>{let t=e.createCommandEncoder(),n=Zr({device:e,enabled:!!u.performanceMeasurement?.waitForCompletion,passCapacity:l.length*6}),r=[];try{for(let e of l){let i=_(e);r.push(await c(h(e,i,{commandEncoder:t,submitCommands:!1,timestampRecorder:n})))}n.resolve(t);let i=d.start({name:`gpu-placement-queue-submit`,stageName:`placement-queue-submit`,details:{kind:`host-stage`,batchCount:l.length}});if(e.queue.submit([t.finish()]),i({kind:`host-stage`,batchCount:l.length,mode:`batched`}),u.performanceMeasurement?.deferTimestampReadback){let e=r;return e.timingReadbacks=[Qr(n,{idPrefix:`gpu-placement-batched-timestamp-query`})],e}let a=await n.collectTimings();n.release();let o=a.filter(e=>e?.details?.batchIndex==null),s=r.map((e,t)=>({...e,timings:[...Array.isArray(e?.timings)?e.timings:[],...a.filter(e=>e?.details?.batchIndex===l[t]?.descriptor?.batchIndex)]}));return s.timings=o,s}catch(e){throw n.release(),e}},{waitForQueue:!1});else if(u.renderToGpuCanvas)v=await i(`GPU placement pass`,async()=>{let t=e.createCommandEncoder(),n=[];for(let e of l){let r=_(e);n.push(await c(h(e,r,{commandEncoder:t,submitCommands:!1})))}let r=d.start({name:`gpu-placement-queue-submit`,stageName:`placement-queue-submit`,details:{kind:`host-stage`,batchCount:l.length}});return e.queue.submit([t.finish()]),r({kind:`host-stage`,batchCount:l.length,mode:`batched`}),n},{waitForQueue:!1});else for(let e of l){let t=_(e),n=await i(`GPU placement pass`,()=>c(h(e,t)),{waitForQueue:!0});v.push(n)}}catch(e){return{ok:!1,error:e instanceof Error?e.message:String(e||`GPU placement batch execution failed.`),placementResources:s}}let C=d.start({name:`gpu-placement-result-normalization`,stageName:Z.RESULT_NORMALIZATION,details:{kind:`host-stage`,batchCount:v.length}});x=Array.isArray(v.timingReadbacks)?v.timingReadbacks:[];let E=[...Array.isArray(v.timings)?v.timings:[],...v.flatMap(e=>Array.isArray(e.timings)?e.timings:[])];os(E);let O=v.flatMap(e=>Array.isArray(e.diagnostics)?e.diagnostics.map(t=>ss(t,e)):[]),ie=Jo(v);C({kind:`host-stage`,batchCount:v.length,hasBoundsReduction:!!ie});let A=d.getTimings(),j=[...E,...A],M=os(j);return{ok:!0,placementResources:s,passResult:{batchResults:v,buffers:as(v),boundsReduction:ie,batchTimings:j,timingSummary:M,timings:M,timingReadbacks:x},batchResults:v,batchCount:v.length,particleCount:g,featureResources:t,positions:is(v,`positions`),activeMask:is(v,`activeMask`),sizes:is(v,`sizes`),colors:is(v,`colors`),sizeIgnored:!!u.sizeConfig&&!k?.ok,sizeError:k?.error||``,colorIgnored:!!u.colorConfig&&!k?.ok,colorError:u.colorConfig&&k?.error||``,filterOwnerSlots:is(v,`filterOwnerSlots`),filterIdsBySlot:S.descriptors.filter(e=>e?.active).map(e=>e.id),filterActiveCount:S.activeCount,filterIgnoredCount:S.ignoredCount,activeCount:y.activeCount,ignoredCount:y.ignoredCount,diagnostics:[...D,...O],batchDiagnostics:O,batchTimings:j,timingReadbacks:x,timingSummary:M,timings:M,boundsReduction:ie}}let A=d.start({name:`gpu-placement-resource-prep`,stageName:`placement-resource-prep`,details:{kind:`host-stage`}}),j=await i(`GPU placement resource upload`,()=>a({device:e,previousResources:h,particleCount:g,semanticsSignature:y.semanticsSignature,weightShaderSource:b,filterSemanticsSignature:S.semanticsSignature,filterShaderSource:ee,sizeSemanticsSignature:k?.semanticsSignature||``,sizeShaderSource:re,layerSemanticsSignature:w?.semanticsSignature||``,layerShaderSource:te,qSemanticsSignature:w?.semanticsSignature||``,qShaderSource:T,qUsesFeatureBuffer:ne,allocateReadbackBuffers:ts(u,k)}));A({kind:`host-stage`,mode:`direct`}),es(u)&&ns(j);let M=await i(`GPU placement pass`,()=>s({device:e,featureResources:m,placementResources:j,descriptors:y.descriptors,filterDescriptors:S.descriptors,sizeDescriptor:k,centerX:u.centerX,centerY:u.centerY,beta:u.beta,particleCount:g,readPositions:!u.renderToGpuCanvas,readActiveMask:!u.renderToGpuCanvas||!!u.readActiveMaskForSummary,readParticleSizes:!u.renderToGpuCanvas&&!!k?.ok,readParticleColors:!u.renderToGpuCanvas&&!!(k?.ok&&u.colorConfig),performanceMeasurement:u.performanceMeasurement}),{waitForQueue:!u.renderToGpuCanvas});d.start({name:`gpu-placement-result-normalization`,stageName:Z.RESULT_NORMALIZATION,details:{kind:`host-stage`}})({kind:`host-stage`,hasActiveMask:M.activeMask instanceof Uint32Array});let ae=d.getTimings();return{ok:!0,placementResources:j,passResult:M,particleCount:g,featureResources:m,positions:M.positions,activeMask:M.activeMask,sizes:M.sizes,colors:M.colors,sizeIgnored:!!u.sizeConfig&&!k?.ok,sizeError:k?.error||``,colorIgnored:!!u.colorConfig&&!k?.ok,colorError:u.colorConfig&&k?.error||``,filterOwnerSlots:M.filterOwnerSlots,filterIdsBySlot:S.descriptors.filter(e=>e?.active).map(e=>e.id),filterActiveCount:S.activeCount,filterIgnoredCount:S.ignoredCount,activeCount:y.activeCount,ignoredCount:y.ignoredCount,diagnostics:D,timings:[...Array.isArray(M.timings)?M.timings:[],...ae],timingReadbacks:Array.isArray(M.timingReadbacks)?M.timingReadbacks:[]}}async function ls(e={}){return Zo(e.featureResources)>0?{ok:!1,error:`WebGPU direct placement pipeline requires monolithic feature resources.`}:cs(e)}async function us(e={}){return Zo(e.featureResources)<=0?{ok:!1,error:`WebGPU batched placement pipeline requires batched feature resources.`}:cs({...e,forceBatchedExecution:!0})}var ds=1,fs=-.2,ps=5*Math.PI/12,ms=3.5,hs=45*Math.PI/180;function gs(e){let t=Math.max(1e-6,e.xMax-e.xMin),n=Math.max(1e-6,e.yMax-e.yMin),r=2/Math.max(t,n);return Math.min(14,Math.max(4,4*Math.max(1,r)**.35))}function _s(e){return e===`splat`||e===`gaussian-disc`?1:e===`soft-disc`?2:e===`crisp-disc`?3:e===`density-adaptive-disc`?4:e===`filled-quad`?5:0}function vs(e){let t=Number.isFinite(e?.xMin)?e.xMin:-1,n=Number.isFinite(e?.xMax)?e.xMax:1,r=Number.isFinite(e?.yMin)?e.yMin:-1,i=Number.isFinite(e?.yMax)?e.yMax:1,a=Math.max(1e-6,n-t),o=Math.max(1e-6,i-r),s=Math.max(1e-6,Math.max(a,o,ds-fs)*ms);return[2/a,0,0,0,0,2/o,0,0,0,0,-1/s,0,-(n+t)/a,-(i+r)/o,ds/s,1]}function ys(e={}){let t=e?.mode===`3d`,n=t&&Number.isFinite(e.yaw)?e.yaw:0,r=t&&Number.isFinite(e.pitch)?Math.min(ps,Math.max(0,e.pitch)):0,i=Math.sin(n),a=Math.cos(n),o=Math.sin(r),s=Math.cos(r);return{right:[a,-i,0],up:[i*s,a*s,o],forward:[i*o,a*o,-s]}}function bs(e,t,n){let r=Math.max(1e-6,(Number.isFinite(e?.xMax)?e.xMax:1)-(Number.isFinite(e?.xMin)?e.xMin:-1)),i=Math.max(1e-6,(Number.isFinite(e?.yMax)?e.yMax:1)-(Number.isFinite(e?.yMin)?e.yMin:-1)),a=Math.max(1e-6,(Number.isFinite(t)?t:1)/Math.max(1,Number.isFinite(n)?n:1)),o=Math.max(i,r/a),s=o*a,c=Math.max(.1,o/(2*Math.tan(hs*.5))),l=Math.sqrt(s*s*.25+o*o*.25+1),u=Math.max(.02,c-l*1.75);return{aspect:a,visibleHeight:o,visibleWidth:s,distance:c,near:u,far:Math.max(u+1,c+l*2.5)}}function xs(e,t={},n=1,r=1){if(t?.mode!==`3d`)return vs(e);let i=Number.isFinite(e?.xMin)?e.xMin:-1,a=Number.isFinite(e?.xMax)?e.xMax:1,o=Number.isFinite(e?.yMin)?e.yMin:-1,s=Number.isFinite(e?.yMax)?e.yMax:1,c=[(i+a)*.5,(o+s)*.5],l=ys(t),u=bs(e,n,r),d=2*u.distance/u.visibleWidth,f=2*u.distance/u.visibleHeight,p=u.far/(u.far-u.near),m=-(u.far*u.near)/(u.far-u.near),h=l.right,g=l.up,_=l.forward;return[d*h[0],f*g[0],p*_[0],_[0],d*h[1],f*g[1],p*_[1],_[1],d*h[2],f*g[2],p*_[2],_[2],-d*c[0],-f*c[1],p*u.distance+m,u.distance]}function Ss(t,n,r,i=null,a=1,o=`disc`,s=.12,c=.7,l=.5,u=!1,d=.35,f=.22,p=.85,m=1,h=!1,g=.2,_=1,v=1,y=`billboard`,b=!1,x=0,S=0){let ee=Number.isFinite(a)?a:1,C=gs(t);return new Float32Array([...xs(t,i,n,r),t.xMin,t.yMin,t.xMax,t.yMax,n,r,ee,C,_s(o),Number.isFinite(s)?s:.12,Number.isFinite(c)?c:.7,Number.isFinite(l)?l:.5,+!!u,Number.isFinite(d)?d:.35,Number.isFinite(f)?f:.22,Number.isFinite(p)?p:.85,Number.isFinite(m)?e(m):1,+!!h,Number.isFinite(g)?e(g):.2,Number.isFinite(_)?e(_):1,Number.isFinite(v)?Math.max(1e-4,v):1,+(y===`billboard`),+!!b,Number.isFinite(x)?x:0,Number.isFinite(S)?S:0,0,0])}function Cs(e){if(e?.mode!==`3d`)return[0,2];let t=ys(e).forward;return[t[0]>=0?0:1,t[1]>=0?2:3]}var ws=1024,Ts=1600;function Es(e){e&&typeof e.destroy==`function`&&e.destroy()}function Ds(e,t,{smallSize:n=512,largeSize:r=ws,largeCanvasThreshold:i=Ts}={}){return Math.max(Number.isFinite(e)?e:0,Number.isFinite(t)?t:0)>=i?r:n}function Os(e,t){return{width:Math.max(1,Math.floor(Number.isFinite(e)?e:1)),height:Math.max(1,Math.floor(Number.isFinite(t)?t:1))}}function ks(e,t,n,r,i,a){return e.createTexture({label:t,size:[n,r],format:i,usage:a})}function As(e,t=0){if(Array.isArray(e?.particleBatches))return e.particleBatches.map((e,t)=>({batchIndex:Number.isFinite(Number(e?.descriptor?.batchIndex))?Math.trunc(Number(e.descriptor.batchIndex)):t,globalIdOffset:Number.isFinite(Number(e?.descriptor?.globalIdOffset))?Math.trunc(Number(e.descriptor.globalIdOffset)):Math.trunc(Number(e?.globalIdOffset||0)),particleCount:Number.isFinite(Number(e?.descriptor?.count))?Math.max(0,Math.trunc(Number(e.descriptor.count))):Math.max(0,Math.trunc(Number(e?.particleCount||0))),positionsBuffer:e?.positionsBuffer||null,sizesBuffer:e?.sizesBuffer||null,activeMaskBuffer:e?.activeMaskBuffer||null,boundsBuffer:e?.boundsBuffer||null,version:e?.version??``})).filter(e=>e.particleCount>0);let n=Math.max(0,Math.trunc(Number(t||0)));return n<=0?[]:[{batchIndex:0,globalIdOffset:0,particleCount:n,positionsBuffer:e?.positionsBuffer||null,sizesBuffer:e?.sizesBuffer||null,activeMaskBuffer:e?.activeMaskBuffer||null,boundsBuffer:e?.boundsBuffer||null,version:e?.version??``}]}function js(e,t=0,n=1){let r=Number.isFinite(Number(n))?Number(n):1;return As(e,t).map(e=>[e.batchIndex,e.globalIdOffset,e.particleCount,e.version,e.positionsBuffer?.label??e.positionsBuffer?.id??``,e.sizesBuffer?.label??e.sizesBuffer?.id??``,e.activeMaskBuffer?.label??e.activeMaskBuffer?.id??``,e.boundsBuffer?.label??e.boundsBuffer?.id??``,r].join(`:`)).join(`|`)}function Ms({device:e,densityFormat:t,textureUsage:n,defaultBoundsBufferUsage:r,shadowBoundsQuantizationScale:i,destroyResource:a=Es}){let o=null,s=0,c=0,l=null,u=null,d=0,f=0,p=null,m=e.createBuffer({label:`GpuRendererDefaultShadowBoundsBuffer`,size:4*Int32Array.BYTES_PER_ELEMENT,usage:r});e.queue.writeBuffer(m,0,new Int32Array([-i,-i,i,i]));let h=m,g=null,_=en({name:`webgpu-renderer-density-resources`,release:()=>{a(o),a(u),a(m),o=null,s=0,c=0,l=null,u=null,d=0,f=0,p=null,h=m,g=null}});return{owner:_,get densityTexture(){return o},get densityTextureWidth(){return s},get densityTextureHeight(){return c},get densityTextureView(){return l},get shadowDensityTexture(){return u},get shadowDensityTextureWidth(){return d},get shadowDensityTextureHeight(){return f},get shadowDensityTextureView(){return p},get defaultShadowBoundsBuffer(){return m},get currentShadowBoundsBuffer(){return h},ensureDensityTexture(r,i){let u=Os(r,i);return o&&s===u.width&&c===u.height?!1:(a(o),o=ks(e,`GpuRendererDensityTexture`,u.width,u.height,t,n),s=u.width,c=u.height,l=o.createView(),!0)},ensureShadowDensityTexture(r,i){let o=Os(r,i);return u&&d===o.width&&f===o.height?!1:(a(u),u=ks(e,`GpuRendererShadowDensityTexture`,o.width,o.height,t,n),d=o.width,f=o.height,p=u.createView(),g=null,!0)},setCurrentShadowBoundsBuffer(e){let t=e||m;return h===t?!1:(h=t,g=null,!0)},shadowDensityInputsChanged(e,t,n){let r=Number.isFinite(Number(n))?Number(n):1,i=js(e,t,r),a={particleCount:t,version:e?.version??i,contributionSignature:i,particleSizeScale:r,positionsBuffer:e?.positionsBuffer||null,sizesBuffer:e?.sizesBuffer||null,activeMaskBuffer:e?.activeMaskBuffer||null,boundsBuffer:e?.boundsBuffer||m,textureView:p,textureWidth:d,textureHeight:f},o=g,s=!o||o.particleCount!==a.particleCount||o.version!==a.version||o.contributionSignature!==a.contributionSignature||o.particleSizeScale!==a.particleSizeScale||o.positionsBuffer!==a.positionsBuffer||o.sizesBuffer!==a.sizesBuffer||o.activeMaskBuffer!==a.activeMaskBuffer||o.boundsBuffer!==a.boundsBuffer||o.textureView!==a.textureView||o.textureWidth!==a.textureWidth||o.textureHeight!==a.textureHeight;return s&&(g=a),s},release(){_.release()}}}function Ns(e){return e===0?`none`:e===1?`clear`:e<=5?`few`:`many`}function Ps(e){let t=e?.[0]||0;return{ok:!0,hitCount:t,ids:Array.from(e?.slice?e.slice(1,7):[]).filter(e=>e>0),classification:Ns(t)}}function Fs(e,t=0){let n=e?.descriptor||{},r=Number.isFinite(Number(n.count))?Math.max(0,Math.trunc(Number(n.count))):Math.max(0,Math.trunc(Number(e?.particleCount||0))),i=Number.isFinite(Number(n.globalIdOffset))?Math.max(0,Math.trunc(Number(n.globalIdOffset))):Math.max(0,Math.trunc(Number(n.startIndex||e?.globalIdOffset||0)));return{...e,descriptor:{batchIndex:Number.isFinite(Number(n.batchIndex))?Math.max(0,Math.trunc(Number(n.batchIndex))):t,startIndex:Number.isFinite(Number(n.startIndex))?Math.max(0,Math.trunc(Number(n.startIndex))):i,count:r,endExclusive:Number.isFinite(Number(n.endExclusive))?Math.max(0,Math.trunc(Number(n.endExclusive))):i+r,globalIdOffset:i},particleCount:r,globalIdOffset:i}}function Is(e,t){if(Array.isArray(e?.particleBatches))return e.particleBatches.map((e,t)=>Fs(e,t)).filter(e=>e.particleCount>0);let n=Math.max(0,Math.floor(Number.isFinite(t)?t:0));return[Fs({...e,particleCount:n,descriptor:{batchIndex:0,startIndex:0,count:n,endExclusive:n,globalIdOffset:0}})].filter(e=>e.particleCount>0)}function Ls(e=[]){let t=[],n=0;for(let r of Array.isArray(e)?e:[]){let e=r?.result||r,i=Math.max(0,Math.trunc(Number(r?.descriptor?.globalIdOffset??r?.globalIdOffset??0)));n+=Math.max(0,Math.trunc(Number(e?.hitCount||0)));for(let n of Array.isArray(e?.ids)?e.ids:[]){let e=Math.trunc(Number(n));e>0&&t.push(e+i)}}return{ok:!0,hitCount:n,ids:t.slice(0,6),classification:Ns(n),batchResults:e}}function Rs(e,t){return{ok:!1,superseded:!0,error:`GPU pick superseded`,token:e,latestToken:t}}function zs({device:e,pickPipeline:t,viewParamsBuffer:n,pickParamsBuffer:r,pickResultBuffer:i,pickReadbackBuffer:a,readMapMode:o=null}){let s=null,c=null,l=0;function u(a){return s&&c?.positionsBuffer===a.positionsBuffer&&c?.sizesBuffer===a.sizesBuffer&&c?.activeMaskBuffer===a.activeMaskBuffer?s:(s=e.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a.positionsBuffer}},{binding:1,resource:{buffer:a.sizesBuffer}},{binding:2,resource:{buffer:a.activeMaskBuffer}},{binding:3,resource:{buffer:n}},{binding:4,resource:{buffer:r}},{binding:5,resource:{buffer:i}}]}),c={positionsBuffer:a.positionsBuffer,sizesBuffer:a.sizesBuffer,activeMaskBuffer:a.activeMaskBuffer},s)}return{resetBindGroup(){s=null,c=null},getLatestPickToken(){return l},async run({particleBuffers:n,particleCount:s,x:c,y:d,radiusPx:f=2.5}){let p=l+1;l=p;let m=Is(n,s),h=[],g=Array.isArray(n?.particleBatches),_=async n=>{let s=Math.max(0,Math.floor(Number.isFinite(n.particleCount)?n.particleCount:0));e.queue.writeBuffer(r,0,new Uint32Array([0,0,0,s])),e.queue.writeBuffer(r,0,new Float32Array([c,d,Math.max(0,Number.isFinite(f)?f:2.5)])),e.queue.writeBuffer(i,0,new Uint32Array(8));let m=e.createCommandEncoder(),h=m.beginComputePass();h.setPipeline(t),h.setBindGroup(0,u(n)),h.dispatchWorkgroups(Math.ceil(s/256)),h.end(),m.copyBufferToBuffer(i,0,a,0,8*Uint32Array.BYTES_PER_ELEMENT),e.queue.submit([m.finish()]);let g=await zr(a,{mapMode:o});return p===l?Ps(new Uint32Array(g)):Rs(p,l)};for(let e of m){let t=await _(e);if(t?.superseded||!g)return t;h.push({descriptor:e.descriptor,result:t})}return p===l?Ls(h):Rs(p,l)}}}function Bs(e){return!!(e?.positionsBuffer&&e?.sizesBuffer&&e?.colorsBuffer&&e?.activeMaskBuffer)}function Vs(e,t=0){let n=e?.descriptor||{batchIndex:t,startIndex:Number.isFinite(Number(e?.globalIdOffset))?Math.trunc(Number(e.globalIdOffset)):0,count:Number.isFinite(Number(e?.particleCount))?Math.max(0,Math.trunc(Number(e.particleCount))):0,globalIdOffset:Number.isFinite(Number(e?.globalIdOffset))?Math.trunc(Number(e.globalIdOffset)):0},r=Number.isFinite(Number(n.count))?Math.max(0,Math.trunc(Number(n.count))):Math.max(0,Math.trunc(Number(e?.particleCount||0))),i=Number.isFinite(Number(n.globalIdOffset))?Math.max(0,Math.trunc(Number(n.globalIdOffset))):Math.max(0,Math.trunc(Number(n.startIndex||0))),a=Number.isFinite(Number(n.batchIndex))?Math.max(0,Math.trunc(Number(n.batchIndex))):t;return{...e,descriptor:{batchIndex:a,startIndex:Number.isFinite(Number(n.startIndex))?Math.max(0,Math.trunc(Number(n.startIndex))):i,count:r,endExclusive:Number.isFinite(Number(n.endExclusive))?Math.max(0,Math.trunc(Number(n.endExclusive))):i+r,globalIdOffset:i},particleCount:r,globalIdOffset:i,batchIndex:a}}function Hs({particleCount:e=0,particleBuffers:t=null}={}){if(Array.isArray(t?.particleBatches))return t.particleBatches.map((e,t)=>Vs(e,t)).filter(e=>e.particleCount>0&&Bs(e));let n=Number.isFinite(Number(e))?Math.max(0,Math.trunc(Number(e))):0;return n<=0||!Bs(t)?[]:[Vs({...t,particleCount:n,descriptor:{batchIndex:0,startIndex:0,count:n,endExclusive:n,globalIdOffset:0}},0)]}function Us(e={}){return Hs(e).reduce((e,t)=>e+t.particleCount,0)}function Ws({particleCount:e=0,particleBuffers:t=null}={}){let n=Hs({particleCount:e,particleBuffers:t});return n.length===0?``:n.map(e=>[e.batchIndex,e.globalIdOffset,e.particleCount,e.version??``,e.positionsBuffer?.label??``,e.sizesBuffer?.label??``,e.colorsBuffer?.label??``,e.activeMaskBuffer?.label??``,e.boundsBuffer?.label??``].join(`:`)).join(`|`)}function Gs({particleCount:e=0,particleBuffers:t=null,referencePlaneVisible:n=!0,referenceDensityShadowEnabled:r=!0,particleDensityPreviewEnabled:i=!1,particleDensityRenderingEnabled:a=!1,particleDensityAlphaSourceEnabled:o=!1,particleRenderShape:s=`disc`}={}){let c=Hs({particleCount:e,particleBuffers:t}).length>0,l=!!(c&&i),u=s===`density-adaptive-disc`,d=!!(a||u),f=n!==!1;return{hasParticleBuffers:c,densityMapPlaneRequested:l,densityAdaptiveShape:u,densityShapeEnabled:d,referencePlaneDrawn:f,densityShadowTextureNeeded:c&&(f&&r!==!1||l),densityShadowEnabled:c&&f&&r!==!1&&!l,needsDensityTexture:c&&(d||o)}}var Ks=32,qs=0,Js=1.1;function Ys(e,t){if(typeof document<`u`&&typeof document.createElement==`function`){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}return typeof OffscreenCanvas<`u`?new OffscreenCanvas(e,t):null}function Xs(e,t=``){return String(e||``).trim()||t}function Zs(e,t,n,r=8){let i=String(t||``);for(;e.measureText(i).width>n&&i.length>r;)i=`${i.slice(0,Math.max(1,i.length-5))}...`;return i}function Qs(e){return e&&typeof e.getContext==`function`?e.getContext(`2d`):null}function $s(e,t,n=Ys){let r=typeof n==`function`?n(e,t):null;return{canvasLike:r,ctx:Qs(r)}}function ec(e=null,{createCanvas:t=Ys}={}){let n=tc(e),r=e?.visible===!0,i=Xs(e?.xLabel,`X`),a=Xs(e?.yLabel,`Y`),{canvasLike:o,ctx:s}=$s(512,320,t);if(!s)return{signature:n,width:512,height:320,canvasLike:null};if(s.clearRect(0,0,512,320),r){s.save(),s.lineCap=`round`,s.lineJoin=`round`,s.font=`500 34px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,s.textBaseline=`middle`,s.fillStyle=`rgba(245, 245, 245, 0.92)`,s.strokeStyle=`rgba(15, 15, 15, 0.62)`,s.lineWidth=11,s.shadowColor=`rgba(0, 0, 0, 0.35)`,s.shadowBlur=8;let e=(e,t,n,r)=>{s.beginPath(),s.moveTo(e,t),s.lineTo(n,r),s.stroke()},t=(e,t,n)=>{s.beginPath(),s.moveTo(e,t),s.lineTo(e-Math.cos(n-.55)*24,t-Math.sin(n-.55)*24),s.moveTo(e,t),s.lineTo(e-Math.cos(n+.55)*24,t-Math.sin(n+.55)*24),s.stroke()};e(94,228,408,228),t(408,228,0),e(94,228,94,58),t(94,58,-Math.PI/2),s.strokeStyle=`rgba(245, 245, 245, 0.92)`,s.lineWidth=5,s.shadowBlur=0,e(94,228,408,228),t(408,228,0),e(94,228,94,58),t(94,58,-Math.PI/2),s.fillStyle=`rgba(250, 250, 250, 0.96)`,s.strokeStyle=`rgba(0, 0, 0, 0.72)`,s.lineWidth=5,s.strokeText(i,426,226),s.fillText(i,426,226),s.strokeText(a,114,60),s.fillText(a,114,60),s.restore()}return{signature:n,width:512,height:320,canvasLike:o}}function tc(e=null){return e?.visible===!0?`${Xs(e?.xLabel,`X`)}\n${Xs(e?.yLabel,`Y`)}`:`hidden`}function nc(e=``){return Xs(e)||`hidden`}function rc(e=``,{createCanvas:t=Ys}={}){let n=Xs(e),r=nc(e),i=1024,{canvasLike:a,ctx:o}=$s(i,128,t);return o?(o.clearRect(0,0,i,128),n&&(o.save(),o.font=`500 34px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,o.textAlign=`left`,o.textBaseline=`middle`,o.fillStyle=`rgba(255, 255, 255, 1)`,o.shadowColor=`rgba(0, 0, 0, 0.45)`,o.shadowBlur=5,o.fillText(Zs(o,n,i-64),32,128*.5),o.restore()),{signature:r,width:i,height:128,canvasLike:a}):{signature:r,width:i,height:128,canvasLike:null}}function ic(e=``){let t=Xs(e);return t?`white-on-black-plaque|${t}`:`hidden`}function ac(e=``,{createCanvas:t=Ys}={}){let n=Xs(e),r=ic(e),i=2048,{canvasLike:a,ctx:o}=$s(i,128,t);if(!o)return{signature:r,width:i,height:128,canvasLike:null};if(o.clearRect(0,0,i,128),n){o.save(),o.font=`600 50px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,o.textAlign=`center`,o.textBaseline=`middle`;let e=Zs(o,n,i-220),t=o.measureText(e),r=Math.min(i-120,Math.max(360,t.width+160)),a=(i-r)*.5;o.fillStyle=`rgba(0, 0, 0, 1)`,o.fillRect(a,26,r,76),o.fillStyle=`rgba(255, 255, 255, 1)`,o.fillText(e,i*.5,128*.5),o.restore()}return{signature:r,width:i,height:128,canvasLike:a}}function oc(e=[],{minZ:t=qs,maxZ:n=Js,capacity:r=Ks}={}){return(Array.isArray(e)?e:[]).map((e,r)=>{let i=Number(e?.z),a=Xs(e?.text||e?.name);return!Number.isFinite(i)||!a?null:{z:Math.max(t,Math.min(n,i)),text:a,active:e?.active!==!1,row:r}}).filter(Boolean).slice(0,r).map((e,t)=>({...e,row:t}))}function sc(e=[]){return e.map(e=>`${e.z.toFixed(6)}:${+!!e.active}:${e.text}`).join(`|`)||`hidden`}function cc(e=[],{createCanvas:t=Ys,minZ:n=qs,maxZ:r=Js,capacity:i=Ks}={}){let a=oc(e,{minZ:n,maxZ:r,capacity:i}),o=sc(a),s=1024,c=72*i,{canvasLike:l,ctx:u}=$s(s,c,t);if(!u)return{signature:o,width:s,height:c,canvasLike:null,normalizedLabels:a};u.clearRect(0,0,s,c),u.save(),u.textAlign=`left`,u.textBaseline=`middle`,u.shadowColor=`rgba(0, 0, 0, 0.55)`,u.shadowBlur=4;for(let e of a){let t=e.row*72+72*.5;u.font=e.active?`700 34px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`:`400 34px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,u.fillStyle=e.active?`rgba(255, 255, 255, 1)`:`rgba(220, 220, 220, 0.82)`,u.fillText(Zs(u,e.text,s-72),36,t)}return u.restore(),{signature:o,width:s,height:c,canvasLike:l,normalizedLabels:a}}function lc(e=``){return Xs(e)||`hidden`}function uc(e=``,{createCanvas:t=Ys}={}){let n=Xs(e),r=lc(e),i=1024,{canvasLike:a,ctx:o}=$s(i,256,t);return o?(o.clearRect(0,0,i,256),n&&(o.save(),o.font=`600 82px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,o.textAlign=`center`,o.textBaseline=`middle`,o.fillStyle=`rgba(255, 255, 255, 0.92)`,o.shadowColor=`rgba(0, 0, 0, 0.82)`,o.shadowBlur=10,o.shadowOffsetY=3,o.fillText(Zs(o,n,i-96),i*.5,256*.5),o.restore()),{signature:r,width:i,height:256,canvasLike:a}):{signature:r,width:i,height:256,canvasLike:null}}var dc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct AuxiliaryPlaneParams {
  z: f32,
  alpha: f32,
  visible: f32,
  _pad0: f32,
  color: vec4<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) world: vec2<f32>,
};

@group(0) @binding(0) var<uniform> view: ViewParams;
@group(0) @binding(1) var<uniform> params: AuxiliaryPlaneParams;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOut {
  var out: VertexOut;
  let corner = quadCorner(vertexIndex);
  let world = vec3<f32>(corner, params.z);
  out.position = select(vec4<f32>(2.0, 2.0, 0.5, 1.0), projectWorld(world), params.visible > 0.5);
  out.world = corner;
  return out;
}

@fragment
fn fragmentMain(@location(0) world: vec2<f32>) -> @location(0) vec4<f32> {
  if (params.visible <= 0.5) {
    discard;
  }
  let edgeDistance = min(1.0 - abs(world.x), 1.0 - abs(world.y));
  let edge = 1.0 - smoothstep(0.0, 0.035, edgeDistance);
  let color = mix(params.color.rgb, vec3<f32>(1.0), edge * 0.25);
  return vec4<f32>(color, clamp(params.alpha, 0.0, 1.0));
}
`,fc=0,pc=-.02,mc=1.1,hc=-.035,gc=-.085,_c=1.1,vc=0,yc=.3,bc=-.025,xc=.125,Sc=.5,Cc=1e6,wc=32,Tc=8,Ec=5,Dc=yc*1.2,Oc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
  particleOrientationMode: f32,
  particleHeightFogEnabled: f32,
  particleDepthFilterMode: f32,
  particleDepthFilterZ: f32,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) local: vec2<f32>,
  @location(1) color: vec4<f32>,
  @location(2) sizePx: f32,
  @location(3) worldZ: f32,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> sizes: array<f32>;
@group(0) @binding(2) var<storage, read> colors: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> activeMask: array<u32>;
@group(0) @binding(4) var<uniform> view: ViewParams;

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn worldUnitsPerPixel() -> f32 {
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let perPixel = span / max(vec2<f32>(1.0), view.viewportSize);
  return min(perPixel.x, perPixel.y);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) particleIndex: u32) -> VertexOut {
  var out: VertexOut;
  let q = positions[particleIndex];
  let depthFilterMode = i32(view.particleDepthFilterMode + 0.5);
  let passesDepthFilter = depthFilterMode == 0
    || (depthFilterMode == 1 && q.z < view.particleDepthFilterZ)
    || (depthFilterMode == 2 && q.z >= view.particleDepthFilterZ);
  let isActiveParticle = activeMask[particleIndex] != 0u && q.z >= ${fc.toFixed(6)} && passesDepthFilter;
  let corner = quadCorner(vertexIndex);
  let sizePx = max(1.0, sizes[particleIndex] * max(0.01, view.particleSizeScale));
  let worldZ = q.z;
  let centerWorld = vec3<f32>(q.xy, worldZ);
  let centerClip = projectWorld(centerWorld);
  let halfSizePx = sizePx * 0.5;
  let ndcOffset = corner * vec2<f32>(
    (2.0 * halfSizePx) / max(1.0, view.viewportSize.x),
    (2.0 * halfSizePx) / max(1.0, view.viewportSize.y)
  );
  let billboardClip = centerClip + vec4<f32>(ndcOffset * centerClip.w, 0.0, 0.0);
  let halfSizeWorld = sizePx * worldUnitsPerPixel() * 0.5;
  let planeWorld = vec3<f32>(q.xy + (corner * halfSizeWorld), worldZ);
  let planeClip = projectWorld(planeWorld);
  let clip = select(planeClip, billboardClip, view.particleOrientationMode > 0.5);
  out.position = select(vec4<f32>(2.0, 2.0, 0.5, 1.0), clip, isActiveParticle);
  out.local = corner;
  out.color = select(vec4<f32>(0.0), vec4<f32>(colors[particleIndex].rgb, clamp(colors[particleIndex].a, 0.0, 1.0)), isActiveParticle);
  out.sizePx = sizePx;
  out.worldZ = select(0.0, worldZ, isActiveParticle);
  return out;
}
`,kc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
  particleOrientationMode: f32,
  particleHeightFogEnabled: f32,
  particleDepthFilterMode: f32,
  particleDepthFilterZ: f32,
};

@group(0) @binding(4) var<uniform> view: ViewParams;
@group(0) @binding(5) var densityTexture: texture_2d<f32>;

fn sampleRawDensityAtFragment(fragCoord: vec4<f32>) -> f32 {
  let dimsU = textureDimensions(densityTexture);
  let dims = vec2<i32>(i32(dimsU.x), i32(dimsU.y));
  let scaledCoord = fragCoord.xy * max(0.0001, view.densityTextureScale);
  let coord = clamp(vec2<i32>(i32(floor(scaledCoord.x)), i32(floor(scaledCoord.y))), vec2<i32>(0, 0), dims - vec2<i32>(1, 1));
  return max(0.0, textureLoad(densityTexture, coord, 0).r);
}

fn luminance(color: vec3<f32>) -> f32 {
  return dot(color, vec3<f32>(0.299, 0.587, 0.114));
}

fn applyHeightCue(baseColor: vec3<f32>, worldZ: f32) -> vec3<f32> {
  let height = clamp(worldZ / ${_c.toFixed(6)}, 0.0, 1.0);
  let luma = luminance(baseColor);
  let saturation = mix(0.94, 1.08, height);
  let saturated = mix(vec3<f32>(luma), baseColor, saturation);
  let brightness = mix(0.90, 1.12, height);
  return clamp(saturated * brightness, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn applyParticleLighting(baseColor: vec3<f32>, local: vec2<f32>, r2: f32, shapeMode: i32) -> vec3<f32> {
  if (shapeMode == 5) {
    return baseColor;
  }
  let z = sqrt(max(0.0, 1.0 - r2));
  let normal = normalize(vec3<f32>(local * 0.62, z));
  let lightDir = normalize(vec3<f32>(-0.38, -0.48, 0.79));
  let viewDir = vec3<f32>(0.0, 0.0, 1.0);
  let diffuse = max(0.0, dot(normal, lightDir));
  let halfDir = normalize(lightDir + viewDir);
  let specular = pow(max(0.0, dot(normal, halfDir)), 24.0);
  let rim = pow(clamp(1.0 - normal.z, 0.0, 1.0), 1.7);
  let light = 0.76 + diffuse * 0.28;
  var shaded = baseColor * light;
  shaded = mix(shaded, vec3<f32>(1.0), specular * 0.12);
  shaded = mix(shaded, shaded * 0.72, rim * 0.18);
  let lightingAmount = select(0.55, 0.85, shapeMode == 3);
  return clamp(mix(baseColor, shaded, lightingAmount), vec3<f32>(0.0), vec3<f32>(1.0));
}

fn applyHeightFog(color: vec3<f32>, worldZ: f32) -> vec3<f32> {
  if (view.particleHeightFogEnabled < 0.5) {
    return color;
  }
  let height = clamp(worldZ / ${_c.toFixed(6)}, 0.0, 1.0);
  let fogAmount = smoothstep(0.02, 1.0, height) * 0.38;
  let atmosphere = vec3<f32>(0.76, 0.84, 0.94);
  let cooled = mix(color, atmosphere, fogAmount);
  let contrast = mix(0.88, 1.08, 1.0 - height);
  let midpoint = vec3<f32>(0.5);
  return clamp(midpoint + ((cooled - midpoint) * contrast), vec3<f32>(0.0), vec3<f32>(1.0));
}

fn applyAuxiliaryBelowPlaneCue(color: vec3<f32>) -> vec3<f32> {
  let isBelowAuxiliaryPlane = i32(view.particleDepthFilterMode + 0.5) == 1;
  let luma = luminance(color);
  let desaturated = mix(vec3<f32>(luma), color, 0.34);
  let emphasizedDepth = desaturated * 0.72;
  return select(color, clamp(emphasizedDepth, vec3<f32>(0.0), vec3<f32>(1.0)), isBelowAuxiliaryPlane);
}

@fragment
fn fragmentMain(@builtin(position) fragCoord: vec4<f32>, @location(0) local: vec2<f32>, @location(1) color: vec4<f32>, @location(2) sizePx: f32, @location(3) worldZ: f32) -> @location(0) vec4<f32> {
  if (color.a <= 0.0) {
    discard;
  }
  let r2 = dot(local, local);
  let r = sqrt(r2);
  let shapeMode = i32(view.particleShapeMode + 0.5);
  if (shapeMode != 5 && r2 > 1.0) {
    discard;
  }
  var alpha = 1.0;
  if (shapeMode == 1) {
    let sizeFactor = max(1.0, sizePx / 8.0);
    let adaptiveFalloff = max(0.1, view.particleSplatFalloff) * pow(sizeFactor, max(0.0, view.particleSplatSharpness));
    alpha = exp(-adaptiveFalloff * r2);
  } else if (shapeMode == 2) {
    let edgeWidth = clamp(view.particleSplatEdgeWidth, 0.001, 0.5);
    let edgeStart = max(0.0, 1.0 - edgeWidth);
    let curve = mix(1.0, 3.0, clamp(view.particleSplatEdgeStrength * 0.5, 0.0, 1.0));
    let edgeAlpha = 1.0 - smoothstep(edgeStart, 1.0, r);
    alpha = pow(clamp(edgeAlpha, 0.0, 1.0), 1.0 / curve);
  } else if (shapeMode == 3) {
    let feather = max(fwidth(r), 0.0015);
    alpha = 1.0 - smoothstep(1.0 - feather, 1.0, r);
  }
  var mappedAlpha = clamp(color.a, 0.0, 1.0);
  if (shapeMode == 4 || view.densityEnabled > 0.5) {
    let rawDensity = sampleRawDensityAtFragment(fragCoord);
    let effectiveDensity = max(1.0, rawDensity * max(0.001, view.densitySensitivity));
    let inverseDensity = clamp(1.0 / effectiveDensity, 0.0, 1.0);
    let crowding = 1.0 - inverseDensity;
    let crispFeather = max(fwidth(r), 0.0015);
    let crispAlpha = 1.0 - smoothstep(1.0 - crispFeather, 1.0, r);
    let densityBlend = crowding * clamp(view.densitySoftness, 0.0, 1.0);
    let falloff = mix(18.0, 2.25, densityBlend);
    let softAlpha = exp(-falloff * r2);
    alpha = mix(crispAlpha, softAlpha, densityBlend);
    alpha *= mix(1.0, clamp(view.densityMinAlpha, 0.02, 1.0), crowding);
  }
  if (view.densityAlphaEnabled > 0.5) {
    let rawDensity = max(1.0, sampleRawDensityAtFragment(fragCoord));
    let inverseDensity = clamp(1.0 / rawDensity, 0.0, 1.0);
    let alphaLow = clamp(min(view.densityAlphaMin, view.densityAlphaMax), 0.0, 1.0);
    let alphaHigh = clamp(max(view.densityAlphaMin, view.densityAlphaMax), 0.0, 1.0);
    mappedAlpha = mix(alphaLow, alphaHigh, inverseDensity);
  }
  alpha *= mappedAlpha * clamp(view.particleBaseAlpha, 0.0, 1.0);
  let heightColor = applyHeightCue(color.rgb, worldZ);
  let shadedColor = applyParticleLighting(heightColor, local, r2, shapeMode);
  let cuedColor = applyAuxiliaryBelowPlaneCue(shadedColor);
  return vec4<f32>(applyHeightFog(cuedColor, worldZ), alpha);
}
`,Ac=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
  particleOrientationMode: f32,
  particleHeightFogEnabled: f32,
  particleDepthFilterMode: f32,
  particleDepthFilterZ: f32,
};

struct PickParams {
  pickPx: vec2<f32>,
  radiusPx: f32,
  particleCount: u32,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> sizes: array<f32>;
@group(0) @binding(2) var<storage, read> activeMask: array<u32>;
@group(0) @binding(3) var<uniform> view: ViewParams;
@group(0) @binding(4) var<uniform> pick: PickParams;
@group(0) @binding(5) var<storage, read_write> result: array<atomic<u32>>;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn worldUnitsPerPixel() -> f32 {
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let perPixel = span / max(vec2<f32>(1.0), view.viewportSize);
  return min(perPixel.x, perPixel.y);
}

fn clipToScreen(clip: vec4<f32>) -> vec2<f32> {
  let ndc = clip.xy / max(0.000001, clip.w);
  return vec2<f32>(
    (ndc.x * 0.5 + 0.5) * view.viewportSize.x,
    (0.5 - ndc.y * 0.5) * view.viewportSize.y
  );
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) globalId: vec3<u32>) {
  let particleIndex = globalId.x;
  if (particleIndex >= pick.particleCount) {
    return;
  }
  let q = positions[particleIndex];
  if (activeMask[particleIndex] == 0u || q.z < ${fc.toFixed(6)}) {
    return;
  }
  let centerClip = projectWorld(q.xyz);
  if (centerClip.w <= 0.000001) {
    return;
  }
  let centerPx = clipToScreen(centerClip);
  let sizePx = max(1.0, sizes[particleIndex] * max(0.01, view.particleSizeScale));
  let halfSizePx = sizePx * 0.5;
  let expansionPx = max(0.0, pick.radiusPx);
  let delta = pick.pickPx - centerPx;
  let shapeMode = i32(view.particleShapeMode + 0.5);
  var hit = false;
  if (shapeMode == 5) {
    hit = max(abs(delta.x), abs(delta.y)) <= (halfSizePx + expansionPx);
  } else {
    hit = dot(delta, delta) <= (halfSizePx + expansionPx) * (halfSizePx + expansionPx);
  }
  if (!hit && view.particleOrientationMode <= 0.5) {
    let halfSizeWorld = sizePx * worldUnitsPerPixel() * 0.5;
    let xPx = clipToScreen(projectWorld(vec3<f32>(q.x + halfSizeWorld, q.y, q.z)));
    let yPx = clipToScreen(projectWorld(vec3<f32>(q.x, q.y + halfSizeWorld, q.z)));
    let approxHalfSizePx = max(length(xPx - centerPx), length(yPx - centerPx));
    if (shapeMode == 5) {
      hit = max(abs(delta.x), abs(delta.y)) <= (approxHalfSizePx + expansionPx);
    } else {
      hit = dot(delta, delta) <= (approxHalfSizePx + expansionPx) * (approxHalfSizePx + expansionPx);
    }
  }
  if (hit) {
    let previous = atomicAdd(&result[0], 1u);
    if (previous < 6u) {
      atomicStore(&result[1u + previous], particleIndex + 1u);
    }
  }
}
`,jc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
  particleOrientationMode: f32,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) local: vec2<f32>,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> sizes: array<f32>;
@group(0) @binding(3) var<storage, read> activeMask: array<u32>;
@group(0) @binding(4) var<uniform> view: ViewParams;

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn worldUnitsPerPixel() -> f32 {
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let perPixel = span / max(vec2<f32>(1.0), view.viewportSize);
  return min(perPixel.x, perPixel.y);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) particleIndex: u32) -> VertexOut {
  var out: VertexOut;
  let q = positions[particleIndex];
  let isActiveParticle = activeMask[particleIndex] != 0u && q.z >= ${fc.toFixed(6)};
  let corner = quadCorner(vertexIndex);
  let sizePx = max(1.0, sizes[particleIndex] * max(0.01, view.particleSizeScale));
  let worldZ = q.z;
  let centerWorld = vec3<f32>(q.xy, worldZ);
  let centerClip = projectWorld(centerWorld);
  let halfSizePx = sizePx * 0.5;
  let ndcOffset = corner * vec2<f32>(
    (2.0 * halfSizePx) / max(1.0, view.viewportSize.x),
    (2.0 * halfSizePx) / max(1.0, view.viewportSize.y)
  );
  let billboardClip = centerClip + vec4<f32>(ndcOffset * centerClip.w, 0.0, 0.0);
  let halfSizeWorld = sizePx * worldUnitsPerPixel() * 0.5;
  let planeWorld = vec3<f32>(q.xy + (corner * halfSizeWorld), worldZ);
  let planeClip = projectWorld(planeWorld);
  let clip = select(planeClip, billboardClip, view.particleOrientationMode > 0.5);
  out.position = select(vec4<f32>(2.0, 2.0, 0.5, 1.0), clip, isActiveParticle);
  out.local = corner;
  return out;
}
`,Mc=`
@fragment
fn fragmentMain(@location(0) local: vec2<f32>) -> @location(0) vec4<f32> {
  let insideDisc = select(0.0, 1.0, dot(local, local) <= 1.0);
  return vec4<f32>(insideDisc, 0.0, 0.0, insideDisc);
}
`,Nc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) local: vec2<f32>,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> sizes: array<f32>;
@group(0) @binding(3) var<storage, read> activeMask: array<u32>;
@group(0) @binding(4) var<uniform> view: ViewParams;
@group(0) @binding(5) var<storage, read> shadowBounds: array<i32>;

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn shadowBoundsMinMax() -> vec4<f32> {
  let invScale = ${`1.0 / ${Cc.toFixed(1)}`};
  let minX = f32(shadowBounds[0]) * invScale;
  let minY = f32(shadowBounds[1]) * invScale;
  let maxX = f32(shadowBounds[2]) * invScale;
  let maxY = f32(shadowBounds[3]) * invScale;
  var bounds = vec4<f32>(minX, minY, maxX, maxY);
  if (bounds.x > bounds.z || bounds.y > bounds.w) {
    bounds = vec4<f32>(-1.0, -1.0, 1.0, 1.0);
  }
  let span = max(bounds.zw - bounds.xy, vec2<f32>(0.001));
  let padding = max(span * 0.08, vec2<f32>(0.015));
  return vec4<f32>(bounds.xy - padding, bounds.zw + padding);
}

fn worldUnitsPerShadowTexel(bounds: vec4<f32>) -> f32 {
  let span = max(bounds.zw - bounds.xy, vec2<f32>(0.000001));
  return min(span.x / max(1.0, view.viewportSize.x), span.y / max(1.0, view.viewportSize.y));
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) particleIndex: u32) -> VertexOut {
  var out: VertexOut;
  let q = positions[particleIndex];
  let isActiveParticle = activeMask[particleIndex] != 0u && q.z >= ${fc.toFixed(6)};
  let corner = quadCorner(vertexIndex);
  let bounds = shadowBoundsMinMax();
  let sizePx = max(44.0, sizes[particleIndex] * max(0.01, view.particleSizeScale) * 9.0);
  let halfSizeWorld = sizePx * worldUnitsPerShadowTexel(bounds) * 0.5;
  let world = q.xy + (corner * halfSizeWorld);
  let uv = (world - bounds.xy) / max(bounds.zw - bounds.xy, vec2<f32>(0.000001));
  let clip = vec2<f32>((uv.x * 2.0) - 1.0, (uv.y * 2.0) - 1.0);
  out.position = select(vec4<f32>(2.0, 2.0, 0.5, 1.0), vec4<f32>(clip, 0.0, 1.0), isActiveParticle);
  out.local = corner;
  return out;
}
`,Pc=`
@fragment
fn fragmentMain(@location(0) local: vec2<f32>) -> @location(0) vec4<f32> {
  let r2 = dot(local, local);
  if (r2 > 1.0) {
    discard;
  }
  let r = sqrt(r2);
  let edgeFade = 1.0 - smoothstep(0.62, 1.0, r);
  let density = exp(-3.2 * r2) * edgeFade;
  return vec4<f32>(density, 0.0, 0.0, density);
}
`,Fc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) world: vec2<f32>,
};

@group(0) @binding(0) var densityInput: texture_2d<f32>;
@group(0) @binding(1) var<uniform> view: ViewParams;
@group(0) @binding(2) var<storage, read> shadowBounds: array<i32>;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn sampleRawDensityForWorld(world: vec2<f32>) -> f32 {
  let dimsU = textureDimensions(densityInput);
  let dims = vec2<i32>(i32(dimsU.x), i32(dimsU.y));
  let invScale = ${`1.0 / ${Cc.toFixed(1)}`};
  let rawBounds = vec4<f32>(
    f32(shadowBounds[0]) * invScale,
    f32(shadowBounds[1]) * invScale,
    f32(shadowBounds[2]) * invScale,
    f32(shadowBounds[3]) * invScale
  );
  var bounds = rawBounds;
  if (bounds.x > bounds.z || bounds.y > bounds.w) {
    bounds = vec4<f32>(-1.0, -1.0, 1.0, 1.0);
  }
  let span = max(bounds.zw - bounds.xy, vec2<f32>(0.001));
  let padding = max(span * 0.08, vec2<f32>(0.015));
  bounds = vec4<f32>(bounds.xy - padding, bounds.zw + padding);
  if (world.x < bounds.x || world.x > bounds.z || world.y < bounds.y || world.y > bounds.w) {
    return 0.0;
  }
  let uv = clamp((world - bounds.xy) / max(bounds.zw - bounds.xy, vec2<f32>(0.000001)), vec2<f32>(0.0), vec2<f32>(1.0));
  let coord = clamp(
    vec2<i32>(
      i32(floor(uv.x * f32(max(1, dims.x - 1)))),
      i32(floor((1.0 - uv.y) * f32(max(1, dims.y - 1))))
    ),
    vec2<i32>(0, 0),
    dims - vec2<i32>(1, 1)
  );
  return max(0.0, textureLoad(densityInput, coord, 0).r);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOut {
  var out: VertexOut;
  let corner = quadCorner(vertexIndex);
  out.position = projectWorld(vec3<f32>(corner, 0.006));
  out.world = corner;
  return out;
}

@fragment
fn fragmentMain(@location(0) world: vec2<f32>) -> @location(0) vec4<f32> {
  let rawDensity = sampleRawDensityForWorld(world);
  let density = clamp(1.0 - exp(-rawDensity * max(0.001, view.densitySensitivity)), 0.0, 1.0);
  let alpha = smoothstep(0.015, 0.12, density) * 0.78;
  if (alpha <= 0.001) {
    discard;
  }
  let low = vec3<f32>(0.05, 0.24, 1.0);
  let mid = vec3<f32>(0.08, 0.86, 0.95);
  let high = vec3<f32>(1.0, 0.08, 0.04);
  let color = mix(mix(low, mid, smoothstep(0.0, 0.45, density)), high, smoothstep(0.38, 1.0, density));
  return vec4<f32>(color, alpha);
}
`,Ic=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) world: vec3<f32>,
  @location(2) faceKind: f32,
  @location(3) light: f32,
  @location(4) normal: vec3<f32>,
};

struct PlaneParams {
  referenceColor: vec4<f32>,
  axisColor: vec4<f32>,
  gridColor: vec4<f32>,
  lineHalfWidth: vec4<f32>,
  densityShadow: vec4<f32>,
  sidePlaneColor: vec4<f32>,
  sideLayerMeta: vec4<f32>,
  scatterLegend: vec4<f32>,
  datasetLabel: vec4<f32>,
  analysisLabel: vec4<f32>,
  sideLayerMarkers: array<vec4<f32>, ${wc}>,
};

@group(0) @binding(0) var<uniform> view: ViewParams;
@group(0) @binding(1) var<uniform> params: PlaneParams;
@group(0) @binding(2) var shadowDensityTexture: texture_2d<f32>;
@group(0) @binding(3) var<storage, read> shadowBounds: array<i32>;
@group(0) @binding(4) var scatterLegendSampler: sampler;
@group(0) @binding(5) var scatterLegendTexture: texture_2d<f32>;
@group(0) @binding(6) var datasetLabelTexture: texture_2d<f32>;
@group(0) @binding(7) var analysisLabelTexture: texture_2d<f32>;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn faceLight(normal: vec3<f32>) -> f32 {
  let lightDir = normalize(vec3<f32>(-0.35, -0.45, 0.82));
  return clamp(0.58 + max(0.0, dot(normal, lightDir)) * 0.42, 0.36, 1.0);
}

fn referenceBaseColor(reference: vec3<f32>) -> vec3<f32> {
  let luminance = dot(reference, vec3<f32>(0.299, 0.587, 0.114));
  let tint = select(vec3<f32>(0.0), vec3<f32>(1.0), luminance < 0.5);
  return mix(reference, tint, 0.12);
}

fn blockVertex(vertexIndex: u32, blockIndex: u32) -> vec3<f32> {
  let isBase = blockIndex > 0u;
  let scale = select(1.0, ${mc.toFixed(6)}, isBase);
  let x0 = -scale;
  let x1 = scale;
  let y0 = -scale;
  let y1 = scale;
  let z0 = select(${pc.toFixed(6)}, ${gc.toFixed(6)}, isBase);
  let z1 = select(${fc.toFixed(6)}, ${hc.toFixed(6)}, isBase);
  let vertices = array<vec3<f32>, 36>(
    vec3<f32>(x0, y0, z1), vec3<f32>(x1, y0, z1), vec3<f32>(x0, y1, z1),
    vec3<f32>(x0, y1, z1), vec3<f32>(x1, y0, z1), vec3<f32>(x1, y1, z1),

    vec3<f32>(x0, y0, z0), vec3<f32>(x0, y1, z0), vec3<f32>(x1, y0, z0),
    vec3<f32>(x0, y1, z0), vec3<f32>(x1, y1, z0), vec3<f32>(x1, y0, z0),

    vec3<f32>(x1, y0, z0), vec3<f32>(x1, y1, z0), vec3<f32>(x1, y0, z1),
    vec3<f32>(x1, y0, z1), vec3<f32>(x1, y1, z0), vec3<f32>(x1, y1, z1),

    vec3<f32>(x0, y0, z0), vec3<f32>(x0, y0, z1), vec3<f32>(x0, y1, z0),
    vec3<f32>(x0, y0, z1), vec3<f32>(x0, y1, z1), vec3<f32>(x0, y1, z0),

    vec3<f32>(x0, y1, z0), vec3<f32>(x0, y1, z1), vec3<f32>(x1, y1, z0),
    vec3<f32>(x0, y1, z1), vec3<f32>(x1, y1, z1), vec3<f32>(x1, y1, z0),

    vec3<f32>(x0, y0, z0), vec3<f32>(x1, y0, z0), vec3<f32>(x0, y0, z1),
    vec3<f32>(x0, y0, z1), vec3<f32>(x1, y0, z0), vec3<f32>(x1, y0, z1)
  );
  return vertices[vertexIndex];
}

fn blockNormal(faceIndex: u32) -> vec3<f32> {
  if (faceIndex == 0u) {
    return vec3<f32>(0.0, 0.0, 1.0);
  }
  if (faceIndex == 1u) {
    return vec3<f32>(0.0, 0.0, -1.0);
  }
  if (faceIndex == 2u) {
    return vec3<f32>(1.0, 0.0, 0.0);
  }
  if (faceIndex == 3u) {
    return vec3<f32>(-1.0, 0.0, 0.0);
  }
  if (faceIndex == 4u) {
    return vec3<f32>(0.0, 1.0, 0.0);
  }
  return vec3<f32>(0.0, -1.0, 0.0);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) quadIndex: u32) -> VertexOut {
  var out: VertexOut;
  let faceIndex = vertexIndex / 6u;
  let position = blockVertex(vertexIndex, quadIndex);
  let normal = blockNormal(faceIndex);
  let isBase = quadIndex > 0u;
  var blockColor = params.referenceColor.rgb;
  var faceKind = select(0.0, 1.0, faceIndex == 0u);
  if (isBase) {
    blockColor = referenceBaseColor(params.referenceColor.rgb);
    faceKind = 0.0;
  }
  out.position = projectWorld(position);
  out.color = vec4<f32>(blockColor, select(1.0, 0.75, isBase));
  out.world = position;
  out.faceKind = faceKind;
  out.light = faceLight(normal);
  out.normal = normal;
  return out;
}

fn gridLevelVisible(step: f32, minPixelSpacing: f32) -> bool {
  if (minPixelSpacing <= 0.0) {
    return true;
  }
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let spacing = min((step / span.x) * max(1.0, view.viewportSize.x), (step / span.y) * max(1.0, view.viewportSize.y));
  return spacing >= minPixelSpacing;
}

fn lineCoverage(value: f32, center: f32, halfWidth: f32) -> f32 {
  let distance = abs(value - center);
  let feather = max(fwidth(value), 0.000001);
  let coverage = 1.0 - smoothstep(halfWidth, halfWidth + feather, distance);
  return select(0.0, coverage, halfWidth > 0.0);
}

fn isMultipleOfStep(value: f32, step: f32) -> bool {
  let nearest = round(value / step) * step;
  return abs(value - nearest) <= step * 0.0001;
}

fn gridCoordinateCoverage(value: f32, step: f32, halfWidth: f32, coarserStep: f32) -> f32 {
  let nearest = round(value / step) * step;
  let coverage = lineCoverage(value, nearest, halfWidth);
  let isAxis = abs(nearest) <= step * 0.0001;
  let isCoarserGrid = coarserStep > 0.0 && isMultipleOfStep(nearest, coarserStep);
  return select(coverage, 0.0, isAxis || isCoarserGrid);
}

fn gridCoverage(world: vec2<f32>, step: f32, minPixelSpacing: f32, coarserStep: f32) -> f32 {
  if (!gridLevelVisible(step, minPixelSpacing)) {
    return 0.0;
  }
  return max(
    gridCoordinateCoverage(world.x, step, params.lineHalfWidth.z, coarserStep),
    gridCoordinateCoverage(world.y, step, params.lineHalfWidth.w, coarserStep)
  );
}

fn hash21(p: vec2<f32>) -> f32 {
  let q = fract(vec2<f32>(
    dot(p, vec2<f32>(127.1, 311.7)),
    dot(p, vec2<f32>(269.5, 183.3))
  ));
  return fract(sin(q.x + q.y) * 43758.5453123);
}

fn valueNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2<f32>(1.0, 0.0));
  let c = hash21(i + vec2<f32>(0.0, 1.0));
  let d = hash21(i + vec2<f32>(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

fn referenceSurfaceDetail(world: vec2<f32>) -> f32 {
  let coarse = valueNoise(world * 18.0);
  let fine = valueNoise(world * 72.0);
  return ((coarse * 0.72 + fine * 0.28) - 0.5) * 0.055;
}

fn gridLevelColor(level: f32) -> vec3<f32> {
  let base = params.gridColor.rgb;
  let luminance = dot(base, vec3<f32>(0.299, 0.587, 0.114));
  let adjustmentColor = select(vec3<f32>(0.0), vec3<f32>(1.0), luminance < 0.5);
  return mix(base, adjustmentColor, clamp(level * 0.09, 0.0, 0.28));
}

fn referenceOutlineCoverage(world: vec2<f32>, scale: f32, halfWidth: f32) -> f32 {
  let edgeX = max(
    lineCoverage(world.x, -scale, halfWidth),
    lineCoverage(world.x, scale, halfWidth)
  );
  let edgeY = max(
    lineCoverage(world.y, -scale, halfWidth),
    lineCoverage(world.y, scale, halfWidth)
  );
  return max(edgeX, edgeY);
}

fn sampleRawDensityForPlaneShadow(world: vec2<f32>) -> f32 {
  let dimsU = textureDimensions(shadowDensityTexture);
  let dims = vec2<i32>(i32(dimsU.x), i32(dimsU.y));
  let invScale = ${`1.0 / ${Cc.toFixed(1)}`};
  let rawBounds = vec4<f32>(
    f32(shadowBounds[0]) * invScale,
    f32(shadowBounds[1]) * invScale,
    f32(shadowBounds[2]) * invScale,
    f32(shadowBounds[3]) * invScale
  );
  var bounds = rawBounds;
  if (bounds.x > bounds.z || bounds.y > bounds.w) {
    bounds = vec4<f32>(-1.0, -1.0, 1.0, 1.0);
  }
  let span = max(bounds.zw - bounds.xy, vec2<f32>(0.001));
  let padding = max(span * 0.08, vec2<f32>(0.015));
  bounds = vec4<f32>(bounds.xy - padding, bounds.zw + padding);
  if (world.x < bounds.x || world.x > bounds.z || world.y < bounds.y || world.y > bounds.w) {
    return 0.0;
  }
  let uv = clamp((world - bounds.xy) / max(bounds.zw - bounds.xy, vec2<f32>(0.000001)), vec2<f32>(0.0), vec2<f32>(1.0));
  let textureCoord = vec2<f32>(
    uv.x * f32(max(1, dims.x - 1)),
    (1.0 - uv.y) * f32(max(1, dims.y - 1))
  );
  let baseCoord = vec2<i32>(i32(floor(textureCoord.x)), i32(floor(textureCoord.y)));
  let minCoord = vec2<i32>(0, 0);
  let maxCoord = dims - vec2<i32>(1, 1);
  var rawDensity = 0.0;
  var weightSum = 0.0;
  for (var y: i32 = -3; y <= 3; y = y + 1) {
    for (var x: i32 = -3; x <= 3; x = x + 1) {
      let offset = vec2<i32>(x, y);
      let coord = clamp(baseCoord + offset, minCoord, maxCoord);
      let distance2 = f32((x * x) + (y * y));
      let weight = exp(-distance2 * 0.16);
      rawDensity += max(0.0, textureLoad(shadowDensityTexture, coord, 0).r) * weight;
      weightSum += weight;
    }
  }
  return rawDensity / max(0.000001, weightSum);
}

fn sampleScatterLegend(world: vec2<f32>) -> vec4<f32> {
  if (params.scatterLegend.x < 0.5) {
    return vec4<f32>(0.0);
  }
  let origin = params.scatterLegend.yz;
  let width = max(0.0001, params.scatterLegend.w);
  let height = width * 0.62;
  let uv = (world - origin) / vec2<f32>(width, height);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec4<f32>(0.0);
  }
  return textureSampleLevel(scatterLegendTexture, scatterLegendSampler, vec2<f32>(uv.x, 1.0 - uv.y), 0.0);
}

fn sampleDatasetLabel(world: vec2<f32>) -> vec4<f32> {
  if (params.datasetLabel.x < 0.5) {
    return vec4<f32>(0.0);
  }
  let origin = params.datasetLabel.yz;
  let width = max(0.0001, params.datasetLabel.w);
  let dims = vec2<f32>(textureDimensions(datasetLabelTexture));
  let aspect = max(0.0001, dims.y / max(1.0, dims.x));
  let height = width * aspect;
  let uv = (world - origin) / vec2<f32>(width, height);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec4<f32>(0.0);
  }
  return textureSampleLevel(datasetLabelTexture, scatterLegendSampler, vec2<f32>(uv.x, 1.0 - uv.y), 0.0);
}

fn sampleAnalysisLabel(world: vec3<f32>, normal: vec3<f32>, isBase: bool) -> vec4<f32> {
  if (!isBase || params.analysisLabel.x < 0.5 || abs(normal.z) > 0.5) {
    return vec4<f32>(0.0);
  }
  let coord = select(world.x, world.y, abs(normal.x) > 0.5);
  let width = max(0.0001, params.analysisLabel.w);
  let dims = vec2<f32>(textureDimensions(analysisLabelTexture));
  let aspect = max(0.0001, dims.y / max(1.0, dims.x));
  let height = width * aspect;
  let zCenter = (${hc.toFixed(6)} + ${gc.toFixed(6)}) * 0.5;
  let left = -width * 0.5;
  let bottom = zCenter - height * 0.5;
  let localU = (coord - left) / width;
  let localV = (world.z - bottom) / height;
  if (localU < 0.0 || localU > 1.0 || localV < 0.0 || localV > 1.0) {
    return vec4<f32>(0.0);
  }
  let flipU = (normal.x < -0.5) || (normal.y > 0.5);
  let u = select(localU, 1.0 - localU, flipU);
  return textureSampleLevel(analysisLabelTexture, scatterLegendSampler, vec2<f32>(u, 1.0 - localV), 0.0);
}

@fragment
fn fragmentMain(
  @builtin(position) fragCoord: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) world: vec3<f32>,
  @location(2) faceKind: f32,
  @location(3) light: f32,
  @location(4) normal: vec3<f32>
) -> @location(0) vec4<f32> {
  let worldXY = world.xy;
  let luminance = dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114));
  let toneTarget = select(vec3<f32>(0.0), vec3<f32>(1.0), luminance < 0.48);
  let detail = referenceSurfaceDetail(worldXY);
  let materialLight = clamp(light + detail, 0.0, 1.18);
  let edgeLighting = pow(clamp(1.0 - abs(normal.z), 0.0, 1.0), 1.7) * 0.16;
  let sideBase = mix(color.rgb, toneTarget, edgeLighting);
  let isBaseBlock = color.a < 0.9;
  let sideEdge = referenceOutlineCoverage(worldXY, select(1.0, ${mc.toFixed(6)}, isBaseBlock), params.lineHalfWidth.y * 1.4);
  var sideColor = mix(sideBase * materialLight, toneTarget, sideEdge * 0.32);
  let analysisLabel = sampleAnalysisLabel(world, normal, isBaseBlock);
  sideColor = mix(sideColor, analysisLabel.rgb, clamp(analysisLabel.a, 0.0, 1.0));
  var planeColor = color.rgb * clamp(0.92 + detail, 0.86, 1.06);
  let grid0 = gridCoverage(worldXY, 0.1, 0.0, 0.0);
  let grid1 = gridCoverage(worldXY, 0.01, 16.0, 0.1);
  let grid2 = gridCoverage(worldXY, 0.001, 16.0, 0.01);
  let grid3 = gridCoverage(worldXY, 0.0001, 16.0, 0.001);
  let axis = max(
    lineCoverage(worldXY.y, 0.0, params.lineHalfWidth.y),
    lineCoverage(worldXY.x, 0.0, params.lineHalfWidth.x)
  );
  let depthFade = clamp(1.18 - fragCoord.z * 0.42, 0.64, 1.0);
  let derivativeFade = clamp(1.0 - (fwidth(worldXY.x) + fwidth(worldXY.y)) * 6.0, 0.45, 1.0);
  let gridFade = depthFade * derivativeFade;
  planeColor = mix(planeColor, gridLevelColor(0.0), grid0 * 0.86 * gridFade);
  planeColor = mix(planeColor, gridLevelColor(1.0), grid1 * 0.46 * gridFade);
  planeColor = mix(planeColor, gridLevelColor(2.0), grid2 * 0.24 * gridFade);
  planeColor = mix(planeColor, gridLevelColor(3.0), grid3 * 0.14 * gridFade);
  var topColor = mix(planeColor, params.axisColor.rgb * clamp(light + 0.08, 0.0, 1.0), axis * 0.92);
  let outline = referenceOutlineCoverage(worldXY, 1.0, max(params.lineHalfWidth.x, params.lineHalfWidth.y) * 1.8);
  topColor = mix(topColor, toneTarget, outline * 0.42);
  let rawDensity = sampleRawDensityForPlaneShadow(worldXY);
  let densityResponse = 1.0 - exp(-rawDensity * max(0.001, params.densityShadow.y));
  let shadow = params.densityShadow.x * clamp(densityResponse, 0.0, 1.0) * clamp(params.densityShadow.z, 0.0, 1.0);
  topColor *= 1.0 - clamp(shadow, 0.0, params.densityShadow.w);
  let legend = sampleScatterLegend(worldXY);
  topColor = mix(topColor, legend.rgb, legend.a * 0.25 * select(0.0, 1.0, faceKind >= 0.5));
  let datasetLabel = sampleDatasetLabel(worldXY);
  let datasetLabelLuminance = dot(topColor, vec3<f32>(0.299, 0.587, 0.114));
  let datasetLabelColor = select(vec3<f32>(1.0), vec3<f32>(0.0), datasetLabelLuminance > 0.52);
  topColor = mix(topColor, datasetLabelColor, datasetLabel.a * 0.32 * select(0.0, 1.0, faceKind >= 0.5));
  return vec4<f32>(select(sideColor, topColor, faceKind >= 0.5), 1.0);
}
`,Lc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct PlaneParams {
  referenceColor: vec4<f32>,
  axisColor: vec4<f32>,
  gridColor: vec4<f32>,
  lineHalfWidth: vec4<f32>,
  densityShadow: vec4<f32>,
  sidePlaneColor: vec4<f32>,
  sideLayerMeta: vec4<f32>,
  scatterLegend: vec4<f32>,
  datasetLabel: vec4<f32>,
  analysisLabel: vec4<f32>,
  sideLayerMarkers: array<vec4<f32>, ${wc}>,
  sideLayerLabels: array<vec4<f32>, ${wc}>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) world: vec3<f32>,
  @location(2) normal: vec3<f32>,
};

@group(0) @binding(0) var<uniform> view: ViewParams;
@group(0) @binding(1) var<uniform> params: PlaneParams;
@group(0) @binding(2) var sideLayerLabelSampler: sampler;
@group(0) @binding(3) var sideLayerLabelTexture: texture_2d<f32>;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn sidePlaneVertex(vertexIndex: u32, sideIndex: u32) -> vec3<f32> {
  let z0 = ${fc.toFixed(6)};
  let z1 = ${_c.toFixed(6)};
  let x0 = -1.0;
  let x1 = 1.0;
  let y0 = -1.0;
  let y1 = 1.0;
  let right = array<vec3<f32>, 6>(
    vec3<f32>(x1, y0, z0), vec3<f32>(x1, y1, z0), vec3<f32>(x1, y0, z1),
    vec3<f32>(x1, y0, z1), vec3<f32>(x1, y1, z0), vec3<f32>(x1, y1, z1)
  );
  let left = array<vec3<f32>, 6>(
    vec3<f32>(x0, y0, z0), vec3<f32>(x0, y0, z1), vec3<f32>(x0, y1, z0),
    vec3<f32>(x0, y1, z0), vec3<f32>(x0, y0, z1), vec3<f32>(x0, y1, z1)
  );
  let top = array<vec3<f32>, 6>(
    vec3<f32>(x0, y1, z0), vec3<f32>(x0, y1, z1), vec3<f32>(x1, y1, z0),
    vec3<f32>(x1, y1, z0), vec3<f32>(x0, y1, z1), vec3<f32>(x1, y1, z1)
  );
  let bottom = array<vec3<f32>, 6>(
    vec3<f32>(x0, y0, z0), vec3<f32>(x1, y0, z0), vec3<f32>(x0, y0, z1),
    vec3<f32>(x0, y0, z1), vec3<f32>(x1, y0, z0), vec3<f32>(x1, y0, z1)
  );
  if (sideIndex == 0u) {
    return right[vertexIndex];
  }
  if (sideIndex == 1u) {
    return left[vertexIndex];
  }
  if (sideIndex == 2u) {
    return top[vertexIndex];
  }
  return bottom[vertexIndex];
}

fn sidePlaneNormal(sideIndex: u32) -> vec3<f32> {
  if (sideIndex == 0u) {
    return vec3<f32>(1.0, 0.0, 0.0);
  }
  if (sideIndex == 1u) {
    return vec3<f32>(-1.0, 0.0, 0.0);
  }
  if (sideIndex == 2u) {
    return vec3<f32>(0.0, 1.0, 0.0);
  }
  return vec3<f32>(0.0, -1.0, 0.0);
}

fn faceLight(normal: vec3<f32>) -> f32 {
  let lightDir = normalize(vec3<f32>(-0.35, -0.45, 0.82));
  return clamp(0.52 + max(0.0, dot(normal, lightDir)) * 0.32, 0.42, 0.9);
}

fn adjustTone(color: vec3<f32>, amount: f32) -> vec3<f32> {
  let luminance = dot(color, vec3<f32>(0.299, 0.587, 0.114));
  let toneTarget = select(vec3<f32>(0.0), vec3<f32>(1.0), luminance < 0.48);
  return mix(color, toneTarget, clamp(amount, 0.0, 1.0));
}

fn hash21(p: vec2<f32>) -> f32 {
  let q = fract(vec2<f32>(
    dot(p, vec2<f32>(127.1, 311.7)),
    dot(p, vec2<f32>(269.5, 183.3))
  ));
  return fract(sin(q.x + q.y) * 43758.5453123);
}

fn valueNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2<f32>(1.0, 0.0));
  let c = hash21(i + vec2<f32>(0.0, 1.0));
  let d = hash21(i + vec2<f32>(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

fn lineCoverage(value: f32, center: f32, halfWidth: f32) -> f32 {
  let distance = abs(value - center);
  let feather = max(fwidth(value), 0.000001);
  let coverage = 1.0 - smoothstep(halfWidth, halfWidth + feather, distance);
  return select(0.0, coverage, halfWidth > 0.0);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) sideIndex: u32) -> VertexOut {
  var out: VertexOut;
  let actualSideIndex = u32(round(select(params.sideLayerMeta.z, params.sideLayerMeta.w, sideIndex > 0u)));
  let position = sidePlaneVertex(vertexIndex, actualSideIndex);
  let normal = sidePlaneNormal(actualSideIndex);
  let base = adjustTone(params.sidePlaneColor.rgb, 0.03);
  out.position = projectWorld(position);
  out.color = vec4<f32>(base * faceLight(normal), 1.0);
  out.world = position;
  out.normal = normal;
  return out;
}

fn sideLayerGroove(worldZ: f32, center: f32, strength: f32) -> vec3<f32> {
  let dz = worldZ - center;
  let pixelZ = max(fwidth(worldZ), 0.000001);
  let coreHalfWidth = max(pixelZ * 1.45, 0.0012);
  let feather = max(pixelZ * 1.4, 0.000001);
  let rimOffset = max(coreHalfWidth * 2.15, pixelZ * 2.8);
  let rimHalfWidth = max(coreHalfWidth * 0.75, pixelZ * 1.2);
  let s = clamp(strength, 0.0, 1.0);
  let trench = (1.0 - smoothstep(coreHalfWidth, coreHalfWidth + feather, abs(dz))) * s;
  let upperRim = (1.0 - smoothstep(rimHalfWidth, rimHalfWidth + feather, abs(dz - rimOffset))) * s;
  let lowerRim = (1.0 - smoothstep(rimHalfWidth, rimHalfWidth + feather, abs(dz + rimOffset))) * s;
  return vec3<f32>(trench, upperRim, lowerRim);
}

fn sidePlaneCoordinate(world: vec3<f32>, normal: vec3<f32>) -> f32 {
  if (abs(normal.x) > 0.5) {
    return world.y;
  }
  return world.x;
}

fn sidePlaneFineLine(value: f32, step: f32, halfWidth: f32) -> f32 {
  let nearest = round(value / step) * step;
  return lineCoverage(value, nearest, halfWidth);
}

fn sidePlaneWorldPoint(normal: vec3<f32>, coord: f32, z: f32) -> vec3<f32> {
  if (abs(normal.x) > 0.5) {
    return vec3<f32>(normal.x, coord, z);
  }
  return vec3<f32>(coord, normal.y, z);
}

fn sidePlaneLabelRange(normal: vec3<f32>, z: f32) -> vec3<f32> {
  let width = 0.68;
  let lowCoord = -0.94;
  let highCoord = 0.94;
  let lowClip = projectWorld(sidePlaneWorldPoint(normal, lowCoord, z));
  let highClip = projectWorld(sidePlaneWorldPoint(normal, highCoord, z));
  let lowScreenX = lowClip.x / max(0.000001, lowClip.w);
  let highScreenX = highClip.x / max(0.000001, highClip.w);
  let increasingCoordMovesRight = lowScreenX <= highScreenX;
  let left = select(highCoord - width, lowCoord, increasingCoordMovesRight);
  return vec3<f32>(left, left + width, select(1.0, 0.0, increasingCoordMovesRight));
}

fn sampleSideLayerLabel(world: vec3<f32>, normal: vec3<f32>) -> vec4<f32> {
  let coord = sidePlaneCoordinate(world, normal);
  let width = 0.68;
  let labelHeight = 0.075;
  let verticalOffset = 0.025;
  for (var i = 0; i < ${wc}; i = i + 1) {
    let label = params.sideLayerLabels[i];
    let enabled = label.z > 0.5;
    let z0 = label.x + verticalOffset;
    let z1 = z0 + labelHeight;
    let range = sidePlaneLabelRange(normal, z0);
    let left = range.x;
    let right = range.y;
    let flipU = range.z > 0.5;
    let inside = enabled && coord >= left && coord <= right && world.z >= z0 && world.z <= z1;
    if (inside) {
      let row = label.y;
      let localU = clamp((coord - left) / width, 0.0, 1.0);
      let u = select(localU, 1.0 - localU, flipU);
      let rowCount = f32(${wc});
      let localV = clamp((world.z - z0) / labelHeight, 0.0, 1.0);
      let v = (row + (1.0 - localV)) / rowCount;
      return textureSampleLevel(sideLayerLabelTexture, sideLayerLabelSampler, vec2<f32>(u, v), 0.0);
    }
  }
  return vec4<f32>(0.0);
}

@fragment
fn fragmentMain(@location(0) color: vec4<f32>, @location(1) world: vec3<f32>, @location(2) normal: vec3<f32>) -> @location(0) vec4<f32> {
  let markerCount = max(0.0, min(params.sideLayerMeta.x, f32(${wc})));
  var slabIndex = 0;
  var groove = vec3<f32>(0.0);
  for (var i = 0; i < ${wc}; i = i + 1) {
    let marker = params.sideLayerMarkers[i];
    let markerEnabled = f32(i) < markerCount;
    if (markerEnabled && world.z >= marker.x) {
      slabIndex = slabIndex + 1;
    }
    groove = max(groove, sideLayerGroove(world.z, marker.x, marker.y) * select(0.0, 1.0, markerEnabled));
  }
  let band = select(0.0, 1.0, (slabIndex % 2) == 1);
  let coord = sidePlaneCoordinate(world, normal);
  let horizontalGuide = sidePlaneFineLine(coord, 0.1, max(params.lineHalfWidth.z, 0.00045));
  let verticalGuide = sidePlaneFineLine(world.z, 0.1, max(params.lineHalfWidth.w, 0.00045));
  let subtleNoise = (valueNoise(vec2<f32>(coord * 19.0, world.z * 31.0)) - 0.5) * 0.035;
  var shaded = adjustTone(color.rgb, band * params.sideLayerMeta.y + subtleNoise);
  shaded = mix(shaded, adjustTone(shaded, 0.08), horizontalGuide * 0.16);
  shaded = mix(shaded, shaded * 0.82, verticalGuide * 0.12);
  let trench = clamp(groove.x, 0.0, 1.0);
  let litRim = clamp(groove.y, 0.0, 1.0);
  let shadedRim = clamp(groove.z, 0.0, 1.0);
  shaded = mix(shaded, shaded * 0.35, trench * 0.88);
  shaded = mix(shaded, adjustTone(shaded, 0.28), litRim * 0.55);
  shaded = mix(shaded, shaded * 0.66, shadedRim * 0.46);
  let edge = max(
    lineCoverage(abs(coord), 1.0, max(params.lineHalfWidth.x, params.lineHalfWidth.y) * 1.35),
    lineCoverage(world.z, ${_c.toFixed(6)}, max(params.lineHalfWidth.x, params.lineHalfWidth.y) * 1.35)
  );
  shaded = mix(shaded, adjustTone(shaded, 0.34), edge * 0.42);
  let label = sampleSideLayerLabel(world, normal);
  shaded = mix(shaded, label.rgb, clamp(label.a, 0.0, 1.0) * 0.6);
  return vec4<f32>(shaded, 1.0);
}
`,Rc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct Magnet {
  position: vec2<f32>,
  color: vec4<f32>,
  style: vec4<f32>,
};

struct MagnetParams {
  sizePx: f32,
  alpha: f32,
  innerFramePx: f32,
  outlinePx: f32,
  backgroundColor: vec4<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) @interpolate(flat) flags: vec4<f32>,
  @location(3) world: vec3<f32>,
  @location(4) @interpolate(flat) component: f32,
  @location(5) local: vec3<f32>,
};

@group(0) @binding(0) var<storage, read> magnets: array<Magnet>;
@group(0) @binding(1) var<uniform> view: ViewParams;
@group(0) @binding(2) var<uniform> params: MagnetParams;

fn worldUnitsPerPixel() -> f32 {
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let perPixel = span / max(vec2<f32>(1.0), view.viewportSize);
  return min(perPixel.x, perPixel.y);
}

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn boxCorner(vertexIndex: u32) -> vec3<f32> {
  let corners = array<vec3<f32>, 36>(
    vec3<f32>(-1.0, -1.0,  1.0), vec3<f32>( 1.0, -1.0,  1.0), vec3<f32>(-1.0,  1.0,  1.0),
    vec3<f32>(-1.0,  1.0,  1.0), vec3<f32>( 1.0, -1.0,  1.0), vec3<f32>( 1.0,  1.0,  1.0),

    vec3<f32>(-1.0, -1.0,  0.0), vec3<f32>(-1.0,  1.0,  0.0), vec3<f32>( 1.0, -1.0,  0.0),
    vec3<f32>(-1.0,  1.0,  0.0), vec3<f32>( 1.0,  1.0,  0.0), vec3<f32>( 1.0, -1.0,  0.0),

    vec3<f32>( 1.0, -1.0,  0.0), vec3<f32>( 1.0,  1.0,  0.0), vec3<f32>( 1.0, -1.0,  1.0),
    vec3<f32>( 1.0, -1.0,  1.0), vec3<f32>( 1.0,  1.0,  0.0), vec3<f32>( 1.0,  1.0,  1.0),

    vec3<f32>(-1.0, -1.0,  0.0), vec3<f32>(-1.0, -1.0,  1.0), vec3<f32>(-1.0,  1.0,  0.0),
    vec3<f32>(-1.0, -1.0,  1.0), vec3<f32>(-1.0,  1.0,  1.0), vec3<f32>(-1.0,  1.0,  0.0),

    vec3<f32>(-1.0,  1.0,  0.0), vec3<f32>(-1.0,  1.0,  1.0), vec3<f32>( 1.0,  1.0,  0.0),
    vec3<f32>(-1.0,  1.0,  1.0), vec3<f32>( 1.0,  1.0,  1.0), vec3<f32>( 1.0,  1.0,  0.0),

    vec3<f32>(-1.0, -1.0,  0.0), vec3<f32>( 1.0, -1.0,  0.0), vec3<f32>(-1.0, -1.0,  1.0),
    vec3<f32>(-1.0, -1.0,  1.0), vec3<f32>( 1.0, -1.0,  0.0), vec3<f32>( 1.0, -1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn boxNormal(faceIndex: u32) -> vec3<f32> {
  if (faceIndex == 0u) {
    return vec3<f32>(0.0, 0.0, 1.0);
  }
  if (faceIndex == 1u) {
    return vec3<f32>(0.0, 0.0, -1.0);
  }
  if (faceIndex == 2u) {
    return vec3<f32>(1.0, 0.0, 0.0);
  }
  if (faceIndex == 3u) {
    return vec3<f32>(-1.0, 0.0, 0.0);
  }
  if (faceIndex == 4u) {
    return vec3<f32>(0.0, 1.0, 0.0);
  }
  return vec3<f32>(0.0, -1.0, 0.0);
}

fn componentCenter(componentIndex: u32, signFlag: f32) -> vec3<f32> {
  if (componentIndex == 0u) {
    return vec3<f32>(0.0, 0.0, 0.0);
  }
  if (signFlag < -0.5 && componentIndex == 1u) {
    return vec3<f32>(0.0, 0.0, 0.0);
  }
  if (signFlag < -0.5 && componentIndex == 2u) {
    return vec3<f32>(0.0, 0.0, 1.12);
  }
  if (componentIndex == 1u) {
    return vec3<f32>(-0.75, 0.0, 0.0);
  }
  if (componentIndex == 2u) {
    return vec3<f32>(0.75, 0.0, 0.0);
  }
  if (componentIndex == 3u) {
    return vec3<f32>(0.0, -0.75, 0.0);
  }
  if (componentIndex == 4u) {
    return vec3<f32>(0.0, 0.75, 0.0);
  }
  return vec3<f32>(0.0);
}

fn componentScale(componentIndex: u32, signFlag: f32) -> vec3<f32> {
  if (componentIndex == 0u) {
    return vec3<f32>(1.34, 1.34, 0.004);
  }
  if (signFlag < -0.5 && componentIndex == 1u) {
    return vec3<f32>(1.0, 1.0, 1.0);
  }
  if (signFlag < -0.5 && componentIndex == 2u) {
    return vec3<f32>(0.5, 0.5, 0.22);
  }
  if (componentIndex == 1u || componentIndex == 2u) {
    return vec3<f32>(0.25, 1.0, 1.0);
  }
  if (componentIndex == 3u || componentIndex == 4u) {
    return vec3<f32>(0.5, 0.25, 1.0);
  }
  return vec3<f32>(0.0);
}

fn componentEnabled(componentIndex: u32, signFlag: f32) -> bool {
  if (componentIndex == 0u) {
    return false;
  }
  if (signFlag < -0.5) {
    return componentIndex == 1u || componentIndex == 2u;
  }
  return componentIndex <= 4u;
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) magnetIndex: u32) -> VertexOut {
  var out: VertexOut;
  let magnet = magnets[magnetIndex];
  let componentIndex = vertexIndex / 36u;
  let localVertexIndex = vertexIndex % 36u;
  let faceIndex = localVertexIndex / 6u;
  let activeFlag = magnet.style.x;
  let sizeScale = magnet.style.z;
  let signFlag = magnet.style.w;
  let parkedOnBase = activeFlag < 0.5 && (abs(magnet.position.x) > 1.00001 || abs(magnet.position.y) > 1.00001);
  var magnetTopZ = ${yc.toFixed(6)};
  var magnetBaseZ = ${vc.toFixed(6)};
  if (parkedOnBase) {
    magnetTopZ = ${xc.toFixed(6)};
    magnetBaseZ = ${bc.toFixed(6)};
  }
  let sizePx = max(1.0, params.sizePx * max(0.1, sizeScale));
  let worldHalfSize = sizePx * worldUnitsPerPixel() * 0.5;
  let local = boxCorner(localVertexIndex);
  let enabled = componentEnabled(componentIndex, signFlag);
  let componentHalfSize = componentScale(componentIndex, signFlag);
  let componentOffset = componentCenter(componentIndex, signFlag);
  let isShadowComponent = componentIndex == 0u;
  var world = vec3<f32>(
    magnet.position + ((componentOffset.xy + local.xy * componentHalfSize.xy) * worldHalfSize),
    mix(magnetBaseZ, magnetTopZ, clamp(componentOffset.z + local.z * componentHalfSize.z, 0.0, 1.34))
  );
  if (isShadowComponent) {
    let shadowBaseZ = select(${fc.toFixed(6)}, ${hc.toFixed(6)}, parkedOnBase);
    world.z = shadowBaseZ + 0.0015;
  }
  out.position = select(vec4<f32>(2.0, 2.0, 0.5, 1.0), projectWorld(world), enabled);
  out.color = vec4<f32>(magnet.color.rgb, 1.0);
  out.normal = select(vec3<f32>(0.0, 0.0, 1.0), boxNormal(faceIndex), enabled);
  out.flags = vec4<f32>(activeFlag, 0.0, signFlag, select(0.0, 1.0, parkedOnBase));
  out.world = world;
  out.component = f32(componentIndex);
  out.local = local;
  return out;
}

@fragment
fn fragmentMain(
  @location(0) color: vec4<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) @interpolate(flat) flags: vec4<f32>,
  @location(3) world: vec3<f32>,
  @location(4) @interpolate(flat) component: f32,
  @location(5) local: vec3<f32>
) -> @location(0) vec4<f32> {
  if (color.a <= 0.0) {
    discard;
  }
  let isActiveMagnet = flags.x > 0.5;
  let isNegativeMagnet = flags.z < -0.5;
  let isParkedMagnet = flags.w > 0.5;
  let gray = dot(color.rgb, vec3<f32>(0.299, 0.587, 0.114));
  var surfaceColor = color.rgb;
  if (!isActiveMagnet || isParkedMagnet) {
    surfaceColor = mix(vec3<f32>(gray), color.rgb, 0.08);
  }
  let n = normalize(normal);
  let lightDir = normalize(vec3<f32>(-0.38, -0.46, 0.80));
  let fillDir = normalize(vec3<f32>(0.46, 0.36, 0.56));
  let viewDir = normalize(vec3<f32>(0.16, 0.22, 1.0));
  let diffuse = max(0.0, dot(n, lightDir));
  let fill = max(0.0, dot(n, fillDir));
  let halfVector = normalize(lightDir + viewDir);
  let specular = pow(max(0.0, dot(n, halfVector)), 30.0) * select(0.20, 0.12, isParkedMagnet);
  let negativeTint = select(vec3<f32>(1.0), vec3<f32>(1.18, 0.72, 0.72), isNegativeMagnet);
  var shaded = surfaceColor * negativeTint * (0.38 + diffuse * 0.50 + fill * 0.14);
  shaded += vec3<f32>(specular);
  let topAccent = smoothstep(${(yc-.045).toFixed(6)}, ${yc.toFixed(6)}, world.z);
  shaded = mix(shaded, shaded + vec3<f32>(0.06), topAccent * max(0.0, n.z));
  return vec4<f32>(shaded, 1.0);
}
`,zc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct Magnet {
  position: vec2<f32>,
  color: vec4<f32>,
  style: vec4<f32>,
};

struct MagnetParams {
  sizePx: f32,
  alpha: f32,
  innerFramePx: f32,
  outlinePx: f32,
  backgroundColor: vec4<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) local: vec2<f32>,
  @location(1) @interpolate(flat) flags: vec4<f32>,
};

@group(0) @binding(0) var<storage, read> magnets: array<Magnet>;
@group(0) @binding(1) var<uniform> view: ViewParams;
@group(0) @binding(2) var<uniform> params: MagnetParams;

fn worldUnitsPerPixel() -> f32 {
  let span = max(vec2<f32>(0.000001), view.viewMax - view.viewMin);
  let perPixel = span / max(vec2<f32>(1.0), view.viewportSize);
  return min(perPixel.x, perPixel.y);
}

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) magnetIndex: u32) -> VertexOut {
  var out: VertexOut;
  let magnet = magnets[magnetIndex];
  let activeFlag = magnet.style.x;
  let sizeScale = magnet.style.z;
  let parkedOnBase = activeFlag < 0.5 && (abs(magnet.position.x) > 1.00001 || abs(magnet.position.y) > 1.00001);
  let sizePx = max(1.0, params.sizePx * max(0.1, sizeScale));
  let worldHalfSize = sizePx * worldUnitsPerPixel() * 0.5;
  let corner = quadCorner(vertexIndex);
  let footprintScale = select(2.0, 1.7, parkedOnBase);
  let shadowBaseZ = select(${fc.toFixed(6)}, ${hc.toFixed(6)}, parkedOnBase);
  let world = vec3<f32>(
    magnet.position + corner * worldHalfSize * footprintScale,
    shadowBaseZ + 0.006
  );
  out.position = projectWorld(world);
  out.local = corner;
  out.flags = vec4<f32>(activeFlag, 0.0, magnet.style.w, select(0.0, 1.0, parkedOnBase));
  return out;
}

@fragment
fn fragmentMain(
  @location(0) local: vec2<f32>,
  @location(1) @interpolate(flat) flags: vec4<f32>
) -> @location(0) vec4<f32> {
  let radius2 = dot(local, local);
  let squareFade = smoothstep(1.0, 0.68, max(abs(local.x), abs(local.y)));
  let density = exp(-radius2 * 2.05) * squareFade;
  if (density <= 0.002) {
    discard;
  }
  let response = 1.0 - exp(-density * 2.8);
  let isParked = flags.w > 0.5;
  let isActive = flags.x > 0.5 && !isParked;
  let alpha = response * select(0.28, 0.38, isActive);
  return vec4<f32>(vec3<f32>(0.0), alpha);
}
`,Bc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
  particleSizeScale: f32,
  particleSplatFalloff: f32,
  particleShapeMode: f32,
  particleSplatEdgeWidth: f32,
  particleSplatEdgeStrength: f32,
  particleSplatSharpness: f32,
  densityEnabled: f32,
  densitySensitivity: f32,
  densityMinAlpha: f32,
  densitySoftness: f32,
  particleBaseAlpha: f32,
  densityAlphaEnabled: f32,
  densityAlphaMin: f32,
  densityAlphaMax: f32,
  densityTextureScale: f32,
  particleOrientationMode: f32,
  particleHeightFogEnabled: f32,
  particleDepthFilterMode: f32,
  particleDepthFilterZ: f32,
};

struct MarkerParams {
  widthPx: f32,
  baseZ: f32,
  topZ: f32,
  markerCount: f32,
  color: vec4<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) local: vec2<f32>,
  @location(1) color: vec4<f32>,
};

@group(0) @binding(0) var<storage, read> positions: array<vec4<f32>>;
@group(0) @binding(1) var<storage, read> activeMask: array<u32>;
@group(0) @binding(2) var<storage, read> markerIds: array<u32>;
@group(0) @binding(3) var<uniform> view: ViewParams;
@group(0) @binding(4) var<uniform> params: MarkerParams;

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, 0.0),
    vec2<f32>( 1.0, 0.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>( 1.0, 0.0),
    vec2<f32>( 1.0, 1.0)
  );
  return corners[vertexIndex];
}

fn clipToScreen(clip: vec4<f32>) -> vec2<f32> {
  let ndc = clip.xy / max(0.000001, clip.w);
  return vec2<f32>(
    (ndc.x * 0.5 + 0.5) * view.viewportSize.x,
    (0.5 - ndc.y * 0.5) * view.viewportSize.y
  );
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) markerIndex: u32) -> VertexOut {
  var out: VertexOut;
  let markerCount = u32(max(0.0, min(params.markerCount, f32(${Tc}))));
  if (markerIndex >= markerCount) {
    out.position = vec4<f32>(2.0, 2.0, 0.5, 1.0);
    out.local = vec2<f32>(0.0);
    out.color = vec4<f32>(0.0);
    return out;
  }
  let markerId = markerIds[markerIndex];
  if (markerId == 0u) {
    out.position = vec4<f32>(2.0, 2.0, 0.5, 1.0);
    out.local = vec2<f32>(0.0);
    out.color = vec4<f32>(0.0);
    return out;
  }
  let particleIndex = markerId - 1u;
  let q = positions[particleIndex];
  if (activeMask[particleIndex] == 0u || q.z < ${fc.toFixed(6)}) {
    out.position = vec4<f32>(2.0, 2.0, 0.5, 1.0);
    out.local = vec2<f32>(0.0);
    out.color = vec4<f32>(0.0);
    return out;
  }
  let local = quadCorner(vertexIndex);
  let baseClip = projectWorld(vec3<f32>(q.x, q.y, params.baseZ));
  let topClip = projectWorld(vec3<f32>(q.x, q.y, params.topZ));
  let baseScreen = clipToScreen(baseClip);
  let topScreen = clipToScreen(topClip);
  var direction = topScreen - baseScreen;
  if (dot(direction, direction) < 0.0001) {
    direction = vec2<f32>(0.0, -1.0);
  }
  let normal = normalize(vec2<f32>(-direction.y, direction.x));
  let endpoint = mix(baseClip, topClip, local.y);
  let offsetNdc = normal * local.x * params.widthPx / max(vec2<f32>(1.0), view.viewportSize);
  out.position = endpoint + vec4<f32>(offsetNdc * endpoint.w, 0.0, 0.0);
  out.local = local;
  out.color = params.color;
  return out;
}

@fragment
fn fragmentMain(@location(0) local: vec2<f32>, @location(1) color: vec4<f32>) -> @location(0) vec4<f32> {
  if (color.a <= 0.0) {
    discard;
  }
  let edge = smoothstep(1.0, 0.74, abs(local.x));
  let endFade = smoothstep(0.0, 0.08, local.y) * smoothstep(1.0, 0.92, local.y);
  let glow = pow(max(0.0, 1.0 - abs(local.x)), 2.0) * 0.28;
  return vec4<f32>(min(vec3<f32>(1.0), color.rgb + vec3<f32>(glow)), color.a * edge * endFade);
}
`,Vc=`
struct ViewParams {
  viewProjection: mat4x4<f32>,
  viewMin: vec2<f32>,
  viewMax: vec2<f32>,
  viewportSize: vec2<f32>,
};

struct Magnet {
  position: vec2<f32>,
  color: vec4<f32>,
  style: vec4<f32>,
};

struct MagnetParams {
  sizePx: f32,
  alpha: f32,
  innerFramePx: f32,
  outlinePx: f32,
  backgroundColor: vec4<f32>,
};

struct VertexOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) @interpolate(flat) visible: f32,
};

@group(0) @binding(0) var<storage, read> magnets: array<Magnet>;
@group(0) @binding(1) var<uniform> view: ViewParams;
@group(0) @binding(2) var<uniform> params: MagnetParams;
@group(0) @binding(3) var magnetDetailSampler: sampler;
@group(0) @binding(4) var magnetDetailTexture: texture_2d<f32>;

fn quadCorner(vertexIndex: u32) -> vec2<f32> {
  let corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
  );
  return corners[vertexIndex];
}

fn projectWorld(world: vec3<f32>) -> vec4<f32> {
  return view.viewProjection * vec4<f32>(world, 1.0);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) magnetIndex: u32) -> VertexOut {
  var out: VertexOut;
  let magnet = magnets[magnetIndex];
  let corner = quadCorner(vertexIndex);
  let hoverFlag = magnet.style.y;
  let baseSizePx = max(1.0, params.sizePx);
  let labelWidthPx = 260.0;
  let labelHeightPx = 56.0;
  let yOffsetPx = -(baseSizePx * 0.7 + labelHeightPx * 0.5 + 12.0);
  let anchorClip = projectWorld(vec3<f32>(magnet.position, 0.02));
  let ndcOffset = vec2<f32>(
    (corner.x * labelWidthPx) / max(1.0, view.viewportSize.x),
    ((corner.y * labelHeightPx) + (2.0 * yOffsetPx)) / max(1.0, view.viewportSize.y)
  );
  out.position = select(
    vec4<f32>(2.0, 2.0, 0.5, 1.0),
    anchorClip + vec4<f32>(ndcOffset * anchorClip.w, 0.0, 0.0),
    hoverFlag > 0.5
  );
  out.uv = corner * 0.5 + vec2<f32>(0.5);
  out.visible = hoverFlag;
  return out;
}

@fragment
fn fragmentMain(
  @location(0) uv: vec2<f32>,
  @location(1) @interpolate(flat) visible: f32
) -> @location(0) vec4<f32> {
  if (visible <= 0.5) {
    discard;
  }
  let label = textureSampleLevel(magnetDetailTexture, magnetDetailSampler, vec2<f32>(uv.x, 1.0 - uv.y), 0.0);
  if (label.a <= 0.01) {
    discard;
  }
  return vec4<f32>(label.rgb, label.a * 0.5);
}
`,Hc=36,Uc=6,Wc=4,Gc=2,Kc=180,qc=`depth24plus`,Jc=`rgba16float`;function Yc(e,t){if(!e||!t||e.length!==t.length)return!1;for(let n=0;n<e.length;n+=1)if(e[n]!==t[n])return!1;return!0}function Xc(e){let t=Number(e?.strength);if(Number.isFinite(t))return t;let n=Number(e?.alpha);return Number.isFinite(n)?n:1}function Zc(e){let t=Math.max(2**-52,Math.abs(Number.isFinite(e)?e:1));return Math.min(10,Math.max(.5,.5+9.5*t/(t+18)))}function Qc(e,t,n,r,i=!0,a=!0,o=`none`,s=`less-equal`){return e.createRenderPipeline({layout:`auto`,vertex:{module:e.createShaderModule({code:n}),entryPoint:`vertexMain`},fragment:{module:e.createShaderModule({code:r}),entryPoint:`fragmentMain`,targets:[{format:t,blend:i?{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}:void 0}]},primitive:{topology:`triangle-list`,cullMode:o},depthStencil:{format:qc,depthWriteEnabled:a,depthCompare:s}})}function $c(e,t,n,r,i=null){return e.createRenderPipeline({layout:`auto`,vertex:{module:e.createShaderModule({code:n}),entryPoint:`vertexMain`},fragment:{module:e.createShaderModule({code:r}),entryPoint:`fragmentMain`,targets:[{format:t,blend:i||void 0}]},primitive:{topology:`triangle-list`}})}var el=`webgpu-renderer-factory`;function tl(e,t,n=null){return or({severity:`warning`,code:e,message:t,stageName:el,details:n})}function nl(e,t,n=null){return Dr(t,{diagnostics:[tl(e,t,n)]})}function rl({device:e=null,canvas:t=null,navigatorObject:n=null}={}){let r=n||globalThis.navigator||null;if(!e)return nl(`webgpu-renderer-missing-device`,`GPU canvas renderer creation requires a GPU device.`);if(!t)return nl(`webgpu-renderer-missing-canvas`,`GPU canvas renderer creation requires a canvas.`);if(!r?.gpu)return nl(`webgpu-renderer-unavailable`,`GPU canvas renderer creation requires navigator.gpu.`);let i=t.getContext(`webgpu`);return i?Er(il({device:e,canvas:t,navigatorObject:r,context:i})):nl(`webgpu-renderer-context-unavailable`,`GPU canvas renderer creation requires a WebGPU canvas context.`)}function il({device:t,canvas:n,navigatorObject:r,context:i}){let a=r.gpu.getPreferredCanvasFormat();i.configure({device:t,format:a,alphaMode:`opaque`});let o=new Map;function s(e,t){return()=>(o.has(e)||o.set(e,t()),o.get(e))}let c=Qc(t,a,Ic,Ic,!1),l=s(`sidePlanePipeline`,()=>Qc(t,a,Lc,Lc,!1,!0,`front`)),u=s(`auxiliaryLayerPlanePipeline`,()=>Qc(t,a,dc,dc,!0,!1)),d=Qc(t,a,Oc,kc,!0,!1),f=s(`magnetShadowPipeline`,()=>Qc(t,a,zc,zc,!0,!1,`none`,`always`)),p=Qc(t,a,Rc,Rc,!1),m=t.createComputePipeline({layout:`auto`,compute:{module:t.createShaderModule({code:Ac}),entryPoint:`main`}}),h=s(`densityPipeline`,()=>$c(t,Jc,jc,Mc,{color:{srcFactor:`one`,dstFactor:`one`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one`,operation:`add`}})),g=s(`shadowDensityPipeline`,()=>$c(t,Jc,Nc,Pc,{color:{srcFactor:`one`,dstFactor:`one`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one`,operation:`add`}})),_=s(`densityPreviewPipeline`,()=>Qc(t,a,Fc,Fc,!0,!1)),v=t.createBuffer({label:`GpuRendererViewParams`,size:176,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),y=t.createBuffer({label:`GpuRendererParticleBelowViewParams`,size:176,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),b=t.createBuffer({label:`GpuRendererParticleAboveViewParams`,size:176,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),x=t.createBuffer({label:`GpuRendererPlaneParams`,size:296*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),S=t.createBuffer({label:`GpuRendererMagnetParams`,size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),ee=t.createBuffer({label:`GpuRendererParticleMarkerParams`,size:8*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),C=t.createBuffer({label:`GpuRendererParticleMarkerIds`,size:Tc*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),w=t.createBuffer({label:`GpuRendererAuxiliaryLayerPlaneParams`,size:8*Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),te=t.createBuffer({label:`GpuRendererPickParams`,size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),ne=t.createBuffer({label:`GpuRendererPickResultBuffer`,size:8*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),E=t.createBuffer({label:`GpuRendererPickReadbackBuffer`,size:8*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),D=null,O=0,k=null,re=0,ie=0,A=Ms({device:t,densityFormat:Jc,textureUsage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,defaultBoundsBufferUsage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,shadowBoundsQuantizationScale:Cc}),j=null,M=null,ae=null,oe=null,N=null,se=``,ce=null,le=null,ue=``,de=null,fe=null,pe=``,me=null,he=null,P=null,F=null,ge=``,I=null,_e=null,ve=null,L=``,ye=null,be=null,xe=null,Se=null,R=null,Ce=null,we=null,Te=null,z=null,Ee=null,De=null,Oe=null,ke=null,Ae=null,je=null,Me=null,Ne=null,Pe=null,Fe=null,Ie=null,Le=zs({device:t,pickPipeline:m,viewParamsBuffer:v,pickParamsBuffer:te,pickResultBuffer:ne,pickReadbackBuffer:E});function Re(e,n){let{canvasLike:r,width:i,height:a}=e;if(!r)return null;let o=t.createTexture({label:n,size:[i,a,1],format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return t.queue.copyExternalImageToTexture({source:r},{texture:o},[i,a]),o}function ze(e=null){let n=tc(e);if(ae&&se===n)return;let r=Re(ec(e),`GpuRendererScatter3dLegendTexture`);if(!r){se=n;return}ae=r,oe=r.createView(),N||=t.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),se=n,j=null}function Be(e=``){let t=nc(e);if(ce&&ue===t)return;let n=Re(rc(e),`GpuRendererDatasetLabelTexture`);if(!n){ue=t;return}V(ce),ce=n,le=n.createView(),ue=t,j=null}function Ve(e=``){let t=ic(e);if(de&&pe===t)return;let n=Re(ac(e),`GpuRendererAnalysisLabelTexture`);if(!n){pe=t;return}V(de),de=n,fe=n.createView(),pe=t,j=null}function He(e=[]){let n=oc(e,{minZ:fc,maxZ:_c,capacity:wc}),r=sc(n);if(I&&L===r)return n;let i=Re(cc(n,{minZ:fc,maxZ:_c,capacity:wc}),`GpuRendererSideLayerLabelTexture`);return i?(V(I),I=i,_e=i.createView(),ve||=t.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),L=r,ye=null,n):(L=r,n)}function Ue(e=``){let t=lc(e);if(P&&ge===t)return;let n=Re(uc(e),`GpuRendererMagnetDetailTexture`);if(!n){ge=t;return}V(P),P=n,F=n.createView(),ge=t,Se=null,R=null}function We(e,n,r){return Yc(n,r)?r:(t.queue.writeBuffer(e,0,n.buffer,n.byteOffset,n.byteLength),n)}function Ge(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,y,b,x=0,S=0){Me=We(v,Ss(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,y,b,x,S),Me)}function Ke(e){let t=new Map;for(let n of Array.isArray(e)?e:[]){let e=Number(n?.z);if(!Number.isFinite(e))continue;let r=Math.max(fc,Math.min(_c,e)).toFixed(6),i=Number.isFinite(Number(n?.strength))?Math.max(0,Math.min(1,Number(n.strength))):1;t.set(r,Math.max(t.get(r)||0,i))}return Array.from(t.entries()).map(([e,t])=>({z:Number(e),strength:t})).sort((e,t)=>e.z-t.z).slice(0,wc)}function qe(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h=null,g=``,_=``){let v=[e(t?.[0]),e(t?.[1]),e(t?.[2])],y=Array.isArray(n)?[e(n[0]),e(n[1]),e(n[2])]:T(v,.18),b=Array.isArray(r)?[e(r[0]),e(r[1]),e(r[2])]:T(v,.42),S=Array.isArray(i)?[e(i[0]),e(i[1]),e(i[2])]:T(v,.08),ee=Ke(a),C=oc(o),w=Math.max(0,Math.min(Wc-1,Number.isFinite(s?.[0])?Math.round(s[0]):0)),te=Math.max(0,Math.min(Wc-1,Number.isFinite(s?.[1])?Math.round(s[1]):2)),ne=Number.isFinite(d)?Math.min(8,Math.max(.25,d)):1.25,E=Math.max(.25,ne*.7),D=ne*1.45,O=f!==!1,k=O?(c.xMax-c.xMin)/Math.max(1,l)*D*.5:0,re=O?(c.yMax-c.yMin)/Math.max(1,u)*D*.5:0,ie=O?(c.xMax-c.xMin)/Math.max(1,l)*E*.5:0,A=O?(c.yMax-c.yMin)/Math.max(1,u)*E*.5:0,j=p?Math.min(.6,Math.max(.12,Math.log10(Math.max(0,Number.isFinite(m)?m:0)+1)/12)):0,M=+(h?.visible===!0),ae=+!!String(g||``).trim(),oe=+!!String(_||``).trim(),N=new Float32Array(296);N.set([v[0],v[1],v[2],1,y[0],y[1],y[2],1,b[0],b[1],b[2],1,k,re,ie,A,+!!p,.18,j,.14,S[0],S[1],S[2],1,ee.length,.055,w,te,M,-.94,-.94,.56,ae,-.92,-.93,.74,oe,0,0,1.24]),ee.forEach((e,t)=>{let n=(10+t)*4;N[n]=e.z,N[n+1]=e.strength,N[n+2]=0,N[n+3]=0}),C.forEach((e,t)=>{let n=(42+t)*4;N[n]=e.z,N[n+1]=e.row,N[n+2]=1,N[n+3]=0}),Ne=We(x,N,Ne)}function Je(e,n){let r=Math.max(1,Math.floor(e)),i=Math.max(1,Math.floor(n));return(!k||re!==r||ie!==i)&&(V(k),k=t.createTexture({label:`GpuRendererDepthTexture`,size:[r,i],format:qc,usage:GPUTextureUsage.RENDER_ATTACHMENT}),re=r,ie=i),k.createView()}function Ye(e,t){A.ensureDensityTexture(e,t)&&(Ae=null,j=null,Te=null,z=null)}function Xe(e,t){A.ensureShadowDensityTexture(e,t)&&(j=null,M=null,Ae=null,je=null)}function Ze(e){let n=Math.max(1,e)*12*Float32Array.BYTES_PER_ELEMENT;D&&O>=n||(V(D),D=t.createBuffer({label:`GpuRendererMagnetBuffer`,size:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),O=n,xe=null,Se=null,R=null,Ie=null)}function Qe(e,t,n=0){let r=Array.isArray(e)?e:[];Ze(r.length);let i=Number.parseInt(String(n??0),10),a=new Float32Array(Math.max(1,r.length)*12);for(let e=0;e<r.length;e+=1){let n=r[e],o=typeof t==`function`?t(n?.colorHex||`#ffffff`):[1,1,1],s=n?.active!==!1,c=Xc(n),l=e*12;a[l]=Number.isFinite(n?.x)?n.x:0,a[l+1]=Number.isFinite(n?.y)?n.y:0,a[l+4]=Number.isFinite(o?.[0])?o[0]:1,a[l+5]=Number.isFinite(o?.[1])?o[1]:1,a[l+6]=Number.isFinite(o?.[2])?o[2]:1,a[l+7]=1,a[l+8]=+!!s,a[l+9]=+(Number.parseInt(String(n?.id??0),10)===i),a[l+10]=Zc(c),a[l+11]=c<0?-1:1}return Ie=We(D,a,Ie),r.length}function $e(e,n=v){return Ye(A.densityTextureWidth||1,A.densityTextureHeight||1),Te&&z?.positionsBuffer===e.positionsBuffer&&z?.sizesBuffer===e.sizesBuffer&&z?.colorsBuffer===e.colorsBuffer&&z?.activeMaskBuffer===e.activeMaskBuffer&&z?.densityTextureView===A.densityTextureView&&z?.viewParamsBuffer===n?Te:(Te=t.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.positionsBuffer}},{binding:1,resource:{buffer:e.sizesBuffer}},{binding:2,resource:{buffer:e.colorsBuffer}},{binding:3,resource:{buffer:e.activeMaskBuffer}},{binding:4,resource:{buffer:n}},{binding:5,resource:A.densityTextureView}]}),z={positionsBuffer:e.positionsBuffer,sizesBuffer:e.sizesBuffer,colorsBuffer:e.colorsBuffer,activeMaskBuffer:e.activeMaskBuffer,densityTextureView:A.densityTextureView,viewParamsBuffer:n},Te)}function et(e){let n=new Uint32Array(Tc),r=Array.isArray(e)?e:[],i=0;for(let e of r){if(i>=Tc)break;let t=Number.parseInt(String(e?.gpuParticleId??e?.id??e),10);!Number.isInteger(t)||t<=0||(n[i]=t,i+=1)}return t.queue.writeBuffer(C,0,n),t.queue.writeBuffer(ee,0,new Float32Array([Ec,.004,Dc,i,1,.92,.18,.96])),i}function tt(e,n){let r=new Uint32Array(Tc),i=Array.isArray(e)?e:[],a=Math.max(0,Math.trunc(Number(n?.globalIdOffset||0))),o=Math.max(0,Math.trunc(Number(n?.particleCount||0))),s=0;for(let e of i){if(s>=Tc)break;let t=Number.parseInt(String(e?.gpuParticleId??e?.id??e),10)-a;!Number.isInteger(t)||t<=0||t>o||(r[s]=t,s+=1)}return t.queue.writeBuffer(C,0,r),t.queue.writeBuffer(ee,0,new Float32Array([Ec,.004,Dc,s,1,.92,.18,.96])),s}function nt(e){let n=rt();return Ce&&we?.positionsBuffer===e.positionsBuffer&&we?.activeMaskBuffer===e.activeMaskBuffer?Ce:(Ce=t.createBindGroup({layout:n.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.positionsBuffer}},{binding:1,resource:{buffer:e.activeMaskBuffer}},{binding:2,resource:{buffer:C}},{binding:3,resource:{buffer:v}},{binding:4,resource:{buffer:ee}}]}),we={positionsBuffer:e.positionsBuffer,activeMaskBuffer:e.activeMaskBuffer},Ce)}function rt(){return he||=Qc(t,a,Bc,Bc,!0,!1,`none`,`less-equal`),he}function it(e){return Ee&&De?.positionsBuffer===e.positionsBuffer&&De?.sizesBuffer===e.sizesBuffer&&De?.activeMaskBuffer===e.activeMaskBuffer?Ee:(Ee=t.createBindGroup({layout:h().getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.positionsBuffer}},{binding:1,resource:{buffer:e.sizesBuffer}},{binding:3,resource:{buffer:e.activeMaskBuffer}},{binding:4,resource:{buffer:v}}]}),De={positionsBuffer:e.positionsBuffer,sizesBuffer:e.sizesBuffer,activeMaskBuffer:e.activeMaskBuffer},Ee)}function at(e){let n=e.boundsBuffer||A.defaultShadowBoundsBuffer;return Oe&&ke?.positionsBuffer===e.positionsBuffer&&ke?.sizesBuffer===e.sizesBuffer&&ke?.activeMaskBuffer===e.activeMaskBuffer&&ke?.boundsBuffer===n?Oe:(Oe=t.createBindGroup({layout:g().getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.positionsBuffer}},{binding:1,resource:{buffer:e.sizesBuffer}},{binding:3,resource:{buffer:e.activeMaskBuffer}},{binding:4,resource:{buffer:v}},{binding:5,resource:{buffer:n}}]}),ke={positionsBuffer:e.positionsBuffer,sizesBuffer:e.sizesBuffer,activeMaskBuffer:e.activeMaskBuffer,boundsBuffer:n},Oe)}function ot(e,t,n){return A.shadowDensityInputsChanged(e,t,n)}function st(){return Ae&&je===A.currentShadowBoundsBuffer?Ae:(Ae=t.createBindGroup({layout:_().getBindGroupLayout(0),entries:[{binding:0,resource:A.shadowDensityTextureView},{binding:1,resource:{buffer:v}},{binding:2,resource:{buffer:A.currentShadowBoundsBuffer}}]}),je=A.currentShadowBoundsBuffer,Ae)}function ct(){return Xe(A.shadowDensityTextureWidth||1,A.shadowDensityTextureHeight||1),ae||ze(null),ce||Be(``),de||Ve(``),j&&M===A.currentShadowBoundsBuffer?j:(j=t.createBindGroup({layout:c.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:{buffer:x}},{binding:2,resource:A.shadowDensityTextureView},{binding:3,resource:{buffer:A.currentShadowBoundsBuffer}},{binding:4,resource:N},{binding:5,resource:oe},{binding:6,resource:le},{binding:7,resource:fe}]}),M=A.currentShadowBoundsBuffer,j)}function lt(){return I||He([]),ye||(ye=t.createBindGroup({layout:l().getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:{buffer:x}},{binding:2,resource:ve},{binding:3,resource:_e}]}),ye)}function ut(t,n){let r=Number(t?.z),i=t?.visible===!0&&Number.isFinite(r),a=Number.isFinite(Number(t?.alpha))?e(Number(t.alpha)):.2,o=Array.isArray(t?.color)?t.color:n,s=[e(o?.[0]),e(o?.[1]),e(o?.[2])];return Fe=We(w,new Float32Array([i?r:0,a,+!!i,0,s[0],s[1],s[2],1]),Fe),i}function dt(){return be||(be=t.createBindGroup({layout:u().getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:v}},{binding:1,resource:{buffer:w}}]}),be)}function ft(){return P||Ue(``),Se||(Se=t.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:D}},{binding:1,resource:{buffer:v}},{binding:2,resource:{buffer:S}}]}),Se)}function pt(){return xe||(xe=t.createBindGroup({layout:f().getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:D}},{binding:1,resource:{buffer:v}},{binding:2,resource:{buffer:S}}]}),xe)}function mt(){return me||=Qc(t,a,Vc,Vc,!0,!1,`none`,`always`),me}function ht(){if(P||Ue(``),R)return R;let e=mt();return R=t.createBindGroup({layout:e.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:D}},{binding:1,resource:{buffer:v}},{binding:2,resource:{buffer:S}},{binding:3,resource:N},{binding:4,resource:F}]}),R}return{getResourceInfo(){return{optionalPipelines:Array.from(o.keys())}},clear({width:e=n.width||1,height:r=n.height||1,backgroundColor:a=[0,0,0]}={}){if(e<=0||r<=0)return!1;let o=i.getCurrentTexture().createView(),s=t.createCommandEncoder();return s.beginRenderPass({colorAttachments:[{view:o,clearValue:{r:a[0]??0,g:a[1]??0,b:a[2]??0,a:1},loadOp:`clear`,storeOp:`store`}]}).end(),t.queue.submit([s.finish()]),!0},async pick({width:e,height:t,viewRange:n,camera:r=null,particleSizeScale:i=1,particleRenderShape:a=`disc`,particleOrientationMode:o=`billboard`,particleCount:s=0,particleBuffers:c=null,x:l,y:u,radiusPx:d=2.5}){let f=Hs({particleCount:s,particleBuffers:c}),p=Us({particleCount:s,particleBuffers:c});return e<=0||t<=0||p<=0||f.length<=0||!Number.isFinite(l)||!Number.isFinite(u)?{ok:!0,hitCount:0,ids:[],classification:`none`}:(Ge(n,e,t,r,i,a,.12,.7,.5,!1,.35,.22,.85,1,!1,.2,1,1,o,!1),Le.run({particleBuffers:Array.isArray(c?.particleBatches)?{...c,particleBatches:f}:c,particleCount:p,x:l,y:u,radiusPx:d}))},render({width:e,height:n,viewRange:r,camera:a=null,backgroundColor:o=[0,0,0],referenceColor:s=[32/255,32/255,32/255],referenceAxisColor:m=null,referenceGridColor:x=null,sidePlaneColor:ee=null,sidePlaneLayerMarkers:C=[],sidePlaneLayerLabels:w=[],sidePlaneVisible:te=!0,auxiliaryLayerPlane:T=null,scatter3dLegend:ne=null,datasetFileName:E=``,analysisName:D=``,referenceGridVisible:O=!0,referencePlaneVisible:k=!0,referenceLineWidthPx:re=1.25,referenceDensityShadowEnabled:ie=!0,particleSizeScale:ae=1,particleDensityRenderingEnabled:oe=!1,particleDensityRenderingSensitivity:N=.35,particleDensityRenderingMinAlpha:se=.22,particleDensityRenderingSoftness:ce=.85,particleDensityAlphaSourceEnabled:le=!1,particleDensityAlphaMin:ue=.2,particleDensityAlphaMax:de=1,particleDensityPreviewEnabled:fe=!1,particleBaseAlpha:pe=1,particleOrientationMode:me=`billboard`,particleRenderShape:he=`disc`,particleSplatEdgeWidth:P=.12,particleSplatEdgeStrength:F=.7,particleSplatSharpness:ge=.5,particleHeightFogEnabled:I=!1,referenceBaseVisible:_e=!1,particleCount:ve=0,particleBuffers:L=null,particleMarkers:ye=[],magnets:be=[],hoveredMagnetId:xe=0,hoveredMagnetDetail:Se=``,magnetSizePx:R=10,magnetShadowsEnabled:Ce=!0,parseColor:we}){if(e<=0||n<=0)return!1;let Te=Array.isArray(L?.particleBatches),z=Hs({particleCount:ve,particleBuffers:L}),Ee=Us({particleCount:ve,particleBuffers:L}),{hasParticleBuffers:De,densityMapPlaneRequested:Oe,densityShapeEnabled:ke,referencePlaneDrawn:Me,densityShadowTextureNeeded:Ne,densityShadowEnabled:Fe,needsDensityTexture:Ie}=Gs({particleCount:Ee,particleBuffers:L,referencePlaneVisible:k,referenceDensityShadowEnabled:ie,particleDensityPreviewEnabled:fe,particleDensityRenderingEnabled:oe,particleDensityAlphaSourceEnabled:le,particleRenderShape:he}),Le=Ie?Sc:1,Re=ut(T,s);He(w),Ge(r,e,n,a,ae,he,P,F,ge,ke,N,se,ce,pe,le,ue,de,Le,me,I),qe(s,m,x,ee,C,w,Cs(a),r,e,n,re,O,Fe,Ee,ne,E,D),Me&&(ze(ne),Be(E),Ve(D)),Ue(Se),Pe=We(S,new Float32Array([Number.isFinite(R)?R:10,1,Math.max(1.5,(Number.isFinite(R)?R:10)*.14),Math.max(2,(Number.isFinite(R)?R:10)*.18),o[0]??0,o[1]??0,o[2]??0,1]),Pe);let Ke=Qe(be,we,xe),Ze=De&&z.length===1?Te?tt(ye,z[0]):et(ye):0,gt=(i=0,o=0)=>{if(i===0)return v;let s=i===1?y:b,c=Ss(r,e,n,a,ae,he,P,F,ge,ke,N,se,ce,pe,le,ue,de,Le,me,I,i,o);return t.queue.writeBuffer(s,0,c.buffer,c.byteOffset,c.byteLength),s},_t=(e,t=0,n=0)=>{let r=gt(t,n);e.setPipeline(d);for(let t of z)e.setBindGroup(0,$e(t,r)),e.draw(6,t.particleCount)};Ye(Ie?Math.ceil(e*Le):1,Ie?Math.ceil(n*Le):1);let vt=Ne?Ds(e,n):1;Xe(vt,vt);let yt=Ne&&L?.boundsBuffer||A.defaultShadowBoundsBuffer;A.setCurrentShadowBoundsBuffer(yt)&&(j=null,M=null,Ae=null,je=null);let bt=i.getCurrentTexture().createView(),xt=t.createCommandEncoder();if(Ie){let e=xt.beginRenderPass({colorAttachments:[{view:A.densityTextureView,clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});e.setPipeline(h());for(let t of z)e.setBindGroup(0,it(t)),e.draw(6,t.particleCount);e.end()}let St=z.length>1?{particleBatches:z,version:Ws({particleCount:Ee,particleBuffers:L})}:L;if(Ne&&ot(St,Ee,ae)){let e=xt.beginRenderPass({colorAttachments:[{view:A.shadowDensityTextureView,clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});e.setPipeline(g());for(let t of z)e.setBindGroup(0,at(t)),e.draw(6,t.particleCount);e.end()}let Ct=!!(Oe&&Ne),B=xt.beginRenderPass({colorAttachments:[{view:bt,clearValue:{r:o[0]??0,g:o[1]??0,b:o[2]??0,a:1},loadOp:`clear`,storeOp:`store`}],depthStencilAttachment:{view:Je(e,n),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`store`}});if(Me&&(B.setPipeline(c),B.setBindGroup(0,ct()),B.draw(Hc,_e?2:1)),a?.mode===`3d`&&te!==!1&&(B.setPipeline(l()),B.setBindGroup(0,lt()),B.draw(Uc,Gc)),Ke>0&&(Ce&&(B.setPipeline(f()),B.setBindGroup(0,pt()),B.draw(6,Ke)),B.setPipeline(p),B.setBindGroup(0,ft()),B.draw(Kc,Ke)),Ct&&(B.setPipeline(_()),B.setBindGroup(0,st()),B.draw(6,1)),!Ct&&De&&Re&&Number.isFinite(Number(T?.z))){let e=Number.isFinite(Number(T?.particleCutZ))?Number(T.particleCutZ):Number(T.z);_t(B,1,e),B.setPipeline(u()),B.setBindGroup(0,dt()),B.draw(6,1),_t(B,2,e)}else Re&&(B.setPipeline(u()),B.setBindGroup(0,dt()),B.draw(6,1)),!Ct&&De&&_t(B,0,0);if(!Ct&&De&&Ze>0&&(B.setPipeline(rt()),B.setBindGroup(0,nt(Te?z[0]:L)),B.draw(6,Ze)),!Ct&&De&&z.length>1){B.setPipeline(rt());for(let e of z){let t=tt(ye,e);t<=0||(B.setBindGroup(0,nt(e)),B.draw(6,t))}}return Ke>0&&xe&&String(Se||``).trim()&&(B.setPipeline(mt()),B.setBindGroup(0,ht()),B.draw(6,Ke)),B.end(),t.queue.submit([xt.finish()]),!0},destroy(){V(v),V(y),V(b),V(x),V(w),V(S),V(ee),V(C),V(te),V(ne),V(E),V(D),V(ce),V(de),V(P),V(k),A.release(),V(I),k=null,I=null,_e=null,L=``,ce=null,le=null,ue=``,de=null,fe=null,pe=``,P=null,F=null,ge=``,re=0,ie=0,j=null,ye=null,be=null,xe=null,Se=null,R=null,Ce=null,we=null,Le.resetBindGroup(),Ee=null,Oe=null,Ae=null}}}function al({particleCount:e=0,passResult:t=null,placementResources:n=null,featureResources:r=null,version:i=0}={}){let a=t?.buffers||{};return Array.isArray(a.particleBatches)?{particleCount:e,version:i,particleBatches:a.particleBatches.map(e=>({...e,version:i}))}:{particleCount:e,version:i,positionsBuffer:a.positionsBuffer||n?.positionsBuffer||null,sizesBuffer:a.sizesBuffer||n?.sizesBuffer||null,colorsBuffer:a.colorsBuffer||n?.colorsBuffer||null,activeMaskBuffer:a.activeMaskBuffer||r?.activeMaskBuffer||null,boundsBuffer:a.boundsBuffer||n?.boundsBuffer||null}}function ol(){let e=Promise.resolve();function t(t){if(typeof t!=`function`)throw Error(`Serialized async queue requires an operation function.`);let n=e.catch(()=>{}).then(t);return e=n.catch(()=>{}),n}return{enqueue:t,waitForIdle(){return e.catch(()=>{})}}}var sl=Object.freeze({xMin:-1,xMax:1,yMin:-1,yMax:1});export{lt as $,w as $t,mn as A,ze as At,Nt as B,P as Bt,Cn as C,be as Ct,kn as D,Re as Dt,En as E,Pe as Et,Qt as F,R as Ft,jt as G,ue as Gt,It as H,pe as Ht,Gt as I,je as It,dt as J,se as Jt,Mt as K,N as Kt,Bt as L,Ze as Lt,vn as M,ye as Mt,tn as N,Te as Nt,Mn as O,Be as Ot,$t as P,De as Pt,ct as Q,te as Qt,Ht as R,He as Rt,Tn as S,Ue as St,Dn as T,Le as Tt,Pt as U,fe as Ut,Ft as V,F as Vt,At as W,de as Wt,mt as X,A as Xt,ut as Y,j as Yt,pt as Z,ie as Zt,Ln as _,Ye as _t,Yo as a,c as an,z as at,wn as b,qe as bt,no as c,s as cn,Ae as ct,or as d,ve as dt,b as en,ot as et,lr as f,we as ft,Bn as g,Xe as gt,Vn as h,ke as ht,rl as i,v as in,Ce as it,yn as j,Ne as jt,hn as k,Ie as kt,Xa as l,Je as lt,Hn as m,Se as mt,ol as n,S as nn,at as nt,us as o,l as on,xe as ot,zn as p,Ee as pt,ft as q,oe as qt,al as r,g as rn,gt as rt,ls as s,d as sn,Oe as st,sl as t,x as tn,xt as tt,Z as u,We as ut,Rn as v,L as vt,On as w,Fe as wt,jn as x,Ge as xt,In as y,Ke as yt,Lt as z,Ve as zt};