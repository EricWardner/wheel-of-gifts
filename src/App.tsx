import { Flex } from '@radix-ui/themes'
import ControlledSpinWheel from './components/SpinWheel/ControlledSpinWheel'

function App() {

  return (
    <Flex justify={"center"} p={{ initial: "8", sm:"8" }}>
      <ControlledSpinWheel />
    </Flex>
  )
}

export default App
