import {
    isEmptyArray,
    isEmptyOrNullOrUndefined,
    isNullOrUndefined
} from '../Library/Helpers';
export class ComicBook{
    id = -1;
    title = '';
    description = '';
    upc = '';
    fiveDigitId = '';
    imageStr = '';
    publisher = '';
    condition = '';
    creators = [];

    constructor(config){
        this.title = config.title;
        this.description = config.description;
        this.upc = config.upc;
        this.fiveDigitId = config.fiveDigitId;
        this.imageStr = config.imageStr;
        this.publisher = config.publisher;
        this.condition = config.condition;
        this.creators = config.creators;
    }
    validate(){
        let errorExists = false;
        let inputErrs = {
            title: '',
            description: '',
            upc: '',
            fiveDigitId: '',
            publisher: '',
            condition: '',
            creators: ''
        }
        if(isEmptyOrNullOrUndefined(this.title)){
            inputErrs.title = 'Comic book title is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.description)){
            inputErrs.description = 'Comic book description is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.upc)){
            inputErrs.upc = 'Comic book UPC is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.fiveDigitId)){
            inputErrs.fiveDigitId = 'Comic book five digit number is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.publisher)){
            inputErrs.publisher = 'Comic book publisher is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.condition)){
            inputErrs.condition = 'Comic book condition is required.';
            errorExists = true;
        }
        if(isNullOrUndefined(this.creators) || isEmptyArray(this.creators)){
            inputErrs.creators = 'At least one creator is required.';
            errorExists = true;
        }
        return{
            errorExists,
            errors: inputErrs
        }
    }
    toJson(){
        return {
            id: this.id > -1 ? this.id : undefined,
            title: this.title,
            description: this.description,
            upc: this.upc,
            fiveDigitId: this.fiveDigitId,
            imageStr: this.imageStr,
            publisher: this.publisher,
            condition: this.condition,
            creators: this.creators
        }
    }
}