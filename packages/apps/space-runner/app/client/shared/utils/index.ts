import { RESOURCES_URL } from '../../../shared/constants';

export const getResourceUrl = (resource: string) => {
  return `${RESOURCES_URL}/${resource}`;
};
