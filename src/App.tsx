import { useState, useEffect } from "react";
import "./App.css";
import { UserStory } from "./types";
import { useUpdateStoryInFiveSec } from "./hooks/useUpdateStoryInFiveSec";
import UserAvatarBar from "./components/UserAvatarBar";
import StoryViewer from "./components/StoryViewer";

const isMobile = window.innerWidth < 769;

function App() {
  const [users, setUsers] = useState<UserStory[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [fadeInKey, setFadeInKey] = useState<number>(0);

  useEffect(() => {
    fetch("/data/stories.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useUpdateStoryInFiveSec(() => {
    if (currentUserIndex !== null) goNext();
  }, [currentUserIndex, currentStoryIndex]);

  const openStory = (userIndex: number) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setFadeInKey((prev) => prev + 1);
  };

  const closeStory = () => {
    setCurrentUserIndex(null);
    setCurrentStoryIndex(0);
  };

  const goNext = () => {
    if (currentUserIndex === null) return;

    const user = users[currentUserIndex];
    if (currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      closeStory();
    }
    setFadeInKey((prev) => prev + 1);
  };

  const goPrev = () => {
    if (currentUserIndex === null) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      const prevUser = users[currentUserIndex - 1];
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(prevUser.stories.length - 1);
    }
    setFadeInKey((prev) => prev + 1);
  };

  if (!isMobile)
    return (
      <div className="MobileOnlyMessage">
        This app is only for mobile devices.
      </div>
    );

  return (
    <div className="App">
      <h2>Instagram</h2>
      <UserAvatarBar users={users} onOpenStory={openStory} />

      {currentUserIndex !== null && (
        <StoryViewer
          storyUrl={users[currentUserIndex].stories[currentStoryIndex]}
          userName={users[currentUserIndex].userName}
          profilePic={users[currentUserIndex].profilePic}
          onClose={closeStory}
          onNext={goNext}
          onPrev={goPrev}
          fadeInKey={fadeInKey}
        />
      )}
    </div>
  );
}

export default App;
