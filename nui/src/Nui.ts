let resourceName: string;
let events: {[key: string]: Function} = {
    "SEND_RESOURCENAME": (resName: string) => resourceName = resName,
}

export default class Nui {

    static post(event: string, data = {}, resName = resourceName,) {

        return fetch(`http://${resName}/${event}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        });
    }

    static newEvent(type: string, func: Function) {events[type] = func}
    
};

export const EventListener = () => {
    window.addEventListener('message', (e: MessageEvent) => {
        if (!events[e.data.type]) return;
        events[e.data.type](e.data.payload)
    });

    return null; // dont render anything, just listen for events.
}