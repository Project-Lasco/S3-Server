from asyncio import subprocess
import os
import time
import subprocess

import signal


p = subprocess.Popen(["npm", "run", "dev"])
while True:
    pulld = subprocess.check_output(["git", "pull"]).decode('utf-8')
    if "Already up to date." in pulld:
        print("Already up to date. No build necessary")
    else:
        print("Updated. Installing dependencies and starting nodemon...")
        p.kill()
        subprocess.call(["killall", "-9", "node"])
        os.kill(p.pid, signal.SIGKILL)
        subprocess.Popen(["npm", "run", "dev"])
        # subprocess.call(["npm", "run", "dev"])
    time.sleep(10)