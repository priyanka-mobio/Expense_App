import styled from "styled-components"
import HomeComponent from "./modules/home"

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:30px 0 10px;
`
const Header = styled.span`
  color:black;
  font-size:20px;
  font-weight:bold;
`

function App() {
  return (
    <Container> 

        <Header> Expense App </Header>
        <HomeComponent />
    </Container>
  );
}

export default App;
