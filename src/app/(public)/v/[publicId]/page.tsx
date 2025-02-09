import type { Metadata } from 'next';

import { stripHtml } from '@/utils/strip-html';


import { videoService } from '@/services/video.service';
import { SingleVideos } from '@/ui/single-videos/SingleVideos'

export const revalidate = 100;
export const dynamic = 'force-static';

type tParams = Promise<{ publicId: string }>;

export async function generateMetadata(props: { params: tParams }): Promise<Metadata> {
	const { publicId } = await props.params;

	const data = await videoService.byPublicId(publicId);
	const video = data.data;

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	};
}

export async function generateStaticParams() {
	const { data } = await videoService.getAllVideos();

	return data.videos.map(video => ({ publicId: video.publicId }));
}

export default async function Page(props: { params: tParams }) {
	const { publicId } = await props.params;

	const data = await videoService.byPublicId(publicId);
	const video = data.data;

	return <SingleVideos video={video} />;
}
