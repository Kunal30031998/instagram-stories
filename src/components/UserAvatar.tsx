import { UserStory } from "../types";

type Props = {
  user: UserStory;
  onClick: () => void;
};

const UserAvatar = ({ user, onClick }: Props) => (
  <div className="user-avatar" onClick={onClick}>
    <img src={user.profilePic} alt={user.userName} />
    <p>{user.userName}</p>
  </div>
);

export default UserAvatar;
