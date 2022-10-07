import { AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmationPasswordValidator(group: AbstractControl): ValidationErrors | null {
    let pass = group.get('password')!.value;
    let confirmationPassword = group.get('confirmPassword')!.value;
    return pass === confirmationPassword ? null : { notSame: true };
}