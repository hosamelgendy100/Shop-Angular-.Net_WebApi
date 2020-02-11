import { GenericError } from "./GenericError";

export class NotFound404 extends GenericError{

    constructor(error){
        super();
        console.log(error);
    }

}