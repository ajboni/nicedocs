
export const docs = [
	{
		type: 'category',
		title: 'Category 1',
		children: [
			{
				title: 'Doc 1',
				slug: 'doc1',
				type: 'file',
				content: 'Lorem Ipsum'
			},
			{
				title: 'Doc 2',
				slug: 'doc2',
				type: 'file',
				content: 'Lorem Ipsum'
			},
			{
				title: 'Doc 3',
				slug: 'doc3',
				type: 'file',
				content: 'Lorem Ipsum'
			},
			{
				title: 'Subfolder',
				type: 'folder',
				children: [
					{
						title: 'Doc 4',
						slug: 'sub-doc1',
						type: 'file',
						content: 'Lorem Ipsum'
					},
					{
						title: 'Doc 5',
						slug: 'sub-doc2',
						type: 'file',
						content: 'Lorem Ipsum'
					},
				]
			},
			{
				title: 'Subfolder',
				type: 'folder',
				children: [
					{
						title: 'Doc 4',
						slug: 'sub-doc1',
						type: 'file',
						content: 'Lorem Ipsum'
					},
					{
						title: 'Doc 5',
						slug: 'sub-doc2',
						type: 'file',
						content: 'Lorem Ipsum'
					},
				]
			}
		],
	}, {
		type: 'category',
		title: 'Category 2',
		children: [
			{
				title: 'Doc 1',
				slug: 'doc1',
				type: 'file',
				content: 'Lorem Ipsum'
			},
			{
				title: 'Doc 2',
				slug: 'doc2',
				type: 'file',
				content: 'Lorem Ipsum'
			},
			{
				title: 'Doc 3',
				slug: 'doc3',
				type: 'file',
				content: 'Lorem Ipsum'
			},
		]
	},
	{
		type: 'file',
		slug: 'doc6',
		title: 'Another Doc',
		content: 'Lorem Ipsum 66',
	}
]


function implode(arr) {
	let result = [];
	arr.forEach(item => {
		let obj = {}


		// We want to preserve order and only then process children, so we need to do int two passes.
		for (const prop in item) {
			if (typeof (item[prop]) !== "object") {
				obj[prop] = item[prop];
			}
		}
		result.push(obj);

		for (const prop in item) {
			if (typeof (item[prop]) === "object") {
				if (Array.isArray(item[prop])) {
					let subResult = implode(item[prop]);
					result = result.concat(subResult)
				}
			}
		}
	});
	return result;
}


export const flatDocs = implode(docs);