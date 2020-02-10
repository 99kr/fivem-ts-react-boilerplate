interface IShow {
    type: string,
    payload: boolean
}

const Show = (
    state = process.env.NODE_ENV == "development",
    data: IShow
) => {
    switch(data.type) {
        case "SHOW":
            return data.payload
        default:
            return state
    }
}

export default Show;
