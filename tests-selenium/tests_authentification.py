from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_authentification():    
    """
    Teste le processus d'authentification de l'application web.
    Étapes:
    1. Ouvre le navigateur et accède à l'application web.
    2. Attend que la page se charge complètement.
    3. Trouve et clique sur le bouton "Commencer".
    4. Remplit le champ du nom d'utilisateur avec 'medecin_user'.
    5. Remplit le champ du mot de passe avec '123456'.
    6. Soumet le formulaire de connexion.
    7. Attend que la page se charge.
    8. Vérifie si le token est stocké dans le local storage.
    9. Navigue dans le profil du médecin et affiche le message de bienvenue.
    Exceptions:
    - Affiche "Erreur d'authentification" en cas d'échec de l'authentification.
    """
    # Wait for the page to load completely
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "app-background-video")) 
    )
    time.sleep(3)
    # trouver le bouton de commencer
    commencer_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Commencer')]"))
    )
 
    commencer_button.click()


    time.sleep(1)
    # Entrer le nom d'utilisateur
    username_field = driver.find_element(By.ID, "username")
    # username = input("Enter test username: ")
    username = 'medecin_user'
    username_field.send_keys(username)  
    time.sleep(1)
    # Entrer le mot de passe
    password_field = driver.find_element(By.ID, "password")
    # password = input("Enter test password: ")
    password = '123456'
    password_field.send_keys(password)  

    # Verifier si le token est stocke dans le local storage
    token = driver.execute_script("return localStorage.getItem('token');")
    # Submit the login form
    button = driver.find_element(By.XPATH, "//button[contains(text(), 'Se connecter')]")
    button.click()

    # attendre 2 secondes pour que la page se charge
    time.sleep(2)

    try:
        time.sleep(1)
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/app-left-sidebar/div/div/button")
        button.click()
        time.sleep(1)
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/app-left-sidebar/div/ul/li[3]")
        button.click()
        nom = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-info-perso/div/div/div/app-information-perso/div/div/div[1]/label")
        prenom = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-info-perso/div/div/div/app-information-perso/div/div/div[2]/label")
        telephone = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-info-perso/div/div/div/app-information-perso/div/div/div[3]/label")

        print("Informations personnelles : ", nom.text, prenom.text, telephone.text)
    except:
        print("Erreur d'authentification")

def test_recherche_patient():
    try:
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/app-left-sidebar/div/div/button")
        button.click()
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/app-left-sidebar/div/ul/li[2]")
        button.click()
        driver.implicitly_wait(5)
        search_field = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-liste-patient/div/div/div[1]/app-searchbar/div/div/div/div[1]/input")
        # nss = input("Entrez le nss du patient : ")
        nss = 342879415641
        search_field.send_keys(nss)
        # boutton de recherche
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-liste-patient/div/div/div[1]/app-searchbar/div/div/button")
        button.click()
        time.wait(5)



    except:
        print("Erreur dans la recherche du patient")

def test_visualiser_dossier():
    try:
        button_visualiser = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-liste-patient/div/div/div[1]/app-searchbar/div[2]/table/tbody/tr/td[4]/button")   
        button_visualiser.click()
        time.sleep(3)
        button_consultation = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/app-radio-group/div/label[2]")
        button_consultation.click()
        time.sleep(3)
        button_resume = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/div[2]/app-date-resume-container/div/div/table/tbody/tr/td[2]/button")    
        button_resume.click()
        time.sleep(3) 
        button_go_back = driver.find_element(By.XPATH, "/html/body/app-root/app-resume/div/div[3]/app-bouttonretour/button")
        button_go_back.click()
        time.sleep(1.5)
        button_prescription = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/app-radio-group/div/label[4]")
        button_prescription.click()
        time.sleep(3)
        button_afficher_contenu = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/div[2]/app-prescription/div/div/table/tbody/tr[2]/td[2]/button")
        button_afficher_contenu.click()
        time.sleep(1.5)
        button_x = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/div[2]/app-prescription/div/div/table/tbody/tr[2]/td[2]/app-prescription-button/div/div/svg/path")
        button_x.click()
        button_bilans = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[1]/div/app-radio-group/div/label[3]")
        button_bilans.click()
        time.sleep(3)
        button_go_back = driver.find_element(By.XPATH, "/html/body/app-root/app-dossier/div[2]/app-bouttonretour/button")
        button_go_back.click()
        time.sleep(1.5)
    except:
       print("Erreur dans la visualisation du dossier")
   
