const {getAccessTokenBySpDc, getArtists, getHomeHubs, getAudienceTimelineStreams} = require("../index");
getAccessTokenBySpDc("").then(token => {
    getArtists(token).then(artists => {
        console.log(artists.artists[1].uri.split(":")[2])
        getAudienceTimelineStreams(artists.artists[1].uri.split(":")[2], "AFF", token).then(data => {
            console.log(data)
        })
    })
})