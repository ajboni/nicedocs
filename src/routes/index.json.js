import { LoadDocs } from './[lang]/_docs.js';



export function get(req, res) {
	console.log(req.query)
	const contents = LoadDocs(JSON.parse(req.query.lang))


	// console.log(req)
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(contents));
}