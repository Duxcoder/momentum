import bird from '../../assets/sounds/bird music.mp3'
import onime from '../../assets/sounds/onime-music.mp3'
import wind from '../../assets/sounds/wind-music.mp3'
import funeral from '../../assets/sounds/funeral-music.mp3'

const Music = () => {
    const domPlayer = document.querySelector('.player');
    const domPlayerControls = domPlayer.querySelector('.player-controls');
    const domPlay = domPlayerControls.querySelector('.play');
    const domStop = domPlayerControls.querySelector('.stop');
    const domNext = domPlayerControls.querySelector('.play-next');
    const domPrev = domPlayerControls.querySelector('.play-prev');
    const domVolume = domPlayerControls.querySelector('.volume');
    const domRegulator = domPlayerControls.querySelector('.volume-regulator');
    const domRange = domRegulator.querySelector('.volume_range');
    const domTimeline = domPlayer.querySelector('.timeline');
    const domTimelineActive = domTimeline.querySelector('.timeline_active');
    const domSelectPoint = domTimeline.querySelector('.select-point');
    const domSlider = domTimeline.querySelector('.player-slider');
    const domNameMusic = domPlayer.querySelector('.marquee');
    const domTime = domPlayer.querySelector('.time-music');
    const domPlayList = domPlayer.querySelector('.play-list');
    const styleDomTimeline = window.getComputedStyle(domTimeline);
    const styleSelectP = window.getComputedStyle(domSelectPoint);

    const musicPlaylist = [
        { name: 'The breath of the birds', music: bird, id: 0 },
        { name: 'The groan of life', music: onime, id: 1 },
        { name: 'Wind of unrest', music: wind, id: 2 },
        { name: 'Death funeral', music: funeral, id: 3 }
    ];
    let playNow;
    let domPlaylistTracks = [];
    let muted = false;
    let volumeLevel = 0.5;

    const addingZero = (num) => num < 10 ? `0${num}` : num;

    const looperRangeNumber = (from, to, number) => {
        if (number > to) return from
        if (number < from) return to
        return number
    }

    const createNode = (node, className, content = '') => {
        const domNode = document.createElement(node);
        domNode.textContent = content;
        domNode.classList.add(className);
        return domNode;
    };

    const getTime = function (source) {
        return {
            minutes: addingZero(Math.floor(source / 60)),
            seconds: addingZero(Math.round(source) % 60)
        }
    }

    const renderMusic = (trackData, index) => {
        const li = createNode('li', 'play-item', trackData.name);
        li.setAttribute('key', index);
        domPlaylistTracks.push(li);
        domPlayList.append(li);
    };

    const renderPlaylist = () => musicPlaylist.forEach(renderMusic);

    const showTooltip = (e) => {
        const tooltipTimelinePosition = parseInt(styleSelectP.width, 10) / 2;
        domSelectPoint.style.marginLeft = `${e.layerX - tooltipTimelinePosition}px`;
        domSelectPoint.classList.add('active');
        let timePointer = Math.abs((e.layerX * playNow.source.duration) / parseInt(styleDomTimeline.width, 10))
        domSelectPoint.textContent = `${getTime(timePointer).minutes}:${getTime(timePointer).seconds}`
    }

    const hideTooltip = () => domSelectPoint.classList.remove('active');

    const clickOnTimeline = (e) => {
        const x = e.layerX * playNow.source.duration / 180;
        playNow.source.currentTime = x;
    }

    const showRangeVolume = () => !muted && domRange.classList.add('active');
    const hideRangeVolume = () => domRange.classList.remove('active');
    const setRangeVolume = () => {
        !muted && domRange.classList.add('active');
        volumeLevel = +domRange.value;
    }

    const timeUpdate = () => {
        const timeNow = {
            min: getTime(playNow.source.currentTime).minutes,
            sec: getTime(playNow.source.currentTime).seconds
        }
        const timeDuration = {
            min: getTime(playNow.source.duration).minutes,
            sec: getTime(playNow.source.duration).seconds
        }
        domTime.textContent =
            `${timeNow.min}:${timeNow.sec} / ${timeDuration.min}:${timeDuration.sec}`
    }

    const setVolume = () => {
        playNow.source.muted = muted;
        playNow.source.volume = volumeLevel;
    }
    const setSliderPosition = () => {
        const end = playNow.source.duration;
        let coefficient = parseInt(styleDomTimeline.width, 10) / end;
        let value = Math.round(coefficient * playNow.source.currentTime);
        domSlider.style.transform = `translate(${Math.round(value)}px, 0px)`;
        domTimelineActive.style.width = `${Math.round(value)}px`;

    }
    const processMusic = () => {
        setVolume();
        setSliderPosition();
        timeUpdate();
    }

    const clickOnStop = () => {
        playNow.source.pause();
        playNow.source.currentTime = 0;
    }

    const playMusic = () => playNow.source.play();
    const pauseMusic = () => playNow.source.pause();
    const isPaused = () => playNow.source.paused;
    const clickOnPlay = () => isPaused() ? playMusic() : pauseMusic();
    const clickOnNextPrev = (isNext) => {
        const direction = isNext ? 1 : -1;
        const index = looperRangeNumber(0, musicPlaylist.length - 1, playNow.id + direction);
        const selectedMusic = musicPlaylist[index];
        clickOnMusicPlaylist(selectedMusic);
    }

    const clickOnVolume = () => {
        muted = !muted
        domVolume.classList.toggle('mute')
        muted ? domRange.classList.remove('active') : domRange.classList.add('active')
    }

    const handlerPlay = function () {
        const domTrack = domPlaylistTracks.find((music) => +music.getAttribute('key') === playNow.id);
        domNameMusic.textContent = playNow.name;
        domPlaylistTracks.forEach((music) => music.classList.remove('select', 'item-active'));
        playNow.source.addEventListener('timeupdate', processMusic);
        domPlay.classList.add('pause');
        domTrack.classList.add('select');
        domTrack.classList.add('item-active');
    }
    const handlerPause = function () {
        const domTrack = domPlaylistTracks.find((music) => +music.getAttribute('key') === playNow.id);
        domPlaylistTracks.forEach((music) => music.classList.remove('select', 'item-active'));
        domPlay.classList.remove('pause');
        domTrack.classList.add('select');
        domTrack.classList.remove('item-active');
    }

    const clickOnMusicPlaylist = (selectedMusic) => {
        if (playNow) clickOnStop();
        playNow = selectedMusic;
        clickOnPlay();
    }

    const player = (e) => {

        domPlaylistTracks.forEach((domLiTrack, i) => {
            if (domLiTrack === e.target) clickOnMusicPlaylist(musicPlaylist[i]);
        });

        switch (e.target) {
            case domPlay: return clickOnPlay();
            case domStop: return clickOnStop();
            case domPrev: return clickOnNextPrev(false);
            case domNext: return clickOnNextPrev(true);
            case domVolume: return clickOnVolume();
        }
    }

    const initPlayer = () => {
        musicPlaylist.forEach(item => item.source = new Audio(item.music));
        renderPlaylist();
        playNow = musicPlaylist[0];
        domPlaylistTracks[0].classList.add('select');
        playNow.source.addEventListener('loadeddata', timeUpdate);
        domNameMusic.textContent = playNow.name;
        domTimeline.addEventListener('mousemove', showTooltip);
        domTimeline.addEventListener('mouseout', hideTooltip);
        domPlayer.addEventListener('click', (e) => player(e));
        domTimeline.addEventListener('click', clickOnTimeline);
        domVolume.addEventListener('mouseover', showRangeVolume);
        domRange.addEventListener('input', setRangeVolume);
        domPlayerControls.addEventListener('mouseleave', hideRangeVolume);
        musicPlaylist.forEach(music => music.source.addEventListener('play', handlerPlay));
        musicPlaylist.forEach(music => music.source.addEventListener('pause', handlerPause));
    }

    initPlayer();
}

export default Music