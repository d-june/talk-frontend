import io from "socket.io-client";

const socket = io("https://talk-api.onrender.com");

export default socket;
