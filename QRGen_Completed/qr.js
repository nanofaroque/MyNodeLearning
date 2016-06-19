'use strict';
const qr = require('qr-image');
const fs = require('fs');

// node qr "Encode this string" "QRImage.png"
//second paramter is the data we pass to generate png file
//third paramerter is the image name with extension we gave
let dataToEncode = process.argv[2] || null;
let outImage = process.argv[3] || null;

if(dataToEncode !== null && outImage !== null) {
	qr.image(dataToEncode, {
		type: 'png',
		size: 20
	}).pipe(fs.createWriteStream(outImage));//since qr.image--> generates stream, we use stream method

	console.log('QR Image Generated!');
} else {
	console.log('Please check the command line arguments!');
}
