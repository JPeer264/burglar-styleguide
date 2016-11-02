module.exports = {
	watch: {
		sass: {
			files: "<%= paths.src.allFiles.scss %>",
			tasks: [
				"manage:sass"
			]
		},
		js: {
			files: "<%= paths.src.folder.assets.jss %>/*.js",
			tasks: [
				"concat:js"
			]
		},
		oldBrowserCss: {
			files: [
				"<%= paths.src.folder.assets.scsss %>/*.scss",
				"!<%= paths.src.folder.assets.scss %>/*.scss"
			],
			tasks: [
				"manageScssFolders"
			]
		},
		copy: {
			files: [
				"<%= paths.src.base %>/**/*.html",
				"<%= paths.src.base %>/**/*.php"
			],
			tasks: [
				"copy:dev"
			]
		},
		vendorFolder: {
			files: "<%= paths.vendor.base %>/**/*",
			tasks: [
				"concat:js"
			]
		}
	},
	connect: {
		reports: {
			options: {
				base: "<%= paths.reports.coverage %>",
				port: 8001,
				keepalive: true,
				open: true
			}
		},
		docs: {
			options: {
				base: "<%= paths.tmp.folder.docs.base %>",
				port: 8002,
				keepalive: true,
				open: true
			}
		},
		dev: {
			options: {
				hostname: "127.0.0.1",
				port: 1337,
				base: "tmp"
			}
		},
		prod: {
			options: {
				hostname: "<%= connect.dev.options.hostname %>",
				port: "<%= connect.dev.options.port %>",
				base: "<%= hstn.names.dest %>"
			}
		}
	},
	php: {
		options: {
			hostname: "<%= connect.dev.options.hostname %>",
			port: "<%= connect.dev.options.port %>"
		},
		dev: {
			options: {
				base: "tmp"
			}
		},
		prod: {
			options: {
				base: "<%= hstn.names.dest %>"
			}
		}
	},
	browserSync: {
		dev: {
			bsFiles: {
				src: [
					"<%= paths.tmp.base %>/**/*.html",
					"<%= paths.tmp.base %>/**/*.css",
					"<%= paths.tmp.base %>/**/*.js"
				]
			},
			options: {
				proxy: "<%= connect.dev.options.hostname %>:<%= connect.dev.options.port %>",
				port: 1338,
				open: true,
				watchTask: true,
				notify: true,
				logLevel: "silent",
				ghostMode: {
					clicks: true,
					scroll: true,
					links: true,
					forms: true
				}
			}
		}
	}
};