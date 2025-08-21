/**
 * A simple WebSocket client wrapper
 */
class WebSocketClient {
  constructor() {
    this.socket = null;
    this.handlers = [];
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  // Get base URL from current location, replacing port correctly
  _makeWsUrl() {
    const hostname = window.location.hostname; // e.g. fantastic-...-3000.app.github.dev or localhost
    // Codespaces pattern: "<prefix>-3000.app.github.dev" -> replace 3000 with 5217
    if (hostname.endsWith('-3000.app.github.dev')) {
      return `wss://${hostname.replace('-3000.app.github.dev', '-5217.app.github.dev')}/ws`;
    }
    // Generic replacement for hostnames that contain '-3000' suffix
    const m = hostname.match(/^(.*)-3000(\.app\.github\.dev)?$/);
    if (m) {
      return `wss://${m[1]}-5217.app.github.dev/ws`;
    }
    // Local dev
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'ws://localhost:5217/ws';
    }
    // Fallback: attempt same host over wss (no port change)
    return `wss://${hostname}/ws`;
  }

  connect() {
    const wsUrl = this._makeWsUrl();
    console.log(`Attempting to connect to WebSocket at: ${wsUrl}`);

    try {
      // Close any existing connection
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connection established successfully!');
        this.isConnected = true;
        this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
      };

      this.socket.onmessage = (evt) => {
        console.log('WebSocket message received:', evt.data);
        try {
          const data = JSON.parse(evt.data);
          this.handlers.forEach(handler => handler(data));
        } catch (error) {
          // Handle non-JSON messages
          this.handlers.forEach(handler => handler(evt.data));
        }
      };

      this.socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.code} ${event.reason || ''}`);
        this.isConnected = false;
        // Try to reconnect with exponential backoff, but only if we haven't exceeded max attempts
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
          setTimeout(() => this.connect(), delay);
        } else {
          console.log('Max reconnect attempts reached');
        }
      };

      this.socket.onerror = (err) => {
        console.error('WebSocket error:', err);
      };
    } catch (err) {
      console.error('WebSocket connect failed:', err);
    }
  }

  send(msg) {
    if (this.socket && this.isConnected) {
      const payload = typeof msg === 'string' ? msg : JSON.stringify(msg);
      this.socket.send(payload);
      return true;
    }
    console.warn('WebSocket not connected');
    return false;
  }

  onMessage(handler) {
    this.handlers.push(handler);
  }

  disconnect() {
    if (this.socket) {
      // Prevent reconnection attempts
      this.reconnectAttempts = this.maxReconnectAttempts;
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

export default WebSocketClient;