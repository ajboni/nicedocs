import { docs } from './_docs.js';

const contents = JSON.stringify(docs.map(doc => {
	return {
		title: doc.type,
		slug: doc.slug
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}