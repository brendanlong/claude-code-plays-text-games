# Claude Plays Colossal Cave Adventure

This project contains utility scripts that allow Claude to interact with the classic text adventure game "Colossal Cave Adventure" (the `adventure` binary) through tmux.

## Scripts

- `start_game.sh` - Starts a new game in a tmux session
- `send_command.sh` - Sends a command to the running game
- `read_output.sh` - Reads the current output from the game

## Usage

1. Start the game:
   ```
   ./start_game.sh
   ```

2. Send a command to the game:
   ```
   ./send_command.sh "command"
   ```

3. Read the current output:
   ```
   ./read_output.sh
   ```

## Example Interaction

```bash
# Start a new game
./start_game.sh

# Read the initial output
./read_output.sh

# Send a command
./send_command.sh "help"

# Read the response
./read_output.sh
```

## Requirements

- tmux
- The `adventure` binary must be installed on your system