const socket = io("/");

// creating peer
// undefined because we don't have a server running on client side
var peer = new PeerServer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "443"
});

const user = prompt("Enter your name");

$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })

    $("#send").click(function () {
        if ($("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })

    $("#chat_message").keydown(function (e) {
        if (e.key == "Enter" && $("#chat_message").val().length !== 0) {
            socket.emit("message", $("#chat_message").val());
            $("#chat_message").val("");
        }
    })

});

// when the page is open it triggers the socket.emit()
// peer.on() is a listener that listens to "open" event
peer.on("open", (id) => {
    // generates a new id
    socket.emit("join-room", ROOM_ID, id, user);
});

socket.on("createMessage", (message) => {
    $(".messages").append(`
        <div class="message">
            <b><i class="fa fa-user-circle"></i> <span> ${
                userName == user ? "Me" : userName
            }</span></b>
            <span>${message}</span>
        </div>
    `)
});