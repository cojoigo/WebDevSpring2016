var mongoose = require('mongoose');

module.exports = function() {

    var FieldSchema = mongoose.Schema({
        label: String,
        formId: String,
        type: {type: String, default: 'Text'},
        placeholder: String,
        options: [{label: String,value:String}]
    }, {collection: 'Field'});
    return FieldSchema;
};