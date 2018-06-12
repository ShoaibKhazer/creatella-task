
// change IP address to your computer Id address
const SYS_IP = 'http://192.168.0.13';
const SERVER_BASE_URL = SYS_IP + ':3000';

let get = (apiEndPoint) => {
    let url = SERVER_BASE_URL + apiEndPoint;

    return fetch(url, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((resp) => resp.json())
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
};

export { get, SERVER_BASE_URL };
