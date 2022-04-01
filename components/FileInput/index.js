import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const FileInput = ({ onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const validFiles = acceptedFiles.filter((file) =>
      [
        'audio/mpeg',
        'audio/mpeg3',
        'audio/x-mpeg-3',
        'audio/x-wav',
        'audio/x-wav',
        'audio/wav',
        'audio/ogg',
      ].includes(file.type),
    );
    onChange(validFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        height: '200px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        border: '1px dashed black',
        padding: '40px',
        cursor: 'copy',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};
