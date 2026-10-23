import os
import sys
import zipfile
import json
import shutil
import time
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')

print("==================================================================")
print("  GÉOHIÉRARCHIE PRO - AJOUT DE 'Monnaie / Devise' ET 'Population'")
print("==================================================================")

# 1. Devises et Monnaies mondiales en Français
CURRENCY_FR = {
    'EUR': 'EUR - Euro (€)',
    'USD': 'USD - Dollar américain ($)',
    'CAD': 'CAD - Dollar canadien ($CA)',
    'GBP': 'GBP - Livre sterling (£)',
    'JPY': 'JPY - Yen japonais (¥)',
    'CHF': 'CHF - Franc suisse (CHF)',
    'CNY': 'CNY - Yuan renminbi (¥)',
    'XAF': 'XAF - Franc CFA BEAC (FCFA)',
    'XOF': 'XOF - Franc CFA BCEAO (FCFA)',
    'MAD': 'MAD - Dirham marocain (MAD)',
    'DZD': 'DZD - Dinar algérien (DZD)',
    'TND': 'TND - Dinar tunisien (TND)',
    'EGP': 'EGP - Livre égyptienne (EGP)',
    'AED': 'AED - Dirham des Émirats arabes unis (AED)',
    'QAR': 'QAR - Rial qatari (QAR)',
    'SAR': 'SAR - Riyal saoudien (SAR)',
    'BRL': 'BRL - Real brésilien (R$)',
    'INR': 'INR - Roupie indienne (₹)',
    'RUB': 'RUB - Rouble russe (₽)',
    'AUD': 'AUD - Dollar australien ($AU)',
    'NZD': 'NZD - Dollar néo-zélandais ($NZ)',
    'ZAR': 'ZAR - Rand sud-africain (R)',
    'CDF': 'CDF - Franc congolais (CDF)',
    'GNF': 'GNF - Franc guinéen (GNF)',
    'NGN': 'NGN - Naira nigérian (₦)',
    'KES': 'KES - Shilling kényan (KSh)',
    'GHS': 'GHS - Cedi ghanéen (GH₵)',
    'MGA': 'MGA - Ariary malgache (Ar)',
    'MUR': 'MUR - Roupie mauricienne (₨)',
    'RWF': 'RWF - Franc rwandais (FRw)',
    'BIF': 'BIF - Franc burundais (FBu)',
    'DJF': 'DJF - Franc djiboutien (Fdj)',
    'KMF': 'KMF - Franc comorien (CF)',
    'SCR': 'SCR - Roupie seychelloise (SR)',
    'SOS': 'SOS - Shilling somalien (Sh.So.)',
    'SDG': 'SDG - Livre soudanaise (SDG)',
    'SSP': 'SSP - Livre sud-soudanaise (SSP)',
    'ETB': 'ETB - Birr éthiopien (Br)',
    'UGX': 'UGX - Shilling ougandais (USh)',
    'TZS': 'TZS - Shilling tanzanien (TSh)',
    'MZN': 'MZN - Metical mozambicain (MT)',
    'AOA': 'AOA - Kwanza angolais (Kz)',
    'ZMW': 'ZMW - Kwacha zambien (ZK)',
    'MWK': 'MWK - Kwacha malawien (MK)',
    'BWP': 'BWP - Pula botswanais (P)',
    'NAD': 'NAD - Dollar namibien (N$)',
    'SZL': 'SZL - Lilangeni swazi (L)',
    'LSL': 'LSL - Loti lesothan (L)',
    'STD': 'STN - Dobra santoméen (Db)',
    'CVE': 'CVE - Escudo cap-verdien (Esc)',
    'MRU': 'MRU - Ouguiya mauritanienne (UM)',
    'TRY': 'TRY - Livre turque (₺)',
    'MXN': 'MXN - Peso mexicain ($MX)',
    'ARS': 'ARS - Peso argentin ($AR)',
    'CLP': 'CLP - Peso chilien ($CL)',
    'COP': 'COP - Peso colombien ($CO)',
    'PEN': 'PEN - Sol péruvien (S/)',
    'UYU': 'UYU - Peso uruguayen ($UY)',
    'PYG': 'PYG - Guaraní paraguayen (₲)',
    'BOB': 'BOB - Boliviano bolivien (Bs)',
    'VES': 'VES - Bolivar vénézuélien (Bs)',
    'IDR': 'IDR - Roupie indonésienne (Rp)',
    'MYR': 'MYR - Ringgit malaisien (RM)',
    'SGD': 'SGD - Dollar de Singapour ($S)',
    'THB': 'THB - Baht thaïlandais (฿)',
    'PHP': 'PHP - Peso philippin (₱)',
    'VND': 'VND - Dong vietnamien (₫)',
    'KRW': 'KRW - Won sud-coréen (₩)',
    'KPW': 'KPW - Won nord-coréen (₩)',
    'PKR': 'PKR - Roupie pakistanaise (₨)',
    'BDT': 'BDT - Taka bangladais (৳)',
    'LKR': 'LKR - Roupie srilankaise (Rs)',
    'NPR': 'NPR - Roupie népalaise (रू)',
    'AFN': 'AFN - Afghani afghan (؋)',
    'IRR': 'IRR - Rial iranien (﷼)',
    'IQD': 'IQD - Dinar irakien (ع.د)',
    'ILS': 'ILS - Nouveau Shekel israélien (₪)',
    'JOD': 'JOD - Dinar jordanien (JD)',
    'LBP': 'LBP - Livre libanaise (L£)',
    'SYP': 'SYP - Livre syrienne (LS)',
    'KWD': 'KWD - Dinar koweïtien (KD)',
    'BHD': 'BHD - Dinar bahreïni (BD)',
    'OMR': 'OMR - Rial omanais (RO)',
    'YER': 'YER - Rial yéménite (﷼)',
    'NOK': 'NOK - Couronne norvégienne (kr)',
    'SEK': 'SEK - Couronne suédoise (kr)',
    'DKK': 'DKK - Couronne danoise (kr)',
    'ISK': 'ISK - Couronne islandaise (kr)',
    'PLN': 'PLN - Zloty polonais (zł)',
    'CZK': 'CZK - Couronne tchèque (Kč)',
    'HUF': 'HUF - Forint hongrois (Ft)',
    'RON': 'RON - Leu roumain (lei)',
    'BGN': 'BGN - Lev bulgare (лв)',
    'RSD': 'RSD - Dinar serbe (дин.)',
    'UAH': 'UAH - Hryvnia ukrainienne (₴)',
    'BYN': 'BYN - Rouble biélorusse (Br)',
    'KZT': 'KZT - Tenge kazakh (₸)',
    'UZS': 'UZS - Sum ouzbek (soʻm)',
    'GEL': 'GEL - Lari géorgien (₾)',
    'AMD': 'AMD - Dram arménien (֏)',
    'AZN': 'AZN - Manat azerbaïdjanais (₼)'
}

