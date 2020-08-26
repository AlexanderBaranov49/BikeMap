import { SHOW_DEBUG_LOGS } from '../config';

const TRACE_ENABLED = true;

var log = {
  debug: (message, ...optionalParams) => {
    SHOW_DEBUG_LOGS && console.debug(message, ...optionalParams);
  },
  error: (message, ...optionalParams) => {
    console.error(message, ...optionalParams);
  },
  warn: (message, ...optionalParams) => {
    SHOW_DEBUG_LOGS && console.warn(message, ...optionalParams);
  },
  info: (message, ...optionalParams) => {
    SHOW_DEBUG_LOGS && console.info(message, ...optionalParams);
  },
  trace: (message, ...optionalParams) => {
    SHOW_DEBUG_LOGS && TRACE_ENABLED && console.debug(message, ...optionalParams);
  },
};

export default log;
