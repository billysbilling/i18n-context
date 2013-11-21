var context = require('../src/js/context'),
    localeFactory = require('../src/js/locale-factory');

QUnit.module('locale-factory', {
    teardown: function() {
        context.__reset();
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
    var locale = localeFactory('test', require.resolve('./test-locales'));
    locale('en_US');
    equal(Ember.I18n.translations.test.hi, 'Hi {{name}}');
});

test('registering custom locale does not change locale', function() {
    var locale = localeFactory('test', require.resolve('./test-locales'));
    locale('en_US');
    locale('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    equal(locale(), 'en_US');
});

test('using custom locale', function() {
    var locale = localeFactory('test', require.resolve('./test-locales'));
    locale('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    locale('ma_MA');
    equal(Ember.I18n.translations.test.hi, 'Marklar {{name}}!');
});