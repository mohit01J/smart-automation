const fs = require("node:fs");
const path = require("node:path");

const targetPath = path.join(
  __dirname,
  "node_modules",
  "playwright",
  "lib",
  "common",
  "configLoader.js",
);

const shimSource = "module.exports = require('./index').configLoader;\n";

if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, shimSource, "utf8");
}
const shims = [
  {
    filePath: path.join(
      __dirname,
      'node_modules',
      'playwright',
      'lib',
      'common',
      'configLoader.js'
    ),
    source: "module.exports = require('./index').configLoader;\n",
  },
  {
    filePath: path.join(
      __dirname,
      'node_modules',
      'playwright',
      'lib',
      'transform',
      'transform.js'
    ),
    source: [
      "const { pathToFileURL } = require('node:url');",
      '',
      'async function requireOrImport(file) {',
      '  try {',
      '    return require(file);',
      '  } catch (error) {',
      "    if (error.code !== 'ERR_REQUIRE_ESM' && !String(error.message).includes('Cannot use import statement')) {",
      '      throw error;',
      '    }',
      '  }',
      '',
      '  return import(pathToFileURL(file).href);',
      '}',
      '',
      'module.exports = { requireOrImport };',
      '',
    ].join('\n'),
  },
];

for (const shim of shims) {
  if (!fs.existsSync(shim.filePath)) {
    fs.mkdirSync(path.dirname(shim.filePath), { recursive: true });
    fs.writeFileSync(shim.filePath, shim.source, 'utf8');
  }
}
