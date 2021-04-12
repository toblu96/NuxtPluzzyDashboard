export default async function (context, inject) {

    // websocket implementations, listen for file changes
    var exampleSocket = new WebSocket("ws://192.168.2.21:1880/websocket", "NuxtPluzzyDashboard");

    exampleSocket.onopen = function (event) {
        exampleSocket.send("Hello from NuxtPluzzyDashboard");
    };

    exampleSocket.onmessage = function (event) {

        const data = JSON.parse(event.data)

        switch (data.topic) {
            case "gitlab commit":
                context.store.commit("gitFiles/updateConfigFiles");
                context.store.commit("gitFiles/updateGraphicFiles");
                context.store.commit("gitFiles/updateCommitMessages");
                break;
            default:
                console.log(`[ws] Websocket topic "${data.topic}" not handled..`);
        }

    }
    exampleSocket.onerror = function (event) {
        console.log(event);
    }
    exampleSocket.onclose = function (event) {
        console.log(event);
    }
}