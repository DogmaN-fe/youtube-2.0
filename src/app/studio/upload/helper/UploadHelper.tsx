'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import * as m from 'framer-motion/m';
import { UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { SectionTitle } from '@/ui/section-title/SectionTitle';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import { COLORS } from '@/constants/colors.constants';

import { useUpload } from '@/hooks/useUpload';

import { fileService } from '@/services/studio/file.service';
import type { IVideoFormData } from '@/types/studio-video.types';

export function UploadVideoForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch
	} = useForm<IVideoFormData>({ mode: 'onChange' });

	const fileName = watch('videoFileName');

	/* const { mutate, isPending } = useMutation({
		mutationKey: ['upload video'],
		mutationFn: (data: IPlaylistData) => playlistService.createInPlaylist(data),
		onSuccess: () => {
			reset();
			toast.success('Playlist successfully created!');
		},
		onError() {
			toast.error('Playlist has error!');
		}
	}); */

	const [progress, setProgress] = useState(0);
	const [isReadyToPublish, setIsReadyToPublish] = useState(false);

	const { uploadFile, isLoading: isUploading } = useUpload({
		onSuccess(data) {
			const file = data[0];
			if (!file) return;

			reset({
				videoFileName: file.url,
				maxResolution: file.maxResolution,
				title: file.name
			});

			toast.success('File successfully uploaded!');
		},
		onError() {
			toast.error('Upload has error!');
		}
	});

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['progressing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		refetchInterval: query => {
			const queryProgress = query.state.data?.data;
			return queryProgress !== undefined && queryProgress < 100 ? 1000 : false;
		}
	});

	useEffect(() => {
		const progressResponse = processingData?.data;

		if (!progressResponse) return;
		setProgress(progressResponse);

		if (progressResponse === 100) {
			setIsReadyToPublish(true);
			toast.success('Video processed successfully!');
		}
	}, [isSuccess, processingData?.data]);

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		//mutate(data);
	};

	const isPending = false;

	return (
		<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				style={{
					position: 'relative',
					maxWidth: '960',
					width: '85%'
				}}
			>
				<div className='bg-bg rounded-lg p-6'>
					<SectionTitle
						classNameHeading='text-xl'
						className=' border-b border-border pb-5'
					>
						Upload a video
					</SectionTitle>

					<label className='flex flex-col items-center px-4 py-6 bg-gray-800/70 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-primary hover:text-white transition duration-200'>
						<UploadCloud size={40} />
						<span className='mt-2 text-base leading-normal'>Select a video</span>
						<input
							type='file'
							className='hidden'
							accept='video/*'
							onChange={uploadFile}
						/>
					</label>

					{isUploading && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<p>Uploading...</p>
						</m.div>
					)}

					{progress > 0 && progress < 100 && (
						<m.div
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							style={{
								height: '0.5rem',
								backgroundColor: COLORS.primary,
								borderRadius: 10,
								transition: 'all .4s ease'
							}}
						/>
					)}

					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoader count={2} />
						) : (
							<>
								<Field
									label='Title'
									type='text'
									registration={register('title', { required: 'Title is required!' })}
									error={errors.title?.message}
									placeholder='Enter title:'
								/>
								<Textarea
									label='Description'
									registration={register('description', { required: 'Description is required!' })}
									error={errors.description?.message}
									placeholder='Enter description:'
									rows={12}
								/>

								{/* Upload a thumbnail */}
								{/* Tags */}
							</>
						)}
						<div className='text-center mt-4'>
							<Button
								type='submit'
								isLoading={isPending || !isReadyToPublish}
							>
								{isReadyToPublish ? 'Publish' : 'Wait processing...'}
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	);
}
