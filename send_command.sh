#!/bin/bash

# Check if a command was provided
if [ $# -eq 0 ]; then
    echo "Error: No command provided."
    echo "Usage: $0 \"command\""
    exit 1
fi

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Send the command to the tmux session
tmux send-keys -t game_session "$1" Enter

echo "Command sent: \"$1\""