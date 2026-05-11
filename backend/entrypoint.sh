#!/bin/bash
APP_PORT=${PORT:-8000}
cd /app/

chmod +x migrate.sh
nohup /app/migrate.sh &

nohup /opt/venv/bin/rq worker &
/opt/venv/bin/gunicorn --worker-tmp-dir /dev/shm backend.wsgi:application --bind "0.0.0.0:${APP_PORT}"
