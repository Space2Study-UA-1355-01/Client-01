import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

interface UploadPhotoResponse {
  public_id: string
  url: string
}

export const uploadPhotoService = {
  upload: (file: File): Promise<{ data: UploadPhotoResponse }> => {
    const formData = new FormData()
    formData.append('image', file)

    return axiosClient.post(URLs.uploadPhoto.post, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
