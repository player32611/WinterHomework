const cookie = `00176D5FF57DEF134A4A72D1E1836655FD395B257985DE5459E7E2C42B7225DF1223FF3BB3173A93C708B103275ECC92CAA68BEB3F8D2DC46374B815F950AD3F2AB4ED9A99AADEF966071B0AE6E28D4E8F26B2CBA8CDA0186C3D63F89721BE43135A33E4F3977526837800175E5A5973314CFEA70C4D294AE8E427BB39880FE90875CC0625AEFBD0100C0DCE45D98E1CA6B966FE078A435A2CA274B846E8A61C5714A1C799014401AA9054E3606CE3B84E5A0DB95833383D804511B981E17B4B69BBE20503AE90568BCF79A53737D9CAE3D05463F95DD8B34CE41608E58067121AB6219BEA37F761749AC6644727853A623CC53B297C9C6A00005F0C23AF2A88817E181D974CC3DD79CB8CC0D8D0BE0BEAC4511D12CE43E46084A81713A3D6FE31B58944F09161624AD5813885FCFC842810ADC0BB5F5C0572DC518959294435602C72B41BFB7368FAC608739CA2EFD675091B23BF806E2A7AFE81F09B9DEA61F9`
const uid = `4919121947`
//搜索
const headSearchSearchbar = document.getElementById('head-search-searchbar')
fetch(`http://localhost:3000/search/default`, {
    method: 'GET'
})
    .then((res) => {
        if (!res.ok) {
            throw new Error(`请求失败，状态码: ${res.status}`)
        }
        return res.json()
    })
    .then((data) => {
        headSearchSearchbar.placeholder = data.data.showKeyword
    })//获取搜索建议
