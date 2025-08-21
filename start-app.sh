#!/bin/bash

echo "===== Waterlily Application Setup ====="
echo "This script will help you set up and run the Waterlily application."

# 1. Get the Codespace name and URLs
# Try different methods to reliably get the codespace name
CODESPACE_PREFIX=$(echo $GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN | cut -d'-' -f1)
if [ -z "$CODESPACE_PREFIX" ]; then
    CODESPACE_PREFIX=$(hostname | grep -o '^[^\.]*')
fi

if [ -z "$CODESPACE_PREFIX" ]; then
    CODESPACE_PREFIX="codespaces-$(head -c 6 /dev/urandom | base64 | tr -d '+/' | tr '[:upper:]' '[:lower:]')"
    echo "Could not determine Codespace name, using a generated one: $CODESPACE_PREFIX"
else
    echo "Detected Codespace prefix: $CODESPACE_PREFIX"
fi

FRONTEND_URL="https://${CODESPACE_PREFIX}-3000.app.github.dev"
BACKEND_URL="https://${CODESPACE_PREFIX}-5217.app.github.dev"
BACKEND_HTTPS_URL="https://${CODESPACE_PREFIX}-7217.app.github.dev"

echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo "Backend HTTPS URL: $BACKEND_HTTPS_URL"

# 2. Make ports public
echo -e "\n===== Making ports public ====="
for PORT in 3000 5217 7217; do
    echo "Setting port $PORT to public..."
    gh codespace ports visibility $PORT:public
done

# 3. Check if services are running
echo -e "\n===== Checking running services ====="
BACKEND_RUNNING=$(ps aux | grep "dotnet run" | grep -v grep || true)
FRONTEND_RUNNING=$(ps aux | grep "npm start" | grep -v grep || true)

echo "Backend running: $(if [ -n "$BACKEND_RUNNING" ]; then echo "Yes"; else echo "No"; fi)"
echo "Frontend running: $(if [ -n "$FRONTEND_RUNNING" ]; then echo "Yes"; else echo "No"; fi)"

# 4. Display instructions
echo -e "\n===== Instructions to run the application ====="
echo "Run these commands in separate terminal windows:"
echo ""
echo "Terminal 1 - Backend:"
echo "cd /workspaces/waterlilly-project/Waterlily.MVC"
echo "dotnet run --urls \"http://0.0.0.0:5217;https://0.0.0.0:7217\""
echo ""
echo "Terminal 2 - Frontend:"
echo "cd /workspaces/waterlilly-project/Waterlily.MVC/waterlily-react"
echo "npm start"
echo ""
echo "After both services are running, you can access:"
echo "Frontend: $FRONTEND_URL"
echo "Backend API: $BACKEND_URL/api/products"
echo "WebSocket: $BACKEND_URL/ws"

# 5. Offer to start services in the background
echo -e "\n===== Would you like to start the services in the background? ====="
echo "Note: You can press Ctrl+C to terminate this script without stopping the services."

read -p "Start backend service in the background? (y/n): " START_BACKEND
if [[ "$START_BACKEND" =~ ^[Yy]$ ]]; then
    echo "Starting backend service in the background..."
    cd /workspaces/waterlilly-project/Waterlily.MVC && \
    dotnet run --urls "http://0.0.0.0:5217;https://0.0.0.0:7217" > backend.log 2>&1 &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
    echo "Logs are being written to /workspaces/waterlilly-project/Waterlily.MVC/backend.log"
    echo "To stop it later, run: kill $BACKEND_PID"
    cd - > /dev/null
fi

read -p "Start frontend service in the background? (y/n): " START_FRONTEND
if [[ "$START_FRONTEND" =~ ^[Yy]$ ]]; then
    echo "Starting frontend service in the background..."
    cd /workspaces/waterlilly-project/Waterlily.MVC/waterlily-react && \
    npm start > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
    echo "Logs are being written to /workspaces/waterlilly-project/Waterlily.MVC/waterlily-react/frontend.log"
    echo "To stop it later, run: kill $FRONTEND_PID"
    cd - > /dev/null
fi

echo -e "\n===== Verification ====="
echo "After starting both services, run this command to verify connectivity:"
echo "chmod +x /workspaces/waterlilly-project/check-connection.sh"
echo "./check-connection.sh"

echo -e "\n===== Opening Application ====="
echo "To open the application in your browser, run:"
echo "\"\$BROWSER\" $FRONTEND_URL"
