// export const docs = [
// 	{
// 		type: "category",
// 		title: "Category 1",
// 		children: [
// 			{
// 				title: "Doc 1",
// 				slug: "doc1",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			},
// 			{
// 				title: "Doc 2",
// 				slug: "doc2",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			},
// 			{
// 				title: "Doc 3",
// 				slug: "doc3",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			},
// 			{
// 				title: "Subfolder",
// 				type: "folder",
// 				children: [
// 					{
// 						title: "Doc 4",
// 						slug: "sub-doc1",
// 						type: "file",
// 						content: "Lorem Ipsum"
// 					},
// 					{
// 						title: "Doc 5",
// 						slug: "sub-doc2",
// 						type: "file",
// 						content: "Lorem Ipsum"
// 					}
// 				]loadedDocs
// 			},
// 			{
// 				title: "Subfolder",
// 				type: "folder",
// 				children: [
// 					{
// 						title: "Doc 4",
// 						slug: "sub-doc1",
// 						type: "file",
// 						content: "Lorem Ipsum"
// 					},
// 					{
// 						title: "Doc 5",
// 						slug: "sub-doc2",
// 						type: "file",
// 						content: "Lorem Ipsum"
// 					}
// 				]
// 			}
// 		]
// 	},
// 	{
// 		type: "category",
// 		title: "Category 2",
// 		children: [
// 			{
// 				title: "Doc 1",
// 				slug: "doc1",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			},
// 			{
// 				title: "Doc 2",
// 				slug: "doc2",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			},
// 			{
// 				title: "Doc 3",
// 				slug: "doc3",
// 				type: "file",
// 				content: "Lorem Ipsum"
// 			}
// 		]
// 	},
// 	{
// 		type: "file",
// 		slug: "doc6",
// 		title: "Another Doc",
// 		content: "Lorem Ipsum 66"
// 	}
// ];

import fs, { unwatchFile } from 'fs';
import marked from 'marked';
import * as matter from 'gray-matter';
import config from "../config.yaml";

// Todo: Import Prism.

export let docs = [];


export function LoadDocs(lang = "eng") {
	// TODO: Filter by language
	let loadedDocs = [];
	let path = './docs/' + lang;

	if (!fs.existsSync(path)) {
		// If language fails, fallback and make a new check for default language. 
		if (fs.existsSync('./docs/' + config.defaultLanguage)) {
			path = './docs/' + config.defaultLanguage;
			console.log(`Language folder: ${lang} not found. Using default language: ${config.defaultLanguage}`)
		}
		else {
			console.log(`No default language ${config.defaultLanguage} folder found.`);
			return [];
		}
	}

	loadedDocs = loadDocsRecursively(path);


	// Following levels are just folders

	// 	const fileContents = fs.readFileSync('./static/posts/' + postFile, 'utf8');
	// 	const matterPost = matter(fileContents, { excerpt: true, excerpt_separator: "<!-- more -->" });
	// 	matterPost.content = marked(matterPost.content)
	// 	matterPost.excerpt = marked(matterPost.excerpt)
	// 	posts.push(matterPost);

	return loadedDocs;
}

function loadDocsRecursively(path, level = 0) {
	const loadedDocs = fs.readdirSync(path);
	let docs = [];

	loadedDocs.forEach(docFile => {
		let obj = {}
		const isFolder = fs.lstatSync(path + "/" + docFile).isDirectory()

		obj.title = formatTitle(docFile)

		if (isFolder) {
			obj.type = "folder"
			obj.children = loadDocsRecursively(path + "/" + docFile, level + 1);
			if (level === 0) {
				obj.type = "category"
			}
		}
		else {
			obj.type = "file";
			obj.slug = slugify(formatTitle(docFile))
			obj.content = fs.readFileSync(path + "/" + docFile).toString()
		}
		docs.push(obj);
	})
	return docs;
}


function formatTitle(name) {
	name = name.split("__").pop();
	name = name.replace("_", " ");
	name = name.replace(".md", "");

	return name;
}

function slugify(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}

// /* Flatten and return a list of files/folders */
// function implode(arr) {
// 	let result = [];
// 	arr.forEach(item => {
// 		let obj = {};

// 		// We want to preserve order and only then process children, so we need to do it two passes.
// 		for (const prop in item) {
// 			if (typeof item[prop] !== "object") {
// 				obj[prop] = item[prop];
// 			}
// 		}
// 		result.push(obj);

// 		for (const prop in item) {
// 			if (typeof item[prop] === "object") {
// 				if (Array.isArray(item[prop])) {
// 					let subResult = implode(item[prop]);
// 					result = result.concat(subResult);
// 				}
// 			}
// 		}
// 	});
// 	return result;
// }

// export const flatDocs = implode(docs);
