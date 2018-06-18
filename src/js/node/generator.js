/* eslint-env node */
"use strict";
var fluid = require("infusion");
var blockly = fluid.registerNamespace("blockly");

var fs     = require("fs");
var mkdirp = require("mkdirp");
var path   = require("path");

fluid.require("%blockly-harness");
fluid.require("%gpii-handlebars");
require("./exercises");

fluid.registerNamespace("blockly.harness");
blockly.harness.generateFilename = function (rawName) {
    return rawName.toLowerCase().replace(/[\.: ]+/g, "-") + ".html";
};

blockly.harness.generateStaticSite = function (that) {
    var outputBaseDir = fluid.module.resolvePath(that.options.outputDir);
    if (!fs.existsSync(outputBaseDir)) {
        mkdirp.sync(outputBaseDir);
    }

    // Generate exercises.
    fluid.each(that.options.exercises, function (exercise) {
        var filename = blockly.harness.generateFilename(exercise.title);
        var outputPath = path.resolve(outputBaseDir, filename);
        var renderedHtml = that.renderer.render("exercise", exercise);
        fs.writeFileSync(outputPath, renderedHtml, "utf8");
    });

    // Generate "index" rollup.
    var exercisesWithPaths = fluid.transform(that.options.exercises, function (exercise) {
        var valueWithPath = fluid.merge({}, exercise, { path: blockly.harness.generateFilename(exercise.title)});
        return valueWithPath;
    });

    var renderedIndexHtml = that.renderer.render("index", { exercises: exercisesWithPaths});
    var outputPath = path.resolve(outputBaseDir, "index.html");
    fs.writeFileSync(outputPath, renderedIndexHtml, "utf8");

    // Bundle dependencies
    var copyPromises = [];
    fluid.each(that.options.deps, function (depPath) {
        copyPromises.push(function (){
            var copyPromise = fluid.promise();

            var resolvedInputPath = fluid.module.resolvePath(depPath);
            var relativeInputPath = path.relative(fluid.module.resolvePath("%blockly-harness"), resolvedInputPath);
            var absoluteOutputPath = path.resolve(outputBaseDir, relativeInputPath);

            var outputDir = path.dirname(absoluteOutputPath);
            if (! fs.existsSync(outputDir)) {
                mkdirp.sync(outputDir);
            }

            var writeStream = fs.createWriteStream(absoluteOutputPath);
            var readStream = fs.createReadStream(resolvedInputPath);
            readStream.pipe(writeStream);

            readStream.on("error", fluid.fail);

            writeStream.on("error", copyPromise.reject);
            writeStream.on("finish", copyPromise.resolve);

            return copyPromise;
        });
    });

    fluid.promise.sequence(copyPromises).then(
        function(){ console.log("Dependencies copied."); },
        fluid.fail
    )
};

fluid.defaults("blockly.harness.generator", {
    gradeNames: ["fluid.component"],
    outputDir: "%blockly-harness/build",
    deps: [
        "%blockly-harness/node_modules/blockly/blockly_compressed.js",
        "%blockly-harness/node_modules/blockly/blocks_compressed.js",
        "%blockly-harness/node_modules/blockly/javascript_compressed.js",
        "%blockly-harness/node_modules/blockly/msg/js/en.js",
        "%blockly-harness/node_modules/blockly/appengine/storage.js",
        "%blockly-harness/node_modules/blockly/media/1x1.gif",
        "%blockly-harness/node_modules/blockly/media/click.mp3",
        "%blockly-harness/node_modules/blockly/media/click.ogg",
        "%blockly-harness/node_modules/blockly/media/click.wav",
        "%blockly-harness/node_modules/blockly/media/delete.mp3",
        "%blockly-harness/node_modules/blockly/media/delete.ogg",
        "%blockly-harness/node_modules/blockly/media/delete.wav",
        "%blockly-harness/node_modules/blockly/media/disconnect.mp3",
        "%blockly-harness/node_modules/blockly/media/disconnect.ogg",
        "%blockly-harness/node_modules/blockly/media/disconnect.wav",
        "%blockly-harness/node_modules/blockly/media/handclosed.cur",
        "%blockly-harness/node_modules/blockly/media/handdelete.cur",
        "%blockly-harness/node_modules/blockly/media/handopen.cur",
        "%blockly-harness/node_modules/blockly/media/quote0.png",
        "%blockly-harness/node_modules/blockly/media/quote1.png",
        "%blockly-harness/node_modules/blockly/media/sprites.png",
        "%blockly-harness/node_modules/blockly/media/sprites.svg",
        "%blockly-harness/node_modules/infusion/dist/infusion-all.js",
        "%blockly-harness/src/js/common/toolbox.js",
        "%blockly-harness/src/js/common/json-to-xml.js",
        "%blockly-harness/src/js/client/harness.js"
    ],
    exercises: blockly.harness.exercises,
    listeners: {
        "onCreate.generate": {
            funcName: "blockly.harness.generateStaticSite",
            args:     ["{that}"]
        }
    },
    components: {
        renderer: {
            type: "gpii.handlebars.standaloneRenderer",
            options: {
                templateDirs: ["%blockly-harness/src/templates"]
            }
        }
    }
});

blockly.harness.generator();