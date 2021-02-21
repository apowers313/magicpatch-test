const execa = require("execa");

module.exports = function magicPatchSetup(magicPatchPath) {
    if (typeof magicPatchPath !== "string") {
        const {stdout} = execa.sync("magicpatch-location");
        // console.log(`magicpatch-location: '${stdout}'`);
        magicPatchPath = stdout;
    }

    require("./setup.js");
    require(magicPatchPath);
    let helpers = require("./helpers.js");
    helpers.magicPatchPath = magicPatchPath;
    return helpers;
};
