import '../App.css'
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'

function DeleteSongModal() 
{
        const { store } = useContext(GlobalStoreContext);
        let name = "modal";
        if(store.songNameDeleteActive){
            name += " is-visible";
        }
        return (
            <div
                className = {name}
                id = "delete-song-modal"
                data-animation = "slideInOutLeft">
                    <div class = "modal-root" id = "verify-delete-song-root">

                        <div class = "modal-north">
                            Delete song?
                        </div>

                        <div class = "modal-center">
                            <div class = "modal-center-content">
                                Are you sure you wish to permanently delete song from the playlist?
                            </div>
                        </div>
                        
                        <div class = "modal-south">
                            <input type = "button"
                                id = "delete-song-confirm-button"
                                class = "modal-button"
                                onClick = {store.deleteSongTransaction}
                                value = "Confirm" />
                            <input type = "button"
                                id = "delete-song-cancel-button"
                                class = "modal-button"
                                onClick = {store.changeDeleteSongState}
                                value = "Cancel" />

                        </div>
                    </div>
            </div>
        )
    }

export default DeleteSongModal;