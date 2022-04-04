import { useRef, useEffect, useState } from 'react';
import Wavesurfer from 'wavesurfer.js';
import * as WaveformRegionsPlugin from '@/wavesurfer/wavesurfer.regions';

const Waveform = ({ url, blob, name, onDelete, onRegionSave, ...props }) => {
  const waveform = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);

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
        plugins: [WaveformRegionsPlugin.create({ maxLength: 90 })],
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
      // Enable dragging on the audio waveform
    }
    waveform.current.enableDragSelection({
      maxLength: 90,
    });
    // Perform action when new region is created
    waveform.current.on('region-created', (e) => {
      let color = 'rgba(0,0,0,0.3)';
      e.color = color;
      console.log(e);
      setActiveRegion(e);
    });

    waveform.current.on('region-click', (region) => {
      let color = 'rgba(0,0,0,0.5)';
      region.color = color;
      console.log(region);
      setActiveRegion(region);
    });
  }, [blob, name, url]);

  // delete a particular region
  const deleteClip = () => {
    waveform.current.regions.list[activeRegion.id].remove();
    setActiveRegion(null);
  };

  // play a particular region
  const playClip = () => {
    waveform.current.regions.list[activeRegion.id].play();
  };

  const saveRegion = () => {
    onRegionSave(activeRegion);
  };

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
        flexdirection="row"
        justifycontent="center"
        style={{ display: 'flex', justify: 'center' }}
      >
        <button style={{ margin: '4px' }} onClick={playAudio}>
          Play / Pause
        </button>
        <button style={{ margin: '4px' }} onClick={onDelete}>
          Delete clip
        </button>
        {activeRegion && (
          <>
            <button style={{ margin: '4px' }} onClick={playClip}>
              Play region
            </button>
            <button style={{ margin: '4px' }} onClick={deleteClip}>
              Delete region
            </button>
            {onRegionSave && (
              <button style={{ margin: '4px' }} onClick={saveRegion}>
                Create new clip from region
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Waveform;
