import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth-service";
import { catchError, map, of } from "rxjs";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router); // On interroge le backend via le service –

  // On doit renvoyer true ou false
  return auth.profil().pipe(
    map(() => true), // ✅ connecté → on laisse passer
    catchError(() => {
      router.navigate(['/login']); // ❌ non connecté → on redirige
      return of(false); // et on bloque l'accès
    })
  );
};
