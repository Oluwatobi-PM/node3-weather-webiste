
console.log('Client side javascript file is loaded')

//  fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//          console.log(data)
//      })

//  })

//  fetch("http://localhost:3000/weather?address=!").then((response) => {
//      response.json().then((data) => {
//          if(data.error){
//              console.log(data.error)
//          }else {
//              console.log(data.location)
//              console.log(data.forecast)
//          }
//      })
//  })

 const weatherForm = document.querySelector('form')
 const messageOne = document.querySelector('#message-1')
 const search = document.querySelector('input')
 const messageTwo = document.querySelector("#message-2")

//  messageOne.textContent = "From Javascript"

 weatherForm.addEventListener("submit", (e) => {
     e.preventDefault()
     const place = search.value
     messageOne.textContent = "Loading..."
     messageTwo.textContent = " "
     fetch("http://localhost:3000/weather?address="+place).then((response) => {
     response.json().then((data) => {
         if(data.error){
             messageOne.textContent = data.error
         }else {
             messageOne.textContent = data.location
             messageTwo.textContent = data.forecast
         }
     })
 })

})