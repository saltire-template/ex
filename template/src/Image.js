import img from './yby.jpeg'

export const Image = function() {
    const ele_container = document.createElement('div')
    const ele = document.createElement('img')

    ele_container.appendChild(ele)
    ele_container.className = 'img'

    ele.src = img

    module.hot.accept('./yby.jpeg', () => {
        ele.src = img
    })

    document.body.appendChild(ele_container)
}

