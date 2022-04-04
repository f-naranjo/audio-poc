Audio Editor Proof of Concept

### Key Features:

- [x] Audio recording
- [x] Audio upload from local files
- [x] Normalize audio formats when user uploads files
- [x] Audio trim
- [x] Create audio clips (regions)
- [x] Concat audios
- [x] Preview current audio mix

### Info:

- `Waveform` component:
  Handles audio clips preview and region selections.

- In `/utils/audio_utils.js` there are 3 functions that handle all audio transformations:
  - `convertToMp3`: take the audio file and converts it to mp3
  - `ffmpegConcat`: handle audio concat given an array of audio blobs
  - `trimAudio`: trim audio clip given the start point and the end point of the region

### Caveats:

- Not tested with long audio files (>2 mins length).
- Regions disappears when new audio is recorded (It may be related to state handling and Waveform component re render).
- ffmpeg needs a little custom config to work properly (copy `dist` folder from the package into `public` to properly reference it).
- Needs custom next.config.js to handle `sharedArrayBuffer` as seen on [Stackoverflow](https://stackoverflow.com/a/68630724).
- It could be useful to review and refactor `Blob`, `Files` and `ObjectUrl` creation in order to optimize memory and cache.

### Links / References:

- [https://tabsoverspaces.in/posts/create-a-audio-player-in-nextjs/](https://tabsoverspaces.in/posts/create-a-audio-player-in-nextjs/)
- [https://ffmpeg.org/](https://ffmpeg.org/)
- [https://github.com/ffmpegwasm/ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
