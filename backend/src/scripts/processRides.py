from bs4 import BeautifulSoup
import json


def stringToSeconds(timeString):
    split = timeString.split(" ")
    mins = split[0]
    secs = split[2]
    minSecs = int(mins)*60
    return minSecs+int(secs)


with open('trips.htm', 'r') as file:
    data = file.read()
    soup = BeautifulSoup(data, 'html.parser')

rideID = 0
rides = []

for tr in soup.tbody:
    ride = {"duration":None,"start_station":None,"end_station":None,"start_time":None,"end_time":None}
    columns = tr.find_all('td')
    colNum = 0
    for column in columns:
        divs = column.find_all('div')
        if(not divs):
            secs = stringToSeconds((column.string).strip())
            ride["duration"] = secs
        elif(colNum==0):
            ride["start_station"] = (divs[1].string).strip()
            ride["start_time"] = (divs[0].string).strip()
        else:
            ride["end_station"] = (divs[1].string).strip()
            ride["end_time"] = (divs[0].string).strip()
        colNum+=1
    rides.append(ride)
    rideID+=1

print(json.dumps(rides))
            