def test_rediger_une_ordonnance():
    try:
      time.sleep(3)
      button_commencer = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-liste-patient/div/div/div[1]/app-searchbar/div[2]/table/tbody/tr/td[5]/button")
      button_commencer.click()
      time.sleep(3)
      button_rediger_ordonnance = driver.find_element(By.XPATH, "/html/body/app-root/app-nouvelle-consultation/div/div[1]/div/button[1]")
      button_rediger_ordonnance.click()
      time.sleep(3)
      button_supprimer_medicament = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/div[1]/table/tbody/tr[1]/div")
      button_supprimer_medicament.click()
      time.sleep(1.5)
      button_ajouter = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/button[1]")
      button_ajouter.click()
      time.sleep(1.5)
      medicament = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/div[2]/div/input[1]")
      medicament.send_keys("Xanac")
      time.sleep(1)
      dose = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/div[2]/div/input[2]")
      dose.send_keys("1g")
      time.sleep(1)
      duree = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/div[2]/div/input[3]")
      duree.send_keys("1 semaine")
      time.sleep(1)
      button_confirmer = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/div[2]/button")
      button_confirmer.click()
      time.sleep(1)
      button_enregistrer = driver.find_element(By.XPATH, "/html/body/app-root/app-ordonnance/div/div[2]/button[2]")
      button_enregistrer.click()
      time.sleep(1)
      text_feild = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[2]/div/input")
      text_feild.send_keys("exemple d'un resume")
      time.sleep(1)
      button_enregistrer = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[2]/div/div/button")
      button_enregistrer.click()
      button_go_back = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[3]/app-bouttonretour/button")
      button_go_back.click()

      time.sleep(1.5)
      
    except:
        print("Erreur dans la consultation")

def test_rediger_un_bilan():
    try : 
      time.sleep(3)
      button_commencer = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-liste-patient/div/div/div[1]/app-searchbar/div[2]/table/tbody/tr/td[5]/button")
      button_commencer.click()
      button_rediger_bilan = driver.find_element(By.XPATH, "/html/body/app-root/app-nouvelle-consultation/div/div[1]/div/button[2]")  
      button_rediger_bilan.click()
      time.sleep(3)  
      button_bilan_bilogique = driver.find_element(By.XPATH, "/html/body/app-root/app-bilans/div/div[2]/div[1]/button")
      button_bilan_bilogique.click()
      text_feild = driver.find_element(By.XPATH, "/html/body/app-root/app-demandebio/div/div[1]/input")
      time.sleep(1.5)

      text_feild.send_keys("exemple d'une demande de bilan biologique")
      time.sleep(1)
      button_enregistrer = driver.find_element(By.XPATH, "/html/body/app-root/app-demandebio/div/div[1]/div[2]/button")
      button_enregistrer.click()
      button_go_back = driver.find_element(By.XPATH, "/html/body/app-root/app-demandebio/div/div[2]/app-bouttonretour/button")
      button_go_back.click()
      button_terminer = driver.find_element(By.XPATH, "/html/body/app-root/app-bilans/div/button")
      button_terminer.click() 
      time.sleep(1.5)
      text_feild = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[2]/div/input")
      text_feild.send_keys("exemple d'un resume")
      time.sleep(1)
      button_enregistrer = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[2]/div/div/button")
      button_enregistrer.click()
      button_go_back = driver.find_element(By.XPATH, "/html/body/app-root/app-rediger-resume/div/div[3]/app-bouttonretour/button")
      button_go_back.click()
    except:
        print("Erreur dans la consultation")

def test_log_out():
    try : 
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-info-perso/div/app-menu/div/div[1]/div/div[2]")
        button.click()
        time.sleep(1)
        button = driver.find_element(By.XPATH, "/html/body/app-root/app-profilmedecin/div/div/app-info-perso/div/app-menu/div/div[2]/div/a")
        button.click()
    except:
         print("Erreur dans la deconnexion")
    finally:
        time.sleep(1)
        driver.quit()
        exit()
if __name__ == "__main__":
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True)  
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("http://localhost:4200/")  # the endpoint of the web application
    #premier test
    test_authentification()
    while(True):
        choice  = input("1. Recherche patient\n2. Visualiser dossier\n3. Rediger une ordonnance\n4. Rediger un bilan\n5.log out\n6. Quitter\n")
        if choice == "1":
          #deuxieme test
          test_recherche_patient()
        elif choice == "2":
          #troisieme test
          test_recherche_patient()
          test_visualiser_dossier() 
        elif choice == "3":
          # 4eme test
          test_recherche_patient()
          test_rediger_une_ordonnance()
        elif choice == "4":
            # 5eme test
            test_recherche_patient()
            test_rediger_un_bilan()
        elif choice == "5":
            # 6eme test
            test_log_out()
        elif choice == "6":
            break



    