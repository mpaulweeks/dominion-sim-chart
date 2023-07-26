import { useEffect, useState } from 'react'
import './App.css'
import { Simulation } from './lib/types'
import { LineChart } from './lib';
import { range } from './lib/util';

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
    <LineChart sim={sim} />
  );
}

export default App
