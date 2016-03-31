'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
The lid object.
Holds all of the functions to provide unique and linking ids in templates.

@class lid
**/

var Lid = function () {
  function Lid() {
    _classCallCheck(this, Lid);

    /**
    The internal count to provide a unique number for the ids.
     @property _count
    @private
    */
    this._count = 0;

    /**
    The registry of key value pairs to allow for generated ids to be retrieved again.
     @property _hash
    @private
    */
    this._hash = {};

    /**
    The last key which was used in `link`. If this key is anonymous then this will hold the generated key see `_genKey`.
     @property _lastKey
    @private
    */
    this._lastKey = null;
  }

  _createClass(Lid, [{
    key: '_next',
    value: function _next() {
      var next = this._count;
      this._count += 1;

      return next;
    }
  }, {
    key: '_mountPrefix',
    value: function _mountPrefix(prefix, id) {
      return prefix + id;
    }

    /**
    Returns a unique number which can be prefixed with a prefix.
     @method gen
    @param {String} [prefix] What to prefix the unique number with.
    @return {String} Unique number prefixed with a prefix.
    **/

  }, {
    key: 'generate',
    value: function generate() {
      var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      return this._mountPrefix(prefix, this._next());
    }
  }, {
    key: 'gen',
    value: function gen() {
      return this.generate(this, arguments);
    }

    /**
    Returns a unique string to use as a key.
    This unique key is used to register an anonymous link.
     All unique keys are prefixed with `_lidk` and it will increment the internal count.
    This will affect alter the linear results of `gen` or `link`.
     @private
    @method _genKey
    @return {String} Unique string to use as a key.
    **/

  }, {
    key: '_generateInternalKey',
    value: function _generateInternalKey() {
      return '@lid/' + this._next();
    }

    /**
    Registers a link key with a value so that the value can be retrieved.
     @private
    @method _register
    @param {String} key The key to register the value / id under.
    @param {String} value The value to register.
    **/

  }, {
    key: '_register',
    value: function _register(key, value) {
      this._hash[key] = value;
    }

    /**
    If the key supplied is a string: get a unique id assigned to a key, if the key is not recognised then create a new unique id and assign it to the key.
    This will result in subsequent calls with this key returning that new id.
     If the key supplied is a boolean: (true) create a new unique id, assign it anonymously. (false) retrieve the last id created / returned, regardless to it being an anonymous key.
     @method link
    @param {String|Boolean} key See method description.
    @param {String} [prefix] If this link call creates a new unique id, then use the prefix as a prefix.
    @return {String} New unique id or an existing id.
    */

  }, {
    key: 'link',
    value: function link(key, prefix) {
      if (typeof key === 'boolean') {
        return this._linkBoolean(key, prefix);
      } else if (typeof key === 'string') {
        return this._linkString(key, prefix);
      }

      throw new Error('Boolean or String expected as link key');
    }
  }, {
    key: '_linkBoolean',
    value: function _linkBoolean(flop, prefix) {
      if (flop === true) {
        var id = this.generate(prefix);
        var key = this._generateInternalKey();

        this._register(key, id);
        this._lastKey = key;

        return id;
      } else {
        var _key = this._lastKey;
        return this._hash[_key];
      }
    }
  }, {
    key: '_linkString',
    value: function _linkString(key, prefix) {
      if (key in this._hash) {
        return this._hash[key];
      } else {
        var id = this.generate(prefix);
        this._register(key, id);
        this._lastKey = key;
        return id;
      }
    }

    /**
    Flushes the registry so that calls to previous keys will now generate fresh ids rather than retrieve previous ones.
     @method flush
    */

  }, {
    key: 'flush',
    value: function flush() {
      //Create a new object, does not empty the old one.
      this._hash = {};
      this._lastKey = null;
    }
  }]);

  return Lid;
}();

;

exports.default = Lid;
