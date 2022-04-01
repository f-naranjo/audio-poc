import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  corePath: '/ffmpeg-core/dist/ffmpeg-core.js',
  log: true,
});

export const convertToMp3 = async (file) => {
  console.log(file);
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
  await ffmpeg.run('-i', fileFullName, fileDestName);
  const data = ffmpeg.FS('readFile', fileDestName);
  return URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }));
};

export const concatAudio = async (audioFiles) => {
  let proms = audioFiles.map(
    (audioFile) =>
      new Promise((resolve) => {
        const fr = new FileReader();
        fr.onloadend = () => resolve(fr.result);
        fr.readAsArrayBuffer(audioFile);
      }),
  );

  const audioFileBuffers = await Promise.all(proms);

  let blob = new Blob(audioFileBuffers);
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
};
