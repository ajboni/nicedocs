import { LoadDocs } from './[lang]/_docs.js';



export function get(req, res) {
	const contents = LoadDocs("all")

	// console.log(req)
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(contents));
}