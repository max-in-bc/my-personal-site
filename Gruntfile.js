module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files:
            [{
              expand: true,
              cwd: 'scss',
              src: ['*.scss'],
              dest: '../css',
              ext: '.css'
            }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default',['sass']);
}
