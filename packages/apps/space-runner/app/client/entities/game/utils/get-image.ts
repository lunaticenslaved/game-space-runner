import platform1 from '@client/shared/assets/png/platform.png';
import platform2 from '@client/shared/assets/png/platform2.png';
import platform3 from '@client/shared/assets/png/platform3.png';
import smPlatform1 from '@client/shared/assets/png/platformSmallTall.png';
import smPlatform2 from '@client/shared/assets/png/platformSmallTall2.png';
import smPlatform3 from '@client/shared/assets/png/platformSmallTall3.png';
import hills1 from '@client/shared/assets/png/hills.png';
import hills2 from '@client/shared/assets/png/hills2.png';
import hills3 from '@client/shared/assets/png/hills3.png';

import { createImage } from './create-image';

const base = {
  platform: createImage(platform1),
  smPlatform: createImage(smPlatform1),
  hills: createImage(hills1),
};

export function getImage(id: number) {
  switch (id) {
    case 1: {
      return base;
    }
    case 2: {
      return {
        platform: createImage(platform2),
        smPlatform: createImage(smPlatform2),
        hills: createImage(hills2),
      };
    }
    case 3: {
      return {
        platform: createImage(platform3),
        smPlatform: createImage(smPlatform3),
        hills: createImage(hills3),
      };
    }

    default: {
      return base;
    }
  }
}
