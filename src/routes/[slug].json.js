import { LoadDocs } from './_docs.js';

// It was necessary lo reload the documents each time, otherwise, users reaching from the outside wouldnt get sidebar.
// Could be improved.


const lookup = new Map();
let docs = [];


export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;


	// Parse files only once.
	// TODO: See how affects localization.
	if (lookup.size === 0) {
		docs = LoadDocs(req.query.lang);
		docs.forEach(doc => {
			readDoc(doc)
		});
	}


	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		const resObj = { doc: lookup.get(slug), docs: docs }
		res.end(JSON.stringify(resObj));


	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

function readDoc(doc) {
	if (doc.type === 'folder' || doc.type === 'category') {
		doc.children.forEach(subdoc => {
			readDoc(subdoc)
		});

	}
	lookup.set(doc.slug, doc);


}