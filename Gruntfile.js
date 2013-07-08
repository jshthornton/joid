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
		}
	});

	//Loads
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Tasks
	grunt.registerTask('default', ['uglify']);
};