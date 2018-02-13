module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/assets/bower_components',
                        src: '**',
                        dest: 'public/assets/bower_components'
                    },
                    {
                        expand: true,
                        cwd: 'app/assets/css',
                        src: '**',
                        dest: 'public/assets/css'
                    },
                    {
                        expand: true,
                        cwd: 'app/assets/fonts',
                        src: '**',
                        dest: 'public/assets/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'app/assets/images',
                        src: '**',
                        dest: 'public/assets/images'
                    },
                    {
                        expand: true,
                        cwd: 'app/components/details',
                        src: 'details.html',
                        dest: 'public/components/details'
                    },
                    {
                        expand: true,
                        cwd: 'app/components/summary',
                        src: 'summary.html',
                        dest: 'public/components/summary'
                    },
                    {
                        expand: true,
                        cwd: 'app',
                        src: 'app.js',
                        dest: 'public/',
                    },
                    {
                        expand: true,
                        cwd: 'app',
                        src: 'index.html',
                        dest: 'public/',
                    },
                ]

            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './public/components/dcomponent.js': ['./app/components/details/details.js'],
                    './public/components/scomponent.js': ['./app/components/summary/summary.js'],

                    './public/app.js': ['./public/app.js']
                }
            }
        },
        concat: {
            js: { //target
                src: ['./public/app.js', './public/components/*.js'],
                dest: './public/app.js'
            }
        },
        uglify: {
            js: { //target
                src: ['./public/app.js'],
                dest: './public/app.js'
            }
        }
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    //register grunt default task
    grunt.registerTask('default', ['copy', 'ngAnnotate', 'concat', 'uglify']);
}