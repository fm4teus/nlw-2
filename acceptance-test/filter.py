import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.set_window_size(1300,1000)
driver.get("http://localhost:3000/")
study = driver.find_element(By.CLASS_NAME,"study")
study.click()
time.sleep(1)

def testWithoutFilters():
    teachers = driver.find_elements(By.CLASS_NAME,"teacher-item")
    time.sleep(1)

    assert len(teachers) == 3    

def testWithSubjectFilter():
    subject = driver.find_element(By.ID,"subject")
    subject.send_keys("biologia")
    subject.send_keys(Keys.ENTER)

    search = driver.find_element(By.TAG_NAME,"button")
    search.click()

    teachers = driver.find_elements(By.CLASS_NAME,"teacher-item")
    time.sleep(1)

    assert len(teachers) == 2

def testWithSubjectAndTimeFilters():
    classTime = driver.find_element(By.ID, "time")
    classTime.send_keys("1600")
    classTime.send_keys(Keys.ENTER)

    teachers = driver.find_elements(By.CLASS_NAME,"teacher-item")
    time.sleep(1)

    assert len(teachers) == 1

testWithoutFilters()
testWithSubjectFilter()
testWithSubjectAndTimeFilters()

driver.quit()