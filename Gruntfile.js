module.exports = function(grunt) {
    grunt.initConfig({
        'billy-builder': {
            title: 'i18n-context',
            jshint: true
        }
    });

    grunt.loadNpmTasks('billy-builder');
};