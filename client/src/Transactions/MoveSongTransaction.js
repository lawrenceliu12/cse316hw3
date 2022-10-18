import { jsTPS_Transaction } from "../common/jsTPS";

export default class MoveSongTransaction extends jsTPS_Transaction{
    constructor (initStore, oldIndex, newIndex){
        super();
        this.store = initStore;
        this.oldIndex = oldIndex;
        this.newIndex = newIndex;
    }

    doTransaction() {
        this.store.handleDrop(this.oldIndex, this.newIndex);
    }
    
    undoTransaction() {
        this.store.handleDrop(this.newIndex, this.oldIndex);
    }
}