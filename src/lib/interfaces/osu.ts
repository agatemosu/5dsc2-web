interface Team {
	flag_url: string | null;
	id: number;
	name: string;
	short_name: string;
}

interface UserStatistics {
	country_rank: number;
	global_rank: number;
}

export interface OsuUser {
	country_code: string;
	id: number;
	statistics: UserStatistics;
	team: Team | null;
	username: string;
}
