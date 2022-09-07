import styled from "styled-components";

//Component that will take care of button the button data in a list
const Post = ({ posts, loading}) => {

  if(loading){
    return <h2>Loading...</h2>;
  }

  return (
    <Wrapper>
      <ul className="list-group">
        {
          posts.map((post) => {
            return (
              <div className="card-container">
            <li key={post._id} className="list-item">
            <Button>
              <p>{post.data.destination}</p>
              <p>{post.data.date[0][0] + '-' + post.data.date[0][1]}</p>
            </Button>
            </li>
            </div>
            )
          })
        }
      </ul>
    </Wrapper>
  )
}

export default Post;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 5px;


.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 4px;
}
.list-item {
  margin: 5px;
}`

const Button = styled.button`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 300px;
border: 2px solid var(--color-font-color);
@media screen and (max-width: 480px) {
  max-width: 200px;
}
/* max-width: 65vw;
min-width: 60vw; */
.span-title {
  padding: 5px;
}`