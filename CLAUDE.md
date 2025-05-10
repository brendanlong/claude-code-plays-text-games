# Instructions for Claude Playing Colossal Cave Adventure

## Game Interaction Process

1. **Starting the Game**:
   - Run `./start_game.sh` to launch a new Adventure game session
   - This creates a detached tmux session named 'adventure_session'
   - Only start a new game if one isn't already running

2. **Sending Commands**:
   - Send commands to the game using `./send_command.sh "command"`
   - Example: `./send_command.sh "look"` or `./send_command.sh "go north"`
   - Always quote commands containing spaces
   - After sending a command, always read the output to see the results

3. **Reading Output**:
   - Run `./read_output.sh` to get the current game state
   - Always read the output after every command to understand the game state
   - Parse the output to understand the current location, available items, and possible exits

## Important Notes

- Read the output carefully after each command
- The game doesn't understand all natural language, so use simple one or two-word commands
- Be systematic in exploration and keep track of your path
- The game has a save/restore system (SAVE and RESTORE commands) if needed
