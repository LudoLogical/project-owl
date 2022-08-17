import PlayMode from './play-mode';

type PlayModeContext = {
  mode: PlayMode;
  timeInMinutes: number;
  hadCompleteExperience: boolean;
};

export default PlayModeContext;
