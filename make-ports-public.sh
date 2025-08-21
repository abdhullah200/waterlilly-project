#!/bin/bash
# Make the ports public in GitHub Codespaces

echo "Making ports public for GitHub Codespaces..."

if [[ -z "${CODESPACE_NAME}" ]]; then
    echo "Error: This script should be run in a GitHub Codespace"
    exit 1
fi

# Make all required ports public
echo "Setting ports 3000, 5217, and 7217 to public..."
gh codespace ports visibility 3000:public -c $CODESPACE_NAME
gh codespace ports visibility 5217:public -c $CODESPACE_NAME
gh codespace ports visibility 7217:public -c $CODESPACE_NAME

echo "Done! Your ports should now be publicly accessible."
echo "You can now access your app at:"
echo "  Frontend: https://fantastic-funicular-pjrj6g7xjrj6h964x-3000.app.github.dev"
echo "  Backend:  https://fantastic-funicular-pjrj6g7xjrj6h964x-5217.app.github.dev"
echo "  Backend (HTTPS): https://fantastic-funicular-pjrj6g7xjrj6h964x-7217.app.github.dev"
echo "  HTTP: https://$(gh codespace list | grep "^*" | awk '{print $3}')-5217.app.github.dev"
echo "  HTTPS: https://$(gh codespace list | grep "^*" | awk '{print $3}')-7217.app.github.dev"
echo "  React: https://$(gh codespace list | grep "^*" | awk '{print $3}')-3000.app.github.dev"
