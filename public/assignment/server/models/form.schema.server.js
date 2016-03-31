var mongoose = require('mongoose');

module.exports = function() {
    var FieldScehma = require("./field.schema.server.js");

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldScehma],
        created: Date,
        updated: Date
    }, {collection: 'form'});
    return FormSchema;
};