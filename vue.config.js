module.exports = {
  devServer: {
    // To remove hot reload warning message in the dev server build output.
    // @see https://github.com/vuejs/vue-cli/issues/3173
    disableHostCheck: true,
    port: 9000
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  },
  runtimeCompiler: true
}