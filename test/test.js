const {assert} = require("chai");
const path = require("path");
const mpFn = require("..");

describe("load", function() {
    it("exports function", function() {
        assert.isFunction(mpFn);
    });

    it("loads magicpatch from default", function() {
        let helpers = mpFn();
        assert.strictEqual(helpers.magicPatchPath, "/Users/ampower/Projects/personal/magicpatch/index.js");
    });

    it("loads magicpatch from specified path", function() {
        let helpers = mpFn(path.resolve(__dirname, "../../magicpatch/index.js"));
        assert.strictEqual(helpers.magicPatchPath, "/Users/ampower/Projects/personal/magicpatch/index.js");
    });

    it("exports helpers", function() {
        let helpers = mpFn();
        assert.isFunction(helpers.getMagic);
        assert.isFunction(helpers.runCode);
        assert.isFunction(helpers.testMagic);
    });
});
