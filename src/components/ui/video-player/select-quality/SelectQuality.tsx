'use client';

import { AnimatePresence } from 'framer-motion';
import { m } from 'framer-motion';
import { Check } from 'lucide-react';

import { useOutside } from '@/hooks/useOutside';

import { QUALITIES } from './select-quality.data';
import type { EnumVideoPlayerQuality } from '@/types/video-player.types';

interface Props {
	currentValue: EnumVideoPlayerQuality;
	onChange: (quality: EnumVideoPlayerQuality) => void;
	maxResolution: EnumVideoPlayerQuality;
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
	const { ref, isShow, setIsShow } = useOutside(false);

	const availableQualities = QUALITIES.slice(QUALITIES.indexOf(maxResolution));

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='transition-colors hover:text-primary'
			>
				{currentValue}
			</button>
			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: -10 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-bg/80 py-2 px-3 rounded absolute bottom-full right-0 z-10 shadow w-max max-w-32'
					>
						{availableQualities.map(quality => (
							<li
								key={quality}
								className='mb-1'
							>
								<button
									onClick={() => {
										onChange(quality);
										setIsShow(false);
										
									}}
									disabled={quality === currentValue}
									className='transition-colors hover:text-primary'
								>
									{quality === currentValue ? (
										<span className='flex gap-1 items-center opacity-80'>
											{quality} <Check size={18} />
										</span>
									) : (
										quality
									)}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	);
}
