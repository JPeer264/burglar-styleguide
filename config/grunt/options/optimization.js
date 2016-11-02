module.exports = {
	autoprefixer: {
		dev: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.tmp.folder.assets.css %>",
					src: "**/*.css",
					dest: "<%= paths.tmp.folder.assets.css %>"
				}
			]
		}
	},
	removelogging: {
		prod: {
			src: "<%= paths.dest.allFiles.js %>"
		}
	},
	cssmin: {
		target: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.tmp.folder.assets.css %>",
					src: [
						"**/*.css",
						"!**/*.min.css"
					],
					dest: "<%= paths.dest.folder.assets.css %>",
					ext: ".min.css"
				}
			]
		}
	},
	uglify: {
		nonvendor: {
			files: [
				{
					expand: true,
					cwd: "<%= paths.tmp.folder.assets.js %>",
					src: [
						"*.js",
						"!vendor.js"
					],
					dest: "<%= paths.dest.folder.assets.js %>",
					ext: ".min.js"
				}
			]
		}
	}
};