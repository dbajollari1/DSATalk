// {
//   "type": "service_account",
//   "project_id": "dsatalks-b8533",
//   "private_key_id": "f8d716833fb1631670f9c0ded84a380bcd25b235",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzs07y9bEyFgt8\nZrfmSKvg/B/aXhoeARez7s4BIaG/vqrxuE1190wO2Gl2YLrsn9qdfA5GN7bqegEI\nmHyr7HXu7nFuxxkID1QtSb7C16YPIJfzYQzrOptW8dQSAnaSHY3SdAgJ+DpgR6gA\n2q1mz9g1OWHXw7bzyZUkqxWAX8hkFcyr/hdvrgLRAPM8ejmSfg9SShPwilpgRHag\nJ0FaNMihnFwrTYGt0KknrbIFL+xqE4k4ElNLtqHosNeLG7SmYSDK0nvysaYjhp1G\nsIBSnEyaAgpTVl6S1/az6jiBoLyXm2i6vUcoYiWFPqxjlWr16BICkcVe/DhRHy2h\nufxqkMO/AgMBAAECggEAECisYupB9qbcfeFqDFH2QWMakCh3FmydujHb92ZpT5SF\nyvpPiNnlzniaXyk1QH2NYIJHxvulPfIeRqzDmogcVhG97yqwbwpF1P61IdCCH7PG\nxigGITQ3b2WL3toMLyPA3YROjBWfVjS2AEGpvGgt4SIEUNfKC05R/tFIO9ohFb1o\ntoYpQAqfYRCPlfu/K9SlfbjnqmqeD+qwh39+nSet2mJ0cD03uMh8oD0CZOKRfkP6\nWFAjR+zdT/fLQyfNxFG0NkRpYYmb52rTH3keQpFDGG9IzjsbFRUVduQhO/Esc6TV\nPbGBgyi66hKiiq9aztHDazCRLgWczxNcXwFTjnWnwQKBgQDpMo3X1aLFAB5huxVr\nsJh7U3jaX6J7N9vNDDBo35Fmqjed7gyGNDzng5wekt45crjD3RPKAB5XgeFSnrTk\nChazpFOnUI0A+QtN+yVXZi3nuzp/Il6vUToVzPg4gufds12IoXeHM09muGr+ye5o\nZK/dsmIWeoitg/ny9pitLw8/QQKBgQDFRZr5ccBgNmDXozvRqIjmKS7k2AMfxC52\nUy/MS3p7woN0rBWnCNOS7Pv6/3rBW//YjPOBc5yF4OFKbR5/ZqwhDxj4tJOhSpiB\ny7mYL/rMys844PgXRdZxWy4HYHABIzewrsLP81qis/DWAeJfDQ6beJuhXxPQkLZ7\nGJVdSZJC/wKBgQDjzoUOch7eQC1t36sfVpa+814+ReqeYIUSnHO2H6EVH/fRCjml\n6OYObF1Y6LS6fj3M6O1qCg+aAMEzSuL/WnOu7jriWihE6QWIGm3yIVl65UZR6CuD\nLOCHZ4KdAhSsWYpn7QStSQyqFkI/wNhrluDOvHJh7zYR+7lzBj9D/5LvgQKBgQCT\nbxYH36/7OCjggKqwYtkNyzG07oxHLYPcAwfyE2cTH6jHheUY1UvqvxsD1/SSloN8\nALvsv873b75wtWTZqo5ylqn/FlZPcUTRnMS0rQcwD1MYG2rPWe6PAapA8R5Ee2Gf\ntrz6VdIjT4BrMTVR/JwyLc2CqWBRvBXlodXfxqB9WQKBgDp8d4ekH7+iE5DAUdJU\ne9hMExtRCL0+KpVDM9zgzPkdU8AM9wxm5zp90xOWSNWpL4ArISw/fl2PHjQq/WBR\nEjvzw6UunihHnZO22Xc0hKv+7OG5DsPbVjLNTBSUHo0fpwLC4R3/gIBw6+RyoOeX\nk6GBkxm7v3nVGYv13XIOdoOr\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-7m4hk@dsatalks-b8533.iam.gserviceaccount.com",
//   "client_id": "100051521207079659643",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7m4hk%40dsatalks-b8533.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
import * as dotenv from 'dotenv';
dotenv.config();


const type =  process.env.TYPE;
const project_id= process.env.PROJECT_ID;
const private_key_id = process.env.PRIVATE_KEY_ID;
const private_key = process.env.PRIVATE_KEY.replace(/\\n/gm, "\n");
const client_email = process.env.CLIENT_EMAIL;
const client_id =  process.env.CLIENT_ID;
const auth_uri =   process.env.AUTH_URI;
const token_uri =  process.env.TOKEN_URI;
const auth_provider_x509_cert_url =  process.env.AUTH_PROVIDER_X509_CERT_URL;
const client_x509_cert_url = process.env.CLIENT_X509_CERT_URL;
const universe_domain = process.env.UNIVERSE_DOMAIN;

export default {
  type: type,
  project_id: project_id,
  private_key_id: private_key_id,
  private_key: private_key,
  client_email: client_email,
  client_id: client_id, 
  auth_uri: auth_uri, 
  token_uri: token_uri, 
  auth_provider_x509_cert_url: auth_provider_x509_cert_url, 
  client_x509_cert_url: client_x509_cert_url, 
  universe_domain: universe_domain
};