import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import useUpload from '~/hooks/use-upload'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'

import { validationData } from './constants'
import { style } from './AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (files[0]) {
      const url = URL.createObjectURL(files[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [files])

  const emitter = ({ files: newFiles, error: newError }) => {
    setFiles(newFiles)
    setError(newError)
  }

  const { dragStart, dragLeave, dragDrop, isDrag, addFiles } = useUpload({
    files,
    validationData,
    emitter
  })

  const hasFile = files.length > 0
  const maxMb = validationData.maxFileSize / 1_000_000

  const clearFile = () => {
    setFiles([])
    setError('')
  }

  const handleRootClick = () => {
    inputRef.current?.click()
  }

  return (
    <Box sx={style.root}>
      <DragAndDrop
        emitter={emitter}
        initialState={files}
        isDrag={isDrag}
        onClick={handleRootClick}
        onDragLeave={dragLeave}
        onDragStart={dragStart}
        onDrop={dragDrop}
        style={{
          root: style.imgContainer,
          uploadBox: style.uploadBox,
          activeDrag: style.activeDrag
        }}
        validationData={validationData}
      >
        {hasFile ? (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box
              alt={t('becomeTutor.photo.imageAlt')}
              component='img'
              src={preview}
              sx={style.img}
            />
            <Tooltip title='Clear'>
              <IconButton
                aria-label='Clear photo'
                onClick={clearFile}
                size='small'
                sx={style.clearButton}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
        )}
      </DragAndDrop>

      <Box sx={style.rightColumn}>
        <Typography sx={style.description}>
          {t('becomeTutor.photo.description')}
        </Typography>

        <Box sx={style.uploadControl}>
          <Button
            component='label'
            startIcon={<CloudUploadIcon />}
            sx={style.uploadButton}
            variant='outlined'
          >
            {hasFile ? files[0].name : t('becomeTutor.photo.button')}
            <input
              accept={validationData.filesTypes.join(',')}
              hidden
              onChange={addFiles}
              ref={inputRef}
              type='file'
            />
          </Button>
          {hasFile && <CheckCircleIcon color='success' sx={style.checkIcon} />}
        </Box>

        <Typography
          color='text.secondary'
          sx={style.fileSize}
          variant='caption'
        >
          {hasFile
            ? `${(files[0].size / 1_000_000).toFixed(1)} MB (max ${maxMb} MB)`
            : `Max ${maxMb} MB`}
        </Typography>

        {error && (
          <Typography color='error' sx={style.errorText}>
            {t(error)}
          </Typography>
        )}

        <Box sx={style.navButtons}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep
