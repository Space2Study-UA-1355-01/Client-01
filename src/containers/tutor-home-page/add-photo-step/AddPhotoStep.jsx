import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import useUpload from '~/hooks/use-upload'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { useStepContext } from '~/context/step-context'

import { validationData } from './constants'
import { style } from './AddPhotoStep.style'

import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { handleStepData, stepData, photoLabel } = useStepContext()
  const { setUnsavedChanges } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)
  const files = useMemo(
    () => stepData[photoLabel]?.data ?? [],
    [stepData, photoLabel]
  )
  const error = stepData[photoLabel]?.errors?.file

  useEffect(() => {
    if (files[0]) {
      const url = URL.createObjectURL(files[0])
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [files])

  const emitter = ({ files: newFiles, error: newError }) => {
    const limitedFiles =
      newFiles.length > 0 ? [newFiles[newFiles.length - 1]] : []
    handleStepData(photoLabel, limitedFiles, newError ? { file: newError } : {})
    setUnsavedChanges(true)
    setNeedConfirmation(true)
  }

  const { dragStart, dragLeave, dragDrop, isDrag, addFiles, deleteFile } =
    useUpload({
      files,
      validationData,
      emitter
    })

  const hasFile = files.length > 0
  const maxMb = validationData.maxFileSize / 1_000_000

  const clearFile = () => {
    if (files[0]) {
      deleteFile(files[0])
      setUnsavedChanges(true)
      setNeedConfirmation(true)
    }
    handleStepData(photoLabel, [], {})
  }

  const handleRootClick = () => {
    inputRef.current?.click()
  }

  const dynamicImgStyle = {
    ...style.imgContainer,
    ...(hasFile && { border: 'none' })
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
          root: dynamicImgStyle,
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
