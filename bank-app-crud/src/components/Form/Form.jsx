import React from 'react'
import styles from './form.css'

function Form({ openForm, setOpenForm }) {
  const generateShortId = (length) => {
    return [...Array(length)]
      .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+'[Math.floor(Math.random() * 76)])
      .join('');
  }
  const randomShortId = generateShortId(8);
  console.log(document.querySelector(`#${openForm.id}`))
  function setRevisionDate() {
    const issueDate = new Date(document.getElementById('issueDate').value);
    const revisionDate = new Date(issueDate);
    revisionDate.setFullYear(issueDate.getFullYear() + 1);
    document.getElementById('revisionDate').value = revisionDate.toLocaleString().split(',')[0];
  }

  return (
    <section className='formWrapper'>
      <form className="register" action="">
        <label htmlFor="register">
          Formulario de Registro
        </label>
        <span className="inputWrap">
          <input className="productField" required placeholder="ID" disabled value={openForm ? openForm.id : randomShortId}/>
          <input className="productField" required placeholder="Name" />
        </span>
        <span className="inputWrap">
          <input className="productField" required placeholder="Descripcion" />
          <input className="productField" required placeholder="Logo" />
        </span>
        <span className="inputWrap">
          <input type="date" id='issueDate' onChange={setRevisionDate} className="productField" required placeholder="Fecha de Liberacion" />
          <input disabled type="date " id='revisionDate' className="productField" required placeholder="Fecha Revision" />
        </span>
        <span className='btnWrap'>
        <button id="restart" className="formBtn" type="submit" >
          Reiniciar
        </button>
        <button id="send" className="formBtn" type="submit" >
          Enviar
        </button>
        </span>
      </form>

    </section>
  )
}

export default Form