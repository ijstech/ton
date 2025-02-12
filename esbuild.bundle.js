const Fs = require('fs')

async function readFile(fileName) {
  return new Promise((resolve, reject) => {
    Fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

async function build() {
  let result = await require('esbuild')
    .build({
      entryPoints: ['src/index.ts'],
      outdir: 'lib',
      bundle: true,
      minify: false,
      format: 'cjs',
      target: 'esnext',
      inject: ['./buffer-shim.js'],
      plugins: [
        {
          name: 'replace',
          setup(build) {
            build.onResolve({ filter: /^@ton\/core$/ }, args => {
              return {
                path: require.resolve('@ijstech/ton-core')
              }
            })
          }
        }
      ]
    })
    .catch(() => process.exit(1));

  let content = await readFile('lib/index.js')
  content = content.replace(/@ton\/core/g, "@ijstech/ton-core")
  content = `
define("@scom/ton-core", ["require", "exports"], function (require, exports) {
  Object.defineProperty(exports, "__esModule", { value: true }); 
  ${content}
  window.TonCore = exports;
});`

  Fs.writeFileSync('lib/bundle.js', content)

  let typesContent = await readFile('types/index.d.ts')
  typesContent = typesContent.replace(/@ton\/core/g, "@ijstech/ton-core")

  const regex = /declare\smodule\s\"index\"\s\{\n(.*?)\n\}\n/gs;
  let mainContent = '';
  while (match = regex.exec(typesContent)) {
    mainContent += match[1];
  }
  typesContent = typesContent.replace(regex, '');

  typesContent = `${typesContent}
  /// <amd-module name="@ton/core" />
declare module "@ton/core" {
  ${mainContent}
}

/// <amd-module name="@scom/ton-core" />
declare module "@scom/ton-core" {
  ${mainContent}
}
`
  Fs.writeFileSync('types/index.d.ts', typesContent)
}

build()
