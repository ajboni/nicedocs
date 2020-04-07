import { LoadDocs } from './_docs.js';
import { getLanguage, docs, docsMap } from '../../store.js'
import { get as g } from "svelte/store";


export function get(req, res, next) {
	const { slug, lang } = req.params
	// console.log(req.params)

	const localizedSlug = lang + "/" + slug.replace(',', "/");
	const doc = g(docsMap).get(localizedSlug);
	// console.log(doc)

	res.writeHead(200, {
		// 			'Content-Type': 'application/json'
		// 		});
	})

	res.end(JSON.stringify(doc));
}



// // It was necessary lo reload the documents each time, otherwise, users reaching from the outside wouldnt get sidebar.
// // Could be improved.


// const lookup = new Map();
// let docs = [];


// export function get(req, res, next) {

// 	// the `slug` parameter is available because
// 	// this file is called [slug].json.js
// 	const { slug, lang } = req.params
// 	const localizedSlug = lang + "/" + slug;


// 	// Parse files only once.
// 	// TODO: See how affects localization.
// 	// if (lookup.size === 0) {

// 	const language = getLanguage(lang)
// 	docs = LoadDocs("all");
// 	console.log("-------::::::::::")
// 	console.log(docs)
// 	docs[lang].forEach(doc => {
// 		readDoc(doc, lang)
// 	});



// 	if (lookup.has(localizedSlug)) {
// 		res.writeHead(200, {
// 			'Content-Type': 'application/json'
// 		});

// 		const resObj = { doc: lookup.get(localizedSlug), docs: docs }
// 		res.end(JSON.stringify(resObj));


// 	} else {
// 		res.writeHead(404, {
// 			'Content-Type': 'application/json'
// 		});

// 		res.end(JSON.stringify({
// 			message: `Not found ${localizedSlug}`
// 		}));
// 	}
// }

// function readDoc(doc, lang) {
// 	if (doc.type === 'folder' || doc.type === 'category') {
// 		doc.children.forEach(subdoc => {
// 			readDoc(subdoc)
// 		});

// 	}

// 	lookup.set(doc.slug, doc);

// }