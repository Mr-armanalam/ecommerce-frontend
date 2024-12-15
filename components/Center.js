import styled from "styled-components"

// max-width: 900px;

const StyledDiv = styled.div `
  margin: 0 auto;
  padding: 0 20px;
`;

const Center = ({children}) => {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Center