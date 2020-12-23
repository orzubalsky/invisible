import clsx from 'clsx'
import WorkChunkUploadContainer from './WorkChunkUploadContainer'
import './WorkChunk.css'


export const WorkChunk = ({ filename, handleSelect, isContributing, isPlaying, isSelected, item }) => {
  if (!item || !item.text) return null

  const className = clsx(
    'WorkChunk',
    filename && 'WorkChunk--uploaded',
    isSelected && 'WorkChunk--selected',
    isContributing && 'WorkChunk--uploading',
    isPlaying && 'WorkChunk--playing'
  )

  const paragraphs = item.text.split('\n')

  return (
    <div className='WorkChunkWrapper'>
      {isSelected && <WorkChunkUploadContainer item={item} />}
      <div className={className} onClick={handleSelect}>
        {item.id}
        {paragraphs.map((text, idx) =><p key={idx}>{text}</p>)}
      </div>
    </div>
  )
}

export default WorkChunk
