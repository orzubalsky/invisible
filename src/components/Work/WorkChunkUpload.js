import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import useFadeIn from 'utils/useFadeIn'
import CloseButton from 'components/CloseButton/CloseButton'
import './WorkChunkUpload.css'


export const WorkChunkUpload = ({ chunkId, handleUpload}) => {
  const [ isVisible, setIsVisible ] = useFadeIn()

  const [ textValue, setTextValue ] = useState('Choose audio file')

  const { register, handleSubmit, errors, watch } = useForm()

  const watchFilenames = watch('recording')

  const handleChange = () => {
    if (!watchFilenames || watchFilenames.length === 0) return null

    setTextValue(watchFilenames[0].name)
  }

  const onSubmit = data => {
    const file = data && data.recording && data.recording.length > 0 && data.recording[0]

    handleUpload(file, chunkId).then(() => {
      window.location.reload()
    })
  }

  const className = clsx(
    'WorkChunkUpload',
    isVisible && 'visible',
  )

  return (
    <div className={className}>
      <div className='desktop'>
        <div className='Upload__helpText'>
          {textValue}
        </div>
        <CloseButton onClick={() => setIsVisible(false)}/>
        <div className='Upload__Form'>
          <form id='upload' onSubmit={handleSubmit(onSubmit)}>
            <input name='recording' type='file' accept="audio/*" ref={register} onChange={handleChange} />
            <input type='submit' value='Upload' />
          </form>
        </div>
        {errors
          ? <div className='Upload__errors'>
              {Object.values(errors).map(error => <p>
                <strong>{error}</strong>
              </p>)}
            </div>
          : null
        }
      </div>
      <div className='tablet'>
        Call +1 877-977-3352 to record page #<span id="chunk_index"></span>
      </div>
    </div>
  )
}

export default WorkChunkUpload
