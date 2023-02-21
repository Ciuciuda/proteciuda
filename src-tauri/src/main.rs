#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use serde_json::{json, Result};

#[derive(Serialize, Deserialize)]
struct Przesuniecie {
    bialka: String,
    waga: String,
    punkt_ie: String,
}

fn kodon_extract(sekwencja: &str) -> String {
    sekwencja.replace("T", "U");
    let mut kodony: Vec<&str> = Vec::new();
    let mut i = 0;
    while i < sekwencja.len() {
        if i + 3 <= sekwencja.len() {
            kodony.push(&sekwencja[i..i + 3]);
        } else {
            kodony.push(&sekwencja[i..]);
        }
        i += 3;
    }

    println!("{:?}", kodony);
    amino_encoder(&kodony)
}
fn calculate_mass(protein: &str) -> f64 {
    let mut mass = 0.0;
    println!("{}", protein);
    for acid in protein.chars() {
        match acid {
            'A' => mass += 89.09,
            'C' => mass += 121.16,
            'D' => mass += 133.10,
            'E' => mass += 147.13,
            'F' => mass += 165.19,
            'G' => mass += 75.07,
            'H' => mass += 155.16,
            'I' => mass += 131.17,
            'K' => mass += 146.19,
            'L' => mass += 131.17,
            'M' => mass += 149.21,
            'N' => mass += 132.12,
            'P' => mass += 115.13,
            'Q' => mass += 146.15,
            'R' => mass += 174.20,
            'S' => mass += 105.09,
            'T' => mass += 119.12,
            'V' => mass += 117.15,
            'W' => mass += 204.23,
            'Y' => mass += 181.19,
            // 'O' => mass += 255.31,
            // 'U' => mass += 168.06,
            _ => mass += 0.0,
        }
        println!("{}", mass);
    }
    mass -= (protein.len() - 1) as f64 * 18.02;
    mass
}
fn amino_encoder(kodony: &Vec<&str>) -> String {
    let mut wynik = String::from("");
    for kodon in kodony {
        let mut temp = kodon.chars();
        match &temp.nth(0) {
            Some('A') => match &temp.nth(0) {
                Some('C') => wynik.push('T'),
                Some('U') => match &temp.nth(0) {
                    Some('G') => wynik.push('M'),
                    Some('A' | 'C' | 'U') => wynik.push('I'),
                    _ => wynik.push('X'),
                },
                Some('A') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push('K'),
                    Some('U' | 'C') => wynik.push('N'),
                    _ => wynik.push('X'),
                },
                Some('G') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push('R'),
                    Some('U' | 'C') => wynik.push('S'),
                    _ => wynik.push('X'),
                },
                _ => {
                    wynik.push('X');
                }
            },
            Some('G') => match &temp.nth(0) {
                Some('C') => wynik.push('A'),
                Some('U') => wynik.push('V'),
                Some('A') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push('E'),
                    Some('U' | 'C') => wynik.push('D'),
                    _ => wynik.push('X'),
                },
                Some('G') => wynik.push('G'),
                _ => {
                    wynik.push('X');
                }
            },

            Some('U') => match &temp.nth(0) {
                Some('U') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push('L'),
                    Some('U' | 'C') => wynik.push('F'),
                    _ => wynik.push('X'),
                },
                Some('C') => wynik.push('S'),
                Some('A') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push_str(""),
                    Some('U' | 'C') => wynik.push('Y'),
                    _ => wynik.push('X'),
                },
                Some('G') => match &temp.nth(0) {
                    Some('A') => wynik.push_str(""),
                    Some('G') => wynik.push('W'),
                    Some('U' | 'C') => wynik.push('C'),
                    _ => wynik.push('X'),
                },
                _ => wynik.push('X'),
            },
            Some('C') => match &temp.nth(0) {
                Some('A') => match &temp.nth(0) {
                    Some('A' | 'G') => wynik.push('Q'),
                    Some('U' | 'C') => wynik.push('H'),
                    _ => wynik.push('X'),
                },
                Some('C') => wynik.push('P'),
                Some('G') => wynik.push('R'),
                Some('U') => wynik.push('L'),
                _ => wynik.push('X'),
            },
            _ => wynik.push('X'),
        }
    }
    wynik
}

#[tauri::command]
fn rdFromKbrd(sekwencja: &str) -> String {
    if sekwencja.len() < 3 {
        return String::from("Za krótka sekwencja");
    }
    let mut wektor: Vec<Przesuniecie> = Vec::new();

    let sekwencja_1 = kodon_extract(&sekwencja.to_uppercase());
    println!("{}", sekwencja_1);
    let sekwencja_2 = kodon_extract(&sekwencja[1..].to_uppercase());
    println!("{}", sekwencja_2);
    let sekwencja_3 = kodon_extract(&sekwencja[2..].to_uppercase());
    println!("{}", sekwencja_3);

    wektor.push(Przesuniecie {
        bialka: sekwencja_1.clone(),
        waga: calculate_mass(&sekwencja_1).to_string(),
        punkt_ie: String::from(""),
    });
    wektor.push(Przesuniecie {
        bialka: sekwencja_2.clone(),
        waga: calculate_mass(&sekwencja_2).to_string(),
        punkt_ie: String::from(""),
    });
    wektor.push(Przesuniecie {
        bialka: sekwencja_3.clone(),
        waga: calculate_mass(&sekwencja_3).to_string(),
        punkt_ie: String::from(""),
    });

    let json = serde_json::to_string(&wektor).unwrap_or_default();

    json
    // println!("{:?}", json);
    // let mut wynik = String::from("Przsunięcie 1: \n");
    // wynik.push_str(&sekwencja_1);
    // wynik.push_str("\nMasa: ");
    // wynik.push_str(&calculate_mass(&sekwencja_1).to_string());
    // wynik.push_str("\nPrzsunięcie 2: \n");
    // wynik.push_str(&sekwencja_2);
    // wynik.push_str("\nMasa: ");
    // wynik.push_str(&calculate_mass(&sekwencja_2).to_string());
    // wynik.push_str("\nPrzsunięcie 3: \n");
    // wynik.push_str(&sekwencja_3);
    // wynik.push_str("\nMasa: ");
    // wynik.push_str(&calculate_mass(&sekwencja_3).to_string());

    // wynik
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![rdFromKbrd])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