const hotsearchlists = document.getElementById('hotsearchlists')
headSearchSearchbar.addEventListener('click', function () {
    hotsearchlists.style.display = 'block'
    document.addEventListener('click', handleClickOutside)
})//显示热搜榜
function handleClickOutside(event) {
    if (!hotsearchlists.contains(event.target) && !headSearchSearchbar.contains(event.target)) {
        hotsearchlists.style.display = 'none'
        document.removeEventListener('click', handleClickOutside)
    }
}//移除热搜榜
fetch(`http://localhost:3000/search/hot/detail`, {
    method: 'GET'
})
    .then((res) => {
        if (!res.ok) {
            throw new Error(`请求失败，状态码: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        const long = data.data.length
        for (i = 0; i < long; i++) {
            if (i <= 2) {
                hotsearchlists.innerHTML += `
            <div class="hotsearchlist">
                <div class="hotsearchlist-number" style = "color: #FF3A3A;">${i + 1}</div>
                <div class="hotsearchlist-text">${data.data[i].searchWord}</div>
            </div>`
            }
            else {
                hotsearchlists.innerHTML += `
            <div class="hotsearchlist">
                <div class="hotsearchlist-number">${i + 1}</div>
                <div class="hotsearchlist-text">${data.data[i].searchWord}</div>
            </div>`
            }
        }//获取热搜榜
        const hotsearchlistsChildrens = document.querySelectorAll('.hotsearchlist')
        hotsearchlistsChildrens.forEach(hotsearchlistsChildren => {
            hotsearchlistsChildren.addEventListener('click', function () {
                const headSearchSearchbar = document.getElementById('head-search-searchbar')
                headSearchSearchbar.value = hotsearchlistsChildren.children[1].textContent
                ClickSearchButtom()
            })
        })//点击热搜榜
    })
const headSearchSearchbuttom = document.getElementById('head-search-searchbuttom')
const searchResult = document.getElementById('search-result')
function ClickSearchButtom() {
    hotsearchlists.style.display = 'none'
    document.removeEventListener('click', handleClickOutside)
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'block'
    }
    const headSearchSearchbar = document.getElementById('head-search-searchbar')
    const searchword = headSearchSearchbar.value
    const searchResultSearchword = document.getElementById('search-result-searchword')
    searchResultSearchword.textContent = searchword
    fetch(`http://localhost:3000/cloudsearch?keywords=${searchword}`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const searchResultAllSongsSongs = document.getElementById('search-result-all-songs-songs')
            searchResultAllSongsSongs.innerHTML = ``
            for (i = 0; i <= 5; i++) {
                searchResultAllSongsSongs.innerHTML += `
                <div id="search-result-all-songs-songs-song">
                    <div id="search-result-all-songs-songs-song-songcover" style="background-image:url(${data.result.songs[i].al.picUrl});">
                        <div id="search-result-all-songs-songs-song-songid">${data.result.songs[i].id}</div>
                    </div>
                    <div id="search-result-all-songs-songs-song-songname">${data.result.songs[i].name}</div>
                    <div id="search-result-all-songs-songs-song-songauthor">${data.result.songs[i].ar[0].name}</div>
                </div>`
            }
            const searchResultSongsSongs = document.getElementById('search-result-songs-songs')
            searchResultSongsSongs.innerHTML = ``
            for (i = 0; i < data.result.songs.length; i++) {
                const time = convertMillisecondsToMinutesAndSeconds(data.result.songs[i].dt)
                searchResultSongsSongs.innerHTML += `
                <div id="search-result-songs-songs-song">
                    <div id="search-result-songs-songs-song-number">${i + 1}</div>
                    <div id="search-result-songs-songs-song-title">
                        <img src="${data.result.songs[i].al.picUrl}" height="40px" width="40px">
                        <div id="search-result-songs-songs-song-title-name">${data.result.songs[i].name}</div>
                        <div id="search-result-songs-songs-song-title-author">${data.result.songs[i].ar[0].name}</div>
                    </div>
                    <div id="search-result-songs-songs-song-album">${data.result.songs[i].al.name}</div>
                    <div id="search-result-songs-songs-song-like"></div>
                    <div id="search-result-songs-songs-song-id">${data.result.songs[i].id}</div>
                    <div id="search-result-songs-songs-song-long">${time}</div>
                </div>`
            }
            const searchResultAllSongsSongsSongs = document.querySelectorAll('#search-result-all-songs-songs-song')
            searchResultAllSongsSongsSongs.forEach(searchResultAllSongsSongsSong => {
                searchResultAllSongsSongsSong.addEventListener('click', function () {
                    const songid = searchResultAllSongsSongsSong.children[0].children[0].textContent
                    fetch(`http://localhost:3000/song/detail?ids=${songid}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            songsimageurllist.push(data.songs[0].al.picUrl)
                            songsnamelist.push(data.songs[0].name)
                            songsauthorlist.push(data.songs[0].ar[0].name)
                            songalbumlist.push(data.songs[0].al.name)
                            songsidlist.push(data.songs[0].id)
                        })
                    fetch(`http://localhost:3000/song/url?id=${songid}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            currentSongIndex = songsurllist.length
                            songsurllist.push(data.data[0].url)
                            ReloadPlaylistSongs()
                            loadSong(currentSongIndex)
                            bottomMusic.play()
                            bottomPlayPauseButton.classList.replace("play", "pause")
                            playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                        })
                })
            })
            const searchResultSongsSongsSong = document.querySelectorAll('#search-result-songs-songs-song')
            searchResultSongsSongsSong.forEach(onesearchResultSongsSongsSong => {
                onesearchResultSongsSongsSong.addEventListener('click', function () {
                    const songid = onesearchResultSongsSongsSong.children[4].textContent
                    fetch(`http://localhost:3000/song/detail?ids=${songid}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            songsimageurllist.push(data.songs[0].al.picUrl)
                            songsnamelist.push(data.songs[0].name)
                            songsauthorlist.push(data.songs[0].ar[0].name)
                            songalbumlist.push(data.songs[0].al.name)
                            songsidlist.push(data.songs[0].id)
                        })
                    fetch(`http://localhost:3000/song/url?id=${songid}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            currentSongIndex = songsurllist.length
                            songsurllist.push(data.data[0].url)
                            loadSong(currentSongIndex)
                            ReloadPlaylistSongs()
                            bottomMusic.play()
                            bottomPlayPauseButton.classList.replace("play", "pause")
                            playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                        })
                })
            })
        })//单曲
    fetch(`http://localhost:3000/cloudsearch?keywords=${searchword}&type=1000`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const searchResultAllPlaylistsPlaylists = document.getElementById('search-result-all-playlists-playlists')
            searchResultAllPlaylistsPlaylists.innerHTML = ``
            for (i = 0; i <= 5; i++) {
                searchResultAllPlaylistsPlaylists.innerHTML += `
                <div id="search-result-all-playlists-playlists-playlist" class="playlist">
                    <div id="search-result-all-playlists-playlists-playlistcover" style="background-image:url(${data.result.playlists[i].coverImgUrl});">
                        <div id="search-result-all-playlists-playlists-playlistcover-id">${data.result.playlists[i].id}</div>
                        <div id="search-result-all-playlists-playlists-playlistcover-playcount">🎧${data.result.playlists[i].playCount}</div>
                    </div>
                    <div id="search-result-all-playlists-playlists-playlistinformation">
                        <div id="search-result-all-playlists-playlists-playlistinformation-playlistname">${data.result.playlists[i].name}</div>
                        <div id="search-result-all-playlists-playlists-playlistinformation-playlistauthor">${data.result.playlists[i].creator.nickname}</div>
                    </div>
                </div>`
            }
            const searchResultPlaylistsPlaylists = document.getElementById('search-result-playlists-playlists')
            searchResultPlaylistsPlaylists.innerHTML = ``
            for (i = 0; i < data.result.playlists.length; i++) {
                searchResultPlaylistsPlaylists.innerHTML += `
                    <div id="search-result-playlists-playlists-playlist">
                        <div id="search-result-playlists-playlists-playlist-playlistid">${data.result.playlists[i].id}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistnumber">${i + 1}</div>
                        <div id="search-result-playlists-playlists-playlist-playlisttitle">
                            <img src="${data.result.playlists[i].coverImgUrl}" alt="cover">
                            <div id="search-result-playlists-playlists-playlist-playlistname">${data.result.playlists[i].name}</div>
                        </div>
                        <div id="search-result-playlists-playlists-playlist-playlistamount">${data.result.playlists[i].trackCount}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistcreator">${data.result.playlists[i].creator.nickname}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistplaycount">${data.result.playlists[i].playCount}</div>
                    </div>
                    `
            }
            const playlists = document.querySelectorAll('.playlist')
            playlists.forEach(playlist => {
                playlist.addEventListener('click', function () {
                    rightFeatures.style.display = 'none'
                    searchResult.style.display = 'none'
                    playlistDetails.style.display = 'block'
                    const id = playlist.children[0].children[0].textContent
                    //获取歌单详情
                    fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            {
                                const playlistcover = document.getElementById('playlist-cover')
                                const cover = data.playlist.coverImgUrl
                                playlistcover.style.backgroundImage = `url('${cover}')`
                            }
                            {
                                const playlistid = document.getElementById('playlist-id')
                                const id = data.playlist.id
                                playlistid.textContent = id
                            }
                            {
                                const playlistname = document.getElementById('playlist-name')
                                const name = data.playlist.name
                                playlistname.textContent = name
                            }
                            {
                                const playlistdescription = document.getElementById('playlist-description')
                                const description = data.playlist.description
                                playlistdescription.textContent = description
                            }
                            {
                                const playlistcreatorimage = document.getElementById('playlist-creatorimage')
                                const creatorimage = data.playlist.creator.avatarUrl
                                playlistcreatorimage.style.backgroundImage = `url('${creatorimage}')`
                            }
                            {
                                const playlistcreatorname = document.getElementById('playlist-creatorname')
                                const creatorname = data.playlist.creator.nickname
                                playlistcreatorname.textContent = creatorname
                            }
                        })
                    //获取歌单全部歌曲
                    fetch(`http://localhost:3000/playlist/track/all?id=${id}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            const songs = document.getElementById('playlist-details-songs')
                            const length = data.songs.length
                            const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
                            playlistDetailsTypesSongs.innerHTML = `歌曲<sup>${length}</sup>`
                            songs.innerHTML = ``
                            function convertMillisecondsToMinutesAndSeconds(milliseconds) {
                                const totalSeconds = Math.floor(milliseconds / 1000)
                                const minutes = Math.floor(totalSeconds / 60)
                                const seconds = totalSeconds % 60
                                const formattedSeconds = String(seconds).padStart(2, '0')
                                return `${minutes}:${formattedSeconds}`
                            }//时间转换
                            for (i = 0; i < length; i++) {
                                const time = convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)
                                songs.innerHTML += `
                <div class="playlist-song">
                    <div class = "song-number">${i + 1}</div>
                    <div class = "song-title">
                       <img src = "${data.songs[i].al.picUrl}" height = "40px" width = "40px">
                       <div class = "song-name">${data.songs[i].name}</div>
                       <div class = "song-author">${data.songs[i].ar[0].name}</div>
                    </div>
                    <div class = "song-album">${data.songs[i].al.name}</div>
                    <div class = "song-like"></div>
                    <div class = "song-id">${data.songs[i].id}</div>
                    <div class = "song-long">${time}</div>
                </div> `
                            }
                            clickPlaylistSong()
                        })
                })
            })
            const searchResultPlaylistsPlaylistsPlaylist = document.querySelectorAll('#search-result-playlists-playlists-playlist')
            searchResultPlaylistsPlaylistsPlaylist.forEach(playlist => {
                playlist.addEventListener('click', function () {
                    rightFeatures.style.display = 'none'
                    searchResult.style.display = 'none'
                    playlistDetails.style.display = 'block'
                    const id = playlist.children[0].textContent
                    //获取歌单详情
                    fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            {
                                const playlistcover = document.getElementById('playlist-cover')
                                const cover = data.playlist.coverImgUrl
                                playlistcover.style.backgroundImage = `url('${cover}')`
                            }
                            {
                                const playlistid = document.getElementById('playlist-id')
                                const id = data.playlist.id
                                playlistid.textContent = id
                            }
                            {
                                const playlistname = document.getElementById('playlist-name')
                                const name = data.playlist.name
                                playlistname.textContent = name
                            }
                            {
                                const playlistdescription = document.getElementById('playlist-description')
                                const description = data.playlist.description
                                playlistdescription.textContent = description
                            }
                            {
                                const playlistcreatorimage = document.getElementById('playlist-creatorimage')
                                const creatorimage = data.playlist.creator.avatarUrl
                                playlistcreatorimage.style.backgroundImage = `url('${creatorimage}')`
                            }
                            {
                                const playlistcreatorname = document.getElementById('playlist-creatorname')
                                const creatorname = data.playlist.creator.nickname
                                playlistcreatorname.textContent = creatorname
                            }
                        })
                    //获取歌单全部歌曲
                    fetch(`http://localhost:3000/playlist/track/all?id=${id}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            const songs = document.getElementById('playlist-details-songs')
                            const length = data.songs.length
                            const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
                            playlistDetailsTypesSongs.innerHTML = `歌曲<sup>${length}</sup>`
                            songs.innerHTML = ``
                            for (i = 0; i < length; i++) {
                                const time = convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)
                                songs.innerHTML += `
                <div class="playlist-song">
                    <div class = "song-number">${i + 1}</div>
                    <div class = "song-title">
                       <img src = "${data.songs[i].al.picUrl}" height = "40px" width = "40px">
                       <div class = "song-name">${data.songs[i].name}</div>
                       <div class = "song-author">${data.songs[i].ar[0].name}</div>
                    </div>
                    <div class = "song-album">${data.songs[i].al.name}</div>
                    <div class = "song-like"></div>
                    <div class = "song-id">${data.songs[i].id}</div>
                    <div class = "song-long">${time}</div>
                </div> `
                            }
                            clickPlaylistSong()
                        })
                })
            })
        })
}
headSearchSearchbuttom.addEventListener("click", function () {
    const headSearchSearchbar = document.getElementById('head-search-searchbar')
    if (headSearchSearchbar.value == "") {
        alert('请输入内容')
    }
    else {
        const searchword = headSearchSearchbar.value
        const searchResultSearchword = document.getElementById('search-result-searchword')
        searchResultSearchword.textContent = searchword
        {
            leftRecommend.style.backgroundColor = '#f1f1f1'
            leftRecommend.style.color = '#50596B'
            leftFeature.style.backgroundColor = '#f1f1f1'
            leftFeature.style.color = '#50596B'
            leftPodcast.style.backgroundColor = '#f1f1f1'
            leftPodcast.style.color = '#50596B'
        }
        {
            rightRecommends.style.display = 'none'
            rightFeatures.style.display = 'none'
            rightPodcasts.style.display = 'none'
        }
        {
            playlistDetails.style.display = 'none'
            searchResult.style.display = 'block'
        }
        fetch(`http://localhost:3000/cloudsearch?keywords=${searchword}`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`请求失败，状态码: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const searchResultAllSongsSongs = document.getElementById('search-result-all-songs-songs')
                searchResultAllSongsSongs.innerHTML = ``
                for (i = 0; i <= 5; i++) {
                    searchResultAllSongsSongs.innerHTML += `
                <div id="search-result-all-songs-songs-song">
                    <div id="search-result-all-songs-songs-song-songcover" style="background-image:url(${data.result.songs[i].al.picUrl});">
                        <div id="search-result-all-songs-songs-song-songid">${data.result.songs[i].id}</div>
                    </div>
                    <div id="search-result-all-songs-songs-song-songname">${data.result.songs[i].name}</div>
                    <div id="search-result-all-songs-songs-song-songauthor">${data.result.songs[i].ar[0].name}</div>
                </div>`
                }
                const searchResultSongsSongs = document.getElementById('search-result-songs-songs')
                searchResultSongsSongs.innerHTML = ``
                for (i = 0; i < data.result.songs.length; i++) {
                    const time = convertMillisecondsToMinutesAndSeconds(data.result.songs[i].dt)
                    searchResultSongsSongs.innerHTML += `
                <div id="search-result-songs-songs-song">
                    <div id="search-result-songs-songs-song-number">${i + 1}</div>
                    <div id="search-result-songs-songs-song-title">
                        <img src="${data.result.songs[i].al.picUrl}" height="40px" width="40px">
                        <div id="search-result-songs-songs-song-title-name">${data.result.songs[i].name}</div>
                        <div id="search-result-songs-songs-song-title-author">${data.result.songs[i].ar[0].name}</div>
                    </div>
                    <div id="search-result-songs-songs-song-album">${data.result.songs[i].al.name}</div>
                    <div id="search-result-songs-songs-song-like"></div>
                    <div id="search-result-songs-songs-song-id">${data.result.songs[i].id}</div>
                    <div id="search-result-songs-songs-song-long">${time}</div>
                </div>`
                }
                const searchResultAllSongsSongsSongs = document.querySelectorAll('#search-result-all-songs-songs-song')
                searchResultAllSongsSongsSongs.forEach(searchResultAllSongsSongsSong => {
                    searchResultAllSongsSongsSong.addEventListener('click', function () {
                        const songid = searchResultAllSongsSongsSong.children[0].children[0].textContent
                        fetch(`http://localhost:3000/song/detail?ids=${songid}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                songsimageurllist.push(data.songs[0].al.picUrl)
                                songsnamelist.push(data.songs[0].name)
                                songsauthorlist.push(data.songs[0].ar[0].name)
                                songalbumlist.push(data.songs[0].al.name)
                                songsidlist.push(data.songs[0].id)
                            })
                        fetch(`http://localhost:3000/song/url?id=${songid}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                currentSongIndex = songsurllist.length
                                songsurllist.push(data.data[0].url)
                                loadSong(currentSongIndex)
                                ReloadPlaylistSongs()
                                bottomMusic.play()
                                bottomPlayPauseButton.classList.replace("play", "pause")
                                playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                            })
                    })
                })
                const searchResultSongsSongsSong = document.querySelectorAll('#search-result-songs-songs-song')
                searchResultSongsSongsSong.forEach(onesearchResultSongsSongsSong => {
                    onesearchResultSongsSongsSong.addEventListener('click', function () {
                        const songid = onesearchResultSongsSongsSong.children[4].textContent
                        fetch(`http://localhost:3000/song/detail?ids=${songid}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                songsimageurllist.push(data.songs[0].al.picUrl)
                                songsnamelist.push(data.songs[0].name)
                                songsauthorlist.push(data.songs[0].ar[0].name)
                                songalbumlist.push(data.songs[0].al.name)
                                songsidlist.push(data.songs[0].id)
                            })
                        fetch(`http://localhost:3000/song/url?id=${songid}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                currentSongIndex = songsurllist.length
                                songsurllist.push(data.data[0].url)
                                loadSong(currentSongIndex)
                                ReloadPlaylistSongs()
                                bottomMusic.play()
                                bottomPlayPauseButton.classList.replace("play", "pause")
                                playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                            })
                    })
                })
            })//单曲
        fetch(`http://localhost:3000/cloudsearch?keywords=${searchword}&type=1000`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`请求失败，状态码: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const searchResultAllPlaylistsPlaylists = document.getElementById('search-result-all-playlists-playlists')
                searchResultAllPlaylistsPlaylists.innerHTML = ``
                for (i = 0; i <= 5; i++) {
                    searchResultAllPlaylistsPlaylists.innerHTML += `
                <div id="search-result-all-playlists-playlists-playlist" class="playlist">
                    <div id="search-result-all-playlists-playlists-playlistcover" style="background-image:url(${data.result.playlists[i].coverImgUrl});">
                        <div id="search-result-all-playlists-playlists-playlistcover-id">${data.result.playlists[i].id}</div>
                        <div id="search-result-all-playlists-playlists-playlistcover-playcount">🎧${data.result.playlists[i].playCount}</div>
                    </div>
                    <div id="search-result-all-playlists-playlists-playlistinformation">
                        <div id="search-result-all-playlists-playlists-playlistinformation-playlistname">${data.result.playlists[i].name}</div>
                        <div id="search-result-all-playlists-playlists-playlistinformation-playlistauthor">${data.result.playlists[i].creator.nickname}</div>
                    </div>
                </div>`
                }
                const searchResultPlaylistsPlaylists = document.getElementById('search-result-playlists-playlists')
                searchResultPlaylistsPlaylists.innerHTML = ``
                for (i = 0; i < data.result.playlists.length; i++) {
                    searchResultPlaylistsPlaylists.innerHTML += `
                    <div id="search-result-playlists-playlists-playlist">
                        <div id="search-result-playlists-playlists-playlist-playlistid">${data.result.playlists[i].id}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistnumber">${i + 1}</div>
                        <div id="search-result-playlists-playlists-playlist-playlisttitle">
                            <img src="${data.result.playlists[i].coverImgUrl}" alt="cover">
                            <div id="search-result-playlists-playlists-playlist-playlistname">${data.result.playlists[i].name}</div>
                        </div>
                        <div id="search-result-playlists-playlists-playlist-playlistamount">${data.result.playlists[i].trackCount}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistcreator">${data.result.playlists[i].creator.nickname}</div>
                        <div id="search-result-playlists-playlists-playlist-playlistplaycount">${data.result.playlists[i].playCount}</div>
                    </div>
                    `
                }
                const searchResultPlaylistsPlaylistsPlaylist = document.querySelectorAll('#search-result-playlists-playlists-playlist')
                searchResultPlaylistsPlaylistsPlaylist.forEach(playlist => {
                    playlist.addEventListener('click', function () {
                        rightFeatures.style.display = 'none'
                        searchResult.style.display = 'none'
                        playlistDetails.style.display = 'block'
                        const id = playlist.children[0].textContent
                        //获取歌单详情
                        fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                {
                                    const playlistcover = document.getElementById('playlist-cover')
                                    const cover = data.playlist.coverImgUrl
                                    playlistcover.style.backgroundImage = `url('${cover}')`
                                }
                                {
                                    const playlistid = document.getElementById('playlist-id')
                                    const id = data.playlist.id
                                    playlistid.textContent = id
                                }
                                {
                                    const playlistname = document.getElementById('playlist-name')
                                    const name = data.playlist.name
                                    playlistname.textContent = name
                                }
                                {
                                    const playlistdescription = document.getElementById('playlist-description')
                                    const description = data.playlist.description
                                    playlistdescription.textContent = description
                                }
                                {
                                    const playlistcreatorimage = document.getElementById('playlist-creatorimage')
                                    const creatorimage = data.playlist.creator.avatarUrl
                                    playlistcreatorimage.style.backgroundImage = `url('${creatorimage}')`
                                }
                                {
                                    const playlistcreatorname = document.getElementById('playlist-creatorname')
                                    const creatorname = data.playlist.creator.nickname
                                    playlistcreatorname.textContent = creatorname
                                }
                            })
                        //获取歌单全部歌曲
                        fetch(`http://localhost:3000/playlist/track/all?id=${id}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                const songs = document.getElementById('playlist-details-songs')
                                const length = data.songs.length
                                const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
                                playlistDetailsTypesSongs.innerHTML = `歌曲<sup>${length}</sup>`
                                songs.innerHTML = ``
                                for (i = 0; i < length; i++) {
                                    const time = convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)
                                    songs.innerHTML += `
                <div class="playlist-song">
                    <div class = "song-number">${i + 1}</div>
                    <div class = "song-title">
                       <img src = "${data.songs[i].al.picUrl}" height = "40px" width = "40px">
                       <div class = "song-name">${data.songs[i].name}</div>
                       <div class = "song-author">${data.songs[i].ar[0].name}</div>
                    </div>
                    <div class = "song-album">${data.songs[i].al.name}</div>
                    <div class = "song-like"></div>
                    <div class = "song-id">${data.songs[i].id}</div>
                    <div class = "song-long">${time}</div>
                </div> `
                                }
                                clickPlaylistSong()
                            })
                    })
                })
                const playlists = document.querySelectorAll('.playlist')
                playlists.forEach(playlist => {
                    playlist.addEventListener('click', function () {
                        rightFeatures.style.display = 'none'
                        searchResult.style.display = 'none'
                        playlistDetails.style.display = 'block'
                        const id = playlist.children[0].children[0].textContent
                        //获取歌单详情
                        fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                {
                                    const playlistcover = document.getElementById('playlist-cover')
                                    const cover = data.playlist.coverImgUrl
                                    playlistcover.style.backgroundImage = `url('${cover}')`
                                }
                                {
                                    const playlistid = document.getElementById('playlist-id')
                                    const id = data.playlist.id
                                    playlistid.textContent = id
                                }
                                {
                                    const playlistname = document.getElementById('playlist-name')
                                    const name = data.playlist.name
                                    playlistname.textContent = name
                                }
                                {
                                    const playlistdescription = document.getElementById('playlist-description')
                                    const description = data.playlist.description
                                    playlistdescription.textContent = description
                                }
                                {
                                    const playlistcreatorimage = document.getElementById('playlist-creatorimage')
                                    const creatorimage = data.playlist.creator.avatarUrl
                                    playlistcreatorimage.style.backgroundImage = `url('${creatorimage}')`
                                }
                                {
                                    const playlistcreatorname = document.getElementById('playlist-creatorname')
                                    const creatorname = data.playlist.creator.nickname
                                    playlistcreatorname.textContent = creatorname
                                }
                            })
                        //获取歌单全部歌曲
                        fetch(`http://localhost:3000/playlist/track/all?id=${id}`, {
                            method: 'GET',
                        })
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`请求失败，状态码: ${res.status}`);
                                }
                                return res.json();
                            })
                            .then((data) => {
                                const songs = document.getElementById('playlist-details-songs')
                                const length = data.songs.length
                                const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
                                playlistDetailsTypesSongs.innerHTML = `歌曲<sup>${length}</sup>`
                                songs.innerHTML = ``
                                for (i = 0; i < length; i++) {
                                    const time = convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)
                                    songs.innerHTML += `
                <div class="playlist-song">
                    <div class = "song-number">${i + 1}</div>
                    <div class = "song-title">
                       <img src = "${data.songs[i].al.picUrl}" height = "40px" width = "40px">
                       <div class = "song-name">${data.songs[i].name}</div>
                       <div class = "song-author">${data.songs[i].ar[0].name}</div>
                    </div>
                    <div class = "song-album">${data.songs[i].al.name}</div>
                    <div class = "song-like"></div>
                    <div class = "song-id">${data.songs[i].id}</div>
                    <div class = "song-long">${time}</div>
                </div> `
                                }
                                clickPlaylistSong()
                            })

                    });
                });
            })
    }
})//显示搜索结果
function convertMillisecondsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const formattedSeconds = String(seconds).padStart(2, '0')
    return `${minutes}:${formattedSeconds}`
}//时间转换


