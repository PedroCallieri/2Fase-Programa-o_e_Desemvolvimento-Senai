import React from 'react'
import './Footer.css';

function Footer(props) {
  return (
    <div>
      <footer>
        <p>Feito por {props.autor}</p>
      </footer>
    </div>
  )
}

export default Footer
