require('ember-i18n');

var localeFactory = require('./locale-factory'),
    tFactory = require('./t-factory'),
    tProperty = require('./t-property');

var mainContext,
    contexts,
    defaultLocale;

reset();

module.exports = context;
module.exports.getContexts = getContexts;
module.exports.setAllLocales = setAllLocales;
module.exports.__reset = reset;
module.exports.tProperty = tProperty;

function context(contextName, localesPath) {
    var m = contextName === null ? mainContext : contexts[contextName];
    
    if (m) {
        if (m.__localesPath !== localesPath) {
            throw new Error('You cannot redefine the i18n context `'+contextName+'` with a different localesPath');
        }
        return m;
    }
    
    m = {
        __localesPath: localesPath,
        locale: localeFactory(contextName, localesPath),
        t: tFactory(contextName === null ? '' : contextName+'.'),
        tProperty: tProperty
    };

    if (contextName === null) {
        mainContext = m;
    } else {
        contexts[contextName] = m;
    }
    
    m.locale(defaultLocale);
    
    return m;
}

function getContexts() {
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
}

function setAllLocales(newLocale) {
    defaultLocale = newLocale;
    
    context.getContexts().forEach(function(c) {
        c.locale(newLocale);
    });
}

function reset() {
    defaultLocale = 'en_US';
    mainContext = null;
    contexts = {};
    Ember.I18n.translations = {};
}
