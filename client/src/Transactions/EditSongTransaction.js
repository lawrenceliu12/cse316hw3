import { jsTPS_Transaction } from "../common/jsTPS";

export default class EditSongTransaction extends jsTPS_Transaction{
    constructor (initStore, index, title, artist, link, oldSong){
        super();
        this.store = initStore;
        this.index = index;
        this.title = title;
        this.artist = artist;
        this.link = link;
        this.oldSong = oldSong;
        
    }

    doTransaction() {
        this.store.editSong(this.index, this.title, this.artist, this.link);
    }
    
    undoTransaction() {
        this.store.editSong(this.index, this.oldSong.title, this.oldSong.artist, this.oldSong.youTubeId);
    }
}