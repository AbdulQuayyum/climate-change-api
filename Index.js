const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const port = 8888

const newspapers = require("./Utilities/Index")

const articles = []

app.get('/', (req, res) => {
    res.json('This is a Climate Change News API')
})

app.get('/News', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({ title, url })
            })
            res.json(articles)
        }).catch((err) => {
            console.error(err)
        });
})

app.listen(port, () => console.log(`Project is running on port ${port}!`))