// 左侧栏
const playlistDetails = document.getElementById('playlist-details')
const leftRecommend = document.getElementById('left-recommend')
const leftFeature = document.getElementById('left-feature')
const leftPodcast = document.getElementById('left-podcast')
const leftRoam = document.getElementById('left-roam')
const leftConcern = document.getElementById('left-concern')
const leftMylove = document.getElementById('left-mylove')
const leftRecentplay = document.getElementById('left-recentplay')
const leftMypodcast = document.getElementById('left-mypodcast')
const leftTypes = [leftRecommend, leftFeature, leftPodcast, leftRoam, leftConcern, leftMylove, leftRecentplay, leftMypodcast]
const rightRecommends = document.getElementById('right-recommends')
const rightFeatures = document.getElementById('right-features')
const rightPodcasts = document.getElementById('right-podcasts')
const rightRoam = document.getElementById('right-roam')
const rightConcern = document.getElementById('right-concern')
const rightMylove = document.getElementById('right-mylove')
const rightRecentplay = document.getElementById('right-recentplay')
const rightMypodcast = document.getElementById('right-mypodcast')
leftRecommend.style.backgroundColor = '#FC3D4E'//初始化
leftRecommend.style.color = '#FFF'
leftTypes.forEach(leftType => {
    leftType.addEventListener('mouseover', function () {
        if (window.getComputedStyle(this).backgroundColor != 'rgb(252, 61, 78)') {
            this.style.backgroundColor = '#ddd'
        }
    })
    leftType.addEventListener('mouseout', function () {
        if (window.getComputedStyle(this).backgroundColor == 'rgb(221, 221, 221)') {
            this.style.backgroundColor = '#f1f1f1'
        }
    })
})//鼠标悬停效果
leftRecommend.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#FC3D4E'
        leftRecommend.style.color = '#FFF'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'block'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧推荐栏
leftFeature.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#FC3D4E'
        leftFeature.style.color = '#FFF'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'block'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧精选栏
leftPodcast.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#FC3D4E'
        leftPodcast.style.color = '#FFF'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'block'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧播客栏
leftRoam.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#FC3D4E'
        leftRoam.style.color = '#FFF'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'block'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧漫游栏
leftConcern.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#FC3D4E'
        leftConcern.style.color = '#FFF'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'block'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧关注栏
leftMylove.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#FC3D4E'
        leftMylove.style.color = '#FFF'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'block'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧我喜欢的音乐栏
leftRecentplay.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#FC3D4E'
        leftRecentplay.style.color = '#FFF'
        leftMypodcast.style.backgroundColor = '#f1f1f1'
        leftMypodcast.style.color = '#50596B'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'block'
        rightMypodcast.style.display = 'none'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧最近播放栏
