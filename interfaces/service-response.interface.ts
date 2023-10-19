interface ServiceAPIResponse<T> {
  data?: T;
  request: {
    status: number;
    error?: {
      message: string;
    } 
  };
  headers?: Object;
}
  
export { ServiceAPIResponse }
