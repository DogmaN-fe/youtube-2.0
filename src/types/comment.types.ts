import type { IChannel } from './channel.types';
import type { IUser } from './user.types';

export interface IComment {
	id: string;
	text: string;
	videoId: string;
	createdAt: string;

	user: IUser & {
		channel: IChannel;
	};

}

export interface ICommentData {
	text: string;
	videoId: string;
}