leftMypodcast.addEventListener('click', function () {
    {
        leftRecommend.style.backgroundColor = '#f1f1f1'
        leftRecommend.style.color = '#50596B'
        leftFeature.style.backgroundColor = '#f1f1f1'
        leftFeature.style.color = '#50596B'
        leftPodcast.style.backgroundColor = '#f1f1f1'
        leftPodcast.style.color = '#50596B'
        leftRoam.style.backgroundColor = '#f1f1f1'
        leftRoam.style.color = '#50596B'
        leftConcern.style.backgroundColor = '#f1f1f1'
        leftConcern.style.color = '#50596B'
        leftMylove.style.backgroundColor = '#f1f1f1'
        leftMylove.style.color = '#50596B'
        leftRecentplay.style.backgroundColor = '#f1f1f1'
        leftRecentplay.style.color = '#50596B'
        leftMypodcast.style.backgroundColor = '#FC3D4E'
        leftMypodcast.style.color = '#FFF'
    }
    {
        rightRecommends.style.display = 'none'
        rightFeatures.style.display = 'none'
        rightPodcasts.style.display = 'none'
        rightRoam.style.display = 'none'
        rightConcern.style.display = 'none'
        rightMylove.style.display = 'none'
        rightRecentplay.style.display = 'none'
        rightMypodcast.style.display = 'block'
    }
    {
        playlistDetails.style.display = 'none'
        searchResult.style.display = 'none'
    }
})//点击左侧我的播客栏


