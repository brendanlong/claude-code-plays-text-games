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
   - Use `mcp__game-controller__send_keys` tool to send special keys
   - Example: `mcp__game-controller__send_keys` with `key: ["Enter"]` or `key: ["Escape"]`
   - Note: The key parameter should be an array of key names
   - Use tmux key names (found in `man tmux` under "KEY BINDINGS" section)
   - **Available key names:**
     - Arrow keys: `Up`, `Down`, `Left`, `Right`
     - Special keys: `BSpace` (backspace), `BTab` (shift+tab), `DC` (Delete), `End`, `Enter`, `Escape`, `Home`, `IC` (Insert), `Space`, `Tab`
     - Page keys: `NPage`/`PageDown`/`PgDn`, `PPage`/`PageUp`/`PgUp`
     - Function keys: `F1` to `F12`
     - Modifiers: `C-` (Ctrl), `S-` (Shift), `M-` (Alt/Meta)
     - Examples: `C-c` (Ctrl+C), `S-Tab` (Shift+Tab), `M-a` (Alt+A)

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
- Some games, like Dwarf Fortress convey information by flashing cursors. This is very annoying, but if something you expect to see isn't visible, try checking your output a few times.
- Be careful about making assumptions. Controls frequently don't work the way you think they do (different keys).
- It's much faster if you send a series of keys at once instead of calling the send_keys tool repeatedly (but check that the result did what you expected!).
