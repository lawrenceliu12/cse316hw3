import '../App.css'
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);
    let name = "modal";
    if(store.songNameEditActive){
        name += " is-visible";
    }
    return(
        <div 
            class= {name}
            id="edit-song-modal" 
            data-animation = "slideInOutLeft">
                <div class="modal-root" id='verify-edit-song-root'>
                    
                    <div class="modal-north">
                        Edit playlist?
                    </div>

                    <div class = "modal-center">
                        <div class="modal-center-content">
                            <div class = "edit-modal-content">
                                <div id = "edit-song-title">
                                Title:
                                <input id = "edit-song-title-input"></input>
                                </div>

                                <div id = "edit-song-artist">
                                Artist:
                                <input id = "edit-song-artist-input"></input>
                                </div>

                                <div id = "edit-song-link">
                                YouTube ID:
                                <input id = "edit-song-link-input"></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class = "modal-south">
                        <input type="button" 
                            id="edit-song-confirm-button" 
                            class="modal-button" 
                            onClick={store.editSongTransaction}
                            value='Confirm' />
                        <input type="button" 
                            id="edit-song-cancel-button" 
                            class="modal-button" 
                            onClick={store.changeEditSongState}
                            value='Cancel' />
                    </div>

                </div>
        </div>
    )
}
export default EditSongModal;