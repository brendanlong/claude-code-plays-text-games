#!/bin/bash

# Check if game_config.txt exists
if [ ! -f "game_config.txt" ]; then
    echo "Error: game_config.txt not found. Please create it with the game name."
    exit 1
fi

# Read the game name from the config file
GAME=$(cat game_config.txt | tr -d '\n')

# Check if the game is specified
if [ -z "$GAME" ]; then
    echo "Error: No game specified in game_config.txt"
    exit 1
fi

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