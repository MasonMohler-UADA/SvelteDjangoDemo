export type CharacterCardProps = {
	id: number;
	name: string;
	current_HP: number;
	max_HP: number;
	ac: number;
    character_class: string;
    level: number;
	isSelected?: boolean;
};