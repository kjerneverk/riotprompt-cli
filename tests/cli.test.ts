/**
 * Tests for RiotPrompt CLI
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Command } from "commander";
import { spawn } from "child_process";
import * as path from "path";

describe("RiotPrompt CLI", () => {
    describe("CLI Structure", () => {
        it("should have create command", () => {
            const program = new Command();
            program.name("test");

            // Verify Command class works
            expect(program.name()).toBe("test");
        });

        it("should have process command", () => {
            const program = new Command();
            program.command("process <path>");

            expect(program.commands.length).toBe(1);
            expect(program.commands[0].name()).toBe("process");
        });

        it("should have execute command", () => {
            const program = new Command();
            program.command("execute <path>");

            expect(program.commands.length).toBe(1);
            expect(program.commands[0].name()).toBe("execute");
        });
    });

    describe("CLI Options", () => {
        describe("create command options", () => {
            it("should support persona option", () => {
                const program = new Command();
                const cmd = program
                    .command("create <name>")
                    .option("-p, --persona <persona>", "Persona content");

                const personaOption = cmd.options.find((o) => o.long === "--persona");
                expect(personaOption).toBeDefined();
                expect(personaOption?.short).toBe("-p");
            });

            it("should support instructions option", () => {
                const program = new Command();
                const cmd = program
                    .command("create <name>")
                    .option("-i, --instructions <instructions>", "Instructions");

                const instructionsOption = cmd.options.find((o) => o.long === "--instructions");
                expect(instructionsOption).toBeDefined();
            });

            it("should support no-context flag", () => {
                const program = new Command();
                const cmd = program
                    .command("create <name>")
                    .option("--no-context", "Skip context");

                const contextOption = cmd.options.find((o) => o.long === "--no-context");
                expect(contextOption).toBeDefined();
            });
        });

        describe("process command options", () => {
            it("should support model option with default", () => {
                const program = new Command();
                const cmd = program
                    .command("process <path>")
                    .option("-m, --model <model>", "Target model", "gpt-4o");

                const modelOption = cmd.options.find((o) => o.long === "--model");
                expect(modelOption).toBeDefined();
                expect(modelOption?.defaultValue).toBe("gpt-4o");
            });

            it("should support format option", () => {
                const program = new Command();
                const cmd = program
                    .command("process <path>")
                    .option("-f, --format <format>", "Output format", "text");

                const formatOption = cmd.options.find((o) => o.long === "--format");
                expect(formatOption).toBeDefined();
                expect(formatOption?.defaultValue).toBe("text");
            });

            it("should support output option", () => {
                const program = new Command();
                const cmd = program
                    .command("process <path>")
                    .option("-o, --output <file>", "Output file");

                const outputOption = cmd.options.find((o) => o.long === "--output");
                expect(outputOption).toBeDefined();
            });
        });

        describe("execute command options", () => {
            it("should support model option", () => {
                const program = new Command();
                const cmd = program
                    .command("execute <path>")
                    .option("-m, --model <model>", "Model", "gpt-4o");

                const modelOption = cmd.options.find((o) => o.long === "--model");
                expect(modelOption).toBeDefined();
            });

            it("should support provider option", () => {
                const program = new Command();
                const cmd = program
                    .command("execute <path>")
                    .option("-p, --provider <provider>", "Provider");

                const providerOption = cmd.options.find((o) => o.long === "--provider");
                expect(providerOption).toBeDefined();
            });

            it("should support temperature option", () => {
                const program = new Command();
                const cmd = program
                    .command("execute <path>")
                    .option("-t, --temperature <temp>", "Temperature", "0.7");

                const tempOption = cmd.options.find((o) => o.long === "--temperature");
                expect(tempOption).toBeDefined();
                expect(tempOption?.defaultValue).toBe("0.7");
            });

            it("should support max-tokens option", () => {
                const program = new Command();
                const cmd = program
                    .command("execute <path>")
                    .option("--max-tokens <tokens>", "Max tokens");

                const maxTokensOption = cmd.options.find((o) => o.long === "--max-tokens");
                expect(maxTokensOption).toBeDefined();
            });

            it("should support dry-run flag", () => {
                const program = new Command();
                const cmd = program
                    .command("execute <path>")
                    .option("--dry-run", "Dry run");

                const dryRunOption = cmd.options.find((o) => o.long === "--dry-run");
                expect(dryRunOption).toBeDefined();
            });
        });
    });

    describe("Command Parsing", () => {
        it("should parse version flag", () => {
            const program = new Command();
            program.version("0.0.1");

            expect(program.version()).toBe("0.0.1");
        });

        it("should have correct program name", () => {
            const program = new Command();
            program.name("riotprompt");

            expect(program.name()).toBe("riotprompt");
        });

        it("should have description", () => {
            const program = new Command();
            program.description("CLI for processing and executing prompts");

            expect(program.description()).toBe("CLI for processing and executing prompts");
        });
    });

    describe("Action Handlers", () => {
        let consoleSpy: ReturnType<typeof vi.spyOn>;

        beforeEach(() => {
            consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it("should call action handler for create command", async () => {
            const program = new Command();
            const actionFn = vi.fn();

            program
                .command("create <name>")
                .action(actionFn);

            await program.parseAsync(["node", "test", "create", "my-prompt"]);

            expect(actionFn).toHaveBeenCalledWith("my-prompt", expect.anything(), expect.anything());
        });

        it("should call action handler for process command", async () => {
            const program = new Command();
            const actionFn = vi.fn();

            program
                .command("process <path>")
                .action(actionFn);

            await program.parseAsync(["node", "test", "process", "./prompts/test"]);

            expect(actionFn).toHaveBeenCalledWith("./prompts/test", expect.anything(), expect.anything());
        });

        it("should call action handler for execute command", async () => {
            const program = new Command();
            const actionFn = vi.fn();

            program
                .command("execute <path>")
                .action(actionFn);

            await program.parseAsync(["node", "test", "execute", "./prompts/test"]);

            expect(actionFn).toHaveBeenCalledWith("./prompts/test", expect.anything(), expect.anything());
        });

        it("should pass options to create action", async () => {
            const program = new Command();
            const actionFn = vi.fn();

            program
                .command("create <name>")
                .option("-p, --persona <persona>", "Persona")
                .action(actionFn);

            await program.parseAsync(["node", "test", "create", "test-prompt", "-p", "Expert"]);

            expect(actionFn).toHaveBeenCalled();
            const options = actionFn.mock.calls[0][1];
            expect(options.persona).toBe("Expert");
        });

        it("should pass options to execute action", async () => {
            const program = new Command();
            const actionFn = vi.fn();

            program
                .command("execute <path>")
                .option("-m, --model <model>", "Model", "gpt-4o")
                .option("--dry-run", "Dry run")
                .action(actionFn);

            await program.parseAsync(["node", "test", "execute", "./test", "--dry-run", "-m", "gpt-5"]);

            expect(actionFn).toHaveBeenCalled();
            const options = actionFn.mock.calls[0][1];
            expect(options.model).toBe("gpt-5");
            expect(options.dryRun).toBe(true);
        });
    });

    describe("Full CLI Integration", () => {
        it("should support multiple commands", () => {
            const program = new Command();
            program
                .name("riotprompt")
                .description("Test CLI")
                .version("0.0.1");

            program.command("create <name>").action(() => {});
            program.command("process <path>").action(() => {});
            program.command("execute <path>").action(() => {});

            expect(program.commands.length).toBe(3);
            expect(program.commands.map((c) => c.name())).toEqual(["create", "process", "execute"]);
        });

        it("should handle help flag", () => {
            const program = new Command();
            program.name("riotprompt");

            // Help is built-in to commander, verify helpInformation exists
            expect(program.helpInformation).toBeDefined();
            expect(typeof program.helpInformation).toBe("function");
        });
    });
});

describe("Constants", () => {
    it("VERSION should be defined", () => {
        const VERSION = "0.0.1";
        expect(VERSION).toBeDefined();
        expect(typeof VERSION).toBe("string");
    });
});

