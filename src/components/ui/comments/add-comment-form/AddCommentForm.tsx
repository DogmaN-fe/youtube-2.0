'use client';

import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Textarea } from '@/ui/field/Textarea';

import { useAuth } from '@/hooks/useAuth';

import { commentService } from '@/services/comment.service';
import type { ICommentData } from '@/types/comment.types';

interface Props {
	videoId: string;
	refetch: () => void;
}

export function AddCommentForm({ videoId, refetch }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({ mode: 'onChange' });

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch();
			reset();
		}
	});

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({ text, videoId });
	};

	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) return null;

	return (
		<div className='mb-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr]  gap-14'
			>
				<Textarea
					registration={register('text', {
						required: true
					})}
					placeholder='Enter comment'
					rows={1}
					wrapperClassName='mb-0'
					error={errors.text?.message}
				/>
				<button
					className='bg-border font-medium rounded h-max py-2.5 opacity-80 hover:opacity-100 transition-opacity'
					disabled={isPending}
				>
					{isPending ? 'Adding...' : 'Add'}
				</button>
			</form>
		</div>
	);
}
