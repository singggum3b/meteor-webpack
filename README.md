
#Majors changes in this fork
 - Remove dependant on react-router-ssr
 - Automatically load common chunks (common-* prefix)
 - Main entry need to be named [main: (entry)]
 - Remove npm 2 , now dependency need to be install manually (with npm install), instead of running on each build
 - You only need to use webpack.packages.json once to generate symlink, them you can use npm install and packages.json normally
 - Server-side get injected with 2 variable for webpack stats : `WebpackStats` && `__WebpackDevServerConfig__`
 - `webpack-hot-middleware` packages is required for hot code reloading dev (need to install)

 =====================================

Seamlessly integrate Webpack with the Meteor build system.

Build your application with his assets. Use hot module replacement (HMR) in development mode. Optimize the code in production mode.

To try different examples or setup a new project, you can use the [kickstart projects](https://github.com/thereactivestack/kickstart).

# How does it work?
Webpack is configured by using a webpack.conf.js file. One on the server and one on the client.

It looks for the entry file and build the entire application following the import (ES6 modules) / require (CommonJS).

The JavaScript files (.js) and CSS import files (.import.css) are not automatically included.

In development mode, it will add to your configuration what is needed to make hot module replacement (HMR) work.

In production mode, it will add the best optimization config and include the source map.

Here is an example of a webpack.conf.js:

```javascript
var webpack = require('webpack');

module.exports = {
  entry: './entry',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { stage: 0 }, exclude: /node_modules/ }
    ]
  }
};
```

# NPM packages
You can define your NPM dependencies by using one (or multiple) webpack.packages.json. Then, you can require or import them within your code like a regular Webpack project: `import ReactMixin from 'react-mixin';`.

This is strictly for packages that can be bundled with your application. If it needs to access the server file system or execute a binary at runtime (like PhantomJS), you must use Meteor.npmRequire with `meteorhacks:npm`.

webpack.packages.json:
```
{
  "babel": "^5.8.23",
  "react-mixin": "^3.0.0",

  "babel-loader": "^5.3.2",
  "null-loader": "^0.1.1",
  "url-loader": "^0.5.6",
  "file-loader": "^0.8.4",
  "style-loader": "^0.12.4",
  "css-loader": "^0.19.0",
  "less-loader": "^2.2.1",
  "style-collector-loader": "^0.1.0",

  "babel-plugin-react-transform": "^1.1.1",
  "react-transform-hmr": "^1.0.1",
  "react-transform-catch-errors": "^1.0.0",
  "redbox-react": "^1.1.1"
}
```

# Production
You can use meteor run, meteor build, mup or anything working with Meteor.

## Run in production mode
`meteor run --production`

## Build for production
`meteor build .`

## Deploy with Meteor-up
`mup deploy`

# Install
It is easier to start by cloning one of the [kickstart projects](https://github.com/thereactivestack/kickstart).

If you would like to create your own from scratch, here are the steps.

1. Setup the correct Meteor packages
    ```bash
    meteor remove ecmascript # webpack will take care of it, you can't keep both
    meteor add webpack:webpack
    ```

1. Add the NPM modules your webpack config will need in `webpack.packages.json`.

1. Add `webpack.conf.js` and your client entry file in a client folder.

1. Add `webpack.conf.js` and your server entry file in a server folder.

1. (optional) Add ios and/or android support
    ```bash
    meteor add-platform ios
    meteor add-platform android
    ```

## Startup
If you need to run code in Meteor before the startup, you can do that if you name your file `meteor.startup.js`.

Calling `FlowRouter.wait()` is a great example of things you might want to do.
