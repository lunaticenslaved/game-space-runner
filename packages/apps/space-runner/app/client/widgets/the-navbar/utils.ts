import { AccessLevel, RouteSetting } from '@client/navigation';

type FilterLinksProps<T> = {
  links: T[];
  access: AccessLevel[];
};

export const filterLinks = <T extends { route: RouteSetting }>({
  links,
  access,
}: FilterLinksProps<T>) => {
  return links.filter(({ route }) => access.includes(route.access));
};
