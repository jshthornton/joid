!function(win, doc, undefined) {
	if ( typeof define === 'function' && define.amd ) {
		define(['../lid'], _do);
	} else {
		_do(win.lid);
	}


	function _do(lid) {
		var parse = lid.parse = function(tmpl, opts) {
			if(typeof tmpl !== 'string') throw new Error('lid parsing only operates on strings');
			opts = opts || {};

			var _opts = {},
				_settings = parse.settings;

			for (var prop in _settings) { 
				_opts[prop] = (opts[prop] !== undefined) ? opts[prop] : _settings[prop]; 
			}

			if(_opts.preFlush === true) lid.flush();

			var out = tmpl
				.replace(_opts.genReg, function(m, code) {
					return lid.gen.apply(lid, parse._getParams(code));
				})
				.replace(_opts.linkReg, function(m, code) {
					return lid.link.apply(lid, parse._getParams(code));
				});

			if(_opts.postFlush === true) lid.flush();

			return out;
		};

		parse._getParams = function(str) {
			var body = 'return [' + str + ']';
			return new Function(body)();
		};

		parse.settings = {
			preFlush: true,
			postFlush: true,
			linkReg: /lid\(([\s\S]+?)\)/gi,
			genReg: /gid\(([\s\S]*?)\)/gi
		};
	}
	
}(window, document, void 0);