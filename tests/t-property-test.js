var tProperty = bbRequire('i18n-context/t-property');

var originalEmberI18nT = Ember.I18n.t;

var Thing = Ember.Object.extend({
    label: tProperty('label', 'Default label'),
    tip: tProperty('label', function() {
        return 'Default tip';
    }),
    placeholder: tProperty('placeholder')
});

QUnit.module('t-property', {
    teardown: function() {
        Ember.I18n.t = originalEmberI18nT;
    }
});

test('defaults', function() {
    var thing = Thing.create({});

    equal(thing.get('label'), 'Default label');
    equal(thing.get('tip'), 'Default tip');
    equal(thing.get('placeholder'), null);
});

test('override', function() {
    var thing = Thing.create({
        label: 'Overridden'
    });

    equal(thing.get('label'), 'Overridden');
});

test('t suffix', function() {
    Ember.I18n.t = function() {
        return 'My localized label';
    };

    var thing = Thing.create({
        labelT: 'whatever'
    });

    equal(thing.get('label'), 'My localized label');
});