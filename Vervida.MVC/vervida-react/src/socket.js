import WebSocketClient from './WebSocketClient';

// Create a singleton instance of the WebSocketClient
const socket = new WebSocketClient();

export const initSocket = () => {
    // Connect to the WebSocket server
    socket.connect();
    
    // Set up a basic message handler for logging
    socket.onMessage((data) => {
        console.log('WebSocket message received:', data);
    });
    
    return socket;
};

// Initialize the socket connection when this module is imported
const instance = initSocket();

export default instance;
