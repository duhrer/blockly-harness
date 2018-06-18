/* eslint-env node */
"use strict";
var fluid = require("infusion");
var blockly = fluid.registerNamespace("blockly");

fluid.registerNamespace("blockly.harness");

blockly.harness.exercises = [
    {
        "title": "1: Sandbox",
        "description": "This page is a sandbox where you can try out all the built-in Blockly functions.",
        "harnessOptions": {
            displayXmlOnChange: true,
            blocklyOptions: {
            }
        }
    },
    {
        "title": "2: Guess the PIN",
        "description": "Create a function that chooses a random four-digit random PIN.  Create another that guesses the PIN. At the end of your run, a variable called 'guess' should be set to the password value.",
        "harnessOptions": {
            returnValues: ["password", "guess"],
            "blocklyOptions": {
                "startBlocks": {
                    "id": "startBlocks",
                    "style": "display: none",
                    "blocks": [{
                        "type": "variables_set",
                        "id": "start-block-1",
                        "fields": [{ name: "VAR", "": "digits"}],
                        "values": [{
                            "name": "VALUE",
                            "blocks": [{
                                "type": "lists_create_with",
                                "mutations": [{
                                    "items": 10
                                }],
                                "values": [
                                    { name: "ADD0", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 0 }]}]},
                                    { name: "ADD1", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 1 }]}]},
                                    { name: "ADD2", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 2 }]}]},
                                    { name: "ADD3", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 3 }]}]},
                                    { name: "ADD4", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 4 }]}]},
                                    { name: "ADD5", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 5 }]}]},
                                    { name: "ADD6", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 6 }]}]},
                                    { name: "ADD7", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 7 }]}]},
                                    { name: "ADD8", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 8 }]}]},
                                    { name: "ADD9", "blocks": [{ type: "math_number", fields: [{ name: "NUM", "": 9 }]}]}
                                ]
                            }]
                        }]
                    }]
                }
            }
        }
    },
    {
        "title": "3: ROT 13",
        "description": "Create a program that will prompt the user for text, and then display it with all the characters 'rotated'  by 13 characters.  For example, in ROT13, 'hello' becomes 'uryyb'.",
        "harnessOptions": {
            "blocklyOptions": {
                "startBlocks": {
                    "id": "startBlocks",
                    "style": "display: none",
                    "blocks": [
                        {
                            "type": "variables_set",
                            "id": "start-block-1",
                            "x": 245,
                            "y": 0,
                            "fields": [{ name: "VAR", "": "chars"}],
                            "values": [{
                                "name": "VALUE",
                                "blocks": [{
                                    "type": "lists_create_with",
                                    "mutations": [{ "items": 26 }],
                                    "values": [
                                        { name: "ADD0", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "a"}]}]},
                                        { name: "ADD1", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "b"}]}]},
                                        { name: "ADD2", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "c"}]}]},
                                        { name: "ADD3", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "d"}]}]},
                                        { name: "ADD4", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "e"}]}]},
                                        { name: "ADD5", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "f"}]}]},
                                        { name: "ADD6", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "g"}]}]},
                                        { name: "ADD7", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "h"}]}]},
                                        { name: "ADD8", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "i"}]}]},
                                        { name: "ADD9", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "j"}]}]},
                                        { name: "ADD10", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "k"}]}]},
                                        { name: "ADD11", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "l"}]}]},
                                        { name: "ADD12", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "m"}]}]},
                                        { name: "ADD13", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "n"}]}]},
                                        { name: "ADD14", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "o"}]}]},
                                        { name: "ADD15", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "p"}]}]},
                                        { name: "ADD16", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "q"}]}]},
                                        { name: "ADD17", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "r"}]}]},
                                        { name: "ADD18", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "s"}]}]},
                                        { name: "ADD19", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "t"}]}]},
                                        { name: "ADD20", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "u"}]}]},
                                        { name: "ADD21", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "v"}]}]},
                                        { name: "ADD22", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "w"}]}]},
                                        { name: "ADD23", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "x"}]}]},
                                        { name: "ADD24", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "y"}]}]},
                                        { name: "ADD25", "blocks": [{ type: "text", fields: [{ name: "TEXT", "": "z"}]}]}
                                    ]
                                }]
                            }]
                        },
                        {
                            type: "procedures_defreturn",
                            "x": 0,
                            "y": 0,
                            fields: [{name: "NAME", "": "rot13"}],
                            values: [{ name: "RETURN", blocks: [{ type: "variables_get", fields: [{ name: "VAR", "": "rot13"}]}]}],
                            statements: [{
                                name: "STACK",
                                blocks: [{
                                    type: "variables_set",
                                    fields: [{name: "VAR", "": "rot13"}],
                                    values: [{name: "VALUE", blocks: [{type: "text", fields: [{name: "TEXT"}]}]}]
                                }]
                            }]
                        }
                    ]
                }
            }
        }
    }
];
