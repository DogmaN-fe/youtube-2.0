import * as m from 'framer-motion/m';
import { type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PAGE } from '@/config/public-page.config';

import { transformCount } from '@/utils/transform-count';
import { transformDate } from '@/utils/transform-date';

import { VerifiedItem } from '../verified-item/VerifiedItem';

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
				opacity: 0,
				borderRadius: 6
			}}
			animate={{
				scale: 1,
				opacity: 1
			}}
			whileHover={{
				scale: 1.1,
				y: -5,
				boxShadow: '0px 0px 25px rgba(255, 255, 255, 0.137)'
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
						width={431}
						height={364}
						alt={video.title}
						className='rounded-md'
						quality={100}
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
						alt={video?.channel?.user?.name || ''}
						className='rounded-full shadow'
					/>
				</Link>
			</div>
			<div className='p-1'>
				<div className='mb-1.5 flex items-center justify-between'>
					<div className='flex items-center gap-0.5'>
						{Icon && (
							<Icon
								className='text-red-600'
								size={20}
							/>
						)}
						<span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)} views</span>
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
						{video.channel.isVerified && <VerifiedItem />}
					</Link>
				</div>
			</div>
		</m.article>
	);
}
