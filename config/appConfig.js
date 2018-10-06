let appConfig = {}

appConfig.port = 3000
appConfig.allowedCorsOrigin = "*"
appConfig.env = "dev"
appConfig.db = {
    url: 'mongodb://test:test@127.0.0.1:27017/blogDB'
}
appConfig.apiVersion = '/api/v1'