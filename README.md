# riotprompt-cli

CLI for RiotPrompt - process and execute prompts.

## Installation

```bash
npm install -g riotprompt-cli
```

## Commands

### create

Create a new prompt:

```bash
riotprompt create my-prompt
riotprompt create my-prompt --persona "You are a helpful assistant"
```

### process

Process a prompt directory:

```bash
riotprompt process ./my-prompt
riotprompt process ./my-prompt --model gpt-4o
riotprompt process ./my-prompt --format json --output prompt.json
riotprompt process ./my-prompt --format xml
```

### execute

Execute a prompt against an LLM:

```bash
riotprompt execute ./my-prompt
riotprompt execute ./my-prompt --model claude-3-opus
riotprompt execute ./my-prompt --provider openai
```

## Related

- `riotprompt` - Core prompt library
- `execution-openai` - OpenAI provider
- `execution-anthropic` - Anthropic provider
- `execution-gemini` - Gemini provider

## License

Apache-2.0

<!-- v1.0.0 -->

