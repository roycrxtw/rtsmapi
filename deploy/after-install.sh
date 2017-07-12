# deploy/after-install.sh
#!/bin/bash
source /home/ec2-user/.bash_profile
npm install
sudo chown -R ec2-user /var/node/rtsmapi
sudo chgrp -R ec2-user /var/node/rtsmapi
chmod -R 755 /var/node/rtsmapi
cd /var/node/rtsmapi
mkdir log
pm2 start /var/node/rtsmapi/index.js --name='rtsmapi'
