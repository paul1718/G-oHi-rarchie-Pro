import os
import sys
import zipfile
import json
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

os.makedirs("public", exist_ok=True)
os.makedirs("scripts", exist_ok=True)

# Continents in French
CONTINENT_MAP = {
    "AF": "Afrique",
    "EU": "Europe",
    "AS": "Asie",
    "NA": "Amérique du Nord",
    "SA": "Amérique du Sud",
    "OC": "Océanie",
    "AN": "Antarctique"
}

# Standard French Country Names Mapping for all 250 ISO codes
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

# Specific detailed neighborhoods for countries without national residential postal codes
# For these, as instructed by the user, postal code is strictly EMPTY: ""
NON_POSTAL_DISTRICTS = {
    "CM": [ # Cameroun
        ("Douala", "Douala 1er - Akwa", ""),
        ("Douala", "Douala 1er - Bonanjo", ""),
        ("Douala", "Douala 1er - Bonapriso", ""),
        ("Douala", "Douala 1er - Deido", ""),
        ("Douala", "Douala 2e - New Bell", ""),
        ("Douala", "Douala 3e - Logbaba / Bassa", ""),
        ("Douala", "Douala 4e - Bonabéri", ""),
        ("Douala", "Douala 5e - Makepe / Bepanda", ""),
        ("Yaoundé", "Yaoundé 1er - Bastos", ""),
        ("Yaoundé", "Yaoundé 1er - Omnisports", ""),
        ("Yaoundé", "Yaoundé 2e - Tsinga", ""),
        ("Yaoundé", "Yaoundé 2e - Mokolo", ""),
        ("Yaoundé", "Yaoundé 3e - Efoulan", ""),
        ("Yaoundé", "Yaoundé 4e - Kondengui", ""),
        ("Yaoundé", "Yaoundé 5e - Essos", ""),
        ("Bafoussam", "Bafoussam 1er - Djemoun", ""),
        ("Garoua", "Garoua Centre - Marouaré", ""),
    ],
    "CI": [ # Côte d'Ivoire
        ("Abidjan", "Le Plateau - Cité Administrative", ""),
        ("Abidjan", "Cocody - Centre / Ambassades", ""),
        ("Abidjan", "Cocody - Deux-Plateaux", ""),
        ("Abidjan", "Cocody - Riviera Golf", ""),
        ("Abidjan", "Marcory - Zone 4 / Biétry", ""),
        ("Abidjan", "Treichville - Avenue 16", ""),
        ("Abidjan", "Yopougon - Selmer", ""),
        ("Yamoussoukro", "Habitat - Centre", ""),
        ("Bouaké", "Commerce - Kennedy", ""),
    ],
    "SN": [ # Sénégal
        ("Dakar", "Dakar-Plateau", "10200"),
        ("Dakar", "Médina", "10400"),
        ("Dakar", "Almadies", "10500"),
        ("Dakar", "Ngor", "10600"),
        ("Dakar", "Yoff", "10800"),
        ("Dakar", "Fann - Point E", "10300"),
        ("Saint-Louis", "Île de Saint-Louis", "32000"),
    ],
    "GA": [ # Gabon
        ("Libreville", "1er Arrondissement - Batterie 4", ""),
        ("Libreville", "2e Arrondissement - Mont-Bouët", ""),
        ("Libreville", "3e Arrondissement - Louis / Nombakélé", ""),
        ("Port-Gentil", "Grand Village - Centre", ""),
    ],
    "CG": [ # Congo
        ("Brazzaville", "1er Arrondissement - Makelekele", ""),
        ("Brazzaville", "2e Arrondissement - Bacongo", ""),
        ("Brazzaville", "3e Arrondissement - Poto-Poto", ""),
        ("Pointe-Noire", "Lumumba - Centre-ville", ""),
    ],
    "CD": [ # RDC
        ("Kinshasa", "Gombe - Centre des Affaires", ""),
        ("Kinshasa", "Kalamu - Matonge", ""),
        ("Kinshasa", "Ngaliema - Macampagne", ""),
        ("Lubumbashi", "Lubumbashi - Centre-ville", ""),
    ],
    "TD": [ # Tchad
        ("N'Djaména", "1er Arrondissement - Farcha", ""),
        ("N'Djaména", "2e Arrondissement - Bololo", ""),
        ("N'Djaména", "3e Arrondissement - Ardep Djoumal", ""),
    ],
    "CF": [ # Centrafrique
        ("Bangui", "1er Arrondissement - Centre", ""),
        ("Bangui", "2e Arrondissement - Lakouanga", ""),
    ],
    "BJ": [ # Bénin
        ("Cotonou", "1er Arrondissement - Dandji", ""),
        ("Cotonou", "5e Arrondissement - Guinkomey", ""),
        ("Porto-Novo", "1er Arrondissement - Ouando", ""),
    ],
    "TG": [ # Togo
        ("Lomé", "1er Arrondissement - Décon", ""),
        ("Lomé", "2e Arrondissement - Tokoin", ""),
    ],
    "DJ": [ # Djibouti
        ("Djibouti", "1er Arrondissement - Quartier 1", ""),
        ("Djibouti", "Plateau du Serpent", ""),
    ],
    "AE": [ # Émirats Arabes Unis
        ("Dubaï", "Downtown Dubai - Burj Khalifa", ""),
        ("Dubaï", "Dubaï Marina", ""),
        ("Dubaï", "Deira - Al Rigga", ""),
        ("Dubaï", "Jumeirah 1", ""),
        ("Abou Dabi", "Al Danah - Centre", ""),
        ("Abou Dabi", "Al Bateen", ""),
    ],
    "QA": [ # Qatar
        ("Doha", "West Bay - Diplomatic Area", ""),
        ("Doha", "Al Souq - Souq Waqif", ""),
        ("Doha", "The Pearl-Qatar - Porto Arabia", ""),
    ],
    "PA": [ # Panama
        ("Panama City", "Casco Viejo - San Felipe", ""),
        ("Panama City", "Bella Vista", ""),
        ("Panama City", "San Francisco", ""),
    ],
}

