const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");


module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    // @primary-color 主题颜色
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);