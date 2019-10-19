import { isEmptyOrNullOrUndefined, isEmptyArray, isNullOrUndefined } from "../Library/Helpers";

export class GraphicNovel {
    id = -1;
    title = '';
    isbn = '';
    description = '';
    imageStr = '';
    graphicNovelType = '';
    bookCondition = '';
    publisher = '';
    creators = [];
    constructor(config){
        this.title = config.title;
        this.isbn = config.isbn;
        this.description = config.description;
        this.imageStr = config.imageStr;
        this.graphicNovelType = config.graphicNovelType;
        this.bookCondition = config.bookCondition;
        this.publisher = config.publisher;
        this.creators = config.creators;
    }
    validate(){
        let inputErrs = {
            title: '',
            isbn: '',
            description: '',
            imageStr: '',
            graphicNovelType: '',
            publisher: '',
            creators: ''
        };
        let errorExists = false;
        if(isEmptyOrNullOrUndefined(this.title)){
            inputErrs.title = 'Graphic novel title is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.isbn)){
            inputErrs.isbn = 'Graphic novel ISBN is required';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.description)){
            inputErrs.description = 'Graphic novel description is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.graphicNovelType)){
            inputErrs.graphicNovelType = 'Graphic novel type is required.';
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.bookCondition)){
            inputErrs.bookCondition = 'Graphic novel condition is required.'
            errorExists = true;
        }
        if(isEmptyOrNullOrUndefined(this.publisher)){
            inputErrs.publisher = 'Graphic novel publisher is required.';
            errorExists = true;
        }
        if(isNullOrUndefined(this.creators) || isEmptyArray(this.publisher)){
            inputErrs.creators = 'Graphic novel creators are required.';
            errorExists = true;
        }
        return { errorExists, errors: inputErrs };
    }
    toJson(){
        return {
            id: this.id > -1 ? this.id : undefined,
            title: this.title,
            isbn: this.isbn,
            description: this.description,
            imageStr: this.imageStr,
            graphicNovelType: this.graphicNovelType,
            bookCondition: this.bookCondition,
            publisher: this.publisher,
            creators: this.creators
        }
    }
}