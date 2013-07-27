module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'ssg.js', 'bin/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      },
      ci: {
        options: {
          jshintrc: '.jshintrc',
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        },
        src: ['Gruntfile.js', 'ssg.js', 'bin/**/*.js', 'test/**/*.js']
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: true,
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'test/**/*.js' }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  // Default task(s).
  grunt.registerTask('test', 'simplemocha');
  grunt.registerTask('hint', 'jshint');
  grunt.registerTask('default', ['jshint', 'simplemocha']);

};
