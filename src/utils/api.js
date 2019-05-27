// A simple data API to retrieve data from github
import axios from 'axios';
const CLIENT_ID = "028f3647cda256c9dd15";
const CLIENT_SECRET = "09aaaced69180fff192a03904bdea03b1fa1a4b9";
const Auth = (CLIENT_ID && CLIENT_SECRET) ? `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}` : '';
const GithubAPI = {
    getUserInfo: function(username) {
        return axios.get(`https://api.github.com/users/${username}${Auth}`);
    },
    getUserRepos: function(username) {
        return axios.get(`https://api.github.com/users/${username}/repos${Auth}`);
    },
    getStars: function(username) {
        return axios.get(`https://api.github.com/users/${username}/repos${Auth}`);
    },
    getFollowers:  function(username) {
        return axios.get(`https://api.github.com/users/${username}/followers${Auth}`);
    },
    getFollowing:  function(username) {
        return axios.get(`https://api.github.com/users/${username}/following${Auth}`);
    }
};

export default GithubAPI;