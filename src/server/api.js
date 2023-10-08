import axios from "axios"

export async function handleSearch(input, setAdress, setIsLoading, setError) {
  setIsLoading(true)
  setError(null)

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${input}/json`)

    if (response.data.erro) {
      setError("CEP não encontrado, verifique e tente novamente!")
    } else {
      setAdress({
        cep: response.data.cep,
        logradouro: response.data.logradouro || "Não Informado",
        bairro: response.data.bairro || "Não Informado",
        localidade: response.data.localidade,
        uf: response.data.uf,
      })
    }
  } catch (err) {
    setError("Ocorreu um erro inesperado")
  } finally {
    setIsLoading(false)
  }
}
