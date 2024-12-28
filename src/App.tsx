import { Theme } from '@radix-ui/themes'
import './App.css'
import ControlledSpinWheel from './components/SpinWheel/ControlledSpinWheel'
import "@radix-ui/themes/styles.css";

function App() {

  return (
    <Theme>
      <ControlledSpinWheel />
    </Theme>
  )
}

export default App
