const fetch = require("node-fetch");

exports.getAccessTokenBySpDc = async (sp_dc) => {
    let response = await fetch("https://generic.wg.spotify.com/creator-auth-proxy/v1/web/token?client_id=6cf79a93be894c2086b8cbf737e0796b", {
        "method": "GET",
        "headers": {
            "cookie": "sp_dc=" + sp_dc
        }
    })
    let data = await response.json();
    return data.access_token ?? null;
}

exports.getMe = async (token) => {
    let me = fetch("https://generic.wg.spotify.com/s4x-me/v0/me", {
        headers: {
            authorization: "Bearer " + token
        }
    })
    return me.json();
}

exports.getGuestAccessToken = async () => {
    const response = await fetch("https://open.spotify.com", {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
        }
    });
    const html = await response.text();
    try {
        return html.split('accessToken":"')[1].split('"')[0]
    } catch (e) {
        throw new Error("Error while trying to get a guest access token")
    }

}

exports.getPlaylistData = async (playlistId, token) => {
    const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    const json = await response.json();
    return json
}

exports.getArtists = async (token) => {
    const response = await fetch("https://generic.wg.spotify.com/s4x-me/v0/artists", {
        headers: {
            "Authorization": "Bearer " + token,
            "accept": "application/json"
        }
    })
    const json = await response.json();
    return json
}

exports.getHomeHubs = async (artistId, token) => {
    const response = await fetch(`https://generic.wg.spotify.com/s4x-home-service/v1/artist/${artistId}/home/hubs`, {
        headers: {
            "Authorization": "Bearer " + token,
            "App-Platform": "iOS",
            "Spotify-App": "S4A",
            "Spotify-App-Version": "2.0.18",
            "content-type": "application/json",
            "accept": "application/json",
        }
    })
    return response.json()
}

exports.getAudienceTimelineStreams = async (artistId, country, token) => {
    try {
        const response = await fetch(`https://generic.wg.spotify.com/s4x-insights-api/v1/artist/${artistId}/audience/timeline/streams/${artistId}?time-filter=28day&aggregation-level=recording&country=${country}`, {
            headers: {
                "Authorization": "Bearer " + token,
                "accept": "application/json",
            }
        })
        let json = await response.json();
        return json
    } catch (e) {
        console.log("ERROR", artistId, country, token)
        return {
            timelinePoint: []
        }
    }
}
