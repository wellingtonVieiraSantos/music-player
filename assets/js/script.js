const playAudio = document.querySelector('.player')
const backAudio = document.querySelector('.back')
const skipMusic = document.querySelector('.skip')
const previuos = document.querySelector('.previuos')
const shuffle = document.querySelector('.shuffle')
const volume = document.querySelector('.volume')
const mute = document.querySelector('.mute')
const maxVol = document.querySelector('.max-vol')

const timer = document.querySelector('.timer')
const initialTime = document.querySelector('.initial-time')
const finalTime = document.querySelector('.final-time')
const img = document.querySelector('img')
const title = document.querySelector('.name')
const band = document.querySelector('.band')

const span = playAudio.querySelector('span')

let currentMusic = 0

const musics = [
    {
        'url': './assets/audio/audio1.mp3',
        'cover': './assets/img/capa.jpg',
        'band': 'Imagine Dragons',
        'music': 'Natural'
    },
    {
        'url': './assets/audio/audio2.mp3',
        'cover': './assets/img/capa2.jpg',
        'band': 'Metallica',
        'music': 'Nothing Else Matter'
    },
    {
        'url': './assets/audio/audio3.mp3',
        'cover': './assets/img/capa3.jpg',
        'band': 'Pink Floyd',
        'music': 'Another Brick in the Wall'
    },
    {
        'url': './assets/audio/audio4.mp3',
        'cover': './assets/img/capa4.jpg',
        'band': 'Bon Jovi',
        'music': "Livin' On A Player"
    },
    {
        'url': './assets/audio/audio5.mp3',
        'cover': './assets/img/capa5.jpg',
        'band': 'Ed Sheeran',
        'music': "I See Fire"
    }
]

const audioData = musics.map(music => {
    return new Audio(music.url)
});

const setHtml = ()=>{
    img.setAttribute('src', musics[currentMusic].cover)
    title.innerText = musics[currentMusic].music
    band.innerText = musics[currentMusic].band
}

const formatTime = (time) => {
    const minutes = Math.floor(time/60)
    const seconds = Math.floor(time%60)
    const formatedMin = String(minutes).padStart(2, '0')
    const formatedSec = String(seconds).padStart(2, '0')
    return `${formatedMin}:${formatedSec}`
}

setHtml()

audioData[currentMusic].addEventListener('timeupdate',()=>{
    timer.value = audioData[currentMusic].currentTime
    initialTime.innerText = formatTime(audioData[currentMusic].currentTime)
    if(audioData[currentMusic].currentTime == audioData[currentMusic].duration){
        skip()
    }
})

playAudio.addEventListener('click', ()=>{
    if(span.innerText === 'play_arrow'){
        span.innerText = 'pause'
        timer.max = Math.ceil(audioData[currentMusic].duration)
        finalTime.innerText = formatTime(audioData[currentMusic].duration)
        audioData[currentMusic].play()
        console.log(timer.max);        
    }else{
        span.innerText = 'play_arrow'
        audioData[currentMusic].pause()
    }
})

backAudio.addEventListener('click', ()=>{
    audioData[currentMusic].currentTime = 0
    timer.value = 0
})

timer.addEventListener('change', (e)=>{
    audioData[currentMusic].currentTime = e.target.value
    audioData[currentMusic].play()
    span.innerText = 'pause'
})

skipMusic.addEventListener('click', skip)

previuos.addEventListener('click',()=>{
    if(currentMusic > 0){
        audioData[currentMusic].pause()
        audioData[currentMusic].currentTime = 0
        currentMusic--
        audioData[currentMusic].play()
        span.innerText = 'pause'
        finalTime.innerText = formatTime(audioData[currentMusic].duration)
        timer.max = Math.ceil(audioData[currentMusic].duration)
        audioData[currentMusic].volume = volume.value 
        setHtml()

        audioData[currentMusic].addEventListener('timeupdate',()=>{
            timer.value = audioData[currentMusic].currentTime
            initialTime.innerText = formatTime(audioData[currentMusic].currentTime)
            if(audioData[currentMusic].currentTime == audioData[currentMusic].duration){
                skip()
            }
        })
        console.log(currentMusic);
    }else return
})

volume.addEventListener('change', (e)=>{
    audioData[currentMusic].volume = e.target.value
})

mute.addEventListener('click', ()=>{
    audioData[currentMusic].volume = 0
    volume.value = 0
})

maxVol.addEventListener('click', ()=>{
    audioData[currentMusic].volume = 1
    volume.value = 1
})

function skip(){
    if(currentMusic < audioData.length - 1){
        audioData[currentMusic].pause()
        audioData[currentMusic].currentTime = 0
        currentMusic++
        audioData[currentMusic].play()
        span.innerText = 'pause'
        finalTime.innerText = formatTime(audioData[currentMusic].duration)
        timer.max = Math.ceil(audioData[currentMusic].duration)
        audioData[currentMusic].volume = volume.value 
        setHtml()

        audioData[currentMusic].addEventListener('timeupdate',()=>{
            timer.value = audioData[currentMusic].currentTime
            initialTime.innerText = formatTime(audioData[currentMusic].currentTime)
            if(audioData[currentMusic].currentTime == audioData[currentMusic].duration){
                skip()
            }
        })
        console.log(currentMusic);
    }else return
}
