export default class EventEmitter {
    private handlers: any

    addChangeEventListener(handler: any) {
        this.handlers.push(handler)
    }

    executeHandlers() {
        this.handlers.forEach((handler: any) => {
            handler()
        })
    }
}