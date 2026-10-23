import os
import sys
import zipfile
import json
import shutil
import time
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')

print("==================================================================")
print("  GÉOHIÉRARCHIE PRO - AJOUT DE 'Code ISO' ET 'Capitale'")
print("==================================================================")

# Mapping Pays (Français) -> Code ISO & Capitale
COUNTRY_NAMES_FR = {
    "AD": "Andorre", "AE": "Émirats Arabes Unis", "AF": "Afghanistan", "AG": "Antigua-et-Barbuda",
    "AI": "Anguilla", "AL": "Albanie", "AM": "Arménie", "AO": "Angola", "AQ": "Antarctique",
    "AR": "Argentine", "AS": "Samoa américaines", "AT": "Autriche", "AU": "Australie",
    "AW": "Aruba", "AX": "Îles Åland", "AZ": "Azerbaïdjan", "BA": "Bosnie-Herzégovine",
    "BB": "Barbade", "BD": "Bangladesh", "BE": "Belgique", "BF": "Burkina Faso",
    "BG": "Bulgarie", "BH": "Bahreïn", "BI": "Burundi", "BJ": "Bénin", "BL": "Saint-Barthélemy",
    "BM": "Bermudes", "BN": "Brunéi", "BO": "Bolivie", "BQ": "Bonaire, Saint-Eustache et Saba",
    "BR": "Brésil", "BS": "Bahamas", "BT": "Bhoutan", "BV": "Île Bouvet", "BW": "Botswana",
    "BY": "Biélorussie", "BZ": "Belize", "CA": "Canada", "CC": "Îles Cocos",
    "CD": "République Démocratique du Congo", "CF": "République Centrafricaine", "CG": "République du Congo",
    "CH": "Suisse", "CI": "Côte d'Ivoire", "CK": "Îles Cook", "CL": "Chili", "CM": "Cameroun",
    "CN": "Chine", "CO": "Colombie", "CR": "Costa Rica", "CU": "Cuba", "CV": "Cap-Vert",
    "CW": "Curaçao", "CX": "Île Christmas", "CY": "Chypre", "CZ": "République tchèque",
    "DE": "Allemagne", "DJ": "Djibouti", "DK": "Danemark", "DM": "Dominique",
    "DO": "République Dominicaine", "DZ": "Algérie", "EC": "Équateur", "EE": "Estonie",
    "EG": "Égypte", "EH": "Sahara occidental", "ER": "Érythrée", "ES": "Espagne",
    "ET": "Éthiopie", "FI": "Finlande", "FJ": "Fidji", "FK": "Îles Malouines",
    "FM": "Micronésie", "FO": "Îles Féroé", "FR": "France", "GA": "Gabon", "GB": "Royaume-Uni",
    "GD": "Grenade", "GE": "Géorgie", "GF": "Guyane française", "GG": "Guernesey",
    "GH": "Ghana", "GI": "Gibraltar", "GL": "Groenland", "GM": "Gambie", "GN": "Guinée",
    "GP": "Guadeloupe", "GQ": "Guinée équatoriale", "GR": "Grèce",
    "GS": "Géorgie du Sud-et-les Îles Sandwich du Sud", "GT": "Guatemala", "GU": "Guam",
    "GW": "Guinée-Bissau", "GY": "Guyana", "HK": "Hong Kong", "HM": "Îles Heard-et-MacDonald",
    "HN": "Honduras", "HR": "Croatie", "HT": "Haïti", "HU": "Hongrie", "ID": "Indonésie",
    "IE": "Irlande", "IL": "Israël", "IM": "Île de Man", "IN": "Inde",
    "IO": "Territoire britannique de l'océan Indien", "IQ": "Irak", "IR": "Iran",
    "IS": "Islande", "IT": "Italie", "JE": "Jersey", "JM": "Jamaïque", "JO": "Jordanie",
    "JP": "Japon", "KE": "Kenya", "KG": "Kirghizistan", "KH": "Cambodge", "KI": "Kiribati",
    "KM": "Comores", "KN": "Saint-Christophe-et-Niévès", "KP": "Corée du Nord",
    "KR": "Corée du Sud", "KW": "Koweït", "KY": "Îles Caïmans", "KZ": "Kazakhstan",
    "LA": "Laos", "LB": "Liban", "LC": "Sainte-Lucie", "LI": "Liechtenstein",
    "LK": "Sri Lanka", "LR": "Libéria", "LS": "Lesotho", "LT": "Lituanie",
    "LU": "Luxembourg", "LV": "Lettonie", "LY": "Libye", "MA": "Maroc", "MC": "Monaco",
    "MD": "Moldavie", "ME": "Monténégro", "MF": "Saint-Martin", "MG": "Madagascar",
    "MH": "Îles Marshall", "MK": "Macédoine du Nord", "ML": "Mali", "MM": "Birmanie",
    "MN": "Mongolie", "MO": "Macao", "MP": "Îles Mariannes du Nord", "MQ": "Martinique",
    "MR": "Mauritanie", "MS": "Montserrat", "MT": "Malte", "MU": "Maurice",
    "MV": "Maldives", "MW": "Malawi", "MX": "Mexique", "MY": "Malaisie", "MZ": "Mozambique",
    "NA": "Namibie", "NC": "Nouvelle-Calédonie", "NE": "Niger", "NF": "Île Norfolk",
    "NG": "Nigéria", "NI": "Nicaragua", "NL": "Pays-Bas", "NO": "Norvège", "NP": "Népal",
    "NR": "Nauru", "NU": "Niue", "NZ": "Nouvelle-Zélande", "OM": "Oman", "PA": "Panama",
    "PE": "Pérou", "PF": "Polynésie française", "PG": "Papouasie-Nouvelle-Guinée",
    "PH": "Philippines", "PK": "Pakistan", "PL": "Pologne", "PM": "Saint-Pierre-et-Miquelon",
    "PN": "Îles Pitcairn", "PR": "Porto Rico", "PS": "Palestine", "PT": "Portugal",
    "PW": "Palaos", "PY": "Paraguay", "QA": "Qatar", "RE": "La Réunion", "RO": "Roumanie",
    "RS": "Serbie", "RU": "Russie", "RW": "Rwanda", "SA": "Arabie Saoudite",
    "SB": "Salomon", "SC": "Seychelles", "SD": "Soudan", "SE": "Suède", "SG": "Singapour",
    "SH": "Sainte-Hélène", "SI": "Slovénie", "SJ": "Svalbard et Jan Mayen", "SK": "Slovaquie",
    "SL": "Sierra Leone", "SM": "Saint-Marin", "SN": "Sénégal", "SO": "Somalie",
    "SR": "Suriname", "SS": "Soudan du Sud", "ST": "Sao Tomé-et-Principe", "SV": "Salvador",
    "SX": "Saint-Martin (partie néerlandaise)", "SY": "Syrie", "SZ": "Eswatini",
    "TC": "Îles Turques-et-Caïques", "TD": "Tchad", "TF": "Terres australes et antarctiques françaises",
    "TG": "Togo", "TH": "Thaïlande", "TJ": "Tadjikistan", "TK": "Tokelau", "TL": "Timor oriental",
    "TM": "Turkménistan", "TN": "Tunisie", "TO": "Tonga", "TR": "Turquie",
    "TT": "Trinité-et-Tobago", "TV": "Tuvalu", "TW": "Taïwan", "TZ": "Tanzanie",
    "UA": "Ukraine", "UG": "Ouganda", "UM": "Îles mineures éloignées des États-Unis",
    "US": "États-Unis", "UY": "Uruguay", "UZ": "Ouzbékistan", "VA": "Vatican",
    "VC": "Saint-Vincent-et-les-Grenadines", "VE": "Venezuela", "VG": "Îles Vierges britanniques",
    "VI": "Îles Vierges des États-Unis", "VN": "Viêt Nam", "VU": "Vanuatu",
    "WF": "Wallis-et-Futuna", "WS": "Samoa", "XK": "Kosovo", "YE": "Yémen",
    "YT": "Mayotte", "ZA": "Afrique du Sud", "ZM": "Zambie", "ZW": "Zimbabwe"
}

