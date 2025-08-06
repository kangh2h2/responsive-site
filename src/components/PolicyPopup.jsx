import React, { useState } from 'react';
import './PolicyPopup.css';

function PolicyPopup({ onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`popup-overlay${closing ? ' closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`popup policy ${closing ? ' closing' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <h3>개인정보처리방침</h3>
        <div className="policy-content scroll-container">
          입력하신 개인정보는 채용 진행을 위한 용도로만 사용되며,
          목적 달성 후 즉시 파기됩니다.
        </div>
        <button className="close-btn" onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
}

export default PolicyPopup;