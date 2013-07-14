var exec = require("child_process").exec,
    spawn = require("child_process").spawn,
    path = require("path");

module.exports = function(grunt) {
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

		clean: ['docs', 'dist']
	});

	//Loads
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//Tasks
	grunt.registerTask('default', ['clean', 'yuidoc', 'uglify']);


	grunt.registerTask('doc-server', 'Project documentation at http://localhost:3000', function(){
        var libsPath = path.resolve('src'),
            yuidocPath = path.resolve('node_modules', 'yuidocjs', 'lib', 'cli.js'),
            args = [yuidocPath, '--server', '--outdir', 'docs', 'src'],
            done = this.async();
        
        var yuidoc = spawn('node', args, { stdio: 'inherit' });
        yuidoc.on('close', function(code){
            grunt.log.ok('yuidoc closed');
            done();
        });
    });
};