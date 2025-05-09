import type { RefObject } from 'react';

import type { HTMLCustomVideoElement } from '@/types/video-player.types';

export function useFullScreen(playerRef: RefObject<HTMLCustomVideoElement>) {
	const toggleFullScreen = () => {
		if (playerRef.current?.requestFullscreen) {
			playerRef.current?.requestFullscreen();
		} else if (playerRef.current?.mozRequestFullScreen) {
			playerRef.current?.mozRequestFullScreen();
		} else if (playerRef.current?.msRequestFullScreen) {
			playerRef.current?.msRequestFullScreen();
		} else if (playerRef.current?.webkitRequestFullScreen) {
			playerRef.current?.webkitRequestFullScreen();
		}
	};

	return {
		toggleFullScreen
	};
}
