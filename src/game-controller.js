import { exec } from 'child_process';
import { promisify } from 'util';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper function to execute bash scripts
async function runScript(scriptPath, args = []) {
  try {
    const { stdout, stderr } = await execAsync(
      `${scriptPath} ${args.map(arg => `"${arg}"`).join(' ')}`,
      { cwd: __dirname }
    );
    return { success: true, output: stdout || stderr };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Game controller functions
export async function startGame(gameName, args = []) {
  return await runScript('../scripts/start_game.sh', [gameName, ...args]);
}

export async function sendLine(command) {
  return await runScript('../scripts/send_line.sh', [command]);
}

export async function sendKeys(keys) {
  return await runScript('../scripts/send_key.sh', keys);
}

function addNumbers(lines) {
  return lines.map((line, index) => `${String(index + 1).padStart(3)}: ${line}`);
}

function transposeToColumns(content) {
  const lines = content.split('\n');
  const maxLength = Math.max(...lines.map(line => line.length));
  const columns = [];
  
  for (let col = 0; col < maxLength; col++) {
    let column = '';
    for (let row = 0; row < lines.length; row++) {
      column += lines[row][col] || ' ';
    }
    columns.push(column);
  }
  
  return columns;
}

export async function readOutput(colorized = false, mode = 'rows', numbers = false) {
  const args = colorized ? ['--colorize'] : [];
  const result = await runScript('../scripts/read_output.sh', args);
  
  if (!result.success) {
    return result;
  }
  
  let content = result.output;
  let processedOutput;
  
  switch (mode) {
    case 'rows':
      if (numbers) {
        const lines = content.split('\n');
        processedOutput = addNumbers(lines).join('\n');
      } else {
        processedOutput = content;
      }
      break;
      
    case 'cols':
    case 'columns':
      const columns = transposeToColumns(content);
      if (numbers) {
        processedOutput = addNumbers(columns).join('\n');
      } else {
        processedOutput = columns.join('\n');
      }
      break;
      
    case 'both':
      const lines = content.split('\n');
      const cols = transposeToColumns(content);
      
      let rowsOutput = numbers ? addNumbers(lines).join('\n') : lines.join('\n');
      let colsOutput = numbers ? addNumbers(cols).join('\n') : cols.join('\n');
      
      processedOutput = `=== ROWS ===\n${rowsOutput}\n\n=== COLUMNS ===\n${colsOutput}`;
      break;
      
    default:
      return { success: false, error: `Invalid mode '${mode}'. Use 'rows', 'cols', or 'both'` };
  }
  
  return { success: true, output: processedOutput };
}

export async function endGame() {
  return await runScript('../scripts/end_game.sh');
}

// Tool schema definitions
export const toolSchemas = [
  {
    name: 'start_game',
    description: 'Start a new terminal game session',
    inputSchema: {
      type: 'object',
      properties: {
        game_name: {
          type: 'string',
          description: 'Name of the game to start (e.g., "adventure", "nethack")'
        },
        args: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Optional command line arguments to pass to the game (e.g., ["-R"] for nano restricted mode)'
        }
      },
      required: ['game_name']
    }
  },
  {
    name: 'send_line',
    description: 'Send a text command to the running game',
    inputSchema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: 'Text command to send to the game (e.g., "go north", "look")'
        }
      },
      required: ['command']
    }
  },
  {
    name: 'send_keys',
    description: 'Send special keys to the running game',
    inputSchema: {
      type: 'object',
      properties: {
        keys: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of keys to send in sequence (e.g., ["Tab", "Enter"]).'
        }
      },
      required: ['keys']
    }
  },
  {
    name: 'read_output',
    description: 'Read the current game output from the terminal',
    inputSchema: {
      type: 'object',
      properties: {
        colorized: {
          type: 'boolean',
          description: 'Include ANSI color codes in output (default: false)'
        },
        mode: {
          type: 'string',
          enum: ['rows', 'cols', 'columns', 'both'],
          description: 'Output format: "rows" (default), "cols"/"columns", or "both"'
        },
        numbers: {
          type: 'boolean',
          description: 'Add line numbers to each row/column (default: false)'
        }
      },
      required: []
    }
  },
  {
    name: 'end_game',
    description: 'End the current game session',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  }
];

// Tool handler function
export async function handleToolCall(name, args) {
  switch (name) {
    case 'start_game':
      return await startGame(args.game_name, args.args);

    case 'send_line':
      return await sendLine(args.command);

    case 'send_keys':
      return await sendKeys(args.keys);

    case 'read_output':
      return await readOutput(args.colorized, args.mode, args.numbers);

    case 'end_game':
      return await endGame();

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}