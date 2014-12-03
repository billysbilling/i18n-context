var context = bbRequire('i18n-context/context'),
    localeFactory = bbRequire('i18n-context/locale-factory');

QUnit.module('locale-factory', {
    teardown: function() {
        i18nContextReset();
    }
});

test('returns function', function() {
    var locale = localeFactory();
    equal(typeof locale, 'function');
});

test('getter returns null when not set', function() {
    var locale = localeFactory();
    equal(locale(), null);
});

test('using known locale', function() {
    var locale = localeFactory('test', 'locales');
    locale('en_US');
    equal(Ember.I18n.translations.test.hi, 'Hi {{name}}');
});

test('registering custom locale does not change locale', function() {
    var locale = localeFactory('test', 'locales');
    locale('en_US');
    locale('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    equal(locale(), 'en_US');
});

test('using custom locale', function() {
    var locale = localeFactory('test', 'locales');
    locale('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    locale('ma_MA');
    equal(Ember.I18n.translations.test.hi, 'Marklar {{name}}!');
});
