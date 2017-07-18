
const defaultSuccess = console.log;

const defaultError = console.error;

const defaultFail = console.warn;

export default (api, params = {}, success = defaultSuccess, fail = defaultFail, error = defaultError) => {

    let data = Object.keys(params).map((item)=> [item,params[item]].join('=')).join('&')

    return fetch(api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: "include",
            body: data
        })
        .then(res => res.json())
        .then((res)=>{
            (res.code == '100000')?success(res):fail(res);
        })
        .catch(error);
}