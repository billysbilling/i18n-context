var pickFiles = require('broccoli-static-compiler')
var mergeTrees = require('broccoli-merge-trees')
var billyBuilder = require('broccoli-billy-builder')

var src = pickFiles('src/js', {
    srcDir: '/',
    destDir: '/i18n-context'
});

var dependencies = 'bower_components';

srcAndDeps = mergeTrees([src, dependencies])

var js = billyBuilder(srcAndDeps, {
    outputFile: 'i18n-context.js',
    modules: {
        'i18n-context': {
            include: ['/'],
            main: 'context'
        }
    },
    legacyFiles: [
        'jquery/dist/jquery.js',
        'handlebars/handlebars.js',
        'ember/ember.js',
        'ember-i18n/lib/i18n.js',
        'ember-i18n/lib/i18n-plurals.js'
    ]
})

module.exports = js
