var q = require("q");
var mongoose = require('mongoose');

module.exports = function(FormModel) {
    var FieldSchema = require("../models/field.schema.server.js")();
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        findFieldsInForm: findFieldsInForm,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField

    };
    return api;

    function findFieldsInForm(formId){
        var deferred = q.defer();
        FieldModel.find({formId: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFieldById(formId, fieldId){
        var deferred = q.defer();
        FormModel.findFormById(formId,function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                if (doc.fields[i]._id == fieldId) {
                    deferred.resolve(doc.fields[i]);
                }
            }
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId){
        var deferred = q.defer();
        FieldModel.findById(fieldId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                findFieldsInForm(formId, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createField(formId, field){
        var deferred = q.defer();
        field.formId = formId;
        FieldModel.create(field, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field){
        var deferred = q.defer();
        FieldModel.findByIdAndUpdate(fieldId, field, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};