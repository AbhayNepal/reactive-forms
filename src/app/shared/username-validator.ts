import { AbstractControl } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName:RegExp){
    return (control:AbstractControl):{[key:string]:any}|null=>{
        const forbidden = forbiddenName.test(control.value)
        return forbidden?{'forbiddenName':{value:control.value}}:null
    };
}