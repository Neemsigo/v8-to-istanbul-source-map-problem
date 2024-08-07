console.log('RUN')

const fs = require('node:fs')
const v8toIstanbul = require('v8-to-istanbul')

const getJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))

;(async () => {
	const covItem = getJson('v8-item.json')
	const sourcemap = getJson('source.js.map')
	const converter = v8toIstanbul('source.js', 0, {
		source: covItem.source,
		sourceMap: {
			sourcemap,
		},
	}, (p) => p.includes('node_modules'))

	await converter.load()

	converter.applyCoverage(covItem.functions)
	const report = converter.toIstanbul()

	fs.writeFileSync('result.json', JSON.stringify(report, null, 2))

	console.log('Look for a ./result.json file')
})()
