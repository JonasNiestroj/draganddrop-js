module.exports = {
	presets: [
		['@babel/preset-env', { loose: true, modules: false }]
	],
	plugins: [
		'transform-es2015-modules-commonjs'
	].filter(Boolean)
}