import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from '../../index';

import Nui from "../../Nui";
import { store } from "../../index";

Nui.newEvent("ADD_MESSAGE", (payload: string) => {
    store.dispatch({type: "ADD_MESSAGE", payload})
    Nui.post("message", {payload})
})

Nui.newEvent("TOGGLE", (payload: boolean) => {
    store.dispatch({type: "TOGGLE", payload})
})

const useStyles = makeStyles({
    root: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    message: {
        display: "table",
        marginBottom: "1%",
        backgroundColor: "white",
        fontSize: "24px",
        width: "auto",
        paddingLeft: "0.5%",
        paddingRight: "0.5%",
        borderRadius: "5px",
        border: "3px solid rgb(225, 225, 225)"
    },
})

const App = () => {
    const classes = useStyles({})

    const messages: string[] = useSelector((state: any) => state.Messages)
    const hidden: boolean = useSelector((state: any) => state.Toggle)

    const handleSubmit = () => {
        const inputElement = document.getElementById("message-reader") as HTMLInputElement
        store.dispatch({type: "ADD_MESSAGE", payload: inputElement.value})
    }

    return (
        <div hidden={!hidden} className={classes.root}>
            <input id="message-reader" type="text"/>
            <button onClick={handleSubmit}>Add Message</button>
            {
                messages?.map(msg => (
                    <h1 className={classes.message} key={Math.random() * 99e99}>{msg}</h1>
                ))
            }
        </div>
    )
}

export default App