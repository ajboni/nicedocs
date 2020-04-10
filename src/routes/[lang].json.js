import { LoadDocs } from './[lang]/_docs.js';
import { getLanguage, docs, docsMap } from '../store.js'
import { get as g } from "svelte/store";


export function get(req, res, next) {
	const { slug, lang } = req.params
	const localizedSlug = lang + "/" + slug.join('/');
	const doc = g(docsMap).get(localizedSlug);

	res.writeHead(200, {
		'Content-Type': 'application/json'

	});

	res.end(JSON.stringify(doc));
}


