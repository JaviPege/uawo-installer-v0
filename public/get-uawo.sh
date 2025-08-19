#!/bin/bash

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Header
echo -e "${BLUE}"
cat << 'EOF'
    ██╗   ██╗ █████╗ ██╗    ██╗ ██████╗ 
    ██║   ██║██╔══██╗██║    ██║██╔═══██╗
    ██║   ██║███████║██║ █╗ ██║██║   ██║
    ██║   ██║██╔══██║██║███╗██║██║   ██║
    ╚██████╔╝██║  ██║╚███╔███╔╝╚██████╔╝
     ╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝  ╚═════╝ 
    
    🚀 One-Click Installer - latest
EOF
echo -e "${NC}"

echo "¡Bienvenida al instalador de UAWO!"
echo ""

# Get token
read -p "🔑 Pega tu GitHub token: " token
echo ""

if [[ -z "$token" ]]; then
    error "Token requerido"
fi

log "Validando token..."

# Test token
if ! curl -s -H "Authorization: token $token" https://api.github.com/repos/JaviPege/uawo-installer | grep -q '"name": "uawo-installer"'; then
    error "Token inválido o sin acceso"
fi

success "Token válido"

# Create temp dir
TEMP_DIR=$(mktemp -d)
INSTALLER="$TEMP_DIR/installer-main.sh"

log "Descargando installer principal..."

# Download - SIMPLE WORKING VERSION
curl -H "Authorization: token $token" https://raw.githubusercontent.com/JaviPege/uawo-installer/main/installer-main.sh > "$INSTALLER" 2>/dev/null

if [[ ! -s "$INSTALLER" ]]; then
    error "Fallo al descargar installer"
fi

success "Installer descargado"

# Execute
chmod +x "$INSTALLER"
export GITHUB_TOKEN="$token"
export PRIVATE_REPO="JaviPege/uawo-installer"

log "Ejecutando installer..."
"$INSTALLER"

# Cleanup
rm -rf "$TEMP_DIR"