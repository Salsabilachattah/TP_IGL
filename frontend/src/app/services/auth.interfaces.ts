// Hopital interface (Assuming this is your custom Hopital model)
interface Hopital {
  id: number;
  name: string;
}

// Employe interface
interface Employe {
  id:number;
  hopital: Hopital | null; // Assuming Hopital is another interface
  nom: string | null;
  prenom: string | null;
  telephone: string | null;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

// Patient interface
interface Patient {
  nss: number; // BigInteger is represented as number
  nom: string;
  prenom: string;
  date_de_naissance: string; // ISO string format (date)
  adresse: string | null;
  telephone: string | null;
  mutuelle: string | null;
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}
