import { Tabs as TabWrapper, TabItem } from '../styles/ui'

export default function Tabs({ tabs, onActive, active, ...props }) {
  return (
    <TabWrapper {...props}>
      {tabs.map(tab => (
        <TabItem
          active={active === tab.id}
          key={tab.id}
          onClick={() => onActive(tab)}
        >{tab.name}</TabItem>
      ))}
    </TabWrapper>
  )
}
