interface UserStatistics {
	country_rank: number;
	global_rank: number;
}

interface UserCover {
	url: string;
}

export interface OsuUser {
	country_code: string;
	id: number;
	cover: UserCover;
	statistics: UserStatistics;
	username: string;
}
