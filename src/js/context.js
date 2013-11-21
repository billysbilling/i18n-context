//TODO: Rename to component? Repo to i18n-component?

require('ember-i18n');

var langFactory = require('./lang-factory'),
    tFactory = require('./t-factory'),
    tProperty = require('./t-property');

var mainContext,
    contexts = {};

module.exports = function(contextName, localesPath) {
    var m = contextName === null ? mainContext : contexts[contextName];
    
    if (m) {
        if (m.__localesPath !== localesPath) {
            throw new Error('You cannot redefine the i18n context `'+contextName+'` with a different localesPath');
        }
        return m;
    }
    
    m = {
        __localesPath: localesPath,
        lang: langFactory(contextName, localesPath),
        t: tFactory(contextName === null ? '' : contextName+'.'),
        tProperty: tProperty
    };

    if (contextName === null) {
        mainContext = m;
    } else {
        contexts[contextName] = m;
    }
    
    m.lang('en_US');
    
    return m;
};

module.exports.getContexts = function() {
    var allContexts = [];
    if (mainContext) {
        allContexts.push(mainContext);
    }
    for (var k in contexts) {
        if (contexts.hasOwnProperty(k)) {
            allContexts.push(contexts[k]);
        }
    }
    return allContexts;
};

module.exports.__reset = function() {
    mainContext = null;
    contexts = {};
    Ember.I18n.translations = {};
};