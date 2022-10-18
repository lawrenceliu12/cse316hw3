const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

updatePlaylistById = async (req, res) => {
    let body = req.body;

    if (!body){
        return res.status(400).json({
            success: false,
            error: "You must provide a body to update"
        })
    }

    Playlist.findOne({_id: req.params.id }, (error, playlist) => {
        if (error){
            return res.status(404).json({
                error,
                message: "Playlist cannot be found",
            })
        }

        playlist.name = body.name
        playlist.songs = body.songs
        playlist.save().then(() => {
            return res.status(200).json({
                success: true,
                playlist: playlist,
                message: "Playlist has been updated"
            })
        })
        .catch(e => {
            return res.status(404).json({
                e,
                message: "Playlist cannot be updated"
            })
        })
    })
}

deletePlaylist = async (req, res) => {
    let id = req.params.id;

    if (!id){
        return res.status(400).json({
            success: false,
            error: "You must provide an ID"
        })
    }

    Playlist.deleteOne({_id: id}, (error, playlist) =>{
        if (error){
            return res.status(404).json({
                success: false,
                error,
                message: "Playlist cannot be found -- Delete",
            })
        }

        return res.status(200).json({
            success: true,
            id: playlist._id,
            message: "Playlist ID can be deleted"
        })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylist
}