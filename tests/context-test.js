var context = require('../src/js/context'),
    tProperty = require('../src/js/t-property'),
    reset = require('./helpers/reset');

QUnit.module('context', {
    teardown: function() {
        reset();
    }
});

function createContext(contextName) {
    return context(contextName, require.resolve('./test-locales'));
}

test('Returns context', function() {
    var c = createContext('test');
    equal(typeof c.locale, 'function');
    equal(typeof c.t, 'function');
    equal(typeof c.tProperty, 'function');
});

test('Returns context for main', function() {
    var c = createContext(null);
    equal(typeof c.locale, 'function');
    equal(typeof c.t, 'function');
    equal(typeof c.tProperty, 'function');
});

test('Creates a new instance with different names', function() {
    var c1 = createContext('test1');
    var c2 = createContext('test2');

    notStrictEqual(c1, c2);
});

test('Reuses contexts with same name', function() {
    var c1 = createContext('test');
    var c2 = createContext('test');

    strictEqual(c1, c2);
});

test('Reuses main context', function() {
    var c1 = createContext(null);
    var c2 = createContext(null);

    strictEqual(c1, c2);
});

test('Defaults to en_US', function() {
    var c = createContext('test');
    equal(c.locale(), 'en_US');
});

test('locale() changes locale', function() {
    var c = createContext('test');
    c.locale('da_DK');
    equal(c.locale(), 'da_DK');
});

test('t works', function() {
    var c = createContext('test');
    equal(c.t('hi', {name: 'John'}), 'Hi John');
});

test('t works with non-default locale', function() {
    var c = createContext('test');
    c.locale('da_DK');
    equal(c.t('hi', {name: 'John'}), 'Hej John');
});

test('tProperty is the same', function() {
    var c = createContext('test');
    strictEqual(c.tProperty, tProperty);
});

test('Contexts are added and destroyed', function() {
    deepEqual(context.getContexts(), []);

    var c1 = createContext('test');
    deepEqual(context.getContexts(), [c1]);

    var c2 = createContext(null);
    deepEqual(context.getContexts(), [c1, c2]);

    c1.destroy();
    deepEqual(context.getContexts(), [c2]);

    c2.destroy();
    deepEqual(context.getContexts(), []);
});

test('setAllLocales', function() {
    var c1 = createContext('test1');
    var c2 = createContext('test2');

    equal(c1.locale(), 'en_US');
    equal(c2.locale(), 'en_US');
    
    context.setAllLocales('da_DK');

    equal(c1.locale(), 'da_DK');
    equal(c2.locale(), 'da_DK');

    var c3 = createContext('test3');
    equal(c3.locale(), 'da_DK');
});