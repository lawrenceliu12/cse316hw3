import '../App.css'
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'

function DeleteListModal() 
{
        const { store } = useContext(GlobalStoreContext);
        let name = "modal";
        if(store.listNameDeleteActive){
            name += " is-visible";
        }
        let title = "";
        if (store.idNamePairs){
            for (let i = 0; i < store.idNamePairs.length; i++){
                if (store.idNamePairs[i]._id === store.deleteListID){
                    title += store.idNamePairs[i].name;
                }
            }
        }
        return (
            <div 
                className = {name} 
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-list-root'>
                        <div class="modal-north">
                            Delete playlist?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Are you sure you wish to permanently delete <b>{title}</b>?
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                class="modal-button" 
                                onClick={store.deleteList}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                class="modal-button" 
                                onClick={store.changeDeleteListState}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

export default DeleteListModal;