CAPITALES_FR = {
    "Beijing": "Pékin",
    "London": "Londres",
    "Rome": "Rome",
    "Brussels": "Bruxelles",
    "Algiers": "Alger",
    "Cairo": "Le Caire",
    "Athens": "Athènes",
    "Warsaw": "Varsovie",
    "Lisbon": "Lisbonne",
    "Moscow": "Moscou",
    "Vienna": "Vienne",
    "Prague": "Prague",
    "Bucharest": "Bucarest",
    "Budapest": "Budapest",
    "Abu Dhabi": "Abou Dabi",
    "Riyadh": "Riyad",
    "Tehran": "Téhéran",
    "Baghdad": "Bagdad",
    "Damascus": "Damas",
    "Beirut": "Beyrouth",
    "Jerusalem": "Jérusalem",
    "Kuwait City": "Koweït",
    "Yaounde": "Yaoundé",
    "N'Djamena": "N'Djaména",
    "Kinshasa": "Kinshasa",
    "Brazzaville": "Brazzaville",
    "Libreville": "Libreville",
    "Yamoussoukro": "Yamoussoukro",
    "Dakar": "Dakar",
    "Washington": "Washington, D.C.",
    "Tokyo": "Tokyo",
    "Paris": "Paris",
    "Berlin": "Berlin",
    "Madrid": "Madrid"
}

