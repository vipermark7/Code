import PySimpleGUI as sg

"""
  This Recipe demonstrates:
  1. Read with a Timeout
  2. Updating an Element in the window
  3. How awesome PySimpleGUI is
"""
print('Startup up...')
sg.ChangeLookAndFeel('Black')

layout = [[sg.Text('Stopwatch', size=(20, 2), justification='center')],
            [sg.Text('', size=(20, 2), font=('Helvetica', 20), justification='center', key='_OUTPUT_')],
            [sg.T(' ' * 5), sg.Button('Start/Stop', focus=True), sg.Quit()]]

window = sg.Window('Running Timer', layout)

timer_running = True
i = 0
# Event Loop
while True:
  i += 1 * (timer_running is True)
  event, values = window.Read(timeout=10) # Please try and use a timeout when possible
  if event is None or event == 'Quit':  # if user closed the window using X or clicked Quit button
      break
  elif event == 'Start/Stop':
      timer_running = not timer_running
  window.FindElement('_OUTPUT_').Update('{:02d}:{:02d}.{:02d}'.format((i // 100) // 60, (i // 100) % 60, i % 100))

window.Close()   # be sure and close the window so the server stops
