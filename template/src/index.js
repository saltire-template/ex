import { Button } from './Button.js'
import { Image } from './Image.js'
import './index.css'

Button()
Image()

module.hot.accept('./Button.js', () => {
    Button()
})