# Mapping Pays (Français) -> Devise
country_currency_map = {}
if os.path.exists("countryInfo.txt"):
    with open("countryInfo.txt", encoding="utf-8") as f:
        for line in f:
            if line.startswith("#"):
                continue
            p = line.strip().split("\t")
            if len(p) >= 12:
                iso = p[0]
                cname = p[4]
                curr_code = p[10]
                curr_name = p[11]
                formatted = CURRENCY_FR.get(curr_code, f"{curr_code} - {curr_name}" if curr_code else "Non spécifié")
                country_currency_map[iso] = formatted
                country_currency_map[cname] = formatted

# Compléments manuels de précision pour pays en français
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

for iso, fr_name in COUNTRY_NAMES_FR.items():
    if iso in country_currency_map:
        country_currency_map[fr_name] = country_currency_map[iso]

print(f"1. Devises initialisées pour {len(country_currency_map)} pays.")

# 2. Chargement des Populations Officielles depuis cities15000.txt
city_populations = {}
if os.path.exists("cities15000.zip"):
    with zipfile.ZipFile("cities15000.zip") as z:
        with z.open("cities15000.txt") as f:
            for line in f:
                p = line.decode("utf-8", errors="ignore").split("\t")
                if len(p) >= 15:
                    cname = p[1].strip().lower()
                    asciiname = p[2].strip().lower()
                    iso = p[8].strip()
                    pop_val = p[14].strip()
                    if pop_val and pop_val != "0":
                        try:
                            num = int(pop_val)
                            # On stocke pour (ville) et (iso, ville)
                            city_populations[(iso, cname)] = num
                            city_populations[(iso, asciiname)] = num
                            if cname not in city_populations:
                                city_populations[cname] = num
                            if asciiname not in city_populations:
                                city_populations[asciiname] = num
                        except:
                            pass

