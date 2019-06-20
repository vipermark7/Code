'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
	function Token(type, match, groups, start, end, lexer, extra) {
		_classCallCheck(this, Token);

		this.type = type;
		this.match = match;
		this.groups = groups;
		this.start = start;
		this.end = end;
		this.lexer = lexer;

		for (var key in extra) {
			if (typeof extra[key] == 'function') this[key] = extra[key].bind(this);else this[key] = extra[key];
		}
	}

	_createClass(Token, [{
		key: 'strpos',
		value: function strpos() {
			var start = this.lexer.strpos(this.start);
			var end = this.lexer.strpos(this.end);
			return { start: start, end: end };
		}
	}]);

	return Token;
}();

function normalize(regex) {
	if (!regex.source.startsWith('^')) return new RegExp('^' + regex.source, regex.flags);else return regex;
}

function lexer(s) {
	var tokenTypes = [];
	var inserted = [];
	var pos = 0;
	var defaultExtra = void 0;

	function peekRegex(r, position) {
		position = position || pos;
		r.lastMatch = 0;

		var groups = r.exec(s.substring(position));
		if (groups) groups = groups.map(function (x) {
			return x;
		}); // only keep array elements (remove "index" and "input")

		var match = groups ? groups[0] : null;
		return { match: match, groups: groups };
	}

	var lex = {};

	//
	// next
	//
	lex.next = function lexerNext() {
		try {
			var t = lex.peek();
			if (t && !t.transient) pos = t.end;
			lex.current = t;
			return t;
		} catch (e) {
			pos = e.end;
			throw e;
		}
	};

	//
	// expect
	//
	lex.expect = function lexerExpect(type) {
		var t = lex.next();
		if (t.type != type) {
			var _pos = t.strpos();
			throw new Error('Expected ' + type + (t ? ', got ' + t.type : '') + ' at ' + _pos.start.line + ':' + _pos.start.column);
		}
		return t;
	};

	//
	// peek
	//
	lex.peek = function lexerPeek(position) {
		position = position || pos;

		// first check if we have any feaux tokens to deliver:
		if (inserted.length > 0) return Object.assign(inserted.pop());

		if (position >= s.length) return new Token('$EOF', '', position, position, lex, defaultExtra);

		var t = void 0;
		do {
			t = null;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = tokenTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var tokenType = _step.value;

					var _peekRegex = peekRegex(tokenType.regex, position);

					var match = _peekRegex.match;
					var groups = _peekRegex.groups;

					if (match) {
						var start = position;
						var end = position + match.length;
						t = new Token(tokenType.type, match, groups, start, end, lex, Object.assign({}, defaultExtra, tokenType.extra));
						position = end;
						break; // break out of for
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		} while (t && t.type.startsWith('$SKIP'));

		if (!t && position >= s.length) return new Token('$EOF', '(eof)', [], position, position, lex, defaultExtra);

		// did we find a match?
		if (!t) {
			var unexpected = s.substring(position, position + 1);
			try {
				lex.peek(position + 1);
			} catch (e) {
				unexpected += e.unexpected;
			}

			var _lex$strpos = lex.strpos(position);

			var line = _lex$strpos.line;
			var column = _lex$strpos.column;

			var e = new Error('Unexpected token: ' + unexpected + ' at (' + line + ':' + column + ')');
			e.unexpected = unexpected;
			e.end = position + unexpected.length;
			throw e;
		}

		return t;
	};

	//
	// strpos
	//
	lex.strpos = function lexStrpos(i) {
		var lines = s.substring(0, i).split(/\r\n|\r|\n/);
		if (!Array.isArray(lines)) lines = [lines];

		var line = lines.length;
		var column = lines[lines.length - 1].length + 1;
		return { line: line, column: column };
	};

	//
	// insert
	//
	lex.insert = function lexerInsert(token) {
		if (!(token instanceof Token)) {
			var extra = Object.assign({}, defaultExtra, token);
			token = new Token('$TRANSIENT', '', [], -1, -1, lex, extra);
		}
		token.transient = true;
		inserted.push(token);
	};

	//
	// source
	//
	Object.defineProperty(lex, 'source', {
		get: function get() {
			return s;
		},
		set: function set(str) {
			s = str;
			pos = 0;
			inserted.splice(0, inserted.length);
		}
	});

	//
	// remaining
	//
	lex.remaining = function lexerRemaining() {
		return s.substring(pos);
	};

	//
	// pos property
	//
	Object.defineProperty(lex, 'position', {
		get: function get() {
			return pos;
		},
		set: function set(p) {
			return pos = p;
		}
	});

	//
	// attach chaining functions to `lex`
	//
	lex.extra = function lexerExtra(extra) {
		defaultExtra = extra;
		return lex;
	};
	lex.token = function lexerToken(type, regex, extra) {
		regex = normalize(regex);
		tokenTypes.push({ type: type, regex: regex, extra: extra });
		return lex;
	};
	return lex;
}

module.exports = lexer;
module.exports.Token = Token;

