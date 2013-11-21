var context = require('../../src/js/context');

module.exports = function() {
    context.setAllLocales('en_US');
    context.getContexts().forEach(function(c) {
        c.destroy();
    });
    Ember.I18n.translations = {};
};