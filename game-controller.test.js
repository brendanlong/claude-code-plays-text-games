import {
  startGame,
  sendCommand,
  sendKey,
  readOutput,
  endGame
} from './game-controller.js';

// Helper to sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper to clean ANSI codes for consistent snapshots
function cleanOutput(output) {
  if (!output) return '';
  return output
    .replace(/\x1b\[[0-9;]*m/g, '') // Remove ANSI color codes
    .replace(/\x1b\[.*?[a-zA-Z]/g, '') // Remove other ANSI escape sequences
    .trim();
}

describe('Game Controller Integration Tests', () => {
  afterEach(async () => {
    await sendKey(['C-x', 'n']);
    await endGame();
  });

  describe('Basic functionality', () => {
    test('starting nano game', async () => {
      const result = await startGame('nano');
      expect(result).toMatchSnapshot();
    });

    test('single key sending', async () => {
      await startGame('nano');
      await sleep(10);

      const result = await sendKey('a');
      expect(result).toMatchSnapshot();
    });

    test('multiple keys sending', async () => {
      await startGame('nano');
      await sleep(10);

      const result = await sendKey(['H', 'e', 'l', 'l', 'o']);
      expect(result).toMatchSnapshot();
    });

    test('sending command', async () => {
      await startGame('nano');
      await sleep(10);

      const result = await sendCommand('Hello World!');
      expect(result).toMatchSnapshot();
    });
  });

  describe('Game interaction workflow', () => {
    test('complete nano session - type and exit without saving', async () => {
      const workflow = [];

      // Start nano
      const start = await startGame('nano');
      workflow.push({ action: 'start', result: start });

      await sleep(10);

      // Type some text
      const type = await sendCommand('Test content');
      workflow.push({ action: 'type', result: type });

      await sleep(500);

      // Read output after typing
      const read1 = await readOutput();
      workflow.push({ action: 'read_after_type', result: { success: read1.success, output: cleanOutput(read1.output) } });

      // Exit without saving using Ctrl+X followed by 'n' for no
      const exit = await sendKey(['C-x', 'n']);
      workflow.push({ action: 'exit_no_save', result: exit });

      expect(workflow).toMatchSnapshot();
    }, 10000);

    test('multiple keys workflow', async () => {
      const workflow = [];

      // Start nano
      await startGame('nano');
      await sleep(10);

      // Send multiple keys at once
      const multiKeys = await sendKey(['T', 'e', 's', 't', 'Space', '1', '2', '3']);
      workflow.push({ action: 'multi_keys', result: multiKeys });

      await sleep(500);

      // Read output
      const read = await readOutput();
      workflow.push({ action: 'read_output', result: { success: read.success, output: cleanOutput(read.output) } });

      // Exit without saving using multiple keys
      const exitKeys = await sendKey(['C-x', 'n']);
      workflow.push({ action: 'exit_no_save', result: exitKeys });

      expect(workflow).toMatchSnapshot();
    }, 10000);
  });

  describe('Error handling', () => {
    test('commands without game session', async () => {
      const errors = {};

      const sendKeyError = await sendKey('Enter');
      errors.send_key = sendKeyError;

      const sendCommandError = await sendCommand('test');
      errors.send_command = sendCommandError;

      const readOutputError = await readOutput();
      errors.read_output = readOutputError;

      expect(errors).toMatchSnapshot();
    });

    test('starting non-existent game', async () => {
      const result = await startGame('nonexistent-game-12345');
      expect(result).toMatchSnapshot();
    });
  });

  describe('Function interface tests', () => {
    test('sendKey function handles both string and array inputs', async () => {
      await startGame('nano');
      await sleep(10);

      // Test string input
      const singleKey = await sendKey('a');
      expect(singleKey.success).toBe(true);
      expect(singleKey.output).toContain('Key sent: a');

      // Test array input
      const multipleKeys = await sendKey(['b', 'c']);
      expect(multipleKeys.success).toBe(true);
      expect(multipleKeys.output).toContain('Key sent: b');
      expect(multipleKeys.output).toContain('Key sent: c');
    });

    test('all functions return consistent result format', async () => {
      // Test successful operations
      const startResult = await startGame('nano');
      expect(startResult).toHaveProperty('success');
      expect(startResult).toHaveProperty('output');

      await sleep(10);

      const commandResult = await sendCommand('test');
      expect(commandResult).toHaveProperty('success');
      expect(commandResult).toHaveProperty('output');

      const keyResult = await sendKey('a');
      expect(keyResult).toHaveProperty('success');
      expect(keyResult).toHaveProperty('output');

      const readResult = await readOutput();
      expect(readResult).toHaveProperty('success');

      // Test error operations
      await endGame();

      const errorResult = await sendKey('a');
      expect(errorResult).toHaveProperty('success');
      expect(errorResult.success).toBe(false);
      expect(errorResult).toHaveProperty('error');
    });
  });
});