let resourceName: string;
let events: {[key: string]: Function} = {
    "SEND_RESOURCENAME": (resName: string) => resourceName = resName,
}

export default class Nui {

    public static post(event: string, data = {}, resName = resourceName) {
        return fetch(`http://${resName}/${event}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        });
    }

    public static onEvent(type: string, func: Function) {
        if (events[type]) {
            console.log(
                `%c[Nui.onEvent]%c: Event ${type} is already declared.`,
                "color: red;", "color: white;"
            )
            return;
        }
        events[type] = func
    }

    public static emitEvent(type: string, payload: any) {
        window.dispatchEvent(new MessageEvent("message", {
            data: {type, payload}
        }))
    }
};

export const EventListener = () => {
    window.addEventListener('message', (e: MessageEvent) => {
        if (!events[e.data.type]) return;
        events[e.data.type](e.data.payload)
    });

    return null; // dont render anything, just listen for events.
}