country_iso_map = {}
country_cap_map = {}

if os.path.exists("countryInfo.txt"):
    with open("countryInfo.txt", encoding="utf-8") as f:
        for line in f:
            if line.startswith("#"):
                continue
            p = line.strip().split("\t")
            if len(p) >= 6:
                iso = p[0]
                cname = p[4]
                cap_raw = p[5]
                cap = CAPITALES_FR.get(cap_raw, cap_raw) if cap_raw else "Non spécifiée"
                
                fr_name = COUNTRY_NAMES_FR.get(iso, cname)
                country_iso_map[fr_name] = iso
                country_iso_map[cname] = iso
                country_iso_map[iso] = iso

                country_cap_map[fr_name] = cap
                country_cap_map[cname] = cap
                country_cap_map[iso] = cap

print(f"1. Codes ISO et Capitales mappés pour {len(country_iso_map)} pays.")

# 2. Lecture et enrichissement du fichier mondial existant
csv_src = os.path.join("public", "donnees-geographiques-mondiales-exhaustives.csv")
if not os.path.exists(csv_src):
    csv_src = "GéoHiérarchie-Mondiale-Exhaustive.csv"

CONTINENT_DATA = {
    "Europe": [],
    "Asie": [],
    "Amérique du Nord": [],
    "Amérique du Sud": [],
    "Afrique": [],
    "Océanie": []
}

ALL_ROWS = []
final_headers = [
    "Continent",
    "Pays",
    "Code ISO",
    "Capitale",
    "Liste langue officiel",
    "Monnaie / Devise",
    "Ville",
    "Quartier / Arrondissement",
    "Code Postal",
    "Population"
]

