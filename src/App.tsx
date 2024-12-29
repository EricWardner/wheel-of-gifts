import { Box, Container, Flex, Section } from '@radix-ui/themes'
import ControlledSpinWheel from './components/SpinWheel/ControlledSpinWheel'

function App() {

  return (
    <Flex justify={"center"}>
      <ControlledSpinWheel />
    </Flex>
  )
}

export default App
