var EmberI18n = Ember.I18n;

module.exports = function(contextName, localesPath) {
    return (function() {
        var currentLocale;
        
        var customTranslations = {};
        
        return function(newLocale, data) {
            if (arguments.length === 0) {
                //Getter
                return currentLocale;
            } else if (arguments.length === 1) {
                //Setter
                currentLocale = newLocale;
                var translations = customTranslations[newLocale] || requireTranslations(localesPath, currentLocale),
                    k;
                if (contextName === null) {
                    for (k in translations) {
                        if (translations.hasOwnProperty(k)) {
                            EmberI18n.translations[k] = translations[k];
                        }
                    }
                } else {
                    //Since Ember.I18n flattens the object when a nested key is used, we need to remove all keys that starts with the name of this context
                    for (k in EmberI18n.translations) {
                        if (EmberI18n.translations.hasOwnProperty(k)) {
                            if (k.substring(0, contextName.length + 1) === contextName+'.') {
                                delete EmberI18n.translations[k];
                            }
                        }
                    }
                    //Override Ember.I18n.translations
                    EmberI18n.translations[contextName] = translations;
                }
            } else if (arguments.length === 2) {
                //Register custom locale
                customTranslations[newLocale] = data;
            }
        };
    })();
};

function requireTranslations(localesPath, locale) {
    return require(localesPath + '/' + locale);
}