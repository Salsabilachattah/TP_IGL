from django.db import models
from django.contrib.auth.models import User


class Hopital(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employe(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hopital = models.ForeignKey(Hopital, on_delete=models.CASCADE)
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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nss = models.BigIntegerField(primary_key=True)
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


class BilanBiologique(models.Model):
    laborantin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    resultat = models.TextField(blank=True, null=True)
    valide=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BilanRadiologique(models.Model):
    radiologue = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    compte_rendu = models.TextField(blank=True, null=True)
    valide=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Ordonance(models.Model):
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=False, null=True, related_name="consultations")
    date = models.DateTimeField()
    bilan_biologique = models.ForeignKey(BilanBiologique, on_delete=models.SET_NULL, blank=True, null=True)
    bilan_radiologique = models.ForeignKey(BilanRadiologique, on_delete=models.SET_NULL, blank=True, null=True)
    ordonance = models.ForeignKey(Ordonance, on_delete=models.SET_NULL, blank=True, null=True)
    resume = models.TextField(blank=True, null=True)
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
    type = models.CharField(max_length=20, choices=[('choice1', 'Choice1'),
                                                    ('choice3', 'Choice2'),
                                                    ('ext...', 'Ext..')
                                                    ])
    valeur = models.FloatField()




class Medicament(models.Model):
    nom = models.CharField(max_length=45)
    stock = models.PositiveIntegerField()
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
    link = models.URLField()
    bilan_radiologique = models.ForeignKey(BilanRadiologique, on_delete=models.CASCADE)


class Soin(models.Model):
    infirmier = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
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
    description = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)

class ObservationEtat(models.Model):
    soin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    infirmier = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)
    observation = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True)



class Traitement(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.ForeignKey(Employe, on_delete=models.SET_NULL, blank=True, null=True, related_name="patients")

    class Meta:
        unique_together = ('patient', 'medecin')
