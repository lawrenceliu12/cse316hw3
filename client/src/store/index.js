import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
//TRANSACTIONS
import AddSongTransaction from '../Transactions/AddSongTransaction';
import MoveSongTransaction from '../Transactions/MoveSongTransaction'
import DeleteSongTransaction from '../Transactions/DeleteSongTransaction';
import EditSongTransaction from '../Transactions/EditSongTransaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_LIST_NAME_DELETE_ACTIVE: "SET_LIST_NAME_DELETE_ACTIVE",
    SET_LIST_NAME_DELETE_TO_FALSE: "SET_LIST_NAME_DELETE_TO_FALSE",
    DELETE_CURRENT_LIST: "DELETE_CURRENT_LIST",
    ADD_SONG: "ADD_SONG",
    SET_SONG_NAME_DELETE_ACTIVE: "SET_SONG_NAME_DELETE_ACTIVE",
    SET_SONG_NAME_DELETE_ACTIVE_TO_FALSE: "SET_SONG_NAME_DELETE_ACTIVE_TO_FALSE",
    REMOVE_SONG: "REMOVE_SONG",
    SET_SONG_NAME_EDIT_ACTIVE: "SET_SONG_NAME_EDIT_ACTIVE",
    SET_SONG_NAME_EDIT_ACTIVE_TO_FALSE: "SET_SONG_NAME_EDIT_ACTIVE_TO_FALSE",
    EDIT_SONG: "EDIT_SONG",
    OLD_EDIT_SONG: "OLD_EDIT_SONG",
    DRAG_START: "DRAG_START",
    DROP: "DROP",
    REMOVE_SONG_WITH_INDEX: "REMOVE_SONG_WITH_INDEX",
    ADD_SONG_WITH_WITH_INDEX: "ADD_SONG_WITH_WITH_INDEX",
    REMOVE_LIST_MODAL_OPEN_CHECKER: "REMOVE_LIST_MODAL_OPEN_CHECKER",
    REMOVE_SONG_MODAL_OPEN_CHECKER: "REMOVE_SONG_MODAL_OPEN_CHECKER",
    EDIT_SONG_MODAL_OPEN_CHECKER: "EDIT_SONG_MODAL_OPEN_CHECKER"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            //START OF MY CASES
            //START DELETING A LIST
            case GlobalStoreActionType.SET_LIST_NAME_DELETE_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter,
                    listNameDeleteActive: true,
                    deleteListID: payload
                });
            }
            case GlobalStoreActionType.SET_LIST_NAME_DELETE_TO_FALSE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter,
                    listNameDeleteActive: false,
                    deleteListID: payload
                });
            }
            case GlobalStoreActionType.DELETE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: payload,
                    newListCounter: store.newListCounter - 1,
                    listNameDeleteActive: false,
                })
            }
            case GlobalStoreActionType.ADD_SONG: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_DELETE_ACTIVE: {
                return setStore({
                    deleteSongID: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    songNameDeleteActive: true,
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_DELETE_ACTIVE_TO_FALSE: {
                return setStore({
                    deleteSongID: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    songNameDeleteActive: false,
                })
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE: {
                return setStore({
                    editSongID: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    songNameEditActive: true,
                })
            }
            case GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE_TO_FALSE: {
                return setStore({
                    editSongID: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    songNameEditActive: false,
                })
            }
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.OLD_EDIT_SONG: {
                return setStore({
                    oldSong: payload,
                    currentList: store.currentList,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.DRAG_START: {
                return setStore({
                    currentList: store.currentList,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter,
                    dragIndex: payload
                })
            }
            case GlobalStoreActionType.DROP: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter,
                })
            }
            case GlobalStoreActionType.REMOVE_SONG_WITH_INDEX: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.ADD_SONG_WITH_WITH_INDEX: {
                return setStore({
                    currentList: payload,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter
                })
            }
            case GlobalStoreActionType.REMOVE_LIST_MODAL_OPEN_CHECKER: {
                return setStore({
                    currentList: store.currentList,
                    idNamePairs: store.idNamePairs,
                    newListCounter: store.newListCounter,
                    removeListFlag: true
                })
            }
            //END OF MY CASES
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    //START OF MY OWN CODE
    store.createNewList = function () {
        let newName = "Untitled";
        let playlist = {
            name: newName,
            songs: []
        }
        async function createPlaylist(newPlaylist) {
            let response = await api.createList(newPlaylist);
            if (response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: response.data.playlist
                })
            }
            store.history.push('/playlist/' + response.data.playlist._id)
        }
        createPlaylist(playlist);
    }

    store.setIsListNameDeleteActive = function (id) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_DELETE_ACTIVE,
            payload: id
        });
    }

    store.changeDeleteListState = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_DELETE_TO_FALSE,
            payload: null
        });
    }

    store.deleteList = function () {
        let id = store.deleteListID;
        async function deletePlaylist(id) {
            let response = await api.deleteList(id)
            if (response.data.success){
                let response = await api.getPlaylistPairs();
                storeReducer({
                    type: GlobalStoreActionType.DELETE_CURRENT_LIST,
                    payload: response.data.idNamePairs
                })
            }
        }
        deletePlaylist(id);
    }

    store.addSong = function (){
        let newSong = {
            title: "Untitled",
            artist: "Unknown",
            youTubeId: "dQw4w9WgXcQ"
        }

        let id = store.currentList._id;

        async function addSong(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                response.data.playlist.songs.push(newSong);
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.ADD_SONG,
                        payload: response.data.playlist
                    })
                }
                updateList(playlist);
            }
        }
        addSong(id);
    }

    store.addSongWithIndex = function (index, deletedSong){
        let id = store.currentList._id;

        async function addWithIndex (id){
            let response = await api.getPlaylistById(id);
            if (response.data.success){
                response.data.playlist.songs.splice(index, 0, deletedSong);
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.ADD_SONG_WITH_WITH_INDEX,
                        payload: response.data.playlist
                    })
                }
                updateList(playlist);
            }
        }
        addWithIndex(id);
    }

    store.setIsSongNameDeleteActive = function (id) {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_DELETE_ACTIVE,
            payload: id
        });
    }

    store.changeDeleteSongState = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_DELETE_ACTIVE_TO_FALSE,
            payload: null
        });
    }

    store.deleteSong = function () {
        let songID = store.deleteSongID;
        let playlistID = store.currentList._id;

        async function removeSong(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success && songID >= 0) {
                response.data.playlist.songs.splice(songID, 1);
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.REMOVE_SONG,
                        payload: response.data.playlist
                    })
                }
                updateList(playlist);
            }
        }
        removeSong(playlistID);
    }

    store.deleteSongWithIndex = function (songID){
        let playlistID = store.currentList._id;

        async function removeSong(id, songID) {
            let response = await api.getPlaylistById(id);
            if (response.data.success && songID >= 0) {
                response.data.playlist.songs.splice(songID, 1);
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.REMOVE_SONG_WITH_INDEX,
                        payload: response.data.playlist
                    })
                }
                updateList(playlist);
            }
        }
        removeSong(playlistID, songID);
    }

    store.setIsSongNameEditActive = function (id, song) {
        document.getElementById("edit-song-title-input").value = song.title;
        document.getElementById("edit-song-artist-input").value = song.artist;
        document.getElementById("edit-song-link-input").value = song.youTubeId;

        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE,
            payload: id
        });
    }

    store.changeEditSongState = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_NAME_EDIT_ACTIVE_TO_FALSE,
            payload: null
        });
    }

    store.editSong = function(editID, newTitle, newArtist, newLink) {
        let playlistID = store.currentList._id;

        async function editSong(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let oldSong = response.data.playlist.songs[editID];
                storeReducer({
                    type: GlobalStoreActionType.OLD_EDIT_SONG,
                    payload: oldSong
                })
                response.data.playlist.songs[editID] = {
                    title: newTitle,
                    artist: newArtist,
                    youTubeId: newLink
                }
                let playlist = response.data.playlist;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.EDIT_SONG,
                        payload: response.data.playlist
                    })
                }
                updateList(playlist);
            }
        }
        editSong(playlistID);
    }

    store.handleDragStart = function (index){
        storeReducer({
            type: GlobalStoreActionType.DRAG_START,
            payload: index
        })
    }

    store.handleDrop = function (oldIndex, newIndex){
        let draggedSong = store.currentList.songs[oldIndex]
        let dropSong = store.currentList.songs[newIndex]

        let playlistID = store.currentList._id;

        let temp = dropSong;
        store.currentList.songs[newIndex] = draggedSong;
        store.currentList.songs[oldIndex] = temp;

        async function swapSongs(id){
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    storeReducer({
                        type: GlobalStoreActionType.DROP,
                        payload: response.data.playlist
                    })
                }
                updateList(store.currentList);
            }
        }
        swapSongs(playlistID);
    }

    //START OF TRANSACTIONS
    store.addSongTransaction = function (){
        let addSongIndex = store.currentList.songs.length;
        console.log(addSongIndex);

        let transaction = new AddSongTransaction(store, addSongIndex);
        tps.addTransaction(transaction);
    }

    store.moveSongTransaction = function(oldIndex, newIndex){
        if (oldIndex !== newIndex){
            let transaction = new MoveSongTransaction(store, oldIndex, newIndex);
            tps.addTransaction(transaction);
        }
    }

    store.deleteSongTransaction = function(){
        let transaction = new DeleteSongTransaction(store, store.deleteSongID);
        tps.addTransaction(transaction);
    }

    store.editSongTransaction = function(){
        let newTitle = document.getElementById("edit-song-title-input").value;
        let newArtist = document.getElementById("edit-song-artist-input").value;
        let newLink = document.getElementById("edit-song-link-input").value;

        let transaction = new EditSongTransaction(store, store.editSongID, newTitle, newArtist, newLink, store.currentList.songs[store.editSongID]);
        tps.addTransaction(transaction);
    }

    store.canUndo = function(){
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function (){
        return tps.hasTransactionToRedo();
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}