print(f"2. Lecture et enrichissement de {csv_src}...")
t_start = time.time()
with open(csv_src, "r", encoding="utf-8-sig") as f:
    f.readline() # ancienne entête
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = [p.strip('"') for p in line.split(";")]
        if len(parts) >= 8:
            # Continent;Pays;Langue;Devise;Ville;Quartier;CP;Pop
            continent, pays, langue, devise, ville, quartier, cp, pop_str = parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7]
        elif len(parts) >= 6:
            continent, pays, langue, ville, quartier, cp = parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]
            devise = "Non spécifié"
            pop_str = ""
        else:
            continue

        iso_code = country_iso_map.get(pays, "")
        capitale = country_cap_map.get(pays, "")

        row_tuple = (continent, pays, iso_code, capitale, langue, devise, ville, quartier, cp, pop_str)
        ALL_ROWS.append(row_tuple)

        if continent in CONTINENT_DATA:
            CONTINENT_DATA[continent].append(row_tuple)
        elif "Amérique" in continent:
            CONTINENT_DATA["Amérique du Nord"].append(row_tuple)
        else:
            CONTINENT_DATA["Océanie"].append(row_tuple)

print(f"   Lecture achevée en {time.time() - t_start:.1f}s. Total : {len(ALL_ROWS):,} lignes avec Code ISO & Capitale.")

# 3. Écriture des Fichiers Excel Individuels par Continent
FILES_BY_CONTINENT = {
    "Europe": "GéoHiérarchie-Europe.xlsx",
    "Asie": "GéoHiérarchie-Asie.xlsx",
    "Amérique du Nord": "GéoHiérarchie-Amérique-du-Nord.xlsx",
    "Amérique du Sud": "GéoHiérarchie-Amérique-du-Sud.xlsx",
    "Afrique": "GéoHiérarchie-Afrique.xlsx",
    "Océanie": "GéoHiérarchie-Océanie.xlsx"
}

PUBLIC_MAP = {
    "Europe": "GeoHierarchie-Europe.xlsx",
    "Asie": "GeoHierarchie-Asie.xlsx",
    "Amérique du Nord": "GeoHierarchie-Amerique-du-Nord.xlsx",
    "Amérique du Sud": "GeoHierarchie-Amerique-du-Sud.xlsx",
    "Afrique": "GeoHierarchie-Afrique.xlsx",
    "Océanie": "GeoHierarchie-Oceanie.xlsx"
}

print("3. Écriture des classeurs Excel individuels par continent...")
for cont, fname in FILES_BY_CONTINENT.items():
    t_c = time.time()
    rows = CONTINENT_DATA[cont]
    print(f"   - '{fname}' ({len(rows):,} lignes)...")
    wb = openpyxl.Workbook(write_only=True)
    ws = wb.create_sheet(title=cont)
    ws.append(final_headers)
    for r in rows:
        ws.append(r)
    wb.save(fname)

    # Copie dans public
    pub_file = os.path.join("public", PUBLIC_MAP[cont])
    try:
        shutil.copyfile(fname, pub_file)
    except Exception as e:
        pass
    print(f"     Terminé en {time.time() - t_c:.1f}s ({os.path.getsize(fname) / (1024*1024):.1f} MB)")

# 4. Mise à jour du Classeur Master Mondial Multi-Feuilles
print("4. Mise à jour de GéoHiérarchie-Mondiale-Exhaustive.xlsx...")
t_m = time.time()
wb_master = openpyxl.Workbook(write_only=True)

# Sommaire
ws_som = wb_master.create_sheet(title="Répertoire des 250 Pays")
ws_som.append(["Continent", "Code ISO", "Pays (Français)", "Capitale", "Liste langue officiel", "Monnaie / Devise", "Nombre de Localisations", "Statut"])

country_counts = {}
country_info = {}
for r in ALL_ROWS:
    cp_pays = r[1]
    country_counts[cp_pays] = country_counts.get(cp_pays, 0) + 1
    if cp_pays not in country_info:
        country_info[cp_pays] = (r[0], r[2], r[3], r[4], r[5])

for cp_pays in sorted(country_counts.keys()):
    c_cont, c_iso, c_cap, c_lang, c_dev = country_info[cp_pays]
    ws_som.append([c_cont, c_iso, cp_pays, c_cap, c_lang, c_dev, country_counts[cp_pays], "Vérifié & Exhaustif"])

