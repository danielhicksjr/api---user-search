const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const httpClient = axios.create()
const PORT = 3000

console.log(process.env)

app.get('/users/:username', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.github.com/users/${req.params.username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    httpClient(options).then((apiResponse) => {
        var name = apiResponse.data.name
        var location = apiResponse.data.location
        var publicRepos = apiResponse.data.public_repos
        var bio = apiResponse.data.bio
        var image = apiResponse.data.avatar_url
        const html = `
            <style>
                body {
                    background-color: darksalmon;
                }
                ul {
                    list-style: none;
                }
            </style>
            <h1>${name}</h1>
            <ul>
                <li>${location}</li>
                <li>Public Repos: ${publicRepos}</li>
                <li>${bio}</li>
            </ul>
            <img src="${image}" />
        `
        res.send(html)
    })
})

app.get('/users/:username/repos', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.github.com/users/${req.params.username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
    }

    httpClient(options).then((apiResponse) => {
        var html = ``
        const repos = apiResponse.data
        console.log(repos)
        repos.forEach((r) => {
            html += r.name
            
        })
        res.send(html)
    })
})

app.listen(PORT, (err) => {
    console.log(err || `Server Running on ${PORT}`)
})