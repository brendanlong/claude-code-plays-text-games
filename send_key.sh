#!/bin/bash

# Check if a key was provided
if [ $# -eq 0 ]; then
    echo "Error: No key provided."
    echo "Usage: $0 KeyName"
    echo "Examples:"
    echo "  $0 Escape     # Send Escape key"
    echo "  $0 C-c        # Send Ctrl+C"
    echo "  $0 Tab        # Send Tab key"
    echo "  $0 Enter      # Send Enter key"
    exit 1
fi

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Send the special key without Enter
tmux send-keys -t game_session "$1"
echo "Key sent: $1"