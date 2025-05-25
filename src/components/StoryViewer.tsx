import Header from "./Header";

type Props = {
  storyUrl: string;
  userName: string;
  profilePic: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  fadeInKey: number;
};

const StoryViewer = ({
  storyUrl,
  userName,
  profilePic,
  onClose,
  onNext,
  onPrev,
  fadeInKey,
}: Props) => {
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    x < window.innerWidth / 2 ? onPrev() : onNext();
  };

  return (
    <div className="StoryOverlay" onClick={handleTap}>
      <div key={fadeInKey} className="StoryFade StoryOpenAnimation">
        <Header profilePic={profilePic} userName={userName} />
        <img src={storyUrl} alt="story" className="StoryFull" />
      </div>
      <button className="CloseBtn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default StoryViewer;
