!function(win, doc, undefined) {
	if ( typeof define === 'function' && define.amd ) {
		define(['../lid'], _do);
	} else {
		_do(win.lid);
	}


	function _do(lid) {
		var parse = lid.parse = function(tmpl, opts) {


			if(typeof tmpl !== 'string') throw new Error('lid parsing only operates on strings');
			lid.flush();

			var linkReg = /lid\(([\s\S]+?)\)/gi,
				genReg = /gid\(([\s\S]*?)\)/gi;

			var out = tmpl
				.replace(genReg, function(m, code) {
					return lid.gen.apply(lid, parse._getParams(code));
				})
				.replace(linkReg, function(m, code) {
					return lid.link.apply(lid, parse._getParams(code));
				});


			console.log(out);

			lid.flush();

			return out;
		};

		parse._getParams = function(str) {
			var body = 'return [' + str + ']';
			return new Function(body)();
		};
	}
	
}(window, document, void 0);