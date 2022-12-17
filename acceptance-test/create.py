import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.set_window_size(1300,1000)
driver.get("http://localhost:3000/")
study = driver.find_element(By.CLASS_NAME,"give-classes")
study.click()
time.sleep(1)

def testEmptyName():
    save = driver.find_element(By.CSS_SELECTOR,"footer button")
    save.click()
    time.sleep(1)
    alert = driver.switch_to.alert
    assert alert.text == "Erro no cadastro: Nome não preenchido"
    alert.accept()

def testEmptyBio():
    name = driver.find_element(By.ID,"name")
    name.send_keys("Morpheus")
    time.sleep(1)

    save = driver.find_element(By.CSS_SELECTOR,"footer button")
    save.click()
    time.sleep(1)

    alert = driver.switch_to.alert
    assert alert.text == "Erro no cadastro: Biografia não preenchida"
    alert.accept()

def testEmptySubject():
    bio = driver.find_element(By.ID,"bio")
    bio.send_keys("Professor muito bom e modesto")
    time.sleep(1)

    save = driver.find_element(By.CSS_SELECTOR,"footer button")
    save.click()
    time.sleep(1)

    alert = driver.switch_to.alert
    assert alert.text == "Erro no cadastro: Matéria não preenchida"
    alert.accept()

def testInvalidWhatsapp():
    subject = driver.find_element(By.ID,"subject")
    subject.send_keys("matemática")
    time.sleep(1)
    subject.send_keys(Keys.ENTER)
    time.sleep(1)
    
    whatsapp = driver.find_element(By.ID,"whatsapp")
    whatsapp.send_keys("(31) 99999-9999 x")
    time.sleep(1)

    save = driver.find_element(By.CSS_SELECTOR,"footer button")
    save.click()
    time.sleep(1)

    alert = driver.switch_to.alert
    assert alert.text == "Erro no cadastro: Número de whatsapp inválido"
    alert.accept()

def testInvalidValue():
    whatsapp = driver.find_element(By.ID,"whatsapp")
    whatsapp.send_keys(Keys.BACKSPACE)
    time.sleep(1)

    cost = driver.find_element(By.ID,"cost")
    cost.send_keys("13")
    time.sleep(1)

    save = driver.find_element(By.CSS_SELECTOR,"footer button")
    save.click()
    time.sleep(1)

    alert = driver.switch_to.alert
    assert alert.text == "Erro no cadastro: Valor inválido, deve estar entre R$20 e R$200"
    alert.accept()

testEmptyName()
testEmptyBio()
testEmptySubject()
testInvalidWhatsapp()
testInvalidValue()

driver.quit()