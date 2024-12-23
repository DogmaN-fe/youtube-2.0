'use client'

import { useQuery } from '@tanstack/react-query'

import { VideoItem } from '@/ui/video-item/VideoItem'

import { videoService } from '@/services/video.service'
import type { IVideo } from '@/types/video.types'

export function Explore() {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})

	return (
		<section>
			<h2>Explore</h2>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading
					? 'Loading...'
					: data?.data.videos.length &&
						data.data.videos.map((video: IVideo) => (
							<VideoItem
								key={video.id}
								video={video}
							/>
						))}
			</div>
		</section>
	)
}
