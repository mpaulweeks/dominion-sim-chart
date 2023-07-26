import { useEffect, useState } from 'react'
import './App.css'
// import { Simulation, LineChart, range } from '@mpaulprojects/dominion-sim-chart';
import { Simulation, LineChart, range } from './lib';

const exampleSim = [{
  label: "BM",
  shoppingList: [
    { card: "province", quantity: -1, },
    { card: "gold", quantity: -1, },
    { card: "silver", quantity: -1, }
  ],
}, {
  label: "Smithy BM",
  shoppingList: [
    { card: "province", quantity: -1, },
    { card: "gold", quantity: -1, },
    { card: "smithy", quantity: 2, },
    { card: "silver", quantity: -1, },
  ],
}, {
  label: "Chapel",
  shoppingList: [
    { card: "chapel", quantity: 1, },
    { card: "province", quantity: -1, },
    { card: "gold", quantity: -1, },
    { card: "silver", quantity: -1, },
  ],
}, {
  label: "Chapel Engine",
  shoppingList: [
    { card: "chapel", quantity: 1, },
    ...range(6).map(() => [
      { card: "festival", quantity: 1, },
      { card: "smithy", quantity: 1, },
    ]).flat(),
    { card: "province", quantity: -1, },
    { card: "silver", quantity: 3, },
  ],
}, {
  label: "Chapel Lab",
  shoppingList: [
    { card: "chapel", quantity: 1, },
    { card: "gold", quantity: 3, },
    { card: "laboratory", quantity: 3, },
    { card: "market", quantity: 1, },
    { card: "gold", quantity: 3, },
    { card: "laboratory", quantity: 2, },
    { card: "market", quantity: 1, },
    { card: "province", quantity: -1, },
    { card: "gold", quantity: -1, },
    { card: "laboratory", quantity: -1, },
    { card: "silver", quantity: 3, },
  ],
}];

function App() {
  const [sim, setSim] = useState<Simulation | undefined>();

  useEffect(() => {
    (async () => {
      const resp = await fetch('http://localhost:3001/sim', {
        method: 'post',
        headers: [
          ['Content-Type', 'application/json']
        ],
        body: JSON.stringify(exampleSim),
      });
      const data: Simulation = await resp.json();
      setSim(data);
    })();
  }, []);

  if (!sim) { return <div>loading...</div>; }
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <LineChart data={sim} />
    </div>
  );
}

export default App
