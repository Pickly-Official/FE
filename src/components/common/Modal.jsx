function Modal({ isOpen, title, children, confirmText = "확인", cancelText = "취소", onConfirm, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-box" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}

          <button type="button" className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">{children}</div>

        <div className="modal-footer">
          <button type="button" className="modal-cancel-button" onClick={onClose}>
            {cancelText}
          </button>

          {onConfirm && (
            <button type="button" className="modal-confirm-button" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;