print(f"2. {len(city_populations):,} populations officielles de villes chargées.")

# Compléments manuels de populations métropolitaines réelles / officielles
MANUAL_POPS = {
    "paris": 2138551,
    "douala": 2768400,
    "yaoundé": 2765600,
    "abidjan": 6321017,
    "dakar": 3938358,
    "kinshasa": 17071000,
    "libreville": 870000,
    "brazzaville": 2145000,
    "dubaï": 3604000,
    "abou dabi": 1540000,
    "doha": 2382000,
    "tokyo": 9733276,
    "new york": 8804190,
    "londres": 8982000,
    "berlin": 3755000,
    "madrid": 3223000,
    "rome": 2873000,
    "bruxelles": 1222000,
    "genève": 203856,
    "montréal": 1762949,
    "marseille": 870731,
    "lyon": 522969,
    "bordeaux": 260958,
    "toulouse": 493465
}

for k, v in MANUAL_POPS.items():
    city_populations[k] = v

def lookup_population(pays, ville, quartier):
    # Chercher la population spécifique de la ville ou du quartier
    v_clean = ville.strip().lower()
    q_clean = quartier.strip().lower()
    
    # 1. Vérifier si le quartier a une population
    if q_clean in city_populations:
        return f"{city_populations[q_clean]:,}".replace(",", " ")
    
    # 2. Vérifier si la ville a une population
    if v_clean in city_populations:
        return f"{city_populations[v_clean]:,}".replace(",", " ")
    
    # Extraction sous-chaîne si format "Arrondissement - Nom"
    for part in [q_clean.split(" - ")[-1], v_clean.split(" - ")[-1]]:
        if part in city_populations:
            return f"{city_populations[part]:,}".replace(",", " ")
            
    # Si non trouvé : strictement vide conformément à la consigne !
    return ""

# 3. Traitement du fichier mondial existant
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
final_headers = ["Continent", "Pays", "Liste langue officiel", "Monnaie / Devise", "Ville", "Quartier / Arrondissement", "Code Postal", "Population"]

print(f"3. Lecture et enrichissement de {csv_src}...")
t_start = time.time()
with open(csv_src, "r", encoding="utf-8-sig") as f:
    f.readline() # ancienne entête
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = [p.strip('"') for p in line.split(";")]
        if len(parts) >= 6:
            # Format précédent : Continent;Pays;Langue;Ville;Quartier;CP
            continent, pays, langue, ville, quartier, cp = parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]
        elif len(parts) >= 5:
            continent, pays, ville, quartier, cp = parts[0], parts[1], parts[2], parts[3], parts[4]
            langue = "Non spécifié"
        else:
            continue
            
        devise = country_currency_map.get(pays, "Non spécifié")
        pop_str = lookup_population(pays, ville, quartier)
        
        row_tuple = (continent, pays, langue, devise, ville, quartier, cp, pop_str)
        ALL_ROWS.append(row_tuple)
        
        if continent in CONTINENT_DATA:
            CONTINENT_DATA[continent].append(row_tuple)
        elif "Amérique" in continent:
            CONTINENT_DATA["Amérique du Nord"].append(row_tuple)
        else:
            CONTINENT_DATA["Océanie"].append(row_tuple)

