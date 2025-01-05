from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)  

driver = webdriver.Chrome(options=chrome_options)

def test_authentification():    
    # Open the target web page
    driver.get("http://localhost:4200/")  # the endpoint of the web application 

    # Wait for the page to load completely
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "app-background-video")) 
    )

    # Locate and click the "Commencer" button
    commencer_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Commencer')]"))
    )
    commencer_button.click()



    # Enter username
    username_field = driver.find_element(By.ID, "username")
    # username = input("Enter test username: ")
    username = 'medecin_user'
    username_field.send_keys(username)  

    # Enter password
    password_field = driver.find_element(By.ID, "password")
    # password = input("Enter test password: ")
    password = '123456'
    password_field.send_keys(password)  
    driver.implicitly_wait(5)

    # Verify the token is present in localStorage
    token = driver.execute_script("return localStorage.getItem('token');")
    # Submit the login form
    submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Se connecter')]")
    submit_button.click()
    driver.implicitly_wait(5)


    # Wait for authentication result
    try:
        welcome_message = WebDriverWait(driver, 10).until(

            EC.presence_of_element_located((By.CSS_SELECTOR, "body > app-root > app-profilmedecin > div > app-left-sidebar > div > ul > li:nth-child(1)"))
        )
        print("Welcome message found:", welcome_message)
    except:
        print("Welcome message not found")



if __name__ == "__main__":
    test_authentification()