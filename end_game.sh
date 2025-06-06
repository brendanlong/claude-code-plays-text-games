#!/bin/bash

# End the Adventure game session by killing the tmux session
tmux kill-session -t adventure_session 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Adventure game session ended successfully."
else
    echo "No active Adventure game session found."
fi