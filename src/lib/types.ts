export type Strategy = {
  label: string;
  shoppingList: BuyOrder[];
}

export type SimulationConfig = {
  games: number;
  strategies: Strategy[];
};

export type Simulation = {
  decks: DeckSim[];
}

export type DeckSim = {
  label: string;
  shoppingList: BuyOrder[];
  summary: {
    turns: TurnSummary[];
  };
};

export type BuyOrder = {
  card: string;
  quantity: number;
};

export type TurnSummary = {
  records: number;
  avgMoney: number;
  avgVpTotal: number;
}

export enum ChartType {
  TotalVP = 1,
  MoneyPerTurn
}
