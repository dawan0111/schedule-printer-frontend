import React from 'react'
import styled from 'styled-components'
import { List, Card, CardTitle, CardBody } from '../styles/ui'
import useHistory from '../hooks/useHistory'

const Wrapper = styled(Card)`
  padding: 1rem;
`

const RankingTable = styled.table`
  width: 100%;
  border-spacing: 0;

  th {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #ccc;
  }

  td {
    padding-top: .75em;
    padding-bottom: .75em;
    text-align: center;
  }

  tr td:first-child {
    font-weight: bold;
  }
`

export default function Ranking() {
  const { getRanking, ranking } = useHistory()
  
  React.useEffect(() => {
    getRanking();
  }, [getRanking])
  

  return (
    <Wrapper className="rap">
      <CardTitle>순위</CardTitle>
      <CardBody>
        <RankingTable>
          <thead>
            <tr>
              <th>순위</th>
              <th>학번(이름)</th>
              <th>사용 횟수</th>
            </tr>
          </thead>
          <tbody>
            {ranking.data && ranking.data.map((data, key) => (
              <tr key={data.userId}>
                <td>#{key + 1}</td>
                <td>{data.userId} ({data.userName})</td>
                <td>{data.count}</td>
              </tr>
            ))}
          </tbody>
        </RankingTable>
      </CardBody>
    </Wrapper>
  )
}