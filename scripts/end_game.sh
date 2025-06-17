#!/bin/bash

# End the game session by killing the tmux session
tmux kill-session -t game_session 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Game session ended successfully."
else
    echo "No active game session found."
fi