import React from 'react'

import { close as closeIcon } from '../../utils/icons'
import './Modal.css'

const Modal = (props) => {
  // init props
  const { show, close, title, children } = props

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className='modal-content'>
        <button className='modal-close' onClick={close}>
          <img src={closeIcon} alt='' />
        </button>
        <h2 className='modal-heading'>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
