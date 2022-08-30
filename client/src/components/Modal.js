import { useState } from "react";
import styled from "styled-components";

const CartModal = (props) => {
  
const [modal, setModal] = useState(false);
console.log(props.openModal);
  const toggleModal = (e) => {
    
      setModal(!modal);
    
    }
  return (
    <>
    {/* <button className="btn-modal" onClick={toggleModal}>remove me, test button</button> */}
    { modal &&
    <ModalDiv>
      <div className="modal"></div>
        <div className="overlay"
          onClick={toggleModal}></div>
        <div className="modal-content">
          <p>This is a modal for individual travel cards</p>
        </div>
        <button className="close-modal"
          onClick={toggleModal}> X </button>
    </ModalDiv>
    }
    <button onClick={toggleModal}>Test Modal</button>
  </>
  )
}

export default CartModal;

const ModalDiv = styled.div`
body.active-modal {
    overflow-y: hidden;
}
.modal, .overlay {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}
.overlay {
  background: rgba(49,49,49,0.8);
}
.modal-content {
  position: absolute;
  color: var(--color-font-color);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: var(--color-main-opal);
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 250px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
}
.btn-modal {
  padding: 10px 20px;
  display: block;
  margin: 100px auto 0;
  font-size: 18px;
}
`