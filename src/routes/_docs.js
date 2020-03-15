
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
			}
		],
	},
	{
		type: 'file',
		slug: 'doc6',
		title: 'Another Doc',
		content: 'Lorem Ipsum 66',
	}
]