import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, type UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { STUDIO_PAGE } from '@/config/studio-page.config';

import { Button } from '../button/Button';
import { Field } from '../field/Field';
import { Textarea } from '../field/Textarea';
import { TagsField } from '../tags-field/TagsField';
import { UploadField } from '../upload-field/UploadField';
import { UploadLoader } from '../upload-loader/UploadLoader';
import { VideoForm } from '../video-form/VideoForm';

import { studioVideoService } from '@/services/studio/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';

interface Props {
	form: UseFormReturn<IVideoFormData, any, undefined>;
	isReadyToPublish: boolean;
}

export function CreateVideoFrom({ form, isReadyToPublish }: Props) {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			form.reset();
			toast.success('Video successfully created!');
			router.push(STUDIO_PAGE.HOME);
		},
		onError() {
			toast.error('Video creating has error!');
		}
	});

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data);
	};

return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<VideoForm form={form} />
			<div className='mt-4 text-right'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing...'}
				</Button>
			</div>
		</form>
	);
}
