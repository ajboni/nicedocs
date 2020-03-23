import { LoadDocs } from './_docs.js';



export function get(req, res) {

	const contents = LoadDocs(req.query.lang)


	// console.log(req)
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(contents));
}