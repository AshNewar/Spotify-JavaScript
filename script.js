console.log("STrat");
let songs=[];
let songNameList=Array.from(document.getElementsByClassName("songName"));
songNameList.forEach(ele=>{
    songs.push(ele.innerHTML);
});
console.log(songs);
let songIndex=1;
let master=document.getElementById("master");
let bar=document.getElementById("player");
let gif=document.getElementById("play1");
let onSong=document.getElementById("onSong");

let sound=new Audio("song/"+songIndex+".mp3");
let Playing=false;
master.addEventListener("click",()=>{
    console.log();

    if(sound.paused || sound.currentTime<=0){
        sound.play();
        Playing=true;
        Array.from(document.getElementsByClassName("show"))[songIndex-1].classList.replace("fa-play","fa-pause");
        master.classList.replace("fa-play","fa-pause");
        gif.style.opacity=1;
        onSong.innerHTML=songs[songIndex-1];
    }
    else{
        sound.pause();
        Playing=false;
        Array.from(document.getElementsByClassName("show"))[songIndex-1].classList.replace("fa-pause","fa-play");
        master.classList.replace("fa-pause","fa-play");
        gif.style.opacity=0;
    }
});
sound.addEventListener("timeupdate",()=>{
    var progress=parseInt((sound.currentTime/sound.duration)*100);
    bar.value=progress;
    if(progress===100){
        songIndex++;
        changeSong(songIndex);
    }
});
bar.addEventListener("change",()=>{
    sound.currentTime=(bar.value*sound.duration)/100;
    console.log(sound.currentTime);
});

function changeSong(index){
    sound.src="song/"+index+".mp3";
    sound.currentTime=0
    sound.play();
    Playing=true;
    makePause();
    Array.from(document.getElementsByClassName("show"))[songIndex-1].classList.replace("fa-play","fa-pause");
    master.classList.replace("fa-play","fa-pause");
    onSong.innerHTML=songs[index-1];
    gif.style.opacity=1;


}

let back=document.getElementById("back");
let front=document.getElementById("front");

back.addEventListener("click",()=>{
    if(songIndex==1){
        songIndex=11;
    }else{
        songIndex--; 
    }
    changeSong(songIndex);
});
 
front.addEventListener("click",()=>{
    if(songIndex==11){
        songIndex=1;
    }else{
        songIndex++; 
    }
    changeSong(songIndex);
})

// document
function makePause(){
    Array.from(document.getElementsByClassName("show")).forEach(ele=>{
        
        ele.classList.replace("fa-pause","fa-play");

            
    });
}
Array.from(document.getElementsByClassName("show")).forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        index=parseInt(e.target.id);
        if(songIndex===index && Playing){
            e.target.classList.replace("fa-pause","fa-play");
            sound.pause();
            Playing=false;
            master.classList.replace("fa-pause","fa-play");


        }
        else{
            if(songIndex===index && !Playing){
                sound.play();
                Playing=true;
                e.target.classList.replace("fa-play","fa-pause");

                master.classList.replace("fa-play","fa-pause");
                onSong.innerHTML=songs[index-1];
                gif.style.opacity=1;
            }
            else{
                makePause();
                e.target.classList.replace("fa-play","fa-pause");
                songIndex=index;
                changeSong(songIndex);
            } 
        }
    })
    

})
