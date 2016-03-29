/*!
 * Copyright(c) Raphael Colboc
 * MIT Licensed
 */

var events 	= require("events");
var util 	= require("util");
var Writer 	= require("../writer.js");
var mongoose 			= require('mongoose');

function MongoWriter(config) {
	
	Writer.call(this, config);
	
	if (typeof this.config.collection !== 'undefined'
		&& typeof this.config.key !== 'undefined') {
		
		this.model	= mongoose.model(this.config.collection);
	} else {
		this.model    = null;
	}
}

util.inherits(MongoWriter, Writer);

MongoWriter.prototype.treat = function(item, last) {
	if (typeof item._id !== 'undefined') {
		item.save( function ( err, item, count ){
			if (err) console.log("WRITER ERROR : " + err);
 			 //console.log("update " + item._id);
 	      });
	} else {
		new this.model(item).save(function( err, item, count ){
			console.log(item);
    	  });
	}
};

module.exports = MongoWriter;