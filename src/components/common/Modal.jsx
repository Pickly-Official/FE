function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}

          <button type="button" className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;