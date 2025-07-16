export type Character = {
	name: string;
	hp: number;
	ac: number;
	init?: number;
};

type CombatSession = {
	characters: Character[];
};

export type SideNavLogo = {
	src: string;
	href: string;
	alt: string;
};

interface NavItem {
	link: string;
	query?: string;
	external?: boolean;
	label: string;
	icon?: Component;
	activeIcon?: Component;
}

export type SubMenuItem = {
	link: string;
	external?: boolean;
	label: string;
};

export type SideNavItem = NavItem &
	({ id?: undefined; subMenuItems?: undefined } | { id: string; subMenuItems: SubMenuItem[] });

export type SideNavList = {
	subheading?: string;
	navItems: SideNavItem[];
}[];

export type SideNavProps = {
	/** Sets the logo to be displayed in side nav */
	sideNavLogo: SideNavLogo;
	/** Sets navigation links */
	sideNavList: SideNavList | undefined;
	/** Sets the current page pathname (used internally to set 'current page' styles) */
	pagePathname: string;
	/** URL path to login page (for login button) */
	loginURL?: string;
	/** URL path to logout page (for logout button) */
	logoutURL?: string;
	/** Determines whether to display login or logout button */
	loggedIn?: boolean;
	/** Sets screen-width breakpoint for "desktop mode" */
	desktopModeBreakpoint?: number;
	/** Hides UADA logo */
	hideLogo?: boolean;
	/** Removes login/logout buttons entirely */
	disableLogin?: boolean;
	/** Disables large screen nav behaviors */
	disableDesktopMode?: boolean;
	/** Disables A11y "skip to main content" link */
	disableSkipLink?: boolean;
};
