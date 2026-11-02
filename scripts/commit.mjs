#!/usr/bin/env node
import { spawnSync } from 'child_process';
import inquirer from 'inquirer';

const TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'];
const TICKET_REGEX = /^CUI-\d{4,}$/;

const { ticket, type, subject } = await inquirer.prompt([
  {
    name: 'ticket',
    message: 'Enter ticket number (CUI-0001):',
    validate: (v) => TICKET_REGEX.test(v) || 'Invalid ticket format',
  },
  {
    name: 'type',
    type: 'list',
    message: 'Select commit type(feat|fix|docs|style|refactor|test|chore):',
    choices: TYPES,
  },
  {
    name: 'subject',
    message: 'Write a short description:',
    validate: (v) => v.trim().length > 0 || 'Subject required',
  },
]);

const message = `${ticket}: ${type}: ${subject.trim()}`;

const result = spawnSync('git', ['commit', '-m', message], {
  stdio: 'inherit',
});

if (result.error) {
  console.error('\n❌ Failed to run git commit.');
  console.error(result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`\n✅ Commit created: ${message}`);
