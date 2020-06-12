export function get(url, params) {
    return new Promise((resolve) => {
        let xhr;
        xhr = new XMLHttpRequest();

        let paramsStr = new URLSearchParams(params)

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve({
                        data: xhr.responseText
                    })
            }
        },false)
        // 第三个参数表示是否同步 —— 设为同步会阻塞UI
        xhr.open('get', `${url}?${paramsStr}`, true);
        xhr.send();
    })
}