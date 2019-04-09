
```js
// 在入口js引入后，不用再显式引入组件，webpack打包时会自动引入，组件名为文件夹名-组件名，例如Common-Download
import Vue from 'vue'
 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
 
const requireComponent = require.context(
  '.', true, /\.vue$/
)
 
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
 
  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').replace(/\//, '-')
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
```