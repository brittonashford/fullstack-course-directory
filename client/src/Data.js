import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';

//user auth and add/update/delete stuff will go here
export default class Data {
    api(path, method = 'GET', data = null) {
        const url = path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (data !== null) {
            options.data = JSON.stringify(data);
        }

        return axios(url, options);
    }

    //get course list
    getCourseList = async() => {
        console.log('getCourseList() called via Data() instance in context. Did it return data?')
        const response = await this.api('/courses')
        if (response.status === 200) {
            console.log('getCourseList API call succeeded! Results:');
            console.log(response.data);
            return response.data;
        } else {
            console.log(`getCourseList API call failed. Response status: ${response.status}`);
        }
    }

    //get course detail
    getCourseDetail = async(id) => {
        console.log('getCourseDetail() called via Data() instance in context. Did it return data?')
        const response = await this.api(`/courses/${id}`);
        if (response.status === 200) {
            console.log('getCourseDetail API call succeeded! Results:');
            console.log(response.data);
            return response.data;
        } else {
            console.log(`getCourseDetail API call failed. Response status: ${response.status}`);
        }
    }



    //create new course





    //update course





    //delete course




    //create new user





    //get user




  

}