// const { func } = require("assert-plus");
// const { divide } = require("lodash");

// const { add } = require("lodash");

const pry = require('pryjs')

let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block"
    toyFormContainer.addEventListener('submit', event => {
      event.preventDefault()
      requestToys(event.target)
    })
  } else {
    toyFormContainer.style.display = "none";
  }
});

function findToys() {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
}
  
function requestToys(toy) {

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"    
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": <new number></new>
    })
  })
    .then(response => response.json())
    .then(object => assembleToys(object))
    .catch(error => document.body.innerHTML = error.message)
}

function assembleToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  let btn = document.createElement('btn')
  btn.setAttribute('class', 'like-btn')
  btn.innerText = "Like"
  btn.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    likesFn(event)
  })
}

function likesFn(event) {
  event.preventDefault()
  let add = parseInt(event.target.previousElementSibling.innertext) +1
  fetch (`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"    
    },
    body: JSON.stringify({
      "likes": add
  })
  .then(response => response.json())
  .then((object => {event.target.previousElementSibling.innerText = `${add} likes`}))

  })
}



findToys().then(toys => {
  toys.forEach(toy => {
    requestToys()
  })
})
