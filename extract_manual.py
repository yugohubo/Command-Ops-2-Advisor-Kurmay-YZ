# Command Ops 2 Game Manual PDF Extractor - Flexible Path Version
import os
import json
import re
from pypdf import PdfReader

# Paths to search
STEAM_PATH = r"C:\Program Files (x86)\Steam\steamapps\common\Command Ops 2\Documentation\CO2 Game Manual v1.2.pdf"
LOCAL_DOCS_DIR = "docs"

def find_manual_path():
    # 1. Check local docs folder first
    if os.path.exists(LOCAL_DOCS_DIR):
        for f in os.listdir(LOCAL_DOCS_DIR):
            if "game manual" in f.lower() and f.endswith(".pdf"):
                path = os.path.join(LOCAL_DOCS_DIR, f)
                print(f"Located manual in local docs directory: {path}")
                return path
        # Fallback to any PDF in docs if nothing matched "game manual"
        for f in os.listdir(LOCAL_DOCS_DIR):
            if f.endswith(".pdf"):
                path = os.path.join(LOCAL_DOCS_DIR, f)
                print(f"Using fallback PDF in local docs: {path}")
                return path

    # 2. Check default Steam installation
    if os.path.exists(STEAM_PATH):
        print(f"Located manual in Steam installation: {STEAM_PATH}")
        return STEAM_PATH

    return None

def extract_manual_text():
    manual_path = find_manual_path()
    if not manual_path:
        print("Error: Command Ops 2 Game Manual PDF could not be located in './docs/' or Steam installation path.")
        return

    print("Reading PDF...")
    reader = PdfReader(manual_path)
    total_pages = len(reader.pages)
    print(f"Total pages: {total_pages}")

    # We will search for specific gameplay concept headings
    concepts = {
        "order_delay": {
            "keywords": [r"order delay", r"command delay", r"staff capacity"],
            "title": "Order Delay (Emir Gecikmesi)",
            "pages": [],
            "content": []
        },
        "supply": {
            "keywords": [r"line of supply", r"supply distribution", r"supply path", r"supply entry"],
            "title": "Line of Supply (İkmal Lojistik Hatları)",
            "pages": [],
            "content": []
        },
        "fatigue": {
            "keywords": [r"rest and wakeup", r"fatigue", r"sleep deprivation", r"recovery rate", r"resting state"],
            "title": "Fatigue and Rest (Yorgunluk ve Dinlenme)",
            "pages": [],
            "content": []
        },
        "cohesion": {
            "keywords": [r"cohesion", r"cohesion recovery", r"suppression recovery", r"reorganising"],
            "title": "Cohesion and Suppression (Uyum ve Baskı)",
            "pages": [],
            "content": []
        },
        "artillery": {
            "keywords": [r"indirect fire", r"artillery coordination", r"bombardment profile", r"on-call fire"],
            "title": "Artillery and Fire Support (Dolaylı Yangın ve Topçu Desteği)",
            "pages": [],
            "content": []
        }
    }

    print("Scanning pages for wargaming rules...")
    for idx in range(total_pages):
        page = reader.pages[idx]
        text = page.extract_text()
        if not text:
            continue
            
        for key, config in concepts.items():
            for kw in config["keywords"]:
                if re.search(kw, text, re.IGNORECASE):
                    config["pages"].append(idx + 1)
                    # Keep snippet
                    config["content"].append(text)
                    break

    # Clean and summarize extracted text
    refined_data = {}
    for key, config in concepts.items():
        unique_pages = sorted(list(set(config["pages"])))
        print(f"Concept '{key}' found on pages: {unique_pages}")
        
        # Combine matching pages text (limit to top 3 dense pages)
        full_raw_text = "\n=== PAGE ===\n".join(config["content"][:3])
        
        # Clean text
        cleaned_text = re.sub(r'\s+', ' ', full_raw_text)
        cleaned_text = re.sub(r'([.?!])\s*', r'\1\n', cleaned_text)
        
        refined_data[key] = {
            "title": config["title"],
            "pages": unique_pages,
            "raw_snippet": cleaned_text[:3000]
        }

    # Save to a local json file
    output_path = r"manual_data.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(refined_data, f, ensure_ascii=False, indent=2)

    print(f"Extraction successful! Data saved to {output_path}")

if __name__ == "__main__":
    extract_manual_text()
