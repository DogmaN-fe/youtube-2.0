import type { Metadata } from 'next';
import dynamicNext from 'next/dynamic';
import Image from 'next/image';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VerifiedItem } from '@/ui/verified-item/VerifiedItem';

/* import type { TPageSlugProp } from '@/types/pages.types'; */
import { transformCount } from '@/utils/transform-count';

import { ChannelVideos } from './ChannelVideos';
import { channelService } from '@/services/channel.service';
import type { IChannel } from '@/types/channel.types';

const DynamicSubscribeButton = dynamicNext(
	() => import('@/ui/subscribe-button/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: true, loading: () => <SkeletonLoader classNames='w-36 h-10 rounded-md' /> }
);

export const revalidate = 100;
export const dynamic = 'force-static';

type tParams = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: tParams }): Promise<Metadata> {
	const { slug } = await props.params;

	const data = await channelService.bySlug(slug);

	const channel = data.data;

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	};
}

export async function generateStaticParams() {
	const { data } = await channelService.getAll();

	return data.map((channel: IChannel) => ({ slug: channel.slug }));
}

export default async function Page(props: { params: tParams }) {
	const { slug } = await props.params;

	const data = await channelService.bySlug(slug);

	const channel = data.data;

	return (
		<section>
			<div>
				<div className='relative w-full h-[249px] rounded-3xl overflow-hidden shadow-md'>
					<Image
						alt={channel.user.name || ''}
						src={channel.bannerUrl}
						style={{ objectFit: 'cover' }}
						priority
						fill
					/>
				</div>
				<div className='flex items-center gap-5 mt-7 mb-10 w-1/2'>
					<Image
						alt={channel.slug}
						src={channel.avatarUrl}
						width={162}
						height={162}
						className='rounded-xl flex-shrink-0 shadow-md'
						priority
					/>
					<div>
						<SectionTitle
							isPageHeading
							className='mb-2'
						>
							<span className='flex items-center gap-2'>
								{channel.user.name} {channel.isVerified && <VerifiedItem size={25} />}
							</span>
						</SectionTitle>
						<div className='mb-2 text-gray-400 text-[0.9rem] flex items-center gap-1'>
							<span>@{channel.slug}</span>
							<span>•</span>
							<span>{transformCount(channel.subscribers.length)} subscribers</span>
							<span>•</span>
							<span>{transformCount(channel.videos.length)} videos</span>
						</div>
						<article className='mb-2 text-gray-400 text-sm leading-snug'>
							{channel.description}
						</article>
						<DynamicSubscribeButton slug={slug} />
					</div>
				</div>
			</div>
			{!!channel.videos?.length && <ChannelVideos videos={channel.videos} />}
		</section>
	);
}
