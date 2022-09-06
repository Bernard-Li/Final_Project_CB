import { ImageSlideData } from "./ExampleImages"
import { useState } from "react"
import styled from "styled-components";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";

const ImageSliderBar = ({ slides }) => {

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  //Making sure that the data comes in the form of an array, incase of changes to sample images 
  if(!Array.isArray(slides) || slides.length <= 0){
    return null;
  }
  //The two functions will cycle through the array depending on the max number of images in slides
  const nextSlide = () => {
    setCurrent(current === length-1 ? 0 : current+1);
  }
  const prevSlide = () => {
    setCurrent(current === 0  ? length-1 : current-1);
  }

  console.log(current)
  return (
    <Wrapper>
    <span> {`Click on the arrow to preview app`}</span>
    <div className="left-right-arrows" >
    {/* <GoArrowLeft size={50} onClick={prevSlide} /> */}
    <MdDoubleArrow size={42} className="right-arrow" onClick={nextSlide} />
    </div>
      {ImageSlideData.map((slide, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
          { index === current && 
          <ImagePreviewContainer>
            <img className='img-preview' src={ slide.image } alt='example import' />
            <p className='subtitle-p'>Previewing: { slide.subtitle }</p>
          </ImagePreviewContainer> 
          }
          </div>
        )  
      })}
    </Wrapper>
  )
}

export default ImageSliderBar;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 65px;
.left-arrow {
  height: 50px;
  width: 50px;
}

.img-preview {
  height: auto;
  width: 600px;
  border-radius: 10px;
  border: 4px solid var(--color-font-color);
  margin: 10px;

  @media screen and (max-width: 450px) {
    width: 300px;
  }
}
`
const ImagePreviewContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`