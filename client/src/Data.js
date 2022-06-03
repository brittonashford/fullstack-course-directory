
import React from 'react';
import { Buffer } from 'buffer';
import config from './config';


export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
      
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
    
        if (body !== null) {
          options.body = JSON.stringify(body);
        }
    
        if (requiresAuth) {    
            //VSC says that btoa is deprecated:
            // This function is only provided for compatibility with legacy web platform APIs and 
            // should never be used in new code, because they use strings to represent binary data 
            // and predate the introduction of typed arrays in JavaScript. For code running using 
            // Node.js APIs, converting between base64-encoded strings and binary data should be 
            // performed using Buffer.from(str, 'base64') andbuf.toString('base64').

            console.log(credentials);
            const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64');
            // console.log(credentials);
            // const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            console.log(encodedCredentials);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }


    //get course list
    getCourseList = async() => {
        console.log('Data.getCourseList() hit. Did it return data?')
        const response = await this.api('/courses')
        console.log(response);
        if (response.status === 200) {
            console.log('getCourseList API call succeeded! Results:');
            console.log(response.data);
            return response.json().then(data => data);
        } else {
            console.log(`getCourseList API call failed. Response status: ${response.status}`);
            throw new Error();
        }
    }

    //get course detail
    getCourseDetail = async(id) => {
        console.log('Data.getCourseDetail() hit. Did it return data?')
        const response = await this.api(`/courses/${id}`);
        if (response.status === 200) {
            console.log('getCourseDetail API call succeeded! Results:');
            console.log(response.data);
            return response.json().then(data => data);
        } else {
            console.log(`getCourseDetail API call failed. Response status: ${response.status}`);
            throw new Error();
        }
    }

    //create new user
    createUser = async(user) => {
        console.log('Data.createUser() hit');
        const response = await this.api(`/users`, 'POST', user);
        if (response.status === 201) {
            console.log(`createUser POST request succeeded! Response status: ${response.status}`);
            console.log(user, response.data);
            return [];
        } else if (response.status === 400) {
            console.log(`response status: ${response.status}`)
            return response.json().then(data => { return data.errors; });
        }
        else {
            console.log(`response status: ${response.status}`)
            throw new Error();
        }
    }

    //get user
    getUser = async(emailAddress, password) => {
        console.log('Data.getUser() hit.');
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });

        if (response.status === 200) {
            console.log('getUser() successful!');
            return response.json().then(data => data);
        } else if (response.status === 401) {
            console.log('user not found.', emailAddress, password);
            return null;
        } else {
            console.log(response.status);
            throw new Error();
            }
    }


    //create new course





    //update course





    //delete course




}