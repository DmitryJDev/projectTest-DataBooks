import { AbstractControl } from "@angular/forms";
export class myValidators{

    static textValidator(control: AbstractControl): { [key: string]: any }|null {
        let pattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
        let value = control.value;
        let result = pattern.test(value);

        if (result) {
            return null
        } else {
            return {'textValidator':{value} }            
        }        
    }

    static thirdNameValidator(control: AbstractControl): { [key: string]: any }|null {
        let pattern = /^[a-zA-Zа-яА-ЯёЁ]*$/;
        let value = control.value;
        let result = pattern.test(value);

        if (result) {
            return null
        } else {
            return {'textValidator':{value} }            
        }       
    }

    static birthDayValidator(control: AbstractControl): { [key: string]: any }|null {
        let pattern =/^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(17|18|19|20)\d{2}$/;
        let value = control.value;
        let result = pattern.test(value);

        if (result) {
            return null
        } else {
            return {'birthDayValidator':{value} }            
        }
        
    }

     static strValidator(control: AbstractControl): { [key: string]: any }|null {
        let pattern =/[0-9]+/;
        let value = control.value;
        let result = pattern.test(value);
         
        if (result) {
            return null
        } else {
            return {'strValidator':{value} }            
        }        
    }
}


