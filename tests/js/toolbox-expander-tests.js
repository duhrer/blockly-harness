/* eslint-env node */
"use strict";
var fluid = require("infusion");
var blockly = fluid.registerNamespace("blockly");

var fs = require("fs");
var xm = require("xml-mapping");

require("../../src/js/common/toolbox");
require("../../src/js/common/json-to-xml");

fluid.logObjectRenderChars = 18368;

var jqUnit = require("node-jqunit");
jqUnit.module("Unit tests for toolbox JSON->XML converter.");

jqUnit.test("We should be able to convert a toolbox JSON definition to XML.", function () {
    var generatedXml = blockly.harness.jsonToXml(blockly.harness.toolboxDefaults);
    var parsedGeneratedXml = xm.load(generatedXml);

    var expectedXml = fs.readFileSync("../data/sample_toolbox.xml", "utf8");
    var parsedExpectedXml = xm.load(expectedXml);

    jqUnit.assertDeepEq("The generated XML should be as expected.", parsedExpectedXml, parsedGeneratedXml);
});
