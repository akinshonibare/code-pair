import json
import pymongo
import requests
from selenium import webdriver

data = []

def scrapper():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--log-level=3")
    driver = webdriver.Chrome(chrome_options=options)

    URL = "https://30secondsofcode.org/"
    driver.get(URL)

    cards = driver.find_elements_by_css_selector('div.code-card')

    for i in range(len(cards)):
        card_dict = {}
        card_dict['card_title'] = cards[i].find_element_by_css_selector('div.section.card-content').find_element_by_tag_name('h4').text
        card_description= cards[i].find_element_by_css_selector('div.section.card-content').find_elements_by_tag_name('p')
        card_dict['card_description'] = ''

        for j in range(len(card_description)):
            card_dict['card_description'] = card_dict['card_description'] + card_description[j].text
        
        try:
            card_dict['card_code'] = cards[i].find_element_by_css_selector('pre.section.card-code').text
        except:
            card_dict['card_code'] = ''
        
        try:
            card_dict['card_example'] = cards[i].find_element_by_css_selector('pre.section.card-examples').text
        except:
            card_dict['card_example'] = ''

        # print(card_dict)
        data.append(card_dict)

    driver.close()


def upload(data):
    connection = pymongo.MongoClient('ds239911.mlab.com', 39911)
    db = connection['pair-code']
    db.authenticate('admin', 'password123')

    record = db['snippets']
    record.delete_many({})

    for i in data:
        record.insert_one(i)


scrapper()
upload(data)
