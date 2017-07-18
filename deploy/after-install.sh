# deploy/after-install.sh
#!/bin/bash
source /home/ec2-user/.bash_profile
cd /var/node/rtsmapi
npm cache clean
npm install
sudo chown -R ec2-user /var/node/rtsmapi
sudo chgrp -R ec2-user /var/node/rtsmapi
chmod -R 755 /var/node/rtsmapi
mkdir log
touch ./log/accesslog.log
pm2 start /var/node/rtsmapi/index.js --name='rtsmapi'