print("1. Lecture de countryInfo.txt pour identifier tous les 252 pays et territoires...")
country_info = {}
if os.path.exists("countryInfo.txt"):
    with open("countryInfo.txt", "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            p = line.strip().split("\t")
            if len(p) >= 9:
                iso = p[0]
                c_name_en = p[4]
                capital = p[5]
                continent_code = p[8]
                postal_fmt = p[13] if len(p) > 13 else ""
                country_info[iso] = {
                    "name_en": c_name_en,
                    "name_fr": COUNTRY_NAMES_FR.get(iso, c_name_en),
                    "capital": capital or "Capitale / Centre",
                    "continent": CONTINENT_MAP.get(continent_code, "Autre"),
                    "postal_fmt": postal_fmt
                }

print(f"Total pays indexés: {len(country_info)}")

print("2. Extraction des données postales de allCountries.zip...")
# We will extract records by country. For each country, collect unique, high-quality records.
# To ensure the Excel workbook stays balanced and fits comfortably while providing rich coverage,
# we take up to 250 distinct districts/cities per country from the official dataset.
MAX_RECORDS_PER_COUNTRY = 300

country_records = {iso: [] for iso in country_info}

if os.path.exists("allCountries.zip"):
    with zipfile.ZipFile("allCountries.zip") as z:
        with z.open("allCountries.txt") as f:
            seen_tuples = set()
            for line in f:
                parts = line.decode("utf-8", errors="ignore").strip().split("\t")
                if len(parts) >= 3:
                    iso = parts[0]
                    postal_code = parts[1].strip()
                    place_name = parts[2].strip()
                    admin1 = parts[3].strip() if len(parts) > 3 else ""
                    admin2 = parts[5].strip() if len(parts) > 5 else ""

                    if iso in country_info and len(country_records[iso]) < MAX_RECORDS_PER_COUNTRY:
                        # Determine city and district
                        city = admin2 or admin1 or place_name
                        district = place_name
                        if district == city and admin1 and admin1 != city:
                            district = f"{place_name} ({admin1})"
                        
                        tup_key = (iso, city.lower(), district.lower(), postal_code.lower())
                        if tup_key not in seen_tuples:
                            seen_tuples.add(tup_key)
                            country_records[iso].append((
                                country_info[iso]["continent"],
                                country_info[iso]["name_fr"],
                                city,
                                district,
                                postal_code
                            ))

print("3. Complétion des pays sans codes postaux ou avec peu d'enregistrements...")
for iso, info in country_info.items():
    continent = info["continent"]
    name_fr = info["name_fr"]
    capital = info["capital"]

    # If country has specific curated districts (e.g. African & Middle Eastern nations without residential CP)
    if iso in NON_POSTAL_DISTRICTS:
        country_records[iso] = []
        for city, district, cp in NON_POSTAL_DISTRICTS[iso]:
            country_records[iso].append((continent, name_fr, city, district, cp))
    elif len(country_records[iso]) == 0:
        # For small island nations or countries without postal code records in GeoNames:
        # Provide capital and central district, and leave postal code empty as requested!
        country_records[iso].append((
            continent,
            name_fr,
            capital,
            f"Centre Urbain / District Central",
            "" # Code postal vide conformément à la consigne utilisateur !
        ))

# Flatten all records
FINAL_ROWS = []
for iso in sorted(country_records.keys(), key=lambda x: country_info[x]["name_fr"]):
    FINAL_ROWS.extend(country_records[iso])

print(f"Total des lignes finales consolidées : {len(FINAL_ROWS):,}")
unique_countries = set(r[1] for r in FINAL_ROWS)
unique_continents = set(r[0] for r in FINAL_ROWS)
print(f"Nombre total de pays représentés : {len(unique_countries)}")
print(f"Nombre total de continents : {len(unique_continents)}")

# -------------------------------------------------------------
# 4. GÉNÉRATION DU CLASSEUR EXCEL PROFESSIONNEL
# -------------------------------------------------------------
print("4. Génération de GéoHiérarchie-Mondiale-Exhaustive.xlsx...")
wb = openpyxl.Workbook()

# Sheet 1: Vue globale récapitulative de tous les 250 pays
ws_rep = wb.active
ws_rep.title = "Répertoire des 250 Pays"

rep_headers = ["Continent", "Code ISO", "Pays (Français)", "Capitale", "Système Postal / Statut", "Nombre d'enregistrements"]
ws_rep.append(rep_headers)

HEADER_FILL_DARK = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
HEADER_FILL_BLUE = PatternFill(start_color="1D65ED", end_color="1D65ED", fill_type="solid")
HEADER_FONT = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
BORDER_THIN = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)

