type Props = {
  profilePic: string;
  userName: string;
};

const Header = ({ profilePic, userName }: Props) => (
  <div className="story-header">
    <img src={profilePic} alt="profile" className="story-user-pic" />
    <span className="story-user-name">{userName}</span>
  </div>
);

export default Header;
