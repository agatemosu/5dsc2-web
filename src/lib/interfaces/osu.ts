interface UserStatistics {
	country_rank: number;
	global_rank: number;
}

export interface OsuUser {
	country_code: string;
	id: number;
	statistics: UserStatistics;
	username: string;
}
