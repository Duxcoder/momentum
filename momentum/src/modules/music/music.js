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
        
    const domPlay = document.querySelector('.play');
    const domNext = document.querySelector('.play-next');
    const domPrev = document.querySelector('.play-prev');
    const domVolume = document.querySelector('.volume');
    const domTimeline = document.querySelector('.timeline');
    const domSlider = document.querySelector('.player-slider');
    const domNameMusic = document.querySelector('.marquee');
    const domTime = document.querySelector('.time-music');
        
        
    const renderPlaylist = (parentClass, appendClass) => {
        const domParent = document.querySelector(parentClass);
        musicPlaylist.forEach(trackData => {
        const li = document.createElement('li');
        li.textContent = trackData.name
        li.classList.add(appendClass);
        domPlaylistTracks.push(li);
        domParent.append(li);
        })
    }
        
    renderPlaylist('.play-list', 'play-item');
        
    document.addEventListener ('click',  (e) => player(e))
        
    const player = (e) => {
        const playMusicRender = (musicData, domTrack) => {
            playNow ? playNow.source.pause() : playNow = musicData;
            console.log('one')
            //   
            // 
            playNow = musicData;
            playNow.source.play();
            domPlaylistTracks.forEach(item => item.classList.remove('item-active'));
            domTrack.classList.add('item-active');
            domPlay.classList.add('pause');
            domNameMusic.textContent = playNow.name;
            domTime.textContent = `${playNow.source.currentTime}:${playNow.source.duration}`
            //   runTimeline();
        }
        const stopMusicRender = (domTrack) => {
            playNow.source.pause();
            playNow.source.currentTime = 0;
            domPlay.classList.remove('pause');
            domTrack.classList.remove('item-active');
        }

        domPlaylistTracks.forEach((domLiTrack, i) => {
            const clickOnPlaylist = () => {
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
                if (!playNow) { playMusicRender(musicPlaylist[0], domPlaylistTracks[0]) }
                else {
                    if (playNow.name === domLiTrack.textContent) {
                        playNow.source.paused ? playMusicRender(playNow, domLiTrack) : stopMusicRender(domLiTrack);
                    }
                }
            }
            const clickOnNext = () => {
                console.log(playNow, e.target)
                if (!playNow) {playMusicRender(musicPlaylist[1], domPlaylistTracks[1]);}
                if (playNow.name === domLiTrack.textContent) {
                    playMusicRender(musicPlaylist[i+2], domPlaylistTracks[i+2]);
                }
            }
            console.log(e.target)
            switch (e.target) {
                case domLiTrack: return clickOnPlaylist();
                case domPlay: return clickOnPlay();
                case domPrev: return 'x';
                case domNext: return clickOnNext();
                case domVolume: return 'z';
            }
            // if (e.target === domLiTrack) {
            //     if (playNow) {
            //         if (playNow.name === e.target.textContent) {
            //             console.log(playNow.name === e.target.textContent, 'playNow.name === e.target.textContent')
            //             playNow.source.paused ? playMusicRender(musicPlaylist[i], domLiTrack) : stopMusicRender(domLiTrack)
            //         } else {
            //             stopMusicRender(domLiTrack);
            //             playMusicRender(musicPlaylist[i], domLiTrack);
            //         }
            //     } else {
            //         playMusicRender(musicPlaylist[i], domLiTrack);
            //     }
            // }
            // if (e.target === domPlay) {
            //     if (!playNow) { playMusicRender(musicPlaylist[0], domPlaylistTracks[0]) }
            //     else {
            //         if (playNow.name === domLiTrack.textContent) {
            //             playNow.source.paused ? playMusicRender(playNow, domLiTrack) : stopMusicRender(domLiTrack);
            //         }
            //     }
            // }
        });
    }
}

export default Music