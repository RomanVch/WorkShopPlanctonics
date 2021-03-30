import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/header";
import {Main} from "./components/main";
import {Chats} from "./components/chat/chat";
import {MessageGood} from "./components/Alert";
import {chat} from "./utils/ENUM";


function App() {
    const [openAlert, setOpenAlert] = React.useState(false);
    return (
        <HashRouter>
            <div className="App">
                <Header setOpenAlert={setOpenAlert}/>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Main/>}/>
                        <Route path="/work" render={() => <Chats typeChat={chat.Work}/>}/>
                        <Route path="/flood" render={() => <Chats typeChat={chat.Flood}/>}/>
                        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect path={'*'} to={'/404'}/>
                    </Switch>
                    <MessageGood openAlert={openAlert} setOpenAlert={setOpenAlert}/>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
