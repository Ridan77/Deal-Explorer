export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout = 700
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), timeout)
  }
}
