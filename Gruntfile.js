var spawn = require('child_process').spawn,
    path = require('path');

module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: true,
				compress: true,
				preserveComments: false
			},
			dist: {
				files: {
					//Singles
					'dist/<%= pkg.name %>.min.js': ['src/lid.js'],
					'dist/extensions/parse.min.js': ['src/extensions/parse.js'],

					//Bundled
					'dist/bundles/parse/<%= pkg.name %>.min.js': ['src/lid.js', 'src/extensions/parse.js']
				}
			}
		},

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/',
					outdir: 'docs/'
				}
			}
		},

		clean: ['docs', 'dist'],

		jshint: {
			options: {
				eqeqeq: true,
				eqnull: true,
				browser: true,
				es3: true,
				forin: true,
				indent: 4,
				latedef: true,
				newcap: true,
				camelcase: true,
				bitwise: true,
				noarg: true,
				noempty: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				evil: true,

				'-W030': true, //Allow !bang starts to auto invoking functions
				globals: {
					require: true,
					module: true,
					define: true
				}
			},

			all: ['Gruntfile.js', 'src/**/*.js']
		}
	});

	//Loads
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//Tasks
	grunt.registerTask('default', ['clean', 'jshint', 'yuidoc', 'uglify']);


	grunt.registerTask('doc-server', 'Project documentation at http://localhost:3000', function(){
        var yuidocPath = path.resolve('node_modules', 'yuidocjs', 'lib', 'cli.js'),
            args = [yuidocPath, '--server', '--outdir', 'docs', 'src'],
            done = this.async();
        
        var yuidoc = spawn('node', args, { stdio: 'inherit' });
        yuidoc.on('close', function(/*code*/){
            grunt.log.ok('yuidoc closed');
            done();
        });
    });
};