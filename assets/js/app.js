// let countDownStart

// fetch(`https://opentdb.com/api_token.php?command=request`)
//   .then(function (resp) {
//     return resp.json()
//   })
//   .then(function (token) {
//     document.querySelector('#timer').setAttribute('data-token', token.token)
//     document.querySelector('#timer').innerHTML = `Are You Ready?`
//   })

// const init = () => {
//   let newDiv = document.createElement('button')
//   newDiv.setAttribute('id', 'start')
//   document.querySelector('#container').appendChild(newDiv).innerHTML = 'Start'
// }

// const grabQuestion = () => {
//   fetch(`https://opentdb.com/api_token.php?command=request`)
//     .then(function (resp) {
//       return resp.json()
//     })
//     .then(function (token) {
//       fetch(`https://opentdb.com/api.php?amount=1&token=` + token.token)
//         .then(function (res) {
//           return res.json()
//         })
//         .then(function (question) {
//           document.querySelector('#timer').setAttribute('data-token', token.token)
//           document.querySelector('#timer').innerHTML = `Are You Ready?`
//           document.querySelector('#container').appendChild(questionDiv).innerHTML = `${question.results[0].question}`
//           var wrng = question.results[0].incorrect_answers
//           var right = question.results[0].correct_answer
//           var choices = wrng.concat(right)
//           console.log(choices)
//           document.querySelector('#container').appendChild(optionsDiv).innerHTML = '<ul><li>' +
//           choices.join('</li><li>') + '</li></ul>'
//         })
//     })
// }

// const timer = () => {
//   countDownStart = 31
//   document.querySelector('#start').remove()
//   let questionDiv = document.createElement('div')
//   let optionsDiv = document.createElement('div')
//   questionDiv.setAttribute('id', 'question')
//   optionsDiv.setAttribute('id', 'options')
//   questionDiv.setAttribute('class', 'bodyText')
//   optionsDiv.setAttribute('class', 'bodyText')
//   setInterval(_ => {
//     let time = document.getElementById('timer')
//     countDownStart--
//     time.innerHTML = `Time Remaining: ${countDownStart} seconds`
//   }, 1000)
// }

// document.addEventListener('click', event => {
//   if (event.target.id === 'start') {
//     grabQuestion()
//     timer()
//     setTimeout(grabQuestion, 30000)
//     setTimeout(timer, 30000)
//   }
// })

// init()

let timer
let token
let question
let optionsArray
let wrongAnswer
let correctAnswer
let correctCount
let wrongCount
let missedCount

const init = () => {
  timer = 11
  correctCount = 0
  wrongCount = 0
  missedCount = 0
}

const getKey = () => {
  fetch(`https://opentdb.com/api_token.php?command=request`)
    .then(response => response.json())
    .then(response => {
      token = response.token
      console.log(token)
    })
    .catch(e => console.error(e))
}

const shuffle = (a) => {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

const getQuestions = () => {
  fetch(`https://opentdb.com/api.php?amount=1&token=` + token)
    .then(response => response.json())
    .then(response => {
      question = response.results[0].question
      console.log(response)
      wrongAnswer = response.results[0].incorrect_answers
      correctAnswer = response.results[0].correct_answer
      optionsArray = wrongAnswer.concat(correctAnswer)
      shuffle(optionsArray)
      document.querySelector('#questionDiv').innerHTML = question
      document.querySelector('#optionsDiv').innerHTML = '<ul><li>' +
      optionsArray.join('</li><li>') + '</li></ul>'
    })
    .catch(e => console.error(e))
}
document.addEventListener('click', event => {
  if (event.target.innerHTML === correctAnswer) {
    getQuestions()
    timer = 11
    correctCount++
    document.querySelector('#correct').innerHTML = `Right: ${correctCount}`
    setInterval(_ => {
      getQuestions()
      timer = 11
      missedCount++
      document.querySelector('#missed').innerHTML = `Missed: ${missedCount}`
    }, 11000)
  } else if (event.target.innerHTML !== correctAnswer && event.target.id !== 'start') {
    getQuestions()
    timer = 11
    wrongCount++
    document.querySelector('#wrong').innerHTML = `Wrong: ${wrongCount}`
  } else {
    setInterval(_ => {
      getQuestions()
      timer = 11
      missedCount++
      document.querySelector('#missed').innerHTML = `Missed: ${missedCount}`
    }, 11000)
  }
})

const clock = () => {
  setInterval(_ => {
    timer--
    console.log(timer)
    document.querySelector('#timer').innerHTML = `Time Remaining: ${timer} seconds`
  }, 1000)
}
document.addEventListener('click', event => {
  if (event.target.id === 'start') {
    getQuestions()
    clock()
    document.querySelector('#start').remove()
  }
})

document.addEventListener('click', event => {
  if (event.target.id === 'end') {
  }
})

getKey()
init()
