import Header from "./Header";

type Props = {
  storyUrl: string;
  userName: string;
  profilePic: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  fadeKey: number;
};

const StoryViewer = ({
  storyUrl,
  userName,
  profilePic,
  onClose,
  onNext,
  onPrev,
  fadeKey,
}: Props) => {
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    x < window.innerWidth / 2 ? onPrev() : onNext();
  };

  return (
    <div className="story-overlay" onClick={handleTap}>
      <div key={fadeKey} className="story-fade story-open-animation">
        <Header profilePic={profilePic} userName={userName} />
        <img src={storyUrl} alt="story" className="story-full" />
      </div>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default StoryViewer;
