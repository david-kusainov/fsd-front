import { AppDispatch, RootState } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';
import { AntdButton } from '@shared/components';
import { notification, Upload } from 'antd';
import { uploadUserImage } from './model';
import ImgCrop from 'antd-img-crop'

interface FileUploadProps {
  userId: string
}

export const FileUpload = ({ userId }: FileUploadProps) => {
  const { loading, error, success } = useSelector((state: RootState) => state.userImage)
  const dispatch: AppDispatch = useDispatch()

  return (
    <div>
      <ImgCrop rotationSlider showReset>
        <Upload
          customRequest={(options) => {
            const { file, onSuccess, onProgress } = options
            dispatch(uploadUserImage({ userId, file: file as File }))
            onProgress?.({ percent: 100 })
            onSuccess?.({
              message: success && notification.success({ message: 'Файл успешно загружен!' }),
            })
            // success && notification.success({ message: 'Файл успешно загружен!' })
            error && notification.error({ message: 'Ошибка загрузки файла', description: JSON.stringify(error) })
          }}
          disabled={loading}
          showUploadList={false}
        >
          <AntdButton>
            {loading ? 'Загрузка...' : 'Загрузить'}
          </AntdButton>
        </Upload>
      </ImgCrop>
    </div>
  )
}
