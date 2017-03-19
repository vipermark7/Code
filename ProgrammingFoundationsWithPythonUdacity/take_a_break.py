import webbrowser as wb
import time

totalBreaks = 3
breakCount = 0

print("This program started on "+time.ctime())
while(breakCount < totalBreaks)
    time.sleep(2*60*60)
    webbrowser.open("http://www.adweek.com/core/wp-content/uploads/sites/socialtimes/2014/10/keyboard-break.jpg")
    breakCount = breakCount + 1
    
