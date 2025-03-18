import fs from 'node:fs'
import path from 'node:path'

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'))
const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.js')

fs.cpSync(pdfWorkerPath, './dist/pdf.worker.js', { recursive: true })
