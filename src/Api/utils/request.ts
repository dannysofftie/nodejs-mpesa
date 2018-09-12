/*
MIT License

Copyright (c) 2018 Danny Sofftie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as https from 'https'
import config from './config'

/**
 * A to level http post utility
 * @param token access token
 * @param path api endpoint url
 * @param data data to send to mpesa
 */
export default function (token: string, path: string, data: {}) {
    return new Promise((resolve, reject) => {
        let request = https.request({
            host: config.baseurl,
            path: path,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }, (response) => {
            response.on('error', error => reject(error))
            response.on('data', data => resolve(JSON.parse(data.toString())))
        })
        request.write(JSON.stringify(data))
        request.on('error', error => reject(error))
        request.end()
    })
}