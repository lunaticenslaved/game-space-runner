import { ReactNode, useMemo, useState } from 'react';

import { TabItem, Tabs } from '@client/shared/components/tabs';

type FavoritesFilter = 'all' | 'favorites';

export type PostsFilterValue = {
  isFavorites: boolean;
};

export type PostsFilterProps = {
  children: (filter: PostsFilterValue) => ReactNode;
};

export const PostsFilter = ({ children }: PostsFilterProps) => {
  const [favoritesFilter, setFavoritesFilter] = useState<FavoritesFilter>('favorites');

  const favoriteTabs = useMemo(
    (): TabItem<FavoritesFilter>[] => [
      {
        value: 'all',
        title: 'All',
      },
      {
        value: 'favorites',
        title: 'Favorites',
      },
    ],
    [],
  );

  const filter = useMemo((): PostsFilterValue => {
    return {
      isFavorites: favoritesFilter === 'favorites',
    };
  }, [favoritesFilter]);

  return (
    <>
      <Tabs<FavoritesFilter>
        tabs={favoriteTabs}
        value={favoritesFilter}
        onChange={setFavoritesFilter}
      />
      {children(filter)}
    </>
  );
};
