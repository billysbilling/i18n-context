function i18nContextReset() {
    context.setAllLocales('en_US');
    context.getContexts().forEach(function(c) {
        c.destroy();
    });
    Ember.I18n.translations = {};
};
