Audio Editor Proof of Concept

### Key Features:

- [x] Audio recording
- [x] Audio upload from local files
- [ ] Audio trim
- [ ] Concat audios
- [x] Create audio clips (regions)
- [ ] Change audio parts order
- [x] Preview current audio state
- [ ] Change playback speed

### Info:

cuadno
Audio MIME types:

```
"audio/mpeg"
"audio/mpeg3"
"audio/x-mpeg-3"
"audio/x-wav"
"audio/x-wav"
"audio/ogg"
```

### Caveats:

- Regions disappears when new audio is recorded (It may be related to state handling and Waveform component re render)

### Roadmap:

- [ ] Normalize audio formats when user uploads files
- [ ] Handle audio trim with backend

### Links / References:

- [https://tabsoverspaces.in/posts/create-a-audio-player-in-nextjs/](https://tabsoverspaces.in/posts/create-a-audio-player-in-nextjs/)
- [https://ffmpeg.org/](https://ffmpeg.org/)
