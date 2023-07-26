import * as rc from 'recharts';
import { Simulation } from "../types";
import { range } from '../util';

const nextColor = (() => {
  let index = -1;
  const palette = [
    {"name":"Imperial red","hex":"f94144","rgb":[249,65,68],"cmyk":[0,74,73,2],"hsb":[359,74,98],"hsl":[359,94,62],"lab":[56,69,41]},
    {"name":"Orange (Crayola)","hex":"f3722c","rgb":[243,114,44],"cmyk":[0,53,82,5],"hsb":[21,82,95],"hsl":[21,89,56],"lab":[63,46,59]},
    {"name":"Carrot orange","hex":"f8961e","rgb":[248,150,30],"cmyk":[0,40,88,3],"hsb":[33,88,97],"hsl":[33,94,55],"lab":[71,29,71]},
    {"name":"Coral","hex":"f9844a","rgb":[249,132,74],"cmyk":[0,47,70,2],"hsb":[20,70,98],"hsl":[20,94,63],"lab":[67,40,50]},
    {"name":"Saffron","hex":"f9c74f","rgb":[249,199,79],"cmyk":[0,20,68,2],"hsb":[42,68,98],"hsl":[42,93,64],"lab":[83,6,64]},
    {"name":"Pistachio","hex":"90be6d","rgb":[144,190,109],"cmyk":[24,0,43,25],"hsb":[94,43,75],"hsl":[94,38,59],"lab":[72,-30,36]},
    {"name":"Zomp","hex":"43aa8b","rgb":[67,170,139],"cmyk":[61,0,18,33],"hsb":[162,61,67],"hsl":[162,43,46],"lab":[63,-37,7]},
    {"name":"Dark cyan","hex":"4d908e","rgb":[77,144,142],"cmyk":[47,0,1,44],"hsb":[178,47,56],"hsl":[178,30,43],"lab":[56,-22,-6]},
    {"name":"Payne's gray","hex":"577590","rgb":[87,117,144],"cmyk":[40,19,0,44],"hsb":[208,40,56],"hsl":[208,25,45],"lab":[48,-4,-18]},
    {"name":"Cerulean","hex":"277da1","rgb":[39,125,161],"cmyk":[76,22,0,37],"hsb":[198,76,63],"hsl":[198,61,39],"lab":[49,-13,-27]}
  ].map(c => `#${c.hex}`);
  return () => {
    index += 1;
    return palette[index % palette.length];
  };
})();

export function LineChart(props: {
  sim: Simulation;
}) {
  const summaries = props.sim.decks.map(d => d.summary);
  const maxTurn = Math.max(...summaries.map(s => s.turns.length));
  const data = range(maxTurn).map(i => {
    const deckDatas = props.sim.decks.map(d => {
      return {
        [`${d.label} Money`]: d.summary.turns[i]?.avgMoney,
        [`${d.label} VP`]: d.summary.turns[i]?.avgVpTotal, // todo 2nd graph?
      };
    });
    return {
      name: `Turn ${i + 1}`,
      ...Object.assign({}, ...deckDatas),
    };
  });
  return (
    <rc.LineChart width={800} height={600} data={data}>
      <rc.CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <rc.XAxis dataKey="name"/>
      <rc.YAxis/>
      <rc.Tooltip />
      <rc.Legend />
      {props.sim.decks.map(d => {
        const key = `${d.label} Money`;
        return (
          <rc.Line key={key} type="monotone" dataKey={key} stroke={nextColor()} />
        );
      })}
    </rc.LineChart>
  );
}
