import { defineStepper } from '@stepperize/react'
import { useState } from 'react'
import { Button } from '~components/ui/button'
import '../main.css'

const { useStepper, Scoped } = defineStepper(
  { id: 'first', title: 'First' },
  { id: 'second', title: 'Second' },
  { id: 'third', title: 'Third' },
  { id: 'last', title: 'Last' },
)

function Welcome() {
  const [selected, setSelected] = useState<boolean>(false)
  const [selection, setSelection] = useState<'none' | 'create' | 'import'>('none')
  if (selected === false) {
    return (
      <div className="flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md w-[400px]">
        <Button onClick={() => { setSelection('create'); setSelected(true) }}>Import an existing wallet</Button>
        <Button onClick={() => { setSelection('import'); setSelected(true) }}>Import an existing wallet</Button>
      </div>)
  }
  if (selection === 'create') {
    return (
      <div className="flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md w-[400px]">
        <CreateWallet />
      </div>
    )
  }
  // if (selection === 'import') {
  //   return (
  //     <div className="flex flex-col gap-4 bg-gray-3 p-4 my-4 rounded-md w-[400px]">
  //       <ImportWallet />
  //     </div>
  //   )
  // }
}

export default Welcome
