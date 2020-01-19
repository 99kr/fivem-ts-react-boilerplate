interface IAddMessage {
    type: string,
    payload: string
}

export const Messages = (state: string[] = [], data: IAddMessage) => {
    switch(data.type) {
        case "ADD_MESSAGE":
            return [
                ...state,
                data.payload
            ]
        default:
            return state
    }
}

interface IToggle {
    type: string,
    payload: boolean
}

export const Toggle = (state = false, data: IToggle) => {
    switch(data.type) {
        case "TOGGLE":
            return data.payload
        default:
            return state
    }
}