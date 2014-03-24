module.exports = (grunt) ->
  grunt.initConfig
    meta:
      src: 'output/**/*.js'
      specs: 'spec/**/*.js'

    watch:
        files: '**/*.coffee'
        tasks: ['test']

    jasmine:
      src: '<%= meta.src %>'
      options:
        specs: '<%= meta.specs %>'
        vendor: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
          'bower_components/jasmine-fixture/dist/jasmine-fixture.js'
        ]

    coffee:
      compile:
        files:
          'output/application.js': ['src/*.coffee']
          'spec/application_spec.js': ['spec/*.coffee']

    copy:
      main:
        files: [
          src: 'bower_components/jquery/dist/jquery.min.js', dest: 'output/jquery.min.js', filter: 'isFile'
        ]


  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jasmine')


  grunt.registerTask('test', ['coffee', 'jasmine'])
  grunt.registerTask('default', ['test'])
