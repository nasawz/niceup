const {
  override,
  addWebpackPlugin,
  overrideDevServer,
  addWebpackExternals,
  disableEsLint,
  adjustStyleLoaders
} = require("customize-cra");
const { resolve } = require('path');
const path = require('path');
const webpack = require("webpack");
const RewireWebpackOutput = require("react-app-rewire-output");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const _ = require("lodash")
let pkgJson = {};


try {
  pkgJson = require(resolve('package.json'));
} catch (e) { }

const PORT = process.env.PORT || 8080
const themeConfig = buildThemeConfig();

const devServerCustom = () => config => {
  config.historyApiFallback = true;
  config.quiet = false;
  return config;
}

const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

const externals = {
  "react": "React",
  "react-dom": "ReactDOM",
  "lodash": "_"
}

const webpackConfig = (publicPath) => (config, env) => {
  config = RewireWebpackOutput(config, env, {
    path: path.join(process.cwd(), "./build"),
    publicPath: publicPath,
    filename: `static/js/${_.kebabCase(pkgJson.name)}_${pkgJson.version}.js`
  });

  return config;
};

module.exports = {
  webpack: override(
    webpackConfig('./'),
    disableEsLint(),
    rewiredMap(),
    addWebpackExternals(externals),
    // addWebpackPlugin(
    //   new CopyWebpackPlugin({ patterns: themeConfig.copyConfig })
    // ),
    addWebpackPlugin(
      new webpack.DefinePlugin({
        "process.env": {
          VERSION: `"${pkgJson.version}"`,
          THEME_CONFIG: JSON.stringify(themeConfig),
        }
      })
    ),
    addWebpackPlugin(
      new MiniCssExtractPlugin({
        filename: `static/css/${_.kebabCase(pkgJson.name)}_${pkgJson.version}.css`
      })
    ),
    adjustStyleLoaders((loader) => {
      const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
      if (mode === 'dev') {
        loader.use = _.concat([MiniCssExtractPlugin.loader], _.tail(loader.use))
      }
    })
  ),
  devServer: overrideDevServer(devServerCustom())
}

function buildThemeConfig() {
  const themeFiles = glob.sync(
    path.join(
      __dirname,
      'theme',
      'niceup_theme_*.min.css'
    )
  );
  const cnName = (name) => {
    let n = name
    switch (name) {
      case 'Light':
        n = '浅色'
        break;
      case 'Dark':
        n = '深色'
        break;
      default:
        break;
    }
    return n
  }

  const themeConfig = {
    availableThemes: [],
    copyConfig: [],
  };

  for (const each of themeFiles) {
    const basename = path.basename(each, '.min.css');

    const themeId = basename.replace(/^niceup_theme_/, '');

    const themeName =
      themeId[0].toUpperCase() + themeId.slice(1).replace(/_/g, ' ');

    if (themeName == 'Light' || themeName == 'Dark') {
      const publicPath = `themes/${basename}.min.css`;
      const toPath = path.join(
        __dirname,
        `public`,
        `themes`,
        `${basename}.min.css`
      );

      themeConfig.availableThemes.push({
        id: themeId,
        name: cnName(themeName),
        publicPath,
      });

      themeConfig.copyConfig.push({
        from: each,
        to: toPath,
      });
    }


  }
  return themeConfig;
}
