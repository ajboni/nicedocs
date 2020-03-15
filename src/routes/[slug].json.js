import { docs } from './_docs.js';

const lookup = new Map();
docs.forEach(doc => {
	readDoc(doc)
});

function readDoc(doc) {
	if (doc.type === 'folder' || doc.type === 'category') {
		doc.children.forEach(subdoc => {
			readDoc(subdoc)
		});

	}
	lookup.set(doc.slug, JSON.stringify(doc));
}

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
