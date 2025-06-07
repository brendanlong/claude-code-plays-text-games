#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create the MCP server
const server = new Server(
  {
    name: 'game-controller',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

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

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'start_game',
        description: 'Start a new terminal game session',
        inputSchema: {
          type: 'object',
          properties: {
            game_name: {
              type: 'string',
              description: 'Name of the game to start (e.g., "adventure", "nethack")'
            }
          },
          required: ['game_name']
        }
      },
      {
        name: 'send_command',
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
        name: 'send_key',
        description: 'Send a special key to the running game',
        inputSchema: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Special key to send (e.g., "Escape", "C-c", "Tab", "Enter")'
            }
          },
          required: ['key']
        }
      },
      {
        name: 'read_output',
        description: 'Read the current game output from the terminal',
        inputSchema: {
          type: 'object',
          properties: {},
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
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'start_game': {
        const result = await runScript('./start_game.sh', [args.game_name]);
        return {
          content: [{ type: 'text', text: result.success ? result.output : `Error: ${result.error}` }]
        };
      }
      
      case 'send_command': {
        const result = await runScript('./send_command.sh', [args.command]);
        return {
          content: [{ type: 'text', text: result.success ? result.output : `Error: ${result.error}` }]
        };
      }
      
      case 'send_key': {
        const result = await runScript('./send_key.sh', [args.key]);
        return {
          content: [{ type: 'text', text: result.success ? result.output : `Error: ${result.error}` }]
        };
      }
      
      case 'read_output': {
        const result = await runScript('./read_output.sh');
        return {
          content: [{ type: 'text', text: result.success ? result.output : `Error: ${result.error}` }]
        };
      }
      
      case 'end_game': {
        const result = await runScript('./end_game.sh');
        return {
          content: [{ type: 'text', text: result.success ? result.output : `Error: ${result.error}` }]
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: 'text', text: `Error: ${errorMessage}` }],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Game controller MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});