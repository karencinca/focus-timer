/* countdown */ 
const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

let timerTimeOut

 buttonPlay.addEventListener('click', () => {
    buttonPause.classList.remove('hide')
    buttonPlay.classList.add('hide')
    countdown()
 })

 buttonStop.addEventListener('click', () => {
    buttonPause.classList.add('hide')
    buttonPlay.classList.remove('hide')
    resetTimer()
 })

 buttonPause.addEventListener('click', () => {
    buttonPause.classList.add('hide')
    buttonPlay.classList.remove('hide')
    clearTimeout(timerTimeOut)
 })
 
function countdown() {
    timerTimeOut = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)
        let isFinished = minutes <= 0 && seconds <= 0

        updateTimerDisplay(minutes, 0)

        if(isFinished) {
            resetAudio()
            resetTimer()
            return
        }

        if(seconds <= 0) {
            seconds = 60    
            --minutes  
        }

        updateTimerDisplay(minutes, String(seconds - 1))

        countdown()
    }, 1000)
}

function updateTimerDisplay(minutes, seconds) { 
    minutesDisplay.textContent = String(minutes).padStart(2, '0')
    secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
    updateTimerDisplay(25, 0)
    clearTimeout(timerTimeOut)
}



/* more/less five seconds */
const buttonMoreSeconds = document.querySelector('.sec-more')
const buttonLessSeconds = document.querySelector('.sec-less')

buttonMoreSeconds.addEventListener('click', () => {
    moreFiveSeconds()
})

buttonLessSeconds.addEventListener('click', () => {
    lessFiveSeconds()
})


function moreFiveSeconds() {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    if(seconds >= 59) {
        seconds = 0
        ++minutes
    }
    
    updateTimerDisplay(minutes, String(seconds + 5))
}

function lessFiveSeconds() {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    if(seconds == 0) {
        seconds = 60
        --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 5))
}


/* audio */ 
const buttonTreeSound = document.querySelector('.tree')
const buttonCloudSound = document.querySelector('.cloud')
const buttonCoffeeSound = document.querySelector('.coffee')
const buttonFireSound = document.querySelector('.fire')
const treeAudio = new Audio("./assets/Floresta.wav")
const cloudAudio = new Audio("./assets/Chuva.wav")
const coffeeAudio = new Audio("./assets/Cafeteria.wav")
const fireAudio = new Audio("./assets/Lareira.wav")
let isPlaying = false

const inputTree = document.querySelector("#vol-sound-tree");
const inputCloud = document.querySelector("#vol-sound-cloud");
const inputCoffee = document.querySelector("#vol-sound-coffee");
const inputFire = document.querySelector("#vol-sound-fire");


function setAudioVolume() {
    treeAudio.volume = inputTree.value;
    cloudAudio.volume = inputCloud.value;
    coffeeAudio.volume = inputCoffee.value;
    fireAudio.volume = inputFire.value;
  }


inputTree.addEventListener('input', () => {
    setAudioVolume()
})

inputCloud.addEventListener('input', () => {
    setAudioVolume()
})

inputCoffee.addEventListener('input', () => {
    setAudioVolume()
})

inputFire.addEventListener('input', () => {
    setAudioVolume()
})

buttonTreeSound.addEventListener('click', () => {
    addActive(buttonTreeSound)
    checkIfIsPlaying(treeAudio)
    togglePlay(treeAudio)
})

buttonCloudSound.addEventListener('click', () => {
    addActive(buttonCloudSound)
    checkIfIsPlaying(cloudAudio)
    togglePlay(cloudAudio)
})

buttonCoffeeSound.addEventListener('click', () => {
    addActive(buttonCoffeeSound)
    checkIfIsPlaying(coffeeAudio)
    togglePlay(coffeeAudio)
})

buttonFireSound.addEventListener('click', () => {
    addActive(buttonFireSound)
    checkIfIsPlaying(fireAudio)
    togglePlay(fireAudio)
}) 

function addActive(button) {
    button.classList.toggle('active')
}

function checkIfIsPlaying(audio) {
    audio.onplaying = function() {
        isPlaying = true
        audio.loop = true
    } 
    audio.onpause = function() {
        audio.currentTime = 0
        isPlaying = false
    }
}

function togglePlay(audio) {
    if (isPlaying) {
        audio.pause()
    } else {
        audio.play()
    }
}

function resetAudio() {
    buttonTreeSound.classList.remove('active')
    buttonCloudSound.classList.remove('active')
    buttonCoffeeSound.classList.remove('active')
    buttonFireSound.classList.remove('active')

    treeAudio.pause()
    cloudAudio.pause()
    coffeeAudio.pause()
    fireAudio.pause()
}

/* toggle dark/light */ 
const themeButton = document.querySelector('.switch-mode')
themeButton.addEventListener('click', () => {
    themeToggle()
})

function themeToggle() {
    const sunButton = document.querySelector('.switch-mode-sun')
    const moonButton = document.querySelector('.switch-mode-moon')

    const html = document.documentElement
    html.classList.toggle('dark')

    if(html.classList.contains('dark')) {
      sunButton.classList.add('hide')
      moonButton.classList.remove('hide')  
    } else {
        sunButton.classList.remove('hide')
        moonButton.classList.add('hide')
    }
    
}     
