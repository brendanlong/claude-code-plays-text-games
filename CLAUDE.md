# Instructions for Claude Playing Terminal Games

## IMPORTANT: Use MCP Tools, NOT Shell Scripts

**WARNING**: NEVER run the shell scripts (*.sh) directly using the Bash tool - this will cause permissions issues. Always use the MCP game controller tools instead.

## Game Interaction Process

1. **Starting the Game**:
   - Use the `mcp__game-controller__start_game` tool to launch a new game session
   - Example: `mcp__game-controller__start_game` with `game_name: "adventure"` for Colossal Cave Adventure
   - Example: `mcp__game-controller__start_game` with `game_name: "nethack"` for NetHack
   - This creates a detached tmux session named 'game_session'
   - Only start a new game if one isn't already running
   - The game must be installed and available in your PATH

2. **Sending Commands**:
   - Send commands to the game using `mcp__game-controller__send_command` tool
   - Example: `mcp__game-controller__send_command` with `command: "look"` or `command: "go north"`
   - After sending a command, always read the output to see the results

3. **Sending Special Keys**:
   - Use `mcp__game-controller__send_key` tool to send special keys
   - Example: `mcp__game-controller__send_key` with `key: "Enter"` or `key: "Escape"`

4. **Reading Output**:
   - Use `mcp__game-controller__read_output` tool to get the current game state
   - Always read the output after every command to understand the game state
   - Parse the output based on the specific game you're playing

5. **Ending the Game**:
   - Use `mcp__game-controller__end_game` tool to terminate the game session
   - This kills the tmux session running the game

## Important Notes

- Different games have different command syntax and conventions
- Read the output carefully after each command
- Be systematic in your approach and adapt to each game's unique mechanics
- Some games may have save/restore features - check their documentation
- Make sure to come up with a plan and use your TODO list feature
- You may have notes for the game in the game-notes/ directory
