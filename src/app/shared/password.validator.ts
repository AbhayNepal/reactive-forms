import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export function passwordValidator(control:FormGroup):{[key:string]:boolean}|null{
    const password = control.controls?.['password']
    const confirmPassword = control.controls?.['confirmPassword']
    if(password.pristine || confirmPassword.pristine ||password.value=='' || confirmPassword.value==''){
        return null;
    }
    return  password && confirmPassword && password.value !== confirmPassword.value?{'misMatch':true}:
    null;
}