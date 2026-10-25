/* Locale-tolerant numeric entry; never silently convert invalid text to zero. */
(function(root){
  'use strict';
  function parseDecimal(text){
    if(typeof text!=='string')return null;
    const trimmed=text.trim().replace(/\u2212/g,'-');
    if(!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(trimmed))return null;
    const n=Number(trimmed.replace(',','.'));
    return Number.isFinite(n)?n:null;
  }
  function closeTo(actual,expected,absoluteTolerance,relativeTolerance=0){
    if(![actual,expected,absoluteTolerance,relativeTolerance].every(Number.isFinite)||
      absoluteTolerance<0||relativeTolerance<0)return false;
    return Math.abs(actual-expected)<=Math.max(absoluteTolerance,relativeTolerance*Math.abs(expected))+1e-12;
  }
  const api=Object.freeze({parseDecimal,closeTo});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.SINumeric=api;
})(typeof window==='undefined'?globalThis:window);
