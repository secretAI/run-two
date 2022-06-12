export interface IAppConstructorConfig {
  port: number; 
  middlewares: Middlewares; 
  routers: Routers; 
  baseUrl: string
}

export type Middlewares = {
  forEach: (arg0: (middleware: any) => void) => void 
}

export type Routers = {
  forEach: (arg0: (router: any) => void) => void
}
