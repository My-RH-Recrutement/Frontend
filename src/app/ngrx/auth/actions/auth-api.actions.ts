import { BackendErrorsInterface } from "@app/core/interfaces/backend-errors.interface";
import { AuthResponse } from "@app/core/interfaces/responses/auth-response.interface";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const authApiActions = createActionGroup({
    source: "Auth Api",
    events: {
        registerSuccess: props<AuthResponse>(),
        registerFailure: props<{ errors: BackendErrorsInterface }>(),
        loginSuccess: props<AuthResponse>(),
        loginFailure: props<{ errors: BackendErrorsInterface }>(),
        logoutSuccess: props<{ message: string }>(),
        logoutFailure: props<{ message: string }>()
    }
})