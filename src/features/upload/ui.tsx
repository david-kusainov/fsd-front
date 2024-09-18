import { AppDispatch, RootState } from 'app/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadUserImage, userImageSlice } from './model';

interface FileUploadProps {
  userId: string
}

export const FileUpload = ({userId}: FileUploadProps) => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, success } = useSelector((state: RootState) => state.userImage)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Выберите файл для загрузки.')
      return
    }
    dispatch(uploadUserImage({ userId, file: selectedFile }))
  }

  const handleReset = () => {
    setSelectedFile(null)
    dispatch(userImageSlice.actions.resetUploadState())
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading || !selectedFile}>
        {loading ? 'Загрузка...' : 'Загрузить'}
      </button>
      {error && (
        <p style={{ color: 'red' }}>
          Ошибка: {typeof error === 'string' ? error : JSON.stringify(error)}
        </p>
      )}
      {success && <p style={{ color: 'green' }}>Файл успешно загружен!</p>}
      <button onClick={handleReset}>Сбросить</button>
    </div>
  )
}
