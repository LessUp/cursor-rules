import DefaultTheme from 'vitepress/theme'
import './style.css'
import SvgIcon from './components/SvgIcon.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SvgIcon', SvgIcon)
  },
}
