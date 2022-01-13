import styles from './modal.module.scss';

export function Modal ({display, children}) {
  return (
    <>
    {display &&
    <div className={`${styles['modal']}`}>
      <div className={`${styles['modal-dialog']}`}>
        <div className={`${styles['modal-content-container']}`}>
          {children}
        </div>
      </div>
    </div>
    }
    </>
  );
}

export function ModalHeader ({children}) {
  return (
    <h3 className={`${styles['modal-content-header']}`}>{children}</h3>
  );
}

export function ModalButton ({children, onClick, color}) {
  return (
    <button className={`${styles['modal-content-button']} ${styles[color]} ${styles[color]}`} onClick={onClick}>{children}</button>
  );
}

export function handleModal (value, cb) {
  if (value) {
    document.body.style.overflow = null;
    return cb(false);
  }

  document.body.style.overflow = 'hidden';
  return cb(true);
}
