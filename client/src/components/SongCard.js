import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    //START OF MY CODE
    function handleDeleteSong(event){
        event.stopPropagation();
        toggleDelete();
    }

    function toggleDelete() {
        let newActive = !store.songNameDeleteActive;
        if (newActive) {
            store.setIsSongNameDeleteActive(index);
        }
    }

    function handleEditSong(event){
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit(){
        let newActive = !store.songNameEditActive;
        if (newActive){
            store.setIsSongNameEditActive(index, song);
        }
    }

    function handleDragStart(){
        store.handleDragStart(index);
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    // function handleDragEnd(){
    //     store.handleDragEnd(index);
    // }

    function handleDrop(){
        store.moveSongTransaction(store.dragIndex, index);
        // store.moveSongTransaction(index);
    }
    //END OF MY CODE

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick = {handleEditSong}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver = {handleDragOver}
            // onDragEnd={handleDragEnd}
            onDrop={handleDrop}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick = {handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;