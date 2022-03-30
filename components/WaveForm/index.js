import { useRef, useEffect } from 'react';
import Wavesurfer from 'wavesurfer.js';

const Waveform = ({ url, blob, name, ...props }) => {
  const waveform = useRef(null);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: `#${name}`,
        waveColor: '#567FFF',
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        cursorColor: '#567FFF',
      });
      // Load audio from a remote url.
      /* To load a local audio file
            1. Read the audio file as a array buffer.
            2. Create a blob from the array buffer
            3. Load the audio using wavesurfer's loadBlob API
     */
      if (blob) {
        waveform.current.loadBlob(blob);
        return;
      }
      if (url) {
        waveform.current.load(url);
        return;
      }
    }
  }, [blob]);

  const playAudio = () => {
    // Check if the audio is already playing
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      {...props}
    >
      <div id={name} />
      <div
        flexDirection="row"
        justifyContent="center"
        style={{ display: 'flex', justify: 'center' }}
      >
        <button style={{ margin: '4px' }} onClick={playAudio}>
          Play / Pause
        </button>
      </div>
    </div>
  );
};

export default Waveform;
