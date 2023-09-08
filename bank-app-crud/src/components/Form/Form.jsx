import React, { useEffect, useState } from 'react'
import './form.css'

const generateShortId = (length) => {
  return [...Array(length)]
    .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+'[Math.floor(Math.random() * 76)])
    .join('');
};

const today = new Date().toISOString().split("T")[0];


function Form({ openForm, handleOpenForm, onSave, onGoBack }) {
  const [data, setData] = useState({ id: generateShortId(8), name: '', description: '', logo: '', date_release: '', date_revision: '' });

  useEffect(() => {
    if (!openForm.product) return;

    const date_release = new Date(openForm.product.date_release).toISOString().split("T")[0];
    const date_revision = new Date(openForm.product.date_revision).toISOString().split("T")[0];
    setData({
      ...openForm.product,
      date_release,
      date_revision
    });

  }, [openForm]);

  function setRevisionDate(event) {
    const issueDate = new Date(event.target.value);
    const revisionDate = new Date(issueDate);
    revisionDate.setFullYear(issueDate.getFullYear() + 1);
    setData({ 
      ...data, 
      date_release: issueDate.toISOString().split("T")[0], 
      date_revision: revisionDate.toISOString().split("T")[0] 
    });
  }

  const handleChange = (field) => {
    return (event) => setData({
      ...data,
      [field]: event.target.value
    });
  };

  return (
    <section className='formWrapper'>
      <form className="register" >
        <label htmlFor="register">
          Formulario de Registro
        </label>
        <span className="inputWrap">
          <input className="productField" required placeholder="ID" disabled defaultValue={data.id} />
          <input className="productField" required placeholder="Name" minLength="5" maxLength="100" value={data.name} onChange={handleChange('name')} />
        </span>
        <span className="inputWrap">
          <input className="productField" required placeholder="Descripcion" minLength="10" maxLength="200" value={data.description} onChange={handleChange('description')} />
          <input className="productField" required placeholder="Logo" value={data.logo} onChange={handleChange('logo')} />
        </span>
        <span className="inputWrap">
          <input type="date" onChange={setRevisionDate} className="productField" required placeholder="Fecha de Liberacion" min={today} value={data.date_release} />
          <input disabled type="date " id='revisionDate' className="productField" required placeholder="Fecha Revision" defaultValue={data.date_revision} />
        </span>
        <span className='btnWrap'>
          <button id="restart" className="formBtn" onClick={onGoBack}>
            Reiniciar
          </button>
          <button id="send" className="formBtn" onClick={() => onSave(data)}>
            Enviar
          </button>
        </span>
      </form>
    </section>
  );
}

export default Form