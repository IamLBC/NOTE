# Webpack-study

## 安装 webpack

```bash
全局安装：cnpm i webpack webpack-cli -g
本地安装：cnpm i webpack webpack-cli -D
```

## 安装依赖

> node_modules 安装在最外面，在最外层运行 `cnpm i` 本地下载安装 loader 和 plugins

[ [基本使用](#基本使用) &bull; [开发环境配置](#开发环境配置) &bull; [生产环境配置](#生产环境配置) &bull; [优化环境配置](#优化环境配置) &bull; [配置详解](#配置详解) &bull; [webpack5-使用](#webpack5-使用) ]

## 基本使用

    index.js: webpack入口起点文件

    运行指令：
      开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
      webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
      整体打包环境，是开发环境
      生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
      webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
      整体打包环境，是生产环境

    结论：
    1. webpack 能处理 js/json 资源，不能处理 css/img 等其他资源
    2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化~
    3. 生产环境比开发环境多一个压缩 js 代码。

## 开发环境配置

```js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    // 输出路径 __dirname 是 nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, "build"),
  },
  // loader配置 不同文件必须配置不同loader处理
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // use数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          "style-loader",
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          "css-loader",
        ],
      },

      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件  需要下载less-loader和less
          "less-loader",
        ],
      },

      {
        // 处理图片资源
        // 问题：默认处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader  需要下载 url-loader file-loader
        loader: "url-loader",
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          // base64在客户端本地解码所以会减少服务器压力，如果图片过大会采用base64编码会导致cpu调用率上升，网页加载时变卡
          limit: 8 * 1024,
          // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出问题：[object Module]
          // 所以关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片重命名
          // [hash:10]取图片的hash的前10位  [ext]取文件原来扩展名
          name: "[hash:10].[ext]",
          outputPath: "imgs",
        },
      },

      {
        // 处理html文件的img图片（img标签引入的图片资源，从而能被url-loader进行处理）
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: false,
        },
      },

      {
        // 其他资源比如字体   排除html|js|css|less|jpg|png|gif文件
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        // file-loader：处理其他文件
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    // 功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需要有结构的HTML文件可以加一个template
    new HtmlWebpackPlugin({
      // 复制这个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
    }),
  ],
  // 模式
  mode: "development",
  // mode: 'production',

  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样看到build包，而是在内存中，关闭后会自动删除）
  // npm i webpack-dev-server -D 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    port: 3000,
    open: true,
  },
};
```

## 生产环境配置

> 提取-CSS-成单独文件-兼容处理-压缩

```js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

const commonCssLoader = [
  {
    test: /\.css$/,
    use: [
      // 创建style标签，将样式放入
      // 'style-loader',
      // 这个loader取代style-loader。作用：提取js中的css成单独文件
      MiniCssExtractPlugin.loader,
      // 将css文件整合到js文件中
      "css-loader",
      /*
        css兼容性处理：postcss --> postcss-loader postcss-preset-env
        帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
      "browserslist": {
        // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ],
        // 生产环境。默认是生产环境
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ]
      },
      */
      // 使用loader的默认配置
      // 'postcss-loader',
      // 修改loader的配置
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: () => [
            // postcss的插件
            require("postcss-preset-env")(),
          ],
        },
      },
    ],
  },
]

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      }

      /*
        语法检查： 需要下载 eslint-loader eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
                "env": {
                  "browser": true // 支持浏览器端全局变量
                }
              }
            airbnb --> 需要下载 eslint-config-airbnb-base eslint-plugin-import eslint
      */
      /*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
        先执行eslint再执行babel（用enforce）
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre', // 优先执行
        loader: "eslint-loader",
        options: {
          // 自动修复
          fix: true,
        },
      },

      /*
        js兼容性处理：需要下载 babel-loader @babel/core
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
    new MiniCssExtractPlugin({
      // 单独提取css，对输出的css文件进行重命名
      filename: "css/built.css",
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
  // 生产环境下会自动压缩js代码
  // mode: "production",
};
```

## 优化环境配置

[优化环境配置](./4.webpack优化环境配置/17.优化配置介绍/README.MD)

- [编译缓存 和 文件资源缓存](./4.webpack优化环境配置/21.缓存/webpack.config.js)

- code-split &nbsp;&nbsp; [ [自动 split](./4.webpack优化环境配置/23.code-split/demo3/webpack.config.js) &bull; [手动 split](./4.webpack优化环境配置/23.code-split/demo3/src/js/index.js) ]

- [懒加载 和 预加载](./4.webpack优化环境配置/24.lazy-loading/src/js/index.js)

- [多进程打包](./4.webpack优化环境配置/26.多进程打包/webpack.config.js)

- [externals](./4.webpack优化环境配置/27.externals/webpack.config.js)

- dll &nbsp;&nbsp; [ [webpack.config.js](./4.webpack优化环境配置/28.dll/webpack.config.js) &bull; [webpack.dll.js](./4.webpack优化环境配置/28.dll/webpack.dll.js) ]

## 配置详解

- [entry](5.webpack配置详解/29.entry/webpack.config.js)

- [output](5.webpack配置详解/30.output/webpack.config.js)

- [module](5.webpack配置详解/31.module/webpack.config.js)

- [resolve](5.webpack配置详解/32.resolve/webpack.config.js)

- [dev-server](5.webpack配置详解/33.dev-server/webpack.config.js)

- [optimization](5.webpack配置详解/34.optimization/webpack.config.js)

## webpack5-使用

- [webpack5](6.webpack5使用/README.MD)
