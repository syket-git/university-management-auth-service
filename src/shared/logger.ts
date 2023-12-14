import path from 'path'
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, prettyPrint } = format

const formatMsg = combine(
  label({ label: 'University Management' }),
  timestamp(),
  prettyPrint(),
)

const logger = createLogger({
  level: 'info',
  format: formatMsg,
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),

    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: formatMsg,
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),

    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

export { errorLogger, logger }
