
import './App.css'
import Watch from './Watch';

function App() {
  const numbers=['01','02','03','04']
  

  return (
    <div style={{display:'flex', gap:'20px', flexWrap:'wrap', justifyContent:'center', width:'60vw', marginTop:'20px'}}>
      {numbers.map(number => <Watch number={number} />)}
    </div>
  );
}

export default App;
