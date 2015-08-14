H.ContactLinker = function(_type, _data, _body1, _body2) {
	var id = H.guid();
	var type = _type;
	var data = _data;
	var body1 = _body1;
	var body2 = _body2 ? _body2 : null;
	var enable = true;


	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: id,
			writable: true
		},
		type: {
			enumerable: true,
			value: type
		},
		data: {
			enumerable: true,
			value: data
		},
		body1: {
			enumerable: true,
			value: body1
		},
		body2: {
			enumerable: true,
			value: body2
		},
		enable: {
			enumerable: true,
			value: enable,
			writable: true
		}
	});
};

H.ContactLinker.prototype = {
	construtor: H.ContactLinker,
};