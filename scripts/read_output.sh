#!/bin/bash

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Capture the entire pane content with colors and spaces preserved
tmux capture-pane -t game_session -peN