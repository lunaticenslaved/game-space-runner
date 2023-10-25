import { PlayerIcon } from '@client/entities/player';
import { Avatar } from '@libs/uikit/components/avatar';
import { Text } from '@libs/uikit/components/text';
import { Player } from '@shared/models/player';

export type PlayerItemProps = {
  player: Player;
};

export const PlayerItem = ({ player }: PlayerItemProps) => {
  const { user, score } = player;

  return (
    <div className="flex p-4 align-stretch cursor-pointer rounded-md hover:bg-white/5">
      <Avatar
        className="h-14 w-14 rounded-lg"
        link={user.avatars[0]?.link}
        placeholderIcon={<PlayerIcon.Placeholder />}
      />

      <div className="grow-1 px-4 py-1 flex flex-col justify-between">
        <Text className="font-semibold" as="p">
          {user.login}
        </Text>
        <Text as="p">{score} points</Text>
      </div>
    </div>
  );
};
