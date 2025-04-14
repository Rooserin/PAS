import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import styles from '@/components/spotify/SpotifyPlayer.module.css'
import { CiMusicNote1 } from "react-icons/ci";

const SpotifyPlaylist: React.FC = () => (
  <iframe
    style={{ borderRadius: '12px' }}
    src="https://open.spotify.com/embed/playlist/37i9dQZF1E8PnlajhAhC6K?utm_source=generator"
    width="400"
    height="352"
    frameBorder="0"
    allowFullScreen
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);

const SpotifyPlayer: React.FC = () => {
  const nodeRef = useRef<HTMLDivElement>(null!);

  return (
    <Draggable nodeRef={nodeRef} handle=".modal-header">
      <div
        ref={nodeRef}
        className={styles.draggable}
      >
        <div className="modal-header" style={{ cursor: 'move' }}>
          <CiMusicNote1/>
        </div>
        <div className="modal-content">
          <SpotifyPlaylist />
        </div>
      </div>
    </Draggable>
  );
};

export default SpotifyPlayer;
