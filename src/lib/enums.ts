export enum Mod {
	NM = 'NM',
	HD = 'HD',
	HR = 'HR',
	DT = 'DT',
	EZ = 'EZ',
	// HT = 'HT',
	TB = 'TB',
}

export enum Grade {
	D = 'D',
	C = 'C',
	B = 'B',
	A = 'A',
	S = 'S',
	SH = 'SH',
	SS = 'SS',
	SSH = 'SSH',
}

export enum StageType {
	Qualifiers = 'QUALIFIERS',
	LeaguePhase = 'LEAGUE_PHASE',
	Purge = 'PURGE',
	Bracket = 'BRACKET',
	GrandFinal = 'GRAND_FINAL',
}

export enum MatchStatus {
	Planned = 'PLANNED',
	Ongoing = 'ONGOING',
	Finished = 'FINISHED',
}

export enum DraftAction {
	Protect = 'PROTECT',
	Ban = 'BAN',
	Pick = 'PICK',
	Tiebreaker = 'TIEBREAKER',
}

export enum DraftActor {
	Red = 'RED',
	Blue = 'BLUE',
}

export interface DraftEntry {
	action: DraftAction;
	actor: DraftActor;
	pick: string;
	winner?: DraftActor;
}
