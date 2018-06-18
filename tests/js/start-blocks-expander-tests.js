/* eslint-env node */
"use strict";
var fluid = require("infusion");
var blockly = fluid.registerNamespace("blockly");

var fs = require("fs");
var xm = require("xml-mapping");

require("../../src/js/common/json-to-xml");

fluid.logObjectRenderChars = 18368;

var jqUnit = require("node-jqunit");
jqUnit.module("Unit tests for startBlocks JSON->XML converter.");

jqUnit.test("We should be able to convert a startBlocks JSON definition to XML.", function () {
    var originalJson = require("../data/sample_startblocks.json");
    var generatedXml = blockly.harness.jsonToXml(originalJson);
    var parsedGeneratedXml = xm.load(generatedXml);

    var expectedXml = fs.readFileSync("../data/sample_startblocks.xml", "utf8");
    var parsedExpectedXml = xm.load(expectedXml);

    jqUnit.assertDeepEq("The generated XML should be as expected.", parsedExpectedXml, parsedGeneratedXml);
});