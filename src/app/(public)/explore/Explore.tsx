'use client';

import { useQuery } from '@tanstack/react-query';
import { Compass } from 'lucide-react';

import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';
import { VideoItem } from '@/ui/video-item/VideoItem';

import { useAuth } from '@/hooks/useAuth';

import { videoService } from '@/services/video.service';
import type { IVideo } from '@/types/video.types';

export function Explore() {
	const { user } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos(user?.id)
	});

	return (
		<section>
			<SectionTitle Icon={Compass}>Explore</SectionTitle>
			<div className='grid-6-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						classNames='h-40 rounded-md'
					/>
				) : !!data?.data.videos.length ? (
					data.data.videos.map((video: IVideo) => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div>Explore are temporarily unavailable</div>
				)}
			</div>
		</section>
	);
}
