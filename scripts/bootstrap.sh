#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
action=${1:-up}
case "$action" in
  help|--help|-h) echo 'Usage: ./scripts/bootstrap.sh [up|down|logs|doctor|test]'; exit 0 ;;
  up|down|logs|doctor|test) ;;
  *) echo "Unknown command: $action. Use --help." >&2; exit 2 ;;
esac
if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1 || ! docker info >/dev/null 2>&1; then
  echo "Start Docker with the Compose v2 plugin, then retry." >&2; exit 1
fi
if [[ ! -e .env ]]; then cp .env.example .env; fi
docker compose config --quiet
case "$action" in
  down) exec docker compose down ;;
  logs) exec docker compose logs --follow --tail=100 ;;
  doctor) echo 'Docker and Compose configuration are ready.'; exit 0 ;;
  up|test)
    docker compose up --build --detach --wait --wait-timeout 120
    docker compose ps
    # Read only the public port from Compose output; never source .env as shell code.
    published=$(docker compose port web 8080)
    printf '\nReady at http://%s\n' "$published"
    ;;
esac
