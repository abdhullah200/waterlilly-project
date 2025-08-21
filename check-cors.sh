#!/bin/bash

echo "CORS and WebSocket Diagnostic Tool"
echo "=================================="

echo -e "\nChecking port visibility..."
PORTS=(3000 5217 7217)
for PORT in "${PORTS[@]}"; do
    VISIBILITY=$(gh codespace ports visibility $PORT 2>/dev/null | grep $PORT | awk '{print $2}')
    echo "Port $PORT visibility: ${VISIBILITY:-unknown}"
done

echo -e "\nTesting CORS headers from backend..."
BACKEND_URL="https://fantastic-funicular-pjrj6g7xjrj6h964x-5217.app.github.dev"
CORS_HEADERS=$(curl -s -I -H "Origin: https://fantastic-funicular-pjrj6g7xjrj6h964x-3000.app.github.dev" \
                       -X OPTIONS "${BACKEND_URL}/api/products" | grep -i "access-control")
if [ -n "$CORS_HEADERS" ]; then
    echo "CORS headers received:"
    echo "$CORS_HEADERS"
else
    echo "No CORS headers received from OPTIONS request!"
fi

echo -e "\nTesting actual API response..."
API_RESPONSE=$(curl -s -H "Origin: https://fantastic-funicular-pjrj6g7xjrj6h964x-3000.app.github.dev" \
                      "${BACKEND_URL}/api/products" -o /dev/null -w "%{http_code}")
echo "API HTTP status: $API_RESPONSE"

echo -e "\nTesting WebSocket endpoint..."
WS_RESPONSE=$(curl -s -I -H "Origin: https://fantastic-funicular-pjrj6g7xjrj6h964x-3000.app.github.dev" \
                      -H "Connection: Upgrade" \
                      -H "Upgrade: websocket" \
                      -H "Sec-WebSocket-Version: 13" \
                      -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
                      "${BACKEND_URL}/ws" | head -1)
echo "WebSocket response: ${WS_RESPONSE:-No response}"

echo -e "\nDiagnostic complete. Run this script after making changes to verify connectivity."