//右侧推荐栏
function LoadRightFeatures() {
    {
        fetch(`http://localhost:3000/banner`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`请求失败，状态码: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const rightRecommendsBannerContainer = document.getElementById('right-recommends-banner-container')
                const rightRecommendsBannerPoints = document.getElementById('right-recommends-banner-points')
                rightRecommendsBannerContainer.innerHTML = ``
                rightRecommendsBannerPoints.innerHTML = ``
                for (i = 0; i < data.banners.length; i++) {
                    rightRecommendsBannerContainer.innerHTML += `<img src="${data.banners[i].imageUrl}" alt="">`
                }//获取轮播图
                for (i = 0; i < data.banners.length; i++) {
                    rightRecommendsBannerPoints.innerHTML += `<div id="right-recommends-banner-points-point"></div>`
                }//添加轮播图导航
                const rightRecommendsBannerPointsPoint = document.querySelectorAll('#right-recommends-banner-points-point')
                let scrollAmount = 0 // 当前滚动位置
                rightRecommendsBannerPointsPoint[0].style.opacity = '1'//初始化
                setInterval(() => {
                    scrollAmount -= 500 // 每次向右滚动500像素
                    if (scrollAmount <= -(data.banners.length) * 500) {
                        scrollAmount = 0
                    }// 重置滚动位置
                    rightRecommendsBannerPointsPoint.forEach(el => {
                        el.style.opacity = '0.5'
                    })
                    rightRecommendsBannerPointsPoint[-scrollAmount / 500].style.opacity = '1'
                    rightRecommendsBannerContainer.style.transform = `translateX(${scrollAmount}px)`
                }, 5000)//图片自动轮播
                rightRecommendsBannerPointsPoint.forEach((onerightRecommendsBannerPointsPoint, index) => {
                    onerightRecommendsBannerPointsPoint.addEventListener('mouseover', function () {
                        rightRecommendsBannerPointsPoint.forEach(el => {
                            el.style.opacity = '0.5'
                        })
                        onerightRecommendsBannerPointsPoint.style.opacity = '1'
                        scrollAmount = index * -500
                        rightRecommendsBannerContainer.style.transform = `translateX(${scrollAmount}px)`;
                    })
                })//鼠标悬停
            })
    }//轮播图
}
LoadRightFeatures()



//右侧精选栏
const rightFeaturesType = document.querySelectorAll('#right-features-type')
const rightFeaturesFeature = document.getElementById('right-features-feature')
const rightFeaturesPlaylistsquare = document.getElementById('right-features-playlistsquare')
const rightFeaturesPlaylistsquareKind = document.querySelectorAll('#right-features-playlistsquare-kind')
const rightFeaturesPlaylistsquareRecommends = document.getElementById('right-features-playlistsquare-recommends')
const rightFeaturesPlaylistsquareOfficials = document.getElementById('right-features-playlistsquare-officials')
const rightFeaturesPlaylistsquareChineses = document.getElementById('right-features-playlistsquare-chineses')
const rightFeaturesPlaylistsquareRocks = document.getElementById('right-features-playlistsquare-rocks')
const rightFeaturesPlaylistsquareFolks = document.getElementById('right-features-playlistsquare-folks')
const rightFeaturesPlaylistsquareElectrons = document.getElementById('right-features-playlistsquare-electrons')
const rightFeaturesPlaylistsquareEasylistenings = document.getElementById('right-features-playlistsquare-easylistenings')
const rightFeaturesList = document.getElementById('right-features-list')
const rightFeaturesSingers = document.getElementById('right-features-singers')
const rightFeaturesVip = document.getElementById('right-features-vip')
rightFeaturesType[0].style.color = '#283248'//初始化
rightFeaturesType[0].style.setProperty('--pseudo-bg-color', '#FC3C50')
rightFeaturesType.forEach(onerightFeaturesType => {
    onerightFeaturesType.addEventListener('click', function () {
        rightFeaturesType.forEach(el => {
            el.style.color = '#7B8294'
            el.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        })
        this.style.color = '#283248'
        this.style.setProperty('--pseudo-bg-color', '#FC3C50')
    })
})//精选分类按钮点击
rightFeaturesType[0].addEventListener('click', function () {
    rightFeaturesFeature.style.display = 'block'
    rightFeaturesPlaylistsquare.style.display = 'none'
    rightFeaturesList.style.display = 'none'
    rightFeaturesSingers.style.display = 'none'
    rightFeaturesVip.style.display = 'none'
})//精选类中点击精选
rightFeaturesType[1].addEventListener('click', function () {
    rightFeaturesFeature.style.display = 'none'
    rightFeaturesPlaylistsquare.style.display = 'block'
    rightFeaturesList.style.display = 'none'
    rightFeaturesSingers.style.display = 'none'
    rightFeaturesVip.style.display = 'none'
})//精选类中点击歌单广场
rightFeaturesType[2].addEventListener('click', function () {
    rightFeaturesFeature.style.display = 'none'
    rightFeaturesPlaylistsquare.style.display = 'none'
    rightFeaturesList.style.display = 'block'
    rightFeaturesSingers.style.display = 'none'
    rightFeaturesVip.style.display = 'none'
})//精选类中点击排行榜
rightFeaturesType[3].addEventListener('click', function () {
    rightFeaturesFeature.style.display = 'none'
    rightFeaturesPlaylistsquare.style.display = 'none'
    rightFeaturesList.style.display = 'none'
    rightFeaturesSingers.style.display = 'block'
    rightFeaturesVip.style.display = 'none'
})//精选类中点击歌手
rightFeaturesType[4].addEventListener('click', function () {
    rightFeaturesFeature.style.display = 'none'
    rightFeaturesPlaylistsquare.style.display = 'none'
    rightFeaturesList.style.display = 'none'
    rightFeaturesSingers.style.display = 'none'
    rightFeaturesVip.style.display = 'block'
})//精选类中点击VIP
function mouseover() {
    this.style.color = '#FF3A3A'
    this.style.borderColor = '#F8D8DB'
    this.style.backgroundColor = '#F8EAED'
}
function mouseout() {
    this.style.color = '#283248'
    this.style.borderColor = '#E4E7EB'
    this.style.backgroundColor = '#F7F9FC'
}//鼠标悬停
rightFeaturesPlaylistsquareKind.forEach(el => {
    el.style.color = '#283248'
    el.style.borderColor = '#E4E7EB'
    el.style.backgroundColor = '#F7F9FC'
    el.addEventListener('mouseover', mouseover)
    el.addEventListener('mouseout', mouseout)
})//初始化
rightFeaturesPlaylistsquareKind[0].style.color = '#FF3A3A'
rightFeaturesPlaylistsquareKind[0].style.borderColor = '#F8D8DB'
rightFeaturesPlaylistsquareKind[0].style.backgroundColor = '#F8EAED'
rightFeaturesPlaylistsquareKind[0].removeEventListener('mouseover', mouseover)
rightFeaturesPlaylistsquareKind[0].removeEventListener('mouseout', mouseout)
rightFeaturesPlaylistsquareKind.forEach(onerightFeaturesPlaylistsquareKind => {
    onerightFeaturesPlaylistsquareKind.addEventListener('click', function () {
        rightFeaturesPlaylistsquareKind.forEach(el => {
            el.style.color = '#283248'
            el.style.borderColor = '#E4E7EB'
            el.style.backgroundColor = '#F7F9FC'
            el.addEventListener('mouseover', mouseover)
            el.addEventListener('mouseout', mouseout)
        })
        this.style.color = '#FF3A3A'
        this.style.borderColor = '#F8D8DB'
        this.style.backgroundColor = '#F8EAED'
        this.removeEventListener('mouseover', mouseover)
        this.removeEventListener('mouseout', mouseout)
    })
})//精选中歌单广场内分类按钮点击
rightFeaturesPlaylistsquareKind[0].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'block'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击推荐分类
rightFeaturesPlaylistsquareKind[1].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'block'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击官方分类
rightFeaturesPlaylistsquareKind[2].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'block'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击华语分类
rightFeaturesPlaylistsquareKind[3].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'block'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击摇滚分类
rightFeaturesPlaylistsquareKind[4].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'block'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击民谣分类
rightFeaturesPlaylistsquareKind[5].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'block'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'none'
})//歌单广场内点击电子分类
rightFeaturesPlaylistsquareKind[6].addEventListener('click', function () {
    rightFeaturesPlaylistsquareRecommends.style.display = 'none'
    rightFeaturesPlaylistsquareOfficials.style.display = 'none'
    rightFeaturesPlaylistsquareChineses.style.display = 'none'
    rightFeaturesPlaylistsquareRocks.style.display = 'none'
    rightFeaturesPlaylistsquareFolks.style.display = 'none'
    rightFeaturesPlaylistsquareElectrons.style.display = 'none'
    rightFeaturesPlaylistsquareEasylistenings.style.display = 'block'
})//歌单广场内点击轻音乐分类

//搜索结果分类
const searchResultType = document.querySelectorAll('#search-result-type')
const searchResultAll = document.getElementById('search-result-all')
const searchResultSongs = document.getElementById('search-result-songs')
const searchResultPlaylists = document.getElementById('search-result-playlists')
const searchResultSingers = document.getElementById('search-result-singers')
const searchResultSounds = document.getElementById('search-result-sounds')
const searchResultPodcasts = document.getElementById('search-result-podcasts')
const searchResultLyrics = document.getElementById('search-result-lyrics')
const searchResultAlbums = document.getElementById('search-result-albums')
const searchResultMvs = document.getElementById('search-result-mvs')
const searchResultUsers = document.getElementById('search-result-users')
const searchResultAllSongsTitle = document.getElementById('search-result-all-songs-title')
const searchResultAllPlaylistsTitle = document.getElementById('search-result-all-playlists-title')
searchResultType[0].style.color = '#283248'//初始化
searchResultType[0].style.setProperty('--pseudo-bg-color', '#FC3C50')
searchResultType.forEach(onesearchResultType => {
    onesearchResultType.addEventListener('click', function () {
        searchResultType.forEach(el => {
            el.style.color = '#7B8290'
            el.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        })
        this.style.color = '#283248'
        this.style.setProperty('--pseudo-bg-color', '#FC3C50')
    })
})//点击搜索结果分类按钮
searchResultType[0].addEventListener('click', function () {
    searchResultAll.style.display = 'block'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果综合分类按钮
searchResultType[1].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'block'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果单曲分类按钮
searchResultType[2].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'block'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果歌单分类按钮
searchResultType[3].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'block'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果歌手分类按钮
searchResultType[4].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'block'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果声音分类按钮
searchResultType[5].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'block'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果播客分类按钮
searchResultType[6].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'block'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果歌词分类按钮
searchResultType[7].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'block'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'none'
})//点击搜索结果专辑分类按钮
searchResultType[8].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'block'
    searchResultUsers.style.display = 'none'
})//点击搜索结果MV分类按钮
searchResultType[9].addEventListener('click', function () {
    searchResultAll.style.display = 'none'
    searchResultSongs.style.display = 'none'
    searchResultPlaylists.style.display = 'none'
    searchResultSingers.style.display = 'none'
    searchResultSounds.style.display = 'none'
    searchResultPodcasts.style.display = 'none'
    searchResultLyrics.style.display = 'none'
    searchResultAlbums.style.display = 'none'
    searchResultMvs.style.display = 'none'
    searchResultUsers.style.display = 'block'
})//点击搜索结果用户分类按钮
searchResultAllSongsTitle.addEventListener('click', function () {
    {
        searchResultType.forEach(el => {
            el.style.color = '#7B8290'
            el.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        })
        searchResultType[1].style.color = '#283248'
        searchResultType[1].style.setProperty('--pseudo-bg-color', '#FC3C50')
    }
    {
        searchResultAll.style.display = 'none'
        searchResultSongs.style.display = 'block'
        searchResultPlaylists.style.display = 'none'
        searchResultSingers.style.display = 'none'
        searchResultSounds.style.display = 'none'
        searchResultPodcasts.style.display = 'none'
        searchResultLyrics.style.display = 'none'
        searchResultAlbums.style.display = 'none'
        searchResultMvs.style.display = 'none'
        searchResultUsers.style.display = 'none'
    }
})//在综合中点击单曲
searchResultAllPlaylistsTitle.addEventListener('click', function () {
    {
        searchResultType.forEach(el => {
            el.style.color = '#7B8290'
            el.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        })
        searchResultType[2].style.color = '#283248'
        searchResultType[2].style.setProperty('--pseudo-bg-color', '#FC3C50')
    }
    {
        searchResultAll.style.display = 'none'
        searchResultSongs.style.display = 'none'
        searchResultPlaylists.style.display = 'block'
        searchResultSingers.style.display = 'none'
        searchResultSounds.style.display = 'none'
        searchResultPodcasts.style.display = 'none'
        searchResultLyrics.style.display = 'none'
        searchResultAlbums.style.display = 'none'
        searchResultMvs.style.display = 'none'
        searchResultUsers.style.display = 'none'
    }
})//在综合中点击歌单



//获取歌单广场歌单
function LoadPlaylistsquarePlaylist() {
    fetch(`http://localhost:3000/recommend/resource?cookie=${cookie}`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareRecommendsRecommend = document.getElementById('right-features-playlistsquare-recommends-recommend')
            rightFeaturesPlaylistsquareRecommendsRecommend.innerHTML = ``
            for (i = 0; i < data.recommend.length; i++) {
                rightFeaturesPlaylistsquareRecommendsRecommend.innerHTML += `
            <div class="playlist" id="recommend-playlist" style="background-image: url(${data.recommend[i].picUrl});">
                <div class="id" id="recommend-id">${data.recommend[i].id}</div>
                <div class="playcount" id="recommend-playcount">🎧${data.recommend[i].playcount}</div>
                <div class="name" id="recommend-name">${data.recommend[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//推荐歌单
    fetch(`http://localhost:3000/personalized`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareOfficialsOffical = document.getElementById('right-features-playlistsquare-officials-offical')
            rightFeaturesPlaylistsquareOfficialsOffical.innerHTML = ``
            for (i = 0; i < data.result.length; i++) {
                rightFeaturesPlaylistsquareOfficialsOffical.innerHTML += `
            <div class="playlist" id="officials-playlist" style="background-image: url(${data.result[i].picUrl});">
                <div class="id" id="officials-id">${data.result[i].id}</div>
                <div class="playcount" id="officials-playcount">🎧${data.result[i].playCount}</div>
                <div class="name" id="officials-name">${data.result[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//官方歌单
    fetch(`http://localhost:3000/top/playlist?cat=华语`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareChinesesChinese = document.getElementById('right-features-playlistsquare-chineses-chinese')
            rightFeaturesPlaylistsquareChinesesChinese.innerHTML = ``
            for (i = 0; i < data.playlists.length; i++) {
                rightFeaturesPlaylistsquareChinesesChinese.innerHTML += `
            <div class="playlist" id="right-features-playlistsquare-chineses-chinese-playlist" style="background-image: url(${data.playlists[i].coverImgUrl});">
                <div class="id" id="right-features-playlistsquare-chineses-chinese-id">${data.playlists[i].id}</div>
                <div class="playcount" id="right-features-playlistsquare-chineses-chinese-playcount">🎧${data.playlists[i].playCount}</div>
                <div class="name" id="right-features-playlistsquare-chineses-chinese-name">${data.playlists[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//华语歌单
    fetch(`http://localhost:3000/top/playlist?cat=摇滚`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareRocksRock = document.getElementById('right-features-playlistsquare-rocks-rock')
            rightFeaturesPlaylistsquareRocksRock.innerHTML = ``
            for (i = 0; i < data.playlists.length; i++) {
                rightFeaturesPlaylistsquareRocksRock.innerHTML += `
            <div class="playlist" id="right-features-playlistsquare-rocks-rock-playlist" style="background-image: url(${data.playlists[i].coverImgUrl});">
                <div class="id" id="right-features-playlistsquare-rocks-rock-id">${data.playlists[i].id}</div>
                <div class="playcount" id="right-features-playlistsquare-rocks-rock-playcount">🎧${data.playlists[i].playCount}</div>
                <div class="name" id="right-features-playlistsquare-rocks-rock-name">${data.playlists[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//摇滚歌单
    fetch(`http://localhost:3000/top/playlist?cat=民谣`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareFolksFolk = document.getElementById('right-features-playlistsquare-folks-folk')
            rightFeaturesPlaylistsquareFolksFolk.innerHTML = ``
            for (i = 0; i < data.playlists.length; i++) {
                rightFeaturesPlaylistsquareFolksFolk.innerHTML += `
            <div class="playlist" id="right-features-playlistsquare-folks-folk-playlist" style="background-image: url(${data.playlists[i].coverImgUrl});">
                <div class="id" id="right-features-playlistsquare-folks-folk-id">${data.playlists[i].id}</div>
                <div class="playcount" id="right-features-playlistsquare-folks-folk-playcount">🎧${data.playlists[i].playCount}</div>
                <div class="name" id="right-features-playlistsquare-folks-folk-name">${data.playlists[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//民谣歌单
    fetch(`http://localhost:3000/top/playlist?cat=电子`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareElectronsElectron = document.getElementById('right-features-playlistsquare-electrons-electron')
            rightFeaturesPlaylistsquareElectronsElectron.innerHTML = ``
            for (i = 0; i < data.playlists.length; i++) {
                rightFeaturesPlaylistsquareElectronsElectron.innerHTML += `
            <div class="playlist" id="right-features-playlistsquare-electrons-electron-playlist" style="background-image: url(${data.playlists[i].coverImgUrl});">
                <div class="id" id="right-features-playlistsquare-electrons-electron-id">${data.playlists[i].id}</div>
                <div class="playcount" id="right-features-playlistsquare-electrons-electron-playcount">🎧${data.playlists[i].playCount}</div>
                <div class="name" id="right-features-playlistsquare-electrons-electron-name">${data.playlists[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//电子歌单
    fetch(`http://localhost:3000/top/playlist?cat=轻音乐`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const rightFeaturesPlaylistsquareEasylisteningsEasylistening = document.getElementById('right-features-playlistsquare-easylistenings-easylistening')
            rightFeaturesPlaylistsquareEasylisteningsEasylistening.innerHTML = ``
            for (i = 0; i < data.playlists.length; i++) {
                rightFeaturesPlaylistsquareEasylisteningsEasylistening.innerHTML += `
            <div class="playlist" id="right-features-playlistsquare-easylistenings-easylistening-playlist" style="background-image: url(${data.playlists[i].coverImgUrl});">
                <div class="id" id="right-features-playlistsquare-easylistenings-easylistening-id">${data.playlists[i].id}</div>
                <div class="playcount" id="right-features-playlistsquare-easylistenings-easylistening-playcount">🎧${data.playlists[i].playCount}</div>
                <div class="name" id="right-features-playlistsquare-easylistenings-easylistening-name">${data.playlists[i].name}</div>
            </div>`
            }
            playlistAddEventListener()
        })//轻音乐歌单
}
LoadPlaylistsquarePlaylist()

//进入歌单
function playlistAddEventListener() {
    const playlists = document.querySelectorAll('.playlist')
    playlists.forEach(playlist => {
        playlist.addEventListener('click', function intoPlaylist() {
            rightFeatures.style.display = 'none'
            searchResult.style.display = 'none'
            playlistDetails.style.display = 'block'
            const id = playlist.children[0].textContent
            //获取歌单详情
            fetch(`http://localhost:3000/playlist/detail?id=${id}`, {
                method: 'GET',
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`请求失败，状态码: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    {
                        const playlistcover = document.getElementById('playlist-cover')
                        const cover = data.playlist.coverImgUrl
                        playlistcover.style.backgroundImage = `url('${cover}')`
                    }
                    {
                        const playlistid = document.getElementById('playlist-id')
                        const id = data.playlist.id
                        playlistid.textContent = id
                    }
                    {
                        const playlistname = document.getElementById('playlist-name')
                        const name = data.playlist.name
                        playlistname.textContent = name
                    }
                    {
                        const playlistdescription = document.getElementById('playlist-description')
                        const description = data.playlist.description
                        playlistdescription.textContent = description
                    }
                    {
                        const playlistcreatorimage = document.getElementById('playlist-creatorimage')
                        const creatorimage = data.playlist.creator.avatarUrl
                        playlistcreatorimage.style.backgroundImage = `url('${creatorimage}')`
                    }
                    {
                        const playlistcreatorname = document.getElementById('playlist-creatorname')
                        const creatorname = data.playlist.creator.nickname
                        playlistcreatorname.textContent = creatorname
                    }
                })
            //获取歌单全部歌曲
            fetch(`http://localhost:3000/playlist/track/all?id=${id}`, {
                method: 'GET',
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`请求失败，状态码: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    const songs = document.getElementById('playlist-details-songs')
                    const length = data.songs.length
                    const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
                    playlistDetailsTypesSongs.innerHTML = `歌曲<sup>${length}</sup>`
                    songs.innerHTML = ``
                    for (i = 0; i < length; i++) {
                        const time = convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)
                        songs.innerHTML += `
                <div class="playlist-song">
                    <div class = "song-number">${i + 1}</div>
                    <div class = "song-title">
                       <img src = "${data.songs[i].al.picUrl}" height = "40px" width = "40px">
                       <div class = "song-name">${data.songs[i].name}</div>
                       <div class = "song-author">${data.songs[i].ar[0].name}</div>
                    </div>
                    <div class = "song-album">${data.songs[i].al.name}</div>
                    <div class = "song-like"></div>
                    <div class = "song-id">${data.songs[i].id}</div>
                    <div class = "song-long">${time}</div>
                </div> `
                    }
                    clickPlaylistSong()
                })
        })
    })
}
const playlistDetailsTypesSongs = document.getElementById('playlist-details-types-songs')
const playlistDetailsTypesComments = document.getElementById('playlist-details-types-comments')
const playlistDetailsTypesCollectors = document.getElementById('playlist-details-types-collectors')
const rightPlaylistSongs = document.getElementById('right-playlist-songs')
const rightPlaylistComments = document.getElementById('right-playlist-comments')
const rightPlaylistCollectors = document.getElementById('right-playlist-collectors')
playlistDetailsTypesSongs.style.color = '#283248'//初始化
playlistDetailsTypesSongs.style.fontWeight = '1000'
playlistDetailsTypesSongs.style.setProperty('--pseudo-bg-color', '#FC3C50')
playlistDetailsTypesSongs.addEventListener('click', function () {
    {
        playlistDetailsTypesSongs.style.color = '#283248'
        playlistDetailsTypesSongs.style.fontWeight = '1000'
        playlistDetailsTypesSongs.style.setProperty('--pseudo-bg-color', '#FC3C50')
        playlistDetailsTypesComments.style.color = '#7B7E8C'
        playlistDetailsTypesComments.style.fontWeight = 'normal'
        playlistDetailsTypesComments.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        playlistDetailsTypesCollectors.style.color = '#7B7E8C'
        playlistDetailsTypesCollectors.style.fontWeight = 'normal'
        playlistDetailsTypesCollectors.style.setProperty('--pseudo-bg-color', '#F7F9FC')
    }
    {
        rightPlaylistSongs.style.display = 'block'
        rightPlaylistComments.style.display = 'none'
        rightPlaylistCollectors.style.display = 'none'
    }
})//点击歌曲分类
playlistDetailsTypesComments.addEventListener('click', function () {
    {
        playlistDetailsTypesSongs.style.color = '#7B7E8C'
        playlistDetailsTypesSongs.style.fontWeight = 'normal'
        playlistDetailsTypesSongs.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        playlistDetailsTypesComments.style.color = '#283248'
        playlistDetailsTypesComments.style.fontWeight = '1000'
        playlistDetailsTypesComments.style.setProperty('--pseudo-bg-color', '#FC3C50')
        playlistDetailsTypesCollectors.style.color = '#7B7E8C'
        playlistDetailsTypesCollectors.style.fontWeight = 'normal'
        playlistDetailsTypesCollectors.style.setProperty('--pseudo-bg-color', '#F7F9FC')
    }
    {
        rightPlaylistSongs.style.display = 'none'
        rightPlaylistComments.style.display = 'block'
        rightPlaylistCollectors.style.display = 'none'
    }
})//点击评论分类
playlistDetailsTypesCollectors.addEventListener('click', function () {
    {
        playlistDetailsTypesSongs.style.color = '#7B7E8C'
        playlistDetailsTypesSongs.style.fontWeight = 'normal'
        playlistDetailsTypesSongs.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        playlistDetailsTypesComments.style.color = '#7B7E8C'
        playlistDetailsTypesComments.style.fontWeight = 'normal'
        playlistDetailsTypesComments.style.setProperty('--pseudo-bg-color', '#F7F9FC')
        playlistDetailsTypesCollectors.style.color = '#283248'
        playlistDetailsTypesCollectors.style.fontWeight = '1000'
        playlistDetailsTypesCollectors.style.setProperty('--pseudo-bg-color', '#FC3C50')
    }
    {
        rightPlaylistSongs.style.display = 'none'
        rightPlaylistComments.style.display = 'none'
        rightPlaylistCollectors.style.display = 'block'
    }
})//点击收藏者分类

//获取音乐
function clickPlaylistSong() {
    const playlistSongs = Array.from(document.getElementsByClassName('playlist-song'))
    playlistSongs.forEach(playlistSong => {
        playlistSong.addEventListener('click', function () {
            fetch(`http://localhost:3000/song/url?id=${playlistSong.children[4].textContent}`, {
                method: 'GET',
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`请求失败，状态码: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    const id = data.data[0].id
                    const playlistid = document.getElementById('playlist-id')
                    fetch(`http://localhost:3000/playlist/track/all?id=${playlistid.textContent}`, {
                        method: 'GET',
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            songsimageurllist = []
                            songsnamelist = []
                            songsauthorlist = []
                            songalbumlist = []
                            songsidlist = []
                            for (i = 0; i < data.songs.length; i++) {
                                songsimageurllist.push(data.songs[i].al.picUrl)
                                songsnamelist.push(data.songs[i].name)
                                songsauthorlist.push(data.songs[i].ar[0].name)
                                songalbumlist.push(data.songs[i].al.name)
                                songsidlist.push(data.songs[i].id)
                            }//获取歌单所有音乐信息
                            currentSongIndex = songsidlist.indexOf(id)
                            fetch(`http://localhost:3000/song/url?id=${songsidlist.join(',')}`, {
                                method: 'GET',
                            })
                                .then((res) => {
                                    if (!res.ok) {
                                        throw new Error(`请求失败，状态码: ${res.status}`);
                                    }
                                    return res.json();
                                })
                                .then((data) => {
                                    songsurllist = []
                                    for (i = 0; i < data.data.length; i++) {
                                        songsurllist.push(data.data[i].url)
                                    }//获取歌单所有音乐url
                                    ReloadPlaylistSongs()
                                    loadSong(currentSongIndex)
                                    bottomMusic.play()
                                    bottomPlayPauseButton.classList.replace("play", "pause")
                                    playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                                })
                        })
                })
        })
    })
}

const bottom = document.getElementById('bottom')
const playbackdetailspage = document.getElementById('playbackdetailspage')
const playbackdetailspageState = document.getElementById('playbackdetailspage-state')
const playbackdetailspageClose = document.getElementById('playbackdetailspage-close')
bottom.addEventListener('click', (event) => {
    if (event.target !== bottomPreviousButton && event.target !== bottomPlayPauseButton && event.target !== bottomNextButton && event.target !== bottomProgresscontainer && event.target !== bottomVolumeSlider && event.target !== bottomPlaylist && event.target !== playlistProgress) {
        playbackdetailspage.classList.add('visible')
        playbackdetailspageState.classList.add('visible')
        playbackdetailspage.style.zIndex = '2'
    }
})//进入播放详情页
playbackdetailspageClose.addEventListener('click', () => {
    playbackdetailspage.classList.remove('visible')
    playbackdetailspageState.classList.remove('visible')
    timeout = setTimeout(() => {
        playbackdetailspage.style.zIndex = '-1'
    }, 501)
})//退出播放详情页

//播放音乐
const bottomCoverImage = document.getElementById('bottom-cover-image')
const bottomTitleName = document.getElementById('bottom-title-name')
const bottomTitleAuthor = document.getElementById("bottom-title-author")
const bottomMusic = document.getElementById('bottom-music')
const bottomPreviousButton = document.getElementById('bottom-previous-button')
const bottomPlayPauseButton = document.getElementById('bottom-play-pause-button')
const bottomNextButton = document.getElementById('bottom-next-button')
const bottomProgresscontainer = document.getElementById('bottom-progresscontainer')
const bottomProgress = document.getElementById('bottom-progress')
const bottomPlayTime = document.getElementById('bottom-play-time')
const bottomEndTime = document.getElementById('bottom-end-time')
const bottomPlaylist = document.getElementById('bottom-playlist')
const playlistProgress = document.getElementById('playlist-progress')
const bottomVolume = document.getElementById('bottom-volume')
const bottomVolumeProgress = document.getElementById('bottom-volume-progress')
const bottomVolumeSlider = document.getElementById('bottom-volume-slider')
const bottomVolumeDisplay = document.getElementById('bottom-volume-display')
const playbackdetailspageBodyLeftProbeimage = document.getElementById('playbackdetailspage-body-left-probeimage')
const playbackdetailspageBodyLeftCD = document.getElementById('playbackdetailspage-body-left-CD')
const playbackdetailspageBodyLeftCover = document.getElementById('playbackdetailspage-body-left-cover')
const playbackdetailspageBodyRightSongname = document.getElementById('playbackdetailspage-body-right-songname')
const playbackdetailspageBodyRightSonginformationSongalbum = document.getElementById('playbackdetailspage-body-right-songinformation-songalbum')
const playbackdetailspageBodyRightSonginformationSongauthor = document.getElementById('playbackdetailspage-body-right-songinformation-songauthor')
const playbackdetailspageBodyRightTypeLyrics = document.getElementById('playbackdetailspage-body-right-type-lyrics')
const playbackdetailspageBodyRightTypeEncyclopedia = document.getElementById('playbackdetailspage-body-right-type-encyclopedia')
const playbackdetailspageBodyRightTypeSimilarrecommendations = document.getElementById('playbackdetailspage-body-right-type-similarrecommendations')
const playbackdetailspageBodyRightSonglyrics = document.getElementById('playbackdetailspage-body-right-songlyrics')
const playbackdetailspageBodyRightEncyclopedia = document.getElementById('playbackdetailspage-body-right-encyclopedia')
const playbackdetailspageBodyRightSimilarrecommendations = document.getElementById('playbackdetailspage-body-right-similarrecommendations')
const playbackdetailspageBottomProgresscontainer = document.getElementById('playbackdetailspage-bottom-progresscontainer')
const playbackdetailspageBottomProgress = document.getElementById('playbackdetailspage-bottom-progress')
const playbackdetailspageBottomLefttoolPlaytime = document.getElementById('playbackdetailspage-bottom-lefttool-playtime')
const playbackdetailspageBottomLefttoolEndtime = document.getElementById('playbackdetailspage-bottom-lefttool-endtime')
const playbackdetailspageBottomPreviousButton = document.getElementById('playbackdetailspage-bottom-previous-button')
const playbackdetailspageBottomPlayPauseButton = document.getElementById('playbackdetailspage-bottom-play-pause-button')
const playbackdetailspageBottomNextButton = document.getElementById('playbackdetailspage-bottom-next-button')
const playbackdetailspageBottomRighttoolPlaylist = document.getElementById('playbackdetailspage-bottom-righttool-playlist')
const playbackdetailspageBottomRighttoolVolume = document.getElementById('playbackdetailspage-bottom-righttool-volume')
const playbackdetailspageBottomRighttoolVolumeProgress = document.getElementById('playbackdetailspage-bottom-righttool-volume-progress')
const playbackdetailspageBottomRighttoolVolumeSlider = document.getElementById('playbackdetailspage-bottom-righttool-volume-slider')
const playbackdetailspageBottomRighttoolVolumeDisplay = document.getElementById('playbackdetailspage-bottom-righttool-volume-display')
let songsimageurllist = []
let songsnamelist = []
let songsauthorlist = []
let songalbumlist = []
let songsidlist = []
let songsurllist = []
let lyric = []
let lyrictime = []
let currentSongIndex = 0
let isRotating = false// 标记是否正在旋转
let angle = 0 // 当前旋转角度
function loadSong(song) {
    bottom.style.display = 'block'
    bottomCoverImage.src = songsimageurllist[song]
    bottomTitleName.textContent = songsnamelist[song]
    bottomTitleAuthor.textContent = songsauthorlist[song]
    bottomMusic.src = songsurllist[song]
    playbackdetailspageBodyLeftCover.src = songsimageurllist[song]
    playbackdetailspageBodyRightSongname.textContent = songsnamelist[song]
    playbackdetailspageBodyRightSonginformationSongalbum.textContent = `专辑：${songalbumlist[song]}`
    playbackdetailspageBodyRightSonginformationSongauthor.textContent = `歌手：${songsauthorlist[song]}`
    startRotate()
    bottomMusic.currentTime = 0; // 重置播放时间
    bottomMusic.addEventListener("loadedmetadata", () => {
        // 更新总时间
        const EndMinutes = Math.floor(bottomMusic.duration / 60)
        const EndSeconds = Math.floor(bottomMusic.duration % 60).toString().padStart(2, "0")
        bottomEndTime.textContent = `${EndMinutes}:${EndSeconds}`
        playbackdetailspageBottomLefttoolEndtime.textContent = `${EndMinutes}:${EndSeconds}`
    })
    fetch(`http://localhost:3000/lyric?id=${songsidlist[song]}`, {
        method: 'GET',
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`请求失败，状态码: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const playbackdetailspageBodyRightSonglyrics = document.getElementById('playbackdetailspage-body-right-songlyrics')
            playbackdetailspageBodyRightSonglyrics.innerHTML = ``
            lyric = []
            lyrictime = []
            lyric = data.lrc.lyric.trim().split("\n").map(line => { return line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/, "").trim() })
            // lyrictime = data.lrc.lyric.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)
            lyrictime = data.lrc.lyric.split("\n").map(line => {
                let match = line.match(/\[\d{2}:\d{2}\.\d{2,3}\]/);
                if (match) {
                    let timeString = match[0].slice(1, -1)
                    let [minutes, seconds] = timeString.split(":").map(Number)
                    let milliseconds = seconds % 1 * 1000
                    seconds = Math.floor(seconds)
                    return minutes * 60 + seconds + milliseconds / 1000
                }
                return null
            }).filter(time => time !== null)
            for (i = 0; i < lyric.length; i++) {
                playbackdetailspageBodyRightSonglyrics.innerHTML += `<div id="playbackdetailspage-body-right-songlyrics-lyric" class="lyric-line" data-time = "${lyrictime[i]}">${lyric[i]}</div>`
            }//插入歌词
        })//获取歌词
}
// 加载歌曲
bottomPreviousButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songsurllist.length) % songsurllist.length;
    loadSong(currentSongIndex);
    bottomMusic.play();
    bottomPlayPauseButton.classList.replace("play", "pause");
    playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause");
})// 切换到上一首
playbackdetailspageBottomPreviousButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songsurllist.length) % songsurllist.length;
    loadSong(currentSongIndex);
    bottomMusic.play();
    bottomPlayPauseButton.classList.replace("play", "pause");
    playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause");
})// 切换到上一首
bottomNextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songsurllist.length;
    loadSong(currentSongIndex);
    bottomMusic.play();
    bottomPlayPauseButton.classList.replace("play", "pause");
    playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause");
})// 切换到下一首
playbackdetailspageBottomNextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songsurllist.length;
    loadSong(currentSongIndex);
    bottomMusic.play();
    bottomPlayPauseButton.classList.replace("play", "pause");
    playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause");
})// 切换到下一首
bottomPlayPauseButton.addEventListener("click", () => {
    if (bottomMusic.paused) {
        bottomMusic.play()
        bottomPlayPauseButton.classList.replace("play", "pause")
        playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
        startRotate()
    } else {
        bottomMusic.pause()
        bottomPlayPauseButton.classList.replace("pause", "play")
        playbackdetailspageBottomPlayPauseButton.classList.replace("pause", "play")
        stopRotate()
    }
})// 播放/暂停按钮
playbackdetailspageBottomPlayPauseButton.addEventListener("click", () => {
    if (bottomMusic.paused) {
        bottomMusic.play()
        bottomPlayPauseButton.classList.replace("play", "pause")
        playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
        startRotate()
    } else {
        bottomMusic.pause()
        bottomPlayPauseButton.classList.replace("pause", "play")
        playbackdetailspageBottomPlayPauseButton.classList.replace("pause", "play")
        stopRotate()
    }
})// 播放/暂停按钮
bottomMusic.addEventListener("timeupdate", () => {
    const progressPercent = (bottomMusic.currentTime / bottomMusic.duration) * 100
    bottomProgress.style.width = `${progressPercent}%`
    playbackdetailspageBottomProgress.style.width = `${progressPercent}%`

    //更新时间显示
    const minutes = Math.floor(bottomMusic.currentTime / 60)
    const seconds = Math.floor(bottomMusic.currentTime % 60).toString().padStart(2, "0")
    bottomPlayTime.textContent = `${minutes}:${seconds}`
    playbackdetailspageBottomLefttoolPlaytime.textContent = `${minutes}:${seconds}`
})// 更新进度条
bottomProgresscontainer.addEventListener("click", (e) => {
    const totalWidth = bottomProgresscontainer.clientWidth
    const clickX = e.offsetX
    const duration = bottomMusic.duration
    bottomMusic.currentTime = (clickX / totalWidth) * duration
})// 点击进度条
playbackdetailspageBottomProgresscontainer.addEventListener("click", (e) => {
    const totalWidth = playbackdetailspageBottomProgresscontainer.clientWidth
    const clickX = e.offsetX
    const duration = bottomMusic.duration
    bottomMusic.currentTime = (clickX / totalWidth) * duration
})// 点击进度条
bottomVolume.addEventListener("mouseenter", () => {
    bottomVolumeProgress.style.display = "block"
})//音量调节条显示
playbackdetailspageBottomRighttoolVolume.addEventListener("mouseenter", () => {
    playbackdetailspageBottomRighttoolVolumeProgress.style.display = "block"
})//音量调节条显示
bottomVolume.addEventListener("mouseleave", () => {
    bottomVolumeProgress.style.display = "none"
})
bottomVolumeProgress.addEventListener("mouseleave", () => {
    bottomVolumeProgress.style.display = "none"
})//音量调节条消失
playbackdetailspageBottomRighttoolVolume.addEventListener("mouseleave", () => {
    playbackdetailspageBottomRighttoolVolumeProgress.style.display = "none"
})
playbackdetailspageBottomRighttoolVolumeProgress.addEventListener("mouseleave", () => {
    playbackdetailspageBottomRighttoolVolumeProgress.style.display = "none"
})//音量调节条消失
bottomVolumeSlider.addEventListener("input", () => {
    bottomMusic.volume = bottomVolumeSlider.value
    playbackdetailspageBottomRighttoolVolumeSlider.value = bottomVolumeSlider.value
    updateVolumeDisplay()
})// 音量调节
playbackdetailspageBottomRighttoolVolumeSlider.addEventListener("input", () => {
    bottomMusic.volume = playbackdetailspageBottomRighttoolVolumeSlider.value
    bottomVolumeSlider.value = playbackdetailspageBottomRighttoolVolumeSlider.value
    updateVolumeDisplay()
})// 音量调节
function updateVolumeDisplay() {
    const bottomvolumePercentage = Math.round(bottomVolumeSlider.value * 100)
    const playbackdetailspagevolumePercentage = Math.round(bottomVolumeSlider.value * 100)
    bottomVolumeDisplay.textContent = `${bottomvolumePercentage}%`
    playbackdetailspageBottomRighttoolVolumeDisplay.textContent = `${playbackdetailspagevolumePercentage}%`
}// 更新音量显示
bottomMusic.addEventListener('ended', () => {
    bottomNextButton.click()
})    // 自动播放下一首
function rotateImage() {
    if (isRotating) {
        angle += 5 // 每次旋转5度
        bottomCoverImage.style.transform = `rotate(${angle}deg)`
        playbackdetailspageBodyLeftCD.style.transform = `rotate(${angle}deg)`
    }
}// 定义旋转函数
function startRotate() {
    isRotating = true
    playbackdetailspageBodyLeftProbeimage.style.transform = `rotate(35deg)`
}
function stopRotate() {
    isRotating = false
    playbackdetailspageBodyLeftProbeimage.style.transform = `rotate(0deg)`
}
playbackdetailspageBodyRightTypeLyrics.style.color = '#FFF'//分类初始化
playbackdetailspageBodyRightTypeLyrics.style.backgroundColor = '#4B4B4B'
playbackdetailspageBodyRightTypeLyrics.style.fontWeight = '1000'
playbackdetailspageBodyRightTypeLyrics.addEventListener('click', function () {
    {
        playbackdetailspageBodyRightTypeLyrics.style.color = '#FFF'
        playbackdetailspageBodyRightTypeLyrics.style.backgroundColor = '#4B4B4B'
        playbackdetailspageBodyRightTypeLyrics.style.fontWeight = '1000'
        playbackdetailspageBodyRightTypeEncyclopedia.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeEncyclopedia.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeEncyclopedia.style.fontWeight = 'normal'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.fontWeight = 'normal'
    }
    {
        playbackdetailspageBodyRightSonglyrics.style.display = 'block'
        playbackdetailspageBodyRightEncyclopedia.style.display = 'none'
        playbackdetailspageBodyRightSimilarrecommendations.style.display = 'none'
    }
})//点击歌词分类
playbackdetailspageBodyRightTypeEncyclopedia.addEventListener('click', function () {
    {
        playbackdetailspageBodyRightTypeLyrics.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeLyrics.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeLyrics.style.fontWeight = 'normal'
        playbackdetailspageBodyRightTypeEncyclopedia.style.color = '#FFF'
        playbackdetailspageBodyRightTypeEncyclopedia.style.backgroundColor = '#4B4B4B'
        playbackdetailspageBodyRightTypeEncyclopedia.style.fontWeight = '1000'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.fontWeight = 'normal'
    }
    {
        playbackdetailspageBodyRightSonglyrics.style.display = 'none'
        playbackdetailspageBodyRightEncyclopedia.style.display = 'block'
        playbackdetailspageBodyRightSimilarrecommendations.style.display = 'none'
    }
})//点击百科分类
playbackdetailspageBodyRightTypeSimilarrecommendations.addEventListener('click', function () {
    {
        playbackdetailspageBodyRightTypeLyrics.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeLyrics.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeLyrics.style.fontWeight = 'normal'
        playbackdetailspageBodyRightTypeEncyclopedia.style.color = '#AFAFAF;'
        playbackdetailspageBodyRightTypeEncyclopedia.style.backgroundColor = '#373737'
        playbackdetailspageBodyRightTypeEncyclopedia.style.fontWeight = 'normal'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.color = '#FFF'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.backgroundColor = '#4B4B4B'
        playbackdetailspageBodyRightTypeSimilarrecommendations.style.fontWeight = '1000'
    }
    {
        playbackdetailspageBodyRightSonglyrics.style.display = 'none'
        playbackdetailspageBodyRightEncyclopedia.style.display = 'none'
        playbackdetailspageBodyRightSimilarrecommendations.style.display = 'block'
    }
})//点击相似推荐分类
const intervalId = setInterval(rotateImage, 100)// 设置定时器，每100ms更新一次旋转角度
bottomPlaylist.addEventListener('click', function () {
    playlistProgress.style.right = '0px'
    document.addEventListener('click', ClickPlaylistOutside)
})//显示播放列表
playbackdetailspageBottomRighttoolPlaylist.addEventListener('click', function () {
    playlistProgress.style.right = '0px'
    document.addEventListener('click', ClickPlaylistOutside)
})//显示播放列表
function ClickPlaylistOutside(event) {
    if (!playlistProgress.contains(event.target) && !bottomPlaylist.contains(event.target) && !playbackdetailspageBottomRighttoolPlaylist.contains(event.target)) {
        playlistProgress.style.right = '-410px'
        document.removeEventListener('click', ClickPlaylistOutside)
    }
}//移除播放列表
function ReloadPlaylistSongs() {
    if (songsidlist.length == 0) {
        const playlistProgressTitleAmount = document.getElementById('playlist-progress-title-amount')
        playlistProgressTitleAmount.innerHTML = `播放列表<sup>0</sup>`
        const playlistProgressSongs = document.getElementById('playlist-progress-songs')
        playlistProgressSongs.innerHTML = ``
    }
    else if (new Set(songsidlist).size != songsidlist.length) {
        songsimageurllist.pop()
        songsnamelist.pop()
        songsauthorlist.pop()
        songalbumlist.pop()
        songsidlist.pop()
        songsurllist.pop()
        currentSongIndex = currentSongIndex - 1
        alert('播放列表中已含有此歌曲！')
    }//检测是否含有相同歌曲
    else {
        fetch(`http://localhost:3000/song/detail?ids=${songsidlist.join(',')}`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`请求失败，状态码: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const playlistProgressTitleAmount = document.getElementById('playlist-progress-title-amount')
                playlistProgressTitleAmount.innerHTML = `播放列表<sup>${songsidlist.length}</sup>`
                const playlistProgressSongs = document.getElementById('playlist-progress-songs')
                playlistProgressSongs.innerHTML = ``
                for (i = 0; i < songsidlist.length; i++) {
                    playlistProgressSongs.innerHTML += `
            <div id="playlist-progress-songs-song">
                <img id="playlist-progress-songs-song-songcover" src="${data.songs[i].al.picUrl}" alt="cover">
                <div id="playlist-progress-songs-song-songname">${data.songs[i].name}</div>
                <div id="playlist-progress-songs-song-songauthor">${data.songs[i].ar[0].name}</div>
                <div id="playlist-progress-songs-song-songtime">${convertMillisecondsToMinutesAndSeconds(data.songs[i].dt)}</div>
            </div>`
                }
                const playlistProgressSongsSongs = document.querySelectorAll('#playlist-progress-songs-song')
                playlistProgressSongsSongs.forEach(playlistProgressSongsSong => {
                    playlistProgressSongsSong.addEventListener('click', function clickPlaylistProgressSong() {
                        currentSongIndex = songsnamelist.indexOf(this.children[1].textContent)
                        loadSong(currentSongIndex)
                        bottomMusic.play()
                        bottomPlayPauseButton.classList.replace("play", "pause")
                        playbackdetailspageBottomPlayPauseButton.classList.replace("play", "pause")
                    })
                })
            })
    }
}//更新播放列表
const playlistProgressTitleClearplaylist = document.getElementById('playlist-progress-title-clearplaylist')
playlistProgressTitleClearplaylist.addEventListener('click', function () {
    if (confirm("确定要清空播放列表吗？")) {
        playbackdetailspage.classList.remove('visible')
        playbackdetailspageState.classList.remove('visible')
        timeout = setTimeout(() => {
            playbackdetailspage.style.zIndex = '-1'
        }, 501)
        songsimageurllist = []
        songsnamelist = []
        songsauthorlist = []
        songalbumlist = []
        songsidlist = []
        songsurllist = []
        currentSongIndex = 0
        bottom.style.display = 'none'
        bottomMusic.currentTime = 0
        bottomMusic.pause()
        bottomMusic.src = ''
        bottomPlayPauseButton.classList.replace("pause", "play")
        bottomProgress.style.width = `0%`
        playbackdetailspageBottomPlayPauseButton.classList.replace("pause", "play")
        playbackdetailspageBottomProgress.style.width = `0%`
        stopRotate()
        ReloadPlaylistSongs()
    }
})//清空播放列表
//歌词滚动效果
let isUserScrolling = false
let lastScrollTime = 0
playbackdetailspageBodyRightSonglyrics.addEventListener('scroll', () => {
    isUserScrolling = true
    lastScrollTime = Date.now()
})//检测用户是否滚动
function updateLyrics() {
    const currentTime = bottomMusic.currentTime
    const lines = [...document.querySelectorAll('.lyric-line')]
    let activeLine = null
    let i = 0
    for (const line of lines) {
        if ((currentTime >= lyrictime[i] && currentTime < lyrictime[i + 1]) || (currentTime >= lyrictime[i] && lyrictime[i + 1] == null)) {
            activeLine = line
            break
        }
        i++
    }
    if (activeLine) {
        const previousActiveLine = document.querySelector('.lyric-line.active')
        if (previousActiveLine) {
            previousActiveLine.classList.remove('active')
        }
        activeLine.classList.add('active')
        // 滚动歌词容器，使当前歌词行显示在中央
        if (!isUserScrolling) {
            const containerHeight = playbackdetailspageBodyRightSonglyrics.offsetHeight
            const lineHeight = activeLine.offsetHeight
            const lineTop = activeLine.offsetTop
            const scrollPosition = lineTop - (containerHeight / 2) + (lineHeight / 2)
            playbackdetailspageBodyRightSonglyrics.scrollTop = scrollPosition
        }//如果用户未滚动时自动滚动
    }
    if (Date.now() - lastScrollTime > 3000) {
        isUserScrolling = false
    }// 检测用户是否停止滚动
    requestAnimationFrame(updateLyrics)
}
requestAnimationFrame(updateLyrics)// 开始更新歌词
//loadSong(currentSongIndex)// 初始加载第一首歌
updateVolumeDisplay() // 初始化音量显示
stopRotate()




// 进入登录界面
const headUser = document.getElementById('head-user')
const loginBackground = document.getElementById('login-background')
const loginIn = document.getElementById('login-in')
const closeButtom = document.getElementById('close-buttom')
function intoLogin() {
    loginBackground.style.display = 'block'
    loginIn.style.display = 'block'
}//进入登录界面
function outLogin() {
    loginBackground.style.display = 'none'
    loginIn.style.display = 'none'
}// 退出登录界面
headUser.addEventListener('click', intoLogin)
closeButtom.addEventListener('click', outLogin)
const verificationCodeLogin = document.getElementById('verification-code-login')
verificationCodeLogin.addEventListener('click', function () {
    const phonenumber = document.getElementById('phonenumber')
    const phone = phonenumber.children[0].value
    if (phone.length == 11) {
        fetch(`http://localhost:3000/captcha/sent?phone=${phone}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone: phone })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`请求失败，状态码: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const verificationCode = document.getElementById('verification-code')
                phonenumber.style.display = 'none'
                verificationCode.style.display = 'block'
                const constverificationCodeLoginButtom = document.getElementById('verification-code-login-buttom')
                constverificationCodeLoginButtom.style.display = 'none'
                const loginButtom = document.getElementById('login-buttom')
                loginButtom.style.display = 'block'
                loginButtom.addEventListener('click', function () {
                    const captcha = verificationCode.children[0].value
                    fetch(`http://localhost:3000/captcha/verify?phone=${phone}&captcha=${captcha}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ phone: phone, captcha: captcha })
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`请求失败，状态码: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            alert('登录成功')
                            outLogin()
                            headUser.removeEventListener('click', intoLogin)
                        })
                })
            })
    }
    else {
        alert("请输入正确的手机号")
    }
})// 登录