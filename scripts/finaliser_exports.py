import os
import sys
import zipfile
import json
import shutil

sys.stdout.reconfigure(encoding='utf-8')

csv_src = os.path.join("public", "donnees-geographiques-mondiales-exhaustives.csv")
if not os.path.exists(csv_src):
    csv_src = "GéoHiérarchie-Mondiale-Exhaustive.csv"

print(f"1. Compression du fichier CSV exhaustif ({csv_src})...")
csv_zip = "GéoHiérarchie-Mondiale-Exhaustive.csv.zip"
with zipfile.ZipFile(csv_zip, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    z.write(csv_src, arcname="GéoHiérarchie-Mondiale-Exhaustive.csv")

shutil.copyfile(csv_zip, os.path.join("public", "donnees-geographiques.csv.zip"))
shutil.copyfile(csv_zip, os.path.join("public", "donnees-geographiques-mondiales-exhaustives.csv.zip"))
print(f"   Archive CSV ZIP créée avec succès : {os.path.getsize(csv_zip) / (1024*1024):.1f} MB")

print("2. Génération de src/lib/seed-data.ts pour la navigation web...")
seed_items = []
country_counts = {}

with open(csv_src, "r", encoding="utf-8-sig") as f:
    headers = f.readline()
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = [p.strip('"') for p in line.split(";")]
        if len(parts) >= 5:
            continent, pays, ville, quartier, cp = parts[0], parts[1], parts[2], parts[3], parts[4]
            c_cnt = country_counts.get(pays, 0)
            if c_cnt < 6 or (c_cnt < 10 and len(seed_items) < 1800):
                country_counts[pays] = c_cnt + 1
                seed_items.append({
                    "id": f"world-{len(seed_items)+1:05d}",
                    "continent": continent,
                    "pays": pays,
                    "ville": ville,
                    "quartier_arrondissement": quartier,
                    "code_postal": cp,
                    "created_at": "2024-01-01T00:00:00Z"
                })

with open("src/lib/seed-data.ts", "w", encoding="utf-8") as f:
    f.write(f"import {{ GeoLocation }} from '@/types/geo';\n\nexport const INITIAL_GEO_DATA: GeoLocation[] = {json.dumps(seed_items, ensure_ascii=False, indent=2)};\n")

print(f"   Seed data mis à jour avec {len(seed_items)} localisations couvrant {len(country_counts)} pays !")

# Tentative de mise à jour sécurisée des copies Excel si déverrouillées
xlsx_master = "GéoHiérarchie-Mondiale-Exhaustive.xlsx"
for target in ["GéoHiérarchie-Mondiale-Complete.xlsx", os.path.join("public", "donnees-geographiques.xlsx")]:
    try:
        shutil.copyfile(xlsx_master, target)
        print(f"   Copié vers {target}")
    except Exception as e:
        print(f"   Note pour {target} : {e}")

print("FINALISATION TERMINÉE AVEC SUCCÈS !")
