import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    //START OF MY CODE
    function handleAddSong(){
        if (store.currentList){
            store.addSongTransaction();
        }
    }

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";

    let canAddSong = store.currentList !== null;
    let canClose = store.currentList !== null;
    let canUndo = store.canUndo();
    let canRedo = store.canRedo();
    const isModalOpen = (store.listNameDeleteActive || store.songNameDeleteActive || store.songNameEditActive);

    // if (store.currentList){
    //     console.log(isModalOpen);
    //     if (isModalOpen === false){
    //         if (canAddSong){
    //             addSongClass = enableButton(addSongClass);
    //         }
    //         if (canClose){
    //             closeClass = enableButton(closeClass);
    //         }
    //         if (canUndo){
    //             undoClass = enableButton(undoClass);
    //         }
    //         if (canRedo){
    //             redoClass = enableButton(redoClass);
    //         }
    //     }
    // }

    if (!store.currentList){
        addSongClass += " disabled";
        undoClass += " disabled";
        redoClass += " disabled";
        closeClass += " disabled";
    }

    if (!canAddSong || isModalOpen){
        addSongClass += " disabled";
    }
    if (!canUndo || isModalOpen){
        undoClass += " disabled";
    }
    if (!canRedo || isModalOpen){
        redoClass += " disabled";
    }
    if (!canClose || isModalOpen){
        closeClass += " disabled";
    }
    
    //END OF MY CODE

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                value="+"
                className={addSongClass}
                disabled = {editStatus || isModalOpen || !canAddSong}
                onClick = {handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                value="⟲"
                className={undoClass}
                disabled = {editStatus || isModalOpen || !canUndo}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                value="⟳"
                className={redoClass}
                disabled = {editStatus || isModalOpen || !canRedo}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                value="&#x2715;"
                className={closeClass}
                disabled = {editStatus || isModalOpen || !canClose}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;