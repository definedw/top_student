export const baseUrl =
  import.meta.env.MODE == 'development'
    ? 'http://103.60.20.50'
    : 'https://apism.top.edu.au'

/* request response type */
export const contentType = 'application/json;charset=UTF-8'

/* request timeout limit */
export const requestTimeout = 10000

/* timeout try times */
export const timeNum = 3

/* re-request time */
export const intervalTime = 1000

/* response code table */
export const resCode = [204, 401, 403, 404, 406, 500]
