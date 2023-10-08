import React, { useState } from "react"
import { PiMagnifyingGlassBold } from "react-icons/pi"
import { PiMapPinLineBold } from "react-icons/pi"
import { handleSearch } from "../server/api.js"
function App() {
  const [input, setInput] = useState("")
  const [adress, setAdress] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCEPInputChange = (event) => {
    const value = event.target.value.replace(/\D/g, "") // Remove não-dígitos
    if (value.length <= 8) {
      setInput(value)
    }
  }

  const performSearch = async () => {
    await handleSearch(input, setAdress, setIsLoading, setError)

    setInput("")
  }

  return (
    <div className="App">
      <div className="container">
        <h1>
          Busca
          <PiMapPinLineBold size={72} color="#E95568" />
          <span className="bold">CEP</span>
        </h1>

        <div className="containerInput">
          <input
            type="text"
            placeholder="CEP para consulta"
            value={input}
            onChange={handleCEPInputChange}
          />

          <button onClick={performSearch} disabled={isLoading}>
            <PiMagnifyingGlassBold size={24} color="#E95568" />
          </button>
        </div>

        {(adress.cep || error || isLoading) && (
          <main className="main">
            {isLoading && <span>Carregando...</span>}
            {error && <span>{error}</span>}
            {!isLoading && !error && (
              <>
                <h2>CEP: {adress.cep}</h2>
                <span>Logradouro: {adress.logradouro}</span>
                <span>Bairro: {adress.bairro}</span>
                <span>
                  {adress.localidade} - {adress.uf}
                </span>
              </>
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default App
