import React from 'react';
import styled, { FalseyValue } from 'styled-components';

import { useSelector } from '../../index';
import Nui from "../../Nui";
import { store } from "../../index";

Nui.onEvent("SHOW", (payload: boolean) => {
    store.dispatch({type: "SHOW", payload})
})

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const App = () => {
    const show: boolean = useSelector((state: any) => state.Show)

    return (
        <Container hidden={!show}>
            <h1 style={{fontSize: "30px"}}>{show.toString()}</h1>
        </Container>
    )
}

export default App