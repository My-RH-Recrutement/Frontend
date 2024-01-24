import { BackendErrorsInterface } from "@app/core/interfaces/backend-errors.interface"
import { AuthResponse } from "@app/core/interfaces/responses/auth-response.interface"

export interface AuthStateInterface {
    user: AuthResponse | null | undefined,
    isLoggedIn: boolean,
    isSubmitting: boolean,
    isLoading: boolean,
    validationErrors: BackendErrorsInterface | null
}