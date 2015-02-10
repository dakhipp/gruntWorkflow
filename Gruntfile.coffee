module.exports = (grunt) -> 
    
  grunt.initConfig
  	pkg: grunt.file.readJSON("package.json")

  	files: 
  		html:
  			src: 'public/dev/index.html'
  			dest: 'public/deploy/'

  		less: 
  			src: 'public/dev/less/style.less'
  			dest: 'public/dev/css/style.css'

  		js: 
  			vendor: [
  				'public/dev/bower_components/jquery/jquery.js'
        	'public/dev/bower_components/angular/angular.js'
        	'public/dev/bower_components/angular-route/angular-route.js'
  			]

  		coffee: 
  			dest: 'public/dev/js/**'

  		templates: 
  			src: 'public/dev/templates/**/*.html'

  	coffee:
      compile:
        expand: true
        ## unexplained indentation fix after cwd ##
        cwd: 'public/dev/coffee/'
    	   src: '**/*.coffee'
    	   dest: 'public/dev/js'
    	   ext: '.js' 
      
    less:
      options: 
        ieCompact: false

      dev:
        options:
          cleancss: true
        src: '<%= files.less.src %>'
        dest: '<%= files.less.dest %>'

      dist:
        options:
          compress: true
        src: '<%= files.less.src %>'
        dest: 'public/deploy/css/style.min.css'

    ngtemplates:
      app:        
        cwd:      'public/dev'
        src:      'views/**.html'
        dest:     'public/dev/temp/templates.js'

    uglify:
      build:
        files: "public/deploy/js/app.min.js" : [
          "<%= files.js.vendor %>"
          "public/dev/js/**/*.js"
          "public/dev/temp/templates.js"
        ]

    imagemin: 
      dynamic: 
        expand: true,
        cwd: 'public/dev/img/'
        src: ['*.{png,jpg,gif}'];
        dest: 'public/deploy/img/'

    processhtml: 
      dist:
        files:
          'public/dev/temp/index.html' : ['public/dev/index.html']

    htmlmin: 
      dist:
        options:
          removeComments: true
          collapseWhitespace: true
        files: [
          expand: true
          cwd: 'public/dev/temp'
          src: '*.html'
          dest: 'public/deploy' ]

    watch:
      options:
        livereload: true

      # targets for watch
      html:
        files: ["<%= files.html.src %>"]
        tasks: ['processhtml', 'htmlmin']

      coffee:
        files: ["public/dev/coffee/**/*.coffee"]
        tasks: ['coffee', 'ngtemplates', 'uglify']

      less:
        files: ["<%= files.less.src %>"]
        tasks: ['less:dev', 'less:dist']

    compress:
      main:
        options:
          mode: 'gzip'
        expand: true
        cwd: 'public/deploy/'
        src: ['**/*']
        dest: 'public/ziped/'

    cssmin:
      target:
        files:
          'public/deploy/css/style.min.css' : ['public/dev/bower_components/bootstrap/bootstrap.css', 'public/dev/css/*.css']

  grunt.loadNpmTasks 'grunt-contrib-coffee' 
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-angular-templates'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-processhtml'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.registerTask 'build', ['coffee', 'less:dev', 'cssmin', 'ngtemplates', 'uglify', 'imagemin', 'processhtml', 'htmlmin', 'watch']
  grunt.registerTask 'zip', ['compress']

