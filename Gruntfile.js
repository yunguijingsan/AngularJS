module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,     // Enable dynamic expansion.
                cwd: 'public/',      // Src matches are relative to this path.
                src: ['**/*.js'], // Actual pattern(s) to match.
                dest: 'build/',   // Destination path prefix.
                ext: '.min.js'  // Dest filepaths will have this extension.
            }
        },
        jshint: {
            foo: {
                src: ['public/js/*.js']
            }
        },
        concat: {
            foo: {
                files: {
                    'build/a.js': ['public/js/add.js', 'public/js/xcode.js']
                }
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('log', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify','jshint','concat']);
};