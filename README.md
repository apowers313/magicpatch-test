Test helpers for [magicpatch](https://github.com/apowers313/magicpatch)

## Install
``` sh
npm install magicpatch-test
```

### API
The module returns a function. Calling the function returns the following helpers.

* **getMagic(name)**
  * **name**: A string describing the name of the magic, without any leading symbols (e.g. "echo", not "%echo")
  * **return value**: An object describing the magic matching `name` or undefined if a matching magic doesn't exist
* **runCode(code, showOutput)**
  * **code**: A string of JavaScript code to run, including any magics. Code is run via magicpatch.
  * **showOutput**: `true` to print output to stdout. Default is `false`.
  * **returns value**: A Promise that resolves to an object with the return value, stdout, and stderr from the last line of the code
     * **stdout**: An array of lines printed to stdout, seperated by newlines (\n)
     * **stderr**: An array of lines printed to stderr, seperated by newlines (\n)
     * **val**: The return value of the last line of the code that was run
* **testMagic(code, val, stdout, stderr, showOutput)**
  * **code**: Passed to `runCode` (see above)
  * **val**: The expected return value of the code. Peforms "deepEqual" evaluation if val is an object, otherwise "strictEqual".
  * **stdout**: An array of lines that are expected to be printed to stdout. Throws if this array doesn't match the return values of `runCode`.
    * If the array member is a **string**, comparison is done with "startsWith" (so that trailing newlines or other differences can be ignored).
    * If the array member is a **RegExp**, the comparison is done via RegExp.
    * If the array member is a **function**, the value is passed to a function and the function is expected to return `true` if the comparison passes or `false` otherwise.
  * **stderr**: Same as stdout, but the array is compared against stderr.
  * **showOutput**: Passed to `runCode` (see above)
  * **return value**: A Promise that resolves when the evaluation is successful, and rejects if the evaluation failed.

### Example
``` js
const {testMagic} = require("magicpatch-test")(); // XXX: note function call
// require("magicpatch-test")("/my/magicpatch/location");

describe("echo", function() {
    it("prints line", async function() {
        await testMagic(
            // magic command
            "%echo this is a test",
            // return value
            undefined,
            // stdout
            ["this is a test\n"],
            // stderr
            [],
            // show output
            // true,
        );
    });
});
```
