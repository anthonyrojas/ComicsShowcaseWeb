import {
    isEmptyOrNullOrUndefined
} from '../Library/Helpers';
export class Creator {
    id = -1;
    firstName = '';
    lastName = '';
    constructor(config){
        this.firstName = config.firstName;
        this.lastName = config.lastName;
    }
    validate(){
        let errorExists = false;
        let inputErrs = {
            firstName: '',
            lastName: ''
        }
        if(isEmptyOrNullOrUndefined(this.firstName)){
            inputErrs.firstName = 'First name is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.lastName)){
            inputErrs.lastName = 'Last name is required.';
            errorExists = true;
        }
        return{
            errorExists,
            errors: inputErrs
        };
    }
    toJson(){
        return{
            id: this.id > -1 ? this.id : null,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}