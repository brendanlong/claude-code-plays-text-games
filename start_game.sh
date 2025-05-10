#!/bin/bash

# Check if adventure is installed
if ! command -v adventure &> /dev/null; then
    echo "Error: adventure binary not found. Please install it first."
    exit 1
fi

# Check if a session already exists
if tmux has-session -t adventure_session 2>/dev/null; then
    echo "An adventure session is already running."
    echo "To terminate it, run: tmux kill-session -t adventure_session"
    exit 1
fi

# Start a new detached tmux session running adventure
tmux new-session -d -s adventure_session 'adventure'

echo "Adventure game started in tmux session 'adventure_session'"
echo "Use ./send_command.sh to interact and ./read_output.sh to see the output"