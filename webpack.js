const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  entry: {
	utils: './src/js/utils.js',
	login: ['@babel/polyfill', './src/js/login.js'],
	reset_password: ['@babel/polyfill', './src/js/reset_password.js'],
	home: ['@babel/polyfill', './src/js/home.js'],
	find_my_car: ['@babel/polyfill', './src/js/find_my_car.js'],
	support_and_learn: ['@babel/polyfill', './src/js/support_and_learn.js'],
	reset_password_confirm: ['@babel/polyfill', './src/js/reset_password_confirm.js'],
	account: ['@babel/polyfill', './src/js/account.js'],
  },
  plugins: [
	// delete all files from dist folder
	new CleanWebpackPlugin(['dist']),
    // replace script tag src filename with hashname
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['login'],
	  template: "src/login.html",
	  filename: "login.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['reset_password'],
	  template: "src/reset_password.html",
	  filename: "reset_password.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['home'],
	  template: "src/home.html",
	  filename: "home.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['find_my_car'],
	  template: "src/find_my_car.html",
	  filename: "find_my_car.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['support_and_learn'],
	  template: "src/support_and_learn.html",
	  filename: "support_and_learn.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['reset_password_confirm'],
	  template: "src/reset_password_confirm.html",
	  filename: "reset_password_confirm.html",
	}),
	new HtmlWebpackPlugin({
	  inject: false,
      chunks: ['account'],
	  template: "src/account.html",
	  filename: "account.html",
	}),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  }
};
