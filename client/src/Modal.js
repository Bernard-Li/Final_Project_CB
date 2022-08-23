import { useState } from "react";
import styled from "styled-components";

const CartModal = (props) => {
  
  const [modal, setModal] = useState(true);

  const cartItems = props.products;
  console.log(cartItems);
  console.log(Object.values(cartItems))
  const toggleModal = (e) => {
    
    // if(props.isEmpty){
      setModal(!modal);
    // }
  }

  
  
  return (
    <>
    {/* <button className="btn-modal" onClick={toggleModal}>remove me, test button</button> */}
    { 
    <ModalDiv>
      <div className="modal"></div>
        <div className="overlay"
          onClick={toggleModal}></div>
        <div className="modal-content">
          <h2>Your cart contains empty orders</h2>
          <p>Please choose which items you would like to remove</p>
          {
            Object.values(cartItems).map((item) =>{
              return (
                <>
                <p>{item.name}
                <button onClick={() => sessionStorage.removeItem("cart")} >Remove item</button>
                </p>
                </>
              )
            })
          }
        </div>
        <button className="close-modal"
          onClick={toggleModal}> X </button>
    </ModalDiv>
    }
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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.4;
    background: #f1f1f1;
    padding: 14px 28px;
    border-radius: 3px;
    max-width: 800px;
    min-width: 600px;
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