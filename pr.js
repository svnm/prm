// License MIT
// Example based on lightweight Promise and when() implementation
// https://github.com/briancavalier/when.js.

function Pr () {
	this._thens = [];
}
 
Pr.prototype = {
 
	// Code waiting for this promise uses the then() method to be notified when the promise is complete. 
	then: function (onResolve, onReject) {
		this._thens.push({ resolve: onResolve, reject: onReject });
	},

	// The resolve() method is called when a promise is resolved. 
	resolve: function (val) { 
	  this._complete('resolve', val); 
	},
 
	// The reject() method is called when a promise cannot be resolved. 
	reject: function (ex) { 
	  this._complete('reject', ex); 
	},

	_complete: function (which, arg) {
		this.then = which === 'resolve' ?
			function (resolve, reject) { resolve && resolve(arg); } :
			function (resolve, reject) { reject && reject(arg); };
		this.resolve = this.reject = 
			function () { throw new Error('Promise already completed.'); };
		var aThen, i = 0;
		while (aThen = this._thens[i++]) { aThen[which] && aThen[which](arg); }
		delete this._thens;
	}
};
