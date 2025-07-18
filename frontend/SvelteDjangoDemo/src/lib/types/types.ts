export type Character = {
	id: number;
	name: string;
	current_HP: number;
	max_HP: number;
	ac: number;
	character_class: string;
	level: number;
	player: boolean;
	init: number | null;
	combat_session: number;
	owner: number;
};

export type CombatSession = {
	name: string;
	combat_index: string;
	owner: number;
};

export type UsernameCheck = {
	value: boolean;
	detail: string;
};
