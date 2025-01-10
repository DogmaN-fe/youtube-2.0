import type { Metadata } from 'next';
import { Suspense } from 'react';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { SearchHelper } from './helper/SearchHelper';

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
};

export default function Page() {
	return (
		<Suspense>
			<SearchHelper />
		</Suspense>
	);
}
