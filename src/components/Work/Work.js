import clsx from 'clsx'
import WorkChunkContainer from './WorkChunkContainer'
import './Work.css'


export const Work = ({ items, isVisible }) => {
  const className = clsx(
    'Work',
    isVisible && 'visible',
  )

  return (
    <div className={className}>
      {items.map((item, idx) => <WorkChunkContainer key={idx} item={item} />)}
    </div>
  )
}

export default Work
