from django.db import models
from django.contrib.auth.models import User


class Hopital(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employe(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hopital = models.ForeignKey(Hopital, on_delete=models.SET_NULL,null=True)
    nom = models.CharField(max_length=45, blank=True, null=True)
    prenom = models.CharField(max_length=45, blank=True, null=True)
    role = models.CharField(max_length=20, choices=[('medecin', 'Medecin'),
                                                    ('administratif', 'Administratif'),
                                                    ('infirmier', 'Infirmier'),
                                                    ('radiologue', 'radiologue'),
                                                    ('pharmacien', 'Pharmacien'),
                                                    ('laboratorien', 'Laboratorien')])
    telephone = models.CharField(max_length=35, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.role})"


class Patient(models.Model):
    nss = models.BigIntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nom = models.CharField(max_length=45)
    prenom = models.CharField(max_length=45)
    date_de_naissance = models.DateField()
    adresse = models.CharField(max_length=100, blank=True, null=True)
    telephone = models.CharField(max_length=35, blank=True, null=True)
    mutuelle = models.CharField(max_length=45, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
         return f"{self.nom} {self.prenom}"


class Ordonance(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True, null=True)
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    valide=models.BooleanField(default=False)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL,null=True ,related_name="consultations")
    ordonance = models.ForeignKey(Ordonance, on_delete=models.SET_NULL, blank=True, null=True)
    diagnostique = models.TextField(blank=True, null=True)
    resume = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BilanBiologique(models.Model):
    consultation = models.OneToOneField(Consultation,primary_key=True, on_delete=models.CASCADE)
    laborantin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    resultat = models.TextField(blank=True, null=True)
    valide=models.BooleanField(default=False)
    date_debut = models.DateTimeField(auto_now_add=True)
    date_fin = models.DateTimeField(auto_now=True)

class BilanRadiologique(models.Model):
    consultation = models.OneToOneField(Consultation,primary_key=True, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True, null=True)
    radiologue = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    compte_rendu = models.TextField(blank=True, null=True)
    valide=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Outil(models.Model):
    nom = models.CharField(max_length=45)

    def __str__(self):
        return self.nom


class ConsultationOutil(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    outil = models.ForeignKey(Outil, on_delete=models.CASCADE)

class BilanBioTest(models.Model):
    bilan_biologique = models.ForeignKey(BilanBiologique, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=[('cholesterol', 'Cholestérol'),
                                                    ('fer', 'Fer Tests'),
                                                    ('hypertension', 'Hypertension')
                                                    ])
    valeur = models.FloatField()
    class Meta:
        unique_together = ('bilan_biologique', 'type')



class Medicament(models.Model):
    nom = models.CharField(max_length=45)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nom



class OrdonanceMedicament(models.Model):
    ordonance = models.ForeignKey(Ordonance, on_delete=models.CASCADE)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    dose = models.FloatField()
    duree = models.IntegerField(help_text="Duration in days")


class ImageRadio(models.Model):
    image = models.ImageField()
    bilan_radiologique = models.ForeignKey(BilanRadiologique, on_delete=models.CASCADE)


class Soin(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    observation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SoinMedicament(models.Model):
    soin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    infirmier = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    dose = models.FloatField()
    date_time = models.DateTimeField()

class SoinInfirmier(models.Model):
    soin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    infirmier = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField()
    date_time = models.DateTimeField()

class ObservationEtat(models.Model):
    soin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    infirmier = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    observation = models.TextField()
    date_time = models.DateTimeField()


class Traitement(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True, related_name="patients")

    class Meta:
        unique_together = ('patient', 'medecin')


