export interface Options {
  baseUrl?: string
  eventUrl?: string
  eventsSyncInterval?: number
  pollingInterval?: number
  pollingEnabled?: boolean
  streamEnabled?: boolean
  debug?: boolean
}

export interface Target {
  identifier: string
  name?: string
  attributes?: object
}

export interface FF{
  value?: any;
  flag?: string;
}
