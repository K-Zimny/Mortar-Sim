/**
 * Plays a new audio file.
 *
 * @param {string} url - url to audio file
 * @param {object} options - additional options for audio
 * @param {boolean} options.loop - loop audio on complete
 */
const playAudio = (url, { loop = false } = {}) => {
  const audio = new Audio(url);
  audio.play();
  loop ? (audio.loop = true) : (audio.loop = false);
};

export default playAudio;
