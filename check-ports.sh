#!/bin/bash

echo "Checking GitHub Codespaces port accessibility..."
echo "================================================"

PORTS=(3000 5217 7217)
PREFIX=$(gh codespace list | grep "^*" | awk '{print $3}')

if [ -z "$PREFIX" ]; then
    echo "Error: Could not determine Codespace hostname prefix"
    exit 1
fi

for PORT in "${PORTS[@]}"; do
    echo -n "Checking port $PORT... "
    VISIBILITY=$(gh codespace ports visibility $PORT -c $CODESPACE_NAME | grep $PORT | awk '{print $2}')
    echo "Status: $VISIBILITY"
    
    echo -n "Testing HTTP access to port $PORT... "
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -m 5 https://$PREFIX-$PORT.app.github.dev/ || echo "Failed")
    echo "HTTP Status: $HTTP_STATUS"
    
    echo "---------------------------------------"
done

echo "Done checking ports."
