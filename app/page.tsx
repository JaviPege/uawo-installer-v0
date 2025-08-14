"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, CheckCircle, Copy } from "lucide-react"

export default function UAWOInstaller() {
  const [copied, setCopied] = useState(false)
  const installCommand =
    "/bin/bash -c '$(curl -fsSL https://raw.githubusercontent.com/JaviPege/uawo-installer/main/install.sh)'"

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Main Content */}
      <div className="ml-16 min-h-screen">
        {/* Hero Section */}
        <main className="p-6">
          <div className="mb-12 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Universal Application Workflow Orchestrator</h1>
            <p className="text-xl text-muted-foreground mb-8">
              El orquestrador potenciado por IA que agiliza tu negocio
            </p>

            {/* Installation Command */}
            <Card className="bg-card border-border max-w-2xl mx-auto mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between bg-muted rounded-lg p-4">
                  <Terminal className="h-5 w-5 text-primary" />
                  <code className="text-sm font-mono text-card-foreground">get.uawo.dev | install</code>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
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
              <p className="text-muted-foreground mb-8 text-center">
                Lee las instrucciones a continuación, es tan sencillo como 1-2-3.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Copy-clipboard */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <Copy className="h-5 w-5 text-chart-2" />
                      Copia el comando
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pulsa sobre el icono de copiar, que tienes al lado del comando.
                    </p>
                  </CardContent>
                </Card>

                {/* Open-Terminal */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <Terminal className="h-5 w-5 text-primary" />
                      Abre Terminal
                    </h3>
                    <p className="text-sm text-muted-foreground">Abre la aplicación "Terminal" de tú mac.</p>
                  </CardContent>
                </Card>

                {/* Secure */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-chart-3" />
                      Pega el comando
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
