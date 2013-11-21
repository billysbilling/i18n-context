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
                var translations = customTranslations[newLocale] || requireTranslations(localesPath, currentLocale);
                if (contextName === null) {
                    for (var k in translations) {
                        if (!translations.hasOwnProperty(k)) continue;
                        Ember.I18n.translations[k] = translations[k];
                    }
                } else {
                    Ember.I18n.translations[contextName] = translations;
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