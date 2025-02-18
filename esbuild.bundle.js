const Fs = require('fs')

// const dependencies = {
//   'axios.d.ts': 'axios',
//   'tonconnect.d.ts': '@tonconnect/sdk'
// }

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
      external: ['@ton/core']
    })
    .catch(() => process.exit(1));

  let content = Fs.readFileSync('lib/index.js', 'utf8')
  content = content.replace(/@ton\/core/g, "@ijstech/ton-core")

  Fs.writeFileSync('lib/index.js', content)

  content = `
define("@scom/ton-core", ["require", "exports", "@ijstech/ton-core"], function (require, exports, toncore_1) {
  Object.defineProperty(exports, "__esModule", { value: true }); 
  ${content}
  window.TonCore = exports;
});`

  Fs.writeFileSync('lib/bundle.js', content)

  // const typesMap = new Map();
  // for (const key in dependencies) {
  //   const content = await readFile(`types/${key}`)
  //   typesMap.set(key, {
  //     content: content.replace(/export declare/g, "export").replace(/declare /g, ""),
  //     name: dependencies[key]
  //   })
  // }

  let typesContent =  Fs.readFileSync('types/bundle.d.ts', 'utf8')

  // const maybeRegex = /declare\smodule\s\"utils\/maybe\"\s\{\n(.*?)\n\}\n/gs;
  // typesContent = typesContent.replace(maybeRegex, "")

  // const regex = /declare\smodule\s\"index\"\s\{\n(.*?)\n\}\n/gs;
  // let mainContent = '';
  // while (match = regex.exec(typesContent)) {
  //   mainContent += match[1];
  // }
  typesContent = typesContent
    .replace('/// <reference types="node" />', '')
    // .replace('/// <reference types="@ijstech/ton-core" />', '')

  // let libsContent = '';
  // for (const [_, content] of typesMap) {
  //   if (content.name === '@ijstech/ton-core') {
  //     libsContent += `${content.content}\n`;
  //   } else {
  //     libsContent += `/// <amd-module name="${content.name}" />\ndeclare module "${content.name}" {\n${content.content}\n}\n`;
  //   }
  // }

//   typesContent = `${typesContent}
// /// <amd-module name="@scom/ton-core" />
// declare module "@scom/ton-core" {
//   ${mainContent}
// }
// `

  typesContent = typesContent
    .replace(/@ton\/core/g, "@ijstech/ton-core")
    .replace("from 'boc/Cell'", "from '@ijstech/ton-core'")
    .replace(/^import\s+\{[^}]*\}\s+from\s+['"]zod['"];\n?\s*/gm, "")
    .replace("export { z }", "")

  const zodTypes = Fs.readFileSync('node_modules/@ijstech/zod/types/index.d.ts', 'utf8')

  Fs.writeFileSync('types/index.d.ts', `/// <amd-module name="@scom/ton-core" />
declare module "@scom/ton-core" {
  ${zodTypes}
  ${typesContent}
}
`)
}

build()
