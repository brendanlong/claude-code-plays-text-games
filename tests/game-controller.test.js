import {
  startGame,
  sendLine,
  sendKeys,
  readOutput,
  endGame
} from '../src/game-controller.js';

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
    await sendKeys(['C-x', 'n']);
    await endGame();
  });

  describe('Basic functionality', () => {
    test('starting nano game', async () => {
      const result = await startGame('nano', ['-R']);
      expect(result).toMatchSnapshot();
    });

    test('single key sending', async () => {
      await startGame('nano', ['-R']);
      await sleep(10);

      const result = await sendKeys(['a']);
      expect(result).toMatchSnapshot();
    });

    test('multiple keys sending', async () => {
      await startGame('nano', ['-R']);
      await sleep(10);

      const result = await sendKeys(['H', 'e', 'l', 'l', 'o']);
      expect(result).toMatchSnapshot();
    });

    test('sending line', async () => {
      await startGame('nano', ['-R']);
      await sleep(10);

      const result = await sendLine('Hello World!');
      expect(result).toMatchSnapshot();
    });
  });

  describe('Game interaction workflow', () => {
    test('complete nano session - type and exit without saving', async () => {
      const workflow = [];

      // Start nano
      const start = await startGame('nano', ['-R']);
      workflow.push({ action: 'start', result: start });

      await sleep(10);

      // Type some text
      const type = await sendLine('Test content');
      workflow.push({ action: 'type', result: type });

      await sleep(500);

      // Read output after typing
      const read1 = await readOutput();
      workflow.push({ action: 'read_after_type', result: { success: read1.success, output: cleanOutput(read1.output) } });

      // Exit without saving using Ctrl+X followed by 'n' for no
      const exit = await sendKeys(['C-x', 'n']);
      workflow.push({ action: 'exit_no_save', result: exit });

      expect(workflow).toMatchSnapshot();
    }, 10000);

    test('multiple keys workflow', async () => {
      const workflow = [];

      // Start nano
      await startGame('nano', ['-R']);
      await sleep(10);

      // Send multiple keys at once
      const multiKeys = await sendKeys(['T', 'e', 's', 't', 'Space', '1', '2', '3']);
      workflow.push({ action: 'multi_keys', result: multiKeys });

      await sleep(500);

      // Read output
      const read = await readOutput();
      workflow.push({ action: 'read_output', result: { success: read.success, output: cleanOutput(read.output) } });

      // Exit without saving using multiple keys
      const exitKeys = await sendKeys(['C-x', 'n']);
      workflow.push({ action: 'exit_no_save', result: exitKeys });

      expect(workflow).toMatchSnapshot();
    }, 10000);
  });

  describe('Error handling', () => {
    test('commands without game session', async () => {
      const errors = {};

      const sendKeyError = await sendKeys(['Enter']);
      errors.send_key = sendKeyError;

      const sendCommandError = await sendLine('test');
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
    test('sendKeys function handles array inputs', async () => {
      await startGame('nano', ['-R']);
      await sleep(10);

      // Test single key array
      const singleKey = await sendKeys(['a']);
      expect(singleKey.success).toBe(true);
      expect(singleKey.output).toContain('Key sent: a');

      // Test multiple keys array
      const multipleKeys = await sendKeys(['b', 'c']);
      expect(multipleKeys.success).toBe(true);
      expect(multipleKeys.output).toContain('Key sent: b');
      expect(multipleKeys.output).toContain('Key sent: c');
    });

    test('all functions return consistent result format', async () => {
      // Test successful operations
      const startResult = await startGame('nano', ['-R']);
      expect(startResult).toHaveProperty('success');
      expect(startResult).toHaveProperty('output');

      await sleep(10);

      const commandResult = await sendLine('test');
      expect(commandResult).toHaveProperty('success');
      expect(commandResult).toHaveProperty('output');

      const keyResult = await sendKeys(['a']);
      expect(keyResult).toHaveProperty('success');
      expect(keyResult).toHaveProperty('output');

      const readResult = await readOutput();
      expect(readResult).toHaveProperty('success');

      // Test error operations
      await endGame();

      const errorResult = await sendKeys(['a']);
      expect(errorResult).toHaveProperty('success');
      expect(errorResult.success).toBe(false);
      expect(errorResult).toHaveProperty('error');
    });
  });
});