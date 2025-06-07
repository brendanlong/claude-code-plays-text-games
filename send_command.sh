#!/bin/bash

# Check if a command was provided
if [ $# -eq 0 ]; then
    echo "Error: No command provided."
    echo "Usage: $0 \"command\" or $0 --key KeyName"
    echo "Examples:"
    echo "  $0 \"go north\"      # Send text command"
    echo "  $0 --key Escape    # Send Escape key"
    echo "  $0 --key C-c       # Send Ctrl+C"
    exit 1
fi

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Handle special key input
if [ "$1" = "--key" ] || [ "$1" = "-k" ]; then
    if [ -z "$2" ]; then
        echo "Error: No key specified after --key"
        exit 1
    fi
    # Send the special key without Enter
    tmux send-keys -t game_session "$2"
    echo "Key sent: $2"
else
    # Send the command to the tmux session with Enter
    tmux send-keys -t game_session "$1" Enter
    echo "Command sent: \"$1\""
fi