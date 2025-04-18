import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useProfile } from './useProfile';
import { userService } from '@/services/studio/user.service';
import type { ISettingsData } from '@/types/settings.types';

export function useSettings() {
	const form = useForm<ISettingsData>({
		mode: 'onChange'
	});

	const { profile, isSuccess, refetch } = useProfile();

	useEffect(() => {
		if (!isSuccess) return;

		const channel = profile?.channel
			? {
					avatarUrl: profile?.channel?.avatarUrl,
					bannerUrl: profile?.channel?.bannerUrl,
					description: profile?.channel?.description,
					slug: profile?.channel?.slug
				}
			: {};

		form.reset({
			channel,
			email: profile?.email,
			name: profile?.name
		});
	}, [form, profile, isSuccess]);

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data),
		onSuccess: () => {
			refetch();
		}
	});

	const onSubmit: SubmitHandler<ISettingsData> = data => {
		mutate(data);
	};

	return {
		form,
		onSubmit,
		isLoading: isPending
	};
}
