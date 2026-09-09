export interface IStat {
    value: number
    changes: number
}


export interface IStats {
    jobs: IStat
    candidates: IStat
    interviews: Omit<IStat, 'changes'> & {next: string}
    timeToHire: IStat
}