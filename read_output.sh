#!/bin/bash

# Check if the adventure session exists
if ! tmux has-session -t adventure_session 2>/dev/null; then
    echo "Error: Adventure session not found. Start it with ./start_game.sh"
    exit 1
fi

# Capture the entire pane content
tmux capture-pane -t adventure_session -p