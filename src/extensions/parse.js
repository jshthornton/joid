!function() {
	'use strict';

	var win = window;

	function _do(lid) {
		/**
		Extends the lid object to provide extra string manipulation functions.

		@class parse
		@static
		@extensionfor lid
		**/


		/**
		Parses a string and inserts unique and linking ids into placeholders.

		@method parse
		@param {String} tmpl The string to parse.
		@param {Object} [opts] Options to override the default workings of parse. See `settings`.
		@return {String} The `tmpl` string but with the placeholders replaced with corresponding ids.
		*/
		var parse = lid.parse = function(tmpl, opts) {
			if(typeof tmpl !== 'string') throw new Error('lid parsing only operates on strings');
			opts = opts || {};

			var _opts = {},
				_settings = parse.settings;

			for (var prop in _settings) {
				if (_settings.hasOwnProperty(prop)) {
					_opts[prop] = (opts[prop] !== undefined) ? opts[prop] : _settings[prop];
				}
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

		/**
		Gets the parameters from the string placeholders and returns them as an array to be used as as a method's arguments.

		@method _getParams
		@private
		@param {String} str The comma separated parameters.
		@return {Array} The parameters as an array.
		*/
		parse._getParams = function(str) {
			var body = 'return [' + str + ']';
			return new Function(body)();
		};

		/**
		The settings the parse function uses. If any of these are changed then that setting will be used from then on.
		If the `opts` param is passed into `parse` then it will merge the settings, with the passed opts taking priority.

		- **preFlush** - automatically flush lid before parsing
		- **postFlush** - automatically flush lid after parsing
		- **linkReg** - The regex to use to detect lid.link usage
		- **genReg** - The regex to use to detect lid.gen usage

		@property settings
		*/
		parse.settings = {
			preFlush: true,
			postFlush: true,
			linkReg: /lid\(([\s\S]+?)\)/gi,
			genReg: /gid\(([\s\S]*?)\)/gi
		};
	}

	/**
	Provides string parsing functionality to lid.

	@module lid
	@submodule parse
	*/
	if ( typeof define === 'function' && define.amd ) {
		define(['../lid'], _do);
	} else {
		_do(win.lid);
	}
}();