import { instance } from '@/api/axios';

import type { ISettingsData } from '@/types/settings.types';
import type { IProfileResponse } from '@/types/user.types';

/**
 * Класс, представляющий сервис для работы с видео.
 */
class UserService {
	private _baseUrl = '/users';

	/**
	 * Получает список трендовых видео.
	 */
	getProfile() {
		return instance.get<IProfileResponse>(`${this._baseUrl}/profile`);
	}

	updateProfile(data: ISettingsData) {
		return instance.put<boolean>(`${this._baseUrl}/profile`, data);
	}

	toggleLike(videoId: string) {
		return instance.put(`${this._baseUrl}/profile/likes`, { videoId });
	}
}

export const userService = new UserService();
