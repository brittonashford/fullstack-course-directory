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

            const encodedCredentials = Buffer.from(`${credentials.emailAddress}:${credentials.password}`).toString('base64');
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    //get course list
    getCourseList = async() => {
        const response = await this.api('/courses')

        if (response.status === 200) {
            return response.json().then(data => data);
        } else {
            console.log(`getCourseList API call failed. Response status: ${response.status}`);
            throw new Error();
        }
    }

    //get course detail
    getCourseDetail = async(id) => {
        const response = await this.api(`/courses/${id}`);

        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 404) {
            return;
        } else {
            console.log(`getCourseDetail API call failed. Response status: ${response.status}`);
            throw new Error();
        }
    }

    //create new user
    createUser = async(user) => {
        const response = await this.api(`/users`, 'POST', user);

        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => { return data.errors; });
        }
        else {
            console.log(`response status: ${response.status}`)
            throw new Error();
        }
    }

    //get user
    getUser = async(emailAddress, password) => {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });

        //no news is good news
        if (response.status === 200) {
            return response.json().then(data => data);
        //else handle not found, forbidden, and server error
        } else if (response.status === 400 || response.status === 401 || response.status === 500) {
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
        const { emailAddress, password } = authUser;

        const response = await this.api('/courses', 'POST', newCourseData, true, { emailAddress, password });
        
        if(response.status === 201) {
            return[];
        } else if (response.status === 400) {
            return response.json().then(data => { return data.errors; });
        } else {
            throw new Error();
        }    
    }

    //update course
    updateCourse = async(updatedCourseData, authUser) => {
        const { emailAddress, password } = authUser;

        const response = await this.api(`/courses/${updatedCourseData.id}`, 'PUT', updatedCourseData, true, { emailAddress, password });
        
        if(response.status === 204){
            return [];
        }else if (response.status === 401 || response.status === 404 || response.status === 500){
            return response.json().then(data => {return data});
        } else {
            console.log(response.status);
            throw new Error();
        }
    }

    //delete course
    deleteCourse = async(courseId, authUser) => {
        const { emailAddress, password } = authUser;

        const response = await(this.api(`/courses/${courseId}`, 'DELETE', {}, true, { emailAddress, password }));
        if(response.status === 204){
            return [];
        } else if (response.status === 403) {
            return response.json().then(data => {return data});
        } else {
            console.log(response.status);
            throw new Error();
        }
    }

}