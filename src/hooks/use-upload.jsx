import { useState } from 'react'
import { filesValidation } from '~/utils/validations/files'

const useUpload = ({ files, validationData, emitter }) => {
  const [isDrag, setIsDrag] = useState(false)

  const dragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
  }
  const dragLeave = (e) => {
    e.preventDefault()
    setIsDrag(false)
  }

  const processFiles = (incomingFiles) => {
    const newFiles = [...incomingFiles, ...files].slice(
      0,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData)
    const result = error ? [] : newFiles
    emitter({ files: result, error })
  }

  const dragDrop = (e) => {
    e.preventDefault()
    setIsDrag(false)
    processFiles(e.dataTransfer.files)
  }
  const addFiles = (e) => {
    e.preventDefault()
    processFiles(e.target.files)
  }

  const deleteFile = (file) => {
    const newFiles = files.filter((item) => item !== file)
    emitter({
      files: newFiles,
      error: filesValidation(newFiles, validationData)
    })
  }

  return {
    dragStart,
    dragLeave,
    dragDrop,
    addFiles,
    deleteFile,
    isDrag
  }
}

export default useUpload
