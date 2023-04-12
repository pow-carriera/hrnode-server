import morgan from "morgan";
morgan(':method :url :status :res[content-length] - :response-time ms')
export default morgan;