for col_num in range(1, len(rep_headers) + 1):
    c = ws_rep.cell(row=1, column=col_num)
    c.fill = HEADER_FILL_DARK
    c.font = HEADER_FONT
    c.alignment = Alignment(horizontal="center", vertical="center")

row_idx = 2
for iso in sorted(country_info.keys(), key=lambda x: country_info[x]["name_fr"]):
    info = country_info[iso]
    recs = country_records.get(iso, [])
    has_cp = any(r[4] != "" for r in recs)
    status_label = "Codes Postaux Officiels Intégrés" if has_cp else "Sans Code Postal Résidentiel (Quartiers Seuls)"
    
    ws_rep.append([
        info["continent"],
        iso,
        info["name_fr"],
        info["capital"],
        status_label,
        len(recs)
    ])
    for c_i in range(1, len(rep_headers) + 1):
        ws_rep.cell(row=row_idx, column=c_i).border = BORDER_THIN
    row_idx += 1

# Sheet 2: Toutes les lignes mondiales consolidées
ws_all = wb.create_sheet(title="Hiérarchie Mondiale Complète")
data_headers = ["Continent", "Pays", "Ville", "Quartier / Arrondissement", "Code Postal (ou Vide)"]
ws_all.append(data_headers)

for col_num in range(1, len(data_headers) + 1):
    c = ws_all.cell(row=1, column=col_num)
    c.fill = HEADER_FILL_BLUE
    c.font = HEADER_FONT
    c.alignment = Alignment(horizontal="center", vertical="center")

for r_i, r in enumerate(FINAL_ROWS, start=2):
    ws_all.append(r)
    for c_i in range(1, len(r) + 1):
        cell = ws_all.cell(row=r_i, column=c_i)
        cell.border = BORDER_THIN
        if c_i == 5:
            cell.alignment = Alignment(horizontal="center", vertical="center")

# Ajuster largeurs des colonnes
for sheet in [ws_rep, ws_all]:
    for col in sheet.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col[:150]: # échantillonnage pour vitesse
            val_str = str(cell.value or "")
            if len(val_str) > max_len:
                max_len = len(val_str)
        sheet.column_dimensions[col_letter].width = max(max_len + 4, 16)

# Sauvegarde des fichiers Excel et CSV
wb.save("GéoHiérarchie-Mondiale-Exhaustive.xlsx")
wb.save("GéoHiérarchie-Mondiale-Complete.xlsx")
wb.save(os.path.join("public", "donnees-geographiques.xlsx"))
print("Fichiers Excel sauvegardés avec succès!")

# Sauvegarde CSV UTF-8 avec BOM (compatible Excel immédiat)
csv_path = os.path.join("public", "donnees-geographiques.csv")
with open(csv_path, "w", encoding="utf-8-sig") as f:
    f.write("Continent;Pays;Ville;Quartier / Arrondissement;Code Postal\n")
    for r in FINAL_ROWS:
        f.write(f'"{r[0]}";"{r[1]}";"{r[2]}";"{r[3]}";"{r[4]}"\n')
print(f"Fichier CSV généré dans : {csv_path}")

# Génération des données seed pour l'application web Next.js
# Pour que l'application reste réactive et fluide dans le navigateur, on injecte un extrait représentatif exhaustif de tous les pays
seed_items = []
seen_countries = set()
for idx, r in enumerate(FINAL_ROWS, start=1):
    # Ensure at least 1-3 rows per country are directly in web app initial cache
    c_name = r[1]
    count_country = sum(1 for item in seed_items if item["pays"] == c_name)
    if count_country < 4 or len(seed_items) < 800:
        seed_items.append({
            "id": f"world-{idx:05d}",
            "continent": r[0],
            "pays": r[1],
            "ville": r[2],
            "quartier_arrondissement": r[3],
            "code_postal": r[4],
            "created_at": "2024-01-01T00:00:00Z"
        })

with open("src/lib/seed-data.ts", "w", encoding="utf-8") as f:
    f.write(f"import {{ GeoLocation }} from '@/types/geo';\n\nexport const INITIAL_GEO_DATA: GeoLocation[] = {json.dumps(seed_items, ensure_ascii=False, indent=2)};\n")

print(f"Seed data mis à jour avec {len(seed_items)} localisations couvrant tous les pays!")

# Supprimer les fichiers temporaires volumineux
if os.path.exists("allCountries.zip"):
    os.remove("allCountries.zip")
if os.path.exists("countryInfo.txt"):
    os.remove("countryInfo.txt")

print("Terminé avec succès !")
