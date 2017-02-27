#gui code for pomodoro timer

#!/usr/bin/python
import tkinter
class simpleapp_tk(Tkinter.Tk):
    def__init__(self,parent):
        Tkinter.Tk.__init__(self,parent)
        self.parent = parent
        self.initialize()
    def initialize(self)
        self.grid()

        self.entry = Tkinter.Entry(self)
        self.entry.grid(column=0,row=0,sticky='EW')

if __name__ == "__main__":
    app = simpleapp_tk(None)
    app.title('my application')
        app.mainloop()
