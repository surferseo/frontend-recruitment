import React, { useEffect } from 'react'
import { PillData } from './data'
import { Pill } from './Pill'

interface PillsProps {
  pills: PillData[]
  headers: string[] // ids of pills that are toggled on
  toggleHeader: (id: string) => void
}

interface LayoutBreakElement {
  index: string
  type: 'line-break'
}

interface LayoutPillElement {
  index: string
  type: 'pill'
  pill: PillData
}

type LayoutElement = LayoutBreakElement | LayoutPillElement

export function Pills({ pills, headers, toggleHeader }: PillsProps) {
  const containerNode = React.useRef<HTMLDivElement>(null)
  const pillRefs = React.useRef<{ [id: PillData['id']]: HTMLDivElement }>({})

  const [layoutElements, setLayoutElements] = React.useState<LayoutElement[]>(() => {
    return pills.map(pill => ({
      index: pill.id,
      type: 'pill',
      pill: pill,
    }))
  })

  useEffect(() => {
    setLayoutElements(
      pills.map(pill => ({
        index: pill.id,
        type: 'pill',
        pill: pill,
      }))
    )
  }, [pills])

  const setPillRef = (id: PillData['id'], node: HTMLDivElement) => {
    if (node) {
      pillRefs.current[id] = node
    }
  }

  return (
    <div ref={containerNode}>
      {layoutElements.map(el => {
        if (el.type === 'line-break') {
          return <br key={`__${el.type}-${el.index}`} />
        } else {
          return (
            <Pill
              key={el.pill.id}
              header={headers.includes(el.pill.id)}
              onClick={() => {
                toggleHeader(el.pill.id)
              }}
              ref={element => element && setPillRef(el.pill.id, element)}
            >
              {el.pill.value}
            </Pill>
          )
        }
      })}
    </div>
  )
}
