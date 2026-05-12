import DefaultTheme from 'vitepress/theme'
import RuleCatalog from './components/RuleCatalog.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('RuleCatalog', RuleCatalog)
  },
}
