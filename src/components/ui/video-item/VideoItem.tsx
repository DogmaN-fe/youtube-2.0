import * as m from 'framer-motion/m';
import { BadgeCheck, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.config';

import { transformDate } from '@/utils/transform-date';
import { transformViews } from '@/utils/transform-views';

import type { IVideo } from '@/types/video.types';

interface Props {
	video: IVideo;
	Icon?: LucideIcon;
}

export function VideoItem({ video, Icon }: Props) {
	return (
		<m.article
			initial={{
				scale: 0.5,
				opacity: 0
			}}
			animate={{
				scale: 1,
				opacity: 1
			}}
			whileHover={{
				scale: 1.15,
				y: -5
			}}
			transition={{
				type: 'spring',
				// Жесткость
				stiffness: 500,
				// демпфирование
				damping: 30
			}}
		>
			<div className='relative mb-1.5'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={280}
						height={140}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='absolute left-2 bottom-2'
				>
					<Image
						src={video.channel.avatarUrl}
						width={35}
						height={35}
						alt={video.channel.slug}
						className='rounded-full shadow'
					/>
				</Link>
			</div>
			<div className='mb-1.5 flex items-center justify-between'>
				<div className='flex items-center gap-0.5'>
					{Icon && (
						<Icon
							className='text-red-600'
							size={20}
						/>
					)}
					<span className='text-gray-400 text-sm'>{transformViews(video.viewsCount)}</span>
				</div>
				<div>
					<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div className='mb-1'>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					className='line-clamp-2 leading-[1.3]'
				>
					{video.title}
				</Link>
			</div>
			<div>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='flex items-center gap-1'
				>
					<span className='text-gray-400 text-sm hover:text-gray-100 transition-all'>
						{video.channel.user.name}
					</span>
					{video.channel.isVerified && (
						<span>
							<BadgeCheck
								className='text-green-500'
								size={15}
							/>
						</span>
					)}
				</Link>
			</div>
		</m.article>
	);
}
