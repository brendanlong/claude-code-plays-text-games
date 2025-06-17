#!/bin/bash

# Check if game name is provided as argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 <game_name>"
    echo "Example: $0 adventure"
    exit 1
fi

# Get the game name from the first argument
GAME="$1"

# Check if the game binary is installed
if ! command -v "$GAME" &> /dev/null; then
    echo "Error: $GAME binary not found. Please install it first."
    exit 1
fi

# Check if a session already exists
if tmux has-session -t game_session 2>/dev/null; then
    echo "A game session is already running."
    echo "To terminate it, run: tmux kill-session -t game_session"
    exit 1
fi

# Start a new detached tmux session running the game
tmux new-session -d -s game_session "$GAME"

echo "$GAME started in tmux session 'game_session'"
echo "Use ./send_command.sh to interact and ./read_output.sh to see the output"