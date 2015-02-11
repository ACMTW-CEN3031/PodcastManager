'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	UploadedImage = mongoose.model('Image'),
	_ = require('lodash');

exports.create = function(req, res)
{
	var img = new UploadedImage(req.body);

	if (req.files.file)
		img.name = req.files.file.name;
	else
		img.name = 'default.png';

	img.save(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.jsonp(img);
		}
	});
};
