type Props = {
  profilePic: string;
  userName: string;
};

const Header = ({ profilePic, userName }: Props) => (
  <div className="StoryHeader">
    <img src={profilePic} alt="profile" className="StoryUserPic" />
    <span className="StoryUserName">{userName}</span>
  </div>
);

export default Header;
