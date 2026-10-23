# Dama e Scacchi · app Android

Ramo con il progetto Android (WebView con i file del gioco in `app/src/main/assets/www`).
Ogni push su questo ramo fa partire GitHub Actions, che pubblica nel ramo `android-dist`:
- `app-release.aab` (non firmato: va firmato con la chiave di caricamento prima di caricarlo su Play Console)
- `app-debug.apk` (per provarla sul telefono)
- `build.log` e `STATUS.txt`
