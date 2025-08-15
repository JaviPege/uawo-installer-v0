"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, CheckCircle, Copy } from "lucide-react"

export default function UAWOInstaller() {
  const [copied, setCopied] = useState(false)
  const [showFullTitle, setShowFullTitle] = useState(false)

  const installCommand =
    "/bin/bash -c '$(curl -fsSL https://v0-uawo-installer.vercel.app/install.sh)'"

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFullTitle(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background dark">
      {/* Main Content */}
      <div className="ml-0 md:ml-16 min-h-screen">
        {/* Hero Section */}
        <main className="p-4 md:p-6">
          <div className="mb-12 text-center max-w-4xl mx-auto">
            <div className="mb-4 h-20 md:h-16 flex items-center justify-center px-2">
              <h1
                className={`text-2xl md:text-4xl font-bold text-foreground transition-all duration-1000 ease-in-out leading-tight ${
                  showFullTitle ? "opacity-100 transform scale-100" : "opacity-100 transform scale-110"
                }`}
              >
                {showFullTitle ? (
                  <span className="block md:inline">
                    Universal Application <span className="block md:inline">Workflow Orchestrator</span>
                  </span>
                ) : (
                  "UAWO"
                )}
              </h1>
            </div>

            <p className="text-xl text-muted-foreground mb-8">
              El orquestrador potenciado por IA que agiliza tu negocio
            </p>

            {/* Installation Command */}
            <Card className="bg-card border-border max-w-2xl mx-auto mb-8">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between bg-muted rounded-lg p-3 md:p-4">
                  <Terminal className="h-5 w-5 text-primary flex-shrink-0" />
                  <code className="text-xs md:text-sm font-mono text-card-foreground px-2 text-center flex-1">
                    get.uawo.dev | install
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard} className="flex-shrink-0">
                    {copied ? <CheckCircle className="h-4 w-4 text-chart-2" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Pulsa el botón copiar que está a la derecha
                </p>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="mb-12" id="features">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">¿Cómo lo instalo?</h2>
              <p className="text-muted-foreground mb-8 text-center px-4">
                Lee las instrucciones a continuación, es tan sencillo como 1-2-3.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
                {/* Copy-clipboard */}
                <Card className="bg-card border-border">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <Copy className="h-5 w-5 text-chart-2" />
                      Copia el comando
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Pulsa sobre el icono de copiar, que tienes al lado del comando.
                    </p>
                  </CardContent>
                </Card>

                {/* Open-Terminal */}
                <Card className="bg-card border-border">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <Terminal className="h-5 w-5 text-primary" />
                      Abre Terminal
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Abre la aplicación "Terminal" de tú mac.
                    </p>
                  </CardContent>
                </Card>

                {/* Secure */}
                <Card className="bg-card border-border">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-chart-3" />
                      Pega el comando
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Pega el comando que copiaste en el paso 1 en el "Terminal" que abriste en el paso 2 y pulsa ENTER.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
