'use strict';
const crypto = require('crypto');
const qr = require('qr-image');
const fs = require('fs');

//module exports--> it means this module can be exported into outside world
module.exports = function(key) {
	this.key = key;
	return {
		encode: (str) => {       //method name called by encode(some param)
			let encoder = crypto.createCipher('aes-256-ctr', this.key);
			return encoder.update(str, 'utf8', 'hex');
		},
		decode: (str) => {      //method name called by decode(some param)
			let decoder = crypto.createDecipher('aes-256-ctr', this.key);
			return decoder.update(str, 'hex', 'utf8');
		},
		qrgen: (data, file) => {   //method name called by qrgen(some param,someparam)
			let dataToEncode = data || null;
			let outImage = file || null;
			if(dataToEncode !== null && outImage !== null) {
				qr.image(dataToEncode, {
					type: 'png',
					size: 20
				}).pipe(fs.createWriteStream(outImage));
				return true;
			} else {
				return false;
			}
		}
	}
}
