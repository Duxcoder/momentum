import bird from '../../assets/sounds/bird-music.mp3' 
import onime from '../../assets/sounds/onime-music.mp3' 
import wind from '../../assets/sounds/wind-music.mp3' 
import funeral from '../../assets/sounds/funeral-music.mp3'

const Music = () => {
    const musicPlaylist = [
        {name: 'The breath of the birds', music: bird},
        {name: 'The groan of life', music: onime},
        {name: 'Wind of unrest',music: wind},
        {name: 'Death funeral', music: funeral}
    ];
    musicPlaylist.forEach(item => item.source = new Audio(item.music));
    let playNow;
    let domPlaylistTracks = [];
    let muted = false;
    let volumeLevel = 0.5;
    const domPlay = document.querySelector('.play');
    const domNext = document.querySelector('.play-next');
    const domPrev = document.querySelector('.play-prev');
    const domRegulator= document.querySelector('.volume-regulator');
    const domPlayerControls = document.querySelector('.player-controls')
    const domVolume = document.querySelector('.volume');
    const domRange = document.querySelector('.volume_range');
    const domTimeline = document.querySelector('.timeline');
    const domTimelineActive = document.querySelector('.timeline_active')
    const styleDomTimeline = window.getComputedStyle(domTimeline);
    const domSlider = document.querySelector('.player-slider');
    const domNameMusic = document.querySelector('.marquee');
    const domTime = document.querySelector('.time-music');
    const domSelectPoint = document.querySelector('.select-point');
    const styleSelectP = window.getComputedStyle(domSelectPoint);
        
    const getTime = (source) => {
        const isZero = (num) => num < 10 ? `0${num}` : num
        const time = {
            minutes: isZero(Math.floor(source / 60)),
            seconds: isZero(Math.round(source) % 60)
        }
        return time
    }

    const renderPlaylist = (parentClass, appendClass) => {
        const domParent = document.querySelector(parentClass);
        musicPlaylist.forEach(trackData => {
        const li = document.createElement('li');
        li.textContent = trackData.name;
        li.classList.add(appendClass);
        domPlaylistTracks.push(li);
        domParent.append(li);
        })
    }
        
    renderPlaylist('.play-list', 'play-item');
        
    document.addEventListener ('click',  (e) => player(e));
    const marginLeft = parseInt(styleSelectP.width, 10) / 2;
    domTimeline.addEventListener('mousemove', (e) => {
        domSelectPoint.style.marginLeft = `${e.layerX - marginLeft}px`;
        domSelectPoint.classList.add('active');
        let timePointer = Math.abs((e.layerX * playNow.source.duration) / parseInt(styleDomTimeline.width, 10))
        domSelectPoint.textContent = `${getTime(timePointer).minutes}:${getTime(timePointer).seconds}`
    });
    domTimeline.addEventListener('mouseout', (e) => {
        domSelectPoint.classList.remove('active');
    });
    const clickOnTimeline = (e) => {
        const x = e.layerX * playNow.source.duration / 180;
        playNow.source.currentTime = x;
        sliderPosition = e.layerX ;
        console.dir(playNow.source);
    }
    domTimeline.addEventListener('click', (e) => clickOnTimeline(e));

    domVolume.addEventListener('mouseover', (e) => {
        if (!muted) {
            domRange.classList.add('active');
            domRange.addEventListener('input', (e) => {
                if (!muted) {
                    domRange.classList.add('active');
                    volumeLevel = +domRange.value
                } 
            })
        } 
    })
    
    document.addEventListener('mouseover', (e) => {
            if (e.target !== domVolume && 
                e.target !== domRegulator &&
                e.target !== domRange &&
                !e.target.classList.contains('.volume-wrapper')) {
                domRange.classList.remove('active');
            }
    })

    const player = (e) => {
        const timeUpdate = () => {
            const timeNow = {
                minutes: getTime(playNow.source.currentTime).minutes,
                seconds: getTime(playNow.source.currentTime).seconds
            }
            const timeDuration = {
                minutes: getTime(playNow.source.duration).minutes,
                seconds: getTime(playNow.source.duration).seconds
            }
            domTime.textContent = 
            `${timeNow.minutes}:${timeNow.seconds} / ${timeDuration.minutes}:${timeDuration.seconds}`
        }
        const playMusicRender = (musicData, domTrack) => {
            if (playNow) {
                playNow.source.pause()
            }
            playNow = musicData;
            playNow.source.currentTime = 0;
            playNow.source.play();
            domPlaylistTracks.forEach(item => item.classList.remove('item-active'));
            domTrack.classList.add('item-active');
            domPlay.classList.add('pause');
            domNameMusic.textContent = playNow.name;
            // const end = playNow.source.duration;
            // const oneStep = parseInt(styleDomTimeline.width, 10) / end;
            // let value = 0;
            // let step = Math.round(playNow.source.currentTime)
            const startSlider = () => {
                timeUpdate();
                   playNow.source.muted = muted;
                   playNow.source.volume = volumeLevel;
                // let stepTwo = Math.round(playNow.source.currentTime)
                // if (step !== stepTwo){ // если музыка играет слайдер движется
                //     step = stepTwo;
                //     // value += oneStep;
                //     if (sliderPosition) {
                //         value = sliderPosition; sliderPosition = 0
                //     } else {value += oneStep}
                //     domSlider.style.transform = `translate(${Math.round(value)}px, 0px)`
                //     console.log( domSlider.style.transform, value, playNow.source.ended)
                //     if (Math.round(end) === step) {
                //         clickOnNextPrev();
                //         playNow.source.removeEventListener('timeupdate', startSlider);
                //     }
                // }
                const end = playNow.source.duration;
                let coeff = parseInt(styleDomTimeline.width, 10) / end;
                let value = Math.round(coeff * playNow.source.currentTime);
                    domSlider.style.transform = `translate(${Math.round(value)}px, 0px)`;
                    domTimelineActive.style.width = `${Math.round(value)}px`
                if (Math.round(end) === Math.round(playNow.source.currentTime)) {
                    clickOnNextPrev();
                }
            }
            playNow.source.addEventListener('timeupdate', startSlider);
            
        }

        const stopMusicRender = (domTrack) => {
            playNow.source.pause();
            playNow.source.currentTime = 0;
            domPlay.classList.remove('pause');
            domTrack.classList.remove('item-active');
        }

        const clickOnPlaylist = (domLiTrack, i) => {
                if (playNow) {
                    if (playNow.name === e.target.textContent) {
                        playNow.source.paused ? playMusicRender(musicPlaylist[i], domLiTrack) : stopMusicRender(domLiTrack)
                    } else {
                        stopMusicRender(domLiTrack);
                        playMusicRender(musicPlaylist[i], domLiTrack);
                    }
                } else {
                    playMusicRender(musicPlaylist[i], domLiTrack);
                }
        }
        const clickOnPlay = () => {
            domPlaylistTracks.forEach((domLiTrack, i) => {
                if (!playNow) { playMusicRender(musicPlaylist[0], domPlaylistTracks[0]) }
                else {
                    if (playNow.name === domLiTrack.textContent) {
                        playNow.source.paused ? playMusicRender(playNow, domLiTrack) : stopMusicRender(domLiTrack);
                    }
                }
            });
        }
        const clickOnNextPrev = (next = true) => {
            const lastIndexTrack = musicPlaylist.length - 1
            const iMusicStart = next ? 1 : lastIndexTrack
            if (!playNow) {
                playMusicRender(musicPlaylist[iMusicStart], domPlaylistTracks[iMusicStart]);
            }
            else  {
                for (let index of musicPlaylist.keys()){
                    let iMusic = next ? index + 1 : index - 1
                    if (musicPlaylist[index] === playNow) {
                        if (next && index === lastIndexTrack) {iMusic = 0};
                        if (!next && index === 0) {iMusic = lastIndexTrack};
                        return playMusicRender(musicPlaylist[iMusic], domPlaylistTracks[iMusic]);
                    }
                }
            }
        }

        const clickOnVolume = () => {
            muted = !muted
            domVolume.classList.toggle('mute')
            muted ? domRange.classList.remove('active') : domRange.classList.add('active')
        }

        domPlaylistTracks.forEach((domLiTrack, i) => { 
            if (domLiTrack === e.target) clickOnPlaylist(domLiTrack, i);
        });

        
        switch (e.target) {
            case domPlay: return clickOnPlay();
            case domPrev: return clickOnNextPrev(false);
            case domNext: return clickOnNextPrev();
            case domVolume: return clickOnVolume();
        }

    }
}

export default Music