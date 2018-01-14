var bs = require('browser-sync')
var historyApiFallback = require('connect-history-api-fallback')

export default async function (task) {
    await task.parallel(['html', 'css']).start('server')
    await task.watch('_dev/css/**/*.*', 'css')
    await task.watch('_dev/html/**/*.*', 'html')
}

export async function html(task) {
    await task.source('_dev/html/index.html').target('./')
    bs.reload('index.html')
}

export async function css(task) {
    await task.source('_dev/css/app.sass').sass().autoprefixer({
        browsers: ['last 5 versions']
    }).postcss({
        plugins: [require('cssnano')({
            discardComments: {
                removeAll: true
            }
        })]
    }).target('./')
    bs.reload('app.css')
}

export async function server(task) {
    bs({
        server: './',
        middleware: [historyApiFallback()]
    })
}