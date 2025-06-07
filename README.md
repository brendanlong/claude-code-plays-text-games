# Claude Plays Terminal Games

This project contains utility scripts that allow Claude to interact with various terminal-based games through tmux.

## Scripts

- `start_game.sh` - Starts a new game in a tmux session
- `send_command.sh` - Sends a command to the running game
- `read_output.sh` - Reads the current output from the game
- `end_game.sh` - Terminates the running game session

## Usage

1. Start the game by providing the game name as an argument:
   ```
   ./start_game.sh <game_name>
   ```

   Examples:
   - `./start_game.sh adventure` for Colossal Cave Adventure
   - `./start_game.sh nethack` for NetHack
   - `./start_game.sh zork` for Zork
   - Any other terminal-based game executable

2. Send a command to the game:
   ```
   ./send_command.sh "command"
   ```
   
   Or send special keys:
   ```
   ./send_command.sh --key KeyName
   ```
   
   Examples:
   - `./send_command.sh "go north"` - sends text command with Enter
   - `./send_command.sh --key Escape` - sends Escape key
   - `./send_command.sh --key Tab` - sends Tab key
   - `./send_command.sh --key C-c` - sends Ctrl+C
   - `./send_command.sh -k Space` - sends Space key (short form)

3. Read the current output:
   ```
   ./read_output.sh
   ```

4. End the game session when done:
   ```
   ./end_game.sh
   ```

## Example Interaction

```bash
# Start a new adventure game
./start_game.sh adventure

# Read the initial output
./read_output.sh

# Send a command
./send_command.sh "help"

# Read the response
./read_output.sh

# End the game
./end_game.sh
```

## Requirements

- tmux
- The game executable must be installed and available in your PATH