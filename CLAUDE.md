# Instructions for Claude Playing Terminal Games

## Game Interaction Process

1. **Starting the Game**:
   - Run `./start_game.sh <game_name>` to launch a new game session
   - Example: `./start_game.sh adventure` for Colossal Cave Adventure
   - Example: `./start_game.sh nethack` for NetHack
   - This creates a detached tmux session named 'game_session'
   - Only start a new game if one isn't already running
   - The game must be installed and available in your PATH

2. **Sending Commands**:
   - Send commands to the game using `./send_command.sh "command"`
   - Example: `./send_command.sh "look"` or `./send_command.sh "go north"`
   - Always quote commands containing spaces
   - After sending a command, always read the output to see the results

3. **Reading Output**:
   - Run `./read_output.sh` to get the current game state
   - Always read the output after every command to understand the game state
   - Parse the output based on the specific game you're playing

4. **Ending the Game**:
   - Run `./end_game.sh` to terminate the game session
   - This kills the tmux session running the game

## Important Notes

- Different games have different command syntax and conventions
- Read the output carefully after each command
- Be systematic in your approach and adapt to each game's unique mechanics
- Some games may have save/restore features - check their documentation
