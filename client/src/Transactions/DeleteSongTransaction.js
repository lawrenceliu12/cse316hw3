import { jsTPS_Transaction } from "../common/jsTPS";

export default class DeleteSongTransaction extends jsTPS_Transaction{
    constructor (initStore, index){
        super();
        this.store = initStore;
        this.index = index;
        this.deletedSong = this.store.currentList.songs[index];
    }

    doTransaction() {
        this.store.deleteSong();
    }
    
    undoTransaction() {
        this.store.addSongWithIndex(this.index, this.deletedSong);
    }
}