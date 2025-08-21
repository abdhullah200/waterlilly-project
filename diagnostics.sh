#!/bin/bash

echo "======== Waterlily Diagnostics ========"
echo "Running diagnostics to help troubleshoot connection issues"
echo

echo "1. Checking GitHub Codespace information:"
echo "----------------------------------------"
CODESPACE_NAME=$(gh codespace list | grep "^*" | awk '{print $2}')
CODESPACE_URL=$(gh codespace list | grep "^*" | awk '{print $3}')
echo "Codespace name: $CODESPACE_NAME"
echo "Codespace URL: $CODESPACE_URL"
echo

echo "2. Checking network ports:"
echo "-------------------------"
echo "Port forwarding configuration:"
gh codespace ports | grep -E '(3000|5217|7217)'
echo
echo "Testing network bindings:"
netstat -tulpn 2>/dev/null | grep -E ':(3000|5217|7217)' || echo "No ports detected with netstat"
echo

echo "3. Testing CORS headers:"
echo "----------------------"
echo "Sending OPTIONS request to API endpoint:"
curl -s -I -X OPTIONS -H "Origin: https://$CODESPACE_URL-3000.app.github.dev" \
     "https://$CODESPACE_URL-5217.app.github.dev/api/products" | grep -i "access-control"
echo

echo "4. Testing WebSocket endpoint:"
echo "----------------------------"
echo "Checking WebSocket endpoint availability:"
curl -s -I -H "Connection: Upgrade" -H "Upgrade: websocket" \
     -H "Origin: https://$CODESPACE_URL-3000.app.github.dev" \
     "https://$CODESPACE_URL-5217.app.github.dev/ws" | head -1
echo

echo "======== Diagnostics Complete ========"
echo "To check your application URLs:"
echo "Frontend: https://$CODESPACE_URL-3000.app.github.dev"
echo "Backend:  https://$CODESPACE_URL-5217.app.github.dev"
echo "Run this script again after making changes to verify improvements"
