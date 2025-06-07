# MCP Server Setup for Terminal Game Controller

## Installation

Install dependencies:

```bash
npm install
```

## Configuration

Add this to your `~/.claude.json` file:

```json
{
  "mcpServers": {
    "game-controller": {
      "type": "stdio",
      "command": "node",
      "args": ["/home/brendanlong/workspace/claude-code-plays-cave/mcp-server.js"],
      "cwd": "/home/brendanlong/workspace/claude-code-plays-cave"
    }
  }
}
```

Note: Adjust the paths if your project is in a different location.

## Usage

After restarting Claude Code, you'll have access to these tools:

- `start_game`: Start a new game session
  - Parameters: `game_name` (e.g., "adventure", "nethack")
  
- `send_command`: Send text commands to the game
  - Parameters: `command` (the command text)
  
- `send_key`: Send special keys to the game
  - Parameters: `key` (the key name, e.g., "Escape", "C-c", "Tab")
  
- `read_output`: Read the current game screen
  
- `end_game`: Terminate the game session

## Example Usage in Claude Code

```
// Start a game
start_game(game_name="adventure")

// Send a text command
send_command(command="look")

// Send a special key
send_key(key="Escape")

// Read the game output
read_output()

// End the game
end_game()
```

## Troubleshooting

- Use `/mcp` in Claude Code to check if the server is connected
- Check logs for any errors during startup
- Ensure all game binaries are installed and in your PATH