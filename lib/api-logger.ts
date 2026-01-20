import fs from 'fs'
import path from 'path'

/**
 * Утилита для логирования API запросов
 * Работает только на сервере (Node.js окружение)
 */

interface ApiLogEntry {
  timestamp: string
  method: string
  url: string
  status?: number
  statusText?: string
  responseTime?: number
  error?: string
  responseSize?: number
  origin?: string
  referer?: string
}

class ApiLogger {
  private logDir: string
  private logFile: string
  private isServer: boolean

  constructor() {
    // Проверяем, что мы на сервере
    this.isServer = typeof window === 'undefined'
    
    if (this.isServer) {
      // Создаем директорию для логов
      this.logDir = path.join(process.cwd(), 'logs')
      this.logFile = path.join(this.logDir, 'api.log')
      
      // Создаем директорию если её нет
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true })
      }
    } else {
      this.logDir = ''
      this.logFile = ''
    }
  }

  /**
   * Логирование запроса к API
   */
  logRequest(
    method: string,
    url: string,
    status?: number,
    statusText?: string,
    responseTime?: number,
    error?: string,
    responseSize?: number,
    origin?: string,
    referer?: string
  ): void {
    if (!this.isServer) {
      // На клиенте просто выводим в консоль
      if (error) {
        console.error(`[API] ${method} ${url} - ERROR: ${error}`)
      } else {
        console.log(`[API] ${method} ${url} - ${status} ${statusText || ''}`)
      }
      return
    }

    const entry: ApiLogEntry = {
      timestamp: new Date().toISOString(),
      method,
      url,
      status,
      statusText,
      responseTime,
      error,
      responseSize,
      origin,
      referer,
    }

    const logLine = this.formatLogEntry(entry)
    
    try {
      // Добавляем запись в файл
      fs.appendFileSync(this.logFile, logLine + '\n', 'utf8')
    } catch (err) {
      console.error('Failed to write API log:', err)
    }
  }

  /**
   * Форматирование записи лога
   */
  private formatLogEntry(entry: ApiLogEntry): string {
    const parts = [
      `[${entry.timestamp}]`,
      entry.method,
      entry.url,
    ]

    if (entry.error) {
      parts.push(`ERROR: ${entry.error}`)
    } else if (entry.status !== undefined) {
      parts.push(`STATUS: ${entry.status}`)
      if (entry.statusText) {
        parts.push(`(${entry.statusText})`)
      }
    }

    if (entry.responseTime !== undefined) {
      parts.push(`TIME: ${entry.responseTime}ms`)
    }

    if (entry.responseSize !== undefined) {
      parts.push(`SIZE: ${entry.responseSize} bytes`)
    }

    if (entry.origin) {
      parts.push(`ORIGIN: ${entry.origin}`)
    }

    if (entry.referer) {
      parts.push(`REFERER: ${entry.referer}`)
    }

    return parts.join(' | ')
  }

  /**
   * Получить путь к файлу логов
   */
  getLogFile(): string {
    return this.logFile
  }
}

// Экспортируем singleton экземпляр
export const apiLogger = new ApiLogger()

