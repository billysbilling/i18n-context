require('ember-i18n');

var localeFactory = require('./locale-factory'),
    tFactory = require('./t-factory'),
    tProperty = require('./t-property');

var contexts = {},
    defaultLocale = 'en_US';

module.exports = context;
module.exports.getContexts = getContexts;
module.exports.setAllLocales = setAllLocales;
module.exports.tProperty = tProperty;

function context(contextName, localesPath) {
    var containerContextName = 'context:' + (contextName || ''); //We need this, since `null` is not a valid hash key
    
    var m = contexts[containerContextName];
    
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
        tProperty: tProperty,
        destroy: destroyFactory(containerContextName)
    };

    contexts[containerContextName] = m;
    
    m.locale(defaultLocale);
    
    return m;
}

function getContexts() {
    var allContexts = [];
    
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

function destroyFactory(containerContextName) {
    return function() {
        delete contexts[containerContextName];
    };
}