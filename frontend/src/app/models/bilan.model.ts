// src/app/models/bilan.models.ts

export interface BilanBioTest {
    type: 'cholesterol' | 'fer' | 'hypertension'; // Types de tests
    valeur: number; // Valeur du test
  }
  
  export interface BilanBiologique {
    consultation: string; // ID de la consultation
    laborantin?: string; // ID de l'employé (laborantin)
    patient?: string; // ID du patient
    description?: string; // Description du bilan
    resultat?: string; // Résultats du bilan
    valide: boolean; // Si le bilan est validé ou non
    date_debut: string; // Date de début du bilan
    date_fin: string; // Date de fin du bilan
    tests: BilanBioTest[]; // Liste des tests associés au bilan
  }
  
  export interface BilanResponse {
    bilans: BilanBiologique[]; // Liste de bilans biologiques
  }
  