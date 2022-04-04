import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg-core/dist/ffmpeg-core.js',
  log: true,
});

export const convertToMp3 = async (file) => {
  const fileFullName = file?.name || 'rawAudio';
  const fileName = file?.name
    ? file.name.slice(0, file.name.length - 4)
    : fileFullName;
  const fileDestName = `${fileName}_converted.mp3`;

  const fileUrl = URL.createObjectURL(file);

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', fileFullName, await fetchFile(fileUrl));

  await ffmpeg.run('-i', fileFullName, '-acodec', 'libmp3lame', fileDestName);

  const data = ffmpeg.FS('readFile', fileDestName);

  return URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }));
};

export const ffmpegConcat = async (audioBlobs) => {
  const audioFiles = audioBlobs.map((blob, idx) => {
    const fileFromBlob = new File([blob], `recordedAudio${idx}.wav`, {
      type: 'audio/wav',
    });
    return fileFromBlob;
  });

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  for (let i = 0; i < audioFiles.length; i++) {
    const fileUrl = URL.createObjectURL(audioFiles[i]);
    ffmpeg.FS('writeFile', audioFiles[i].name, await fetchFile(fileUrl));
  }

  const allFileNames = audioFiles.map((file) => file.name).join('|');

  await ffmpeg.run(
    '-i',
    `concat:${allFileNames}`,
    '-c:a',
    'libmp3lame',
    'mergedAudio.mp3',
  );
  const data = ffmpeg.FS('readFile', 'mergedAudio.mp3');

  return URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }));
};

export const trimAudio = async (blobUrl, options) => {
  const { start, end } = options || {};

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  const startPoint = start;
  const endPoint = end;

  ffmpeg.FS('writeFile', 'audioToTrim.mp3', await fetchFile(blobUrl));

  await ffmpeg.run(
    '-ss',
    `${startPoint}`,
    '-i',
    `audioToTrim.mp3`,
    '-t',
    `${endPoint - startPoint}`,
    'audio_trimmed.mp3',
  );
  const data = ffmpeg.FS('readFile', 'audio_trimmed.mp3');

  return URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' }));
};
