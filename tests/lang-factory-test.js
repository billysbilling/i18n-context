var context = require('../src/js/context'),
    langFactory = require('../src/js/lang-factory');

QUnit.module('lang-factory', {
    teardown: function() {
        context.__reset();
    }
});

test('returns function', function() {
    var lang = langFactory();
    equal(typeof lang, 'function');
});

test('getter returns null when not set', function() {
    var lang = langFactory();
    equal(lang(), null);
});

test('using known locale', function() {
    var lang = langFactory('test', require.resolve('./test-locales'));
    lang('en_US');
    equal(Ember.I18n.translations.test.hi, 'Hi {{name}}');
});

test('registering custom locale does not change locale', function() {
    var lang = langFactory('test', require.resolve('./test-locales'));
    lang('en_US');
    lang('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    equal(lang(), 'en_US');
});

test('using custom locale', function() {
    var lang = langFactory('test', require.resolve('./test-locales'));
    lang('ma_MA', {
        'hi': 'Marklar {{name}}!'
    });
    lang('ma_MA');
    equal(Ember.I18n.translations.test.hi, 'Marklar {{name}}!');
});