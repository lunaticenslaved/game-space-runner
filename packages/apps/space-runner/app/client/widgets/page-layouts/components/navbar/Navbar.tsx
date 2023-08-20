import { NavbarIcons } from './views/icons/navbar-icons';
import { NavbarTabs } from './views/tabs/navbar-tabs';

export interface NavbarProps {
  view?: 'tabs' | 'icons';
}

export const Navbar = ({ view = 'tabs' }: NavbarProps) => {
  return view === 'tabs' ? <NavbarTabs /> : <NavbarIcons />;
};
