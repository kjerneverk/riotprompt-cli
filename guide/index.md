# AI Agent Guide: riotprompt-cli

CLI for processing and executing prompts using `riotprompt`.

## Commands

### create

```bash
riotprompt create my-prompt
riotprompt create my-prompt --persona "You are helpful"
```

### process

```bash
riotprompt process ./my-prompt
riotprompt process ./my-prompt --model gpt-4o
riotprompt process ./my-prompt --format json -o out.json
```

### execute

```bash
riotprompt execute ./my-prompt
riotprompt execute ./my-prompt --model claude-3-opus
riotprompt execute ./my-prompt --provider anthropic
```

## Dependencies

- `riotprompt` - Core library (peer)
- `execution-openai` - OpenAI provider (peer, optional)
- `execution-anthropic` - Anthropic provider (peer, optional)
- `execution-gemini` - Gemini provider (peer, optional)

## Source

CLI extracted from `riotprompt/src/cli.ts`

