H.NumberReference = function (n) {

    var number = n;

    Object.defineProperties( this, {
        number: { enumerable: true, value: number, writable: true }
    });
}

H.NumberReference.prototype = {
    construtor: H.Contact
}
