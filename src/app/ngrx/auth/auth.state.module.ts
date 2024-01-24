import { NgModule } from "@angular/core";
import { StoreFeatureModule, StoreModule } from "@ngrx/store";
import { authFeatureKey, authReducer } from "./auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import * as registerEffects from "./auth.effects";

@NgModule({
    imports: [
        StoreModule.forFeature(authFeatureKey, authReducer),
        EffectsModule.forFeature(registerEffects)
    ]
})
export class AuthStateModule {}