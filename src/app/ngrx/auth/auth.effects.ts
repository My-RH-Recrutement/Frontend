import { InjectionToken, inject } from "@angular/core";
import { AuthService } from "@app/shared/services/auth/auth.service";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { authPageActions } from "./actions/auth-page.actions";
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { authApiActions } from "./actions/auth-api.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "@app/shared/services/persistance.service";
import { AuthResponse } from "@app/core/interfaces/responses/auth-response.interface";
import { Router } from "@angular/router";
import { Access } from "@app/core/enums/access";

/**
 * Register Effect
 *
 * This effect handles the registration process by intercepting the 'register' action,
 * calling the 'register' method from the AuthService, and dispatching corresponding
 * actions based on the outcome either {@link authApiActions.registerSuccess} or {@link authApiActions.registerFailure}.
 *
 * @param actions$ - The stream of actions in the application.
 * @param authService - The injected AuthService responsible for authentication.
 * @param persistanceService - The injected PersistanceService responsible for handling localstorage persistence.
 * @returns An observable of actions representing the registration process.
 */
export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
) => {
    return actions$.pipe(
        ofType(authPageActions.register),
        concatMap(action => 
            authService.register(action).pipe(
                map((user: AuthResponse) => {
                    persistanceService.set("access", user);
                    return authApiActions.registerSuccess(user)
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        authApiActions.registerFailure({ 
                            errors: errorResponse.error
                        }))
                })
            )
            )
    )
}, {functional: true});


/**
 * Login Effect
 *
 * This effect handles the login process by intercepting the 'login' action,
 * calling the 'login' method from the AuthService, and dispatching corresponding
 * actions based on the outcome either {@link authApiActions.loginSuccess} or {@link authApiActions.loginFailure}.
 *
 * @param actions$ - The stream of actions in the application.
 * @param persistanceService - The injected PersistanceService responsible for localstorage data persistence.
 * @param authService - The injected AuthService responsible for authentication.
 * @returns An observable of actions representing the login process.
 */
export const loginEffect = createEffect((
    actions$ = inject(Actions), 
    persistanceService = inject(PersistanceService),
    authService = inject(AuthService)
) => {
    return actions$.pipe(
        ofType(authPageActions.login),
        switchMap(action => 
            authService.login(action).pipe(
                map((user: AuthResponse) => {
                    persistanceService.set("access", user);
                    return authApiActions.loginSuccess(user);
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        authApiActions.loginFailure({
                            errors: errorResponse.error
                        })
                        )
                })
            )
        )
    )
}, {functional: true});


/**
 * Logout Effect
 * 
 * This effect handles the signing out process by intercepting the 'Logout' action,
 * calling the 'clear' method from the PersistanceService, and dispatching corresponding
 * actions based on the outcome either {@link authApiActions.logoutSuccess} or {@link authApiActions.logoutFailure}.
 * 
 * @param actions$ - The stream of actions in the application.
 * @param persistanceService - The injected PersistanceService responsible for localstorage data persistence.
 * @returns An observable of actions representing the logout process.
 */
export const logoutEffect = createEffect((
    actions$ = inject(Actions),
    persistanceService = inject(PersistanceService)
) => {
    return actions$.pipe(
        ofType(authPageActions.logout),
        tap((action) => {
            persistanceService.clear("access");
        }),
        map((action) => {
            return authApiActions.logoutSuccess({ message: "Signed Out Successfully!" });
        }),
        catchError(error => {
            return of(authApiActions.logoutFailure({message: "Something Went Wrong!"}));
        })
    );
}, { functional: true })


/**
 * Redirection Effect
 * 
 * this effect handles the process of redirections after a succesfull registration by
 * intercepting the registerSuccess action, and navigate to the appropriate route based
 * on the user's role.
 * 
 * @param actions$ - The stream of actions in the application.
 * @param router - The injected Router service for navigation.
 * @returns An Observable with no dispatched actions (dispatch: false) 
 */
export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authApiActions.registerSuccess),
            tap((action) => {
                if(action.role === Access.RECRUITER) {
                    router.navigateByUrl("/recruiter");
                }else {
                    router.navigateByUrl("/");
                }
            })
        )
    }, {functional: true, dispatch: false}
)