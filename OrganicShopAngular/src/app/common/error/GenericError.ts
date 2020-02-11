import { ErrorHandler } from "@angular/core";

 export class GenericError implements ErrorHandler{

    handleError(error)
    {
      console.log(error);   
    }
 }