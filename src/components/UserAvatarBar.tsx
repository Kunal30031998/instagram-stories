import { UserStory } from "../types";
import UserAvatar from "./UserAvatar";

type Props = {
  users: UserStory[];
  onOpenStory: (index: number) => void;
};

const UserAvatarBar = ({ users, onOpenStory }: Props) => (
  <div className="users-bar">
    {users.map((user, index) => (
      <UserAvatar
        key={user.userId}
        user={user}
        onClick={() => onOpenStory(index)}
      />
    ))}
  </div>
);

export default UserAvatarBar;
