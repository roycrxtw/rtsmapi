# deploy/before-install
#!/bin/bash
pm2 delete rtsmapi
cp /var/node/rtsmapi/config ~/backup/rtsmapi/
cp /var/node/rtsmapi/log ~/backup/rtsmapi/
shopt -s extglob
rm -fr /var/node/rtsmapi/.gitignore
rm -fr /var/node/rtsmapi/!(config|node_modules|log)
shopt -u extglob