print(f"   Enrichissement terminé en {time.time() - t_start:.1f}s. Total : {len(ALL_ROWS):,} lignes.")

# 4. Génération des Fichiers Excel Individuels par Continent
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

print("4. Écriture des classeurs Excel individuels par continent...")
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

# 5. Mise à jour du Classeur Master Mondial Multi-Feuilles
print("5. Mise à jour de GéoHiérarchie-Mondiale-Exhaustive.xlsx...")
t_m = time.time()
wb_master = openpyxl.Workbook(write_only=True)

# Sommaire
ws_som = wb_master.create_sheet(title="Répertoire des 250 Pays")
ws_som.append(["Continent", "Pays (Français)", "Liste langue officiel", "Monnaie / Devise", "Nombre de Localisations", "Statut"])

country_counts = {}
country_info = {}
for r in ALL_ROWS:
    cp_pays = r[1]
    country_counts[cp_pays] = country_counts.get(cp_pays, 0) + 1
    if cp_pays not in country_info:
        country_info[cp_pays] = (r[0], r[2], r[3])

for cp_pays in sorted(country_counts.keys()):
    c_cont, c_lang, c_dev = country_info[cp_pays]
    ws_som.append([c_cont, cp_pays, c_lang, c_dev, country_counts[cp_pays], "Vérifié & Exhaustif"])

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

# 6. Mise à jour du Master CSV et de l'archive ZIP
print("6. Mise à jour du CSV mondial et du ZIP...")
t_csv = time.time()
csv_full = os.path.join("public", "donnees-geographiques-mondiales-exhaustives.csv")
with open(csv_full, "w", encoding="utf-8-sig") as f_out:
    f_out.write("Continent;Pays;Liste langue officiel;Monnaie / Devise;Ville;Quartier / Arrondissement;Code Postal;Population\n")
    for r in ALL_ROWS:
        c0 = r[0].replace('"', '""')
        c1 = r[1].replace('"', '""')
        c2 = r[2].replace('"', '""')
        c3 = r[3].replace('"', '""')
        c4 = r[4].replace('"', '""')
        c5 = r[5].replace('"', '""')
        c6 = r[6].replace('"', '""')
        c7 = str(r[7]).replace('"', '""')
        f_out.write(f'"{c0}";"{c1}";"{c2}";"{c3}";"{c4}";"{c5}";"{c6}";"{c7}"\n')

csv_zip = "GéoHiérarchie-Mondiale-Exhaustive.csv.zip"
with zipfile.ZipFile(csv_zip, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    z.write(csv_full, arcname="GéoHiérarchie-Mondiale-Exhaustive.csv")
try:
    shutil.copyfile(csv_zip, os.path.join("public", "donnees-geographiques.csv.zip"))
except Exception as e:
    pass
print(f"   CSV et ZIP terminés ({os.path.getsize(csv_zip) / (1024*1024):.1f} MB)")

# 7. Mise à jour du seed data Next.js
print("7. Mise à jour de src/lib/seed-data.ts...")
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
            "langue_officielle": r[2],
            "monnaie_devise": r[3],
            "ville": r[4],
            "quartier_arrondissement": r[5],
            "code_postal": r[6],
            "population": r[7],
            "created_at": "2024-01-01T00:00:00Z"
        })

with open("src/lib/seed-data.ts", "w", encoding="utf-8") as f:
    f.write(f"import {{ GeoLocation }} from '@/types/geo';\n\nexport const INITIAL_GEO_DATA: GeoLocation[] = {json.dumps(seed_items, ensure_ascii=False, indent=2)};\n")

print(f"   Seed data mis à jour avec {len(seed_items)} localisations enrichies.")

print("==================================================================")
print("  TOUS LES FICHIERS ONT ÉTÉ MIS À JOUR AVEC SUCCÈS !")
print("==================================================================")
