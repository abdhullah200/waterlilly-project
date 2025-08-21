#!/bin/bash

echo "===== Connection Diagnostic Tool ====="

# Get the Codespace name correctly
CODESPACE_PREFIX=$(echo $CODESPACE_NAME | cut -d'-' -f1)
if [ -z "$CODESPACE_PREFIX" ]; then
    # Alternative method to get the prefix
    CODESPACE_PREFIX=$(hostname | cut -d'.' -f1)
fi

echo "Detected codespace prefix: $CODESPACE_PREFIX"
FRONTEND_URL="https://${CODESPACE_PREFIX}-3000.app.github.dev"
BACKEND_URL="https://${CODESPACE_PREFIX}-5217.app.github.dev"
BACKEND_HTTPS_URL="https://${CODESPACE_PREFIX}-7217.app.github.dev"

echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo "Backend HTTPS URL: $BACKEND_HTTPS_URL"

echo -e "\n1. Checking port visibility..."
for PORT in 3000 5217 7217; do
    echo -n "Port $PORT: "
    VISIBILITY=$(gh codespace ports visibility $PORT 2>/dev/null | grep $PORT | awk '{print $2}')
    echo "${VISIBILITY:-unknown}"
done

echo -e "\n2. Testing CORS headers from backend..."
echo "Sending OPTIONS request to API endpoint..."
curl -s -I -H "Origin: $FRONTEND_URL" -X OPTIONS $BACKEND_URL/api/products | grep -i "access-control"

echo -e "\n3. Testing actual API response..."
echo "Sending GET request to API endpoint..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Origin: $FRONTEND_URL" $BACKEND_URL/api/products)
echo "API HTTP Status: $STATUS"

echo -e "\n4. Testing WebSocket handshake..."
echo "Sending WebSocket upgrade request..."
curl -s -I -H "Connection: Upgrade" -H "Upgrade: websocket" \
     -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
     -H "Origin: $FRONTEND_URL" \
     $BACKEND_URL/ws | head -1

echo -e "\nDiagnostic complete. Access your applications at:"
echo "Frontend: $FRONTEND_URL"
echo "Backend API: $BACKEND_URL/api/products"
echo "WebSocket: $BACKEND_URL/ws"
