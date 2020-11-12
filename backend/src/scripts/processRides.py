from bs4 import BeautifulSoup

with open('trips.htm', 'r') as file:
    data = file.read()
    soup = BeautifulSoup(data, 'html.parser')

rideID = 0
rides = {}

for tr in soup.tbody:
    rides[rideID] = {'duration':None,'start_station':None,'end_station':None,'start_time':None,'end_time':None}
    columns = tr.find_all('td')
    colNum = 0
    for column in columns:
        divs = column.find_all('div')
        if(not divs):
            rides[rideID]['duration'] = (column.string).strip()
        elif(colNum==0):
            rides[rideID]['start_station'] = (divs[1].string).strip()
            rides[rideID]['start_time'] = (divs[0].string).strip()
        else:
            rides[rideID]['end_station'] = (divs[1].string).strip()
            rides[rideID]['end_time'] = (divs[0].string).strip()
        colNum+=1
    rideID+=1

print(rides)
            
