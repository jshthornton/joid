!function() {
	var win = window,
		doc = document;

	/**
	Provides the lid instance via amd or a global

	@module lid
	*/
	if ( typeof define === 'function' && define.amd ) {
		define([], _do);
	} else {
		win.lid = _do();
	}

	function _do() {
		/**
		The lid object. 
		Holds all of the functions and extensions to provide unique and linking ids in templates.

		@class lid
		@static
		**/
		var lid = {
			/**
			The internal count to provide a unique number for the ids.

			@property _count
			@private
			*/
			_count: 0,

			/**
			The registry of key value pairs to allow for generated ids to be retrieved again.

			@property _hash
			@private
			*/
			_hash: {},

			/**
			The last key which was used in `link`. If this key is anonymous then this will hold the generated key see `_genKey`.

			@property _lastKey
			@private
			*/
			_lastKey: null,

			/**
			Returns a unique number which can be prefixed with a seed.

			@method gen
			@param {String} [seed] What to prefix the unique number with.
			@return {String} Unique number prefixed with a seed.
			**/
			gen: function(seed) {
				if(typeof seed !== 'string') seed = '';
				return seed + '' + lid._count++;
			},

			/**
			Returns a unique string to use as a key.
			This unique key is used to register an anonymous link.

			All unique keys are prefixed with `_lidk` and it will increment the internal count.
			This will affect alter the linear results of `gen` or `link`.
			
			@private
			@method _genKey
			@return {String} Unique string to use as a key.
			**/
			_genKey: function() {
				return '_lidk' + lid._count++;
			},

			/**
			Registers a link key with a value so that the value can be retrieved.
			
			@private
			@method _register
			@param {String} key The key to register the value / id under.
			@param {String} value The value to register.
			**/
			_register: function(key, value) {
				lid._hash[key] = value;
			},

			/**
			If the key supplied is a string: get a unique id assigned to a key, if the key is not recognised then create a new unique id and assign it to the key.
			This will result in subsequent calls with this key returning that new id.

			If the key supplied is a boolean: (true) create a new unique id, assign it anonymously. (false) retrieve the last id created / returned, regardless to it being an anonymous key.

			@method link
			@param {String|Boolean} key See method description.
			@param {String} [seed] If this link call creates a new unique id, then use the seed as a prefix.
			@return {String} New unique id or an existing id.
			*/
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

			/**
			Flushes the registry so that calls to previous keys will now generate fresh ids rather than retrieve previous ones.

			@method flush
			*/
			flush: function() {
				//Create a new object, does not empty the old one.
				lid._hash = {};
				lid._lastKey = null;
			}
		};

		return lid;
	}
	
}();