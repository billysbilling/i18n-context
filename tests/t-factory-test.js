var tFactory = require('../src/js/t-factory');

var originalEmberI18nT = Ember.I18n.t;

QUnit.module('t-factory', {
    teardown: function() {
        Ember.I18n.t = originalEmberI18nT;
    }
});

test('Returns function', function() {
    var t = tFactory();
    equal(typeof t, 'function');
});

test('Calls Ember.I18n.t without prefix', function() {
    expect(3);

    var t = tFactory();

    Ember.I18n.t = function(key, context) {
        equal(key, 'hi');
        deepEqual(context, {name: 'John'});
        return 'Hi John';
    };

    equal(t('hi', {name: 'John'}), 'Hi John');
});

test('Calls Ember.I18n.t with prefix', function() {
    expect(3);

    var t = tFactory('my_context.');

    Ember.I18n.t = function(key, context) {
        equal(key, 'my_context.hi');
        deepEqual(context, {name: 'John'});
        return 'Hi John';
    };

    equal(t('hi', {name: 'John'}), 'Hi John');
});

test('Replaces multiple html entities', function() {
    var t = tFactory();

    Ember.I18n.t = function() {
        return '&lt;Hi&gt; Billy&#x27;s Billing&#x27;s';
    };
    
    equal(t('whatever'), '<Hi> Billy\'s Billing\'s');
});