const fs = require("fs")
const JSZip = require("jszip")
const YAML = require("yaml")
const assert = require("assert")

// read a zip file and extract yaml file
// This would probably be more performant if this was a singleton that cached the result
async function load() {
  // Load in the zip file specified by the enviornment variable skillbot
  let file = fs.readFileSync(process.env.skillbot || "./data/sample.zip")
  let zip = await JSZip.loadAsync(file)

  // Big assumption here
  assert.equal(zip.file(/dialogs\/.*\.yaml/).length, 1, "this module expects skills to have only 1 dialog yaml (botml) files")

  // Find the first .yaml file in the dialogs directory inside the zip file
  let data = await zip.file(/dialogs\/.*\.yaml/)[0].async("string")

  // Parse the YAML into something more easy to process in JavaScript
  let botml = YAML.parse(data)
  return botml
}

module.exports = load
