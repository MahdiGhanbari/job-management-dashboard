export interface ITotalItem {
    value: number
    changes: number
}

export interface IDashboard {
    jobs: ITotalItem
    candidates: ITotalItem
    interviews: Omit<ITotalItem, 'changes'>
    timeToHire: ITotalItem
}