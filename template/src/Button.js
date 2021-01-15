const Button = function() {
    const ele = document.createElement('h2')

    ele.textContent = 'Welcome to saltires EX Project!'
    ele.className = 'header'

    document.body.appendChild(ele)
}

export {
    Button
}