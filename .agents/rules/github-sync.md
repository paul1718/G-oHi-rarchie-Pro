---
trigger: always_on
description: Synchronisation automatique obligatoire avec GitHub à chaque modification
---

# Règle Permanente : Synchronisation Automatique GitHub

Pour tout projet, sous-dossier et nouveau fichier géré avec Git dans ce workspace :
À chaque modification ou création de fichier/dossier :
1. Toujours synchroniser immédiatement avec GitHub :
   - `git add .`
   - `git commit -m "Description concise des changements"`
   - `git push origin main`
2. S'assurer que chaque nouveau dossier et modification soit immédiatement sauvegardé et synchronisé sur le dépôt distant sans attendre.
