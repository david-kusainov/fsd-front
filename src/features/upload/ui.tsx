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
  const { loading, error } = useSelector((state: RootState) => state.userImage)
  const dispatch: AppDispatch = useDispatch()

  return (
    <div style={{paddingBottom: '20px'}}>
      <ImgCrop rotationSlider showReset>
        <Upload
          customRequest={ async (options) => {
            const { file, onSuccess, onProgress, onError } = options
            try {
              await dispatch(uploadUserImage({ userId, file: file as File })).unwrap()
              onProgress?.({ percent: 100 })
              onSuccess?.({
                message: notification.success({ message: 'Файл успешно загружен!' }),
              })
            } catch (e) {
              onProgress?.({ percent: 100 })
              console.error(error)
              onError?.({
                name: 'error',
                message: 'Ошибка загрузки файла',
              })
            }
          }}
          disabled={loading}
          showUploadList={false}
        >
          <AntdButton loading={loading}>
            Загрузить
          </AntdButton>
        </Upload>
      </ImgCrop>
    </div>
  )
}
