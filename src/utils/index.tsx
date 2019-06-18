export const getDateFromUTC = (utc: number) => {
  const hourSegment = 1000 * 60 * 60
  const minSegment = 1000 * 60
  const secSegment = 1000
  const hours = `${Math.floor(utc / hourSegment)}`
  const minutes = `${Math.floor(utc % hourSegment / minSegment)}`
  const seconds = `${Math.floor(utc % hourSegment % minSegment / secSegment)}`

  return {
    getString(): string {
      return `${hours.length < 2 ? '0' + hours : hours}:${minutes.length < 2 ? '0' + minutes : minutes}:${seconds.length < 2 ? '0' + seconds : seconds}`
    },
    hours(): number {
      return parseInt(hours, 10)
    },
    minutes(): number {
      return parseInt(minutes, 10)
    },
    seconds(): number {
      return parseInt(seconds, 10)
    }
  }
}
