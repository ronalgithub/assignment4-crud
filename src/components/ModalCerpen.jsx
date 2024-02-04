import React from 'react'
import { AddCerpen } from './AddCerpen'

export const ModalCerpen = () => {
  return (
    <>
     <dialog id="modalAddCerpen" className="modal">
        <div className="modal-box lg:max-w-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <form method="dialog">
              <AddCerpen />
            </form>
          </div>
        </div>
      </dialog>
    </>
  )

}

