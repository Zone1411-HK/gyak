document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newKaja').addEventListener('click', addKaja);
});

async function addKaja() {
    const formData = new FormData(document.getElementById('etelForm'));
    let isValid = true;
    for (const value of formData.values()) {
        if (value == '') {
            isValid = false;
        }
    }
    if (isValid) {
        await Post('/api/addKaja', formData);
        document.getElementById('etelForm').reset();
        window.location = '/kajak';
    } else {
        alert('Nincs kitöltve!');
    }
}

async function Post(url, data) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        if (!res.ok) {
            throw new Error(res.status + ' ' + res.statusText);
        }
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}
