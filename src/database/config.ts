import {Pool} from 'pg'

export const pool = new Pool({
    user: '',
    host: '',
    password: '',
    database: '',
    port: 5432
})