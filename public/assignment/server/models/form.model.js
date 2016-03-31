var q = require("q");
var mongoose = require('mongoose');

module.exports = function() {

    var FormSchema = require("./form.schema.server.js")();

    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser
    };
    return api;

    function createForm(form){
        var deferred = q.defer();
        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms(){
        var deferred = q.defer();
        FormModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, form){
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteForm(formId){
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                FormModel.find(function (err, doc) {
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

    function findFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne(
            { title: title },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllFormsForUser(userId){
        var deferred = q.defer();
        FormModel.find(
            { userId: userId },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createFormForUser(userId, form){
        form.userId = userId;
        return createForm(form);
    }
};