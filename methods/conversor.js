export function msToTimeObject(ms) {
    const totalSeconds = Math.floor(ms / 1000) // Converte ms para segundos inteiros
    const hours = Math.floor(totalSeconds / 3600) // Obtém as horas inteiras
    const minutes = Math.floor((totalSeconds % 3600) / 60) // Obtém os minutos restantes
    const seconds = totalSeconds % 60 // Obtém os segundos restantes

    return { hours, minutes, seconds }
}
