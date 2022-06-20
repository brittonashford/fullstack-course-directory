
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

            console.log(encodedCredentials);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    //get course list
    getCourseList = async() => {
        console.log('Data.getCourseList() hit.')
        const response = await this.api('/courses')

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
        console.log('Data.getCourseDetail() hit.')
        const response = await this.api(`/courses/${id}`);

        if (response.status === 200) {
            console.log('getCourseDetail API call succeeded!');
            return response.json().then(data => data);
        } else {
            console.log(`getCourseDetail API call failed. Response status: ${response.status}`);
            throw new Error();
        }
    }

    //create new user
    createUser = async(user) => {
        console.log('Data.createUser() hit.');
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

        //no news is good news
        if (response.status === 200) {
            console.log('getUser() successful!');
            return response.json().then(data => data);
        //else handle not found, forbidden, and server error
        } else if (response.status === 400 || response.status === 401 || response.status === 500) {
            console.log('getUser() errored using params: .', emailAddress, password);
            return response.json()
                .then( data => {return data.errors});
        //just in case something weird happens
        } else {
            console.log(response.status);
            throw new Error();
        }
    }

    //create new course
    createCourse = async(newCourseData, authUser) => {
        console.log('Data.createCourse() hit.');
        const { emailAddress, password } = authUser;

        const response = await this.api('/courses', 'POST', newCourseData, true, { emailAddress, password });
        
        if(response.status === 201) {
            console.log('response status 201 = success:)');
            return[];
        } else if (response.status === 400) {
            console.log('400 status = bad request. check that data...', response);
            return response.json().then(data => { return data.errors; });
        } else {
            throw new Error();
        }
    
    }

    //update course
    updateCourse = async(updatedCourseData, authUser) => {
        console.log('Data.updateCourse() hit.');
        const { emailAddress, password } = authUser;

        const response = await this.api(`/courses/${updatedCourseData.id}`, 'PUT', updatedCourseData, true, { emailAddress, password });
        
        if(response.status === 204){
            console.log('204 response stauts means success:)');
            return [];
        } else if (response.status === 401){
            console.log('401 response status means forbidden');
            return response.json().then(data => {return data});
        } else if (response.status === 404) {
            console.log('404 response status means not found');
            throw new Error();
        }
    }

    //delete course
    deleteCourse = async(courseId, authUser) => {
        console.log('Data.deleteCourse() hit.', courseId);
        const { emailAddress, password } = authUser;

        const response = await(this.api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password }));
        if(response.status === 204){
            console.log('204 response stauts means success:)');
            return [];
        } else if (response.status === 403) {
            console.log('403 means access denied.');
            return response.json().then(data => {return data});
        }
    }

}