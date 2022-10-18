import { jsTPS_Transaction } from "../common/jsTPS";

export default class AddSongTransaction extends jsTPS_Transaction{
    constructor (initStore, addSongIndex){
        super();
        this.store = initStore;
        this.addSongIndex = addSongIndex;
    }

    doTransaction() {
        this.store.addSong();
    }
    
    undoTransaction() {
        console.log(this.addSongIndex)
        this.store.deleteSongWithIndex(this.addSongIndex);
    }
}