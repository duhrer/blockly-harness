/* eslint-env node */
"use strict";
var fluid = require("infusion");

// Register our content so that it can be referenced in other packages using `fluid.module.resolvePath("%blockly-harness/path/to/content")`
fluid.module.register("blockly-harness", __dirname, require);
