/**
 * RiotPrompt CLI
 * 
 * Commands:
 * - create <name>    Create a new prompt
 * - process <path>   Process a prompt directory
 * - execute <path>   Execute a prompt
 */

import { Command } from "commander";

const VERSION = "0.0.1";

const program = new Command();

program
    .name("riotprompt")
    .description("CLI for processing and executing prompts")
    .version(VERSION);

// ===== CREATE =====

program
    .command("create <name>")
    .description("Create a new prompt")
    .option("-p, --persona <persona>", "Persona content")
    .option("-i, --instructions <instructions>", "Instructions content")
    .option("--no-context", "Skip creating context directory")
    .action((name, options) => {
        console.log(`\n⚠️  riotprompt-cli will use riotprompt library.\n`);
        console.log(`Would create prompt: ${name}`);
        if (options.persona) console.log(`  Persona: ${options.persona}`);
        if (options.instructions) console.log(`  Instructions: ${options.instructions}`);
        console.log(`\nStructure:`);
        console.log(`  ${name}/`);
        console.log(`  ├── persona.md`);
        console.log(`  ├── instructions.md`);
        if (options.context !== false) {
            console.log(`  └── context/`);
        }
    });

// ===== PROCESS =====

program
    .command("process <path>")
    .description("Process a prompt directory")
    .option("-m, --model <model>", "Target model", "gpt-4o")
    .option("-f, --format <format>", "Output format (text|json|xml)", "text")
    .option("-o, --output <file>", "Output file")
    .action((path, options) => {
        console.log(`\n⚠️  riotprompt-cli will use riotprompt library.\n`);
        console.log(`Would process: ${path}`);
        console.log(`  Model: ${options.model}`);
        console.log(`  Format: ${options.format}`);
        if (options.output) console.log(`  Output: ${options.output}`);
    });

// ===== EXECUTE =====

program
    .command("execute <path>")
    .description("Execute a prompt against an LLM")
    .option("-m, --model <model>", "Model to use", "gpt-4o")
    .option("-p, --provider <provider>", "Provider (openai|anthropic|gemini)")
    .option("-t, --temperature <temp>", "Temperature", "0.7")
    .option("--max-tokens <tokens>", "Max tokens")
    .option("--dry-run", "Show request without executing")
    .action((path, options) => {
        console.log(`\n⚠️  riotprompt-cli will use riotprompt + execution-* libraries.\n`);
        console.log(`Would execute: ${path}`);
        console.log(`  Model: ${options.model}`);
        if (options.provider) console.log(`  Provider: ${options.provider}`);
        console.log(`  Temperature: ${options.temperature}`);
        if (options.maxTokens) console.log(`  Max tokens: ${options.maxTokens}`);
        if (options.dryRun) console.log(`  (dry run mode)`);
    });

program.parse();

