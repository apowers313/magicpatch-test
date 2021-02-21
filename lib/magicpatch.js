const execa = require("execa");

module.exports = function magicPatchSetup(opts = {}) {
    if (typeof opts === "string") {
        opts = {magicPatchPath: opts};
    }

    let {magicPatchPath, preHook, postHook} = opts;

    if (typeof magicPatchPath !== "string") {
        const {stdout} = execa.sync("magicpatch-location");
        // console.log(`magicpatch-location: '${stdout}'`);
        magicPatchPath = stdout;
    }

    if (typeof preHook === "function") {
        preHook();
    }

    require("./setup.js");
    require(magicPatchPath);
    let helpers = require("./helpers.js");
    helpers.magicPatchPath = magicPatchPath;

    if (typeof postHook === "function") {
        postHook();
    }

    return helpers;
};
