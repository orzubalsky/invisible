import { useRef } from 'react'
import ReactPlayer from 'react-player'


export const Player = ({ onEnded, onPause, onReady, url }) => {
  const playerRef = useRef(null)

  return (
    <div style={{ display: 'none' }}>
      <ReactPlayer
        ref={playerRef}
        onEnded={onEnded}
        onReady={onReady}
        onPause={onPause}
        url={url}
      />
    </div>
  )
}

export default Player
