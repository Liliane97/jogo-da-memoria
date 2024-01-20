const emojis = [
    "🐱",
    "🐱",
    "🦝",
    "🦝",
    "🦊",
    "🦊",
    "🐶",
    "🐶",
    "🐵",
    "🐵",
    "🦁",
    "🦁",
    "🐯",
    "🐯",
    "🐮",
    "🐮",
]

let openCards = [ ]
let modal = document.querySelector(".modal")

function  shuffle(){
    let shuffleEmojis = emojis.sort(()=> (Math.random() > 0.5 ? 2 : -1));

    document.querySelector(".game").innerHTML=""
    
    for(let i = 0; i < emojis.length ; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML =shuffleEmojis[i];
        box.onclick = handleClick
        
        document.querySelector(".game").appendChild(box)
    }
}

shuffle()



function playSound (audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume =0.2
    audio.play()
}

function handleClick() {
    if(openCards.length < 2  ) {
        this.classList.add("boxOpen")
        openCards.push(this) 
        playSound("mixkit-game-ball-tap-2073") 
    }

    if(openCards.length === 2 ){
        setTimeout(checkMatch,500)
    }

}

function checkMatch(){
    
    if(openCards[0].innerHTML === openCards[1].innerHTML && openCards[0] !== openCards[1]){
        openCards[0].classList.add("boxMatch")
        openCards[1].classList.add("boxMatch")
        playSound("mixkit-arcade-retro-changing-tab-206")
    }else{
        openCards[0].classList.remove("boxOpen")
        openCards[1].classList.remove("boxOpen")
        playSound("mixkit-arcade-mechanical-bling-210")
    }

    openCards =[]

   setTimeout(()=>{
       if(document.querySelectorAll(".boxMatch").length === emojis.length){
           modal.style.display="block"
           playSound("mixkit-casino-bling-achievement-2067")
       }
   },1000) 
}

function newGame (){
    modal.style.display="none"
    shuffle()
    playSound("mixkit-arcade-game-complete-or-approved-mission-205")
}
