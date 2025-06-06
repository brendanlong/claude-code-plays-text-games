# Claude Plays Terminal Games

This project contains utility scripts that allow Claude to interact with various terminal-based games through tmux.

## Scripts

- `start_game.sh` - Starts a new game in a tmux session
- `send_command.sh` - Sends a command to the running game
- `read_output.sh` - Reads the current output from the game
- `end_game.sh` - Terminates the running game session

## Configuration

Before using these scripts, you need to specify which game to play:

1. Create a `game_config.txt` file with the name of the game executable:
   ```bash
   echo "adventure" > game_config.txt
   ```

   Other examples:
   - `echo "nethack" > game_config.txt` for NetHack
   - `echo "zork" > game_config.txt` for Zork
   - Any other terminal-based game executable

## Usage

1. Configure the game (see above)

2. Start the game:
   ```
   ./start_game.sh
   ```

3. Send a command to the game:
   ```
   ./send_command.sh "command"
   ```

4. Read the current output:
   ```
   ./read_output.sh
   ```

5. End the game session when done:
   ```
   ./end_game.sh
   ```

## Example Interaction

```bash
# Configure to play adventure
echo "adventure" > game_config.txt

# Start a new game
./start_game.sh

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
- The `game_config.txt` file is ignored by git for local configuration