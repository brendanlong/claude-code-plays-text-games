#!/bin/bash

# Parse arguments
COLORIZED=false
if [ "$1" = "--colorize" ]; then
    COLORIZED=true
fi

# Check if the game session exists
if ! tmux has-session -t game_session 2>/dev/null; then
    echo "Error: Game session not found. Start it with ./start_game.sh"
    exit 1
fi

# Capture the entire pane content with spaces preserved
# Include colors only if requested
if [ "$COLORIZED" = true ]; then
    tmux capture-pane -t game_session -peN
else
    tmux capture-pane -t game_session -pN
fi