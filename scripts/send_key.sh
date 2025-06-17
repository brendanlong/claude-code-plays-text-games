#!/bin/bash

# Check if keys were provided
if [ $# -eq 0 ]; then
    echo "Error: No keys provided."
    echo "Usage: $0 KeyName [KeyName2 ...]"
    echo "Examples:"
    echo "  $0 Escape        # Send Escape key"
    echo "  $0 C-c          # Send Ctrl+C"
    echo "  $0 Tab Enter    # Send Tab key followed by Enter"
    echo "  $0 a b c Enter  # Send multiple keys in sequence"
    exit 1
fi

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Send each key in sequence
for key in "$@"; do
    tmux send-keys -t game_session "$key"
    echo "Key sent: $key"
done