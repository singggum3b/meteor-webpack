Package.describe({
    name: 'singgum3b:webpack',
    version: '0.4.3',
    summary: 'Fork of webpack:webpack',
    git: 'https://github.com/singggum3b/meteor-webpack.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'singgum3b:webpack',
    use: [
      'meteor',
      'ecmascript@0.1.5',
      'webpack:npmworkaround@0.1.0'
    ],
    sources: [
			'plugin/WebpackStatUtil.js',
      'plugin/WebpackSourceMapFix.js',
      'plugin/WebpackCompiler.js',
      'plugin/webpack-plugin.js'
    ],
    npmDependencies: {
			'immutable': "3.7.6",
      'underscore': '1.8.3',
      'connect': '3.4.0',
      'cors': '2.7.1',
      'npm': '2.14.15',
      'webpack': '1.12.9',
      'webpack-dev-middleware': '1.4.0',
      'webpack-hot-middleware': '2.6.0',
      'memory-fs': '0.3.0',
      'mime': '1.3.4',
      'shelljs': '0.5.3',
      'mkdirp': '0.5.1',
			'on-build-webpack': '0.1.0'
    }
});

Package.onUse(function(api) {
    api.versionsFrom('1.2');

    api.use('isobuild:compiler-plugin@1.0.0');
    //api.use('webpack:reload@0.2.0');

    // Meteor polyfill for ecmascript
    api.imply('ecmascript-runtime@0.2.6')
});
