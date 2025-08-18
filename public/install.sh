#!/bin/bash

# =========================================================================
# 🚀 UAWO - One-Click Installer
# =========================================================================
# Public installer script - Downloads and executes private installer
# Usage: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/USER/installer/main/install.sh)"
# =========================================================================

set -euo pipefail

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m'

# Configuration
readonly PRIVATE_REPO="JaviPege/uawo-installer"
readonly PRIVATE_INSTALLER_PATH="installer-main.sh"

# =========================================================================
# 🎨 UI Functions
# =========================================================================

print_header() {
    echo -e "${BLUE}"
    cat << 'EOF'
    ██╗   ██╗ █████╗ ██╗    ██╗ ██████╗ 
    ██║   ██║██╔══██╗██║    ██║██╔═══██╗
    ██║   ██║███████║██║ █╗ ██║██║   ██║
    ██║   ██║██╔══██║██║███╗██║██║   ██║
    ╚██████╔╝██║  ██║╚███╔███╔╝╚██████╔╝
     ╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝  ╚═════╝ 
    
    🚀 One-Click Installer
EOF
    echo -e "${NC}"
}

log() {
    local level="$1"
    shift
    local message="$*"
    
    case "$level" in
        "INFO")
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
        "WARNING")
            echo -e "${YELLOW}[WARNING]${NC} $message"
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} $message"
            ;;
    esac
}

# =========================================================================
# 🔐 Authentication
# =========================================================================

get_github_token() {
    echo -e "\n${YELLOW}🔐 Autenticación GitHub${NC}"
    echo "Necesitas un token de GitHub para continuar."
    echo ""
    
    local token=""
    while [[ -z "$token" ]]; do
        read -s -p "🔑 Pega el token aquí: " token
        echo ""
        
        if [[ -z "$token" ]]; then
            echo -e "${RED}❌ Token requerido para continuar${NC}"
            echo ""
        fi
    done
    
    echo "$token"
}

validate_github_access() {
    local token="$1"
    
    log "INFO" "Validando acceso a GitHub..."
    
    # Test access to private repo
    local test_url="https://api.github.com/repos/${PRIVATE_REPO}"
    local response=$(curl -s -H "Authorization: token ${token}" "$test_url")
    
    if echo "$response" | grep -q '"message": "Not Found"'; then
        log "ERROR" "No se puede acceder al repositorio. Verifica el token."
        return 1
    fi
    
    if echo "$response" | grep -q '"message": "Bad credentials"'; then
        log "ERROR" "Token inválido. Verifica el token e intenta de nuevo."
        return 1
    fi
    
    log "SUCCESS" "Acceso a GitHub validado"
    return 0
}

# =========================================================================
# 📥 Download and Execute
# =========================================================================

download_and_execute() {
    local token="$1"
    
    log "INFO" "Descargando instalador..."
    
    # Create temporary directory
    local temp_dir=$(mktemp -d)
    local installer_path="${temp_dir}/installer-main.sh"
    
    # Download private installer
    local download_url="https://raw.githubusercontent.com/${PRIVATE_REPO}/main/${PRIVATE_INSTALLER_PATH}"
    
    if ! curl -f -H "Authorization: token ${token}" -o "$installer_path" "$download_url"; then
        log "ERROR" "Error al descargar el instalador: $download_url"
        rm -rf "$temp_dir"
        return 1
    fi
    
    # Verify download
    if [[ ! -f "$installer_path" ]] || [[ ! -s "$installer_path" ]]; then
        log "ERROR" "El archivo descargado está vacío"
        rm -rf "$temp_dir"
        return 1
    fi
    
    log "SUCCESS" "Instalador descargado correctamente"
    
    # Make executable and run
    chmod +x "$installer_path"
    
    log "INFO" "Iniciando instalación de UAWO..."
    echo ""
    
    # Export token for use by private installer
    export GITHUB_TOKEN="$token"
    export PRIVATE_REPO="$PRIVATE_REPO"
    
    # Execute private installer
    "$installer_path"
    
    # Cleanup
    rm -rf "$temp_dir"
}

# =========================================================================
# 🔧 Main Function
# =========================================================================

main() {
    print_header
    
    echo "¡Bienvenida al instalador de UAWO!"
    echo "Esto configurará todo lo que necesitas para empezar a probar UAWO."
    echo ""
    
    # Get GitHub token
    local github_token=$(get_github_token)
    
    # Validate access
    if ! validate_github_access "$github_token"; then
        echo ""
        echo -e "${RED}❌ Instalación cancelada${NC}"
        echo "Verifica tu token de GitHub e intenta de nuevo."
        exit 1
    fi
    
    echo ""
    
    # Download and execute private installer
    if download_and_execute "$github_token"; then
        log "SUCCESS" "🎉 ¡Instalación de UAWO completada!"
    else
        log "ERROR" "❌ Instalación fallida"
        echo "Revisa los mensajes de error e intenta de nuevo."
        exit 1
    fi
}

# =========================================================================
# 🚀 Execution
# =========================================================================

# Trap for cleanup
trap 'echo -e "\n${YELLOW}Instalación interrumpida${NC}"; exit 1' INT TERM

main "$@"