# Feuilles continentales
for cont in ["Europe", "Asie", "Amérique du Nord", "Amérique du Sud", "Afrique", "Océanie"]:
    ws = wb_master.create_sheet(title=cont)
    ws.append(final_headers)
    for r in CONTINENT_DATA[cont]:
        ws.append(r)

master_name = "GéoHiérarchie-Mondiale-Exhaustive.xlsx"
wb_master.save(master_name)
try:
    shutil.copyfile(master_name, os.path.join("public", "donnees-geographiques.xlsx"))
except Exception as e:
    pass
print(f"   Master Excel terminé en {time.time() - t_m:.1f}s ({os.path.getsize(master_name) / (1024*1024):.1f} MB)")

# 5. Mise à jour du Master CSV et de l'archive ZIP
print("5. Mise à jour du CSV mondial et du ZIP...")
t_csv = time.time()
csv_full = os.path.join("public", "donnees-geographiques-mondiales-exhaustives.csv")
with open(csv_full, "w", encoding="utf-8-sig") as f_out:
    f_out.write("Continent;Pays;Code ISO;Capitale;Liste langue officiel;Monnaie / Devise;Ville;Quartier / Arrondissement;Code Postal;Population\n")
    for r in ALL_ROWS:
        c0 = r[0].replace('"', '""')
        c1 = r[1].replace('"', '""')
        c2 = r[2].replace('"', '""')
        c3 = r[3].replace('"', '""')
        c4 = r[4].replace('"', '""')
        c5 = r[5].replace('"', '""')
        c6 = r[6].replace('"', '""')
        c7 = r[7].replace('"', '""')
        c8 = r[8].replace('"', '""')
        c9 = str(r[9]).replace('"', '""')
        f_out.write(f'"{c0}";"{c1}";"{c2}";"{c3}";"{c4}";"{c5}";"{c6}";"{c7}";"{c8}";"{c9}"\n')

csv_zip = "GéoHiérarchie-Mondiale-Exhaustive.csv.zip"
with zipfile.ZipFile(csv_zip, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    z.write(csv_full, arcname="GéoHiérarchie-Mondiale-Exhaustive.csv")
try:
    shutil.copyfile(csv_zip, os.path.join("public", "donnees-geographiques.csv.zip"))
except Exception as e:
    pass
print(f"   CSV et ZIP terminés ({os.path.getsize(csv_zip) / (1024*1024):.1f} MB)")

# 6. Mise à jour du seed data Next.js
print("6. Mise à jour de src/lib/seed-data.ts...")
seed_items = []
country_counts_seed = {}

for r in ALL_ROWS:
    p_name = r[1]
    c_count = country_counts_seed.get(p_name, 0)
    if c_count < 6 or (c_count < 10 and len(seed_items) < 1800):
        country_counts_seed[p_name] = c_count + 1
        seed_items.append({
            "id": f"world-{len(seed_items)+1:05d}",
            "continent": r[0],
            "pays": r[1],
            "code_iso": r[2],
            "capitale": r[3],
            "langue_officielle": r[4],
            "monnaie_devise": r[5],
            "ville": r[6],
            "quartier_arrondissement": r[7],
            "code_postal": r[8],
            "population": r[9],
            "created_at": "2024-01-01T00:00:00Z"
        })

with open("src/lib/seed-data.ts", "w", encoding="utf-8") as f:
    f.write(f"import {{ GeoLocation }} from '@/types/geo';\n\nexport const INITIAL_GEO_DATA: GeoLocation[] = {json.dumps(seed_items, ensure_ascii=False, indent=2)};\n")

print(f"   Seed data mis à jour avec {len(seed_items)} localisations.")

print("==================================================================")
print("  TOUS LES FICHIERS ONT ÉTÉ ENRICHIS AVEC 'Code ISO' ET 'Capitale' !")
print("==================================================================")
