import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
`
const Left = styled.div`
  height: 100%;
`
const Right = styled.div`
  height: 100%;
`

export default function UserProfile({ left, right, ...props }) {
  return (
    <Wrapper {...props}>
      <Left>
        {left}
      </Left>
      <Right>
        {right}
      </Right>
    </Wrapper>
  )
}