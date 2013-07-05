!function(win, doc, undefined) {
	if ( typeof define === 'function' && define.amd ) {
		define([], _do);
	} else {
		win.lid = _do();
	}


	function _do() {
		var lid = {
			_count: 0,
			_hash: {},
			_lastKey: null,

			gen: function(seed) {
				if(typeof seed !== 'string') seed = '';
				return seed + '' + lid._count++;
			},

			_genKey: function() {
				return '_lidk' + lid._count++;
			},

			_register: function(key, value) {
				lid._hash[key] = value;
			},

			link: function(key, seed) {
				var id,
					_key = key;

				if(typeof key === 'boolean') {
					if(key === true) {
						id = lid.gen(seed);
						_key = lid._genKey();
						
						lid._register(_key, id);

					} else {
						_key = lid._lastKey;
						id = lid._hash[_key];

					}
				} else if(typeof key === 'string') {
					_key = key;

					if(key in lid._hash) {
						id = lid._hash[key];
					} else {
						id = lid.gen(seed);
						lid._register(key, id);
					}

				} else {
					throw new Error('Boolean or String expected as link key');
				}

				lid._lastKey = _key;

				return id;
			},

			flush: function() {
				//Create a new object, does not empty the old one.
				lid._hash = {};
				lid._lastKey = null;
			}
		};

		return lid;
	}
	
}(window, document, void 0);