const fs = require("fs")
const JSZip = require("jszip")
const YAML = require("yaml")
const assert = require("assert")

// read a zip file and extract yaml file
// This would probably be more performant if this was a singleton that cached the result
async function load() {
  let file = fs.readFileSync(process.env.skillbot || "./data/sample.zip")
  let zip = await JSZip.loadAsync(file)

  // Big assumption here
  assert.equal(zip.file(/dialogs\/.*\.yaml/).length, 1, "this module expects skills to have only 1 dialog yaml (botml) files")

  let data = await zip.file(/dialogs\/.*\.yaml/)[0].async("string")
  let botml = YAML.parse(data)
  return botml
}

module.exports = load
