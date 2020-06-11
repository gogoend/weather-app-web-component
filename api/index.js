export function get(url, params) {
    return new Promise((resolve) => {
        let xhr;
        xhr = new XMLHttpRequest();

        let paramsStr = new URLSearchParams(params)

        xhr.open('get', `${url}?${paramsStr}`, false);
        xhr.send();
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve({
                    data: xhr.responseText
                })
            }
        }
    })
}