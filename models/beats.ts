export interface Cell_state {
  id: string
  isActive: boolean
}

export interface SelectedBeat {
  id: number
  name: string
  cell_states: Cell_state[]
}

export interface CellState {
  id: string
  isActive: boolean
}
