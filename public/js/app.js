const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const mess1 = document.querySelector('#s1')
const mess2 = document.querySelector('#s2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    mess1.textContent = 'Loading ...'
    mess2.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mess1.textContent = 'Ba** search marao tumi ...'
                mess2.textContent = data.error
            } else {
                mess1.textContent = 'Weather of ' + data.location
                mess2.textContent = data.forecast
            }
        })
    })
    console.log(location)
})