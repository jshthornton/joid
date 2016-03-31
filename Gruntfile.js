var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {

      },
      dist: {
        //files: [
          //{
            expand: true,
            cwd: 'src',
            src: ['**/*.js'],
            dest: './'
          //}
        //]
      }
    },

    watch: {
      js: {
        options: {
          atBegin: true
        },
        files: ['src/**/*.js'],
        tasks: ['babel:dist']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', []);
};