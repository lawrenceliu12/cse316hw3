import './App.css';
import { React, useContext } from 'react'
import { GlobalStoreContext } from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar, DeleteListModal, DeleteSongModal, EditSongModal } from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const {store} = useContext(GlobalStoreContext);
    let handleKeyDown = (event) => {
        if (event.ctrlKey && event.code === 'KeyZ'){
            store.undo();
        }
        if (event.ctrlKey && event.code === 'KeyY'){
            store.redo();
        }
    }

    document.onkeydown = handleKeyDown;
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
            <DeleteListModal />
            <DeleteSongModal />
            <EditSongModal />
        </Router>
    )
}

export default App