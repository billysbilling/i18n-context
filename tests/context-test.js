var context = require('../src/js/context'),
    tProperty = require('../src/js/t-property');

QUnit.module('context', {
    teardown: function() {
        context.__reset();
    }
});

function createContext(contextName) {
    return context(contextName, require.resolve('./test-locales'));
}

test('Returns context', function() {
    var c = createContext('test');
    equal(typeof c.lang, 'function');
    equal(typeof c.t, 'function');
    equal(typeof c.tProperty, 'function');
});

test('Returns context for main', function() {
    var c = createContext(null);
    equal(typeof c.lang, 'function');
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
    equal(c.lang(), 'en_US');
});

test('lang() changes locale', function() {
    var c = createContext('test');
    c.lang('da_DK');
    equal(c.lang(), 'da_DK');
});

test('t works', function() {
    var c = createContext('test');
    equal(c.t('hi', {name: 'John'}), 'Hi John');
});

test('t works with non-default locale', function() {
    var c = createContext('test');
    c.lang('da_DK');
    equal(c.t('hi', {name: 'John'}), 'Hej John');
});

test('tProperty is the same', function() {
    var c = createContext('test');
    strictEqual(c.tProperty, tProperty);
});

test('contexts are added', function() {
    deepEqual(context.getContexts(), []);

    var c1 = createContext('test');
    deepEqual(context.getContexts(), [c1]);

    var c2 = createContext(null);
    deepEqual(context.getContexts(), [c2, c1]);
});