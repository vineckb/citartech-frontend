import Vue from 'vue';
import axios from 'axios';

const clientId = '071225bb41f4ee451f9d';
const clientSecret = '2c333b7e1ec1b019eec3a3d4678b5b5310bcdf97';

const github = axios.create({
  baseURL: 'https://api.github.com'
});

const oAuthConfig = () => ({
  headers: {
    Authorization: `token ${localStorage.getItem('token')}`
  }
})

// transform response because no working pass headers
// input: access_token=:access_token&scope=&token_type=bearer
// output: { access_token: '...', token_type: '...' }
const urlEncodedToObject = data => {
  const obj = {};

  data.split('&').map(i => {
    const [key, value] = i.split('=');
    obj[key] = value;
  });

  return obj;
};

export default {
  authorizeUrl: `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`,

  fetchIssues(username, repository) {
    const url = `/repos/${username}/${repository}/issues`;
    return github.get(url);
  },

  fetchIssue(username, repository, number) {
    return github.get(`/repos/${username}/${repository}/issues/${number}`);
  },

  createIssue(username, repository, data) {
    const token = localStorage.getItem('token');
    return github.post(`/repos/${username}/${repository}/issues`, data, oAuthConfig());
  },

  lockIssue(username, repository, number) {
    const url = `/repos/${username}/${repository}/issues/${number}/lock`;

    return github.put(url, null, oAuthConfig());
  },

  unlockIssue(username, repository, number) {
    const url = `/repos/${username}/${repository}/issues/${number}/lock`;

    return github.delete(url, oAuthConfig());
  },

  auth(code) {
    return new Promise((resolve, reject) => {
      const params = {
        code,
        client_id: clientId,
        client_secret: clientSecret
      };

      axios
        .post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', params)
        .then(({ data }) => {
          resolve(urlEncodedToObject(data))
        }).catch(e => reject(e));

    });
  },

  getUser() {
    return github.get('/user', oAuthConfig())
  },

  getRepositories() {
    return github.get('/user/repos', oAuthConfig())
  }
}
